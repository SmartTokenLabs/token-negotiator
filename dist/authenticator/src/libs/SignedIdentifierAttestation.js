import { AsnParser } from "@peculiar/asn1-schema";
import { MyAttestation } from "../asn1/shemas/AttestationFramework";
import { KeyPair } from "./KeyPair";
import { hexStringToArray, uint8toBuffer, uint8tohex } from "./utils";
import { Asn1Der } from "./DerUtility";
import { IdentifierAttestation } from "./IdentifierAttestation";
export class SignedIdentifierAttestation {
    constructor() { }
    static fromBytes(uint8data, attestorKeys) {
        const myAttestation = AsnParser.parse(uint8toBuffer(uint8data), MyAttestation);
        return this.fromASNType(myAttestation, attestorKeys, uint8data);
    }
    static fromASNType(myAttestation, attestorKeys, uint8data = new Uint8Array(0)) {
        let me = new this();
        me.uint8data = uint8data;
        me.attestorKeys = attestorKeys;
        let algorithmEncoded = myAttestation.signatureAlgorithm.algorithm;
        me.att = IdentifierAttestation.fromBytes(myAttestation.signedInfo);
        me.signature = uint8tohex(new Uint8Array(myAttestation.signatureValue));
        if (algorithmEncoded !== me.att.getSigningAlgorithm()) {
            throw new Error("Algorithm specified is not consistent");
        }
        me.constructorCheck();
        return me;
    }
    static fromData(att, attestationSigningKey) {
        let me = new this();
        me.attestorKeys = attestationSigningKey;
        me.att = att;
        me.signature = me.attestorKeys.signRawBytesWithEthereum(Array.from(me.att.getPrehash()));
        me.constructorCheck();
        return me;
    }
    verify() {
        try {
            return this.attestorKeys.verifyBytesWithEthereum(hexStringToArray(this.att.getDerEncoding()), this.signature);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    checkValidity() {
        return this.getUnsignedAttestation().checkValidity();
    }
    getUnsignedAttestation() {
        return this.att;
    }
    getDerEncoding() {
        if (this.uint8data && this.uint8data.length) {
            return uint8tohex(new Uint8Array(this.uint8data));
        }
        else {
            return this.constructSignedAttestation(this.getUnsignedAttestation(), this.signature);
        }
    }
    constructSignedAttestation(unsignedAtt, signature) {
        let rawAtt = unsignedAtt.getPrehash();
        let alg = Asn1Der.encode('OBJECT_ID', unsignedAtt.getSigningAlgorithm());
        let res = uint8tohex(rawAtt) +
            Asn1Der.encode('SEQUENCE_30', alg) +
            Asn1Der.encode('BIT_STRING', '04' + uint8tohex(KeyPair.anySignatureToRawUint8(signature)));
        return Asn1Der.encode('SEQUENCE_30', res);
    }
    constructorCheck() {
        if (!this.verify()) {
            throw new Error("The signature is not valid");
        }
    }
}
SignedIdentifierAttestation.ECDSA_WITH_SHA256 = "1.2.840.10045.4.3.2";
