var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import { AlgorithmIdentifierASN, Extensions, ValidityValue, Version } from "./AuthenticationFramework";
import { Name } from "./InformationFramework";
import { SubjectPublicKeyInfo } from "./AttestationFramework";
export class UriIdAttestation {
    constructor() {
        this.signedInfo = new Uint8Array();
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], UriIdAttestation.prototype, "signedInfo", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifierASN })
], UriIdAttestation.prototype, "signatureAlgorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], UriIdAttestation.prototype, "signatureValue", void 0);
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
    AsnProp({ type: Extensions })
], SignedInfo.prototype, "extensions", void 0);
