import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from "./abstractAuthentication";
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
export declare class SignedUNChallenge extends AbstractAuthentication implements AuthenticationMethod {
    TYPE: string;
    private static DEFAULT_ENDPOINT;
    getTokenProof(_issuerConfig: OnChainTokenConfig | OffChainTokenConfig, _tokens: Array<any>, request: AuthenticateInterface): Promise<AuthenticationResult>;
}
