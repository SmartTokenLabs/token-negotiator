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
    sendTokenProof(token: any, type: any): "error" | undefined;
    getIframeIssuerTokens(tokenName: string, filter: any, negotiationType: string): void;
    getTabIssuerTokens(tokenName: string, filter: any): {
        storageTokens: any;
        parentOrigin: string;
    } | undefined;
    eventSender: {
        emitCookieSupport: () => void;
        emitTabIssuerTokensPassive: (opener: any, storageTokens: any, parentOrigin: any) => void;
        emitTabIssuerTokensActive: (opener: any, storageTokens: any, parentOrigin: any) => void;
        emitIframeIssuerTokensPassive: (tokens: any) => void;
        emitIframeIssuerTokensActive: (tokens: any) => void;
        emitTokenProofIframe: (tokenProof: any) => void;
        emitTokenProofTab: (tokenProof: any) => void;
    };
}
export {};
