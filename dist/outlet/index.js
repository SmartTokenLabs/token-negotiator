import { readMagicUrl, storeMagicURL, rawTokenCheck } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
var Outlet = (function () {
    function Outlet(config) {
        var _this = this;
        this.eventReciever = function (data) {
            var _a;
            switch (data.evt) {
                case 'getTokens':
                    var filter = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.filter;
                    var storageTokens = _this.prepareTokenOutput(_this.tokenName, filter);
                    _this.eventSender.emitTokens(storageTokens);
                    break;
                case 'getTokenProof':
                    rawTokenCheck(data.unsignedToken, _this.config.itemStorageKey);
                    break;
            }
        };
        this.eventSender = {
            emitTokens: function (tokens) {
                window.parent.postMessage({
                    evt: "tokens",
                    data: { issuer: _this.tokenName, tokens: tokens }
                }, "*");
            },
            emitTokenProof: function (tokenProof) {
                window.parent.postMessage({
                    evt: 'tokenProof',
                    tokenProof: tokenProof
                }, "*");
            },
        };
        var tokenName = config.tokenName;
        this.tokenName = tokenName;
        requiredParams(tokenLookup[tokenName], "Please provide the token name");
        var _a = tokenLookup[tokenName], tokenUrlName = _a.tokenUrlName, tokenSecretName = _a.tokenSecretName, tokenIdName = _a.tokenIdName, itemStorageKey = _a.itemStorageKey;
        var tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);
        if (tokens && tokens.length) {
            storeMagicURL(tokens, itemStorageKey);
        }
        this.sendTokens(tokenName);
    }
    ;
    Outlet.prototype.prepareTokenOutput = function (tokenName, filter) {
        var storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);
        if (!storageTokens)
            return [];
        var decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);
        var filteredTokens = filterTokens(decodedTokens, filter);
        return filteredTokens;
    };
    Outlet.prototype.sendTokens = function (tokenName) {
        var _this = this;
        var opener = window.opener;
        var referrer = document.referrer;
        if (opener && referrer) {
            var pUrl = new URL(referrer);
            var parentOrigin = pUrl.origin;
            var storageTokens = this.prepareTokenOutput(tokenName, {});
            opener.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] } }, parentOrigin);
        }
        else {
            window.addEventListener('message', function (event) { _this.eventReciever(event.data); }, false);
        }
    };
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map