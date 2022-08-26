import { KeyStore } from "@tokenscript/attestation/dist/safe-connect/KeyStore";
export interface ChallengeInterface {
    expiry: number;
    messageToSign: string;
    address: string;
    signature?: string;
}
export interface ProofRequestInterface {
    type: string;
    subject: string;
    signature: string;
    address: string;
    data?: any;
}
export interface ProofResponseInterface {
    type: string;
    expiry: number;
    data?: any;
}
export declare class SafeConnect {
    static HOLDING_KEY_ALGORITHM: string;
    static keyStore: KeyStore;
    static getLinkPrivateKey(): Promise<CryptoKey>;
    static getLinkPublicKey(): Promise<string>;
    static getChallenge(safeConnectUrl: string, address: string): Promise<ChallengeInterface>;
    static getAttestation(safeConnectUrl: string, serverPayload: ProofRequestInterface): Promise<ProofResponseInterface>;
    private static apiRequest;
    static createAndSignLinkAttestation(addressAttest: string, linkedEthAddress: string, holdingPrivKey: CryptoKey): Promise<string>;
}
