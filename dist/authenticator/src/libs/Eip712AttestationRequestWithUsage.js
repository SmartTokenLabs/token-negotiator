import { AttestationRequestWithUsage } from "./AttestationRequestWithUsage";
import { KeyPair } from "./KeyPair";
import { base64ToUint8array, hexStringToBase64Url } from "./utils";
import { SignatureUtility } from "./SignatureUtility";
import { Nonce } from "./Nonce";
import { Eip712Token } from "./Eip712Token";
import { Timestamp } from "./Timestamp";
export class Eip712AttestationRequestWithUsage extends Eip712Token {
    constructor(userKey = null, acceptableTimeLimit = Timestamp.DEFAULT_TIME_LIMIT_MS, maxTokenValidityInMs = Timestamp.DEFAULT_TOKEN_TIME_LIMIT) {
        super();
        this.Eip712UserDataTypes = [
            { name: 'payload', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'identifier', type: 'string' },
            { name: 'timestamp', type: 'string' },
            { name: 'expirationTime', type: 'string' },
        ];
        this.Eip712UserDataPrimaryName = "AttestationRequestWUsage";
        this.Eip712UserDataDescription = "Prove that the \"identifier\" is the identifier hidden in attestation contained in\"payload\""
            + " and use this to authorize usage of local, temporary keys.";
        this.userKey = userKey;
        this.acceptableTimeLimit = acceptableTimeLimit;
        this.maxTokenValidityInMs = maxTokenValidityInMs;
    }
    async fromData(attestorDomain, acceptableTimeLimit = Timestamp.DEFAULT_TIME_LIMIT_MS, maxTokenValidityInMs = Timestamp.DEFAULT_TOKEN_TIME_LIMIT, identifier, attestationRequestWithUsage, signingKey = null) {
        this.setDomain(attestorDomain);
        if (signingKey) {
            this.userKey = signingKey;
        }
        try {
            this.acceptableTimeLimit = acceptableTimeLimit;
            this.maxTokenValidityInMs = maxTokenValidityInMs;
            this.attestationRequestWithUsage = attestationRequestWithUsage;
            this.jsonEncoding = await this.makeToken(identifier, attestationRequestWithUsage);
        }
        catch (e) {
            console.log(e);
            throw new Error("Could not encode object");
        }
        try {
            this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            throw new Error("Could not decode object");
        }
    }
    Eip712AttestationRequestWithUsage(attestorDomain, acceptableTimeLimit, maxTokenValidityInMs, jsonEncoding) {
        try {
            this.acceptableTimeLimit = acceptableTimeLimit;
            this.maxTokenValidityInMs = maxTokenValidityInMs;
            this.jsonEncoding = jsonEncoding;
            this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            console.log(e);
            throw new Error("Could not decode object");
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
            this.userPublicKey = KeyPair.fromPublicHex(publicKey.substr(2));
        }
        catch (e) {
            let m = "Recover Address failed with error:" + e;
            console.log(m);
            throw new Error(m);
        }
        if (!this.attestationRequestWithUsage) {
            this.attestationRequestWithUsage = AttestationRequestWithUsage.fromBytes(base64ToUint8array(this.data.payload));
        }
        this.constructorCheck();
    }
    constructorCheck() {
        if (!this.verify()) {
            throw new Error("Could not verify Eip712 use attestation");
        }
    }
    async makeToken(identifier, attestationRequestWithUsage) {
        if (!this.userKey) {
            await SignatureUtility.connectMetamaskAndGetAddress();
        }
        let ts = new Timestamp().getTimeAsString();
        let expirationTime = new Timestamp(Date.now() + this.maxTokenValidityInMs).getTimeAsString();
        let userData = {
            payload: hexStringToBase64Url(attestationRequestWithUsage.getDerEncoding()),
            description: this.Eip712UserDataDescription,
            timestamp: ts,
            identifier: identifier,
            expirationTime: expirationTime,
        };
        return await SignatureUtility.signEIP712WithBrowserWallet(this.domain, userData, this.Eip712UserDataTypes, this.Eip712UserDataPrimaryName, this.userKey);
    }
    getIdentifier() {
        return this.data.identifier;
    }
    getUserPublicKey() {
        return this.userPublicKey;
    }
    getPok() {
        return this.attestationRequestWithUsage.getPok();
    }
    getType() {
        return this.attestationRequestWithUsage.getType();
    }
    getSessionPublicKey() {
        return this.attestationRequestWithUsage.getSessionPublicKey();
    }
    getJsonEncoding() {
        return this.jsonEncoding;
    }
    checkValidity() {
        if (!this.testNonceAndDescription(this.acceptableTimeLimit)) {
            return false;
        }
        return true;
    }
    checkTokenValidity() {
        let time = new Timestamp(this.data.timestamp);
        time.setValidity(this.maxTokenValidityInMs);
        if (!time.validateAgainstExpiration(Timestamp.stringTimestampToLong(this.data.expirationTime))) {
            console.log('time.validateAgainstExpiration filed');
            return false;
        }
        if (!this.testNonceAndDescription(this.maxTokenValidityInMs)) {
            return false;
        }
        return true;
    }
    testNonceAndDescription(timeLimit) {
        if (!timeLimit) {
            throw new Error('timeLimit required');
        }
        let nonceMinTime = Timestamp.stringTimestampToLong(this.data.timestamp) - timeLimit;
        let nonceMaxTime = Timestamp.stringTimestampToLong(this.data.timestamp) + timeLimit;
        if (!new Nonce().validateNonce(this.attestationRequestWithUsage.getPok().getNonce(), this.userPublicKey.getAddress(), this.domain, nonceMinTime, nonceMaxTime)) {
            return false;
        }
        if (this.data.description !== this.Eip712UserDataDescription) {
            return false;
        }
        return true;
    }
    verify() {
        if (!this.attestationRequestWithUsage.verify()) {
            return false;
        }
        return true;
    }
}
