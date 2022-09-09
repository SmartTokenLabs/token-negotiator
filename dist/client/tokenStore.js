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
import { logger } from "../utils";
var TokenStore = (function () {
    function TokenStore(autoEnableTokens) {
        this.currentIssuers = {};
        this.tokens = {};
        this.tokenLookup = {};
        this.selectedTokens = {};
        this.autoEnableTokens = autoEnableTokens;
    }
    TokenStore.prototype.updateIssuers = function (issuers) {
        if (Object.keys(this.currentIssuers).length > 0) {
            this.selectedTokens = {};
        }
        this.prePopulateTokenLookupStore(issuers);
    };
    TokenStore.prototype.clearCachedTokens = function (onChain) {
        for (var i in this.tokens) {
            if (onChain !== undefined && onChain !== this.tokenLookup[i].onChain)
                continue;
            this.tokens[i] = [];
        }
        this.selectedTokens = {};
    };
    TokenStore.prototype.hasOnChainTokens = function () {
        for (var i in this.currentIssuers) {
            if (this.currentIssuers[i])
                return true;
        }
        return false;
    };
    TokenStore.prototype.getCurrentIssuers = function (onChainFilter) {
        var current = {};
        for (var collectionId in this.currentIssuers) {
            if (onChainFilter === undefined || onChainFilter === this.currentIssuers[collectionId])
                current[collectionId] = this.tokenLookup[collectionId];
        }
        return current;
    };
    TokenStore.prototype.getCurrentTokens = function (onChainFilter) {
        var current = {};
        for (var collectionId in this.currentIssuers) {
            if (onChainFilter === undefined || onChainFilter === this.currentIssuers[collectionId])
                current[collectionId] = this.tokens[collectionId];
        }
        return current;
    };
    TokenStore.prototype.hasUnloadedIssuers = function () {
        var issuers = this.getCurrentIssuers(true);
        for (var i in issuers) {
            if (!issuers[i].title)
                return true;
        }
        return false;
    };
    TokenStore.prototype.hasUnloadedTokens = function () {
        var e_1, _a;
        try {
            for (var _b = __values(Object.values(this.getCurrentTokens())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var tokens = _c.value;
                if (tokens.length === 0)
                    return true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    TokenStore.prototype.getIssuerTokens = function (issuer) {
        if (this.tokens[issuer])
            return this.tokens[issuer];
        return null;
    };
    TokenStore.prototype.setTokens = function (issuer, tokens) {
        this.tokens[issuer] = tokens;
        if (this.autoEnableTokens)
            this.selectedTokens[issuer] = { tokens: tokens };
    };
    TokenStore.prototype.getSelectedTokens = function () {
        return this.selectedTokens;
    };
    TokenStore.prototype.setSelectedTokens = function (selectedTokens) {
        this.selectedTokens = selectedTokens;
    };
    TokenStore.prototype.prePopulateTokenLookupStore = function (issuers) {
        var _this = this;
        var collectionIds = {};
        issuers.forEach(function (issuer, i) {
            if (!issuer.collectionID)
                return;
            if (issuer.onChain === undefined)
                issuer.onChain = true;
            issuer.collectionID = _this.formatCollectionID(issuer.collectionID);
            if (collectionIds[issuer.collectionID] !== undefined) {
                logger(1, "duplicate collectionID key ".concat(issuer.collectionID, ", use unique keys per collection."));
                return;
            }
            if ("chain" in issuer)
                issuer.chain = _this.formatCollectionChain(issuer.chain);
            if (_this.tokens[issuer.collectionID] !== undefined) {
                if (_this.autoEnableTokens && _this.tokens[issuer.collectionID].length)
                    _this.selectedTokens[issuer.collectionID] = { tokens: _this.tokens[issuer.collectionID] };
            }
            else {
                _this.tokens[issuer.collectionID] = [];
            }
            if (!_this.tokenLookup[issuer.collectionID])
                _this.updateTokenLookupStore(issuer.collectionID, issuer);
            collectionIds[issuer.collectionID] = issuer.onChain;
        });
        this.currentIssuers = collectionIds;
    };
    TokenStore.prototype.updateTokenLookupStore = function (tokenKey, data) {
        this.tokenLookup[tokenKey] = __assign(__assign({}, this.tokenLookup[tokenKey]), data);
    };
    TokenStore.prototype.formatCollectionChain = function (chain) {
        return chain.toLowerCase();
    };
    TokenStore.prototype.formatCollectionID = function (collectionID) {
        var formatedCollectionID = collectionID;
        if (/[A-Z]+/g.test(collectionID) || /\s+/g.test(collectionID)) {
            formatedCollectionID = collectionID.replace(/\s+/g, "-").toLowerCase();
            logger(1, "Token Negotiator: Spaces or capital letters found in collectionID definition ".concat(collectionID, ", this has been re-formatted to ").concat(formatedCollectionID));
            collectionID = formatedCollectionID;
        }
        return collectionID;
    };
    return TokenStore;
}());
export { TokenStore };
//# sourceMappingURL=tokenStore.js.map