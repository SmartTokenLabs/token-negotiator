import { ATTESTATION_TYPE } from "./interfaces";
import { Asn1Der } from "./DerUtility";
import { AttestationCrypto } from "./AttestationCrypto";
import { hexStringToArray, uint8tohex } from "./utils";
import { SignatureUtility } from "./SignatureUtility";
let sha3 = require("js-sha3");
let EC = require("elliptic");
let ec = new EC.ec('secp256k1');
export class Cheque {
    constructor() { }
    static fromData(commitment, amount, notValidBefore, notValidAfter, signature, keys) {
        const me = new this();
        me.commitment = commitment;
        me.keys = keys;
        me.amount = amount;
        if (notValidBefore % 1000 != 0 || notValidAfter % 1000 != 0) {
            throw new Error("Can only support time granularity to the second");
        }
        me.notValidBefore = notValidBefore;
        me.notValidAfter = notValidAfter;
        me.signature = signature;
        let cheque = me.makeCheque();
        me.encoded = me.encodeSignedCheque(cheque, uint8tohex(signature));
        if (!me.verify()) {
            throw new Error("Signature is invalid");
        }
        return me;
    }
    static createAndVerify(identifier, type, amount, validity, keys, secret) {
        let me = new this();
        me.identifier = identifier;
        me.type = type;
        me.amount = amount;
        me.validity = validity;
        me.keys = keys;
        me.secret = secret;
        let crypto = new AttestationCrypto();
        me.commitment = crypto.makeCommitment(me.identifier, ATTESTATION_TYPE[me.type], me.secret);
        let current = new Date().getTime();
        me.notValidBefore = current - (current % 1000);
        me.notValidAfter = me.notValidBefore + me.validity * 1000;
        let cheque = me.makeCheque();
        let ecKey = ec.keyFromPrivate(me.keys.getPrivateAsHexString(), 'hex');
        let chequeHash = sha3.keccak256(hexStringToArray(cheque));
        var signature = ecKey.sign(chequeHash);
        let signatureHexDerDitString = Asn1Der.encode('BIT_STRING', signature.toDER('hex'));
        me.encoded = me.encodeSignedCheque(cheque, signatureHexDerDitString);
        let verify = ecKey.verify(chequeHash, signature);
        if (!verify) {
            throw new Error("Public and private keys are incorrect");
        }
        return {
            cheque,
            chequeEncoded: me.encoded,
            derSignature: signatureHexDerDitString,
            derSecret: Asn1Der.encode('SEQUENCE_30', Asn1Der.encode('OCTET_STRING', me.secret.toString(16)))
        };
    }
    encodeSignedCheque(cheque, signature) {
        let fullSequence = cheque + Asn1Der.encode('BIT_STRING', this.keys.getPublicKeyAsHexStr()) + signature;
        return Asn1Der.encode('SEQUENCE_30', fullSequence);
    }
    makeCheque() {
        let timeList = Asn1Der.encode('GENERALIZED_TIME', this.notValidBefore) +
            Asn1Der.encode('GENERALIZED_TIME', this.notValidAfter);
        let fullSequence = Asn1Der.encode('INTEGER', this.amount) +
            Asn1Der.encode('SEQUENCE_30', timeList) +
            Asn1Der.encode('OCTET_STRING', uint8tohex(this.commitment));
        return Asn1Der.encode('SEQUENCE_30', fullSequence);
    }
    verify() {
        let cheque = this.makeCheque();
        return SignatureUtility.verify(cheque, uint8tohex(this.signature), this.keys);
    }
    getDerEncoding() {
        return this.encoded;
    }
    checkValidity() {
        let now = Date.now();
        if (this.notValidBefore > now) {
            console.log("Cheque is no longer valid");
            return false;
        }
        if (this.notValidAfter < now) {
            console.log("Cheque expired");
            return false;
        }
        return true;
    }
    getCommitment() {
        return this.commitment;
    }
}
