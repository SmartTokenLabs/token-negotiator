import { UNInterface } from "../client/auth/util/UN";
export declare enum SafeConnectAction {
    CONNECT = "connect",
    SIGN_UN = "sign_un",
    NEW_CHALLENGE = "new_challenge"
}
export declare type ProofType = "address_attest" | "simple_challenge" | "nft_attest";
export interface SafeConnectOptions {
    url: string;
    initialProof: ProofType | false;
}
export declare class SafeConnectProvider {
    private messaging;
    private keyStore;
    private readonly options;
    static HOLDING_KEY_ALGORITHM: string;
    constructor(options: SafeConnectOptions);
    initSafeConnect(): Promise<any>;
    private processProofResult;
    private getInitialProofRequest;
    signUNChallenge(un: UNInterface): Promise<any>;
    getLinkSigningKey(): Promise<CryptoKey>;
}
