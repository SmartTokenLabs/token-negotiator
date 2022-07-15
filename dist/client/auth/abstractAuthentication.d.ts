import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
export interface AuthenticationResult {
    type: string;
    data: any;
    target: {
        address?: string;
        tokens?: [];
    };
}
export interface AuthenticationMethod {
    TYPE: string;
    getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface): Promise<AuthenticationResult>;
}
export declare abstract class AbstractAuthentication {
    abstract TYPE: string;
    static STORAGE_KEY: string;
    saveProof(key: string, proof: AuthenticationResult): void;
    protected getSavedProof(key: string): AuthenticationResult;
    protected deleteProof(key: string): void;
    private getFullKey;
    private getProofs;
}
