import { UNInterface } from "../client/auth/util/UN";
import { Ui } from "../client/ui";
export declare enum SafeConnectAction {
    CONNECT = "connect",
    NEW_CHALLENGE = "new_challenge"
}
export declare type ProofType = "address_attest" | "simple_challenge" | "nft_attest";
export interface SafeConnectOptions {
    url: string;
    initialProof: ProofType | false;
}
export declare class SafeConnectProvider {
    private ui;
    private keyStore;
    private readonly options;
    private messaging;
    constructor(ui: Ui, options: SafeConnectOptions);
    initSafeConnect(): Promise<any>;
    private processProofResult;
    private getInitialProofRequest;
    signUNChallenge(un: UNInterface): Promise<any>;
}
