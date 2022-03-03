import { readMagicUrl, storeMagicURL, rawTokenCheck } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
import { MessageAction } from '../client/messaging';
var Outlet = (function () {
    function Outlet(config) {
        var _this = this;
        this.eventSender = {
            emitCookieSupport: function (evtid) {
                window.parent.postMessage({
                    evtid: evtid,
                    evt: "cookie-support-check",
                    thirdPartyCookies: localStorage.getItem('cookie-support-check')
                }, document.referrer);
            },
            emitTabIssuerTokensPassive: function (evtid, opener, storageTokens, parentOrigin) {
                opener.postMessage({
                    evtid: evtid,
                    evt: "set-tab-issuer-tokens-passive",
                    issuer: _this.tokenName,
                    tokens: storageTokens
                }, parentOrigin);
            },
            emitTabIssuerTokensActive: function (evtid, opener, storageTokens, parentOrigin) {
                var target, origin;
                if (window.parent) {
                    target = window.parent;
                    origin = document.referrer;
                }
                else {
                    target = window.opener;
                    var pUrl = new URL(document.referrer);
                    origin = pUrl.origin;
                }
                target.postMessage({
                    evtid: evtid,
                    evt: "set-iframe-issuer-tokens-active",
                    issuer: _this.tokenName,
                    tokens: storageTokens
                }, origin);
            },
            emitIframeIssuerTokensPassive: function (evtid, tokens) {
                var target, origin;
                if (window.parent) {
                    target = window.parent;
                    origin = document.referrer;
                }
                else {
                    target = window.opener;
                    var pUrl = new URL(document.referrer);
                    origin = pUrl.origin;
                }
                target.postMessage({
                    evtid: evtid,
                    evt: "set-iframe-issuer-tokens-active",
                    issuer: _this.tokenName,
                    tokens: tokens
                }, origin);
            },
            emitIframeIssuerTokensActive: function (evtid, tokens) {
                var target, origin;
                if (window.parent) {
                    target = window.parent;
                    origin = document.referrer;
                }
                else {
                    target = window.opener;
                    var pUrl = new URL(document.referrer);
                    origin = pUrl.origin;
                }
                target.postMessage({
                    evtid: evtid,
                    evt: "set-iframe-issuer-tokens-active",
                    issuer: _this.tokenName,
                    tokens: tokens
                }, origin);
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
        var evtid = this.getDataFromQuery('evtid');
        var action = this.getDataFromQuery('action');
        console.log("Outlet response for event ID " + evtid + " action " + action);
        switch (action) {
            case MessageAction.GET_ISSUER_TOKENS:
                var issuerTokens = this.prepareTokenOutput(this.tokenName, this.getFilter());
                this.eventSender.emitIframeIssuerTokensActive(evtid, issuerTokens);
                break;
            case MessageAction.GET_PROOF:
                var token = this.getDataFromQuery('token');
                requiredParams(token, "unsigned token is missing");
                var isTabOrIframe = this.getDataFromQuery('type');
                this.sendTokenProof(token, isTabOrIframe);
                break;
            case MessageAction.COOKIE_CHECK:
                this.eventSender.emitCookieSupport(evtid);
                break;
            default:
                localStorage.setItem('cookie-support-check', 'test');
                var _a = this.tokenIssuer, tokenUrlName = _a.tokenUrlName, tokenSecretName = _a.tokenSecretName, tokenIdName = _a.tokenIdName, itemStorageKey = _a.itemStorageKey;
                var tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);
                if (tokens && tokens.length)
                    storeMagicURL(tokens, itemStorageKey);
                var _b = this.getTabIssuerTokens(this.tokenName, this.getFilter()), storageTokens = _b.storageTokens, parentOrigin = _b.parentOrigin;
                if (window.opener && storageTokens && parentOrigin) {
                    this.eventSender.emitTabIssuerTokensPassive(evtid, window.opener, storageTokens, parentOrigin);
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
    Outlet.prototype.getTabIssuerTokens = function (tokenName, filter) {
        var opener = window.opener;
        var referrer = document.referrer;
        if (opener && referrer) {
            var pUrl = new URL(referrer);
            var parentOrigin = pUrl.origin;
            var storageTokens = this.prepareTokenOutput(tokenName, filter);
            return { storageTokens: storageTokens, parentOrigin: parentOrigin };
        }
        else {
            return { storageTokens: null, parentOrigin: null };
        }
    };
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map