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
import { base64ToUint8array, requiredParams, compareObjects } from '../utils/index';
import { ethers } from "ethers";
export var filterTokens = function (decodedTokens, filter) {
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
export var decodeTokens = function (rawTokens, tokenParser, unsignedTokenDataName) {
    var x = JSON.parse(rawTokens);
    if (x.length) {
        return x.map(function (tokenData) {
            if (tokenData.token) {
                var decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
                if (decodedToken && decodedToken[unsignedTokenDataName])
                    return decodedToken[unsignedTokenDataName];
            }
        });
    }
    else {
        return [];
    }
};
export var storeMagicURL = function (tokens, itemStorageKey) {
    if (tokens) {
        localStorage.setItem(itemStorageKey, JSON.stringify(tokens));
    }
};
export var readMagicUrl = function (tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey) {
    var urlParams = new URLSearchParams(window.location.search);
    var tokenFromQuery = urlParams.get(tokenUrlName);
    var secretFromQuery = urlParams.get(tokenSecretName);
    var idFromQuery = urlParams.get(tokenIdName);
    if (!(tokenFromQuery && secretFromQuery))
        return;
    var tokensOutput = readTokens(itemStorageKey);
    var isNewQueryTicket = true;
    var tokens = tokensOutput.tokens.map(function (tokenData) {
        if (tokenData.token === tokenFromQuery) {
            isNewQueryTicket = false;
        }
        return tokenData;
    });
    if (isNewQueryTicket) {
        tokens.push({ token: tokenFromQuery, secret: secretFromQuery, id: idFromQuery, magic_link: window.location.href });
        return tokens;
    }
    return [];
};
export var ethKeyIsValid = function (ethKey) {
    return ethKey.expiry >= Date.now();
};
export var validateUseEthKey = function (endPoint, data) { return __awaiter(void 0, void 0, void 0, function () {
    var response, json, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, fetch(endPoint, {
                        method: 'POST',
                        cache: 'no-cache',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(data)
                    })];
            case 1:
                response = _a.sent();
                return [4, response.json()];
            case 2:
                json = _a.sent();
                return [2, json.address];
            case 3:
                e_1 = _a.sent();
                return [2, {
                        success: false,
                        message: "validate ethkey request failed"
                    }];
            case 4: return [2];
        }
    });
}); };
export var getUnpredictableNumber = function (endPoint) { return __awaiter(void 0, void 0, void 0, function () {
    var response, json, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, fetch(endPoint)];
            case 1:
                response = _a.sent();
                return [4, response.json()];
            case 2:
                json = _a.sent();
                json.success = true;
                return [2, json];
            case 3:
                e_2 = _a.sent();
                return [2, {
                        success: false,
                        message: "UN request failed"
                    }];
            case 4: return [2];
        }
    });
}); };
export var getChallengeSigned = function (tokenIssuer, web3WalletProvider) { return __awaiter(void 0, void 0, void 0, function () {
    var storageEthKeys, ethKeys, address, useEthKey, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storageEthKeys = localStorage.getItem(tokenIssuer.ethKeyitemStorageKey);
                ethKeys = (storageEthKeys && storageEthKeys.length) ? JSON.parse(storageEthKeys) : {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                address = web3WalletProvider.getConnectedWalletData()[0].address;
                if (!!address) return [3, 3];
                return [4, web3WalletProvider.connect("MetaMask")];
            case 2:
                _a.sent();
                address = web3WalletProvider.getConnectedWalletData()[0].address;
                _a.label = 3;
            case 3:
                address = address.toLowerCase();
                useEthKey = void 0;
                if (ethKeys && ethKeys[address] && !ethKeyIsValid(ethKeys[address])) {
                    delete ethKeys[address];
                }
                if (!(ethKeys && ethKeys[address])) return [3, 4];
                useEthKey = ethKeys[address];
                return [3, 6];
            case 4: return [4, signNewChallenge(tokenIssuer.unEndPoint, web3WalletProvider)];
            case 5:
                useEthKey = _a.sent();
                if (useEthKey) {
                    ethKeys[useEthKey.address.toLowerCase()] = useEthKey;
                    localStorage.setItem(tokenIssuer.ethKeyitemStorageKey, JSON.stringify(ethKeys));
                }
                _a.label = 6;
            case 6: return [2, useEthKey];
            case 7:
                e_3 = _a.sent();
                throw new Error(e_3);
            case 8: return [2];
        }
    });
}); };
export var connectMetamaskAndGetAddress = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userAddresses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requiredParams(window.ethereum, 'Please install metamask to continue.');
                return [4, window.ethereum.request({ method: 'eth_requestAccounts' })];
            case 1:
                userAddresses = _a.sent();
                if (!userAddresses || !userAddresses.length)
                    throw new Error("Active Wallet required");
                return [2, userAddresses[0]];
        }
    });
}); };
export var signNewChallenge = function (unEndPoint, web3WalletProvider) { return __awaiter(void 0, void 0, void 0, function () {
    var res, UN, randomness, domain, expiry, messageToSign, signature, msgHash, msgHashBytes, recoveredAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('sign new challenge');
                return [4, getUnpredictableNumber(unEndPoint)];
            case 1:
                res = _a.sent();
                UN = res.number, randomness = res.randomness, domain = res.domain, expiry = res.expiration, messageToSign = res.messageToSign;
                return [4, signMessageWithBrowserWallet(messageToSign, web3WalletProvider)];
            case 2:
                signature = _a.sent();
                msgHash = ethers.utils.hashMessage(messageToSign);
                msgHashBytes = ethers.utils.arrayify(msgHash);
                recoveredAddress = ethers.utils.recoverAddress(msgHashBytes, signature);
                return [2, {
                        address: recoveredAddress,
                        expiry: expiry,
                        domain: domain,
                        randomness: randomness,
                        signature: signature,
                        UN: UN
                    }];
        }
    });
}); };
export var signMessageWithBrowserWallet = function (message, web3WalletProvider) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, web3WalletProvider.signWith(message, web3WalletProvider.getConnectedWalletData()[0])];
            case 1: return [2, _a.sent()];
        }
    });
}); };
export var rawTokenCheck = function (unsignedToken, tokenIssuer) { return __awaiter(void 0, void 0, void 0, function () {
    var rawTokenData, base64ticket, ticketSecret, tokenObj;
    return __generator(this, function (_a) {
        requiredParams(window.ethereum, 'Please install metamask to continue.');
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
        if (rawTokenData && rawTokenData.magic_link)
            tokenObj.magicLink = rawTokenData.magic_link;
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
                        if (compareObjects(decodedTokenData, unsignedToken)) {
                            token_1 = tokenData;
                        }
                    }
                }
            });
        }
        return token_1;
    }
    else {
        return null;
    }
};
//# sourceMappingURL=index.js.map