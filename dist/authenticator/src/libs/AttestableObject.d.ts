export declare class AttestableObject {
    protected encoded: string;
    protected commitment: Uint8Array;
    constructor();
    getDerEncoding(): string;
    getCommitment(): Uint8Array;
}
