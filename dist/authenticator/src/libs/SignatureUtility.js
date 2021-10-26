import { hexStringToArray, hexStringToUint8 } from "./utils";
import { ethers } from "ethers";
import { _TypedDataEncoder, recoverPublicKey } from "ethers/lib/utils";
let EC = require("elliptic");
let ec = new EC.ec('secp256k1');
let sha3 = require("js-sha3");
export class SignatureUtility {
    static sign(str, keys) {
        let ecKey = ec.keyFromPrivate(keys.getPrivateAsHexString(), 'hex');
        let encodingHash = sha3.keccak256(hexStringToArray(str));
        let signature = ecKey.sign(encodingHash);
        return signature.toDER('hex');
    }
    static verify(str, signature, keys) {
        return SignatureUtility.verifyArrayBuf(hexStringToArray(str), signature, keys);
    }
    static verifyArrayBuf(arr, signature, keys) {
        let ecKey = ec.keyFromPublic(keys.getPublicKeyAsHexStr(), 'hex');
        let encodingHash = sha3.keccak256(arr);
        return ecKey.verify(encodingHash, signature);
    }
    static async signMessageWithBrowserWallet(message) {
        await SignatureUtility.connectMetamaskAndGetAddress();
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        return await signer.signMessage(message);
    }
    static async recoverPublicKeyFromMessageSignature(message, signature) {
        const msgHash = ethers.utils.hashMessage(message);
        const digest = ethers.utils.arrayify(msgHash);
        return await ethers.utils.recoverPublicKey(digest, signature);
    }
    static recoverPublicKeyFromTypedMessageSignature(messageObj, signature) {
        let messageAsPrefixedHexString, pubKey;
        try {
            let rawPayload = messageObj.message.payload;
            messageObj.message.payload = ethers.utils.id(rawPayload).substr(2);
            let types = messageObj.types;
            delete types.EIP712Domain;
            messageAsPrefixedHexString = _TypedDataEncoder.hash(messageObj.domain, types, messageObj.message);
            messageObj.message.payload = rawPayload;
        }
        catch (e) {
            const m = 'Cant sign data, possibly wrong format. ' + e;
            throw new Error(m);
        }
        try {
            pubKey = recoverPublicKey(hexStringToUint8(messageAsPrefixedHexString.substr(2)), signature);
        }
        catch (e) {
            const m = 'Cant recoverPublicKey. ' + e;
            throw new Error(m);
        }
        return pubKey;
    }
    static async signEIP712WithBrowserWallet(webDomain, userDataValues, userDataTypes, primaryName, userKey = null) {
        try {
            let userAddress;
            let signer;
            if (userKey) {
                signer = new ethers.Wallet('0x' + userKey.getPrivateAsHexString());
            }
            else {
                let provider = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
            }
            if (!signer)
                throw new Error("Active Wallet required");
            let Eip712Data = SignatureUtility.Eip712Data;
            const domainData = {
                name: webDomain,
                version: Eip712Data['PROTOCOL_VERSION']
            };
            const dataTypes = {};
            dataTypes[primaryName] = userDataTypes;
            let userDataValuesWithHashedPayload = Object.assign({}, userDataValues);
            userDataValuesWithHashedPayload.payload = sha3.keccak256(userDataValuesWithHashedPayload.payload);
            let signature = await signer._signTypedData(domainData, dataTypes, userDataValuesWithHashedPayload);
            let completeData = {
                types: {
                    EIP712Domain: SignatureUtility.Eip712domainTypes,
                },
                primaryType: primaryName,
                message: userDataValues,
                domain: domainData,
            };
            completeData.types[primaryName] = dataTypes[primaryName];
            let dataStringified = JSON.stringify(completeData);
            let externalAuthenticationData = {
                signatureInHex: signature,
                jsonSigned: dataStringified
            };
            return JSON.stringify(externalAuthenticationData);
        }
        catch (e) {
            console.error('Cant sign eip712 data. Error: ' + e);
            return '';
        }
    }
    static async connectMetamaskAndGetAddress() {
        if (!window.ethereum) {
            throw new Error('Please install metamask before.');
        }
        const userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (!userAddresses || !userAddresses.length) {
            throw new Error("Active Wallet required");
        }
        return userAddresses[0];
    }
    static getChainIdFromSignature(signature) {
        let recoveryByte = Number("0x" + signature.substr(-2));
        if (recoveryByte == 27 || recoveryByte == 28) {
            return 0;
        }
        return (recoveryByte - 35) >> 1;
    }
}
SignatureUtility.OID_ECDSA_PUBLICKEY = "1.2.840.10045.2.1";
SignatureUtility.Eip712Data = {
    PROTOCOL_VERSION: "0.1",
};
SignatureUtility.Eip712domainTypes = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
];
