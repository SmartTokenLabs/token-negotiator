import { KeyPair } from "./KeyPair";
import { Attestable } from "./Attestable";
export declare class Cheque implements Attestable {
    private commitment;
    encoded: string;
    private identifier;
    private type;
    private amount;
    private validity;
    private keys;
    private secret;
    private notValidBefore;
    private notValidAfter;
    private signature;
    constructor();
    static fromData(commitment: Uint8Array, amount: number, notValidBefore: number, notValidAfter: number, signature: Uint8Array, keys: KeyPair): Cheque;
    static createAndVerify(identifier: string, type: string, amount: number, validity: number, keys: KeyPair, secret: bigint): {
        cheque: string;
        chequeEncoded: string;
        derSignature: string;
        derSecret: string;
    };
    encodeSignedCheque(cheque: string, signature: string): string;
    makeCheque(): string;
    verify(): boolean;
    getDerEncoding(): string;
    checkValidity(): boolean;
    getCommitment(): Uint8Array;
}
