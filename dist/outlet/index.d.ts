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
    prepareTokenOutput(tokenName: string, filter: any): any;
    sendTokenProof(token: any): "error" | undefined;
    sendTokens(tokenName: string): void;
    eventReciever: (event: any) => void;
    eventSender: {
        emitTokens: (tokens: any) => void;
        emitTokenProof: (tokenProof: any) => void;
    };
}
export {};
