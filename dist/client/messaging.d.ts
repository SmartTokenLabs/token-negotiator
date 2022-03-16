export interface MessageRequestInterface {
    issuer: string;
    action: MessageAction;
    origin: string;
    timeout?: number;
    filter?: string[];
    token?: string;
}
export declare enum MessageAction {
    COOKIE_CHECK = "cookie-check",
    GET_ISSUER_TOKENS = "get-issuer-tokens",
    GET_PROOF = "get-proof"
}
export interface MessageResponseInterface {
    evtid: any;
    evt: string;
    issuer?: string;
    tokens?: [];
    proof?: any;
    thirdPartyCookies?: any;
    errors?: any[] | undefined;
}
export declare enum MessageResponseAction {
    COOKIE_CHECK = "cookie-check",
    ISSUER_TOKENS = "issuer-tokens",
    PROOF = "proof",
    ERROR = "error",
    SHOW_FRAME = "show-frame"
}
export declare class Messaging {
    iframeStorageSupport: null | boolean;
    requestQueue: {};
    constructor();
    sendMessage(request: MessageRequestInterface): Promise<unknown>;
    private sendIframe;
    private sendPopup;
    private setResponseListener;
    private getModal;
    getCookieSupport(testOrigin: string): Promise<boolean>;
    private thirdPartyCookieSupportCheck;
    private constructUrl;
    openTab(url: string): Window | null;
    createIframe(url?: string): HTMLIFrameElement;
    private static getUniqueEventId;
}
