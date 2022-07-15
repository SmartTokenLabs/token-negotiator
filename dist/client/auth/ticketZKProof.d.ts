import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from "./abstractAuthentication";
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from "../interface";
import Web3WalletProvider from "../../wallet/Web3WalletProvider";
export declare class TicketZKProof extends AbstractAuthentication implements AuthenticationMethod {
    TYPE: string;
    private messaging;
    getTokenProof(issuerConfig: OnChainTokenConfig | OffChainTokenConfig, tokens: Array<any>, web3WalletProvider: Web3WalletProvider, request: AuthenticateInterface): Promise<AuthenticationResult>;
}
