import { AlgorithmIdentifierASN, Extensions, ValidityValue, Version } from "./AuthenticationFramework";
import { Name } from "./InformationFramework";
import { SubjectPublicKeyInfo } from "./AttestationFramework";
export declare class UriIdAttestation {
    signedInfo: Uint8Array;
    signatureAlgorithm: AlgorithmIdentifierASN;
    signatureValue: Uint8Array;
}
export declare class SignedInfo {
    version: Version;
    serialNumber: number;
    signature: AlgorithmIdentifierASN;
    issuer: Name;
    validity?: ValidityValue;
    subject: Name;
    subjectPublicKeyInfo: SubjectPublicKeyInfo;
    extensions: Extensions;
}
