import {AsnProp, AsnPropTypes, AsnType, AsnTypeTypes} from "@peculiar/asn1-schema";
import {AlgorithmIdentifierASN} from "./AlgoritmIdentifierASN";
import {EthereumAddressAttestation} from "./EthereumAddressAttestation";

@AsnType({ type: AsnTypeTypes.Choice })
export class LinkedAttestation {
	@AsnProp({ type: EthereumAddressAttestation, context: 1 })
	public ethereumAddress?: EthereumAddressAttestation;
}

export class SignedLinkedAttestation {
	@AsnProp({ type: LinkedAttestation }) public attestation: LinkedAttestation;
	@AsnProp({ type: AlgorithmIdentifierASN }) public signingAlgorithm: AlgorithmIdentifierASN;
	@AsnProp({ type: AsnPropTypes.BitString }) public signatureValue: Uint8Array;
}