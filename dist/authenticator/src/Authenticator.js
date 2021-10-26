import { Ticket } from "./Ticket";
import { KeyPair } from "./libs/KeyPair";
import { base64ToUint8array, uint8ToBn, uint8tohex } from "./libs/utils";
import { SignedIdentifierAttestation } from "./libs/SignedIdentifierAttestation";
import { AttestedObject } from "./libs/AttestedObject";
import { XMLconfigData } from "./data/tokenData";
import { AttestationCrypto } from "./libs/AttestationCrypto";
import { AttestationRequest } from "./libs/AttestationRequest";
import { Nonce } from "./libs/Nonce";
import { Eip712AttestationRequest } from "./libs/Eip712AttestationRequest";
import { IdentifierAttestation } from "./libs/IdentifierAttestation";
import { SignatureUtility } from "./libs/SignatureUtility";
import { UseAttestation } from "./libs/UseAttestation";
import { Eip712AttestationUsage } from "./libs/Eip712AttestationUsage";
import { Eip712AttestationRequestWithUsage } from "./libs/Eip712AttestationRequestWithUsage";
import { AttestationRequestWithUsage } from "./libs/AttestationRequestWithUsage";
import { debugLog } from "./config";
let subtle;
if (typeof crypto === "object" && crypto.subtle) {
    subtle = crypto.subtle;
}
else {
    subtle = require('crypto').webcrypto.subtle;
}
const ALPHA_CONFIG = {
    indexedDBname: "AlphaDB",
    indexedDBobject: "AlphaKeyStore",
    indexedDBid: "TK",
    keysAlgorithm: {
        name: "ECDSA",
        namedCurve: "P-256"
    },
    signAlgorithm: {
        name: "ECDSA",
        hash: { name: "SHA-256" },
    }
};
export class Authenticator {
    constructor(negotiator = false) {
        this.negotiator = negotiator;
        let XMLconfig = XMLconfigData;
        this.base64senderPublicKey = XMLconfig.base64senderPublicKey;
        this.base64attestorPubKey = XMLconfig.base64attestorPubKey;
        this.webDomain = XMLconfig.webDomain;
    }
    getAuthenticationBlob(tokenObj, authResultCallback) {
        this.signedTokenBlob = tokenObj.ticketBlob;
        this.magicLink = tokenObj.magicLink;
        this.email = tokenObj.email;
        this.signedTokenSecret = tokenObj.ticketSecret;
        this.attestationOrigin = tokenObj.attestationOrigin;
        this.authResultCallback = authResultCallback;
        this.getIdentifierAttestation();
    }
    getIdentifierAttestation() {
        console.log('getIdentifierAttestation. create iframe with ' + this.attestationOrigin);
        this.attachPostMessageListener(this.postMessageAttestationListener.bind(this));
        const iframe = document.createElement('iframe');
        this.iframe = iframe;
        iframe.src = this.attestationOrigin;
        iframe.style.width = '800px';
        iframe.style.height = '700px';
        iframe.style.maxWidth = '100%';
        iframe.style.background = '#fff';
        let iframeWrap = document.createElement('div');
        this.iframeWrap = iframeWrap;
        iframeWrap.setAttribute('style', 'width:100%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa');
        iframeWrap.appendChild(iframe);
        document.body.appendChild(iframeWrap);
    }
    async getUseTicket(ticketSecret, attestationSecret, base64ticket, base64attestation, base64attestationPublicKey, base64senderPublicKey) {
        let ticket = Ticket.fromBase64(base64ticket, KeyPair.publicFromBase64(base64senderPublicKey));
        if (!ticket.checkValidity()) {
            console.log("Could not validate ticket");
            throw new Error("Validation failed");
        }
        if (!ticket.verify()) {
            console.log("Could not verify ticket");
            throw new Error("Verification failed");
        }
        console.log('ticked valid (signature OK)');
        let attestorKey = KeyPair.publicFromBase64(base64attestationPublicKey);
        let att = SignedIdentifierAttestation.fromBytes(base64ToUint8array(base64attestation), attestorKey);
        if (!att.checkValidity()) {
            console.log("Could not validate attestation");
            throw new Error("Validation failed");
        }
        if (!att.verify()) {
            console.log("Could not verify attestation");
            throw new Error("Verification failed");
        }
        console.log('attestaion valid');
        let redeem = new AttestedObject();
        redeem.create(ticket, att, BigInt(attestationSecret), BigInt(ticketSecret));
        console.log("redim validation = " + redeem.checkValidity());
        let unSigned = redeem.getDerEncoding();
        return unSigned;
    }
    postMessageAttestationListener(event) {
        let attestURL = new URL(this.attestationOrigin);
        if (event.origin !== attestURL.origin) {
            return;
        }
        console.log('postMessageAttestationListener event (Authenticator)');
        console.log(event);
        if (typeof event.data.ready !== "undefined"
            && event.data.ready === true) {
            let sendData = { force: false };
            if (this.magicLink)
                sendData.magicLink = this.magicLink;
            if (this.email)
                sendData.email = this.email;
            this.iframe.contentWindow.postMessage(sendData, this.attestationOrigin);
            return;
        }
        if (typeof event.data.display !== "undefined") {
            if (event.data.display === true) {
                this.iframeWrap.style.display = 'flex';
                this.negotiator && this.negotiator.commandDisplayIframe();
            }
            else {
                this.iframeWrap.style.display = 'none';
                this.negotiator && this.negotiator.commandHideIframe();
            }
        }
        if (!event.data.hasOwnProperty('attestation')
            || !event.data.hasOwnProperty('requestSecret')) {
            return;
        }
        this.iframeWrap.remove();
        this.attestationBlob = event.data.attestation;
        this.attestationSecret = event.data.requestSecret;
        console.log('attestation data received.');
        console.log(this.attestationBlob);
        console.log(this.attestationSecret);
        console.log(this.base64attestorPubKey);
        try {
            this.getUseTicket(this.signedTokenSecret, this.attestationSecret, this.signedTokenBlob, this.attestationBlob, this.base64attestorPubKey, this.base64senderPublicKey).then(useToken => {
                if (useToken) {
                    console.log('this.authResultCallback( useToken ): ');
                    this.authResultCallback(useToken);
                }
                else {
                    console.log('this.authResultCallback( empty ): ');
                    this.authResultCallback(useToken);
                }
            });
        }
        catch (e) {
            console.log(`UseDevconTicket. Something went wrong. ${e}`);
            this.authResultCallback(false);
        }
    }
    attachPostMessageListener(listener) {
        if (window.addEventListener) {
            window.addEventListener("message", (e) => {
                listener(e);
            }, false);
        }
        else {
            window.attachEvent("onmessage", (e) => {
                listener(e);
            });
        }
    }
    static async requestAttest(receiverId, type, attestorDomain, secret, userKey = null) {
        let crypto = new AttestationCrypto();
        let userAddress;
        if (userKey) {
            userAddress = userKey.getAddress();
        }
        else {
            try {
                userAddress = await SignatureUtility.connectMetamaskAndGetAddress();
            }
            catch (e) {
                console.log('Cant find user Ethereum Address. Please check Metamask. ' + e);
                return;
            }
        }
        let nonce = await Nonce.makeNonce(userAddress, attestorDomain);
        if (debugLog) {
            console.log('nonce = ' + uint8tohex(nonce));
        }
        let pok = crypto.computeAttestationProof(secret, nonce);
        let attRequest = AttestationRequest.fromData(crypto.getType(type), pok);
        let attest = new Eip712AttestationRequest(userKey);
        await attest.addData(attestorDomain, 20 * 1000, receiverId, attRequest);
        let attestJson = attest.getJsonEncoding();
        return attestJson;
    }
    static constructAttest(attestorKey, issuerName, validityInMilliseconds, attestRequestJson, attestorDomain) {
        let att;
        let crypto = new AttestationCrypto();
        let attestationRequest;
        let commitment;
        try {
            attestationRequest = new Eip712AttestationRequest();
            attestationRequest.setDomain(attestorDomain);
            attestationRequest.fillJsonData(attestRequestJson);
            Authenticator.checkAttestRequestVerifiability(attestationRequest);
            Authenticator.checkAttestRequestValidity(attestationRequest);
        }
        catch (e) {
            let m = "Failed to fill attestation data from json. " + e + "\nRestores as an Eip712AttestationRequestWithUsage object instead";
            if (debugLog) {
                console.log(m);
            }
            try {
                attestationRequest = new Eip712AttestationRequestWithUsage();
                attestationRequest.setDomain(attestorDomain);
                attestationRequest.fillJsonData(attestRequestJson);
                Authenticator.checkAttestRequestVerifiability(attestationRequest);
                Authenticator.checkAttestRequestValidity(attestationRequest);
            }
            catch (e) {
                let m = "Failed to parse Eip712AttestationRequestWithUsage. " + e;
                console.log(m);
                throw new Error(m);
            }
        }
        commitment = crypto.makeCommitmentFromHiding(attestationRequest.getIdentifier(), attestationRequest.getType(), attestationRequest.getPok().getRiddle());
        att = new IdentifierAttestation();
        att.fromCommitment(commitment, attestationRequest.getUserPublicKey());
        att.setIssuer("CN=" + issuerName);
        att.setSerialNumber(Math.round(Math.random() * Number.MAX_SAFE_INTEGER));
        let now = Date.now();
        att.setNotValidBefore(now);
        att.setNotValidAfter(now + validityInMilliseconds);
        let signed = SignedIdentifierAttestation.fromData(att, attestorKey);
        return signed.getDerEncoding();
    }
    static async useAttest(attestationBase64, attestationSecretBase64, attestorKey, receiverId, type, webDomain, sessionKey = null, userKey = null) {
        const attestationUint8 = base64ToUint8array(attestationBase64);
        let att = SignedIdentifierAttestation.fromBytes(attestationUint8, attestorKey);
        let attestationSecretDerUint8 = base64ToUint8array(attestationSecretBase64);
        let attestationSecret = uint8ToBn(attestationSecretDerUint8.slice(4));
        let crypto = new AttestationCrypto();
        let address;
        if (userKey) {
            address = userKey.getAddress();
        }
        else {
            address = await SignatureUtility.connectMetamaskAndGetAddress();
        }
        let nonce = await Nonce.makeNonce(address, webDomain);
        let pok = crypto.computeAttestationProof(attestationSecret, nonce);
        try {
            let attUsage = UseAttestation.fromData(att, crypto.getType(type), pok, sessionKey);
            let usageRequest = new Eip712AttestationUsage(userKey);
            let res = await usageRequest.addData(webDomain, receiverId, attUsage);
            return usageRequest.getJsonEncoding();
        }
        catch (e) {
            console.error(e);
        }
    }
    static checkAttestRequestVerifiability(input) {
        if (!input.verify()) {
            if (debugLog) {
                console.log("Could not verify attestation signing request");
            }
            throw new Error("Verification failed");
        }
    }
    static checkAttestRequestValidity(input) {
        if (!input.checkValidity()) {
            if (debugLog) {
                console.log("Could not validate attestation signing request");
            }
            throw new Error("Validation failed");
        }
    }
    static checkUsageVerifiability(input) {
        if (!input.verify()) {
            console.error("Could not verify usage request");
            throw new Error("Verification failed");
        }
    }
    static checkUsageValidity(input) {
        if (!input.checkTokenValidity()) {
            console.error("Could not validate usage request");
            throw new Error("Validation failed");
        }
    }
    static async verifyUsage(jsonRequest, attestorKey, message, WEB_DOMAIN, signature) {
        let sessionPublicKey;
        try {
            let usageRequest = new Eip712AttestationUsage();
            usageRequest.setDomain(WEB_DOMAIN);
            usageRequest.fillJsonData(jsonRequest, attestorKey);
            Authenticator.checkUsageVerifiability(usageRequest);
            Authenticator.checkUsageValidity(usageRequest);
            sessionPublicKey = usageRequest.getSessionPublicKey();
        }
        catch (e) {
            if (debugLog) {
                console.log('Eip712AttestationUsage failed. ' + e + '. Lets try to verify Eip712AttestationRequestWithUsage');
            }
            let usageRequest = new Eip712AttestationRequestWithUsage();
            usageRequest.setDomain(WEB_DOMAIN);
            usageRequest.fillJsonData(jsonRequest);
            Authenticator.checkUsageVerifiability(usageRequest);
            Authenticator.checkUsageValidity(usageRequest);
            sessionPublicKey = usageRequest.getSessionPublicKey();
        }
        try {
            let res = await sessionPublicKey.verifyStringWithSubtle(KeyPair.anySignatureToRawUint8(signature), message);
            if (!res) {
                console.error("Could not verify message signature");
                throw new Error("Signature verification failed");
            }
            return "SUCCESSFULLY validated usage request!";
        }
        catch (e) {
            let m = "Cant verify session with subtle. " + e;
            console.log(m);
            console.error(e);
        }
    }
    static async requestAttestAndUsage(userKey, receiverId, type, ATTESTOR_DOMAIN, attestationSecretBase64, sessionKey) {
        try {
            let attestationSecret = uint8ToBn(base64ToUint8array(attestationSecretBase64));
            let address;
            if (userKey) {
                address = userKey.getAddress();
            }
            else {
                address = await SignatureUtility.connectMetamaskAndGetAddress();
            }
            let nonce = await Nonce.makeNonce(address, ATTESTOR_DOMAIN, new Uint8Array(0), Date.now());
            let crypto = new AttestationCrypto();
            let pok = crypto.computeAttestationProof(attestationSecret, nonce);
            let attRequest = AttestationRequestWithUsage.fromData(crypto.getType(type), pok, sessionKey);
            let request = new Eip712AttestationRequestWithUsage(userKey);
            await request.fromData(ATTESTOR_DOMAIN, undefined, undefined, receiverId, attRequest);
            return request.getJsonEncoding();
        }
        catch (e) {
            let m = "requestAttestAndUsage error. " + e;
            console.log(m);
            console.error(e);
        }
    }
}
