var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
export class Proof {
}
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], Proof.prototype, "riddle", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], Proof.prototype, "challengePoint", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], Proof.prototype, "responseValue", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], Proof.prototype, "nonce", void 0);
export class UsageProof {
}
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], UsageProof.prototype, "challengePoint", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], UsageProof.prototype, "responseValue", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], UsageProof.prototype, "nonce", void 0);
