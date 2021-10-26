import { Point } from "./Point";
import { Proof } from "../asn1/shemas/ProofOfExponentASN";
import { UsageProofOfExponent } from "./UsageProofOfExponent";
export declare class FullProofOfExponent {
    private riddle;
    private tPoint;
    private challenge;
    private nonce;
    encoding: string;
    private constructor();
    static fromData(riddle: Point, tPoint: Point, challenge: bigint, nonce?: Uint8Array): FullProofOfExponent;
    static fromBytes(uint8data: Uint8Array): FullProofOfExponent;
    static fromASNType(proof: Proof): FullProofOfExponent;
    static fromBase64(base64DerEncoded: string): FullProofOfExponent;
    makeEncoding(riddle: Point, tPoint: Point, challenge: bigint, nonce?: Uint8Array): string;
    getRiddle(): Point;
    getPoint(): Point;
    getChallenge(): bigint;
    getNonce(): Uint8Array;
    getUsageProofOfExponent(): UsageProofOfExponent;
    getDerEncoding(): string;
}
