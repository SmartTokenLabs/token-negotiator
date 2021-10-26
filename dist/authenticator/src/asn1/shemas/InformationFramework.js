var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RelativeDistinguishedName_1, RDNSequence_1;
import { AsnArray, AsnProp, AsnPropTypes, AsnType, AsnTypeTypes } from "@peculiar/asn1-schema";
class AttributeTypeAndValue {
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], AttributeTypeAndValue.prototype, "type", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], AttributeTypeAndValue.prototype, "value", void 0);
let RelativeDistinguishedName = RelativeDistinguishedName_1 = class RelativeDistinguishedName extends AsnArray {
    constructor(items) {
        super(items);
        Object.setPrototypeOf(this, RelativeDistinguishedName_1.prototype);
    }
};
RelativeDistinguishedName = RelativeDistinguishedName_1 = __decorate([
    AsnType({ type: AsnTypeTypes.Set, itemType: AttributeTypeAndValue })
], RelativeDistinguishedName);
let RDNSequence = RDNSequence_1 = class RDNSequence extends AsnArray {
    constructor(items) {
        super(items);
        Object.setPrototypeOf(this, RDNSequence_1.prototype);
    }
};
RDNSequence = RDNSequence_1 = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: RelativeDistinguishedName })
], RDNSequence);
let Name = class Name {
};
__decorate([
    AsnProp({ type: RDNSequence })
], Name.prototype, "rdnSequence", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Null })
], Name.prototype, "null", void 0);
Name = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], Name);
export { Name };
