export declare const filterTokens: (decodedTokens: any, filter?: {}) => any;
export declare const readTokens: (localStorageItemName: any) => any;
export declare const decodeTokens: (rawTokens: any, tokenParser: any, unsignedTokenDataName: string) => any;
export declare const openOutletIframe: (tokensOrigin: any, localStorageItemName: any) => Promise<unknown>;
export declare const getTokens: ({ filter, tokensOrigin, localStorageItemName, tokenParser, unsignedTokenDataName }: {
    filter?: {} | undefined;
    tokensOrigin: any;
    localStorageItemName: any;
    tokenParser: any;
    unsignedTokenDataName: any;
}) => Promise<unknown>;
export declare const storeMagicURL: (tokens: any, localStorageItemName: string) => void;
export declare const readMagicUrl: (tokenUrlName: string, tokenSecretName: string, tokenIdName: string, localStorageItemName: string) => void;
