import { Any, compareSchema, ObjectIdentifier, Sequence } from "asn1js";
import { getParametersValue, clearProps } from "pvutils";
var AlgorithmIdentifier = (function () {
    function AlgorithmIdentifier(source) {
        if (source === void 0) { source = {}; }
        if (typeof (source) == "string") {
            throw new TypeError("Unimplemented: Not accepting string yet.");
        }
        if (source instanceof ArrayBuffer) {
            var asn1 = fromBER(source);
            this.fromSchema(asn1.result);
        }
        else {
            this.algorithmId = getParametersValue(source, "algorithmId");
            if ("algorithmParams" in source)
                this.algorithmParams = getParametersValue(source, "algorithmParams", AlgorithmIdentifier.defaultValues("algorithmParams"));
        }
    }
    AlgorithmIdentifier.defaultValues = function (memberName) {
        switch (memberName) {
            case "algorithmParams":
                return new Any();
            default:
                throw new Error("Invalid member name for AlgorithmIdentifier class: " + memberName);
        }
    };
    AlgorithmIdentifier.compareWithDefault = function (memberName, memberValue) {
        switch (memberName) {
            case "algorithmId":
                return memberValue === "";
            case "algorithmParams":
                return memberValue instanceof asn1js.Any;
            default:
                throw new Error("Invalid member name for AlgorithmIdentifier class: " + memberName);
        }
    };
    AlgorithmIdentifier.schema = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        var names = getParametersValue(parameters, "names", {});
        return new Sequence({
            name: names.blockName || "",
            optional: names.optional || false,
            value: [
                new ObjectIdentifier({ name: names.algorithmIdentifier || "algorithm" }),
                new Any({ name: names.algorithmParams || "parameters", optional: true }),
            ],
        });
    };
    AlgorithmIdentifier.prototype.fromSchema = function (schema) {
        clearProps(schema, ["algorithm", "params"]);
        var asn1 = compareSchema(schema, schema, AlgorithmIdentifier.schema({
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
    };
    AlgorithmIdentifier.prototype.toSchema = function () {
        var outputArray = [];
        outputArray.push(new ObjectIdentifier({ value: this.algorithmId }));
        if ("algorithmParams" in this &&
            this.algorithmParams instanceof asn1js.Any === false)
            outputArray.push(this.algorithmParams);
        return new Sequence({
            value: outputArray,
        });
    };
    AlgorithmIdentifier.prototype.toJSON = function () {
        var object = {
            algorithmId: this.algorithmId,
        };
        if ("algorithmParams" in this &&
            this.algorithmParams instanceof asn1js.Any === false)
            object.algorithmParams = this.algorithmParams.toJSON();
        return object;
    };
    AlgorithmIdentifier.prototype.isEqual = function (algorithmIdentifier) {
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
    };
    return AlgorithmIdentifier;
}());
export default AlgorithmIdentifier;
//# sourceMappingURL=AlgorithmIdentifier.js.map