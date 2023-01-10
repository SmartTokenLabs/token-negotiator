import { UNInterface } from "../client/auth/util/UN";
import { UiInterface } from "../client/ui";
export declare enum SafeConnectAction {
    CONNECT = "connect",
    NEW_CHALLENGE = "new_challenge"
}
export type ProofType = "address_attest" | "simple_challenge" | "nft_attest";
export interface SafeConnectOptions {
    url: string;
    initialProof: ProofType | false;
}
export declare class SafeConnectProvider {
    private ui;
    private keyStore;
    private readonly options;
    private messaging;
    constructor(ui: UiInterface, options: SafeConnectOptions);
    initSafeConnect(): Promise<any>;
    private processProofResult;
    private getInitialProofRequest;
    signUNChallenge(un: UNInterface): Promise<any>;
}
