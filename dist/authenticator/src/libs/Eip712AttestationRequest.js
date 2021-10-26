import { AttestationRequest } from "./AttestationRequest";
import { KeyPair } from "./KeyPair";
import { SignatureUtility } from "./SignatureUtility";
import { base64ToUint8array, hexStringToBase64Url } from "./utils";
import { Nonce } from "./Nonce";
import { Eip712Token } from "./Eip712Token";
import { Timestamp } from "./Timestamp";
import { debugLog } from "../config";
export class Eip712AttestationRequest extends Eip712Token {
    constructor(userKey = null, acceptableTimeLimit = Timestamp.DEFAULT_TIME_LIMIT_MS) {
        super();
        this.Eip712UserDataTypes = [
            { name: 'payload', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'timestamp', type: 'string' },
            { name: 'identifier', type: 'string' },
        ];
        this.Eip712UserDataPrimaryName = "AttestationRequest";
        this.Eip712UserDataDescription = "Linking Ethereum address to phone or email";
        this.userKey = userKey;
        this.acceptableTimeLimit = acceptableTimeLimit;
    }
    async addData(attestorDomain, acceptableTimeLimit = Timestamp.DEFAULT_TIME_LIMIT_MS, identifier, request) {
        this.setDomain(attestorDomain);
        this.attestationRequest = request;
        this.acceptableTimeLimit = acceptableTimeLimit;
        this.jsonEncoding = await this.makeToken(identifier);
        try {
            this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    fillJsonData(json) {
        if (!json)
            throw new Error('Empty json');
        this.jsonEncoding = json;
        let tokenData = JSON.parse(json);
        let signatureInHex = tokenData.signatureInHex;
        let jsonSigned = JSON.parse(tokenData.jsonSigned);
        this.eip712DomainData = jsonSigned.domain;
        this.data = jsonSigned.message;
        try {
            let publicKey = SignatureUtility.recoverPublicKeyFromTypedMessageSignature(jsonSigned, signatureInHex);
            this.requestorKeys = KeyPair.fromPublicHex(publicKey.substr(2));
        }
        catch (e) {
            let m = "Recover Address failed with error:" + e;
            console.log(m);
            throw new Error(m);
        }
        if (!this.attestationRequest) {
            this.attestationRequest = AttestationRequest.fromBytes(base64ToUint8array(this.data.payload));
        }
        this.constructorCheck();
    }
    constructorCheck() {
        if (!this.verify()) {
            throw new Error("Could not verify Eip712 AttestationRequest");
        }
    }
    async makeToken(identifier) {
        let userAddress;
        if (this.userKey) {
            userAddress = this.userKey.getAddress();
        }
        else {
            userAddress = await SignatureUtility.connectMetamaskAndGetAddress();
        }
        let nonceTimestamp = Nonce.getTimestamp(this.attestationRequest.getPok().getNonce());
        let ts = new Timestamp(nonceTimestamp).getTimeAsString();
        let userData = {
            payload: hexStringToBase64Url(this.attestationRequest.getDerEncoding()),
            description: this.Eip712UserDataDescription,
            timestamp: ts,
            identifier: identifier,
        };
        return await SignatureUtility.signEIP712WithBrowserWallet(this.domain, userData, this.Eip712UserDataTypes, this.Eip712UserDataPrimaryName, this.userKey);
    }
    setAcceptableTimeLimit(limit) {
        this.acceptableTimeLimit = limit;
    }
    getJsonEncoding() {
        return this.jsonEncoding;
    }
    verify() {
        if (!this.attestationRequest.verify()) {
            return false;
        }
        return this.verifyDomainData();
    }
    verifyDomainData() {
        return (this.eip712DomainData.name.toLowerCase() === this.getDomain().toLowerCase())
            && (this.eip712DomainData.version === SignatureUtility.Eip712Data['PROTOCOL_VERSION']);
    }
    checkValidity() {
        if (this.data.description !== this.Eip712UserDataDescription) {
            if (debugLog) {
                console.log('Description is not correct. :' + this.data.description + ' !== ' + this.Eip712UserDataDescription);
            }
            return false;
        }
        ;
        let timestamp = new Timestamp(this.data.timestamp);
        timestamp.setValidity(this.acceptableTimeLimit);
        if (!timestamp.validateTimestamp()) {
            console.log(`timestamp is not correct. timestamp = ${this.data.timestamp}, acceptableTimeLimit = ${this.acceptableTimeLimit}`);
            return false;
        }
        if (!new Nonce().validateNonce(this.getPok().getNonce(), this.requestorKeys.getAddress(), this.domain, Timestamp.stringTimestampToLong(this.data.timestamp) - this.acceptableTimeLimit, Timestamp.stringTimestampToLong(this.data.timestamp) + this.acceptableTimeLimit)) {
            console.log('nonce is not correct');
            return false;
        }
        return true;
    }
    getIdentifier() {
        return this.data.identifier;
    }
    getType() {
        return this.attestationRequest.getType();
    }
    getPok() {
        return this.attestationRequest.getPok();
    }
    getUserPublicKey() {
        return this.requestorKeys;
    }
}
