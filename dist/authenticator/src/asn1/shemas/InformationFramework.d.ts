import { AsnArray } from "@peculiar/asn1-schema";
declare class AttributeTypeAndValue {
    type: string;
    value: string;
}
declare class RelativeDistinguishedName extends AsnArray<AttributeTypeAndValue> {
    constructor(items?: AttributeTypeAndValue[]);
}
declare class RDNSequence extends AsnArray<RelativeDistinguishedName> {
    constructor(items?: RelativeDistinguishedName[]);
}
export declare class Name {
    rdnSequence?: RDNSequence;
    null?: any;
}
export {};
