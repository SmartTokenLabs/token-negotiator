import { Messaging } from "./messaging";
import "./../theme/style.css";
import './../vendor/keyShape';
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
    type: string;
    filter: {};
    options: any;
    offChainTokens: any;
    onChainTokens: any;
    selectedTokens: any;
    web3WalletProvider: any;
    messaging: Messaging;
    constructor(config: NegotiationInterface);
    updateTokenLookupStore(tokenKey: any, data: any): void;
    negotiatorConnectToWallet(walletType: string): Promise<void>;
    setPassiveNegotiationWebTokens(offChainTokens: any): Promise<void>;
    enrichTokenLookupDataOnChainTokens(onChainTokens: any): Promise<void>;
    setBlockChainTokens(onChainTokens: any): Promise<void>;
    negotiate(): Promise<void>;
    activeNegotiationStrategy(): Promise<void>;
    setPassiveNegotiationOnChainTokens(onChainTokens: any): Promise<void>;
    passiveNegotiationStrategy(iframeStorageSupport: boolean): Promise<void>;
    updateOverlayViewState(state: string): void;
    embedTokenConnectClientOverlayIframe(): void;
    addTheme(): void;
    assignFabButtonAnimation(): void;
    openOverlay(openOverlay: boolean): void;
    overlayClickHandler(): void;
    issuerConnected(issuer: string, onChain: boolean): void;
    navigateToTokensView(event: any): void;
    embedTokensIntoView(issuer: any): void;
    showTokenView(issuer: string): void;
    connectTokenIssuer(event: any): Promise<void>;
    connectOnChainTokenIssuer(event: any): Promise<void>;
    tokenToggleSelection(): void;
    authenticate(config: AuthenticateInterface): Promise<void>;
    checkPublicAddressMatch(issuer: string, unsignedToken: any): Promise<true | {
        status: boolean;
        useEthKey: null;
        proof: null;
    } | undefined>;
    eventSender: {
        emitAllTokensToClient: (tokens: any) => void;
        emitSelectedTokensToClient: () => void;
        emitProofToClient: (proof: any, issuer: any) => void;
    };
    addTokenThroughTab(magicLink: any): void;
    addTokenThroughIframe(magicLink: any): void;
    on(type: string, callback?: any, data?: any): any;
}
export {};
