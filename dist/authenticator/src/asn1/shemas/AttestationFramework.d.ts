import { AsnPropTypes } from "@peculiar/asn1-schema";
import { ValidityValue, Version, AlgorithmIdentifierASN, Extensions } from "./AuthenticationFramework";
import { Name } from "./InformationFramework";
export declare class PublicKeyInfoValue {
    algorithm: Uint8Array;
    publicKey: Uint8Array;
}
export declare class SubjectPublicKeyInfo {
    value?: PublicKeyInfoValue;
    null?: boolean | undefined;
}
export declare class PrivateKeyData {
    one: number;
    privateKey: Uint8Array;
    algDescr: Uint8Array;
    publicKey: Uint8Array;
}
export declare class PrivateKeyInfo {
    one: number;
    algIdent: Uint8Array;
    keysData: Uint8Array;
}
export declare class Payload {
    extensions?: Extensions;
    dataObject?: AsnPropTypes.Any;
}
export declare class SmartContract {
    value: number;
}
export declare class SignedInfo {
    version: Version;
    serialNumber: number;
    signature: AlgorithmIdentifierASN;
    issuer: Name;
    validity?: ValidityValue;
    subject: Name;
    subjectPublicKeyInfo: SubjectPublicKeyInfo;
    contract?: SmartContract;
    attestsTo?: Payload;
}
export declare class MyAttestation {
    signedInfo: Uint8Array;
    signatureAlgorithm: AlgorithmIdentifierASN;
    signatureValue: Uint8Array;
}
