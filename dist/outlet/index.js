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
                    thirdPartyCookies: localStorage.getItem('cookie-support-check')
                }, document.referrer);
            },
            emitTabIssuerTokensPassive: function (opener, storageTokens, parentOrigin) {
                opener.postMessage({
                    evt: "set-tab-issuer-tokens-passive",
                    issuer: _this.tokenName,
                    tokens: storageTokens
                }, parentOrigin);
            },
            emitTabIssuerTokensActive: function (opener, storageTokens, parentOrigin) {
                opener.postMessage({
                    evt: "set-tab-issuer-tokens-active",
                    issuer: _this.tokenName,
                    tokens: storageTokens
                }, parentOrigin);
            },
            emitIframeIssuerTokensPassive: function (tokens) {
                window.parent.postMessage({
                    evt: "set-iframe-issuer-tokens-passive",
                    issuer: _this.tokenName,
                    tokens: tokens
                }, document.referrer);
            },
            emitIframeIssuerTokensActive: function (tokens) {
                window.parent.postMessage({
                    evt: "set-iframe-issuer-tokens-active",
                    issuer: _this.tokenName,
                    tokens: tokens
                }, document.referrer);
            },
            emitTokenProofIframe: function (tokenProof) {
                window.parent.postMessage({
                    evt: 'proof-iframe',
                    proof: JSON.stringify(tokenProof),
                    issuer: _this.tokenName
                }, document.referrer);
            },
            emitTokenProofTab: function (tokenProof) {
                var opener = window.opener;
                var referrer = document.referrer;
                if (opener && referrer) {
                    var pUrl = new URL(referrer);
                    var parentOrigin = pUrl.origin;
                    opener.postMessage({ evt: "proof-tab", proof: tokenProof, issuer: _this.tokenName }, parentOrigin);
                }
            }
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
                var _a = this.getTabIssuerTokens(this.tokenName, this.getFilter()), storageTokens = _a.storageTokens, parentOrigin = _a.parentOrigin;
                if (window.opener && storageTokens && parentOrigin) {
                    this.eventSender.emitTabIssuerTokensActive(window.opener, storageTokens, parentOrigin);
                }
                break;
            case 'get-token-proof':
                var token = this.getDataFromQuery('token');
                requiredParams(token, "unsigned token is missing");
                var isTabOrIframe = this.getDataFromQuery('type');
                this.sendTokenProof(token, isTabOrIframe);
                break;
            case 'cookie-support-check':
                this.eventSender.emitCookieSupport();
                break;
            default:
                localStorage.setItem('cookie-support-check', 'test');
                var _b = this.tokenIssuer, tokenUrlName = _b.tokenUrlName, tokenSecretName = _b.tokenSecretName, tokenIdName = _b.tokenIdName, itemStorageKey = _b.itemStorageKey;
                var tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);
                if (tokens && tokens.length)
                    storeMagicURL(tokens, itemStorageKey);
                var _c = this.getTabIssuerTokens(this.tokenName, this.getFilter()), storageTokens = _c.storageTokens, parentOrigin = _c.parentOrigin;
                if (window.opener && storageTokens && parentOrigin) {
                    this.eventSender.emitTabIssuerTokensPassive(window.opener, storageTokens, parentOrigin);
                }
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
    Outlet.prototype.sendTokenProof = function (token, type) {
        var _this = this;
        if (!token)
            return 'error';
        var unsignedToken = JSON.parse(token);
        rawTokenCheck(unsignedToken, this.tokenIssuer).then(function (tokenObj) {
            window.authenticator.getAuthenticationBlob(tokenObj, function (tokenProof) {
                if (type === 'iframe')
                    _this.eventSender.emitTokenProofIframe(tokenProof);
                else
                    _this.eventSender.emitTokenProofTab(tokenProof);
            });
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
            return { storageTokens: storageTokens, parentOrigin: parentOrigin };
        }
    };
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map