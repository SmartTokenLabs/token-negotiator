import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from "./abstractAuthentication";
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
export declare class SafeConnectChallenge extends AbstractAuthentication implements AuthenticationMethod {
    TYPE: string;
    getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, _tokens: Array<any>, web3WalletProvider: Web3WalletProvider, _request: AuthenticateInterface): Promise<AuthenticationResult>;
}