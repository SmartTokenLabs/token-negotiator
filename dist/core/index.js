var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { base64ToUint8array, compareObjects, } from "../utils/index";
export var filterTokens = function (decodedTokens, filter) {
    if (filter === void 0) { filter = []; }
    var res = [];
    if (decodedTokens.length &&
        typeof filter === "object" &&
        Object.keys(filter).length) {
        var filterKeys_1 = Object.keys(filter);
        decodedTokens.forEach(function (token) {
            var fitFilter = 1;
            filterKeys_1.forEach(function (key) {
                if (token[key] && token[key].toString() !== filter[key].toString())
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
export var readTokens = function (itemStorageKey) {
    var storageTickets = localStorage.getItem(itemStorageKey);
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
export var decodeTokens = function (rawTokens, tokenParser, unsignedTokenDataName, includeSignedToken) {
    if (includeSignedToken === void 0) { includeSignedToken = false; }
    var x = JSON.parse(rawTokens);
    if (x.length) {
        return x.map(function (tokenData) {
            if (tokenData.token) {
                var decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
                if (decodedToken && decodedToken[unsignedTokenDataName]) {
                    var token = decodedToken[unsignedTokenDataName];
                    token = propsArrayBufferToArray(token);
                    return includeSignedToken ? __assign({ signedToken: tokenData.token }, token) : token;
                }
            }
        });
    }
    else {
        return [];
    }
};
function propsArrayBufferToArray(obj) {
    Object.keys(obj).forEach(function (key) {
        if (obj[key] instanceof ArrayBuffer) {
            obj[key] = Array.from(new Uint8Array(obj[key]));
        }
    });
    return obj;
}
export var storeMagicURL = function (tokens, itemStorageKey) {
    if (tokens) {
        localStorage.setItem(itemStorageKey, JSON.stringify(tokens));
    }
};
export var readMagicUrl = function (tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey, urlParams) {
    if (urlParams === void 0) { urlParams = null; }
    if (urlParams === null)
        urlParams = new URLSearchParams(window.location.search);
    var tokenFromQuery = urlParams.get(tokenUrlName);
    var secretFromQuery = urlParams.get(tokenSecretName);
    var tmp = urlParams.get(tokenIdName);
    var idFromQuery = tmp ? tmp : "";
    if (!(tokenFromQuery && secretFromQuery))
        throw new Error("Incomplete token params in URL.");
    var tokensOutput = readTokens(itemStorageKey);
    var isNewQueryTicket = true;
    var tokens = tokensOutput.tokens.map(function (tokenData) {
        if (tokenData.token === tokenFromQuery) {
            isNewQueryTicket = false;
        }
        return tokenData;
    });
    if (isNewQueryTicket) {
        tokens.push({
            token: tokenFromQuery,
            secret: secretFromQuery,
            id: decodeURIComponent(idFromQuery),
            magic_link: window.location.href,
        });
        return tokens;
    }
    throw new Error("Token already added.");
};
export var rawTokenCheck = function (unsignedToken, tokenIssuer) { return __awaiter(void 0, void 0, void 0, function () {
    var rawTokenData, base64ticket, ticketSecret, tokenObj;
    return __generator(this, function (_a) {
        rawTokenData = getRawToken(unsignedToken, tokenIssuer);
        if (!rawTokenData)
            return [2, null];
        base64ticket = rawTokenData.token;
        ticketSecret = rawTokenData.secret;
        tokenObj = {
            ticketBlob: base64ticket,
            ticketSecret: ticketSecret,
            attestationOrigin: tokenIssuer.attestationOrigin,
        };
        if (rawTokenData && rawTokenData.id)
            tokenObj.email = rawTokenData.id;
        if (rawTokenData && rawTokenData.magic_link) {
            tokenObj.magicLink = rawTokenData.magic_link;
        }
        if (tokenIssuer.attestationInTab)
            tokenObj.attestationInTab = true;
        return [2, tokenObj];
    });
}); };
export var getRawToken = function (unsignedToken, tokenIssuer) {
    if (!unsignedToken || !Object.keys(unsignedToken).length)
        return;
    var tokensOutput = readTokens(tokenIssuer.itemStorageKey);
    if (tokensOutput.success && !tokensOutput.noTokens) {
        var rawTokens = tokensOutput.tokens;
        var token_1 = {};
        if (rawTokens.length) {
            rawTokens.forEach(function (tokenData) {
                if (tokenData.token) {
                    var _tokenParser = tokenIssuer.tokenParser;
                    var decodedToken = new _tokenParser(base64ToUint8array(tokenData.token).buffer);
                    if (decodedToken && decodedToken[tokenIssuer.unsignedTokenDataName]) {
                        var decodedTokenData = decodedToken[tokenIssuer.unsignedTokenDataName];
                        decodedTokenData = propsArrayBufferToArray(decodedTokenData);
                        if (compareObjects(decodedTokenData, unsignedToken)) {
                            token_1 = tokenData;
                        }
                    }
                }
            });
        }
        return token_1;
    }
    return null;
};
//# sourceMappingURL=index.js.map