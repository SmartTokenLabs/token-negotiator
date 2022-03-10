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
    sendTokenProof(evtid: any, token: any): "error" | undefined;
    private sendTokens;
    private sendMessageResponse;
}
export {};
