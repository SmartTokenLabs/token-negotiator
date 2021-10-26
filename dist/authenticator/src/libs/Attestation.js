import { hexStringToUint8, uint8toBuffer, uint8tohex } from "./utils";
import { AsnParser } from "@peculiar/asn1-schema";
import { SignedInfo } from "../asn1/shemas/AttestationFramework";
import { KeyPair } from "./KeyPair";
import { Asn1Der } from "./DerUtility";
export class Attestation {
    constructor() {
        this.version = 18;
    }
    fromBytes(uint8bytes) {
        const me = this;
        let decodedAttestationObj = AsnParser.parse(uint8toBuffer(uint8bytes), SignedInfo);
        me.signedInfo = uint8bytes;
        me.version = decodedAttestationObj.version.version;
        me.serialNumber = decodedAttestationObj.serialNumber;
        me.signingAlgorithm = decodedAttestationObj.signature.algorithm.toString();
        if (decodedAttestationObj.validity) {
            me.notValidBefore = decodedAttestationObj.validity.notBefore.generalizedTime.getTime();
            me.notValidAfter = decodedAttestationObj.validity.notAfter.generalizedTime.getTime();
        }
        let rdn = decodedAttestationObj.subject.rdnSequence;
        if (rdn && rdn[0] && rdn[0][0]) {
            let obj = rdn[0][0];
            me.subject = (obj.type.toString() == "2.5.4.3" ? "CN=" : "") + obj.value;
        }
        me.subjectKey = KeyPair.publicFromSubjectPublicKeyInfo(decodedAttestationObj.subjectPublicKeyInfo);
        let issuerSet = decodedAttestationObj.issuer.rdnSequence;
        let namesArray = [];
        if (issuerSet.length) {
            issuerSet.forEach(issuerSetItem => {
                let curVal = issuerSetItem[0].value;
                let type = issuerSetItem[0].type;
                let prefix = '';
                switch (type) {
                    case '2.5.4.3':
                        prefix = "CN";
                        break;
                    case '2.5.4.6':
                        prefix = "C";
                        break;
                    case '2.5.4.10':
                        prefix = "O";
                        break;
                    case '2.5.4.11':
                        prefix = "OU";
                        break;
                    case '2.5.4.7':
                        prefix = "L";
                        break;
                    default:
                        throw new Error('Alg "' + type + '" Not implemented yet');
                }
                if (type && curVal) {
                    namesArray.push(type + '=' + curVal);
                }
            });
        }
        me.issuer = namesArray.join(',');
        if (decodedAttestationObj.contract) {
            me.smartcontracts = decodedAttestationObj.contract;
        }
        if (decodedAttestationObj.attestsTo.extensions) {
            me.extensions = decodedAttestationObj.attestsTo.extensions;
            me.commitment = new Uint8Array(me.extensions.extension.extnValue);
        }
        else if (decodedAttestationObj.attestsTo.dataObject) {
        }
    }
    isValidX509() {
        if (this.version != 0
            && this.version != 1
            && this.version != 2) {
            console.error("Incorrect version number");
            return false;
        }
        if (!this.issuer) {
            console.error("Issuer info not set");
            return false;
        }
        if (this.notValidBefore == null || this.notValidAfter == null) {
            console.error("Validity period not set");
            return false;
        }
        if (this.subject == null) {
            console.error("Subject info not set");
            return false;
        }
        if (!this.subjectKey) {
            console.error("No subject public key info set");
            return false;
        }
        if (this.smartcontracts != null) {
            console.error("Smart contract info set");
            return false;
        }
        if (this.dataObject != null) {
            console.error("Data object set");
            return false;
        }
        if (this.version == null || this.serialNumber == null || this.signingAlgorithm == null) {
            console.error("Version, serial number, subject or algorithm missing");
            return false;
        }
        return true;
    }
    getDerEncoding() {
        if (!this.signedInfo) {
            this.signedInfo = this.getPrehash();
        }
        if (!this.signedInfo) {
            throw new Error('Empty Attestaion Der Encoding');
        }
        return uint8tohex(new Uint8Array(this.signedInfo));
    }
    getCommitment() {
        return this.commitment;
    }
    getNotValidBefore() {
        return this.notValidBefore;
    }
    setNotValidBefore(d) {
        this.notValidBefore = d;
    }
    getNotValidAfter() {
        return this.notValidAfter;
    }
    setNotValidAfter(d) {
        this.notValidAfter = d;
    }
    getSubjectPublicKeyInfo() {
        return this.subjectKey;
    }
    checkValidity() {
        if (this.version == null
            || this.serialNumber == null
            || this.subject == null
            || this.signingAlgorithm == null
            || (!this.extensions && !this.dataObject && !this.commitment)) {
            console.log("Some attest data missed");
            return false;
        }
        let currentTime = Date.now();
        let attNotBefore = this.getNotValidBefore();
        let attNotAfter = this.getNotValidAfter();
        if (attNotBefore && attNotAfter && !(currentTime >= attNotBefore && currentTime < attNotAfter)) {
            console.log("Attestation is no longer valid");
            return false;
        }
        if (this.extensions != null && this.dataObject != null) {
            console.log("Extensions or dataObject required");
            return false;
        }
        return true;
    }
    getExtensions() {
        return this.extensions;
    }
    setVersion(version) {
        this.version = version;
    }
    getVersion() {
        return this.version;
    }
    setSubject(subject) {
        this.subject = subject;
    }
    getSubject() {
        return this.subject;
    }
    setSigningAlgorithm(alg) {
        this.signingAlgorithm = alg;
    }
    getPrehash() {
        if (!this.checkValidity()) {
            return null;
        }
        let res = Asn1Der.encode('TAG', Asn1Der.encode('INTEGER', this.version), 0)
            + Asn1Der.encode('INTEGER', this.serialNumber)
            + Asn1Der.encodeObjectId(this.signingAlgorithm);
        res += this.issuer ? Asn1Der.encodeName(this.issuer) : Asn1Der.encode('NULL_VALUE', '');
        if (this.notValidAfter != null && this.notValidBefore != null) {
            let date = Asn1Der.encode('GENERALIZED_TIME', this.notValidBefore)
                + Asn1Der.encode('GENERALIZED_TIME', this.notValidAfter);
            res += Asn1Der.encode('SEQUENCE_30', date);
        }
        else {
            res += Asn1Der.encode('NULL_VALUE', '');
        }
        res += this.subject ? Asn1Der.encodeName(this.subject) : Asn1Der.encode('NULL_VALUE', '');
        res += this.subjectKey ? this.subjectKey.getAsnDerPublic() : Asn1Der.encode('NULL_VALUE', '');
        if (this.commitment && this.commitment.length) {
            let extensions = Asn1Der.encode('OBJECT_ID', Attestation.OID_OCTETSTRING)
                + Asn1Der.encode('BOOLEAN', 1)
                + Asn1Der.encode('OCTET_STRING', uint8tohex(this.commitment));
            res += Asn1Der.encode('TAG', Asn1Der.encode('SEQUENCE_30', Asn1Der.encode('SEQUENCE_30', extensions)), 3);
        }
        else {
            throw new Error('dataObject not implemented. We didn\'t use it before.');
        }
        return hexStringToUint8(Asn1Der.encode('SEQUENCE_30', res));
    }
    getSigningAlgorithm() {
        return this.signingAlgorithm;
    }
}
Attestation.OID_OCTETSTRING = "1.3.6.1.4.1.1466.115.121.1.40";
