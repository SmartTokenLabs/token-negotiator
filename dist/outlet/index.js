import { readMagicUrl, storeMagicURL } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
var Outlet = (function () {
    function Outlet(config) {
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
        var opener = window.opener;
        var parentURL = document.referrer;
        if (opener && parentURL) {
            var pUrl = new URL(parentURL);
            var parentOrigin = pUrl.origin;
            var storageTokens = this.prepareTokenOutput(tokenName);
            opener.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] } }, parentOrigin);
        }
    };
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map