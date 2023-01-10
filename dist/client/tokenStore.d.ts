import { OffChainTokenConfig, OnChainTokenConfig, SolanaIssuerConfig } from "./interface";
interface TokenLookup {
    [collectionID: string]: TokenConfig & {
        timestamp: number;
    };
}
type TokenConfig = (OnChainTokenConfig | OffChainTokenConfig | SolanaIssuerConfig);
export declare class TokenStore {
    private autoEnableTokens;
    private tokenPersistenceTTL;
    static LOCAL_STORAGE_KEY: string;
    private currentIssuers;
    private tokenData;
    private tokenLookup;
    private selectedTokens;
    constructor(autoEnableTokens: boolean, tokenPersistenceTTL: number);
    private loadTokenStore;
    private saveTokenStore;
    updateIssuers(issuers: TokenConfig[]): void;
    clearCachedTokens(onChain?: boolean): void;
    hasOnChainTokens(): boolean;
    getCurrentIssuers(onChainFilter?: boolean): TokenLookup;
    getCurrentTokens(onChainFilter?: boolean): {
        [issuer: string]: [];
    };
    getTotalTokenCount(onChainFilter?: boolean): number;
    hasUnloadedIssuers(): boolean;
    hasUnloadedTokens(): boolean;
    getIssuerTokens(issuer: string): any[];
    setTokens(issuer: string, tokens: []): void;
    getSelectedTokens(): any;
    setSelectedTokens(selectedTokens: any): void;
    private prePopulateTokenLookupStore;
    updateTokenLookupStore(tokenKey: string, data: OnChainTokenConfig | OffChainTokenConfig, save?: boolean): void;
    private formatCollectionChain;
    private formatCollectionID;
}
export {};
