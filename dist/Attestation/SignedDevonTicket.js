import { BitString, compareSchema, Integer, OctetString, Sequence, fromBER, Utf8String } from "asn1js";
import { getParametersValue, clearProps, bufferToHexCodes } from "pvutils";
import PublicKeyInfo from "./PublicKeyInfo.js";
export class DevconTicket {
    constructor(source = {}) {
        if (typeof (source) == "string") {
            throw new TypeError("Unimplemented: Not accepting string yet.");
        }
        if (source instanceof ArrayBuffer) {
            const asn1 = fromBER(source);
            this.fromSchema(asn1.result);
        }
        else {
            this.devconId = getParametersValue(source, "devconId");
            this.ticketId = getParametersValue(source, "ticketId");
            this.ticketClass = getParametersValue(source, "ticketClass");
        }
    }
    static schema(parameters = {}) {
        const names = getParametersValue(parameters, "names", {});
        return new Sequence({
            name: names.blockName || "ticket",
            value: [
                new Utf8String({
                    name: names.devconId || "devconId",
                }),
                new Integer({
                    name: names.ticketId || "ticketId",
                }),
                new Integer({
                    name: names.ticketClass || "ticketClass",
                }),
            ],
        });
    }
    fromSchema(schema) {
        clearProps(schema, [
            "devconId",
            "ticketId",
            "ticketClass",
        ]);
        const asn1 = compareSchema(schema, schema, DevconTicket.schema());
        if (asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for DevconTicket");
        if ("devconId" in asn1.result) {
            this.devconId = asn1.result["devconId"].valueBlock.value;
        }
        if ("ticketId" in asn1.result) {
            const ticketId = asn1.result["ticketId"].valueBlock._valueHex;
            this.ticketId = parseInt("0x" + bufferToHexCodes(ticketId), 16);
        }
        if ("ticketClass" in asn1.result) {
            const ticketClass = asn1.result["ticketClass"].valueBlock._valueHex;
            this.ticketClass = parseInt("0x" + bufferToHexCodes(ticketClass), 16);
        }
    }
}
export class SignedDevconTicket {
    constructor(source = {}) {
        if (typeof (source) == "string") {
            const ticketEncoded = (source.startsWith("https://")) ?
                (new URL(source)).searchParams.get('ticket') : source;
            let base64str = ticketEncoded
                .split('_').join('/')
                .split('-').join('+')
                .split('.').join('=');
            if (typeof Buffer !== 'undefined') {
                source = Uint8Array.from(Buffer.from(base64str, 'base64')).buffer;
            }
            else {
                source = Uint8Array.from(atob(base64str), c => c.charCodeAt(0)).buffer;
            }
        }
        if (source instanceof ArrayBuffer) {
            const asn1 = fromBER(source);
            this.fromSchema(asn1.result);
        }
        else {
            this.ticket = new DevconTicket(source.ticket);
            this.commitment = getParametersValue(source, "commitment");
            this.publicKeyInfo = new PublicKeyInfo(source.publicKeyInfo);
            this.signatureValue = getParametersValue(source, "signatureValue");
        }
    }
    static schema(parameters = {}) {
        const names = getParametersValue(parameters, "names", {});
        return new Sequence({
            name: names.blockName || "SignedDevconTicket",
            value: [
                DevconTicket.schema(parameters),
                new OctetString({
                    name: "commitment",
                }),
                new BitString({
                    name: "signatureValue",
                }),
            ],
        });
    }
    fromSchema(schema) {
        clearProps(schema, [
            "ticket",
            "commitment",
            "publicKeyInfo",
            "signatureValue",
        ]);
        const asn1 = compareSchema(schema, schema, SignedDevconTicket.schema());
        if (asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for SignedDevconTicket");
        this.ticket = new DevconTicket(asn1.result.ticket.valueBeforeDecode);
        if ("commitment" in asn1.result)
            this.commitment = asn1.result["commitment"].valueBlock.valueHex;
        this.publicKeyInfo = new PublicKeyInfo({
            schema: asn1.result.publicKeyInfo,
        });
        const signatureValue = asn1.result.signatureValue;
        this.signatureValue = signatureValue.valueBlock.valueHex;
    }
}
