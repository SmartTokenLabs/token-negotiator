import { rawTokenCheck, readMagicUrl, storeMagicURL } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
import { MessageAction, MessageResponseAction } from '../client/messaging';
var Outlet = (function () {
    function Outlet(config) {
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
        if (!evtid || !action || !document.referrer)
            return;
        console.log("Outlet received event ID " + evtid + " action " + action);
        switch (action) {
            case MessageAction.GET_ISSUER_TOKENS:
                this.sendTokens(evtid);
                break;
            case MessageAction.GET_PROOF:
                var token = this.getDataFromQuery('token');
                requiredParams(token, "unsigned token is missing");
                var isTabOrIframe = this.getDataFromQuery('type');
                this.sendTokenProof(token, isTabOrIframe);
                break;
            case MessageAction.COOKIE_CHECK:
                this.sendMessageResponse({
                    evtid: evtid,
                    evt: MessageResponseAction.COOKIE_CHECK,
                    thirdPartyCookies: localStorage.getItem('cookie-support-check')
                });
                break;
            default:
                localStorage.setItem('cookie-support-check', 'test');
                var _a = this.tokenIssuer, tokenUrlName = _a.tokenUrlName, tokenSecretName = _a.tokenSecretName, tokenIdName = _a.tokenIdName, itemStorageKey = _a.itemStorageKey;
                var tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);
                if (tokens && tokens.length)
                    storeMagicURL(tokens, itemStorageKey);
                this.sendTokens(evtid);
                break;
        }
    };
    Outlet.prototype.prepareTokenOutput = function (tokenName, filter) {
        var storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);
        if (!storageTokens)
            return [];
        var decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);
        return filterTokens(decodedTokens, filter);
    };
    Outlet.prototype.sendTokenProof = function (evtid, token) {
        var _this = this;
        if (!token)
            return 'error';
        var unsignedToken = JSON.parse(token);
        rawTokenCheck(unsignedToken, this.tokenIssuer).then(function (tokenObj) {
            window.authenticator.getAuthenticationBlob(tokenObj, function (tokenProof) {
                _this.sendMessageResponse({
                    evtid: evtid,
                    evt: MessageResponseAction.PROOF,
                    issuer: _this.tokenName,
                    proof: JSON.stringify(tokenProof)
                });
            });
        });
    };
    Outlet.prototype.sendTokens = function (evtid) {
        var issuerTokens = this.prepareTokenOutput(this.tokenName, this.getFilter());
        this.sendMessageResponse({
            evtid: evtid,
            evt: MessageResponseAction.ISSUER_TOKENS,
            issuer: this.tokenName,
            tokens: issuerTokens
        });
    };
    Outlet.prototype.sendMessageResponse = function (response) {
        var target, origin;
        if (!window.opener) {
            target = window.parent;
        }
        else {
            target = window.opener;
        }
        var pUrl = new URL(document.referrer);
        origin = pUrl.origin;
        if (target)
            target.postMessage(response, origin);
    };
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map