import { BitString, compareSchema, Sequence, fromBER, } from "asn1js";
import { getParametersValue, clearProps } from "pvutils";
import AlgorithmIdentifier from "./AlgorithmIdentifier";
var PublicKeyInfo = (function () {
    function PublicKeyInfo(source) {
        if (source === void 0) { source = {}; }
        if (typeof (source) == "string") {
            throw new TypeError("Not accepting string. For base64, convert to ArrayBuffer.");
        }
        if (source instanceof ArrayBuffer) {
            var asn1 = fromBER(source);
            this.fromSchema(asn1.result);
        }
        else {
            this.signatureAlgorithm = getParametersValue(source, "signatureAlgorithm");
            this.publicKey = getParametersValue(source, "publicKey");
        }
    }
    PublicKeyInfo.schema = function (parameters) {
        if (parameters === void 0) { parameters = {}; }
        var names = getParametersValue(parameters, "names", {});
        return new Sequence({
            name: names.blockName || "",
            optional: true,
            value: [
                AlgorithmIdentifier.schema(names.signatureAlgorithm || {
                    names: {
                        blockName: "signatureAlgorithm",
                    },
                }),
                new BitString({ name: "publicKey" }),
            ],
        });
    };
    PublicKeyInfo.prototype.fromSchema = function (schema) {
        clearProps(schema, ["signatureAlgorithm", "publicKey"]);
        var asn1 = compareSchema(schema, schema, PublicKeyInfo.schema({
            names: {
                signatureAlgorithm: "signatureAlgorithm",
                publicKey: "publicKey",
            },
        }));
        if (asn1.verified === false)
            throw new Error("Object's schema was not verified against input data for AlgorithmIdentifier");
    };
    return PublicKeyInfo;
}());
export default PublicKeyInfo;
//# sourceMappingURL=PublicKeyInfo.js.map