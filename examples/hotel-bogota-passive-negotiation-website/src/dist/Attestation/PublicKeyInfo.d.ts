export default class PublicKeyInfo {
    static schema(parameters?: Object): Object;
    constructor(source?: {
        schema?: Object | undefined;
    } | undefined);
    signatureAlgorithm: string;
    publicKey: any;
    fromSchema(schema: Object): void;
}
