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
    getTabIssuerTokens(tokenName: string, filter: any): {
        storageTokens: any;
        parentOrigin: string;
    } | {
        storageTokens: null;
        parentOrigin: null;
    };
    eventSender: {
        emitCookieSupport: (evtid: any) => void;
        emitTabIssuerTokensPassive: (evtid: any, opener: any, storageTokens: any, parentOrigin: any) => void;
        emitTabIssuerTokensActive: (evtid: any, opener: any, storageTokens: any, parentOrigin: any) => void;
        emitIframeIssuerTokensPassive: (evtid: any, tokens: any) => void;
        emitIframeIssuerTokensActive: (evtid: any, tokens: any) => void;
        emitTokenProofIframe: (tokenProof: any) => void;
        emitTokenProofTab: (tokenProof: any) => void;
    };
}
export {};
