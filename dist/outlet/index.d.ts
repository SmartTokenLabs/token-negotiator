import { MessageResponseInterface } from '../client/messaging';
interface OutletInterface {
    config: any;
}
export declare class Outlet {
    tokenConfig: any;
    constructor(config: OutletInterface);
    getDataFromQuery(itemKey: any): string | undefined;
    getFilter(): any;
    pageOnLoadEventHandler(): void;
    prepareTokenOutput(filter: any): any;
    sendTokenProof(evtid: any, token: any): Promise<"error" | undefined>;
    private sendTokens;
    sendMessageResponse(response: MessageResponseInterface): void;
}
export {};
