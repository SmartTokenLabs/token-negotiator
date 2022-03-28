import { Messaging } from "./messaging";
import { Popup } from './popup';
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
    issuers: any[];
    type: string;
    filter: {};
    options: any;
    offChainTokens: any;
    onChainTokens: any;
    tokenLookup: any;
    selectedTokens: any;
    web3WalletProvider: any;
    messaging: Messaging;
    popup: Popup;
    constructor(config: NegotiationInterface);
    getTokenData(): {
        offChainTokens: any;
        onChainTokens: any;
        tokenLookup: any;
        selectedTokens: any;
    };
    updateTokenLookupStore(tokenKey: any, data: any): void;
    negotiatorConnectToWallet(walletType: string): Promise<any>;
    setPassiveNegotiationWebTokens(offChainTokens: any): Promise<void>;
    enrichTokenLookupDataOnChainTokens(onChainTokens: any): Promise<void>;
    negotiate(): Promise<void>;
    activeNegotiationStrategy(): Promise<void>;
    setPassiveNegotiationOnChainTokens(onChainTokens: any): Promise<void>;
    passiveNegotiationStrategy(): Promise<void>;
    connectTokenIssuer(issuer: string): Promise<any[]>;
    connectOnChainTokenIssuer(issuer: any): Promise<any[]>;
    updateSelectedTokens(selectedTokens: any): void;
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
