import { OnChainTokenConfig, SolanaIssuerConfig } from "../../client/interface";
export declare const getNftCollection: (issuer: OnChainTokenConfig | SolanaIssuerConfig, ipfsBaseUrl?: string) => Promise<any>;
export declare const getSolanaNftCollectionUrl: (issuer: SolanaIssuerConfig, ipfsBaseUrl: string) => string;
export declare const getNftTokens: (issuer: OnChainTokenConfig, owner: string, ipfsBaseUrl?: string) => Promise<any>;
export declare const getEvmNftTokensUrl: (issuer: any, owner: string, ipfsBaseUrl: string) => string;
export declare const getSolanaNftTokensUrl: (issuer: SolanaIssuerConfig, owner: string, ipfsBaseUrl: string) => string;
export declare const tokenRequest: (query: string, silenceRequestError: boolean) => Promise<any>;
