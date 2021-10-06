import { Any, compareSchema, ObjectIdentifier, Sequence } from "asn1js";
import { getParametersValue, clearProps } from "pvutils";
export default class AlgorithmIdentifier {
    constructor(source = {}) {
        if (typeof (source) == "string") {
            throw new TypeError("Unimplemented: Not accepting string yet.");
        }
        if (source instanceof ArrayBuffer) {
            const asn1 = fromBER(source);
            this.fromSchema(asn1.result);
        }
        else {
            this.algorithmId = getParametersValue(source, "algorithmId");
            if ("algorithmParams" in source)
                this.algorithmParams = getParametersValue(source, "algorithmParams", AlgorithmIdentifier.defaultValues("algorithmParams"));
        }
    }
    static defaultValues(memberName) {
        switch (memberName) {
            case "algorithmParams":
                return new Any();
            default:
                throw new Error(`Invalid member name for AlgorithmIdentifier class: ${memberName}`);
        }
    }
    static compareWithDefault(memberName, memberValue) {
        switch (memberName) {
            case "algorithmId":
                return memberValue === "";
            case "algorithmParams":
                return memberValue instanceof asn1js.Any;
            default:
                throw new Error(`Invalid member name for AlgorithmIdentifier class: ${memberName}`);
        }
    }
    static schema(parameters = {}) {
        const names = getParametersValue(parameters, "names", {});
        return new Sequence({
            name: names.blockName || "",
            optional: names.optional || false,
            value: [
                new ObjectIdentifier({ name: names.algorithmIdentifier || "algorithm" }),
                new Any({ name: names.algorithmParams || "parameters", optional: true }),
            ],
        });
    }
    fromSchema(schema) {
        clearProps(schema, ["algorithm", "params"]);
        const asn1 = compareSchema(schema, schema, AlgorithmIdentifier.schema({
            names: {
                algorithmIdentifier: "algorithm",
                algorithmParams: "params",
            },
        }));
        if (asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for AlgorithmIdentifier");
        this.algorithmId = asn1.result.algorithm.valueBlock.toString();
        if ("params" in asn1.result)
            this.algorithmParams = asn1.result.params;
    }
    toSchema() {
        const outputArray = [];
        outputArray.push(new ObjectIdentifier({ value: this.algorithmId }));
        if ("algorithmParams" in this &&
            this.algorithmParams instanceof asn1js.Any === false)
            outputArray.push(this.algorithmParams);
        return new Sequence({
            value: outputArray,
        });
    }
    toJSON() {
        const object = {
            algorithmId: this.algorithmId,
        };
        if ("algorithmParams" in this &&
            this.algorithmParams instanceof asn1js.Any === false)
            object.algorithmParams = this.algorithmParams.toJSON();
        return object;
    }
    isEqual(algorithmIdentifier) {
        if (algorithmIdentifier instanceof AlgorithmIdentifier === false)
            return false;
        if (this.algorithmId !== algorithmIdentifier.algorithmId)
            return false;
        if ("algorithmParams" in this) {
            if ("algorithmParams" in algorithmIdentifier)
                return (JSON.stringify(this.algorithmParams) ===
                    JSON.stringify(algorithmIdentifier.algorithmParams));
            return false;
        }
        if ("algorithmParams" in algorithmIdentifier)
            return false;
        return true;
    }
}
