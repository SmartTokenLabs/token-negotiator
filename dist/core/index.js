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
import { base64ToUint8array } from './../utils';
export var filterTokens = function (decodedTokens, filter) {
    if (filter === void 0) { filter = {}; }
    if (Object.keys(filter).length === 0)
        filter = filter;
    var res = [];
    if (decodedTokens.length
        && typeof filter === "object"
        && Object.keys(filter).length) {
        var filterKeys_1 = Object.keys(filter);
        decodedTokens.forEach(function (token) {
            var fitFilter = 1;
            filterKeys_1.forEach(function (key) {
                if (token[key].toString() !== filter[key].toString())
                    fitFilter = 0;
            });
            if (fitFilter)
                res.push(token);
        });
        return res;
    }
    else {
        return decodedTokens;
    }
};
export var readTokens = function (localStorageItemName) {
    var storageTickets = localStorage.getItem(localStorageItemName);
    var tokens = [];
    var output = { tokens: [], noTokens: true, success: true };
    try {
        if (storageTickets && storageTickets.length) {
            tokens = JSON.parse(storageTickets);
            if (tokens.length !== 0) {
                tokens.forEach(function (item) {
                    if (item.token && item.secret)
                        output.tokens.push(item);
                });
            }
            if (output.tokens.length) {
                output.noTokens = false;
            }
        }
    }
    catch (e) {
        output.success = false;
    }
    return output;
};
export var decodeTokens = function (rawTokens, tokenParser, unsignedTokenDataName) {
    return rawTokens.map(function (tokenData) {
        if (tokenData.token) {
            var decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
            if (decodedToken && decodedToken[unsignedTokenDataName])
                return decodedToken[unsignedTokenDataName];
        }
    });
};
export var openOutletIframe = function (tokensOrigin, localStorageItemName) {
    return new Promise(function (resolve, reject) {
        var iframe = document.createElement('iframe');
        iframe.src = tokensOrigin;
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';
        document.body.appendChild(iframe);
        iframe.onload = function () {
            iframe.contentWindow.postMessage({
                evt: 'getTokens',
                localStorageItemName: localStorageItemName
            }, tokensOrigin);
            resolve(true);
        };
    });
};
export var getTokens = function (_a) {
    var _b = _a.filter, filter = _b === void 0 ? {} : _b, tokensOrigin = _a.tokensOrigin, localStorageItemName = _a.localStorageItemName, tokenParser = _a.tokenParser, unsignedTokenDataName = _a.unsignedTokenDataName;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_c) {
            return [2, new Promise(function (resolve, reject) {
                    openOutletIframe(tokensOrigin, localStorageItemName).then(function () {
                        window.addEventListener('message', function (event) {
                            if (event.data.evt === 'setTokens') {
                                var decodedTokens = decodeTokens(event.data.tokens.tokens, tokenParser, unsignedTokenDataName);
                                var filteredTokens = filterTokens(decodedTokens, filter);
                                resolve(filteredTokens);
                            }
                        }, false);
                    }).catch(function (error) {
                        reject({
                            error: error
                        });
                    });
                })];
        });
    });
};
export var storeMagicURL = function (tokens, localStorageItemName) { return localStorage.setItem(localStorageItemName, JSON.stringify(tokens)); };
export var readMagicUrl = function (tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName) {
    var urlParams = new URLSearchParams(window.location.search);
    var tokenFromQuery = urlParams.get(tokenUrlName);
    var secretFromQuery = urlParams.get(tokenSecretName);
    var idFromQuery = urlParams.get(tokenIdName);
    if (!(tokenFromQuery && secretFromQuery))
        return;
    var tokensOutput = readTokens(localStorageItemName);
    var isNewQueryTicket = true;
    var tokens = tokensOutput.tokens.map(function (tokenData) {
        if (tokenData.token === tokenFromQuery) {
            isNewQueryTicket = false;
        }
    });
    if (isNewQueryTicket)
        tokens.push({ token: tokenFromQuery, secret: secretFromQuery, id: idFromQuery, magic_link: window.location.href });
    storeMagicURL(tokens, localStorageItemName);
};
//# sourceMappingURL=index.js.map