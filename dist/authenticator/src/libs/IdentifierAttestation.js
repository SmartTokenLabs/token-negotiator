import { AttestationCrypto } from "./AttestationCrypto";
import { Attestation } from "./Attestation";
export class IdentifierAttestation extends Attestation {
    constructor() {
        super();
    }
    fromCommitment(commitment, keys) {
        this.subjectKey = keys;
        this.setVersion(IdentifierAttestation.HIDDEN_IDENTIFIER_VERSION);
        this.setSubject("CN=");
        this.setSigningAlgorithm(IdentifierAttestation.DEFAULT_SIGNING_ALGORITHM);
        this.setSubjectPublicKeyInfo(keys);
        this.setCommitment(commitment);
        this.type = IdentifierAttestation.HIDDEN_TYPE;
        this.identifier = IdentifierAttestation.HIDDEN_IDENTIFIER;
        this.setUnlimitedValidity();
    }
    setUnlimitedValidity() {
        super.setNotValidBefore(Date.now());
        super.setNotValidAfter(Date.parse('31 Dec 9999 23:59:59'));
    }
    static fromData(identifier, type, keys, secret) {
        let crypto = new AttestationCrypto();
        let commitment = crypto.makeCommitment(identifier, type, secret);
        let me = new this();
        me.fromCommitment(commitment, keys);
        me.type = type.toString();
        me.identifier = identifier;
        return me;
    }
    static fromLabelAndUrl(label, URL, keys) {
        let me = new this();
        me.subjectKey = keys;
        me.setVersion(IdentifierAttestation.NFT_VERSION);
        me.setSubject(me.makeLabeledURI(label, URL));
        me.setSigningAlgorithm(IdentifierAttestation.DEFAULT_SIGNING_ALGORITHM);
        me.setSubjectPublicKeyInfo(keys);
        me.setUnlimitedValidity();
        me.type = label;
        me.identifier = URL;
        return me;
    }
    makeLabeledURI(label, URL) {
        return '';
    }
    static fromBytes(bytes) {
        let me = new this();
        me.fromBytes(bytes);
        if (!me.checkValidity()) {
            throw new Error("Could not validate object");
        }
        if (me.getVersion() == IdentifierAttestation.NFT_VERSION) {
        }
        else {
            me.type = IdentifierAttestation.HIDDEN_TYPE;
            me.identifier = IdentifierAttestation.HIDDEN_IDENTIFIER;
        }
        return me;
    }
    setSubjectPublicKeyInfo(keys) {
        this.subjectKey = keys;
    }
    setCommitment(encodedRiddle) {
        this.commitment = encodedRiddle;
    }
    checkValidity() {
        if (!super.checkValidity()) {
            return false;
        }
        if (this.getVersion() != IdentifierAttestation.HIDDEN_IDENTIFIER_VERSION && this.getVersion() != IdentifierAttestation.NFT_VERSION) {
            console.error("The version number is " + this.getVersion() + ", it must be either " + IdentifierAttestation.HIDDEN_IDENTIFIER_VERSION + " or " + IdentifierAttestation.NFT_VERSION);
            return false;
        }
        if (this.getSigningAlgorithm() !== IdentifierAttestation.DEFAULT_SIGNING_ALGORITHM) {
            console.error("The subject is supposed to only be an Ethereum address as the Common Name");
            return false;
        }
        if (this.getVersion() == IdentifierAttestation.NFT_VERSION) {
            if (!this.getSubject().includes(IdentifierAttestation.LABELED_URI)) {
                console.error("A NFT Identifier attestation must have a labeled uri as subject");
                return false;
            }
        }
        if (this.getVersion() == IdentifierAttestation.HIDDEN_IDENTIFIER_VERSION) {
            if (this.getCommitment().length < AttestationCrypto.BYTES_IN_DIGEST) {
                console.error("The attestation does not contain a valid commitment");
                return false;
            }
        }
        return true;
    }
    setIssuer(issuer) {
        this.issuer = issuer;
    }
    getSerialNumber() {
        return this.serialNumber;
    }
    setSerialNumber(serialNumber) {
        this.serialNumber = serialNumber;
    }
    getAddress() {
        return this.subjectKey.getAddress();
    }
}
IdentifierAttestation.OID_OCTETSTRING = "1.3.6.1.4.1.1466.115.121.1.40";
IdentifierAttestation.DEFAULT_SIGNING_ALGORITHM = "1.2.840.10045.4.2";
IdentifierAttestation.HIDDEN_IDENTIFIER_VERSION = 18;
IdentifierAttestation.NFT_VERSION = 19;
IdentifierAttestation.HIDDEN_TYPE = "HiddenType";
IdentifierAttestation.HIDDEN_IDENTIFIER = "HiddenIdentifier";
IdentifierAttestation.LABELED_URI = "1.3.6.1.4.1.250.1.57";
