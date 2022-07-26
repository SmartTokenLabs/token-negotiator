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
    sendMessage(request: RequestInterfaceBase, forceTab?: boolean): Promise<ResponseInterfaceBase>;
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
