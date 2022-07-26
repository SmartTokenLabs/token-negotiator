import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
import { Client } from "../index";
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
    getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, request: AuthenticateInterface): Promise<AuthenticationResult>;
}
export declare abstract class AbstractAuthentication {
    abstract TYPE: string;
    static STORAGE_KEY: string;
    protected client: Client;
    constructor(client?: Client);
    saveProof(key: string, proof: AuthenticationResult): void;
    protected getSavedProof(key: string): AuthenticationResult;
    protected deleteProof(key: string): void;
    private getFullKey;
    private getProofs;
}
