interface FilterInterface {
    [key: string]: any;
}
export declare const filterTokens: (decodedTokens: any, filter?: FilterInterface) => any;
export declare const readTokens: (itemStorageKey: any) => any;
export declare const decodeTokens: (rawTokens: any, tokenParser: any, unsignedTokenDataName: string, includeSignedToken?: boolean) => any;
export declare const storeMagicURL: (tokens: any, itemStorageKey: string) => void;
export declare const readMagicUrl: (tokenUrlName: string, tokenSecretName: string, tokenIdName: string, itemStorageKey: string, urlParams?: URLSearchParams | null) => any;
export declare const rawTokenCheck: (unsignedToken: any, tokenIssuer: any) => Promise<{
    ticketBlob: any;
    ticketSecret: any;
    attestationOrigin: any;
}>;
export declare const getRawToken: (unsignedToken: any, tokenIssuer: any) => {};
export {};
