import { CURVE_BN256, Point } from "./Point";
import { UsageProof } from "../asn1/shemas/ProofOfExponentASN";
import { AsnParser } from "@peculiar/asn1-schema";
import { base64ToUint8array, bnToUint8, uint8ToBn, uint8toBuffer, uint8tohex } from "./utils";
import { Asn1Der } from "./DerUtility";
export class UsageProofOfExponent {
    constructor() {
    }
    static fromData(tPoint, challenge, nonce = new Uint8Array([])) {
        let me = new this();
        me.tPoint = tPoint;
        me.challenge = challenge;
        me.nonce = nonce;
        me.encoding = me.makeEncoding(tPoint, challenge);
        return me;
    }
    fromBase64(base64DerEncoded) {
        this.encoding = base64DerEncoded;
        this.fromBytes(base64ToUint8array(base64DerEncoded));
    }
    fromBytes(bytes) {
        this.encodingBytes = bytes;
        let usageProof = AsnParser.parse(uint8toBuffer(bytes), UsageProof);
        this.challenge = uint8ToBn(new Uint8Array(usageProof.challengePoint));
        let tPointEnc = new Uint8Array(usageProof.responseValue);
        this.nonce = new Uint8Array(usageProof.nonce);
        this.tPoint = Point.decodeFromHex(uint8tohex(tPointEnc), CURVE_BN256);
    }
    makeEncoding(tPoint, challenge) {
        let res = Asn1Der.encode('OCTET_STRING', uint8tohex(bnToUint8(this.challenge))) +
            Asn1Der.encode('OCTET_STRING', uint8tohex(this.tPoint.getEncoded(false))) +
            Asn1Der.encode('OCTET_STRING', uint8tohex(this.nonce));
        return Asn1Der.encode('SEQUENCE_30', res);
    }
    getPoint() {
        return this.tPoint;
    }
    getChallenge() {
        return this.challenge;
    }
    getDerEncoding() {
        return this.encoding;
    }
    getNonce() {
        return this.nonce;
    }
}
