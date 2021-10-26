import { JsonEncodable } from "../intefaces/JsonEncodable";
import { Verifiable } from "./Verifiable";
import { KeyPair } from "./KeyPair";
import { Eip712Token } from "./Eip712Token";
import { UseAttestation } from "./UseAttestation";
import { FullProofOfExponent } from "./FullProofOfExponent";
import { TokenValidateable } from "./TokenValidateable";
export declare class Eip712AttestationUsage extends Eip712Token implements JsonEncodable, Verifiable, TokenValidateable {
    PLACEHOLDER_CHAIN_ID: number;
    Eip712PrimaryName: string;
    Eip712Description: string;
    Eip712UserTypes: {
        name: string;
        type: string;
    }[];
    private useAttestation;
    private jsonEncoding;
    private attestorKey;
    private userKey;
    private maxTokenValidityInMs;
    protected data: {
        payload: string;
        description: string;
        identifier: string;
        timestamp: string;
        expirationTime: string;
    };
    constructor(userKey?: KeyPair, maxTokenValidityInMs?: number);
    addData(attestorDomain: string, identifier: string, useAttestation: UseAttestation): Promise<false | undefined>;
    fillJsonData(json: string, attestorKey?: KeyPair): void;
    constructorCheck(): void;
    makeToken(identifier: string, useAttestation: UseAttestation): Promise<string>;
    proofLinking(): boolean;
    getPok(): FullProofOfExponent;
    getType(): number;
    getIdentifier(): string;
    getAttestation(): import("./SignedIdentifierAttestation").SignedIdentifierAttestation;
    getJsonEncoding(): string;
    checkTokenValidity(): boolean;
    verify(): boolean;
    getSessionPublicKey(): KeyPair;
}
