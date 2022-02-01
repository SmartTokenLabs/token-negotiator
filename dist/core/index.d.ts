interface FilterInterface {
    [key: string]: any;
}
export declare const filterTokens: (decodedTokens: any, filter: FilterInterface) => any;
export declare const readTokens: (itemStorageKey: any) => any;
export declare const decodeTokens: (rawTokens: any, tokenParser: any, unsignedTokenDataName: string) => any;
export declare const storeMagicURL: (tokens: any, itemStorageKey: string) => void;
export declare const readMagicUrl: (tokenUrlName: string, tokenSecretName: string, tokenIdName: string, itemStorageKey: string) => any;
export declare const ethKeyIsValid: (ethKey: any) => boolean;
export declare const validateUseEthKey: (endPoint: string, data: any) => Promise<any>;
export declare const getUnpredictableNumber: (endPoint: string) => Promise<any>;
export declare const getChallengeSigned: (tokenIssuer: any, web3WalletProvider: any) => Promise<any>;
export declare const connectMetamaskAndGetAddress: () => Promise<any>;
export declare const signNewChallenge: (unEndPoint: string, web3WalletProvider: any) => Promise<{
    address: string;
    expiry: any;
    domain: any;
    randomness: any;
    signature: any;
    UN: any;
}>;
export declare const signMessageWithBrowserWallet: (message: any, web3WalletProvider: any) => Promise<any>;
export declare const rawTokenCheck: (unsignedToken: any, tokenIssuer: any) => Promise<{
    ticketBlob: any;
    ticketSecret: any;
    attestationOrigin: any;
} | null>;
export declare const getRawToken: (unsignedToken: any, tokenIssuer: any) => {} | null | undefined;
export {};
