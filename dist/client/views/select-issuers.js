var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { AbstractView } from "./view-interface";
import { TokenList } from "./token-list";
import { IconView } from "./icon-view";
import { logger } from "../../utils";
var SelectIssuers = (function (_super) {
    __extends(SelectIssuers, _super);
    function SelectIssuers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectIssuers.prototype.init = function () {
        var _this = this;
        this.client.registerUiUpdateCallback(0, function () {
            _this.issuersLoading();
        });
        this.client.registerUiUpdateCallback(1, function () {
            _this.ui.dismissLoader();
            _this.client.cancelTokenAutoload();
            _this.render();
        });
    };
    SelectIssuers.prototype.render = function () {
        this.renderContent();
        this.afterRender();
    };
    SelectIssuers.prototype.renderContent = function () {
        var _this = this;
        this.viewContainer.innerHTML = "\n            <div class=\"inner-content-tn issuer-slider-tn\">\n              <div class=\"issuer-view-tn scroll-tn\">\n                <div class=\"brand-tn\"></div>\n                <div class=\"headline-container-tn\">\n                  <div>\n                  \t<p class=\"headline-tn\">".concat(this.params.options.issuerHeading, "</p>\n\t\t\t\t\t\t\t\t\t\t<div class=\"toolbar-tn\">\n\t\t\t\t  \t\t\t\t\t\t<button class=\"btn-tn refresh-tn\" aria-label=\"Refresh Tokens\">\n                  \t\t\t<svg class=\"refresh-icon-tn\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\t viewBox=\"0 0 383.748 383.748\" style=\"enable-background:new 0 0 383.748 383.748;\" xml:space=\"preserve\"><g>\t<path d=\"M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30\t\tC369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593\t\tL2.081,34.641v113.365h113.91L62.772,95.042z\"/>\t<path d=\"M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042\t\tc-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888\t\tc18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z\"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>\n\t\t\t\t  \t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn-tn dis-wallet-tn\" style=\"display: none;\" aria-label=\"Disconnect Wallet\">\n\t\t\t\t\t\t\t\t\t\t\t\t<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n\t\t\t\t\t\t\t\t\t\t\t\t<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n\t\t\t\t\t\t\t\t\t\t\t\t<svg width=\"12px\" height=\"100%\" viewBox=\"0 0 384 384\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<g id=\"Layer1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<path d=\"M194.449,-0.378L194.449,29.622L29.577,29.622C29.577,95.909 30.577,354.191 30.577,354.191L194.449,354.191L194.449,384.191L16.077,384.191C7.517,384.191 0.577,377.251 0.577,368.691L0.577,15.122C0.577,6.562 7.517,-0.378 16.077,-0.378L194.449,-0.378Z\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<g transform=\"matrix(1.39537,0,0,2.43013,-54.9803,-262.053)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<path d=\"M99.772,200.171L99.772,165.725L228.493,165.725L228.493,133.741L314.191,182.948L228.493,232.156L228.493,200.171L99.772,200.171Z\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</g>\n\t\t\t\t\t\t\t\t\t\t\t\t</svg>\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t  \t\t\t\t\t</div>                  \t\n\t\t\t\t  </div>\n\t\t\t\t  ").concat(this.getCustomContent(), "\n                </div>\n\t\t\t\t\t\t\t\t<nav class=\"token-issuer-nav-tn\">\n                \t<ul class=\"token-issuer-list-container-tn\" role=\"menubar\"></ul>\n\t\t\t\t\t\t\t\t</nav>\n              </div>\n              <div class=\"token-view-tn scroll-tn\" style=\"display: none;\">\n                <div class=\"brand-tn\"></div>\n                <div style=\"display: flex; align-items: center;\">\n                  <button aria-label=\"back to token issuer menu\" class=\"back-to-menu-tn\">\n                    <svg style=\"position: relative; top: 1px;\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <path d=\"m10.2 15.8 7.173 7.56c.55.587 1.453.587 2.01 0a1.554 1.554 0 0 0 0-2.12l-5.158-5.44 5.157-5.44a1.554 1.554 0 0 0 0-2.12 1.367 1.367 0 0 0-2.009 0L10.2 15.8z\" fill=\"#000\" fill-rule=\"nonzero\"/>\n                        </g>\n                    </svg>\n                  </button>\n                  <p class=\"headline-tn token-name\">Token Name Here</p>\n                </div>\n                <ul class=\"token-list-container-tn\" role=\"menubar\"></ul>\n              </div>\n            </div>\n        ");
        this.viewContainer.querySelector('.back-to-menu-tn').addEventListener('click', this.backToIssuers.bind(this));
        this.setupWalletButton();
        var refreshBtn = this.viewContainer.querySelector('.refresh-tn');
        refreshBtn.addEventListener('click', function () {
            _this.autoLoadTokens(true);
        });
        this.issuerListContainer = document.querySelector(".token-issuer-list-container-tn");
        this.tokensContainer = document.getElementsByClassName("token-view-tn")[0];
        if (!this.issuerListContainer) {
            logger(2, "Element .token-issuer-list-container-tn not found");
            return;
        }
        this.populateIssuers();
        var tokensListElem = this.tokensContainer.getElementsByClassName("token-list-container-tn")[0];
        this.tokenListView = new TokenList(this.client, this.ui, tokensListElem, {});
    };
    SelectIssuers.prototype.afterRender = function () {
        if (this.client.issuersLoaded) {
            if (this.client.getTokenStore().hasUnloadedTokens())
                this.autoLoadTokens();
        }
        else {
            this.issuersLoading();
        }
    };
    SelectIssuers.prototype.getCustomContent = function () {
        return "";
    };
    SelectIssuers.prototype.setupWalletButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, walletBtn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.getWalletProvider()];
                    case 1:
                        provider = _a.sent();
                        if (provider.getConnectedWalletData().length > 0) {
                            walletBtn = this.viewContainer.querySelector('.dis-wallet-tn');
                            walletBtn.style.display = "block";
                            walletBtn.addEventListener('click', function () {
                                _this.client.disconnectWallet();
                                _this.ui.updateUI("wallet");
                            });
                        }
                        return [2];
                }
            });
        });
    };
    SelectIssuers.prototype.issuersLoading = function () {
        this.ui.showLoader("<h4>Loading contract data...</h4>");
    };
    SelectIssuers.prototype.populateIssuers = function () {
        var e_1, _a;
        var _this = this;
        var html = "";
        var issuers = this.client.getTokenStore().getCurrentIssuers();
        for (var issuerKey in issuers) {
            var data = issuers[issuerKey];
            var tokens = this.client.getTokenStore().getIssuerTokens(issuerKey);
            var title = data.title ?
                data.title : data.collectionID.replace(/[-,_]+/g, " ");
            html += this.issuerConnectMarkup(title, data.image, issuerKey, tokens);
        }
        this.issuerListContainer.innerHTML = html;
        try {
            for (var _b = __values(this.issuerListContainer.getElementsByClassName('img-container-tn')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                var params = {
                    src: elem.getAttribute('data-image-src'),
                    title: elem.getAttribute('data-token-title'),
                };
                new IconView(elem, params).render();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.issuerListContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('connect-btn-tn')) {
                _this.connectTokenIssuer(e);
            }
            else if (e.target.classList.contains('tokens-btn-tn')) {
                var issuer = e.target.parentNode.dataset.issuer;
                _this.navigateToTokensView(issuer);
            }
        });
    };
    SelectIssuers.prototype.issuerConnectMarkup = function (title, image, issuer, tokens) {
        return "\n            <li class=\"issuer-connect-banner-tn\" data-issuer=\"".concat(issuer, "\" role=\"menuitem\">\n              <div tabindex=\"0\" style=\"display: flex; align-items: center;\">\n                <div class=\"img-container-tn issuer-icon-tn shimmer-tn\" data-image-src=\"").concat(image, "\" data-token-title=\"").concat(title, "\"></div>\n                <p class=\"issuer-connect-title\">").concat(title, "</p>\n              </div>\n              <button aria-label=\"connect with the token issuer ").concat(issuer, "\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-controls=\"token-list-container-tn\" \n\t\t\t\t\tclass=\"connect-btn-tn\"\n\t\t\t\t\tstyle=\"").concat(((tokens === null || tokens === void 0 ? void 0 : tokens.length) ? "display: none;" : ""), "\"\n\t\t\t\t\tdata-issuer=\"").concat(issuer, "\"\n\t\t\t\t\t").concat(this.client.issuersLoaded === true ? "" : "disabled", "\n\t\t\t\t>\n\t\t\t\t").concat(this.client.issuersLoaded === true ? "Load" : '<div class="lds-ellipsis lds-ellipsis-sm" style=""><div></div><div></div><div></div><div></div></div>', "\n\t\t\t  </button>\n              <button aria-label=\"tokens available from token issuer ").concat(issuer, "\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-controls=\"token-list-container-tn\" \n              \t\t\tclass=\"tokens-btn-tn\" style=\"").concat(((tokens === null || tokens === void 0 ? void 0 : tokens.length) ? "display: block;" : ""), "\" data-issuer=\"").concat(issuer, "\">").concat(tokens === null || tokens === void 0 ? void 0 : tokens.length, " token").concat(((tokens === null || tokens === void 0 ? void 0 : tokens.length) ? "s" : ""), " available</button>\n            </li>\n        ");
    };
    SelectIssuers.prototype.backToIssuers = function () {
        this.tokensContainer.style.display = 'none';
        this.viewContainer.querySelector(".issuer-slider-tn").classList.toggle("open");
    };
    SelectIssuers.prototype.autoLoadTokens = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.tokenAutoLoad(this.issuerLoading.bind(this), function (issuer, tokens) {
                            if (!(tokens === null || tokens === void 0 ? void 0 : tokens.length)) {
                                var connectBtn = _this.issuerListContainer.querySelector("[data-issuer*=\"".concat(issuer, "\"] .connect-btn-tn"));
                                if (connectBtn)
                                    connectBtn.innerText = "Load";
                                return;
                            }
                            _this.issuerConnected(issuer, tokens, false);
                        }, true)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SelectIssuers.prototype.connectTokenIssuer = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, issuer, tokens, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = event.target.dataset;
                        issuer = data.issuer;
                        tokens = [];
                        this.ui.showLoader("<h4>Loading tokens...</h4>");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.client.connectTokenIssuer(issuer)];
                    case 2:
                        tokens = _a.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        logger(2, err_1);
                        this.ui.showError(err_1);
                        this.client.eventSender("error", { issuer: issuer, error: err_1 });
                        return [2];
                    case 4:
                        this.ui.dismissLoader();
                        if (!(tokens === null || tokens === void 0 ? void 0 : tokens.length)) {
                            this.ui.showError("No tokens found! ".concat(this.client.getNoTokenMsg(issuer)));
                            return [2];
                        }
                        this.issuerConnected(issuer, tokens);
                        return [2];
                }
            });
        });
    };
    SelectIssuers.prototype.issuerLoading = function (issuer) {
        var tokensBtn = this.issuerListContainer.querySelector("[data-issuer*=\"".concat(issuer, "\"] .tokens-btn-tn"));
        if (tokensBtn)
            tokensBtn.style.display = "none";
        var connectBtn = this.issuerListContainer.querySelector("[data-issuer*=\"".concat(issuer, "\"] .connect-btn-tn"));
        if (connectBtn) {
            connectBtn.innerHTML = '<div class="lds-ellipsis lds-ellipsis-sm" style=""><div></div><div></div><div></div><div></div></div>';
            connectBtn.style.display = "block";
        }
    };
    SelectIssuers.prototype.issuerConnected = function (issuer, tokens, showTokens) {
        var _this = this;
        if (showTokens === void 0) { showTokens = true; }
        var connectBtn = this.issuerListContainer.querySelector("[data-issuer*=\"".concat(issuer, "\"] .connect-btn-tn"));
        var tokenBtn = this.issuerListContainer.querySelector("[data-issuer*=\"".concat(issuer, "\"] .tokens-btn-tn"));
        if (!connectBtn || !tokenBtn) {
            logger(2, "Could not find button handler");
        }
        connectBtn.style.display = "none";
        connectBtn.setAttribute('tabIndex', -1);
        tokenBtn.style.display = "block";
        tokenBtn.innerHTML = "".concat(tokens.length, " token").concat((tokens.length > 1 ? "s" : ""), " available");
        tokenBtn.setAttribute('aria-label', "Navigate to select from ".concat(tokens.length, " of your ").concat(issuer, " tokens"));
        tokenBtn.setAttribute('tabIndex', 1);
        if (showTokens)
            setTimeout(function () {
                _this.navigateToTokensView(issuer);
            }, 250);
    };
    SelectIssuers.prototype.navigateToTokensView = function (issuer) {
        this.updateTokensView(issuer);
        this.showTokenView(issuer);
    };
    SelectIssuers.prototype.updateTokensView = function (issuer) {
        var _a;
        this.tokensContainer.style.display = 'block';
        this.tokensContainer.scrollTo(0, 0);
        var tokenStore = this.client.getTokenStore();
        var config = tokenStore.getCurrentIssuers()[issuer];
        var tokenData = tokenStore.getIssuerTokens(issuer);
        if (config.title)
            document.getElementsByClassName("headline-tn token-name")[0].innerHTML = config.title;
        var tokens = [];
        tokenData === null || tokenData === void 0 ? void 0 : tokenData.map(function (t, i) {
            var _a, _b, _c, _d;
            var isSelected = false;
            (_a = tokenStore.getSelectedTokens()[issuer]) === null || _a === void 0 ? void 0 : _a.tokens.map(function (st) {
                if (JSON.stringify(t) === JSON.stringify(st))
                    isSelected = true;
            });
            if (config.onChain === false) {
                var title = config.title, image = config.image;
                tokens.push({
                    data: t,
                    tokenIssuerKey: issuer,
                    index: (_c = ((_b = t.tiketIdNumber) !== null && _b !== void 0 ? _b : t.ticketIdNumber)) !== null && _c !== void 0 ? _c : i,
                    title: title,
                    image: image,
                    toggleState: isSelected,
                    hideToggle: config === null || config === void 0 ? void 0 : config.hideToggle
                });
            }
            else {
                var tokenId = (_d = t.tokenId) !== null && _d !== void 0 ? _d : i.toString();
                tokens.push({
                    data: t,
                    tokenIssuerKey: issuer,
                    index: tokenId,
                    title: t.title,
                    image: t.image,
                    toggleState: isSelected,
                    hideToggle: config === null || config === void 0 ? void 0 : config.hideToggle
                });
            }
        });
        (_a = this.tokenListView) === null || _a === void 0 ? void 0 : _a.update({ issuer: issuer, tokens: tokens });
    };
    SelectIssuers.prototype.showTokenView = function (issuer) {
        this.viewContainer.querySelector(".issuer-slider-tn").classList.toggle("open");
    };
    return SelectIssuers;
}(AbstractView));
export { SelectIssuers };
//# sourceMappingURL=select-issuers.js.map