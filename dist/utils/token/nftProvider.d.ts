import { OnChainTokenConfig, Issuer, SolanaIssuerConfig } from '../../client/interface';
export declare const getNftCollection: (issuer: Issuer, ipfsBaseUrl?: string) => Promise<any>;
export declare const getEvmNftCollectionUrl: (issuer: OnChainTokenConfig, ipfsBaseUrl: string) => string;
export declare const getSolanaNftCollectionUrl: (issuer: SolanaIssuerConfig, ipfsBaseUrl: string) => string;
export declare const getNftTokens: (issuer: Issuer, owner: string, ipfsBaseUrl?: string) => Promise<any>;
export declare const getEvmNftTokensUrl: (issuer: any, owner: string, ipfsBaseUrl: string) => string;
export declare const getSolanaNftTokensUrl: (issuer: SolanaIssuerConfig, owner: string, ipfsBaseUrl: string) => string;
export declare const tokenRequest: (query: string, silenceRequestError: boolean) => Promise<any>;
