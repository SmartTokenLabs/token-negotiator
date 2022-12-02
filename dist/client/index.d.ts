import { UiInterface, UItheme } from './ui';
import "./../vendor/keyShape";
import { TokenStore } from "./tokenStore";
import { OffChainTokenConfig, OnChainTokenConfig, AuthenticateInterface, NegotiationInterface, TokenNegotiatorEvents } from './interface';
import Web3WalletProvider from '../wallet/Web3WalletProvider';
declare global {
    interface Window {
        KeyshapeJS?: any;
        tokenToggleSelection: any;
        ethereum: any;
        solana: any;
        tn: unknown;
    }
}
export declare const defaultConfig: NegotiationInterface;
export declare const enum UIUpdateEventType {
    ISSUERS_LOADING = 0,
    ISSUERS_LOADED = 1
}
export declare enum ClientError {
    POPUP_BLOCKED = "POPUP_BLOCKED",
    USER_ABORT = "USER_ABORT"
}
export declare enum ClientErrorMessage {
    POPUP_BLOCKED = "Please add an exception to your popup blocker before continuing.",
    USER_ABORT = "The user aborted the process."
}
export declare class Client {
    private negotiateAlreadyFired;
    issuersLoaded: boolean;
    protected config: NegotiationInterface;
    private web3WalletProvider;
    private messaging;
    protected ui: UiInterface;
    private clientCallBackEvents;
    private tokenStore;
    private uiUpdateCallbacks;
    private urlParams;
    static getKey(file: string): import("@tokenscript/attestation/dist/libs/KeyPair").KeyPair;
    constructor(config: NegotiationInterface);
    getDataFromQuery(itemKey: any): string;
    readProofCallback(): boolean;
    private registerOutletProofEventListener;
    private emitRedirectProofEvent;
    private mergeConfig;
    getTokenStore(): TokenStore;
    getUi(): UiInterface;
    createUiInstance(): void;
    triggerUiUpdateCallback(type: UIUpdateEventType, data?: {}): void;
    registerUiUpdateCallback(type: UIUpdateEventType, callback: Function): void;
    safeConnectAvailable(): boolean;
    solanaAvailable(): boolean;
    getWalletProvider(): Promise<Web3WalletProvider>;
    disconnectWallet(): Promise<void>;
    negotiatorConnectToWallet(walletType: string): Promise<any>;
    enrichTokenLookupDataOnChainTokens(): Promise<void>;
    checkUserAgentSupport(type: string): void;
    private activeNegotiateRequired;
    private createCurrentUrlWithoutHash;
    getNoTokenMsg(collectionID: string): string;
    negotiate(issuers?: (OnChainTokenConfig | OffChainTokenConfig)[], openPopup?: boolean): Promise<void>;
    activeNegotiationStrategy(openPopup: boolean): void;
    private cancelAutoload;
    tokenAutoLoad(onLoading: (issuer: string) => void, onComplete: (issuer: string, tokens: any[]) => void, refresh: boolean): Promise<void>;
    cancelTokenAutoload(): void;
    setPassiveNegotiationWebTokens(): Promise<void>;
    readTokensFromUrl(): void;
    setPassiveNegotiationOnChainTokens(): Promise<void>;
    passiveNegotiationStrategy(): Promise<void>;
    connectTokenIssuer(issuer: string): Promise<any>;
    private loadRemoteOutletTokens;
    private loadLocalOutletTokens;
    updateSelectedTokens(selectedTokens: any): void;
    checkUserAgentSupportHandler(): void;
    authenticate(authRequest: AuthenticateInterface): any;
    enableAuthCancel(issuer: any): void;
    private handleWalletRequired;
    private handleProofError;
    eventSender: {
        emitAllTokensToClient: (tokens: any) => void;
        emitSelectedTokensToClient: (tokens: any) => void;
        emitProofToClient: (data: any, issuer: any, error?: Error | string) => void;
        emitErrorToClient: (error: Error, issuer?: string) => void;
        emitConnectedWalletInstance: (connectedWallet: any) => void;
        emitDisconnectedWalletInstance: () => void;
        emitNetworkChange: (chain: any) => void;
    };
    getOutletConfigForCurrentOrigin(): any;
    onlySameOrigin(): boolean;
    addTokenViaMagicLink(magicLink: any): Promise<any>;
    on(type: TokenNegotiatorEvents, callback?: any, data?: any): any;
    switchTheme(newTheme: UItheme): void;
}
