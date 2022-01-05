import { readMagicUrl, storeMagicURL, rawTokenCheck } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
var Outlet = (function () {
    function Outlet(config) {
        var _this = this;
        this.eventReciever = function (event) {
            var _a, _b;
            switch (event.data.evt) {
                case 'getTokens':
                    var filter = (_b = (_a = event.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.filter;
                    var storageTokens = _this.prepareTokenOutput(_this.tokenName, filter);
                    _this.eventSender.emitTokens(storageTokens);
                    break;
                case 'getTokenProof':
                    var unsignedToken = JSON.parse(JSON.stringify(event.data.data.unsignedToken));
                    rawTokenCheck(unsignedToken, _this.tokenIssuer).then(function (tokenProof) {
                        _this.eventSender.emitTokenProof(tokenProof);
                    });
                    break;
            }
        };
        this.eventSender = {
            emitTokens: function (tokens) {
                window.parent.postMessage({
                    evt: "tokens",
                    data: { issuer: _this.tokenName, tokens: tokens }
                }, document.referrer);
            },
            emitTokenProof: function (tokenProof) {
                window.parent.postMessage({
                    evt: 'proof',
                    data: { tokenProof: JSON.stringify(tokenProof) }
                }, document.referrer);
            },
        };
        var tokenName = config.tokenName;
        this.tokenName = tokenName;
        this.tokenIssuer = tokenLookup[tokenName];
        requiredParams(tokenLookup[tokenName], "Please provide the token name when installing token outlet");
        var _a = this.tokenIssuer, tokenUrlName = _a.tokenUrlName, tokenSecretName = _a.tokenSecretName, tokenIdName = _a.tokenIdName, itemStorageKey = _a.itemStorageKey;
        var tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);
        if (tokens && tokens.length) {
            storeMagicURL(tokens, itemStorageKey);
        }
        var urlParams = new URLSearchParams(window.location.search);
        var action = urlParams.get('action');
        if (action === 'get-tokens') {
            this.sendTokens(tokenName);
        }
        else if (action === 'get-token-proof') {
            var token = urlParams.get('token');
            this.sendTokenProof(token);
        }
        else {
            requiredParams(null, "Please provide an action");
        }
        window.addEventListener('message', function (event) { _this.eventReciever(event); }, false);
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
    Outlet.prototype.sendTokenProof = function (token) {
        var _this = this;
        if (!token)
            return 'error';
        var unsignedToken = JSON.parse(token);
        rawTokenCheck(unsignedToken, this.tokenIssuer).then(function (tokenObj) {
            var opener = window.opener;
            var referrer = document.referrer;
            if (opener && referrer) {
                var pUrl = new URL(referrer);
                var parentOrigin_1 = pUrl.origin;
                window.authenticator.getAuthenticationBlob(tokenObj, function (tokenProof) {
                    opener.postMessage({ evt: "proof", data: { proof: tokenProof, issuer: _this.tokenName } }, parentOrigin_1);
                });
            }
        });
    };
    Outlet.prototype.sendTokens = function (tokenName) {
        var opener = window.opener;
        var referrer = document.referrer;
        if (opener && referrer) {
            var pUrl = new URL(referrer);
            var parentOrigin = pUrl.origin;
            var urlParams = new URLSearchParams(window.location.search);
            var findFilter = urlParams.get('filter');
            var filter = findFilter ? JSON.parse(findFilter) : {};
            var storageTokens = this.prepareTokenOutput(tokenName, filter);
            opener.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] } }, parentOrigin);
        }
    };
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map