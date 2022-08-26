var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { KeyStore } from "@tokenscript/attestation/dist/safe-connect/KeyStore";
import { uint8tohex } from "@tokenscript/attestation/dist/libs/utils";
import { EthereumKeyLinkingAttestation } from "@tokenscript/attestation/dist/safe-connect/EthereumKeyLinkingAttestation";
var SafeConnect = (function () {
    function SafeConnect() {
    }
    SafeConnect.getLinkPrivateKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, SafeConnect.keyStore.getOrCreateKey(SafeConnect.HOLDING_KEY_ALGORITHM)];
                    case 1:
                        keys = _a.sent();
                        return [2, keys.attestHoldingKey.privateKey];
                }
            });
        });
    };
    SafeConnect.getLinkPublicKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, SafeConnect.keyStore.getOrCreateKey(SafeConnect.HOLDING_KEY_ALGORITHM)];
                    case 1:
                        keys = _a.sent();
                        return [2, uint8tohex(keys.holdingPubKey)];
                }
            });
        });
    };
    SafeConnect.getChallenge = function (safeConnectUrl, address) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.apiRequest(safeConnectUrl, "POST", "get-challenge", { address: address })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error("Failed to get address challenge: " + e_1.message);
                    case 3: return [2];
                }
            });
        });
    };
    SafeConnect.getAttestation = function (safeConnectUrl, serverPayload) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.apiRequest(safeConnectUrl, "POST", "issue-attestation", serverPayload)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw new Error("Failed to get address attestation: " + e_2.message);
                    case 3: return [2];
                }
            });
        });
    };
    SafeConnect.apiRequest = function (url, method, path, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, msg, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(url + "api/" + path, {
                            method: method,
                            body: JSON.stringify(data),
                            credentials: 'include',
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        if (!(res.status > 299 || res.status < 200)) return [3, 6];
                        msg = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, res.json()];
                    case 3:
                        msg = (_a.sent()).error;
                        return [3, 5];
                    case 4:
                        e_3 = _a.sent();
                        msg = "HTTP Request error: " + res.statusText;
                        return [3, 5];
                    case 5: throw new Error(msg);
                    case 6: return [4, res.json()];
                    case 7: return [2, _a.sent()];
                }
            });
        });
    };
    SafeConnect.createAndSignLinkAttestation = function (addressAttest, linkedEthAddress, holdingPrivKey) {
        return __awaiter(this, void 0, void 0, function () {
            var linkAttest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        linkAttest = new EthereumKeyLinkingAttestation();
                        linkAttest.create(addressAttest, linkedEthAddress, 3600);
                        return [4, linkAttest.sign(holdingPrivKey)];
                    case 1:
                        _a.sent();
                        return [2, linkAttest.getBase64()];
                }
            });
        });
    };
    SafeConnect.HOLDING_KEY_ALGORITHM = "RSASSA-PKCS1-v1_5";
    SafeConnect.keyStore = new KeyStore();
    return SafeConnect;
}());
export { SafeConnect };
//# sourceMappingURL=SafeConnect.js.map