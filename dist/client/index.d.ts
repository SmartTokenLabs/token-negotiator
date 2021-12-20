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
    options: any;
    offChainTokens: any;
    onChainTokens: any;
    constructor(config: NegotiationInterface);
    setWebTokens(offChainTokens: any): Promise<void>;
    setBlockChainTokens(onChainTokens: any): Promise<void>;
    negotiate(): Promise<any>;
    passiveNegotiationStrategy(): Promise<any>;
    activeNegotiationStrategy(): void;
    embedClientOverlay(): void;
    addTheme(): void;
    assignFabButtonAnimation(): void;
    openOverlay(openOverlay: boolean): void;
    overlayClickHandler(): void;
    tokenToggleSelection(): void;
    authenticate(config: AuthenticateInterface): Promise<{
        status: boolean;
        useEthKey: any;
        proof: unknown;
    }>;
    addTokenThroughIframe(magicLink: any): void;
}
export {};
