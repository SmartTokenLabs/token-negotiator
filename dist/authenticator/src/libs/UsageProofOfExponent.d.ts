import { ProofOfExponentInterface } from "./ProofOfExponentInterface";
import { Point } from "./Point";
export declare class UsageProofOfExponent implements ProofOfExponentInterface {
    private tPoint;
    private challenge;
    private encoding;
    private encodingBytes;
    private nonce;
    constructor();
    static fromData(tPoint: Point, challenge: bigint, nonce?: Uint8Array): UsageProofOfExponent;
    fromBase64(base64DerEncoded: string): void;
    fromBytes(bytes: Uint8Array): void;
    makeEncoding(tPoint: Point, challenge: bigint): string;
    getPoint(): Point;
    getChallenge(): bigint;
    getDerEncoding(): string;
    getNonce(): Uint8Array;
}
