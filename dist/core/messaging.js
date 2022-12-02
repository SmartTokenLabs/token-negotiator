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
import { attachPostMessageListener, logger, removePostMessageListener } from "../utils";
import { ClientError } from "../client";
import { browserBlocksIframeStorage } from "../utils/support/getBrowserData";
export var ResponseActionBase;
(function (ResponseActionBase) {
    ResponseActionBase["COOKIE_CHECK"] = "cookie-check";
    ResponseActionBase["ERROR"] = "error";
    ResponseActionBase["SHOW_FRAME"] = "show-frame";
})(ResponseActionBase || (ResponseActionBase = {}));
var Messaging = (function () {
    function Messaging() {
        this.iframeStorageSupport = null;
        this.iframe = null;
        this.listenerSet = false;
    }
    Messaging.prototype.sendMessage = function (request, forceTab, redirectUrl) {
        if (forceTab === void 0) { forceTab = false; }
        if (redirectUrl === void 0) { redirectUrl = false; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!forceTab && this.iframeStorageSupport === null) {
                            this.iframeStorageSupport = !browserBlocksIframeStorage();
                        }
                        logger(2, "Send request: ");
                        logger(2, request);
                        if (redirectUrl) {
                            this.sendRedirect(request, redirectUrl);
                            return [2];
                        }
                        if (!(!forceTab && this.iframeStorageSupport !== false)) return [3, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.sendIframe(request)];
                    case 2: return [2, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1 === "IFRAME_STORAGE") {
                            return [2, this.sendPopup(request)];
                        }
                        throw e_1;
                    case 4: return [3, 6];
                    case 5: return [2, this.sendPopup(request)];
                    case 6: return [2];
                }
            });
        });
    };
    Messaging.prototype.sendRedirect = function (request, redirectUrl) {
        var id = Messaging.getUniqueEventId();
        var url = this.constructUrl(id, request);
        var newLocation = "".concat(url, "&redirect=true&requestor=").concat(encodeURIComponent(redirectUrl));
        logger(2, "redirect from ".concat(document.location.href, " to ").concat(newLocation));
        document.location.href = newLocation;
    };
    Messaging.prototype.sendIframe = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var id = Messaging.getUniqueEventId();
            var url = _this.constructUrl(id, request);
            _this.iframe = _this.createIframe(function () {
                _this.listenerSet = false;
                _this.removeModal();
                reject(ClientError.USER_ABORT);
            });
            if (!_this.listenerSet) {
                _this.listenerSet = true;
                _this.setResponseListener(id, request.origin, request.timeout, resolve, reject, function () {
                    _this.listenerSet = false;
                    _this.removeModal();
                });
            }
            _this.iframe.src = url;
        });
    };
    Messaging.prototype.sendPopup = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var id = Messaging.getUniqueEventId();
            var tabRef = null;
            _this.setResponseListener(id, request.origin, request.timeout, resolve, reject, function () {
                if (tabRef)
                    tabRef.close();
            });
            tabRef = _this.openTab(_this.constructUrl(id, request));
            if (!tabRef || tabRef.closed || typeof tabRef.closed == "undefined") {
                reject(ClientError.POPUP_BLOCKED);
                return;
            }
            var tabCloseCheck = setInterval(function () {
                if (!tabRef || tabRef.closed) {
                    clearInterval(tabCloseCheck);
                    reject(ClientError.USER_ABORT);
                }
            }, 500);
        });
    };
    Messaging.prototype.setResponseListener = function (id, origin, timeout, resolve, reject, cleanUpCallback) {
        var _this = this;
        var received = false;
        var timer = null;
        var listener = function (event) {
            if (event.data.target) {
                return;
            }
            var response = event.data;
            var requestUrl = new URL(origin);
            if (response.evtid === id) {
                if (requestUrl.origin === event.origin && response.evt) {
                    logger(2, "event response received");
                    logger(2, event.data);
                    received = true;
                    if (response.evt === ResponseActionBase.ERROR) {
                        if (response.errors[0] === "IFRAME_STORAGE") {
                            _this.iframeStorageSupport = false;
                            reject("IFRAME_STORAGE");
                        }
                        else {
                            reject(new Error(response.errors.join(". ")));
                        }
                    }
                    else if (response.evt === ResponseActionBase.SHOW_FRAME) {
                        if (timer)
                            clearTimeout(timer);
                        if (_this.iframe) {
                            var modal = _this.getModal();
                            modal.style.display = "block";
                            if (response.max_width) {
                                var modalContent = modal.querySelector(".modal-content-tn");
                                if (modalContent) {
                                    modalContent.style.maxWidth = response.max_width;
                                }
                            }
                            if (response.min_height) {
                                var iframe = modal.querySelector("iframe");
                                if (iframe) {
                                    iframe.style.minHeight = response.min_height;
                                }
                            }
                        }
                        return;
                    }
                    else {
                        resolve(response);
                    }
                    afterResolveOrError();
                }
                else {
                    logger(2, "Does not match origin " + event.origin);
                }
            }
        };
        var afterResolveOrError = function () {
            if (timer)
                clearTimeout(timer);
            removePostMessageListener(listener);
            if (!window.NEGOTIATOR_DEBUG)
                cleanUpCallback();
        };
        attachPostMessageListener(listener);
        if (timeout === undefined)
            timeout = 20000;
        if (timeout > 0)
            timer = setTimeout(function () {
                if (!received)
                    reject(new Error("Failed to receive response from window/iframe"));
                afterResolveOrError();
            }, timeout);
    };
    Messaging.prototype.getModal = function (closedCallback) {
        var modal = document.getElementById("modal-tn");
        if (modal || !closedCallback)
            return modal;
        modal = document.createElement('div');
        modal.id = "modal-tn";
        modal.className = "modal-tn";
        modal.style.display = "none";
        modal.innerHTML = "\n            <div class=\"modal-content-tn\">\n                <div class=\"modal-header-tn\">\n                    <span class=\"modal-close-tn\">&times;</span>\n                </div>\n                <div class=\"modal-body-tn\"></div>\n            </div>\n        ";
        document.body.appendChild(modal);
        modal.getElementsByClassName('modal-close-tn')[0].addEventListener('click', function () {
            closedCallback();
        });
        return modal;
    };
    Messaging.prototype.removeModal = function () {
        var modal = this.getModal();
        if (modal) {
            modal.style.display = "none";
            modal.remove();
        }
    };
    Messaging.prototype.constructUrl = function (id, request) {
        var url = "".concat(request.origin, "#evtid=").concat(id, "&action=").concat(request.action);
        if (typeof request.data.token !== "undefined") {
            url += "&token=".concat(encodeURIComponent(JSON.stringify(request.data.token)));
        }
        for (var key in request.data) {
            var value = request.data[key];
            if (key === "issuer")
                continue;
            if (!value)
                continue;
            if (value instanceof Array || value instanceof Object) {
                url += "&".concat(key, "=").concat(JSON.stringify(value));
            }
            else {
                if (key === "urlParams") {
                    url += "&".concat(value);
                }
                else {
                    url += "&".concat(key, "=").concat(value);
                }
            }
        }
        return url;
    };
    Messaging.prototype.openTab = function (url) {
        return window.open(url, "_blank");
    };
    Messaging.prototype.createIframe = function (closeCallback) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('allow', "clipboard-read");
        var modal = this.getModal(closeCallback);
        modal.getElementsByClassName('modal-body-tn')[0].appendChild(iframe);
        return iframe;
    };
    Messaging.getUniqueEventId = function () {
        return new Date().getTime().toString();
    };
    return Messaging;
}());
export { Messaging };
//# sourceMappingURL=messaging.js.map