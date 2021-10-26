import { getInt64Bytes, hashStringTo32bytesUint8, stringToArray, uint8merge, uint8ToBn, uint8tohex, uint8toString } from "./utils";
import { SignatureUtility } from "./SignatureUtility";
import { ValidationTools } from "./ValidationTools";
import { Timestamp } from "./Timestamp";
export class Nonce {
    constructor() {
        this.DEFAULT_NONCE_TIME_LIMIT_MS = 1000 * 60 * 20;
    }
    static async makeNonce(senderAddress = '', receiverIdentifier, otherData = new Uint8Array(0), timestampInMs = 0) {
        if (!senderAddress) {
            senderAddress = await SignatureUtility.connectMetamaskAndGetAddress();
        }
        if (!ValidationTools.isAddress(senderAddress)) {
            throw new Error("Address is not valid");
        }
        senderAddress = senderAddress.toUpperCase();
        if (!timestampInMs) {
            timestampInMs = Date.now();
        }
        return uint8merge([
            Uint8Array.from(stringToArray(senderAddress)),
            hashStringTo32bytesUint8(receiverIdentifier),
            getInt64Bytes(timestampInMs),
            otherData
        ]);
    }
    validateNonce(nonce, senderAddress, receiverIdentifier, minTime, maxTime, otherData = new Uint8Array(0)) {
        if (!Nonce.validateAddress(nonce, senderAddress)) {
            console.log('validateAddress check failed for ' + senderAddress);
            return false;
        }
        if (!this.validateReceiverIdentifier(nonce, receiverIdentifier)) {
            console.log('validateReceiverIdentifier check failed');
            return false;
        }
        if (!this.validateTimestamp(nonce, minTime, maxTime)) {
            console.log('timestamp check failed');
            return false;
        }
        if (!this.validateOtherData(nonce, otherData)) {
            console.log('otherData check failed');
            return false;
        }
        return this.validateOtherData(nonce, otherData);
    }
    validateTimestamp(nonce, minTime, maxTime) {
        let nonceTimeStamp = Nonce.getTimestamp(nonce);
        let nonceStamp = new Timestamp(nonceTimeStamp);
        nonceStamp.setValidity(maxTime - minTime);
        return nonceStamp.validateAgainstExpiration(maxTime);
    }
    static validateAddress(nonce, address) {
        let nonceAddress = uint8toString(nonce.slice(Nonce.senderAddressIndexStart, Nonce.senderAddressIndexStop));
        if (address.toUpperCase() === nonceAddress.toUpperCase())
            return true;
        console.log('nonceAddress = ' + nonceAddress);
        return false;
    }
    validateReceiverIdentifier(nonce, receiverIdentifier) {
        if (uint8tohex(hashStringTo32bytesUint8(receiverIdentifier)).toLowerCase() === uint8tohex(nonce.slice(Nonce.receiverIdentifierIndexStart, Nonce.receiverIdentifierIndexStop)).toLowerCase())
            return true;
        return false;
    }
    validateOtherData(nonce, otherData) {
        if (uint8tohex(otherData).toLowerCase() === uint8tohex(nonce.slice(Nonce.otherDataIndexStart, Nonce.otherDataIndexStart + otherData.length)).toLowerCase())
            return true;
        return false;
    }
    static getTimestamp(nonce) {
        let time = nonce.slice(Nonce.timestampIndexStart, Nonce.timestampIndexStop);
        let bn = uint8ToBn(time);
        if (bn > BigInt(Number.MAX_SAFE_INTEGER))
            throw new Error('timestamp value bigger than MAX_SAFE_INTEGER');
        return Number(bn);
    }
}
Nonce.LONG_BYTES = 8;
Nonce.senderAddressIndexStart = 0;
Nonce.senderAddressIndexStop = ValidationTools.ADDRESS_LENGTH_IN_BYTES;
Nonce.receiverIdentifierIndexStart = Nonce.senderAddressIndexStop;
Nonce.receiverIdentifierIndexStop = Nonce.receiverIdentifierIndexStart + 256 / 8;
Nonce.timestampIndexStart = Nonce.receiverIdentifierIndexStop;
Nonce.timestampIndexStop = Nonce.timestampIndexStart + Nonce.LONG_BYTES;
Nonce.otherDataIndexStart = Nonce.timestampIndexStop;
