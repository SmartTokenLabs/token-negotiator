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
import { IconView } from "./icon-view";
import { logger } from "../../utils";
var TokenList = (function (_super) {
    __extends(TokenList, _super);
    function TokenList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadedCount = 0;
        _this.numberToLoad = 25;
        _this.autoLoadMore = true;
        return _this;
    }
    TokenList.prototype.init = function () {
        var _this = this;
        this.viewContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('mobileToggle-tn')) {
                _this.tokenToggleSelection();
            }
            else if (e.target.classList.contains('load-more-btn-tn')) {
                _this.loadMoreTokens();
            }
        });
    };
    TokenList.prototype.render = function () {
        var _this = this;
        this.loadedCount = 0;
        this.viewContainer.innerHTML = this.getTokenListItems();
        this.renderIcons();
        if (this.autoLoadMore) {
            var loadMoreElem = this.viewContainer.querySelector('.load-more-tn');
            if (loadMoreElem) {
                if (!this.interceptObs)
                    this.interceptObs = new IntersectionObserver(function (payload) {
                        if (payload[0].isIntersecting) {
                            _this.loadMoreTokens();
                        }
                    }, { root: document.querySelector('.view-content-tn') });
                this.interceptObs.observe(loadMoreElem);
            }
        }
    };
    TokenList.prototype.getTokenListItems = function () {
        var html = "";
        var newCount = Math.min((this.loadedCount + this.numberToLoad), this.params.tokens.length);
        for (var i = this.loadedCount; i < newCount; i++) {
            html += this.createTokenMarkup(this.params.tokens[i]);
        }
        this.loadedCount = newCount;
        if (this.loadedCount < this.params.tokens.length)
            html += this.createLoadMoreMarkup();
        return html;
    };
    TokenList.prototype.loadMoreTokens = function () {
        var loadMoreElem = this.viewContainer.getElementsByClassName('load-more-tn')[0];
        if (this.interceptObs)
            this.interceptObs.unobserve(loadMoreElem);
        loadMoreElem.insertAdjacentHTML('afterend', this.getTokenListItems());
        loadMoreElem.remove();
        this.renderIcons();
        if (this.interceptObs) {
            loadMoreElem = this.viewContainer.querySelector('.load-more-tn');
            if (loadMoreElem)
                this.interceptObs.observe(loadMoreElem);
        }
    };
    TokenList.prototype.renderIcons = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.viewContainer.getElementsByClassName('img-container-tn')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var elem = _c.value;
                if (elem.querySelector('img'))
                    continue;
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
    };
    TokenList.prototype.tokenToggleSelection = function () {
        var selectedTokens = this.client.getTokenStore().getSelectedTokens();
        this.viewContainer.querySelectorAll('.mobileToggle-tn').forEach(function (token, index) {
            if (index === 0) {
                selectedTokens[token.dataset.key] = {};
                selectedTokens[token.dataset.key]['tokens'] = [];
            }
            if (token.checked === true) {
                var output = JSON.parse(token.dataset.token);
                selectedTokens[token.dataset.key].tokens.push(output);
            }
        });
        logger(2, "Tokens selected:");
        logger(2, selectedTokens);
        this.client.updateSelectedTokens(selectedTokens);
    };
    TokenList.prototype.createLoadMoreMarkup = function () {
        return "\n            <li class='load-more-tn'>\n                <button class=\"load-more-btn-tn btn-tn\">Load More</button>\n            </li>\n        ";
    };
    TokenList.prototype.createTokenMarkup = function (config) {
        var tokenIssuerKey = config.tokenIssuerKey, title = config.title, data = config.data, index = config.index, image = config.image, toggleState = config.toggleState, hideToggle = config.hideToggle;
        var tokenId = index.length > 15 ?
            (index.substring(0, 5) + "..." + index.substring(index.length - 5, index.length))
            : index;
        var isChecked = toggleState ? 'checked' : '';
        return "\n            <li class='token-tn'>\n              <div class=\"img-container-tn image-tn shimmer-tn\" data-image-src=\"".concat(image, "\" data-token-title=\"").concat(title, "\"></div>\n              <div class='data-tn'>\n                  <p class='token-title-tn'>").concat(title, "</p>\n                  <p class='detail-tn' title=\"").concat(index, "\">#").concat((tokenId), "</p>\n                </div>") +
            (hideToggle ? "" : "<div class='toggle-tn'>\n                <input ".concat(isChecked, " data-key='").concat(tokenIssuerKey, "' data-token='").concat(JSON.stringify(data), "' data-index='").concat(index, "' type='checkbox' name='toggle").concat(index, "' class='mobileToggle-tn toggle-tn' id='toggle").concat(index, "'>\n                <label for='toggle").concat(index, "'></label>\n              </div>")) +
            "</li>\n        ";
    };
    return TokenList;
}(AbstractView));
export { TokenList };
//# sourceMappingURL=token-list.js.map