import { MyAttestation } from "../asn1/shemas/AttestationFramework";
import { KeyPair } from "./KeyPair";
import { Attestation } from "./Attestation";
import { Verifiable } from "./Verifiable";
import { Validateable } from "./Validateable";
import { ASNEncodable } from "./ASNEncodable";
import { IdentifierAttestation } from "./IdentifierAttestation";
export declare class SignedIdentifierAttestation implements ASNEncodable, Verifiable, Validateable {
    private signature;
    private att;
    private commitment;
    private uint8data;
    private attestorKeys;
    static ECDSA_WITH_SHA256: string;
    constructor();
    static fromBytes(uint8data: Uint8Array, attestorKeys: KeyPair): SignedIdentifierAttestation;
    static fromASNType(myAttestation: MyAttestation, attestorKeys: KeyPair, uint8data?: Uint8Array): SignedIdentifierAttestation;
    static fromData(att: IdentifierAttestation, attestationSigningKey: KeyPair): SignedIdentifierAttestation;
    verify(): boolean;
    checkValidity(): boolean;
    getUnsignedAttestation(): IdentifierAttestation;
    getDerEncoding(): string;
    constructSignedAttestation(unsignedAtt: Attestation, signature: string): string;
    constructorCheck(): void;
}
