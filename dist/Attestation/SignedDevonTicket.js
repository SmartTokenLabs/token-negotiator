import { BitString, compareSchema, Integer, OctetString, Sequence, fromBER, Utf8String } from "asn1js";
import { getParametersValue, clearProps, bufferToHexCodes } from "pvutils";
import PublicKeyInfo from "./PublicKeyInfo";
var DevconTicket = (function () {
    function DevconTicket(source) {
        if (source === void 0) { source = {}; }
        if (typeof (source) == "string") {
            throw new TypeError("Unimplemented: Not accepting string yet.");
        }
        if (source instanceof ArrayBuffer) {
            var asn1 = fromBER(source);
            this.fromSchema(asn1.result);
        }
        else {
            this.devconId = getParametersValue(source, "devconId");
            this.ticketId = getParametersValue(source, "ticketId");
            this.ticketClass = getParametersValue(source, "ticketClass");
        }
    }
    DevconTicket.schema = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        var names = getParametersValue(parameters, "names", {});
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
    };
    DevconTicket.prototype.fromSchema = function (schema) {
        clearProps(schema, [
            "devconId",
            "ticketId",
            "ticketClass",
        ]);
        var asn1 = compareSchema(schema, schema, DevconTicket.schema());
        if (asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for DevconTicket");
        if ("devconId" in asn1.result) {
            this.devconId = asn1.result["devconId"].valueBlock.value;
        }
        if ("ticketId" in asn1.result) {
            var ticketId = asn1.result["ticketId"].valueBlock._valueHex;
            this.ticketId = parseInt("0x" + bufferToHexCodes(ticketId), 16);
        }
        if ("ticketClass" in asn1.result) {
            var ticketClass = asn1.result["ticketClass"].valueBlock._valueHex;
            this.ticketClass = parseInt("0x" + bufferToHexCodes(ticketClass), 16);
        }
    };
    return DevconTicket;
}());
export { DevconTicket };
var SignedDevconTicket = (function () {
    function SignedDevconTicket(source) {
        if (source === void 0) { source = {}; }
        if (typeof (source) == "string") {
            var ticketEncoded = (source.startsWith("https://")) ?
                (new URL(source)).searchParams.get('ticket') : source;
            var base64str = ticketEncoded
                .split('_').join('/')
                .split('-').join('+')
                .split('.').join('=');
            if (typeof Buffer !== 'undefined') {
                source = Uint8Array.from(Buffer.from(base64str, 'base64')).buffer;
            }
            else {
                source = Uint8Array.from(atob(base64str), function (c) { return c.charCodeAt(0); }).buffer;
            }
        }
        if (source instanceof ArrayBuffer) {
            var asn1 = fromBER(source);
            this.fromSchema(asn1.result);
        }
        else {
            this.ticket = new DevconTicket(source.ticket);
            this.commitment = getParametersValue(source, "commitment");
            this.publicKeyInfo = new PublicKeyInfo(source.publicKeyInfo);
            this.signatureValue = getParametersValue(source, "signatureValue");
        }
    }
    SignedDevconTicket.schema = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        var names = getParametersValue(parameters, "names", {});
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
    };
    SignedDevconTicket.prototype.fromSchema = function (schema) {
        clearProps(schema, [
            "ticket",
            "commitment",
            "publicKeyInfo",
            "signatureValue",
        ]);
        var asn1 = compareSchema(schema, schema, SignedDevconTicket.schema());
        if (asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for SignedDevconTicket");
        this.ticket = new DevconTicket(asn1.result.ticket.valueBeforeDecode);
        if ("commitment" in asn1.result)
            this.commitment = asn1.result["commitment"].valueBlock.valueHex;
        this.publicKeyInfo = new PublicKeyInfo({
            schema: asn1.result.publicKeyInfo,
        });
        var signatureValue = asn1.result.signatureValue;
        this.signatureValue = signatureValue.valueBlock.valueHex;
    };
    return SignedDevconTicket;
}());
export { SignedDevconTicket };
//# sourceMappingURL=SignedDevonTicket.js.map