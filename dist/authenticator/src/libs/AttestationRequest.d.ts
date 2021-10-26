import { FullProofOfExponent } from "./FullProofOfExponent";
export declare class AttestationRequest {
    private type;
    pok: FullProofOfExponent;
    private constructor();
    static fromData(type: number, pok: FullProofOfExponent): AttestationRequest;
    getDerEncoding(): string;
    static fromBytes(asn1: Uint8Array): AttestationRequest;
    verify(): boolean;
    getPok(): FullProofOfExponent;
    getType(): number;
}
