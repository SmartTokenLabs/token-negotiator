export interface RequestInterfaceBase {
    action: string;
    origin: string;
    timeout?: number;
    data: {
        [key: string]: any;
    };
}
export interface ResponseInterfaceBase {
    evtid: any;
    evt: string;
    data?: any;
    errors?: string[];
    max_width?: string;
    min_height?: string;
}
export declare enum ResponseActionBase {
    COOKIE_CHECK = "cookie-check",
    ERROR = "error",
    SHOW_FRAME = "show-frame"
}
declare global {
    interface Window {
        NEGOTIATOR_DEBUG: boolean;
        safari?: any;
    }
}
export declare class Messaging {
    iframeStorageSupport: null | boolean;
    iframe: any;
    listenerSet: boolean;
    sendMessage(request: RequestInterfaceBase, forceTab?: boolean, redirectUrl?: false | string): Promise<ResponseInterfaceBase>;
    private sendRedirect;
    private sendIframe;
    private sendPopup;
    private setResponseListener;
    private getModal;
    private removeModal;
    private constructUrl;
    openTab(url: string): Window;
    createIframe(closeCallback?: any): HTMLIFrameElement;
    private static getUniqueEventId;
}
