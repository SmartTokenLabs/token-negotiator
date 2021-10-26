import { Point } from "./Point";
export interface keyPair {
    priv: bigint;
    pub: Point;
}
export declare const ATTESTATION_TYPE: {
    [index: string]: number;
};
