import { readMagicUrl, storeMagicURL } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
var Outlet = (function () {
    function Outlet(config) {
        var _this = this;
        this.eventReciever = function (data) {
            switch (data.evt) {
                case 'getTokens':
                    var storageTokens = _this.prepareTokenOutput(_this.tokenName);
                    _this.eventSender.emitTokens(storageTokens);
                    break;
                case 'getTokenProof':
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
    Outlet.prototype.prepareTokenOutput = function (tokenName) {
        var storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);
        if (!storageTokens)
            return [];
        var decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);
        var filteredTokens = filterTokens(decodedTokens, {});
        return filteredTokens;
    };
    Outlet.prototype.sendTokens = function (tokenName) {
        var _this = this;
        var opener = window.opener;
        var referrer = document.referrer;
        var storageTokens = this.prepareTokenOutput(tokenName);
        if (opener && referrer) {
            var pUrl = new URL(referrer);
            var parentOrigin = pUrl.origin;
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