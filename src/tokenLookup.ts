export interface OffChainTokenConfig extends TokenConfig {
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
    image?: any;
    unEndPoint?: any;
    tokenParser?: any;
    smartContractAddress?: any;
    symbol?: any;
    base64senderPublicKey?: string;
    base64attestorPubKey?: string;
}

export interface OnChainTokenConfig extends TokenConfig {
    contract: string,
    chain: string,
    openSeaSlug: string
}

export interface TokenConfig {
    collectionID: string,
    onChain: boolean
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
