var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import { ValidityValue } from "./AuthenticationFramework";
const AsnCRITICAL = false;
export class ChequeASN {
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], ChequeASN.prototype, "amount", void 0);
__decorate([
    AsnProp({ type: ValidityValue })
], ChequeASN.prototype, "validity", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], ChequeASN.prototype, "commitment", void 0);
export class SignedCheque {
}
__decorate([
    AsnProp({ type: ChequeASN })
], SignedCheque.prototype, "cheque", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], SignedCheque.prototype, "publicKey", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], SignedCheque.prototype, "signatureValue", void 0);
