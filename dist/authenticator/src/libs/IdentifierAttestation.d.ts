import { KeyPair } from "./KeyPair";
import { Attestation } from "./Attestation";
import { Validateable } from "./Validateable";
export declare class IdentifierAttestation extends Attestation implements Validateable {
    private crypto;
    static OID_OCTETSTRING: string;
    static DEFAULT_SIGNING_ALGORITHM: string;
    static HIDDEN_IDENTIFIER_VERSION: number;
    static NFT_VERSION: number;
    static HIDDEN_TYPE: string;
    static HIDDEN_IDENTIFIER: string;
    static LABELED_URI: string;
    private type;
    private identifier;
    constructor();
    fromCommitment(commitment: Uint8Array, keys: KeyPair): void;
    private setUnlimitedValidity;
    static fromData(identifier: string, type: number, keys: KeyPair, secret: bigint): IdentifierAttestation;
    static fromLabelAndUrl(label: string, URL: string, keys: KeyPair): IdentifierAttestation;
    private makeLabeledURI;
    static fromBytes(bytes: Uint8Array): IdentifierAttestation;
    setSubjectPublicKeyInfo(keys: KeyPair): void;
    setCommitment(encodedRiddle: Uint8Array): void;
    checkValidity(): boolean;
    setIssuer(issuer: string): void;
    getSerialNumber(): number;
    setSerialNumber(serialNumber: number): void;
    getAddress(): string;
}
