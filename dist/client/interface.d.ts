import { UIOptionsInterface } from "./ui";
import { AuthenticationMethod } from "./auth/abstractAuthentication";
import { SafeConnectOptions } from "../wallet/SafeConnectProvider";
import { BrowserDataInterface } from "../utils/support/isSupported";
export interface OffChainTokenConfig extends IssuerConfigInterface {
    onChain: false;
    tokenOrigin?: string;
    unEndPoint?: string;
    base64senderPublicKeys: {
        [key: string]: string;
    };
    base64attestorPubKey: string;
    accessRequestType?: "read" | "write";
}
export interface OnChainTokenConfig extends IssuerConfigInterface {
    onChain: true;
    contract: string;
    chain: string;
    openSeaSlug?: string;
    blockchain?: string;
}
export interface SolanaIssuerConfig extends OnChainTokenConfig {
    blockchain: "solana";
    collectionAddress?: string;
    tokenProgram?: string;
    updateAuthority?: string;
}
export interface IssuerConfigInterface {
    collectionID: string;
    onChain: boolean;
    title?: string;
    image?: string;
    symbol?: string;
    filters?: {};
    noTokenMsg?: string;
    hideToggle?: boolean;
}
export declare type Issuer = OffChainTokenConfig | SolanaIssuerConfig | OnChainTokenConfig;
export interface NegotiationInterface {
    type: string;
    issuers?: Issuer[];
    uiOptions?: UIOptionsInterface;
    autoLoadTokens?: number | boolean;
    autoEnableTokens?: boolean;
    messagingForceTab?: boolean;
    safeConnectOptions?: SafeConnectOptions;
    enableOffChainRedirectMode?: boolean;
    tokenPersistenceTTL?: number;
    unSupportedUserAgent?: {
        authentication?: {
            config: BrowserDataInterface;
            errorMessage: string;
        };
        full?: {
            config: BrowserDataInterface;
            errorMessage: string;
        };
    };
    noInternetErrorMessage?: string;
}
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
export declare type TokenNegotiatorEvents = 'token-proof' | 'connected-wallet' | 'disconnected-wallet' | 'tokens-selected' | 'tokens' | 'network-change' | 'error';
