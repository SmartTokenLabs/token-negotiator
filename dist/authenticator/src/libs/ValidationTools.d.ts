export declare class ValidationTools {
    static ADDRESS_LENGTH_IN_BYTES: number;
    static validateTimestamp(timestamp: number, currentTime: number, timestampSlack: number): boolean;
    static isAddress(address: string): boolean;
    static isNullOrAddress(address: string): boolean;
}
