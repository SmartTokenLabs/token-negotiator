import { UnpredictableNumberBundle } from "./UnpredictableNumberBundle";
export declare const DEFAULT_VALIDITY_IN_MS: bigint;
export declare const BYTES_IN_UN: number;
export declare const BYTES_IN_SEED: number;
export declare class UnpredictableNumberTool {
    private readonly _domain;
    private readonly validityInMs;
    private readonly key;
    constructor(key: Uint8Array, domain: string, validityInMs: bigint);
    get domain(): string;
    get unpredictableNumberBundle(): UnpredictableNumberBundle;
    private getUnpredictableNumber;
    validateUnpredictableNumber(un: string, randomness: Uint8Array, expirationInMs: bigint): boolean;
}
