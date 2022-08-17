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
import { getBrowserData } from "../utils/support/getBrowserData";
function preparePopupCenter(w, h) {
    var win = window;
    if (window.parent != window) {
        win = window.parent;
    }
    var w = Math.min(w, 800);
    var dualScreenLeft = win.screenLeft !== undefined ? win.screenLeft : win.screenX;
    var dualScreenTop = win.screenTop !== undefined ? win.screenTop : win.screenY;
    var width = win.innerWidth ? win.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = win.innerHeight ? win.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var systemZoom = width / win.screen.availWidth;
    var left = (width - w) / 2 + dualScreenLeft;
    var top = (height - h) / 2 + dualScreenTop;
    return "\n\t\ttoolbar=no, \n\t\tlocation=no, \n\t\tdirectories=no, \n\t\tstatus=no, \n\t\tmenubar=no, \n\t\tscrollbars=yes, \n\t\tresizable=yes, \n\t\tcopyhistory=yes, \n\t\twidth=".concat(w, ", \n\t\theight=").concat(h, ",\n\t\ttop=").concat(top, ", \n\t\tleft=").concat(left, "\n\t");
}
var AuthHandler = (function () {
    function AuthHandler(outlet, evtid, tokenDef, tokenObj, address, wallet) {
        this.buttonOverlay = null;
        this.tryingToGetAttestationInBackground = false;
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
        this.attestationInTab = tokenObj.attestationInTab;
        this.address = address;
        this.wallet = wallet;
    }
    AuthHandler.prototype.openAttestationApp = function () {
        var _this = this;
        if (this.attestationInTab && !this.tryingToGetAttestationInBackground) {
            logger(2, "display new TAB to attest, ask parent to show current iframe");
            this.outlet.sendMessageResponse({
                evtid: this.evtid,
                evt: ResponseActionBase.SHOW_FRAME,
            });
            var button_1;
            if (getBrowserData().metaMaskAndroid) {
                button_1 = document.createElement("a");
                button_1.setAttribute("href", this.attestationOrigin);
                button_1.setAttribute("target", "_blank");
            }
            else {
                button_1 = document.createElement("div");
            }
            button_1.setAttribute("style", "\n\t\t\t\t\tbackground: #000c;\n\t\t\t\t\tcolor: #fff;\n\t\t\t\t\tpadding: 10px;\n\t\t\t\t\tborder: 1px solid #fff2;\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\ttransition: box-shadow 0.3s;\n\t\t\t\t\tbox-shadow: 0 0px 10px #fffc;\n\t\t\t\t");
            button_1.innerHTML = "Click to get Email Attestation";
            button_1.addEventListener("click", function () {
                var winParams = preparePopupCenter(800, 700);
                if (!getBrowserData().metaMaskAndroid) {
                    _this.attestationTabHandler = window.open(_this.attestationOrigin, "Attestation");
                }
                button_1.remove();
                _this.buttonOverlay.remove();
            });
            var styles = document.createElement("style");
            styles.innerHTML = "\n\t\t\t\t#button_overlay div:hover {\n\t\t\t\t\tbox-shadow: 0 0px 14px #ffff !important;\n\t\t\t\t}\n\t\t\t";
            this.buttonOverlay = document.createElement("div");
            this.buttonOverlay.id = "button_overlay";
            this.buttonOverlay.setAttribute("style", "\n\t\t\t\t\twidth:100%;\n\t\t\t\t\theight: 100vh; \n\t\t\t\t\tposition: fixed; \n\t\t\t\t\talign-items: center; \n\t\t\t\t\tjustify-content: center;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\ttop: 0; \n\t\t\t\t\tleft: 0; \n\t\t\t\t\tbackground: #000c\n\t\t\t\t");
            this.buttonOverlay.appendChild(button_1);
            this.buttonOverlay.appendChild(styles);
            document.body.appendChild(this.buttonOverlay);
        }
        else {
            logger(2, "open attestation in iframe");
            this.createIframe();
        }
    };
    AuthHandler.prototype.authenticate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.attestationInTab && !getBrowserData().brave) {
                _this.tryingToGetAttestationInBackground = true;
            }
            if (!_this.attestationOrigin)
                return reject(new Error("Attestation origin is null"));
            window.addEventListener("message", function (e) {
                if (!_this.attestationOrigin)
                    return;
                var attestURL = new URL(_this.attestationOrigin);
                if (e.origin !== attestURL.origin) {
                    return;
                }
                if ((_this.iframe && _this.iframeWrap && _this.iframe.contentWindow) || _this.attestationTabHandler) {
                    _this.postMessageAttestationListener(e, resolve, reject);
                }
            });
            _this.openAttestationApp();
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
            var attestationHandler, sendData, useToken, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger(2, 'postMessageAttestationListener event (auth-handler)', event.data);
                        attestationHandler = this.attestationTabHandler ? this.attestationTabHandler : this.iframe.contentWindow;
                        if (typeof event.data.ready !== "undefined" && event.data.ready === true) {
                            sendData = { force: false };
                            if (this.email)
                                sendData.email = this.email;
                            if (this.wallet)
                                sendData.wallet = this.wallet;
                            if (this.address)
                                sendData.address = this.address;
                            attestationHandler.postMessage(sendData, this.attestationOrigin);
                            return [2];
                        }
                        if (typeof event.data.display !== "undefined") {
                            if (event.data.display === true) {
                                if (this.iframeWrap) {
                                    if (this.tryingToGetAttestationInBackground) {
                                        this.tryingToGetAttestationInBackground = false;
                                        this.iframe.remove();
                                        this.iframeWrap.remove();
                                        this.openAttestationApp();
                                        return [2];
                                    }
                                    this.iframeWrap.style.display = "flex";
                                    this.outlet.sendMessageResponse({
                                        evtid: this.evtid,
                                        evt: ResponseActionBase.SHOW_FRAME,
                                    });
                                }
                            }
                            else {
                                if (event.data.error) {
                                    logger(2, "Error received from the iframe: " + event.data.error);
                                    reject(new Error(event.data.error));
                                }
                                if (this.iframeWrap) {
                                    this.iframeWrap.style.display = "none";
                                }
                            }
                        }
                        if (!((_a = event.data) === null || _a === void 0 ? void 0 : _a.attestation) || !((_b = event.data) === null || _b === void 0 ? void 0 : _b.requestSecret)) {
                            return [2];
                        }
                        if (this.attestationTabHandler) {
                            this.attestationTabHandler.close();
                        }
                        if (this.iframeWrap) {
                            this.iframeWrap.remove();
                        }
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