export declare class Modal {
    constructor(filter: {}, tokenName: any, options?: {});
    getTokens(filter?: {}, tokenName?: string, tokensOrigin?: string): Promise<unknown>;
    filterTokens(decodedTokens: any, filter?: {}): any;
    readTokens(localStorageItemName: any): any;
    decodeTokens(rawTokens: any): any;
}
