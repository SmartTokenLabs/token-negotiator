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
import { ResponseActionBase } from "../core/messaging";
import { Authenticator } from "@tokenscript/attestation";
import { logger } from "../utils";
var AuthHandler = (function () {
    function AuthHandler(outlet, evtid, tokenDef, tokenObj, address, wallet) {
        this.iframe = null;
        this.iframeWrap = null;
        this.attestationBlob = null;
        this.attestationSecret = null;
        this.outlet = outlet;
        this.evtid = evtid;
        this.base64senderPublicKeys = tokenDef.base64senderPublicKeys;
        this.base64attestorPubKey = tokenDef.base64attestorPubKey;
        this.signedTokenBlob = tokenObj.ticketBlob;
        this.magicLink = tokenObj.magicLink;
        this.email = tokenObj.email;
        this.signedTokenSecret = tokenObj.ticketSecret;
        this.attestationOrigin = tokenObj.attestationOrigin;
        this.address = address;
        this.wallet = wallet;
    }
    AuthHandler.prototype.authenticate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.attestationOrigin)
                return reject(new Error("Attestation origin is null"));
            window.addEventListener("message", function (e) {
                if (!_this.attestationOrigin)
                    return;
                var attestURL = new URL(_this.attestationOrigin);
                if (e.origin !== attestURL.origin) {
                    return;
                }
                if (!_this.iframe || !_this.iframeWrap || !_this.iframe.contentWindow)
                    return;
                _this.postMessageAttestationListener(e, resolve, reject);
            });
            _this.createIframe();
        });
    };
    AuthHandler.prototype.createIframe = function () {
        var _a;
        var iframe = document.createElement("iframe");
        iframe.setAttribute("allow", "clipboard-read");
        this.iframe = iframe;
        iframe.src = (_a = this.attestationOrigin) !== null && _a !== void 0 ? _a : "";
        iframe.style.width = "800px";
        iframe.style.height = "700px";
        iframe.style.maxWidth = "100%";
        iframe.style.background = "#fff";
        var iframeWrap = document.createElement("div");
        this.iframeWrap = iframeWrap;
        iframeWrap.setAttribute("style", "width:100%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa");
        iframeWrap.appendChild(iframe);
        document.body.appendChild(iframeWrap);
    };
    AuthHandler.prototype.postMessageAttestationListener = function (event, resolve, reject) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var sendData, useToken, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger(2, 'postMessageAttestationListener event (auth-handler)', event.data);
                        if (typeof event.data.ready !== "undefined" && event.data.ready === true) {
                            sendData = { force: false };
                            if (this.email)
                                sendData.email = this.email;
                            if (this.wallet)
                                sendData.wallet = this.wallet;
                            if (this.address)
                                sendData.address = this.address;
                            this.iframe.contentWindow.postMessage(sendData, this.attestationOrigin);
                            return [2];
                        }
                        if (typeof event.data.display !== "undefined") {
                            if (event.data.display === true) {
                                this.iframeWrap.style.display = "flex";
                                this.outlet.sendMessageResponse({
                                    evtid: this.evtid,
                                    evt: ResponseActionBase.SHOW_FRAME,
                                });
                            }
                            else {
                                if (event.data.error) {
                                    logger(2, "Error received from the iframe: " + event.data.error);
                                    reject(new Error(event.data.error));
                                }
                                this.iframeWrap.style.display = "none";
                            }
                        }
                        if (!((_a = event.data) === null || _a === void 0 ? void 0 : _a.attestation) || !((_b = event.data) === null || _b === void 0 ? void 0 : _b.requestSecret)) {
                            return [2];
                        }
                        this.iframeWrap.remove();
                        this.attestationBlob = (_c = event.data) === null || _c === void 0 ? void 0 : _c.attestation;
                        this.attestationSecret = (_d = event.data) === null || _d === void 0 ? void 0 : _d.requestSecret;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        if (!this.signedTokenSecret) {
                            throw new Error("signedTokenSecret required");
                        }
                        if (!this.attestationSecret) {
                            throw new Error("attestationSecret required");
                        }
                        if (!this.signedTokenBlob) {
                            throw new Error("signedTokenBlob required");
                        }
                        if (!this.attestationBlob) {
                            throw new Error("attestationBlob required");
                        }
                        if (!this.base64attestorPubKey) {
                            throw new Error("base64attestorPubKey required");
                        }
                        if (!this.base64senderPublicKeys) {
                            throw new Error("base64senderPublicKeys required");
                        }
                        return [4, Authenticator.getUseTicket(this.signedTokenSecret, this.attestationSecret, this.signedTokenBlob, this.attestationBlob, this.base64attestorPubKey, this.base64senderPublicKeys)];
                    case 2:
                        useToken = _e.sent();
                        if (useToken) {
                            logger(2, 'this.authResultCallback( useToken ): ');
                            resolve(useToken);
                        }
                        else {
                            console.log("this.authResultCallback( empty ): ");
                            throw new Error("Empty useToken");
                        }
                        return [3, 4];
                    case 3:
                        e_1 = _e.sent();
                        logger(2, "UseDevconTicket failed.", e_1.message);
                        logger(3, e_1);
                        reject(new Error("Failed to create UseTicket. " + e_1.message));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return AuthHandler;
}());
export { AuthHandler };
//# sourceMappingURL=auth-handler.js.map