import {AbstractAuthentication, AuthenticationMethod, AuthenticationResult} from "./abstractAuthentication";
import {AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig} from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
import {SafeConnectProvider} from "../../wallet/SafeConnectProvider";
import {UN} from "./util/UN";

export class SignedUNChallenge extends AbstractAuthentication implements AuthenticationMethod {

	TYPE = "signedUN";
	private static DEFAULT_ENDPOINT = "https://crypto-verify.herokuapp.com/use-devcon-ticket";

	async getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface, options?: any): Promise<AuthenticationResult> {

		let address = web3WalletProvider.getConnectedWalletData()[0].address;

		let currentProof: AuthenticationResult|null = this.getSavedProof(address);

		// TODO: Check expiry;

		if (!currentProof){

			let walletConnection = web3WalletProvider.getConnectedWalletData()[0].provider;

			currentProof = {
				type: this.TYPE,
				data: {},
				target: {
					address: address
				}
			};

			if (walletConnection instanceof SafeConnectProvider){

				throw new Error("Safe connect does not support this authentication type.");

			} else {

				let endpoint = options?.unEndpoint ?? SignedUNChallenge.DEFAULT_ENDPOINT;

				const challenge = await UN.getNewUN(endpoint);

				const signature = await web3WalletProvider.signWith(
					challenge.messageToSign,
					walletConnection
				);

				// Check that recovered address matches the signature of the requested address
				let recoveredAddr = UN.recoverAddress(challenge);

				if (recoveredAddr !== address.toLowerCase()){
					throw new Error("Address signature is invalid");
				}

				challenge.signature = signature;
				challenge.address = recoveredAddr;

				currentProof.data = challenge;
			}

			this.saveProof(address, currentProof);
		}

		return currentProof;
	}

	/*private isProofValid(){

	}*/
}