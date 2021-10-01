export declare const filterTokens: (decodedTokens: any, filter?: {}) => any;
export declare const readTokens: (localStorageItemName: any) => any;
export declare const decodeTokens: (rawTokens: any, tokenParser: any, unsignedTokenDataName: string) => any;
export declare const openOutletIframe: (tokensOrigin: string, localStorageItemName: string) => Promise<unknown>;
export declare const getTokens: ({ filter, tokenName, tokensOrigin, localStorageItemName, tokenParser, unsignedTokenDataName }: {
    filter?: {} | undefined;
    tokenName?: string | undefined;
    tokensOrigin?: string | undefined;
    localStorageItemName?: string | undefined;
    tokenParser: any;
    unsignedTokenDataName: any;
}) => Promise<unknown>;
export declare const storeMagicURL: (tokens: any, localStorageItemName: string) => void;
export declare const readMagicUrl: (tokenUrlName: string, tokenSecretName: string, tokenIdName: string, localStorageItemName: string) => void;
