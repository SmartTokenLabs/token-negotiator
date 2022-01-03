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
    constructor(config: OutletInterface);
    prepareTokenOutput(tokenName: string): any;
    sendTokens(tokenName: string): void;
    eventReciever: (data: any) => void;
    eventSender: {
        emitTokens: (tokens: any) => void;
        emitTokenProof: (tokenProof: any) => void;
    };
}
export {};
