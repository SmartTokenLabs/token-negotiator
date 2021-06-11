import {AsnProp, AsnPropTypes, AsnType, AsnTypeTypes} from "@peculiar/asn1-schema";
import {ValidityValue, Version, AlgorithmIdentifierASN, Extensions} from "./AuthenticationFramework";
import {Name} from "./InformationFramework";

export class SubjectPublicKeyInfoValue {
    @AsnProp({ type: AlgorithmIdentifierASN }) public algorithm: AlgorithmIdentifierASN;
    @AsnProp({ type: AsnPropTypes.BitString }) public subjectPublicKey: AsnPropTypes.BitString;
}

@AsnType({ type: AsnTypeTypes.Choice })
export class SubjectPublicKeyInfo {
    @AsnProp({ type: SubjectPublicKeyInfoValue }) public value?: SubjectPublicKeyInfoValue;
    @AsnProp({ type: AsnPropTypes.Any }) public null? = false;
}

@AsnType({ type: AsnTypeTypes.Choice })
export class AttestsTo {
    @AsnProp({ type: Extensions, context: 3})
    public extensions?: Extensions;
    // @AsnProp({ type: AsnPropTypes.Any, context: 3})
    // public extensions?: AsnPropTypes.Any;
    @AsnProp({ type: AsnPropTypes.Any, context: 4 })
    public dataObject?: AsnPropTypes.Any;
}
//attestsTo         CHOICE {
//             extensions        [3] EXPLICIT Extensions,
//             dataObject        [4] DataObject -- defined per objectClass
//     }

export class SmartContract {
    @AsnProp({ type: AsnPropTypes.Integer }) public value: number;
}


export class SignedInfo {
    @AsnProp({ type: Version }) public version: Version; // [0]  EXPLICIT Version,
    @AsnProp({ type: AsnPropTypes.Integer }) public serialNumber: number; // CertificateSerialNumber,
    @AsnProp({ type: AlgorithmIdentifierASN }) public signature: AlgorithmIdentifierASN; // AlgorithmIdentifier,
    @AsnProp({ type: Name }) public issuer:Name; // Name,
    @AsnProp({ type: ValidityValue }) public validity:ValidityValue; // Validity,
    @AsnProp({ type: Name }) public subject: Name; //  Name,
    @AsnProp({ type: SubjectPublicKeyInfo }) public subjectPublicKeyInfo: SubjectPublicKeyInfo; // SubjectPublicKeyInfo,
    @AsnProp({ type: SmartContract, optional: true }) public contract?: SmartContract; // contract             SEQUENCE OF SmartContract OPTIONAL,
    @AsnProp({ type: AttestsTo }) public attestsTo: AttestsTo; //attestsTo
}

export class MyAttestation {
    // dont decode signedInfo to stay is solid for verification
    @AsnProp({ type: AsnPropTypes.Any }) public signedInfo: Uint8Array = new Uint8Array();
    // @AsnProp({ type: SignedInfo }) public signedInfo:SignedInfo;
    @AsnProp({ type: AlgorithmIdentifierASN }) public signatureAlgorithm: AlgorithmIdentifierASN;
    @AsnProp({ type: AsnPropTypes.BitString }) public signatureValue: AsnPropTypes.BitString;
}
