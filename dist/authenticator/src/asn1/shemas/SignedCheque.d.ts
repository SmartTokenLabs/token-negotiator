import { AsnPropTypes } from "@peculiar/asn1-schema";
import { ValidityValue } from "./AuthenticationFramework";
export declare class ChequeASN {
    amount: AsnPropTypes.Integer;
    validity: ValidityValue;
    commitment: AsnPropTypes.OctetString;
}
export declare class SignedCheque {
    cheque: ChequeASN;
    publicKey: Uint8Array;
    signatureValue: Uint8Array;
}
