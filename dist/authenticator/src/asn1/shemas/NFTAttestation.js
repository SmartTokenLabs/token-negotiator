var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes } from "@peculiar/asn1-schema";
import { UriIdAttestation } from "./UriIdAttestation";
export class ERC721 {
}
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], ERC721.prototype, "TokenId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], ERC721.prototype, "Address", void 0);
export class Tokens {
}
__decorate([
    AsnProp({ type: ERC721, optional: true })
], Tokens.prototype, "tokens", void 0);
export class NFTAttestation {
}
__decorate([
    AsnProp({ type: UriIdAttestation })
], NFTAttestation.prototype, "creator", void 0);
__decorate([
    AsnProp({ type: Tokens, optional: true })
], NFTAttestation.prototype, "tokens", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString, optional: true })
], NFTAttestation.prototype, "nftDigest", void 0);
