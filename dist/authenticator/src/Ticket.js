import { AttestationCrypto } from "./libs/AttestationCrypto";
import { Asn1Der } from "./libs/DerUtility";
import { AttestableObject } from "./libs/AttestableObject";
import { base64ToUint8array, hexStringToArray, uint8toBuffer, uint8tohex } from "./libs/utils";
import { SignedDevconTicket } from "./asn1/shemas/SignedDevconTicket";
import { AsnParser } from "@peculiar/asn1-schema";
export class Ticket extends AttestableObject {
    constructor() {
        super();
        this.magicLinkURLPrefix = "https://ticket.devcon.org/";
    }
    fromData(devconId, ticketId, ticketClass, keys) {
        this.ticketId = ticketId;
        this.ticketClass = ticketClass;
        this.devconId = devconId;
        this.keys = keys;
    }
    createWithCommitment(devconId, ticketId, ticketClass, commitment, signature, keys) {
        this.fromData(devconId, ticketId, ticketClass, keys);
        this.commitment = commitment;
        this.signature = signature;
        this.encoded = this.encodeSignedTicket(this.makeTicket());
        if (!this.verify()) {
            throw new Error("Signature is invalid");
        }
    }
    static createWithMail(mail, devconId, ticketId, ticketClass, keys, secret) {
        let me = new this();
        me.fromData(devconId, ticketId, ticketClass, keys);
        let crypto = new AttestationCrypto();
        let commitment, signature;
        let asn1Tic = me.makeTicket();
        try {
            commitment = crypto.makeCommitment(mail, crypto.getType('mail'), secret);
            signature = keys.signBytesWithEthereum(hexStringToArray(asn1Tic));
        }
        catch (e) {
            throw new Error(e);
        }
        me.createWithCommitment(devconId, ticketId, ticketClass, commitment, signature, keys);
        return me;
    }
    makeTicket() {
        let ticket = Asn1Der.encode('UTF8STRING', this.devconId)
            + Asn1Der.encode('INTEGER', this.ticketId)
            + Asn1Der.encode('INTEGER', this.ticketClass);
        return Asn1Der.encode('SEQUENCE_30', ticket);
    }
    encodeSignedTicket(ticket) {
        let signedTicket = ticket
            + Asn1Der.encode('OCTET_STRING', uint8tohex(this.commitment))
            + Asn1Der.encode('BIT_STRING', this.signature);
        return Asn1Der.encode('SEQUENCE_30', signedTicket);
    }
    getDerEncodingWithPK() {
        let ticket = this.makeTicket();
        let signedTicket = ticket
            + Asn1Der.encode('OCTET_STRING', uint8tohex(this.commitment))
            + this.keys.getAsnDerPublic()
            + Asn1Der.encode('BIT_STRING', this.signature);
        return Asn1Der.encode('SEQUENCE_30', signedTicket);
    }
    getDerEncoding() {
        return this.encoded;
    }
    verify() {
        return this.keys.verifyBytesWithEthereum(hexStringToArray(this.makeTicket()), this.signature);
    }
    checkValidity() {
        return true;
    }
    getTicketId() {
        return this.ticketId;
    }
    getTicketClass() {
        return this.ticketClass;
    }
    getSignature() {
        return this.signature;
    }
    static fromBase64(base64str, keys) {
        let me = new this();
        me.fromBytes(base64ToUint8array(base64str), keys);
        return me;
    }
    fromBytes(bytes, keys) {
        const signedDevconTicket = AsnParser.parse(uint8toBuffer(bytes), SignedDevconTicket);
        let devconId = signedDevconTicket.ticket.devconId;
        let ticketId = BigInt(signedDevconTicket.ticket.ticketId);
        let ticketClassInt = signedDevconTicket.ticket.ticketClass;
        let commitment = signedDevconTicket.commitment;
        let signature = signedDevconTicket.signatureValue;
        this.createWithCommitment(devconId, ticketId, ticketClassInt, new Uint8Array(commitment), uint8tohex(new Uint8Array(signature)), keys);
    }
    getCommitment() {
        return this.commitment;
    }
    getUrlEncoding() {
    }
}
