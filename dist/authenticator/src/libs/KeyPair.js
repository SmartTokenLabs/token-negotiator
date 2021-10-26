import { base64ToUint8array, hexStringToArray, hexStringToUint8, stringToArray, uint8arrayToBase64, uint8ToBn, uint8toBuffer, uint8tohex } from "./utils";
import { Asn1Der } from "./DerUtility";
import { CURVE_SECP256k1, CURVES, Point } from "./Point";
import { AsnParser } from "@peculiar/asn1-schema";
import { PrivateKeyData, PrivateKeyInfo, PublicKeyInfoValue } from "../asn1/shemas/AttestationFramework";
import { ethers } from "ethers";
import { Signature } from "../asn1/shemas/Signature";
let EC = require("elliptic");
let subtle;
if (typeof crypto === "object" && crypto.subtle) {
    subtle = crypto.subtle;
}
else {
    subtle = require('crypto').webcrypto.subtle;
}
let ec = new EC.ec('secp256k1');
let sha3 = require("js-sha3");
const EC_CURVES_SUBTLE = {
    p192: null,
    p224: null,
    p256: 'P-256',
    p384: 'P-384',
    p521: 'P-521',
    curve25519: null,
    ed25519: null,
    secp256k1: null,
};
const G = new Point(55066263022277343669578718895168534326250603453777594175500187360389116729240n, 32670510020758816978083085130507043184471273380659243275938904335757337482424n);
const DEFAULT_ALGORITHM = 'secp256k1';
export class KeyPair {
    constructor() {
        this.ethereumPrefix = "\u0019Ethereum Signed Message:\n";
        this.algorithmASNList = {
            secp256k1: "3081ec06072a8648ce3d02013081e0020101302c06072a8648ce3d0101022100fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f3044042000000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000000000704410479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8022100fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141020101",
            sect283k1: "3081f806072a8648ce3d02013081ec020101302506072a8648ce3d0102301a0202011b06092a8648ce3d01020303300902010502010702010c304c042400000000000000000000000000000000000000000000000000000000000000000000000004240000000000000000000000000000000000000000000000000000000000000000000000010449040503213f78ca44883f1a3b8162f188e553cd265f23c1567a16876913b0c2ac245849283601ccda380f1c9e318d90f95d07e5426fe87e45c0e8184698e45962364e34116177dd2259022401ffffffffffffffffffffffffffffffffffe9ae2ed07577265dff7f94451e061e163c61020104",
            p256: "3081ec06072a8648ce3d02013081e0020101302c06072a8648ce3d0101022100ffffffff00000001000000000000000000000000ffffffffffffffffffffffff30440420ffffffff00000001000000000000000000000000fffffffffffffffffffffffc04205ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b0441046b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c2964fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5022100ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551020101"
        };
    }
    getPrivateAsUint8() {
        return this.privKey;
    }
    getPrivateAsHexString() {
        return uint8tohex(this.privKey);
    }
    getPrivateAsBigInt() {
        return uint8ToBn(this.privKey);
    }
    static privateFromBigInt(priv) {
        let me = new this();
        me.privKey = new Uint8Array(hexStringToArray(priv.toString(16).padStart(64, '0')));
        return me;
    }
    static fromPublicHex(publicHex) {
        if (publicHex.toLowerCase().match(/^[a-f0-9]+$/i) === null) {
            throw new Error('Wrong Hex string input');
        }
        if (publicHex.length < 129 || publicHex.length > 130) {
            throw new Error('Wrong public hex length');
        }
        let me = new this();
        me.pubKey = new Uint8Array(hexStringToArray(publicHex));
        return me;
    }
    static fromPrivateUint8(privateUint, keyAlg = '') {
        if (!privateUint || privateUint.length != 32) {
            throw new Error('Wrong private key. Should be 32 bytes Uint8');
        }
        let me = new this();
        me.privKey = privateUint;
        if (keyAlg && CURVES.hasOwnProperty(keyAlg)) {
            me.algorithm = keyAlg;
        }
        else {
            throw new Error(`Algorithm ${keyAlg} not implemented.`);
        }
        return me;
    }
    static publicFromBase64(base64) {
        let me = new this();
        let publicUint8 = base64ToUint8array(base64);
        let pub = AsnParser.parse(uint8toBuffer(publicUint8), PublicKeyInfoValue);
        me.pubKey = new Uint8Array(pub.publicKey);
        return me;
    }
    static publicFromSubjectPublicKeyInfo(spki) {
        let me = new this();
        me.pubKey = new Uint8Array(spki.value.publicKey);
        return me;
    }
    static publicFromSubjectPublicKeyValue(spki) {
        let me = new this();
        me.pubKey = new Uint8Array(spki.publicKey);
        me.algorithm = me.getAlgorithNameFromASN1(uint8tohex(new Uint8Array(spki.algorithm)));
        return me;
    }
    static publicFromUint(key) {
        let me = new this();
        if (key.byteLength != 65) {
            console.error('Wrong public key length');
            throw new Error('Wrong public key length');
        }
        me.pubKey = new Uint8Array(key);
        return me;
    }
    static privateFromKeyInfo(spki) {
        let me = new this();
        let privateKeyObj = AsnParser.parse(spki.keysData, PrivateKeyData);
        me.algorithm = me.getAlgorithNameFromASN1(uint8tohex(new Uint8Array(spki.algIdent)));
        me.privKey = new Uint8Array(privateKeyObj.privateKey);
        return me;
    }
    getAlgorithNameFromASN1(alg) {
        let algEncodings = {};
        for (const property in this.algorithmASNList) {
            algEncodings[this.algorithmASNList[property]] = property;
        }
        if (algEncodings.hasOwnProperty(alg)) {
            return algEncodings[alg];
        }
        else {
            let m = "Unknown algorithm.";
            console.error(m);
            throw new Error(m);
        }
    }
    static privateFromPEM(pem) {
        const receiverPrivUint8 = base64ToUint8array(pem);
        let privateKeyObj = AsnParser.parse(uint8toBuffer(receiverPrivUint8), PrivateKeyInfo);
        return KeyPair.privateFromKeyInfo(privateKeyObj);
    }
    static publicFromPEM(pem) {
        const pubUint8 = base64ToUint8array(pem);
        let publicKeyObj = AsnParser.parse(uint8toBuffer(pubUint8), PublicKeyInfoValue);
        return KeyPair.publicFromUint(new Uint8Array(publicKeyObj.publicKey));
    }
    static async generateKeyAsync() {
        const keyPair = await crypto.subtle.generateKey({
            name: 'AES-GCM',
            length: 256
        }, true, ['encrypt']);
        let hex = ['0x'];
        const exported = await crypto.subtle.exportKey("raw", keyPair);
        (new Uint8Array(exported)).forEach(i => {
            var h = i.toString(16);
            if (h.length % 2) {
                h = '0' + h;
            }
            hex.push(h);
        });
        return this.privateFromBigInt(BigInt(hex.join('')) % CURVE_SECP256k1.n);
    }
    static createKeys() {
        return this.privateFromBigInt(BigInt('0x' + uint8tohex(crypto.getRandomValues(new Uint8Array(32)))) % CURVE_SECP256k1.n);
    }
    getPublicKeyAsHexStr() {
        if (this.pubKey) {
            return uint8tohex(this.pubKey);
        }
        else {
            if (CURVES.hasOwnProperty(this.algorithm) && EC_CURVES_SUBTLE.hasOwnProperty(this.algorithm)) {
                let curve = new EC.ec(this.algorithm);
                let key = curve.keyFromPrivate(this.getPrivateAsHexString(), 'hex');
                return key.getPublic('hex').toString();
            }
            else {
                let m = 'Private -> Public key not implemented for that aglorighm - "' + this.algorithm + '"';
                console.log(m);
                throw new Error(m);
            }
        }
    }
    getAsnDerPublic() {
        var pubPoint = this.getPublicKeyAsHexStr();
        let pubPointTypeDescrDER = '';
        if (!this.algorithm) {
            pubPointTypeDescrDER = this.algorithmASNList[DEFAULT_ALGORITHM];
        }
        else if (!this.algorithmASNList.hasOwnProperty(this.algorithm)) {
            let m = 'Fatal Error. Algorithm not implemented yet - ' + this.algorithm;
            console.log(m);
            throw new Error(m);
        }
        else {
            pubPointTypeDescrDER = this.algorithmASNList[this.algorithm];
        }
        return Asn1Der.encode('SEQUENCE_30', pubPointTypeDescrDER +
            Asn1Der.encode('BIT_STRING', pubPoint));
    }
    getAddress() {
        var pubPoint = this.getPublicKeyAsHexStr();
        pubPoint = pubPoint.substr(2);
        let hash = sha3.keccak256(hexStringToArray(pubPoint));
        return "0x" + hash.substr(-40).toUpperCase();
    }
    signBytes(bytes) {
        let ecKey = ec.keyFromPrivate(this.getPrivateAsHexString(), 'hex');
        let encodingHash = sha3.keccak256(bytes);
        let signature = ecKey.sign(encodingHash);
        return signature.toDER('hex');
    }
    signStringWithEthereum(message) {
        let ecKey = ec.keyFromPrivate(this.getPrivateAsHexString(), 'hex');
        let finalMsg = this.ethereumPrefix + message.length + message;
        let encodingHash = sha3.keccak256(stringToArray(finalMsg));
        let signature = ecKey.sign(encodingHash);
        return signature.toDER('hex');
    }
    signHexStringWithEthereum(message) {
        return this.signStringWithEthereum('0x' + message);
    }
    signBytesWithEthereum(bytes) {
        let message = '0x' + uint8tohex(new Uint8Array(bytes));
        return this.signStringWithEthereum(message);
    }
    signDeterministicSHA256(bytes) {
        let sha256 = Array.from(ethers.utils.arrayify(ethers.utils.sha256(bytes)));
        return this.signBytes(sha256);
    }
    verifyDeterministicSHA256(bytes, signature) {
        let sha256 = ethers.utils.sha256(bytes).substr(2);
        let key, sign;
        if (CURVES.hasOwnProperty(this.algorithm) && EC_CURVES_SUBTLE.hasOwnProperty(this.algorithm)) {
            let curve = new EC.ec(this.algorithm);
            key = curve.keyFromPublic(this.getPublicKeyAsHexStr(), 'hex');
        }
        else {
            let m = 'Elliptic.js curve not implemented for that aglorighm - "' + this.algorithm + '"';
            console.log(m);
            throw new Error(m);
        }
        if (signature.length == 128 || signature.length == 130) {
            var m = signature.match(/([a-f\d]{64})/gi);
            sign = {
                r: m[0],
                s: m[1]
            };
        }
        else {
            let signatureAsn1 = AsnParser.parse(uint8toBuffer(hexStringToUint8(signature)), Signature);
            sign = {
                r: BigInt(signatureAsn1.r).toString(16).padStart(64, '0'),
                s: BigInt(signatureAsn1.s).toString(16).padStart(64, '0')
            };
        }
        return key.verify(sha256, sign);
    }
    verifyHexStringWithEthereum(message, signature) {
        let finalMsg = '0x' + message;
        let encodingHash = sha3.keccak256(stringToArray(this.ethereumPrefix + finalMsg.length + finalMsg));
        let ecKey = ec.keyFromPublic(this.getPublicKeyAsHexStr(), 'hex');
        var m = signature.match(/([a-f\d]{64})/gi);
        let sign = {
            r: m[0],
            s: m[1]
        };
        return ecKey.verify(encodingHash, sign);
    }
    signRawBytesWithEthereum(bytes) {
        let encodingHash = sha3.keccak256(bytes);
        let ecKey = ec.keyFromPrivate(this.getPrivateAsHexString(), 'hex');
        return uint8tohex(Uint8Array.from(ecKey.sign(encodingHash).toDER()));
    }
    verifyBytesWithEthereum(bytes, signature) {
        if (!signature || !bytes || !bytes.length) {
            throw new Error('Missing data to verify');
        }
        let encodingHash = hexStringToArray(ethers.utils.keccak256(bytes));
        let ecKey = ec.keyFromPublic(this.getPublicKeyAsHexStr(), 'hex');
        signature = uint8tohex(KeyPair.anySignatureToRawUint8(signature));
        var m = signature.match(/([a-f\d]{64})/gi);
        let sign = {
            r: m[0],
            s: m[1]
        };
        return ecKey.verify(encodingHash, sign);
    }
    getJWTParams() {
        let curve = EC_CURVES_SUBTLE[this.algorithm];
        if (!curve) {
            let m = `Cant create subtleCrypto key for curve '${this.algorithm}'`;
            console.error(m);
            throw new Error(m);
        }
        let pub = this.getPublicKeyAsHexStr();
        return {
            crv: curve,
            d: uint8arrayToBase64(this.getPrivateAsUint8()),
            key_ops: ["sign"],
            kty: "EC",
            x: uint8arrayToBase64(hexStringToUint8(pub.substr(2, 64))),
            y: uint8arrayToBase64(hexStringToUint8(pub.substr(66, 64)))
        };
    }
    getSubtlePrivateKey() {
        let curve = EC_CURVES_SUBTLE[this.algorithm];
        return subtle.importKey("jwk", this.getJWTParams(), {
            name: "ECDSA",
            namedCurve: curve
        }, true, ["sign"]);
    }
    getSubtlePublicKey() {
        let curve = EC_CURVES_SUBTLE[this.algorithm];
        let params = this.getJWTParams();
        delete params.d;
        params.key_ops = ['verify'];
        return subtle.importKey("jwk", params, {
            name: "ECDSA",
            namedCurve: curve
        }, true, ["verify"]);
    }
    async signStringWithSubtle(msg) {
        return await subtle.sign({
            name: "ECDSA",
            hash: { name: "SHA-256" },
        }, await this.getSubtlePrivateKey(), Uint8Array.from(stringToArray(msg)));
    }
    async verifyStringWithSubtle(signature, msg) {
        return await subtle.verify({
            name: "ECDSA",
            hash: { name: "SHA-256" },
        }, await this.getSubtlePublicKey(), signature, Uint8Array.from(stringToArray(msg)));
    }
    async verifyStringWithSubtleDerSignature(signature, msg) {
        let signatureAsn1 = AsnParser.parse(uint8toBuffer(signature), Signature);
        const javaSignatureHexRaw = BigInt(signatureAsn1.r).toString(16).padStart(64, '0') + BigInt(signatureAsn1.s).toString(16).padStart(64, '0');
        return this.verifyStringWithSubtle(hexStringToUint8(javaSignatureHexRaw), msg);
    }
    static anySignatureToRawUint8(derSignature) {
        let signatureUint8;
        if (typeof derSignature == "string") {
            signatureUint8 = hexStringToUint8(derSignature);
        }
        else {
            signatureUint8 = derSignature;
        }
        if (!signatureUint8 || !signatureUint8.length) {
            throw new Error('Empty signature received');
        }
        let output;
        switch (signatureUint8.length) {
            case 64:
                output = signatureUint8;
                break;
            case 65:
                output = signatureUint8.slice(0, 64);
                break;
            case 70:
            case 71:
            case 72:
                let signatureAsn1 = AsnParser.parse(uint8toBuffer(signatureUint8), Signature);
                output = hexStringToUint8(BigInt(signatureAsn1.r).toString(16).padStart(64, '0') +
                    BigInt(signatureAsn1.s).toString(16).padStart(64, '0'));
                break;
            default:
                let m = 'wrong Signature: ' + uint8tohex(signatureUint8);
                throw new Error(m);
        }
        return output;
    }
}
