import { KeyPair } from "./KeyPair";
import { FullProofOfExponent } from "./FullProofOfExponent";
import { Identifier } from "../asn1/shemas/AttestationRequestWithUsage";
import { AsnParser } from "@peculiar/asn1-schema";
import { uint8ToBn, uint8toBuffer, uint8tohex } from "./utils";
import { CURVE_BN256, Point } from "./Point";
import { AttestationCrypto } from "./AttestationCrypto";
import { Asn1Der } from "./DerUtility";
export class AttestationRequestWithUsage {
    constructor() {
    }
    static fromData(type, pok, sessionPublicKey) {
        let me = new this();
        me.type = type;
        me.pok = pok;
        me.sessionPublicKey = sessionPublicKey;
        if (!me.verify()) {
            throw new Error("Could not verify the proof");
        }
        return me;
    }
    static fromBytes(asn1) {
        let me = new this();
        let identifier;
        try {
            identifier = AsnParser.parse(uint8toBuffer(asn1), Identifier);
            me.type = identifier.type;
            me.sessionPublicKey = KeyPair.publicFromSubjectPublicKeyValue(identifier.sessionKey);
        }
        catch (e) {
            throw new Error('Cant parse AttestationRequest Identifier');
        }
        try {
            let riddleEnc = new Uint8Array(identifier.proof.riddle);
            let challengeEnc = new Uint8Array(identifier.proof.challengePoint);
            let tPointEnc = new Uint8Array(identifier.proof.responseValue);
            let nonce = new Uint8Array(identifier.proof.nonce);
            let riddle = Point.decodeFromHex(uint8tohex(riddleEnc), CURVE_BN256);
            let challenge = uint8ToBn(challengeEnc);
            let tPoint = Point.decodeFromHex(uint8tohex(tPointEnc), CURVE_BN256);
            me.pok = FullProofOfExponent.fromData(riddle, tPoint, challenge, nonce);
        }
        catch (e) {
            throw new Error('Cant create FullProofOfExponent');
        }
        if (!me.verify()) {
            throw new Error("Could not verify the proof");
        }
        return me;
    }
    verify() {
        let AttestationCryptoInstance = new AttestationCrypto();
        if (!AttestationCryptoInstance.verifyFullProof(this.pok)) {
            return false;
        }
        return true;
    }
    getDerEncoding() {
        let res = Asn1Der.encode('INTEGER', this.type) +
            this.pok.getDerEncoding() +
            this.sessionPublicKey.getAsnDerPublic();
        return Asn1Der.encode('SEQUENCE_30', res);
    }
    getPok() {
        return this.pok;
    }
    getType() {
        return this.type;
    }
    getSessionPublicKey() {
        return this.sessionPublicKey;
    }
}
