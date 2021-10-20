export class DevconTicket {
    static schema(parameters?: {}): Sequence;
    constructor(source?: Object | undefined);
    devconId: any;
    ticketId: any;
    ticketClass: any;
    fromSchema(schema: Object): void;
}
export class SignedDevconTicket {
    static schema(parameters?: Object): Object;
    constructor(source?: Object | undefined);
    ticket: DevconTicket | undefined;
    commitment: any;
    publicKeyInfo: PublicKeyInfo | undefined;
    signatureValue: any;
    fromSchema(schema: Object): void;
}
import { Sequence } from "asn1js";
import PublicKeyInfo from "./PublicKeyInfo.js";
