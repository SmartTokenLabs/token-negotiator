import { AsnPropTypes } from "@peculiar/asn1-schema";
export declare class AlgorithmIdentifierASN {
    algorithm: string;
    parameters?: AsnPropTypes.Any;
}
export declare class Version {
    version: number;
}
declare class Time {
    utcTime?: AsnPropTypes.UTCTime;
    generalizedTime?: Date;
}
export declare class ValidityValue {
    notBefore: Time;
    notAfter: Time;
}
export declare class Extension {
    extnId: string;
    critical: boolean;
    extnValue: Uint8Array;
}
export declare class Extensions {
    extension: Extension;
}
export {};
