import { OnChainTokenConfig, SolanaIssuerConfig } from "../../client/interface";
export declare const getNftCollection: (issuer: OnChainTokenConfig | SolanaIssuerConfig, ipfsBaseUrl?: string) => Promise<any>;
export declare const getNftTokens: (issuer: OnChainTokenConfig, owner: string, ipfsBaseUrl?: string) => Promise<any>;
export declare const tokenRequest: (query: string, silenceRequestError: boolean) => Promise<any>;
