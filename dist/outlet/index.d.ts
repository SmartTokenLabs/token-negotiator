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
    constructor(config: OutletInterface);
}
export {};
