import { AsnPropTypes } from "@peculiar/asn1-schema";
import { AlgorithmIdentifierASN } from "./AuthenticationFramework";
export declare class DevconTicket {
    devconId: string;
    ticketId: number;
    ticketClass: number;
}
export declare class PublicKeyInfo {
    algorithm: AlgorithmIdentifierASN;
    publicKey: AsnPropTypes.BitString;
}
export declare class SignedDevconTicket {
    ticket: DevconTicket;
    commitment: Uint8Array;
    publicKeyInfo?: PublicKeyInfo;
    signatureValue: Uint8Array;
}
