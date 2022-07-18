import { OffChainTokenConfig, OnChainTokenConfig } from "./interface";
interface TokenLookup {
    [collectionID: string]: OnChainTokenConfig | OffChainTokenConfig;
}
declare type TokenConfig = OnChainTokenConfig | OffChainTokenConfig;
export declare class TokenStore {
    private currentIssuers;
    private tokens;
    private tokenLookup;
    private selectedTokens;
    private autoEnableTokens;
    constructor(autoEnableTokens: boolean);
    updateIssuers(issuers: TokenConfig[]): void;
    getCurrentIssuers(onChainFilter?: boolean): TokenLookup;
    getCurrentTokens(onChainFilter?: boolean): {
        [issuer: string]: [];
    };
    hasUnloadedTokens(): boolean;
    getIssuerTokens(issuer: string): [];
    setTokens(issuer: string, tokens: []): void;
    getSelectedTokens(): any;
    setSelectedTokens(selectedTokens: any): void;
    private prePopulateTokenLookupStore;
    updateTokenLookupStore(tokenKey: string, data: OnChainTokenConfig | OffChainTokenConfig): void;
    private formatCollectionChain;
    private formatCollectionID;
}
export {};