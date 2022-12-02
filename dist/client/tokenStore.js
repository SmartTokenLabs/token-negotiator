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
    function TokenStore(autoEnableTokens, tokenPersistenceTTL) {
        this.autoEnableTokens = autoEnableTokens;
        this.tokenPersistenceTTL = tokenPersistenceTTL;
        this.currentIssuers = {};
        this.tokenData = {};
        this.tokenLookup = {};
        this.selectedTokens = {};
        if (this.tokenPersistenceTTL > 0)
            this.loadTokenStore();
    }
    TokenStore.prototype.loadTokenStore = function () {
        var tokenStoreData = JSON.parse(localStorage.getItem(TokenStore.LOCAL_STORAGE_KEY));
        if (!tokenStoreData)
            return;
        for (var collectionId in tokenStoreData.tokenLookup) {
            var lookup = tokenStoreData.tokenLookup[collectionId];
            if (lookup.timestamp + (this.tokenPersistenceTTL * 1000) > Date.now()) {
                this.tokenLookup[collectionId] = lookup;
            }
        }
        for (var collectionId in tokenStoreData.tokenData) {
            var tokenData = tokenStoreData.tokenData[collectionId];
            if (tokenData.timestamp + (this.tokenPersistenceTTL * 1000) > Date.now()) {
                this.tokenData[collectionId] = tokenData;
            }
        }
        this.saveTokenStore();
    };
    TokenStore.prototype.saveTokenStore = function () {
        if (this.tokenPersistenceTTL > 0)
            localStorage.setItem(TokenStore.LOCAL_STORAGE_KEY, JSON.stringify({
                tokenLookup: this.tokenLookup,
                tokenData: this.tokenData
            }));
    };
    TokenStore.prototype.updateIssuers = function (issuers) {
        if (Object.keys(this.currentIssuers).length > 0) {
            this.selectedTokens = {};
        }
        this.prePopulateTokenLookupStore(issuers);
    };
    TokenStore.prototype.clearCachedTokens = function (onChain) {
        for (var i in this.tokenData) {
            if (onChain !== undefined && onChain !== this.tokenLookup[i].onChain)
                continue;
            delete this.tokenData[i];
        }
        this.selectedTokens = {};
        this.saveTokenStore();
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
        var _a, _b;
        var current = {};
        for (var collectionId in this.currentIssuers) {
            if (onChainFilter === undefined || onChainFilter === this.currentIssuers[collectionId])
                current[collectionId] = (_b = (_a = this.tokenData[collectionId]) === null || _a === void 0 ? void 0 : _a.tokens) !== null && _b !== void 0 ? _b : [];
        }
        return current;
    };
    TokenStore.prototype.getTotalTokenCount = function (onChainFilter) {
        var tokens = this.getCurrentTokens(onChainFilter);
        return Object.keys(tokens).reduce(function (count, key) { return count + tokens[key].length; }, 0);
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
        var _a;
        if (this.tokenData[issuer])
            return (_a = this.tokenData[issuer].tokens) !== null && _a !== void 0 ? _a : [];
        return [];
    };
    TokenStore.prototype.setTokens = function (issuer, tokens) {
        this.tokenData[issuer] = { timestamp: Date.now(), tokens: tokens };
        this.saveTokenStore();
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
            var _a;
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
            if (_this.tokenData[issuer.collectionID] !== undefined) {
                if (_this.autoEnableTokens && ((_a = _this.tokenData[issuer.collectionID].tokens) === null || _a === void 0 ? void 0 : _a.length))
                    _this.selectedTokens[issuer.collectionID] = { tokens: _this.tokenData[issuer.collectionID].tokens };
            }
            if (!_this.tokenLookup[issuer.collectionID])
                _this.updateTokenLookupStore(issuer.collectionID, issuer, false);
            collectionIds[issuer.collectionID] = issuer.onChain;
        });
        this.currentIssuers = collectionIds;
    };
    TokenStore.prototype.updateTokenLookupStore = function (tokenKey, data, save) {
        if (save === void 0) { save = true; }
        this.tokenLookup[tokenKey] = __assign(__assign(__assign({}, this.tokenLookup[tokenKey]), data), { timestamp: Date.now() });
        if (save)
            this.saveTokenStore();
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
    TokenStore.LOCAL_STORAGE_KEY = "tn-tokenStore";
    return TokenStore;
}());
export { TokenStore };
//# sourceMappingURL=tokenStore.js.map