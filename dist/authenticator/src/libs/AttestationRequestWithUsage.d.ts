import { KeyPair } from "./KeyPair";
import { FullProofOfExponent } from "./FullProofOfExponent";
import { ASNEncodable } from "./ASNEncodable";
import { Verifiable } from "./Verifiable";
export declare class AttestationRequestWithUsage implements ASNEncodable, Verifiable {
    private sessionPublicKey;
    private type;
    pok: FullProofOfExponent;
    private constructor();
    static fromData(type: number, pok: FullProofOfExponent, sessionPublicKey: KeyPair): AttestationRequestWithUsage;
    static fromBytes(asn1: Uint8Array): AttestationRequestWithUsage;
    verify(): boolean;
    getDerEncoding(): string;
    getPok(): FullProofOfExponent;
    getType(): number;
    getSessionPublicKey(): KeyPair;
}
