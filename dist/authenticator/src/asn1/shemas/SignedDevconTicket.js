var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import { AlgorithmIdentifierASN } from "./AuthenticationFramework";
export class DevconTicket {
}
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], DevconTicket.prototype, "devconId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], DevconTicket.prototype, "ticketId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], DevconTicket.prototype, "ticketClass", void 0);
export class PublicKeyInfo {
}
__decorate([
    AsnProp({ type: AlgorithmIdentifierASN })
], PublicKeyInfo.prototype, "algorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], PublicKeyInfo.prototype, "publicKey", void 0);
export class SignedDevconTicket {
}
__decorate([
    AsnProp({ type: DevconTicket })
], SignedDevconTicket.prototype, "ticket", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], SignedDevconTicket.prototype, "commitment", void 0);
__decorate([
    AsnProp({ type: PublicKeyInfo, optional: true })
], SignedDevconTicket.prototype, "publicKeyInfo", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], SignedDevconTicket.prototype, "signatureValue", void 0);
