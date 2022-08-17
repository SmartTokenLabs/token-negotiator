import { ResponseInterfaceBase } from "../core/messaging";
interface OutletInterface {
    collectionID: string;
    attestationOrigin: string;
    attestationInTab?: boolean;
    tokenParser?: any;
    base64senderPublicKeys: {
        [key: string]: string;
    };
    base64attestorPubKey: string;
    tokenUrlName?: string;
    tokenSecretName?: string;
    tokenIdName?: string;
    unsignedTokenDataName?: string;
    itemStorageKey?: string;
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
