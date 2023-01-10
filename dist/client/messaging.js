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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import { Messaging as CoreMessaging } from "../core/messaging";
import { ClientError, ClientErrorMessage } from "./index";
export var OutletAction;
(function (OutletAction) {
    OutletAction["MAGIC_URL"] = "magic-url";
    OutletAction["GET_ISSUER_TOKENS"] = "get-issuer-tokens";
    OutletAction["GET_PROOF"] = "get-proof";
    OutletAction["GET_PROOF_CALLBACK"] = "proof-callback";
    OutletAction["EMAIL_ATTEST_CALLBACK"] = "email-callback";
})(OutletAction || (OutletAction = {}));
export var OutletResponseAction;
(function (OutletResponseAction) {
    OutletResponseAction["ISSUER_TOKENS"] = "issuer-tokens";
    OutletResponseAction["PROOF"] = "proof";
})(OutletResponseAction || (OutletResponseAction = {}));
var Messaging = (function () {
    function Messaging() {
        this.core = new CoreMessaging();
    }
    Messaging.prototype.sendMessage = function (request, forceTab, ui, redirectUrl) {
        if (forceTab === void 0) { forceTab = false; }
        if (redirectUrl === void 0) { redirectUrl = false; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.core.sendMessage(request, forceTab, redirectUrl)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 === ClientError.POPUP_BLOCKED) {
                            if (ui) {
                                return [2, this.handleUserClose(request, ui, forceTab)];
                            }
                            else {
                                e_1 = this.createNamedError(e_1, ClientErrorMessage.POPUP_BLOCKED);
                            }
                        }
                        if (e_1 === ClientError.USER_ABORT) {
                            e_1 = this.createNamedError(e_1, ClientErrorMessage.USER_ABORT);
                        }
                        throw e_1;
                    case 3: return [2];
                }
            });
        });
    };
    Messaging.prototype.handleUserClose = function (request, ui, forceTab) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            ui.showError("Mmmmm looks like your popup blocker is getting in the way.");
            ui.setErrorRetryCallback(function () {
                _this.core.sendMessage(request, forceTab).then(function (res) {
                    resolve(res);
                }).catch(function (e) {
                    if (e === ClientError.POPUP_BLOCKED) {
                        e = _this.createNamedError(e, ClientErrorMessage.POPUP_BLOCKED);
                    }
                    else if (e === ClientError.USER_ABORT) {
                        e = _this.createNamedError(e, ClientErrorMessage.USER_ABORT);
                    }
                    reject(e);
                });
            });
        });
    };
    Messaging.prototype.createNamedError = function (err, message) {
        var error = new Error(message);
        error.name = err;
        return error;
    };
    return Messaging;
}());
export { Messaging };
//# sourceMappingURL=messaging.js.map