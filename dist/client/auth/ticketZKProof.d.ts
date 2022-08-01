import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from "./abstractAuthentication";
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
export declare class TicketZKProof extends AbstractAuthentication implements AuthenticationMethod {
    TYPE: string;
    private messaging;
    getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, request: AuthenticateInterface): Promise<AuthenticationResult>;
}
