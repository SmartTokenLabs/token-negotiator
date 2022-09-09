import { OnChainTokenConfig } from "../../client/interface";
export declare const getNftCollection: (issuer: OnChainTokenConfig, ipfsBaseUrl?: string) => Promise<any>;
export declare const getSolanaNftCollectionUrl: (issuer: OnChainTokenConfig, ipfsBaseUrl: string) => string;
export declare const getNftTokens: (issuer: OnChainTokenConfig, owner: string, ipfsBaseUrl?: string) => Promise<any>;
export declare const getEvmNftTokensUrl: (issuer: any, owner: string, ipfsBaseUrl: string) => string;
export declare const getSolanaNftTokensUrl: (issuer: any, owner: string, ipfsBaseUrl: string) => string;
export declare const tokenRequest: (query: string, silenceRequestError: boolean) => Promise<any>;
