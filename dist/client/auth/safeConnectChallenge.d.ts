import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from "./abstractAuthentication";
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
export declare class SafeConnectChallenge extends AbstractAuthentication implements AuthenticationMethod {
    TYPE: string;
    getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, _tokens: Array<any>, _request: AuthenticateInterface): Promise<AuthenticationResult>;
}
