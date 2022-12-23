import { OutletInterface } from "./index";
import { OffChainTokenConfig } from "../client/interface";
export declare class LocalOutlet {
    private tokenConfig;
    constructor(config: OutletInterface & OffChainTokenConfig);
    getTokens(): any;
    authenticate(unsignedToken: any, address: string, wallet: string, redirectMode?: false | string): Promise<unknown>;
}
