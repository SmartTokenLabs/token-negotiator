declare global {
    interface Window {
        DISPLAY_DEBUG_LEVEL: string;
    }
}
export declare function logger(level: number, ...args: any[]): void;
export declare const requiredParams: (item: any, msg: string) => void;
export declare function uint8toBuffer(uint8: Uint8Array): any;
export declare const compareObjects: (o1: any, o2: any) => boolean;
export declare const base64ToUint8array: (base64str: string) => Uint8Array;
export declare const attachPostMessageListener: (listener: any) => void;
export declare const removePostMessageListener: (listener: any) => void;
export declare const waitForElementToExist: (selector: string) => Promise<Element>;
export declare type ErrorType = 'warning' | 'info' | 'error';
export declare const errorHandler: (message: string, type: ErrorType, action?: Function | null, data?: unknown, log?: boolean, throwError?: boolean) => {
    type: ErrorType;
    message: string;
    data: unknown;
};
