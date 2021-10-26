import { KeyPair } from "./KeyPair";
import { FullProofOfExponent } from "./FullProofOfExponent";
import { AttestationCrypto } from "./AttestationCrypto";
import { SignedIdentifierAttestation } from "./SignedIdentifierAttestation";
import { UseAttestation as UseAttestationASN } from "../asn1/shemas/UseAttestation";
import { AsnParser } from "@peculiar/asn1-schema";
import { uint8toBuffer } from "./utils";
import { Asn1Der } from "./DerUtility";
export class UseAttestation {
    static fromData(attestation, type, pok, sessionPublicKey) {
        let me = new this();
        me.attestation = attestation;
        me.type = type;
        me.pok = pok;
        me.sessionPublicKey = sessionPublicKey;
        me.encoding = me.makeEncoding(attestation, type, pok, sessionPublicKey);
        me.constructorCheck();
        return me;
    }
    static fromBytes(derEncoding, attestationVerificationKey) {
        let me = new this();
        let useAttest;
        try {
            useAttest = AsnParser.parse(uint8toBuffer(derEncoding), UseAttestationASN);
        }
        catch (e) {
            throw new Error('Cant parse UseAttestationASN. ' + e);
        }
        try {
            me.attestation = SignedIdentifierAttestation.fromASNType(useAttest.attestation, attestationVerificationKey);
            me.type = useAttest.type;
            me.pok = FullProofOfExponent.fromASNType(useAttest.proof);
            me.sessionPublicKey = KeyPair.publicFromSubjectPublicKeyValue(useAttest.sessionKey);
        }
        catch (e) {
            throw new Error("Cant decode internal data. " + e);
        }
        me.constructorCheck();
        return me;
    }
    constructorCheck() {
        if (!this.verify()) {
            throw new Error("The use attestation object is not valid");
        }
    }
    makeEncoding(attestation, type, pok, sessionKey) {
        let res = attestation.getDerEncoding()
            + Asn1Der.encode('INTEGER', type)
            + pok.getDerEncoding()
            + sessionKey.getAsnDerPublic();
        return Asn1Der.encode('SEQUENCE_30', res);
    }
    getAttestation() {
        return this.attestation;
    }
    getType() { return this.type; }
    getPok() {
        return this.pok;
    }
    getSessionPublicKey() {
        return this.sessionPublicKey;
    }
    getDerEncoding() {
        return this.encoding;
    }
    verify() {
        return this.attestation.verify() && new AttestationCrypto().verifyFullProof(this.pok);
    }
    checkValidity() {
        return this.attestation.checkValidity();
    }
}
