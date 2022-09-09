import { UIOptionsInterface } from "./ui";
import {AuthenticationMethod} from "./auth/abstractAuthentication";
import {SafeConnectOptions} from "../wallet/SafeConnectProvider";
import {BrowserDataInterface} from "../utils/support/isSupported";

export interface OffChainTokenConfig extends IssuerConfigInterface {
    onChain: false;
    tokenOrigin?: string;
    unEndPoint?: string;
    base64senderPublicKeys: {[key: string]: string};
    base64attestorPubKey: string;
}

export interface OnChainTokenConfig extends IssuerConfigInterface {
    onChain: true;
    contract: string;
    chain: string;
    openSeaSlug?: string;
    blockchain?: string;
}

export interface IssuerConfigInterface {
    collectionID: string;
    onChain: boolean;
    title?: string;
    image?: string;
    filters?: {};
    blockchain?: string;
}

export type Issuer = (OnChainTokenConfig | OffChainTokenConfig);
export interface NegotiationInterface {
    type: string;
    issuers?: Issuer[];
    uiOptions?: UIOptionsInterface;
    autoLoadTokens?: number | boolean;
    autoEnableTokens?: boolean;
    messagingForceTab?: boolean;
    safeConnectOptions?: SafeConnectOptions;
    unSupportedUserAgent?: {
        authentication?: {
            config: BrowserDataInterface,
            errorMessage: string
        },
        full?: {
            config: BrowserDataInterface,
            errorMessage: string
        }
    },
    noInternetErrorMessage?: string;
}

// TODO: Implement tokenId - each issuer token should have a unique ID (tokenId for instance).
// webster should not be required to pass the whole object as it can lead to hard to solve errors for webster.
export interface AuthenticateInterface {
    issuer: any;
    tokenId?: number | string;
    unsignedToken: any;
    address?: string;
    wallet?: string;
    type?: AuthenticationMethod;
    options?: any;
    blockchain?: string;
}

