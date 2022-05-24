import { PopupOptionsInterface } from "./popup";

export interface OffChainTokenConfig extends IssuerConfigInterface {
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

export interface OnChainTokenConfig extends IssuerConfigInterface {
    contract: string,
    chain: string,
    openSeaSlug?: string
}

export interface IssuerConfigInterface {
    collectionID: string,
    onChain: boolean
    title?: string;
    image?: string;
}

export interface NegotiationInterface {
    type: string;
    issuers?: (OnChainTokenConfig | OffChainTokenConfig)[];
    options: {
        overlay: PopupOptionsInterface;
        filters: {};
    };
    onChainKeys?: { [apiName: string]: string };
    ipfsBaseUrl?: string;
    autoLoadTokens?: number | boolean;
    autoEnableTokens?: boolean;
    autoPopup?: boolean;
}

// TODO: Implement tokenId - each issuer token should have a unique ID (tokenId for instance).
// webster should not be required to pass the whole object as it can lead to hard to solve errors for webster.
export interface AuthenticateInterface {
    issuer: any;
    tokenId?: number | string;
    unsignedToken: any;
}