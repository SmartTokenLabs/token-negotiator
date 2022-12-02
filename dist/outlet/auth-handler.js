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
import { OutletAction } from "../client/messaging";
import { Authenticator } from "@tokenscript/attestation";
import { logger } from "../utils";
import { isBrave } from "../utils/support/getBrowserData";
function preparePopupCenter(w, h) {
    var win = window;
    if (window.parent != window) {
        win = window.parent;
    }
    w = Math.min(w, 800);
    var dualScreenLeft = win.screenLeft !== undefined ? win.screenLeft : win.screenX;
    var dualScreenTop = win.screenTop !== undefined ? win.screenTop : win.screenY;
    var clientWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var width = win.innerWidth ? win.innerWidth : clientWidth;
    var height = win.innerHeight ? win.innerHeight : clientHeight;
    var left = (width - w) / 2 + dualScreenLeft;
    var top = (height - h) / 2 + dualScreenTop;
    return "\n\t\ttoolbar=no, \n\t\tlocation=no, \n\t\tdirectories=no, \n\t\tstatus=no, \n\t\tmenubar=no, \n\t\tscrollbars=yes, \n\t\tresizable=yes, \n\t\tcopyhistory=yes, \n\t\twidth=".concat(w, ", \n\t\theight=").concat(h, ",\n\t\ttop=").concat(top, ", \n\t\tleft=").concat(left, "\n\t");
}
var AuthHandler = (function () {
    function AuthHandler(outlet, evtid, tokenDef, tokenObj, address, wallet, redirectUrl, unsignedToken) {
        this.tokenDef = tokenDef;
        this.tokenObj = tokenObj;
        this.address = address;
        this.wallet = wallet;
        this.redirectUrl = redirectUrl;
        this.unsignedToken = unsignedToken;
        this.buttonOverlay = null;
        this.tryingToGetAttestationInBackground = false;
        this.iframe = null;
        this.iframeWrap = null;
        this.attestationBlob = null;
        this.attestationSecret = null;
        this.wrapperBase = "tn_attestation_open";
        this.interval = null;
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
    }
    AuthHandler.prototype.openAttestationApp = function () {
        var _this = this;
        if (this.attestationInTab && !this.tryingToGetAttestationInBackground) {
            logger(2, "display new TAB to attest, ask parent to show current iframe");
            if (this.outlet)
                this.outlet.sendMessageResponse({
                    evtid: this.evtid,
                    evt: ResponseActionBase.SHOW_FRAME,
                    max_width: "500px",
                    min_height: "300px"
                });
            var button_1;
            button_1 = document.createElement("div");
            button_1.classList.add(this.wrapperBase + "_btn");
            button_1.innerHTML = "Click to get Email Attestation";
            button_1.addEventListener("click", function () {
                _this.attestationTabHandler = window.open(_this.attestationOrigin, "Attestation");
                button_1.remove();
                var title = _this.buttonOverlay.querySelector("." + _this.wrapperBase + "_title");
                var subtitle = _this.buttonOverlay.querySelector("." + _this.wrapperBase + "_subtitle");
                if (title) {
                    title.innerHTML = "Email Attestation verification in progress";
                }
                if (subtitle) {
                    subtitle.innerHTML = "Please complete the verification process to continue";
                }
                _this.interval = setInterval(function () {
                    if (_this.attestationTabHandler.closed) {
                        console.log("child tab closed... ");
                        clearInterval(_this.interval);
                        _this.rejectHandler(new Error("User closed TAB"));
                    }
                }, 2000);
            });
            var wrapperID = this.wrapperBase + "_wrap_" + Date.now();
            var styles = document.createElement("style");
            styles.innerHTML = "\n\t\t\t\t#".concat(wrapperID, " {\n\t\t\t\t\twidth:100%;\n\t\t\t\t\theight: 100vh; \n\t\t\t\t\tposition: fixed; \n\t\t\t\t\talign-items: center; \n\t\t\t\t\tjustify-content: center;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\ttop: 0; \n\t\t\t\t\tleft: 0; \n\t\t\t\t\tbackground: #000f;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-direction: column;\n\t\t\t\t\tpadding: 30px;\n\t\t\t\t}\n\t\t\t\t#").concat(wrapperID, " div:hover {\n\t\t\t\t\tbox-shadow: 0 0px 14px #ffff !important;\n\t\t\t\t}\n\t\t\t\t#").concat(wrapperID, " .").concat(this.wrapperBase, "_content {\n\t\t\t\t\tcolor: #fff; \n\t\t\t\t\ttext-align: center;\n\t\t\t\t}\n\t\t\t\t#").concat(wrapperID, " .").concat(this.wrapperBase, "_title {\n\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#").concat(wrapperID, " .").concat(this.wrapperBase, "_subtitle {\n\t\t\t\t\tfont-size:18px;\n\t\t\t\t\tcolor: #ccc;\n\t\t\t\t}\n\t\t\t\t#").concat(wrapperID, " .").concat(this.wrapperBase, "_btn {\n\t\t\t\t\tmargin: 20px auto 0;\n\t\t\t\t\tpadding: 5px 15px;\n\t\t\t\t\tbackground: #0219fa;\n\t\t\t\t\tfont-weight: 700;\n\t\t\t\t\tfont-size: 20px;\n\t\t\t\t\tline-height: 1.3;\n\t\t\t\t\tborder-radius: 100px;\n\t\t\t\t\tcolor: #fff;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\tdisplay: block;\n\t\t\t\t\ttext-align: center;\n\t\t\t\t}\n\n\t\t\t\t@media (max-width: 768px){\n\t\t\t\t\t#").concat(wrapperID, " {\n\t\t\t\t\t\tpadding: 20px 10px;\n\t\t\t\t\t}\n\t\t\t\t\t#").concat(wrapperID, " .").concat(this.wrapperBase, "_title {\n\t\t\t\t\t\tfont-size: 24px;\n\t\t\t\t\t}\n\t\t\t\t\t#").concat(wrapperID, " .").concat(this.wrapperBase, "_btn {\n\t\t\t\t\t\tpadding: 10px 15px;\n\t\t\t\t\t\tfont-size: 18px;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t");
            this.buttonOverlay = document.createElement("div");
            this.buttonOverlay.id = wrapperID;
            this.buttonOverlay.innerHTML = "<h1 class=\"".concat(this.wrapperBase, "_content ").concat(this.wrapperBase, "_title\">Needs email attestation to complete verification.</h1><p class=\"").concat(this.wrapperBase, "_content ").concat(this.wrapperBase, "_subtitle\"></p>");
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
            _this.rejectHandler = reject;
            if (_this.redirectUrl) {
                var curParams = new URLSearchParams(document.location.hash.substring(1));
                var params = new URLSearchParams();
                params.set("action", OutletAction.EMAIL_ATTEST_CALLBACK);
                params.set("email", _this.email);
                params.set("address", _this.address);
                params.set("wallet", _this.wallet);
                params.set("issuer", _this.tokenDef.collectionID);
                params.set("token", JSON.stringify(_this.unsignedToken));
                params.set("email-attestation-callback", _this.redirectUrl);
                var requestor = curParams.get("requestor");
                if (requestor)
                    params.set("requestor", requestor);
                var goto = "".concat(_this.attestationOrigin, "#").concat(params.toString());
                logger(2, "authenticate. go to: ", goto);
                document.location.href = goto;
                return;
            }
            if (_this.attestationInTab && !isBrave()) {
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
            _this.openAttestationApp(reject);
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
    AuthHandler.prototype.getUseToken = function (attestationBlob, attestationSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var useToken, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.signedTokenSecret) {
                            throw new Error("signedTokenSecret required");
                        }
                        if (!attestationSecret) {
                            throw new Error("attestationSecret required");
                        }
                        if (!this.signedTokenBlob) {
                            throw new Error("signedTokenBlob required");
                        }
                        if (!attestationBlob) {
                            throw new Error("attestationBlob required");
                        }
                        if (!this.base64attestorPubKey) {
                            throw new Error("base64attestorPubKey required");
                        }
                        if (!this.base64senderPublicKeys) {
                            throw new Error("base64senderPublicKeys required");
                        }
                        return [4, Authenticator.getUseTicket(this.signedTokenSecret, attestationSecret, this.signedTokenBlob, attestationBlob, this.base64attestorPubKey, this.base64senderPublicKeys)];
                    case 1:
                        useToken = _a.sent();
                        if (useToken) {
                            logger(2, 'this.authResultCallback( useToken ): ');
                            if (this.buttonOverlay)
                                this.buttonOverlay.remove();
                            return [2, useToken];
                        }
                        else {
                            logger(2, "this.authResultCallback( empty ): ");
                            throw new Error("Empty useToken");
                        }
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        logger(2, "UseDevconTicket failed.", e_1.message);
                        logger(3, e_1);
                        if (this.buttonOverlay)
                            this.buttonOverlay.remove();
                        throw new Error("Failed to create UseTicket. " + e_1.message);
                    case 3: return [2];
                }
            });
        });
    };
    AuthHandler.prototype.postMessageAttestationListener = function (event, resolve, reject) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var attestationHandler, sendData, useToken;
            return __generator(this, function (_e) {
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
                            if (this.outlet)
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
                            if (this.buttonOverlay)
                                this.buttonOverlay.remove();
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
                try {
                    useToken = this.getUseToken(this.attestationBlob, this.attestationSecret);
                    resolve(useToken);
                }
                catch (e) {
                    reject(e);
                }
                return [2];
            });
        });
    };
    return AuthHandler;
}());
export { AuthHandler };
//# sourceMappingURL=auth-handler.js.map