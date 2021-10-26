import { AttestationCrypto } from "./AttestationCrypto";
import { SignedIdentifierAttestation } from "./SignedIdentifierAttestation";
import { hexStringToArray, uint8toBuffer, uint8tohex } from "./utils";
import { Asn1Der } from "./DerUtility";
import { KeyPair } from "./KeyPair";
import { AsnParser } from "@peculiar/asn1-schema";
import { UsageProofOfExponent } from "./UsageProofOfExponent";
import { IdentifierAttestation } from "./IdentifierAttestation";
export class AttestedObject {
    constructor() { }
    create(attestableObject, att, attestationSecret, objectSecret) {
        this.attestableObject = attestableObject;
        this.att = att;
        this.attestationSecret = attestationSecret;
        this.objectSecret = objectSecret;
        this.crypto = new AttestationCrypto();
        this.pok = this.makeProof(attestationSecret, objectSecret, this.crypto);
        this.derEncodedProof = this.pok.getDerEncoding();
        this.fillPresignData();
    }
    setWebDomain(domain) {
        this.webDomain = domain;
    }
    fillPresignData() {
        this.preSignEncoded = this.attestableObject.getDerEncoding() +
            this.att.getDerEncoding() +
            this.pok.getDerEncoding();
        this.encoding = Asn1Der.encode('SEQUENCE_30', this.preSignEncoded);
    }
    fromDecodedData(attestableObject, att, pok) {
        this.attestableObject = attestableObject;
        this.att = att;
        this.pok = pok;
        this.fillPresignData();
        this.userKeyPair = this.att.getUnsignedAttestation().getSubjectPublicKeyInfo();
        this.constructorCheck();
    }
    verify() {
        if (!this.attestableObject.verify()) {
            console.error("Could not verify attestable object");
            return false;
        }
        if (!this.att.verify()) {
            console.error("Could not verify attestation");
            return false;
        }
        if (!this.crypto.verifyEqualityProof(this.att.getUnsignedAttestation().getCommitment(), this.attestableObject.getCommitment(), this.pok)) {
            console.error("Could not verify the consistency between the commitment in the attestation and the attested object");
            return false;
        }
        return true;
    }
    static fromBytes(asn1, decoder, attestorKey, attestable, issuerKey) {
        let attested = AsnParser.parse(uint8toBuffer(asn1), decoder);
        let me = new this();
        me.attestableObject = new attestable();
        me.attestableObject.fromBytes(attested.signedToken, issuerKey);
        me.att = SignedIdentifierAttestation.fromBytes(new Uint8Array(attested.attestation), attestorKey);
        let pok = new UsageProofOfExponent();
        pok.fromBytes(new Uint8Array(attested.proof));
        me.pok = pok;
        let attCom = me.att.getUnsignedAttestation().getCommitment();
        let objCom = me.attestableObject.getCommitment();
        let crypto = new AttestationCrypto();
        if (!crypto.verifyEqualityProof(attCom, objCom, pok)) {
            throw new Error("The redeem proof did not verify");
        }
        return me;
    }
    makeProof(attestationSecret, objectSecret, crypto) {
        let attCom = this.att.getUnsignedAttestation().getCommitment();
        let objCom = this.attestableObject.getCommitment();
        let pok = crypto.computeEqualityProof(uint8tohex(attCom), uint8tohex(objCom), attestationSecret, objectSecret);
        if (!crypto.verifyEqualityProof(attCom, objCom, pok)) {
            throw new Error("The redeem proof did not verify");
        }
        return pok;
    }
    getAttestableObject() {
        return this.attestableObject;
    }
    getAtt() {
        return this.att;
    }
    getDerEncodeProof() {
        return this.derEncodedProof;
    }
    getDerEncoding() {
        return this.encoding;
    }
    getUserPublicKey() {
        return this.userPublicKey;
    }
    constructorCheck() {
        if (!this.verify()) {
            throw new Error("The redeem request is not valid");
        }
    }
    checkValidity() {
        try {
            let attEncoded = this.att.getUnsignedAttestation().getDerEncoding();
            let std = IdentifierAttestation.fromBytes(new Uint8Array(hexStringToArray(attEncoded)));
            if (!std.checkValidity()) {
                console.error("The attestation is not a valid standard attestation");
                return false;
            }
        }
        catch (e) {
            console.error("The attestation is invalid");
            return false;
        }
        if (!this.getAttestableObject().checkValidity()) {
            console.error("Cheque is not valid");
            return false;
        }
        let attestationEthereumAddress = this.getAtt().getUnsignedAttestation().getSubject().substring(3);
        if (attestationEthereumAddress.toLowerCase() !== KeyPair.publicFromUint(this.getUserPublicKey()).getAddress().toLowerCase()) {
            console.error("The attestation is not to the same Ethereum user who is sending this request");
            return false;
        }
        return true;
    }
}
AttestedObject.Eip712UserData = {
    payload: '',
    description: '',
    timestamp: 0
};
AttestedObject.Eip712UserDataTypes = [
    { name: 'payload', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'timestamp', type: 'uint256' },
];
AttestedObject.Eip712UserDataPrimaryName = "Authentication";
AttestedObject.Eip712UserDataDescription = "Single-use authentication";
