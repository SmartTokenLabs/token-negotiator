export interface OffChainTokenConfig extends TokenConfigInterface {
    tokenName?: any;
    attestationOrigin?: any;
    tokenOrigin?: any;
    tokenUrlName?: any;
    tokenSecretName?: any;
    tokenIdName?: any;
    unsignedTokenDataName?: any;
    itemStorageKey?: any;
    ethKeyitemStorageKey?: any;
    unEndPoint?: any;
    tokenParser?: any;
    smartContractAddress?: any;
    symbol?: any;
    base64senderPublicKeys?: {[key: string]: string};
    base64attestorPubKey?: string;
}

export interface OnChainTokenConfig extends TokenConfigInterface {
    contract: string,
    chain: string,
    openSeaSlug: string
}

export interface TokenConfigInterface {
    collectionID: string,
    onChain: boolean
    title?: string;
    image?: string;
}

interface TokenLookupInterface { [issuer: string]: OffChainTokenConfig|OnChainTokenConfig }

/* 
    Example when tokenLookup is populated:
    
    tokenLookup {
        { collectionID: "Devcon" ... },
        { collectionID: "CryptoPunks" ... },
        { collectionID: "ZedRun" ... },
        { ... }
    }
*/
export const tokenLookup:TokenLookupInterface = {};
