import { UIOptionsInterface } from "./ui";
import { AuthenticationMethod } from "./auth/abstractAuthentication";
import { SafeConnectOptions } from "../wallet/SafeConnectProvider";
export interface OffChainTokenConfig extends IssuerConfigInterface {
    onChain: false;
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
    base64senderPublicKeys: {
        [key: string]: string;
    };
    base64attestorPubKey: string;
}
export interface OnChainTokenConfig extends IssuerConfigInterface {
    onChain: true;
    contract: string;
    chain: string;
    openSeaSlug?: string;
}
export interface IssuerConfigInterface {
    collectionID: string;
    onChain: boolean;
    title?: string;
    image?: string;
}
export interface NegotiationInterface {
    type: string;
    issuers?: (OnChainTokenConfig | OffChainTokenConfig)[];
    options: {
        overlay: UIOptionsInterface;
        filters: {};
    };
    onChainKeys?: {
        [apiName: string]: string;
    };
    ipfsBaseUrl?: string;
    autoLoadTokens?: number | boolean;
    autoEnableTokens?: boolean;
    autoPopup?: boolean;
    messagingForceTab?: boolean;
    safeConnectOptions?: SafeConnectOptions;
}
export interface AuthenticateInterface {
    issuer: any;
    tokenId?: number | string;
    unsignedToken: any;
    address?: string;
    wallet?: string;
    type?: AuthenticationMethod;
    options?: any;
}