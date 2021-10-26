export declare class Nonce {
    static LONG_BYTES: number;
    DEFAULT_NONCE_TIME_LIMIT_MS: number;
    private static senderAddressIndexStart;
    private static senderAddressIndexStop;
    private static receiverIdentifierIndexStart;
    private static receiverIdentifierIndexStop;
    private static timestampIndexStart;
    private static timestampIndexStop;
    private static otherDataIndexStart;
    static makeNonce(senderAddress: string | undefined, receiverIdentifier: string, otherData?: Uint8Array, timestampInMs?: number): Promise<Uint8Array>;
    validateNonce(nonce: Uint8Array, senderAddress: string, receiverIdentifier: string, minTime: number, maxTime: number, otherData?: Uint8Array): boolean;
    validateTimestamp(nonce: Uint8Array, minTime: number, maxTime: number): boolean;
    static validateAddress(nonce: Uint8Array, address: string): boolean;
    validateReceiverIdentifier(nonce: Uint8Array, receiverIdentifier: string): boolean;
    validateOtherData(nonce: Uint8Array, otherData: Uint8Array): boolean;
    static getTimestamp(nonce: Uint8Array): number;
}
