export declare class UnpredictableNumberBundle {
    private _number;
    private _randomness;
    private _domain;
    private _expiration;
    constructor(number: string, randomness: Uint8Array, domain: string, expiration: bigint);
    get number(): string;
    set number(value: string);
    get randomness(): Uint8Array;
    set randomness(value: Uint8Array);
    get domain(): string;
    set domain(value: string);
    get expiration(): bigint;
    set expiration(value: bigint);
}
