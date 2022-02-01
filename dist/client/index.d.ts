import "./../theme/style.css";
import './../vendor/keyShape';
interface GetTokenInterface {
    issuer: string;
    filter: any;
    tokensOrigin: any;
    negotiationType: string;
}
interface NegotiationInterface {
    type: string;
    issuers: string[];
    options: any;
}
declare global {
    interface Window {
        KeyshapeJS?: any;
        tokenToggleSelection: any;
        Authenticator: any;
        ethereum: any;
    }
}
interface AuthenticateInterface {
    issuer: any;
    unsignedToken: any;
}
export declare class Client {
    issuers: string[];
    issuerTabInstanceRefs: {};
    type: string;
    filter: {};
    options: any;
    offChainTokens: any;
    onChainTokens: any;
    selectedTokens: any;
    iframeStorageSupport: any;
    web3WalletProvider: any;
    constructor(config: NegotiationInterface);
    openIframe(url: any): Promise<unknown>;
    negotiatorConnectToWallet(walletType: string): Promise<void>;
    getTokensIframe(config: GetTokenInterface): Promise<unknown>;
    setPassiveNegotiationWebTokens(offChainTokens: any): Promise<void>;
    setBlockChainTokens(onChainTokens: any): Promise<void>;
    negotiate(): Promise<void>;
    activeNegotiationStrategy(): Promise<void>;
    passiveNegotiationStrategy(iframeStorageSupport: boolean): Promise<void>;
    updateOverlayViewState(state: string): void;
    embedTokenConnectClientOverlayIframe(): void;
    addTheme(): void;
    assignFabButtonAnimation(): void;
    openOverlay(openOverlay: boolean): void;
    overlayClickHandler(): void;
    issuerConnected(issuer: string): void;
    navigateToTokensView(event: any): void;
    embedTokensIntoView(issuer: any): void;
    showTokenView(issuer: string): void;
    connectTokenIssuerWithIframe(event: any): void;
    connectTokenIssuerWithTab(event: any): void;
    tokenToggleSelection(): void;
    authenticate(config: AuthenticateInterface): Promise<void>;
    checkPublicAddressMatch(issuer: string, unsignedToken: any): Promise<true | {
        status: boolean;
        useEthKey: null;
        proof: null;
    } | undefined>;
    getTokenProofIframe(issuer: any, unsignedToken: any): Promise<unknown>;
    getTokenProofTab(issuer: any, unsignedToken: any): Promise<void>;
    eventSender: {
        emitAllTokensToClient: (tokens: any) => void;
        emitSelectedTokensToClient: () => void;
        emitProofToClient: (proof: any, issuer: any) => void;
    };
    eventReciever: (event: any) => void;
    addTokenThroughTab(magicLink: any): void;
    addTokenThroughIframe(magicLink: any): void;
    thirdPartyCookieSupportCheck(tokensOrigin: any): Promise<unknown>;
    on(type: string, callback?: any, data?: any): any;
}
export {};
