import {AsnProp, AsnPropTypes} from "@peculiar/asn1-schema";

export class AlgorithmIdentifierASN {
	// @AsnProp({ type: AsnPropTypes.ObjectIdentifier }) public algorithm: AsnPropTypes.ObjectIdentifier;// OBJECT IDENTIFIER,
	@AsnProp({ type: AsnPropTypes.ObjectIdentifier }) public algorithm: string;// OBJECT IDENTIFIER,
	@AsnProp({ type: AsnPropTypes.Any, optional: true }) public parameters?: AsnPropTypes.Any;// ANY DEFINED BY algorithm OPTIONAL
}