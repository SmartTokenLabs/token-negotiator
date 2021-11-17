declare global {
    interface Window {
        Authenticator: any;
    }
}
interface Config {
    tokenName: any;
}
export declare class Outlet {
    constructor(tokenConfig: Config);
}
export {};
