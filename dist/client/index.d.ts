import { Ui } from "./ui";
import "./../vendor/keyShape";
import { TokenStore } from "./tokenStore";
import { OffChainTokenConfig, OnChainTokenConfig, AuthenticateInterface, NegotiationInterface } from "./interface";
declare global {
    interface Window {
        KeyshapeJS?: any;
        tokenToggleSelection: any;
        ethereum: any;
        solana: any;
    }
}
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
    private config;
    private web3WalletProvider;
    private messaging;
    private ui;
    private clientCallBackEvents;
    private tokenStore;
    private uiUpdateCallbacks;
    static getKey(file: string): import("@tokenscript/attestation/dist/libs/KeyPair").KeyPair;
    constructor(config: NegotiationInterface);
    private mergeConfig;
    getTokenStore(): TokenStore;
    getUi(): Ui;
    triggerUiUpdateCallback(type: UIUpdateEventType, data?: {}): void;
    registerUiUpdateCallback(type: UIUpdateEventType, callback: Function): void;
    safeConnectAvailable(): boolean;
    solanaAvailable(): boolean;
    getWalletProvider(): Promise<Web3WalletProvider>;
    disconnectWallet(): Promise<void>;
    negotiatorConnectToWallet(walletType: string): Promise<any>;
    enrichTokenLookupDataOnChainTokens(): Promise<void>;
    checkUserAgentSupport(type: string): void;
    negotiate(issuers?: OnChainTokenConfig | OffChainTokenConfig[], openPopup?: boolean): Promise<void>;
    activeNegotiationStrategy(openPopup: boolean): void;
    private cancelAutoload;
    tokenAutoLoad(onLoading: (issuer: string) => void, onComplete: (issuer: string, tokens: any[]) => void): Promise<void>;
    cancelTokenAutoload(): void;
    setPassiveNegotiationWebTokens(): Promise<void>;
    setPassiveNegotiationOnChainTokens(): Promise<void>;
    passiveNegotiationStrategy(): Promise<void>;
    connectTokenIssuer(issuer: string): Promise<any>;
    updateSelectedTokens(selectedTokens: any): void;
    authenticate(authRequest: AuthenticateInterface): any;
    private handleWalletRequired;
    private handleProofError;
    eventSender: {
        emitAllTokensToClient: (tokens: any) => void;
        emitSelectedTokensToClient: (tokens: any) => void;
        emitProofToClient: (data: any, issuer: any, error?: string) => void;
        emitErrorToClient: (error: Error, issuer?: string) => void;
        emitConnectedWalletInstance: (connectedWallet: any) => void;
    };
    checkInternetConnectivity(): void;
    addTokenViaMagicLink(magicLink: any): Promise<any>;
    on(type: string, callback?: any, data?: any): any;
    switchTheme(newTheme: string): void;
}
