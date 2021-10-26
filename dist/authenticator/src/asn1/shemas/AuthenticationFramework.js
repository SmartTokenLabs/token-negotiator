var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AsnProp, AsnPropTypes, AsnType, AsnTypeTypes } from "@peculiar/asn1-schema";
export class AlgorithmIdentifierASN {
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], AlgorithmIdentifierASN.prototype, "algorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any, optional: true })
], AlgorithmIdentifierASN.prototype, "parameters", void 0);
export class Version {
    constructor() {
        this.version = 0;
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], Version.prototype, "version", void 0);
let Time = class Time {
};
__decorate([
    AsnProp({ type: AsnPropTypes.UTCTime })
], Time.prototype, "utcTime", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.GeneralizedTime })
], Time.prototype, "generalizedTime", void 0);
Time = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], Time);
export class ValidityValue {
}
__decorate([
    AsnProp({ type: Time })
], ValidityValue.prototype, "notBefore", void 0);
__decorate([
    AsnProp({ type: Time })
], ValidityValue.prototype, "notAfter", void 0);
let Validity = class Validity {
};
__decorate([
    AsnProp({ type: ValidityValue, context: 0 })
], Validity.prototype, "value", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, context: 1 })
], Validity.prototype, "null", void 0);
Validity = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], Validity);
export class Extension {
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], Extension.prototype, "extnId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Boolean })
], Extension.prototype, "critical", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString })
], Extension.prototype, "extnValue", void 0);
export class Extensions {
}
__decorate([
    AsnProp({ type: Extension })
], Extensions.prototype, "extension", void 0);
