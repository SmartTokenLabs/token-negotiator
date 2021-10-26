export declare let CURVE_SECP256k1: {
    P: bigint;
    n: bigint;
    magicExp: bigint;
    A: bigint;
    B: bigint;
};
export declare let CURVES: {
    [index: string]: {
        [index: string]: bigint;
    };
};
export declare let CURVE_BN256: {
    P: bigint;
    n: bigint;
    A: bigint;
    B: bigint;
    h: bigint;
};
export declare class Point {
    x: bigint;
    y: bigint;
    useCurve: {
        [index: string]: bigint;
    };
    constructor(x: bigint, y: bigint, useCurve?: {
        [index: string]: bigint;
    });
    double(): Point;
    newZero(): Point;
    add(other: Point): Point;
    multiplyDA(n: bigint): Point;
    isInfinity(): boolean;
    getEncoded(compressed?: boolean): Uint8Array;
    equals(other: Point): boolean;
    static decodeFromHex(hex: string, useCurve?: {
        [index: string]: bigint;
    }): Point;
    static decodeFromUint8(uint: Uint8Array, useCurve?: {
        [index: string]: bigint;
    }): Point;
    validate(): boolean;
    negate(): Point;
    subtract(anotherPoint: Point): Point;
}
