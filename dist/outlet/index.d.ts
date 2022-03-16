import { MessageResponseInterface } from '../client/messaging';
interface OutletInterface {
    tokenName: string;
}
export declare class Outlet {
    config: any;
    tokenName: any;
    tokenIssuer: any;
    constructor(config: OutletInterface);
    getDataFromQuery(itemKey: any): string | undefined;
    getFilter(): any;
    pageOnLoadEventHandler(): void;
    prepareTokenOutput(tokenName: string, filter: any): any;
    sendTokenProof(evtid: any, token: any): Promise<"error" | undefined>;
    private sendTokens;
    sendMessageResponse(response: MessageResponseInterface): void;
}
export {};
