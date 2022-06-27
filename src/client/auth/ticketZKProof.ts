import {AbstractAuthentication, AuthenticationResult} from "./abstractAuthentication";
import {AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig} from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
import {OutletAction} from "../messaging";
import {Authenticator} from "@tokenscript/attestation";
import {Messaging} from "../../core/messaging";
import {SignedUNChallenge} from "./signedUNChallenge";
import {UNInterface} from "./util/UN";

export class TicketZKProof extends AbstractAuthentication {

	TYPE = "ticketZKProof";

	private messaging = new Messaging();

	// TODO: Saving of proof to local storage, requires validity testing of attestation
	async getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface): Promise<AuthenticationResult> {

		if (issuerConfig.onChain === true)
			throw new Error(this.TYPE + " is not available for off-chain tokens.");

		let useEthKey: UNInterface|null = null;

		if (issuerConfig.unEndPoint) {
			let unChallenge = new SignedUNChallenge();
			request.options = {
				...request.options,
				unEndPoint: issuerConfig.unEndPoint
			};
			let res = await unChallenge.getTokenProof(issuerConfig, tokens, web3WalletProvider, request);
			useEthKey = res.data as UNInterface;
		}

		let res = await this.messaging.sendMessage({
			action: OutletAction.GET_PROOF,
			origin: issuerConfig.tokenOrigin,
			timeout: 0, // Don't time out on this event as it needs active input from the user
			data: {
				issuer: issuerConfig.collectionID,
				token: tokens[0],
				address: request.address ? request.address : "",
				wallet: request.wallet ? request.wallet : ""
			}
		});

		if (!res.data.proof)
			throw new Error("Failed to get proof from the outlet.");

		let proof: AuthenticationResult = {
			type: this.TYPE,
			data: res.data,
			target: {
				tokens: []
			}
		};

		if (useEthKey) {
			Authenticator.validateUseTicket(
				res.data.proof,
				issuerConfig.base64attestorPubKey,
				issuerConfig.base64senderPublicKeys,
				useEthKey.address ?? ""
			);

			proof.data.useEthKey = useEthKey;
		}

		return proof;
	}

}