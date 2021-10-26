import { CURVE_BN256, Point } from "./Point";
import { Proof } from "../asn1/shemas/ProofOfExponentASN";
import { AsnParser } from "@peculiar/asn1-schema";
import { base64ToUint8array, uint8ToBn, uint8tohex } from "./utils";
import { Asn1Der } from "./DerUtility";
import { UsageProofOfExponent } from "./UsageProofOfExponent";
export class FullProofOfExponent {
    constructor() { }
    static fromData(riddle, tPoint, challenge, nonce = new Uint8Array([])) {
        let me = new this();
        me.riddle = riddle;
        me.tPoint = tPoint;
        me.challenge = challenge;
        me.nonce = nonce;
        me.encoding = me.makeEncoding(riddle, tPoint, challenge, nonce);
        return me;
    }
    static fromBytes(uint8data) {
        let proof = AsnParser.parse(uint8data, Proof);
        return this.fromASNType(proof);
    }
    static fromASNType(proof) {
        let riddleEnc = new Uint8Array(proof.riddle);
        let riddle = Point.decodeFromUint8(riddleEnc, CURVE_BN256);
        let challengeEnc = new Uint8Array(proof.challengePoint);
        let challenge = uint8ToBn(challengeEnc);
        let tPointEnc = new Uint8Array(proof.responseValue);
        let tPoint = Point.decodeFromUint8(tPointEnc, CURVE_BN256);
        let nonce = new Uint8Array(proof.nonce);
        return this.fromData(riddle, tPoint, challenge, nonce);
    }
    static fromBase64(base64DerEncoded) {
        return FullProofOfExponent.fromBytes(base64ToUint8array(base64DerEncoded));
    }
    makeEncoding(riddle, tPoint, challenge, nonce = new Uint8Array([])) {
        let proof = Asn1Der.encode('OCTET_STRING', uint8tohex(riddle.getEncoded()))
            + Asn1Der.encode('OCTET_STRING', challenge.toString(16))
            + Asn1Der.encode('OCTET_STRING', uint8tohex(tPoint.getEncoded()))
            + Asn1Der.encode('OCTET_STRING', uint8tohex(nonce));
        return Asn1Der.encode('SEQUENCE_30', proof);
    }
    getRiddle() {
        return this.riddle;
    }
    getPoint() {
        return this.tPoint;
    }
    getChallenge() {
        return this.challenge;
    }
    getNonce() {
        return this.nonce;
    }
    getUsageProofOfExponent() {
        return UsageProofOfExponent.fromData(this.tPoint, this.challenge, this.nonce);
    }
    getDerEncoding() {
        return this.encoding;
    }
}
