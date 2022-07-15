import { ResponseInterfaceBase } from "../core/messaging";
interface OutletInterface {
    config: any;
}
export declare class readSignedTicket {
    ticket: any;
    constructor(source: any);
}
export declare class Outlet {
    tokenConfig: any;
    urlParams?: URLSearchParams;
    constructor(config: OutletInterface);
    getDataFromQuery(itemKey: any): string;
    getFilter(): any;
    pageOnLoadEventHandler(): void;
    sendCookieCheck(evtid: string): void;
    prepareTokenOutput(filter: any): any;
    sendTokenProof(evtid: any, token: any, address: string, wallet: string): Promise<string>;
    private sendTokens;
    sendErrorResponse(evtid: any, error: string): void;
    sendMessageResponse(response: ResponseInterfaceBase): void;
}
export {};
