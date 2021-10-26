var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes, AsnType, AsnTypeTypes } from "@peculiar/asn1-schema";
import { ValidityValue, Version, AlgorithmIdentifierASN, Extensions } from "./AuthenticationFramework";
import { Name } from "./InformationFramework";
export class PublicKeyInfoValue {
}
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], PublicKeyInfoValue.prototype, "algorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], PublicKeyInfoValue.prototype, "publicKey", void 0);
let SubjectPublicKeyInfo = class SubjectPublicKeyInfo {
    constructor() {
        this.null = false;
    }
};
__decorate([
    AsnProp({ type: PublicKeyInfoValue })
], SubjectPublicKeyInfo.prototype, "value", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], SubjectPublicKeyInfo.prototype, "null", void 0);
SubjectPublicKeyInfo = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], SubjectPublicKeyInfo);
export { SubjectPublicKeyInfo };
export class PrivateKeyData {
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], PrivateKeyData.prototype, "one", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], PrivateKeyData.prototype, "privateKey", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any, context: 0 })
], PrivateKeyData.prototype, "algDescr", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString, context: 1 })
], PrivateKeyData.prototype, "publicKey", void 0);
export class PrivateKeyInfo {
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], PrivateKeyInfo.prototype, "one", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], PrivateKeyInfo.prototype, "algIdent", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], PrivateKeyInfo.prototype, "keysData", void 0);
let Payload = class Payload {
};
__decorate([
    AsnProp({ type: Extensions, context: 3 })
], Payload.prototype, "extensions", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any, context: 4 })
], Payload.prototype, "dataObject", void 0);
Payload = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], Payload);
export { Payload };
export class SmartContract {
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], SmartContract.prototype, "value", void 0);
export class SignedInfo {
}
__decorate([
    AsnProp({ type: Version })
], SignedInfo.prototype, "version", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], SignedInfo.prototype, "serialNumber", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifierASN })
], SignedInfo.prototype, "signature", void 0);
__decorate([
    AsnProp({ type: Name })
], SignedInfo.prototype, "issuer", void 0);
__decorate([
    AsnProp({ type: ValidityValue, optional: true })
], SignedInfo.prototype, "validity", void 0);
__decorate([
    AsnProp({ type: Name })
], SignedInfo.prototype, "subject", void 0);
__decorate([
    AsnProp({ type: SubjectPublicKeyInfo })
], SignedInfo.prototype, "subjectPublicKeyInfo", void 0);
__decorate([
    AsnProp({ type: SmartContract, optional: true })
], SignedInfo.prototype, "contract", void 0);
__decorate([
    AsnProp({ type: Payload, optional: true })
], SignedInfo.prototype, "attestsTo", void 0);
export class MyAttestation {
    constructor() {
        this.signedInfo = new Uint8Array();
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], MyAttestation.prototype, "signedInfo", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifierASN })
], MyAttestation.prototype, "signatureAlgorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], MyAttestation.prototype, "signatureValue", void 0);
