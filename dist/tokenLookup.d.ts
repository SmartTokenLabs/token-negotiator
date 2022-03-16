export interface Item {
    onChain: any;
    tokenIssuerPublicKey?: any;
    title?: any;
    tokenName?: any;
    attestationOrigin?: any;
    tokenOrigin?: any;
    tokenUrlName?: any;
    tokenSecretName?: any;
    tokenIdName?: any;
    unsignedTokenDataName?: any;
    itemStorageKey?: any;
    ethKeyitemStorageKey?: any;
    emblem?: any;
    unEndPoint?: any;
    tokenParser?: any;
    smartContractAddress?: any;
    symbol?: any;
    base64senderPublicKey?: string;
    base64attestorPubKey?: string;
}
interface TokenLookupInterface {
    [issuer: string]: Item;
}
export declare const tokenLookup: TokenLookupInterface;
export {};
