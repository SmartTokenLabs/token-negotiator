import { KeyPair } from "./KeyPair";
import { SignatureUtility } from "./SignatureUtility";
import { Eip712Token } from "./Eip712Token";
import { UseAttestation } from "./UseAttestation";
import { base64ToUint8array, hexStringToBase64Url } from "./utils";
import { AttestationCrypto, Pedestren_G } from "./AttestationCrypto";
import { CURVE_BN256, Point } from "./Point";
import { Nonce } from "./Nonce";
import { Timestamp } from "./Timestamp";
import { debugLog } from "../config";
export class Eip712AttestationUsage extends Eip712Token {
    constructor(userKey = null, maxTokenValidityInMs = Timestamp.DEFAULT_TOKEN_TIME_LIMIT) {
        super();
        this.PLACEHOLDER_CHAIN_ID = 0;
        this.Eip712PrimaryName = "AttestationUsage";
        this.Eip712Description = "Prove that the \"identifier\" is the identifier hidden in attestation contained in\"payload\".";
        this.Eip712UserTypes = [
            { name: 'description', type: 'string' },
            { name: 'identifier', type: 'string' },
            { name: 'payload', type: 'string' },
            { name: 'timestamp', type: 'string' },
            { name: 'expirationTime', type: 'string' },
        ];
        this.maxTokenValidityInMs = maxTokenValidityInMs;
        this.userKey = userKey;
    }
    async addData(attestorDomain, identifier, useAttestation) {
        this.setDomain(attestorDomain);
        this.useAttestation = useAttestation;
        try {
            this.jsonEncoding = await this.makeToken(identifier, useAttestation);
        }
        catch (e) {
            console.error(e);
            throw new Error("Could not encode object. " + e);
        }
        try {
            this.fillJsonData(this.jsonEncoding);
        }
        catch (e) {
            console.log(e);
            return false;
        }
        this.constructorCheck();
    }
    fillJsonData(json, attestorKey = null) {
        if (!json) {
            throw new Error('Empty json');
        }
        if (attestorKey !== null) {
            this.attestorKey = attestorKey;
        }
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
        if (!this.useAttestation) {
            try {
                this.useAttestation = UseAttestation.fromBytes(base64ToUint8array(this.data.payload), this.attestorKey);
            }
            catch (e) {
                let m = "Failed to read UseAttestation. " + e;
                if (debugLog) {
                    console.log(m);
                }
                throw new Error(m);
            }
        }
        this.constructorCheck();
    }
    constructorCheck() {
        if (!this.verify()) {
            throw new Error("Could not verify Eip712 use attestation");
        }
    }
    async makeToken(identifier, useAttestation) {
        if (!this.userKey) {
            await SignatureUtility.connectMetamaskAndGetAddress();
        }
        let userData = {
            payload: hexStringToBase64Url(useAttestation.getDerEncoding()),
            description: this.Eip712Description,
            timestamp: new Timestamp().getTimeAsString(),
            identifier: identifier,
            expirationTime: new Timestamp(Date.now() + this.maxTokenValidityInMs).getTimeAsString(),
        };
        return await SignatureUtility.signEIP712WithBrowserWallet(this.domain, userData, this.Eip712UserTypes, this.Eip712PrimaryName, this.userKey);
    }
    proofLinking() {
        let crypto = new AttestationCrypto();
        let candidateExponent = crypto.mapToCurveMultiplier(this.getType(), this.getIdentifier());
        let commitmentPoint = Point.decodeFromUint8(this.getAttestation().getUnsignedAttestation().getCommitment(), CURVE_BN256);
        let candidateRiddle = commitmentPoint.subtract(Pedestren_G.multiplyDA(candidateExponent));
        if (!candidateRiddle.equals(this.getPok().getRiddle())) {
            console.log('candidateRiddle.equals(this.getPok().getRiddle()) error');
            return false;
        }
        return true;
    }
    getPok() {
        return this.useAttestation.getPok();
    }
    getType() {
        return this.useAttestation.type;
    }
    getIdentifier() {
        return this.data.identifier;
    }
    getAttestation() {
        return this.useAttestation.getAttestation();
    }
    getJsonEncoding() {
        return this.jsonEncoding;
    }
    checkTokenValidity() {
        let nonceMinTime = Timestamp.stringTimestampToLong(this.data.expirationTime) - this.maxTokenValidityInMs - 2 * Timestamp.ALLOWED_ROUNDING;
        let nonceMaxTime = Timestamp.stringTimestampToLong(this.data.expirationTime);
        if (!this.useAttestation.checkValidity()) {
            console.log('useAttestation.checkValidity failed');
            return false;
        }
        ;
        if (this.data.description != this.Eip712Description) {
            console.log(`wrong description: "${this.data.description}", must be "${this.Eip712Description}"`);
            return false;
        }
        ;
        let time = new Timestamp(this.data.timestamp);
        time.setValidity(this.maxTokenValidityInMs);
        if (!time.validateAgainstExpiration(Timestamp.stringTimestampToLong(this.data.expirationTime))) {
            console.log('verify timestamp failed.\n' + this.data.timestamp + "\n" + this.maxTokenValidityInMs + "\n" + this.data.expirationTime + "\n" + Timestamp.stringTimestampToLong(this.data.expirationTime) + "\n");
            return false;
        }
        if (this.requestorKeys.getAddress().toLowerCase() !== this.useAttestation.getAttestation().getUnsignedAttestation().getAddress().toLowerCase()) {
            console.log('wrong address');
            return false;
        }
        ;
        if (!(new Nonce().validateNonce(this.useAttestation.getPok().getNonce(), (this.useAttestation.getAttestation().getUnsignedAttestation()).getAddress(), this.domain, nonceMinTime, nonceMaxTime))) {
            console.log('wrong Nonce');
            return false;
        }
        ;
        if (!this.proofLinking()) {
            console.log('wrong proofLinking');
            return false;
        }
        ;
        return true;
    }
    verify() {
        if (!this.useAttestation.verify()) {
            return false;
        }
        return true;
    }
    getSessionPublicKey() {
        return this.useAttestation.getSessionPublicKey();
    }
}
