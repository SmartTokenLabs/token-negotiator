import {AbstractAuthentication, AuthenticationResult} from "./abstractAuthentication";
import {AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig} from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";

export class AttestedAddress extends AbstractAuthentication {

	TYPE = "attestedAddress";

	getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface): AuthenticationResult {

		if (!issuerConfig.onChain)
			throw new Error(this.TYPE + " is not available for off-chain tokens.");

		
	}


}