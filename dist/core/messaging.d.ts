export interface RequestInterfaceBase {
    action: MessageActionBase | string;
    origin: string;
    timeout?: number;
    data: {
        [key: string]: any;
    };
}
export declare enum MessageActionBase {
    COOKIE_CHECK = "cookie-check"
}
export interface ResponseInterfaceBase {
    evtid: any;
    evt: ResponseActionBase | string;
    data?: {
        [key: string]: any;
    };
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
    rejectHandler: Function | null;
    constructor();
    sendMessage(request: RequestInterfaceBase, forceTab?: boolean): Promise<unknown>;
    private sendIframe;
    private sendPopup;
    private setResponseListener;
    private getModal;
    private constructUrl;
    openTab(url: string): Window | null;
    createIframe(url?: string): HTMLIFrameElement;
    private static getUniqueEventId;
}
