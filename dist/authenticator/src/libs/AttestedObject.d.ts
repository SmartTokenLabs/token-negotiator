import { SignedIdentifierAttestation } from "./SignedIdentifierAttestation";
import { ProofOfExponentInterface } from "./ProofOfExponentInterface";
import { KeyPair } from "./KeyPair";
import { UseToken } from "../asn1/shemas/UseToken";
import { Attestable } from "./Attestable";
import { Verifiable } from "./Verifiable";
import { ASNEncodable } from "./ASNEncodable";
import { AttestableObject } from "./AttestableObject";
declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}
export declare class AttestedObject implements ASNEncodable, Verifiable {
    private crypto;
    private pok;
    private derEncodedProof;
    private encoding;
    private attestableObject;
    private att;
    private attestationSecret;
    private objectSecret;
    private userPublicKey;
    private userKeyPair;
    private preSignEncoded;
    private webDomain;
    static Eip712UserData: {
        [index: string]: string | number;
    };
    static Eip712UserDataTypes: {
        name: string;
        type: string;
    }[];
    static Eip712UserDataPrimaryName: string;
    static Eip712UserDataDescription: string;
    constructor();
    create<T extends Attestable>(attestableObject: T, att: SignedIdentifierAttestation, attestationSecret: bigint, objectSecret: bigint): void;
    setWebDomain(domain: string): void;
    fillPresignData(): void;
    fromDecodedData<T extends Attestable>(attestableObject: T, att: SignedIdentifierAttestation, pok: ProofOfExponentInterface): void;
    verify(): boolean;
    static fromBytes<D extends UseToken, T extends AttestableObject>(asn1: Uint8Array, decoder: new () => D, attestorKey: KeyPair, attestable: new () => T, issuerKey: KeyPair): AttestedObject;
    private makeProof;
    getAttestableObject(): any;
    getAtt(): SignedIdentifierAttestation;
    getDerEncodeProof(): string;
    getDerEncoding(): string;
    getUserPublicKey(): Uint8Array;
    private constructorCheck;
    checkValidity(): boolean;
}
