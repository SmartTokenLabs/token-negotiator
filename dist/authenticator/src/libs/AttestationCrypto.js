import { ATTESTATION_TYPE } from "./interfaces";
import { Point, CURVE_BN256 } from "./Point";
import { mod, uint8merge, stringToArray, BnPowMod, bnToUint8, uint8ToBn } from "./utils";
import { FullProofOfExponent } from "./FullProofOfExponent";
const crypto = require('crypto');
let sha3 = require("js-sha3");
export const Pedestren_G = new Point(21282764439311451829394129092047993080259557426320933158672611067687630484067n, 3813889942691430704369624600187664845713336792511424430006907067499686345744n, CURVE_BN256);
export const Pedestren_H = new Point(10844896013696871595893151490650636250667003995871483372134187278207473369077n, 9393217696329481319187854592386054938412168121447413803797200472841959383227n, CURVE_BN256);
export class AttestationCrypto {
    constructor() {
        this.curveOrderBitLength = 254n;
        this.rand = this.makeSecret();
        if (!this.verifyCurveOrder(CURVE_BN256.n)) {
            throw new Error("Static values do not work with current implementation");
        }
    }
    verifyCurveOrder(curveOrder) {
        let curveOrderBitLength = BigInt(curveOrder.toString(2).length);
        if (curveOrder < (1n << (curveOrderBitLength - 1n)) || (curveOrder >> curveOrderBitLength) > 0n) {
            console.log("Curve order is not 253 bits which is required by the current implementation");
            return false;
        }
        return true;
    }
    getType(type) {
        switch (type.toLowerCase()) {
            case "mail":
                return ATTESTATION_TYPE.mail;
            case "phone":
                return ATTESTATION_TYPE.phone;
            default:
                throw new Error("Wrong type of identifier");
        }
    }
    makeCommitment(identifier, type, secret) {
        let hashedIdentifier = this.mapToCurveMultiplier(type, identifier);
        let commitment = Pedestren_G.multiplyDA(hashedIdentifier).add(Pedestren_H.multiplyDA(secret));
        return commitment.getEncoded(false);
    }
    makeCommitmentFromHiding(identifier, type, hiding) {
        let hashedIdentifier = this.mapToCurveMultiplier(type, identifier);
        let commitment = Pedestren_G.multiplyDA(hashedIdentifier).add(hiding);
        return commitment.getEncoded(false);
    }
    injectIdentifierType(type, arr) {
        return uint8merge([Uint8Array.from([0, 0, 0, type]), arr]);
    }
    mapToInteger(arr) {
        return BigInt('0x' + sha3.keccak256(arr)) >> (256n - this.curveOrderBitLength);
    }
    mapToCurveMultiplier(type, identifier) {
        let identifierBytes = Uint8Array.from(stringToArray(identifier.trim().toLowerCase()));
        let uintArr = this.injectIdentifierType(type, identifierBytes);
        let sampledVal = uint8ToBn(uintArr);
        do {
            sampledVal = this.mapToInteger(bnToUint8(sampledVal));
        } while (sampledVal >= CURVE_BN256.n);
        return sampledVal;
    }
    computePoint_bn256(x) {
        let fieldSize = CURVE_BN256.P;
        x = mod(x, fieldSize);
        let y = 0n, ySquare = 0n;
        let resPoint, referencePoint;
        let quadraticResidue;
        let magicExp = (fieldSize + 1n) >> 2n;
        let quadraticResidueExp = (fieldSize - 1n) >> 1n;
        do {
            do {
                x = mod(x + 1n);
                ySquare = mod(BnPowMod(x, 3n, fieldSize) + CURVE_BN256.A * x + CURVE_BN256.B);
                quadraticResidue = BnPowMod(ySquare, quadraticResidueExp, fieldSize);
            } while (quadraticResidue !== 1n);
            y = BnPowMod(ySquare, magicExp, fieldSize);
            resPoint = new Point(x, y, CURVE_BN256);
            if (resPoint.x > (fieldSize >> 1n)) {
                resPoint = new Point(x, fieldSize - y, CURVE_BN256);
            }
            referencePoint = resPoint.multiplyDA(CURVE_BN256.n - 1n);
            if (referencePoint.y > (fieldSize >> 1n)) {
                referencePoint = new Point(referencePoint.x, fieldSize - referencePoint.y, CURVE_BN256);
            }
        } while (!resPoint.equals(referencePoint) || resPoint.isInfinity());
        return resPoint;
    }
    makeSecret(bytes = 48) {
        return mod(BigInt(AttestationCrypto.generateRandomHexString(bytes)), CURVE_BN256.n);
    }
    static generateRandomHexString(len) {
        var array = new Uint8Array(len);
        if (window && window.crypto) {
            window.crypto.getRandomValues(array);
        }
        else {
            array = new Uint8Array(crypto.randomBytes(len));
        }
        let output = '0x';
        for (var i = 0; i < array.length; i++) {
            output += array[i].toString(16).padStart(2, '0');
        }
        return output;
    }
    computeAttestationProof(randomness, nonce = new Uint8Array([])) {
        let riddle = Pedestren_H.multiplyDA(randomness);
        let challengeList = [Pedestren_H, riddle];
        return this.constructSchnorrPOK(riddle, randomness, challengeList, nonce);
    }
    computeEqualityProof(commitment1, commitment2, randomness1, randomness2, nonce = new Uint8Array([])) {
        let comPoint1 = Point.decodeFromHex(commitment1, CURVE_BN256);
        let comPoint2 = Point.decodeFromHex(commitment2, CURVE_BN256);
        let riddle = comPoint1.subtract(comPoint2);
        let exponent = mod(randomness1 - randomness2, CURVE_BN256.n);
        let challengeList = [Pedestren_H, comPoint1, comPoint2];
        return this.constructSchnorrPOK(riddle, exponent, challengeList, nonce).getUsageProofOfExponent();
    }
    constructSchnorrPOK(riddle, exponent, challengePoints, nonce) {
        let t;
        let hiding, c, d;
        do {
            hiding = this.makeSecret();
            t = Pedestren_H.multiplyDA(hiding);
            c = this.computeChallenge(t, challengePoints, nonce);
        } while (c >= CURVE_BN256.n);
        d = mod(hiding + c * exponent, CURVE_BN256.n);
        return FullProofOfExponent.fromData(riddle, t, d, nonce);
    }
    computeChallenge(t, challengeList, nonce) {
        let finalChallengeList = challengeList.concat(t);
        let challengePointBytes = this.makeArray(finalChallengeList);
        let challengeBytes = uint8merge([challengePointBytes, nonce]);
        return this.mapToInteger(challengeBytes);
    }
    verifyFullProof(pok) {
        let c = this.computeChallenge(pok.getPoint(), [Pedestren_H, pok.getRiddle()], pok.getNonce());
        return this.verifyPok(pok, c);
    }
    verifyEqualityProof(commitment1, commitment2, pok) {
        let comPoint1 = Point.decodeFromUint8(commitment1, CURVE_BN256);
        let comPoint2 = Point.decodeFromUint8(commitment2, CURVE_BN256);
        let riddle = comPoint1.subtract(comPoint2);
        let c = this.computeChallenge(pok.getPoint(), [Pedestren_H, comPoint1, comPoint2], pok.getNonce());
        return this.verifyPok(FullProofOfExponent.fromData(riddle, pok.getPoint(), pok.getChallenge(), pok.getNonce()), c);
    }
    verifyPok(pok, c) {
        if (c >= CURVE_BN256.n) {
            return false;
        }
        let lhs = Pedestren_H.multiplyDA(pok.getChallenge());
        let rhs = pok.getRiddle().multiplyDA(c).add(pok.getPoint());
        return lhs.equals(rhs);
    }
    makeArray(pointArray) {
        let output = new Uint8Array(0);
        pointArray.forEach((item) => {
            output = new Uint8Array([...output, ...item.getEncoded(false)]);
        });
        return output;
    }
    static hashWithKeccak(data) {
        return sha3.keccak256(data);
    }
}
AttestationCrypto.OID_SIGNATURE_ALG = "1.2.840.10045.2.1";
AttestationCrypto.BYTES_IN_DIGEST = 256 / 8;
