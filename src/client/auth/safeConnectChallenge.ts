import {AbstractAuthentication, AuthenticationMethod, AuthenticationResult} from "./abstractAuthentication";
import {AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig} from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
import {SafeConnectProvider} from "../../wallet/SafeConnectProvider";

export class SafeConnectChallenge extends AbstractAuthentication implements AuthenticationMethod {

	TYPE = "scChallenge";

	async getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface): Promise<AuthenticationResult> {

		if (!issuerConfig.onChain)
			throw new Error(this.TYPE + " is not available for off-chain tokens.");

		let address = web3WalletProvider.getConnectedWalletData()[0].address;

		let currentProof: AuthenticationResult|null = this.getSavedProof(address);

		if (currentProof.data.expiry < Date.now()) {

			this.deleteProof(address);
			currentProof = null;
		}

		let safeConnect = new SafeConnectProvider();

		if (!currentProof){

			let walletConnection = web3WalletProvider.getConnectedWalletData()[0].provider;

			if (walletConnection instanceof SafeConnectProvider){

				// This will request and save a new challenge from safe connect
				await safeConnect.initSafeConnect();
				currentProof = this.getSavedProof(address);

				if (!currentProof)
					throw new Error("Could not get address attestation from safe connect");

			} else {

				throw new Error("Only safe connect supports this authentication type at this time");
			}
		}

		return currentProof;
	}

}