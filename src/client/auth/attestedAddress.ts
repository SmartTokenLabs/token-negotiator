import {AbstractAuthentication, AuthenticationResult} from "./abstractAuthentication";
import {AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig} from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
import {AsnParser, AsnSerializer} from "@peculiar/asn1-schema";
import {
	base64ToUint8array,
	hexStringToUint8,
	uint8arrayToBase64,
	uint8tohex
} from "@tokenscript/attestation/dist/libs/utils";
import {SignedLinkedAttestation} from "./tempSchemas/SignedLinkedAttestation";
import {
	EthereumKeyLinkingAttestation,
	SignedEthereumKeyLinkingAttestation
} from "./tempSchemas/EthereumKeyLinkingAttestation";
import {EpochTimeValidity} from "./tempSchemas/EpochTimeValidity";
import {SafeConnectProvider} from "../../wallet/SafeConnectProvider";
import {AlgorithmIdentifierASN} from "./tempSchemas/AlgoritmIdentifierASN";

export class AttestedAddress extends AbstractAuthentication {

	TYPE = "attestedAddress";

	async getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface): Promise<AuthenticationResult> {

		if (!issuerConfig.onChain)
			throw new Error(this.TYPE + " is not available for off-chain tokens.");

		if (!request.options?.address)
			throw new Error("Address attestation requires a secondary address.");

		let address = web3WalletProvider.getConnectedWalletData()[0].address;

		let currentProof: AuthenticationResult|null = this.getSavedProof(address);

		// TODO: Proof validation
		/* if (currentProof.data.expiration < Date.now()) {

			this.deleteProof(address);
			currentProof = null;
		}*/

		let safeConnect = new SafeConnectProvider();

		if (!currentProof){

			// This will request and save a new challenge from safe connect
			await safeConnect.initSafeConnect();
			currentProof = this.getSavedProof(address);

			if (!currentProof)
				throw new Error("Could not get address attestation from safe connect");
		}

		let addrAttest = currentProof.data.attestation;

		let linkAttestation = await AttestedAddress.createAndSignLinkAttestation(addrAttest, request.options.address, await safeConnect.getLinkSigningKey());

		currentProof.data.attestation = linkAttestation;

		return currentProof;
	}

	private static async createAndSignLinkAttestation(addressAttest: string, linkedEthAddress: string, holdingPrivKey: CryptoKey){

		let addressAttestObj = AsnParser.parse(base64ToUint8array(addressAttest), SignedLinkedAttestation);

		console.log("Decoded address attestation");
		console.log(addressAttestObj);

		const linkAttest = new SignedEthereumKeyLinkingAttestation();
		linkAttest.ethereumKeyLinkingAttestation = new EthereumKeyLinkingAttestation();
		linkAttest.ethereumKeyLinkingAttestation.subjectEthereumAddress = hexStringToUint8(linkedEthAddress);
		linkAttest.ethereumKeyLinkingAttestation.linkedAttestation = addressAttestObj;

		linkAttest.ethereumKeyLinkingAttestation.validity = new EpochTimeValidity();
		linkAttest.ethereumKeyLinkingAttestation.validity.notBefore = Math.round(Date.now() / 1000);
		linkAttest.ethereumKeyLinkingAttestation.validity.notAfter = Math.round((Date.now() / 1000) + 3600);

		const linkAttestInfo = AsnSerializer.serialize(linkAttest.ethereumKeyLinkingAttestation);

		const linkSig = await window.crypto.subtle.sign(
			{
				name: SafeConnectProvider.HOLDING_KEY_ALGORITHM,
				saltLength: 128,
			},
			holdingPrivKey,
			linkAttestInfo
		);

		linkAttest.signingAlgorithm = new AlgorithmIdentifierASN();
		linkAttest.signingAlgorithm.algorithm = "2.16.840.1.101.3.4.3.14"; // RSASSA pkcs1 v1.5 with SHA 256
		linkAttest.signatureValue = new Uint8Array(linkSig);

		const encodedLinkAttest = new Uint8Array(AsnSerializer.serialize(linkAttest));

		console.log("Constructed link attestation: ");
		console.log(linkAttest);

		return uint8arrayToBase64(encodedLinkAttest);
	}

}