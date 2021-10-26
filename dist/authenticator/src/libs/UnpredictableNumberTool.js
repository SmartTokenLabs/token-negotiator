import { bnToUint8, isDomainValid, uint8arrayToBase64 } from "./utils";
import { UnpredictableNumberBundle } from "./UnpredictableNumberBundle";
const { TextEncoder } = require('util');
export const DEFAULT_VALIDITY_IN_MS = BigInt(3600 * 1000);
export const BYTES_IN_UN = 8;
export const BYTES_IN_SEED = 32;
export class UnpredictableNumberTool {
    constructor(key, domain, validityInMs) {
        if (!isDomainValid(domain)) {
            throw Error('Domain is not a valid domain');
        }
        this.key = key;
        this._domain = domain;
        this.validityInMs = validityInMs;
    }
    get domain() {
        return this._domain;
    }
    get unpredictableNumberBundle() {
        const expiration = BigInt(new Date().getUTCMilliseconds()) + this.validityInMs;
        const randomness = require('secure-random').randomUint8Array(BYTES_IN_SEED);
        let unpredictableNumber = this.getUnpredictableNumber(randomness, expiration);
        return new UnpredictableNumberBundle(unpredictableNumber, randomness, this._domain, expiration);
    }
    getUnpredictableNumber(randomness, expirationInMs) {
        const hmac = require('crypto').createHmac('sha3-256', this.key);
        hmac.update(bnToUint8(expirationInMs));
        hmac.update(randomness);
        hmac.update(new TextEncoder().encode(this._domain));
        const digest = hmac.digest();
        const result = digest.slice(0, BYTES_IN_UN);
        return uint8arrayToBase64(result);
    }
    validateUnpredictableNumber(un, randomness, expirationInMs) {
        if (new Date().getUTCMilliseconds() > expirationInMs) {
            console.error('Unpredictable number has expired');
            return false;
        }
        const expectedNumber = this.getUnpredictableNumber(randomness, expirationInMs);
        if (expectedNumber !== un) {
            console.error('The unpredictable number is computed incorrectly. Either wrong key or wrong domain');
            return false;
        }
        return true;
    }
}
