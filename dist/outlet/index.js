import { readMagicUrl, storeMagicURL, rawTokenCheck } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
var Outlet = (function () {
    function Outlet(config) {
        var _this = this;
        this.eventSender = {
            emitCookieSupport: function () {
                window.parent.postMessage({
                    evt: "cookie-support-check",
                    data: { thirdPartyCookies: localStorage.getItem('cookie-support-check') }
                }, document.referrer);
            },
            emitTabIssuerTokens: function (opener, storageTokens, parentOrigin) {
                opener.postMessage({
                    evt: "set-tab-issuer-tokens",
                    data: {
                        issuer: _this.tokenName,
                        tokens: storageTokens
                    }
                }, parentOrigin);
            },
            emitIframeIssuerTokensPassive: function (tokens) {
                window.parent.postMessage({
                    evt: "set-iframe-issuer-tokens-passive",
                    data: {
                        issuer: _this.tokenName,
                        tokens: tokens
                    }
                }, document.referrer);
            },
            emitIframeIssuerTokensActive: function (tokens) {
                window.parent.postMessage({
                    evt: "set-iframe-issuer-tokens-active",
                    data: {
                        issuer: _this.tokenName,
                        tokens: tokens
                    }
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
        this.pageOnLoadEventHandler();
    }
    ;
    Outlet.prototype.getDataFromQuery = function (itemKey) {
        var urlParams = new URLSearchParams(window.location.search);
        var item = urlParams.get(itemKey);
        return item ? item : undefined;
    };
    Outlet.prototype.getFilter = function () {
        var filter = this.getDataFromQuery('filter');
        return filter ? JSON.parse(filter) : {};
    };
    Outlet.prototype.pageOnLoadEventHandler = function () {
        var action = this.getDataFromQuery('action');
        switch (action) {
            case 'get-iframe-issuer-tokens':
                var negotiationType = this.getDataFromQuery('type');
                if (negotiationType) {
                    this.getIframeIssuerTokens(this.tokenName, this.getFilter(), negotiationType);
                }
                else {
                    requiredParams(negotiationType, "negotiation type required to handle this event");
                }
                break;
            case 'get-tab-issuer-tokens':
                this.getTabIssuerTokens(this.tokenName, this.getFilter());
                break;
            case 'get-token-proof':
                var token = this.getDataFromQuery('token');
                requiredParams(token, "unsigned token is missing");
                this.sendTokenProof(token);
                break;
            case 'set-magic-url':
                localStorage.setItem('cookie-support-check', 'test');
                var _a = this.tokenIssuer, tokenUrlName = _a.tokenUrlName, tokenSecretName = _a.tokenSecretName, tokenIdName = _a.tokenIdName, itemStorageKey = _a.itemStorageKey;
                var tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);
                if (tokens && tokens.length)
                    storeMagicURL(tokens, itemStorageKey);
                break;
            case 'cookie-support-check':
                this.eventSender.emitCookieSupport();
                break;
            default:
                requiredParams(null, "Please provide a valid action");
                break;
        }
    };
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
    Outlet.prototype.getIframeIssuerTokens = function (tokenName, filter, negotiationType) {
        var storageTokens = this.prepareTokenOutput(tokenName, filter);
        if (negotiationType === 'passive')
            this.eventSender.emitIframeIssuerTokensPassive(storageTokens);
        else
            this.eventSender.emitIframeIssuerTokensActive(storageTokens);
    };
    Outlet.prototype.getTabIssuerTokens = function (tokenName, filter) {
        var opener = window.opener;
        var referrer = document.referrer;
        if (opener && referrer) {
            var pUrl = new URL(referrer);
            var parentOrigin = pUrl.origin;
            var storageTokens = this.prepareTokenOutput(tokenName, filter);
            this.eventSender.emitTabIssuerTokens(opener, storageTokens, parentOrigin);
        }
    };
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map