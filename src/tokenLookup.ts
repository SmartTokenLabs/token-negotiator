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
    image?: any;
    unEndPoint?: any;
    tokenParser?: any;
    smartContractAddress?: any;
    symbol?: any;
    base64senderPublicKey?: string;
    base64attestorPubKey?: string;
}

interface TokenLookupInterface { [issuer: string]: Item };

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
