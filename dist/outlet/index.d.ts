interface OutletInterface {
    tokenName: string;
}
declare global {
    interface Window {
        Authenticator: any;
    }
}
export declare class Outlet {
    authenticator: any;
    config: any;
    tokenName: any;
    tokenIssuer: any;
    constructor(config: OutletInterface);
    getDataFromQuery(itemKey: any): string | undefined;
    getFilter(): any;
    pageOnLoadEventHandler(): void;
    prepareTokenOutput(tokenName: string, filter: any): any;
    sendTokenProof(token: any): "error" | undefined;
    getIframeIssuerTokens(tokenName: string, filter: any, negotiationType: string): void;
    getTabIssuerTokens(tokenName: string, filter: any): void;
    eventSender: {
        emitCookieSupport: () => void;
        emitTabIssuerTokens: (opener: any, storageTokens: any, parentOrigin: any) => void;
        emitIframeIssuerTokensPassive: (tokens: any) => void;
        emitIframeIssuerTokensActive: (tokens: any) => void;
        emitTokenProof: (tokenProof: any) => void;
    };
}
export {};
