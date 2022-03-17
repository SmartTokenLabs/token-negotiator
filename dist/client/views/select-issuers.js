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
var SelectIssuers = (function (_super) {
    __extends(SelectIssuers, _super);
    function SelectIssuers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectIssuers.prototype.render = function () {
        this.viewContainer.innerHTML = "\n            <div class=\"inner-content-tn issuer-slider-tn\">\n              <div class=\"issuer-view-tn scroll-tn\">\n                <div class=\"brand-tn\"></div>\n                <div class=\"headline-container-tn\">\n                  <p class=\"headline-tn\">" + this.params.options.issuerHeading + "</p>\n                </div>\n                <ul class=\"token-issuer-list-container-tn\" role=\"menubar\"></ul>\n              </div>\n              <div class=\"token-view-tn scroll-tn\" style=\"display: none;\">\n                <div class=\"brand-tn\"></div>\n                <div style=\"display: flex\">\n                  <button aria-label=\"back to token issuer menu\" class=\"back-to-menu-tn\">\n                    <svg style=\"position: relative; top: 1px;\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <g fill=\"none\" fill-rule=\"evenodd\">\n                            <circle fill=\"#EFEFEF\" cx=\"16\" cy=\"16\" r=\"16\"/>\n                            <path d=\"m10.2 15.8 7.173 7.56c.55.587 1.453.587 2.01 0a1.554 1.554 0 0 0 0-2.12l-5.158-5.44 5.157-5.44a1.554 1.554 0 0 0 0-2.12 1.367 1.367 0 0 0-2.009 0L10.2 15.8z\" fill=\"#000\" fill-rule=\"nonzero\"/>\n                        </g>\n                    </svg>\n                  </button>\n                  <p class=\"headline-tn token-name\">Token Name Here</p>\n                </div>\n                <ul class=\"token-list-container-tn\" role=\"menubar\"></ul>\n              </div>\n            </div>\n        ";
        this.viewContainer.querySelector('.back-to-menu-tn').addEventListener('click', this.backToIssuers.bind(this));
        this.issuerListContainer = document.querySelector(".token-issuer-list-container-tn");
        this.tokensContainer = document.getElementsByClassName("token-view-tn")[0];
        if (!this.issuerListContainer) {
            console.log("Element .token-issuer-list-container-tn not found");
            return;
        }
        this.populateIssuers();
        var tokensListElem = this.tokensContainer.getElementsByClassName("token-list-container-tn")[0];
        this.tokenListView = new TokenList(this.client, this.popup, tokensListElem, {});
    };
    SelectIssuers.prototype.populateIssuers = function () {
        var e_1, _a;
        var _this = this;
        var data = this.client.getTokenData();
        var html = "";
        data.offChainTokens.tokenKeys.map(function (issuer) {
            html += _this.issuerConnectMarkup(data.tokenLookup[issuer].title, data.tokenLookup[issuer].emblem, issuer);
        });
        data.onChainTokens.tokenKeys.map(function (issuer) {
            html += _this.issuerConnectMarkup(data.tokenLookup[issuer].title, data.tokenLookup[issuer].emblem, issuer);
        });
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
                _this.navigateToTokensView(e);
            }
        });
    };
    SelectIssuers.prototype.issuerConnectMarkup = function (title, image, issuer) {
        return "\n            <li class=\"issuer-connect-banner-tn\" data-issuer=\"" + issuer + "\" role=\"menuitem\">\n              <div style=\"display: flex; align-items: center;\">\n                <div class=\"img-container-tn issuer-icon-tn shimmer-tn\" data-image-src=\"" + image + "\" data-token-title=\"" + title + "\"></div>\n                <p class=\"issuer-connect-title\">" + title + "</p>\n              </div>\n              <button aria-label=\"connect with the token issuer " + issuer + "\" aria-hidden=\"false\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-controls=\"token-list-container-tn\" class=\"connect-btn-tn\" data-issuer=\"" + issuer + "\">Connect</button>\n              <button aria-label=\"tokens available from token issuer " + issuer + "\" aria-hidden=\"true\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-controls=\"token-list-container-tn\" class=\"tokens-btn-tn\" data-issuer=\"" + issuer + "\">Tokens Available</button>\n            </li>\n        ";
    };
    SelectIssuers.prototype.backToIssuers = function () {
        this.tokensContainer.style.display = 'none';
        this.viewContainer.classList.toggle("open");
        var connectBtns = this.viewContainer.querySelectorAll(".connect-btn-tn");
        var tokenBtns = this.viewContainer.querySelectorAll(".tokens-btn-tn");
        connectBtns.forEach(function (userItem) {
            userItem.setAttribute('aria-expanded', false);
        });
        tokenBtns.forEach(function (userItem) {
            userItem.setAttribute('aria-expanded', false);
        });
        var issuerViewEl = this.viewContainer.querySelector(".issuer-view-tn");
        var tokenViewEl = this.viewContainer.querySelector(".token-view-tn");
        issuerViewEl.setAttribute('aria-hidden', true);
        tokenViewEl.setAttribute('aria-hidden', false);
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
                        this.popup.showLoader("<h4>Loading tokens...</h4>");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.client.connectTokenIssuer(issuer)];
                    case 2:
                        tokens = _a.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        this.popup.showError(err_1);
                        return [2];
                    case 4:
                        this.popup.dismissLoader();
                        this.issuerConnected(issuer, tokens);
                        return [2];
                }
            });
        });
    };
    SelectIssuers.prototype.issuerConnected = function (issuer, tokens) {
        var connectBtn = this.issuerListContainer.querySelector("[data-issuer*=\"" + issuer + "\"] .connect-btn-tn");
        var tokenBtn = this.issuerListContainer.querySelector("[data-issuer*=\"" + issuer + "\"] .tokens-btn-tn");
        if (!connectBtn || !tokenBtn) {
            console.log("Could not find button handler");
        }
        connectBtn.style.display = "none";
        connectBtn.setAttribute('tabIndex', -1);
        tokenBtn.style.display = "block";
        tokenBtn.innerHTML = tokens.length + " token/s available";
        tokenBtn.setAttribute('aria-label', "Navigate to select from " + tokens.length + " of your " + issuer + " tokens");
        tokenBtn.setAttribute('tabIndex', 1);
    };
    SelectIssuers.prototype.navigateToTokensView = function (event) {
        var issuer = event.target.parentNode.dataset.issuer;
        this.updateTokensView(issuer);
        this.showTokenView(issuer);
    };
    SelectIssuers.prototype.updateTokensView = function (issuer) {
        var _a;
        this.tokensContainer.style.display = 'block';
        this.tokensContainer.scrollTo(0, 0);
        var tokenData = this.client.getTokenData();
        var config = this.client.getTokenData().tokenLookup[issuer];
        var location = config.onChain === false ? 'offChainTokens' : 'onChainTokens';
        document.getElementsByClassName("headline-tn token-name")[0].innerHTML = config.title;
        var tokens = [];
        tokenData[location][issuer].tokens.map(function (t, i) {
            var _a;
            var title = config.title, emblem = config.emblem;
            var isSelected = false;
            (_a = tokenData.selectedTokens[issuer]) === null || _a === void 0 ? void 0 : _a.tokens.map(function (st, si) {
                if (JSON.stringify(t) === JSON.stringify(st))
                    isSelected = true;
            });
            var nftImage = t.image;
            if (!nftImage)
                nftImage = t.image_url;
            if (!nftImage)
                nftImage = emblem;
            var nftTitle = t.name;
            if (!nftTitle)
                nftTitle = title;
            tokens.push({
                data: t,
                tokenIssuerKey: issuer,
                index: i,
                title: nftTitle,
                emblem: nftImage,
                toggleState: isSelected
            });
        });
        (_a = this.tokenListView) === null || _a === void 0 ? void 0 : _a.update({ issuer: issuer, tokens: tokens });
    };
    SelectIssuers.prototype.showTokenView = function (issuer) {
        this.viewContainer.classList.toggle("open");
        var connectBtn = this.viewContainer.querySelector("[data-issuer*=\"" + issuer + "\"] .connect-btn-tn");
        var tokenBtn = this.viewContainer.querySelector("[data-issuer*=\"" + issuer + "\"] .tokens-btn-tn");
        connectBtn.setAttribute('aria-expanded', true);
        tokenBtn.setAttribute('aria-expanded', false);
        var issuerViewEl = this.viewContainer.querySelector(".issuer-view-tn");
        var tokenViewEl = this.viewContainer.querySelector(".token-view-tn");
        issuerViewEl.setAttribute('aria-hidden', false);
        tokenViewEl.setAttribute('aria-hidden', true);
    };
    return SelectIssuers;
}(AbstractView));
export { SelectIssuers };
//# sourceMappingURL=select-issuers.js.map