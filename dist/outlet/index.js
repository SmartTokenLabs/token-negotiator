var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { rawTokenCheck, readMagicUrl, storeMagicURL } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
import { MessageAction, MessageResponseAction } from '../client/messaging';
import { AuthHandler } from "./auth-handler";
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
        if (!document.referrer)
            return;
        console.log("Outlet received event ID " + evtid + " action " + action);
        switch (action) {
            case MessageAction.GET_ISSUER_TOKENS:
                this.sendTokens(evtid);
                break;
            case MessageAction.GET_PROOF:
                var token = this.getDataFromQuery('token');
                requiredParams(token, "unsigned token is missing");
                this.sendTokenProof(evtid, token);
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
        return __awaiter(this, void 0, void 0, function () {
            var unsignedToken, tokenObj, authHandler, tokenProof, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token)
                            return [2, 'error'];
                        unsignedToken = JSON.parse(token);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, rawTokenCheck(unsignedToken, this.tokenIssuer)];
                    case 2:
                        tokenObj = _a.sent();
                        authHandler = new AuthHandler(this, evtid, this.tokenIssuer, tokenObj);
                        return [4, authHandler.authenticate()];
                    case 3:
                        tokenProof = _a.sent();
                        this.sendMessageResponse({
                            evtid: evtid,
                            evt: MessageResponseAction.PROOF,
                            issuer: this.tokenName,
                            proof: JSON.stringify(tokenProof)
                        });
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.sendMessageResponse({
                            evtid: evtid,
                            evt: MessageResponseAction.ERROR,
                            errors: [e_1]
                        });
                        return [3, 5];
                    case 5: return [2];
                }
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