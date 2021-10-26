export declare class Asn1Der {
    static encodeAsInteger(value: bigint): string;
    static encodeObjectId(objectId: string): string;
    static encodeName(str: string): string;
    static encode(type: string, value: any, id?: number): string;
    decode(byteArray: Uint8Array): any;
    lenEncoded(derArr: number[]): number | undefined;
    readFromHexString(str: string): any;
    readFromUint8Array(u8: Uint8Array): any;
    readFromBase64String(base64str: string): any;
    readFromUrlBase64String(urlBase64str: string): any;
    read(derArr: number[]): any;
    BodySequence(derArr: number[]): any;
}
