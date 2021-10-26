export declare class Timestamp {
    static TIMESTAMP_FORMAT: string;
    ALLOWED_ROUNDING: number;
    static ALLOWED_ROUNDING: number;
    static UNLIMITED: number;
    static DEFAULT_TOKEN_TIME_LIMIT: number;
    static DEFAULT_TIME_LIMIT_MS: number;
    private time;
    private validity;
    constructor(timeSinceEpochInMs?: number | string);
    fromString(timeAsString: string): void;
    getValidity(): number;
    setValidity(validity: number): void;
    getTime(): number;
    getTimeAsString(): string;
    validateTimestamp(): boolean;
    validateAgainstExpiration(expirationTimeInMs: number): boolean;
    static stringTimestampToLong(timestamp: string): number;
    protected getCurrentTime(): number;
}
