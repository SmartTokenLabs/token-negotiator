var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Start } from './views/start';
import { logger, requiredParams } from "../utils";
import { ClientError } from "./index";
import { TokenStore } from "./tokenStore";
import { SelectIssuers } from "./views/select-issuers";
import { SelectWallet } from "./views/select-wallet";
var Ui = (function () {
    function Ui(options, client) {
        this.isStartView = true;
        this.loadTimer = null;
        this.options = options;
        this.client = client;
    }
    Ui.prototype.initialize = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.popupContainer = document.querySelector(this.options.containerElement);
                        if (!this.popupContainer) {
                            this.popupContainer = document.createElement("div");
                            this.popupContainer.className = "overlay-tn";
                            document.body.appendChild(this.popupContainer);
                        }
                        this.initializeUIType();
                        this.setTheme((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.theme) !== null && _b !== void 0 ? _b : 'light');
                        this.viewContainer = this.popupContainer.querySelector(".view-content-tn");
                        this.loadContainer = this.popupContainer.querySelector(".load-container-tn");
                        this.retryButton = this.loadContainer.querySelector('.dismiss-error-tn');
                        this.retryButton.addEventListener('click', function () {
                            _this.dismissLoader();
                            if (_this.retryCallback) {
                                _this.retryCallback();
                                _this.retryCallback = undefined;
                                _this.retryButton.innerText = "Dismiss";
                            }
                        });
                        _c = this.updateUI;
                        return [4, this.getStartScreen()];
                    case 1:
                        _c.apply(this, [_d.sent()]);
                        return [2];
                }
            });
        });
    };
    Ui.prototype.getViewFactory = function (type) {
        var _a, _b, _c, _d, _e;
        var viewOptions = {};
        if ((_a = this.options.viewOverrides) === null || _a === void 0 ? void 0 : _a[type]) {
            if ((_b = this.options.viewOverrides) === null || _b === void 0 ? void 0 : _b[type].options)
                viewOptions = (_c = this.options.viewOverrides) === null || _c === void 0 ? void 0 : _c[type].options;
            if ((_d = this.options.viewOverrides) === null || _d === void 0 ? void 0 : _d[type].component)
                return [
                    (_e = this.options.viewOverrides) === null || _e === void 0 ? void 0 : _e[type].component,
                    viewOptions
                ];
        }
        switch (type) {
            case "start":
                return [Start, viewOptions];
            case "main":
                return [SelectIssuers, viewOptions];
            case "wallet":
                return [SelectWallet, viewOptions];
        }
    };
    Ui.prototype.getStartScreen = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options.alwaysShowStartScreen || !localStorage.getItem(TokenStore.LOCAL_STORAGE_KEY) || !this.client.getTokenStore().getTotalTokenCount())
                            return [2, "start"];
                        return [4, this.canSkipWalletSelection()];
                    case 1:
                        if (_a.sent()) {
                            this.client.enrichTokenLookupDataOnChainTokens();
                            return [2, "main"];
                        }
                        else {
                            return [2, "wallet"];
                        }
                        return [2];
                }
            });
        });
    };
    Ui.prototype.canSkipWalletSelection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.client.getTokenStore().hasOnChainTokens()) return [3, 3];
                        return [4, this.client.getWalletProvider()];
                    case 1:
                        wp = _a.sent();
                        return [4, wp.loadConnections()];
                    case 2:
                        _a.sent();
                        return [2, wp.getConnectedWalletData().length > 0];
                    case 3: return [2, true];
                }
            });
        });
    };
    Ui.prototype.initializeUIType = function () {
        var _this = this;
        this.popupContainer.classList.add(this.options.uiType + "-tn");
        switch (this.options.uiType) {
            case "popup":
                this.options.position
                    ? this.popupContainer.classList.add(this.options.position)
                    : this.popupContainer.classList.add('bottom-right');
                this.popupContainer.innerHTML = Ui.UI_CONTAINER_HTML + Ui.FAB_BUTTON_HTML;
                this.popupContainer.querySelector('.overlay-fab-button-tn').addEventListener('click', this.togglePopup.bind(this));
                this.popupContainer.addEventListener('click', function (event) {
                    event.stopPropagation();
                });
                document.addEventListener('click', function () {
                    _this.closeOverlay();
                });
                this.assignFabButtonAnimation();
                break;
            case "inline":
                this.popupContainer.innerHTML = Ui.UI_CONTAINER_HTML;
                break;
        }
    };
    Ui.prototype.closeOverlay = function () {
        if (this.options.uiType === "inline")
            return;
        this.popupContainer.classList.remove("open");
        window.KeyshapeJS.timelines()[0].time(0);
        window.KeyshapeJS.globalPause();
    };
    Ui.prototype.openOverlay = function () {
        var _this = this;
        if (this.options.uiType === "inline")
            return;
        setTimeout(function () {
            _this.popupContainer.classList.add("open");
            window.KeyshapeJS.timelines()[0].time(0);
            window.KeyshapeJS.globalPlay();
        }, 10);
    };
    Ui.prototype.togglePopup = function () {
        requiredParams(this.popupContainer, 'No overlay element found.');
        var openOverlay = !this.popupContainer.classList.contains("open");
        if (openOverlay) {
            this.openOverlay();
        }
        else {
            this.closeOverlay();
        }
    };
    Ui.prototype.updateUI = function (viewFactory, data) {
        var viewOptions = {};
        if (typeof viewFactory === "string") {
            this.isStartView = viewFactory === "start";
            var _a = __read(this.getViewFactory(viewFactory), 2), component = _a[0], opts = _a[1];
            viewFactory = component;
            viewOptions = opts;
        }
        else {
            this.isStartView = false;
        }
        if (!this.viewContainer) {
            logger(3, "Element .overlay-content-tn not found: popup not initialized");
            return;
        }
        this.currentView = new viewFactory(this.client, this, this.viewContainer, { options: __assign(__assign({}, this.options), viewOptions), data: data });
        this.currentView.render();
    };
    Ui.prototype.viewIsNotStart = function () {
        return !this.isStartView;
    };
    Ui.prototype.showError = function (error, canDismiss) {
        if (canDismiss === void 0) { canDismiss = true; }
        this.cancelDelayedLoader();
        if (typeof error !== "string") {
            if (error.name === ClientError.USER_ABORT) {
                return this.dismissLoader();
            }
            error = error.message ? error.message : error.toString();
        }
        this.loadContainer.querySelector('.loader-tn').style.display = 'none';
        this.retryButton.style.display = 'block';
        this.loadContainer.querySelector('.loader-msg-tn').innerHTML = error;
        this.loadContainer.style.display = 'flex';
        if (!canDismiss) {
            this.loadContainer.querySelector('.dismiss-error-tn').style.display = 'none';
        }
    };
    Ui.prototype.setErrorRetryCallback = function (retryCallback) {
        this.retryCallback = retryCallback;
        this.retryButton.innerText = "Retry";
    };
    Ui.prototype.showLoaderDelayed = function (messages, delay, openOverlay) {
        var _this = this;
        if (openOverlay === void 0) { openOverlay = false; }
        if (this.loadTimer)
            clearTimeout(this.loadTimer);
        this.loadTimer = setTimeout(function () {
            _this.showLoader.apply(_this, __spreadArray([], __read(messages), false));
            if (openOverlay)
                _this.openOverlay();
        }, delay);
    };
    Ui.prototype.cancelDelayedLoader = function () {
        if (this.loadTimer) {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
        }
    };
    Ui.prototype.showLoader = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.cancelDelayedLoader();
        this.loadContainer.querySelector('.loader-tn').style.display = 'block';
        this.loadContainer.querySelector('.dismiss-error-tn').style.display = 'none';
        this.loadContainer.querySelector('.loader-msg-tn').innerHTML = message.join("\n");
        this.loadContainer.style.display = 'flex';
    };
    Ui.prototype.dismissLoader = function () {
        this.cancelDelayedLoader();
        this.loadContainer.style.display = 'none';
    };
    Ui.prototype.setTheme = function (theme) {
        var refTokenSelector = document.querySelector(".overlay-tn");
        if (refTokenSelector) {
            refTokenSelector.classList.remove(this.options.theme + "-tn");
            theme = this.validateTheme(theme);
            refTokenSelector.classList.add(theme + "-tn");
            this.options.theme = theme;
        }
    };
    Ui.prototype.assignFabButtonAnimation = function () {
        if (window.KeyshapeJS) {
            window.KeyshapeJS.globalPause();
            window.KeyshapeJS.animate("#svg-tn-left", [{ p: 'mpath', t: [0, 400], v: ['0%', '100%'], e: [[1, 0, 0, .6, 1], [0]], mp: "M13,28.5L27.1,28.1" }, { p: 'rotate', t: [0, 400], v: [0, 0], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'scaleX', t: [0, 400], v: [1, 1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'scaleY', t: [0, 400], v: [1, 1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorX', t: [0, 400], v: [-13, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorY', t: [0, 400], v: [-13.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'd', t: [0, 400], v: ["path('M25.5,26C25.5,26,20.5,26,20.5,26C20.5,23.1,19.9,20.4,18.8,17.9C17.8,15.6,16.4,13.6,14.6,11.8C12.7,9.9,10.3,8.4,7.8,7.4C5.5,6.5,3,6,.5,6L.5,1C.5,1,.5,1,.5,1C.5,1,7.5,1,7.5,1L25.5,1L25.5,7.2C25.5,7.2,25.5,12.8,25.5,12.8C25.5,12.8,25.5,19,25.5,19Z')", "path('M31.8,32.8C31.5,33.2,30.9,33.4,30.4,33.4C29.9,33.4,29.4,33.2,29,32.8C29,32.8,1.4,5.2,1.4,5.2C1,4.8,.8,4.3,.8,3.8C.8,3.3,1,2.8,1.4,2.4L2.4,1.4C2.7,1,3.3,.8,3.8,.8C4.3,.8,4.8,1,5.2,1.4L5.2,1.4L32.8,29C33.2,29.4,33.4,29.9,33.4,30.4C33.4,30.9,33.2,31.5,32.8,31.8Z')"], e: [[1, 0, 0, .6, 1], [0]] }], "#svg-tn-right", [{ p: 'mpath', t: [0, 400], v: ['0%', '100%'], e: [[1, 0, 0, .6, 1], [0]], mp: "M41.5,28.7L27.1,28.1" }, { p: 'rotate', t: [0, 400], v: [0, 0], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorX', t: [0, 400], v: [-40.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorY', t: [0, 400], v: [-13.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'd', t: [0, 400], v: ["path('M53,1C53,1,53,1,53,1C53,1,53,12.9,53,12.9L53,19C53,19,53,26,53,26C53,26,40.2,26,40.2,26L34.1,26C34.1,26,28,26,28,26C28,26,28,12.6,28,12.6L28,7.4C28,7.4,28,1,28,1C28,1,40.6,1,40.6,1C40.6,1,45.9,1,45.9,1Z')", "path('M29,1.4C29.4,1,29.9,.8,30.4,.8C30.9,.8,31.5,1,31.8,1.4L32.8,2.4C33.2,2.7,33.4,3.3,33.4,3.8C33.4,4.3,33.2,4.8,32.8,5.2L5.2,32.8C4.8,33.2,4.3,33.4,3.8,33.4C3.3,33.4,2.8,33.2,2.4,32.8L1.4,31.8C1,31.5,.8,30.9,.8,30.4C.8,29.9,1,29.4,1.4,29C1.4,29,29,1.4,29,1.4Z')"], e: [[1, 0, 0, .6, 1], [0]] }], { autoremove: false }).range(0, 400);
        }
    };
    Ui.prototype.validateTheme = function (theme) {
        if (theme && theme === 'dark') {
            return theme;
        }
        return 'light';
    };
    Ui.prototype.switchTheme = function (newTheme) {
        this.setTheme(newTheme);
    };
    Ui.UI_CONTAINER_HTML = "\n\t\t<div class=\"overlay-content-tn\" aria-label=\"Token negotiator overlay\">\n\t\t\t<div class=\"load-container-tn\" style=\"display: none;\">\n\t\t\t\t<div class=\"lds-ellipsis loader-tn\"><div></div><div></div><div></div><div></div></div>\n\t\t\t\t<div class=\"loader-msg-tn\"></div>\n\t\t\t\t<button class=\"dismiss-error-tn btn-tn\">Dismiss</button>\n\t\t\t</div>\n\t\t\t<div class=\"view-content-tn\"></div>\n\t\t</div>\n\t";
    Ui.FAB_BUTTON_HTML = "\n\t\t<button aria-label=\"token negotiator toggle\" class=\"overlay-fab-button-tn\">\n\t\t  <svg style=\"pointer-events: none\" xmlns=\"http://www.w3.org/2000/svg\" width=\"55\" height=\"55\" viewBox=\"0 0 55 55\"><path fill=\"white\" id=\"svg-tn-left\" d=\"M25.5 26h-5c0-2.9-0.6-5.6-1.7-8.1c-1-2.3-2.4-4.3-4.2-6.1c-1.9-1.9-4.3-3.4-6.8-4.4c-2.3-0.9-4.8-1.4-7.3-1.4v-5h7h18v6.2v5.6v6.2Z\" transform=\"translate(13,28.5) translate(0,0) translate(-13,-13.5)\"/><path id=\"svg-tn-right\" fill=\"white\" d=\"M53 1v11.9v6.1v7h-12.8h-6.1h-6.1v-13.4v-5.2v-6.4h12.6h5.3Z\" transform=\"translate(41.5,28.7) translate(0,0) translate(-40.5,-13.5)\"/></svg>\n\t\t</button>\n\t";
    return Ui;
}());
export { Ui };
//# sourceMappingURL=ui.js.map