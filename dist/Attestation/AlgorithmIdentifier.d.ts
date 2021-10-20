export default class AlgorithmIdentifier {
    static defaultValues(memberName: string): Any;
    static compareWithDefault(memberName: string, memberValue: any): boolean;
    static schema(parameters?: Object): Object;
    constructor(source?: {
        schema?: Object | undefined;
    } | undefined);
    algorithmId: string;
    algorithmParams: Object;
    fromSchema(schema: Object): void;
    toSchema(): Object;
    toJSON(): Object;
    isEqual(algorithmIdentifier: AlgorithmIdentifier): boolean;
}
import { Any } from "asn1js";
