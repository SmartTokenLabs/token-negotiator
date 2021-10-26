import { AttestedObject } from "./AttestedObject";
import { UseToken } from "../asn1/shemas/UseToken";
import { XMLconfigData } from "../data/tokenData";
import { KeyPair } from "./KeyPair";
import { Ticket } from "../Ticket";
import { SignatureUtility } from "./SignatureUtility";
import { hexStringToUint8 } from "./utils";
export class Eip712Validator {
    constructor() {
        this.XMLConfig = XMLconfigData;
    }
    static stringIsAValidUrl(domain) {
        let parsedUrl;
        try {
            parsedUrl = new URL(domain);
        }
        catch (e) {
            console.log('cant construct url. Error:' + e);
            return false;
        }
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    }
    ;
    setDomainAndTimout(domain) {
        if (!Eip712Validator.stringIsAValidUrl(domain))
            throw new Error('wrong domain');
        this.domain = domain;
    }
    setDomain(domain) {
        if (!Eip712Validator.stringIsAValidUrl(domain))
            throw new Error('wrong domain');
        this.domain = domain;
    }
    getDomain() {
        return this.domain;
    }
    validateRequest(jsonInput) {
        try {
            let authenticationData = JSON.parse(jsonInput);
            let authenticationRootNode = JSON.parse(authenticationData.jsonSigned);
            let eip712Domain = authenticationRootNode.domain;
            let eip712Message = authenticationRootNode.message;
            let attestedObject = this.retrieveAttestedObject(eip712Message);
            return this.validateDomain(eip712Domain);
        }
        catch (e) {
            console.error('Validate error!');
            console.error(e);
            return false;
        }
    }
    validateDomain(domainToCheck) {
        if (domainToCheck.name.toLowerCase() !== this.domain.toLowerCase()) {
            console.error("Domain name is not valid");
            return false;
        }
        if (domainToCheck.version !== SignatureUtility.Eip712Data['PROTOCOL_VERSION']) {
            console.error("Protocol version is wrong");
            return false;
        }
        return true;
    }
    retrieveAttestedObject(auth) {
        let attestedObjectHex = auth.payload;
        let attestorKey = KeyPair.publicFromBase64(XMLconfigData.base64attestorPubKey);
        let issuerKey = KeyPair.publicFromBase64(XMLconfigData.base64senderPublicKey);
        let decodedAttestedObject = AttestedObject.fromBytes(hexStringToUint8(attestedObjectHex), UseToken, attestorKey, Ticket, issuerKey);
        return decodedAttestedObject;
    }
    verifySignature(signedJsonInput, pkAddress) {
        let tokenData = JSON.parse(signedJsonInput);
        let signatureInHex = tokenData.signatureInHex;
        let jsonSigned = JSON.parse(tokenData.jsonSigned);
        let publicKey = SignatureUtility.recoverPublicKeyFromTypedMessageSignature(jsonSigned, signatureInHex);
        let userKey = KeyPair.fromPublicHex(publicKey.substr(2));
        if (pkAddress.toLowerCase() !== jsonSigned.message.address.toLowerCase()) {
            console.log('message.address is not equal pkAddress');
            return false;
        }
        if (pkAddress.toLowerCase() !== userKey.getAddress().toLowerCase()) {
            console.log('Recovered address is not equal pkAddress');
            return false;
        }
        return true;
    }
}
