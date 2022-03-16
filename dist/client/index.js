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
import { Messaging, MessageAction } from "./messaging";
import { Popup } from './popup';
import { asyncHandle, logger, requiredParams } from './../utils/index';
import { connectMetamaskAndGetAddress, getChallengeSigned, validateUseEthKey } from "../core/index";
import { tokenLookup } from './../tokenLookup';
import OnChainTokenModule from './../onChainTokenModule';
import Web3WalletProvider from './../utils/Web3WalletProvider';
import "./../theme/style.css";
import './../vendor/keyShape';
var Client = (function () {
    function Client(config) {
        var _this = this;
        this.eventSender = {
            emitAllTokensToClient: function (tokens) {
                _this.on("tokens", null, tokens);
            },
            emitSelectedTokensToClient: function () {
                _this.on("tokens-selected", null, { selectedTokens: _this.selectedTokens });
            },
            emitProofToClient: function (proof, issuer) {
                _this.on("token-proof", null, { proof: proof, issuer: issuer });
            }
        };
        var type = config.type, issuers = config.issuers, options = config.options, filter = config.filter;
        requiredParams(type, 'type is required.');
        requiredParams(issuers, 'issuers are missing.');
        this.tokenLookup = tokenLookup;
        this.type = type;
        this.options = options;
        this.filter = filter ? filter : {};
        this.issuers = issuers;
        this.offChainTokens = { tokenKeys: [] };
        this.onChainTokens = { tokenKeys: [] };
        this.selectedTokens = {};
        this.clientCallBackEvents = {};
        issuers.forEach(function (issuer) {
            if (tokenLookup[issuer]) {
                if (tokenLookup[issuer].onChain === true) {
                    _this.onChainTokens.tokenKeys.push(issuer);
                    _this.onChainTokens[issuer] = { tokens: [] };
                }
                else {
                    _this.offChainTokens.tokenKeys.push(issuer);
                    _this.offChainTokens[issuer] = { tokens: [] };
                }
            }
            if ((issuer.contract) && (issuer.chain)) {
                var issuerKey = issuer.contract + "." + issuer.chain;
                if (issuer.openSeaSlug)
                    issuerKey += "." + issuer.openSeaSlug;
                _this.updateTokenLookupStore(issuerKey, issuer);
                if (_this.onChainTokens[issuerKey])
                    return;
                _this.onChainTokens.tokenKeys.push(issuerKey);
                _this.onChainTokens[issuerKey] = { tokens: [] };
            }
        });
        this.web3WalletProvider = new Web3WalletProvider();
        this.onChainTokenModule = new OnChainTokenModule();
        this.messaging = new Messaging();
        document.onclick = function (e) {
        };
    }
    Client.prototype.getTokenData = function () {
        return {
            offChainTokens: this.offChainTokens,
            onChainTokens: this.onChainTokens,
            tokenLookup: this.tokenLookup,
            selectedTokens: this.selectedTokens
        };
    };
    Client.prototype.updateTokenLookupStore = function (tokenKey, data) {
        if (!this.tokenLookup[tokenKey])
            this.tokenLookup[tokenKey] = {};
        this.tokenLookup[tokenKey] = __assign(__assign({}, this.tokenLookup[tokenKey]), data);
    };
    Client.prototype.negotiatorConnectToWallet = function (walletType) {
        return __awaiter(this, void 0, void 0, function () {
            var walletAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.web3WalletProvider.connectWith(walletType)];
                    case 1:
                        walletAddress = _a.sent();
                        logger('wallet address found: ' + walletAddress);
                        return [2, walletAddress];
                }
            });
        });
    };
    Client.prototype.setPassiveNegotiationWebTokens = function (offChainTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(offChainTokens.tokenKeys.map(function (issuer) { return __awaiter(_this, void 0, void 0, function () {
                            var tokenOrigin, data, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        tokenOrigin = tokenLookup[issuer].tokenOrigin;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, this.messaging.sendMessage({
                                                issuer: issuer,
                                                action: MessageAction.GET_ISSUER_TOKENS,
                                                filter: this.filter,
                                                origin: tokenOrigin
                                            })];
                                    case 2:
                                        data = _a.sent();
                                        return [3, 4];
                                    case 3:
                                        err_1 = _a.sent();
                                        console.log(err_1);
                                        return [2];
                                    case 4:
                                        console.log("tokens:");
                                        console.log(data.tokens);
                                        this.offChainTokens[issuer].tokens = data.tokens;
                                        return [2];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Client.prototype.enrichTokenLookupDataOnChainTokens = function (onChainTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(onChainTokens.tokenKeys.map(function (issuerKey) { return __awaiter(_this, void 0, void 0, function () {
                            var lookupData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.onChainTokenModule.getInitialContractAddressMetaData(issuerKey)];
                                    case 1:
                                        lookupData = _a.sent();
                                        if (lookupData) {
                                            lookupData.onChain = true;
                                            this.updateTokenLookupStore(issuerKey, lookupData);
                                        }
                                        return [2];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Client.prototype.setBlockChainTokens = function (onChainTokens) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    Client.prototype.negotiate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.enrichTokenLookupDataOnChainTokens(this.onChainTokens)];
                    case 1:
                        _a.sent();
                        if (!(this.type === 'active')) return [3, 2];
                        this.activeNegotiationStrategy();
                        return [3, 5];
                    case 2:
                        if (!window.ethereum) return [3, 4];
                        return [4, this.web3WalletProvider.connectWith('MetaMask')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.passiveNegotiationStrategy();
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    Client.prototype.activeNegotiationStrategy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () {
                    var _a;
                    _this.popup = new Popup((_a = _this.options) === null || _a === void 0 ? void 0 : _a.overlay, _this);
                    _this.popup.initialize();
                }, 0);
                return [2];
            });
        });
    };
    Client.prototype.setPassiveNegotiationOnChainTokens = function (onChainTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(onChainTokens.tokenKeys.map(function (issuerKey) { return __awaiter(_this, void 0, void 0, function () {
                            var tokens;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.onChainTokenModule.connectOnChainToken(issuerKey, this.web3WalletProvider.getConnectedWalletData()[0].address)];
                                    case 1:
                                        tokens = _a.sent();
                                        this.onChainTokens[issuerKey].tokens = tokens;
                                        return [2];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Client.prototype.passiveNegotiationStrategy = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var canUsePassive, outputOnChain, outputOffChain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        canUsePassive = false;
                        if (!this.offChainTokens.tokenKeys.length) return [3, 2];
                        return [4, this.messaging.getCookieSupport((_a = this.tokenLookup[this.offChainTokens.tokenKeys[0]]) === null || _a === void 0 ? void 0 : _a.tokenOrigin)];
                    case 1:
                        canUsePassive = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!canUsePassive) return [3, 5];
                        return [4, asyncHandle(this.setPassiveNegotiationWebTokens(this.offChainTokens))];
                    case 3:
                        _b.sent();
                        return [4, asyncHandle(this.setPassiveNegotiationOnChainTokens(this.onChainTokens))];
                    case 4:
                        _b.sent();
                        outputOnChain = JSON.parse(JSON.stringify(this.onChainTokens));
                        delete outputOnChain.tokenKeys;
                        outputOffChain = JSON.parse(JSON.stringify(this.offChainTokens));
                        delete outputOffChain.tokenKeys;
                        console.log("Emitting tokens!!");
                        console.log(outputOffChain);
                        this.eventSender.emitAllTokensToClient(__assign(__assign({}, outputOffChain), outputOnChain));
                        return [3, 6];
                    case 5:
                        logger('Enable 3rd party cookies via your browser settings to use this negotiation type.');
                        _b.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    Client.prototype.connectTokenIssuer = function (issuer) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, tokensOrigin, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = this.filter ? this.filter : {};
                        tokensOrigin = this.tokenLookup[issuer].tokenOrigin;
                        if (this.tokenLookup[issuer].onChain) {
                            return [2, this.connectOnChainTokenIssuer(issuer)];
                        }
                        return [4, this.messaging.sendMessage({
                                issuer: issuer,
                                action: MessageAction.GET_ISSUER_TOKENS,
                                origin: tokensOrigin,
                                filter: filter,
                            })];
                    case 1:
                        data = _a.sent();
                        issuer = data.issuer;
                        this.offChainTokens[issuer].tokens = data.tokens;
                        return [2, data.tokens];
                }
            });
        });
    };
    Client.prototype.connectOnChainTokenIssuer = function (issuerKey) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.onChainTokenModule.connectOnChainToken(issuerKey, this.web3WalletProvider.getConnectedWalletData()[0].address)];
                    case 1:
                        tokens = _a.sent();
                        this.onChainTokens[issuerKey].tokens = tokens;
                        return [2, tokens];
                }
            });
        });
    };
    Client.prototype.updateSelectedTokens = function (selectedTokens) {
        this.selectedTokens = selectedTokens;
        this.eventSender.emitSelectedTokensToClient();
    };
    Client.prototype.authenticate = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var issuer, unsignedToken, tokensOrigin, addressMatch, data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issuer = config.issuer, unsignedToken = config.unsignedToken;
                        tokensOrigin = this.tokenLookup[issuer].tokenOrigin;
                        requiredParams((issuer && unsignedToken), { status: false, useEthKey: null, proof: null });
                        if (this.popup)
                            this.popup.showLoader("<h4>Authenticating...</h4>", "<small>You may need to sign a new challenge in your wallet</small>");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, this.checkPublicAddressMatch(issuer, unsignedToken)];
                    case 2:
                        addressMatch = _a.sent();
                        if (!addressMatch) {
                            if (this.popup)
                                this.popup.showError("Address does not match.");
                            return [2];
                        }
                        return [4, this.messaging.sendMessage({
                                issuer: issuer,
                                action: MessageAction.GET_PROOF,
                                origin: tokensOrigin,
                                token: unsignedToken,
                                timeout: 0
                            })];
                    case 3:
                        data = _a.sent();
                        this.eventSender.emitProofToClient(data.proof, data.issuer);
                        return [3, 5];
                    case 4:
                        err_2 = _a.sent();
                        console.log(err_2);
                        if (this.popup)
                            this.popup.showError(err_2);
                        return [2];
                    case 5:
                        if (this.popup)
                            this.popup.dismissLoader();
                        return [2];
                }
            });
        });
    };
    Client.prototype.checkPublicAddressMatch = function (issuer, unsignedToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, unEndPoint, onChain, useEthKey, attestedAddress, walletAddress, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = tokenLookup[issuer], unEndPoint = _a.unEndPoint, onChain = _a.onChain;
                        if (onChain === true || !unsignedToken || !unEndPoint)
                            return [2, { status: false, useEthKey: null, proof: null }];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4, getChallengeSigned(tokenLookup[issuer], this.web3WalletProvider)];
                    case 2:
                        useEthKey = _b.sent();
                        return [4, validateUseEthKey(unEndPoint, useEthKey)];
                    case 3:
                        attestedAddress = _b.sent();
                        return [4, connectMetamaskAndGetAddress()];
                    case 4:
                        walletAddress = _b.sent();
                        if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase())
                            throw new Error('useEthKey validation failed.');
                        return [2, true];
                    case 5:
                        e_1 = _b.sent();
                        requiredParams(null, "Could not authenticate token");
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    Client.prototype.addTokenThroughTab = function (magicLink) {
        var tab = this.messaging.openTab(magicLink);
        setTimeout(function () { tab === null || tab === void 0 ? void 0 : tab.close(); }, 2500);
    };
    Client.prototype.addTokenThroughIframe = function (magicLink) {
        this.messaging.createIframe(magicLink);
    };
    Client.prototype.on = function (type, callback, data) {
        requiredParams(type, "Event type is not defined");
        if (callback) {
            this.clientCallBackEvents[type] = callback;
        }
        else {
            if (this.clientCallBackEvents[type]) {
                return this.clientCallBackEvents[type].call(type, data);
            }
        }
    };
    return Client;
}());
export { Client };
//# sourceMappingURL=index.js.map