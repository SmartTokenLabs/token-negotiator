export default class AlgorithmIdentifier {
    constructor(source?: {});
    static defaultValues(memberName: any): any;
    static compareWithDefault(memberName: any, memberValue: any): boolean;
    static schema(parameters?: {}): any;
    fromSchema(schema: any): void;
    toSchema(): any;
    toJSON(): {
        algorithmId: any;
    };
    isEqual(algorithmIdentifier: any): boolean;
}
