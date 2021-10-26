import { KeyPair } from "./KeyPair";
import { Verifiable } from "./Verifiable";
import { Validateable } from "./Validateable";
import { FullProofOfExponent } from "./FullProofOfExponent";
import { SignedIdentifierAttestation } from "./SignedIdentifierAttestation";
import { ASNEncodable } from "./ASNEncodable";
export declare class UseAttestation implements ASNEncodable, Verifiable, Validateable {
    private attestation;
    type: number;
    private pok;
    private sessionPublicKey;
    private encoding;
    static fromData(attestation: SignedIdentifierAttestation, type: number, pok: FullProofOfExponent, sessionPublicKey: KeyPair): UseAttestation;
    static fromBytes(derEncoding: Uint8Array, attestationVerificationKey: KeyPair): UseAttestation;
    constructorCheck(): void;
    makeEncoding(attestation: SignedIdentifierAttestation, type: number, pok: FullProofOfExponent, sessionKey: KeyPair): string;
    getAttestation(): SignedIdentifierAttestation;
    getType(): number;
    getPok(): FullProofOfExponent;
    getSessionPublicKey(): KeyPair;
    getDerEncoding(): string;
    verify(): boolean;
    checkValidity(): boolean;
}
