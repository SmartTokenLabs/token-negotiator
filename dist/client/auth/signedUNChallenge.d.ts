import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from "./abstractAuthentication";
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
export declare class SignedUNChallenge extends AbstractAuthentication implements AuthenticationMethod {
    TYPE: string;
    private static DEFAULT_ENDPOINT;
    getTokenProof(_issuerConfig: OnChainTokenConfig | OffChainTokenConfig, _tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface): Promise<AuthenticationResult>;
}
