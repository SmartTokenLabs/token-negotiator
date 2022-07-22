import "./../vendor/keyShape";
import { TokenStore } from "./tokenStore";
import { OffChainTokenConfig, OnChainTokenConfig, AuthenticateInterface, NegotiationInterface } from "./interface";
declare global {
    interface Window {
        KeyshapeJS?: any;
        tokenToggleSelection: any;
        ethereum: any;
    }
}
export declare class Client {
    private negotiateAlreadyFired;
    private config;
    private web3WalletProvider;
    private messaging;
    private popup;
    private clientCallBackEvents;
    private onChainTokenModule;
    private tokenStore;
    private uiUpdateCallbacks;
    static getKey(file: string): import("@tokenscript/attestation/dist/libs/KeyPair").KeyPair;
    constructor(config: NegotiationInterface);
    getTokenStore(): TokenStore;
    triggerUiUpdateCallbacks(): void;
    registerUiUpdateCallback(id: string, callback: Function): void;
    private getWalletProvider;
    negotiatorConnectToWallet(walletType: string): Promise<any>;
    setPassiveNegotiationWebTokens(): Promise<void>;
    enrichTokenLookupDataOnChainTokens(): Promise<void>;
    negotiate(issuers?: OnChainTokenConfig | OffChainTokenConfig[], openPopup?: boolean): Promise<void>;
    activeNegotiationStrategy(openPopup: boolean): Promise<void>;
    private cancelAutoload;
    tokenAutoLoad(onLoading: (issuer: string) => void, onComplete: (issuer: string, tokens: any[]) => void): Promise<void>;
    cancelTokenAutoload(): void;
    setPassiveNegotiationOnChainTokens(): Promise<void>;
    passiveNegotiationStrategy(): Promise<void>;
    connectTokenIssuer(issuer: string): Promise<any>;
    updateSelectedTokens(selectedTokens: any): void;
    authenticateOnChain(authRequest: AuthenticateInterface): Promise<{
        issuer: any;
        proof: any;
    }>;
    authenticateOffChain(authRequest: AuthenticateInterface): Promise<unknown>;
    authenticate(authRequest: AuthenticateInterface): Promise<void>;
    private handleProofError;
    checkPublicAddressMatch(issuer: string, unsignedToken: any): Promise<any>;
    eventSender: {
        emitAllTokensToClient: (tokens: any) => void;
        emitSelectedTokensToClient: (tokens: any) => void;
        emitProofToClient: (proof: any, issuer: any, error?: string) => void;
    };
    addTokenViaMagicLink(magicLink: any): Promise<any>;
    on(type: string, callback?: any, data?: any): any;
}
