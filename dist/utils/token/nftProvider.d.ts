import { OnChainTokenConfig } from "../../client/interface";
export declare const getNftCollection: (issuer: OnChainTokenConfig) => Promise<any>;
export declare const getNftTokens: (issuer: OnChainTokenConfig, owner: string) => Promise<any>;
export declare const tokenRequest: (query: string, silenceRequestError: boolean) => Promise<any>;
