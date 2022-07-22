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
import { OutletAction, OutletResponseAction } from "./messaging";
import { Messaging } from "../core/messaging";
import { Popup } from "./popup";
import { asyncHandle, logger, requiredParams } from "../utils";
import { getChallengeSigned, validateUseEthKey } from "../core";
import OnChainTokenModule from "./../onChainTokenModule";
import "./../vendor/keyShape";
import { Authenticator } from "@tokenscript/attestation";
import { TokenStore } from "./tokenStore";
var defaultConfig = {
    type: "active",
    issuers: [],
    options: {
        overlay: {
            openingHeading: "Validate your token ownership for access",
            issuerHeading: "Detected tokens"
        },
        filter: {}
    },
    autoLoadTokens: true,
    autoEnableTokens: true,
    autoPopup: true
};
var Client = (function () {
    function Client(config) {
        var _this = this;
        var _a;
        this.clientCallBackEvents = {};
        this.uiUpdateCallbacks = {};
        this.cancelAutoload = true;
        this.eventSender = {
            emitAllTokensToClient: function (tokens) {
                _this.on("tokens", null, tokens);
            },
            emitSelectedTokensToClient: function (tokens) {
                _this.on("tokens-selected", null, { selectedTokens: tokens });
            },
            emitProofToClient: function (proof, issuer, error) {
                if (error === void 0) { error = ""; }
                _this.on("token-proof", null, { proof: proof, issuer: issuer, error: error });
            },
        };
        this.config = Object.assign(defaultConfig, config);
        this.negotiateAlreadyFired = false;
        this.tokenStore = new TokenStore(this.config.autoEnableTokens);
        if (((_a = this.config.issuers) === null || _a === void 0 ? void 0 : _a.length) > 0)
            this.tokenStore.updateIssuers(this.config.issuers);
        this.onChainTokenModule = new OnChainTokenModule(this.config.onChainKeys, this.config.ipfsBaseUrl);
        this.messaging = new Messaging();
    }
    Client.getKey = function (file) {
        return Authenticator.decodePublicKey(file);
    };
    Client.prototype.getTokenStore = function () {
        return this.tokenStore;
    };
    Client.prototype.triggerUiUpdateCallbacks = function () {
        for (var i in this.uiUpdateCallbacks) {
            this.uiUpdateCallbacks[i]();
        }
    };
    Client.prototype.registerUiUpdateCallback = function (id, callback) {
        this.uiUpdateCallbacks[id] = callback;
    };
    Client.prototype.getWalletProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Web3WalletProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.web3WalletProvider) return [3, 2];
                        return [4, import("./../wallet/Web3WalletProvider")];
                    case 1:
                        Web3WalletProvider = (_a.sent()).Web3WalletProvider;
                        this.web3WalletProvider = new Web3WalletProvider();
                        _a.label = 2;
                    case 2: return [2, this.web3WalletProvider];
                }
            });
        });
    };
    Client.prototype.negotiatorConnectToWallet = function (walletType) {
        return __awaiter(this, void 0, void 0, function () {
            var walletProvider, walletAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getWalletProvider()];
                    case 1:
                        walletProvider = _a.sent();
                        return [4, walletProvider.connectWith(walletType)];
                    case 2:
                        walletAddress = _a.sent();
                        logger(2, "wallet address found: " + walletAddress);
                        return [2, walletAddress];
                }
            });
        });
    };
    Client.prototype.setPassiveNegotiationWebTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuers, _a, _b, _i, issuer, data, tokensOrigin, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        issuers = this.tokenStore.getCurrentIssuers(false);
                        _a = [];
                        for (_b in issuers)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 7];
                        issuer = _a[_i];
                        data = void 0;
                        tokensOrigin = this.tokenStore.getCurrentIssuers()[issuer].tokenOrigin;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4, this.messaging.sendMessage({
                                action: OutletAction.GET_ISSUER_TOKENS,
                                origin: tokensOrigin,
                                data: {
                                    issuer: issuer,
                                    filter: this.config.options.filters
                                }
                            })];
                    case 3:
                        data = _c.sent();
                        return [3, 5];
                    case 4:
                        err_1 = _c.sent();
                        logger(2, err_1);
                        return [3, 6];
                    case 5:
                        logger(2, "tokens:");
                        logger(2, data.tokens);
                        this.tokenStore.setTokens(issuer, data.tokens);
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    };
    Client.prototype.enrichTokenLookupDataOnChainTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuers, _a, _b, _i, issuer, tokenData, lookupData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        issuers = this.tokenStore.getCurrentIssuers(true);
                        _a = [];
                        for (_b in issuers)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        issuer = _a[_i];
                        tokenData = issuers[issuer];
                        if (tokenData.title)
                            return [3, 3];
                        return [4, this.onChainTokenModule.getInitialContractAddressMetaData(tokenData)];
                    case 2:
                        lookupData = _c.sent();
                        if (lookupData) {
                            this.tokenStore.updateTokenLookupStore(issuer, lookupData);
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Client.prototype.negotiate = function (issuers, openPopup) {
        if (openPopup === void 0) { openPopup = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (issuers)
                            this.tokenStore.updateIssuers(issuers);
                        requiredParams(Object.keys(this.tokenStore.getCurrentIssuers()).length, "issuers are missing.");
                        return [4, this.enrichTokenLookupDataOnChainTokens()];
                    case 1:
                        _a.sent();
                        if (this.config.type === "active") {
                            this.activeNegotiationStrategy(openPopup);
                        }
                        else {
                            this.passiveNegotiationStrategy();
                        }
                        return [2];
                }
            });
        });
    };
    Client.prototype.activeNegotiationStrategy = function (openPopup) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var autoOpenPopup;
            return __generator(this, function (_b) {
                if (this.popup) {
                    autoOpenPopup = this.tokenStore.hasUnloadedTokens();
                    this.triggerUiUpdateCallbacks();
                }
                else {
                    this.popup = new Popup((_a = this.config.options) === null || _a === void 0 ? void 0 : _a.overlay, this);
                    this.popup.initialize();
                    autoOpenPopup = true;
                }
                if (this.config.autoEnableTokens && Object.keys(this.tokenStore.getSelectedTokens()).length)
                    this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens());
                if (openPopup || (this.config.autoPopup === true && autoOpenPopup))
                    this.popup.openOverlay();
                return [2];
            });
        });
    };
    Client.prototype.tokenAutoLoad = function (onLoading, onComplete) {
        return __awaiter(this, void 0, void 0, function () {
            var count, _a, _b, _i, issuerKey, tokens, tokens_1, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.config.autoLoadTokens === false)
                            return [2];
                        this.cancelAutoload = false;
                        count = 1;
                        _a = [];
                        for (_b in this.tokenStore.getCurrentIssuers())
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 7];
                        issuerKey = _a[_i];
                        tokens = this.tokenStore.getIssuerTokens(issuerKey);
                        if ((tokens === null || tokens === void 0 ? void 0 : tokens.length) > 0)
                            return [3, 6];
                        onLoading(issuerKey);
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4, this.connectTokenIssuer(issuerKey)];
                    case 3:
                        tokens_1 = _c.sent();
                        onComplete(issuerKey, tokens_1);
                        return [3, 5];
                    case 4:
                        e_1 = _c.sent();
                        console.log("Failed to load " + issuerKey + ": " + e_1);
                        onComplete(issuerKey, null);
                        return [3, 5];
                    case 5:
                        count++;
                        if (this.cancelAutoload || (this.config.autoLoadTokens !== true && count > this.config.autoLoadTokens))
                            return [3, 7];
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    };
    Client.prototype.cancelTokenAutoload = function () {
        this.cancelAutoload = true;
    };
    Client.prototype.setPassiveNegotiationOnChainTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuers, walletProvider, _a, _b, _i, issuerKey, issuer, tokens;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        issuers = this.tokenStore.getCurrentIssuers(true);
                        return [4, this.getWalletProvider()];
                    case 1:
                        walletProvider = _c.sent();
                        _a = [];
                        for (_b in issuers)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 5];
                        issuerKey = _a[_i];
                        issuer = issuers[issuerKey];
                        return [4, this.onChainTokenModule.connectOnChainToken(issuer, walletProvider.getConnectedWalletData()[0].address)];
                    case 3:
                        tokens = _c.sent();
                        this.tokenStore.setTokens(issuerKey, tokens);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [2];
                }
            });
        });
    };
    Client.prototype.passiveNegotiationStrategy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, issuer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, asyncHandle(this.setPassiveNegotiationWebTokens())];
                    case 1:
                        _a.sent();
                        return [4, asyncHandle(this.setPassiveNegotiationOnChainTokens())];
                    case 2:
                        _a.sent();
                        tokens = this.tokenStore.getCurrentTokens();
                        logger(2, "Emit tokens");
                        logger(2, tokens);
                        for (issuer in tokens) {
                            tokens[issuer] = { tokens: tokens[issuer] };
                        }
                        this.eventSender.emitAllTokensToClient(tokens);
                        if (this.messaging.iframeStorageSupport === false && Object.keys(this.tokenStore.getCurrentTokens(false)).length === 0)
                            logger(2, "iFrame storage support not detected: Enable popups via your browser to access off-chain tokens with this negotiation type.");
                        return [2];
                }
            });
        });
    };
    Client.prototype.connectTokenIssuer = function (issuer) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var config, tokens, walletProvider, walletAddress, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = this.tokenStore.getCurrentIssuers()[issuer];
                        if (!config)
                            throw new Error("Undefined token issuer");
                        if (!(config.onChain === true)) return [3, 3];
                        return [4, this.getWalletProvider()];
                    case 1:
                        walletProvider = _b.sent();
                        walletAddress = (_a = walletProvider.getConnectedWalletData()[0]) === null || _a === void 0 ? void 0 : _a.address;
                        requiredParams(issuer, "issuer is required.");
                        requiredParams(walletAddress, "wallet address is missing.");
                        return [4, this.onChainTokenModule.connectOnChainToken(config, walletAddress)];
                    case 2:
                        tokens = _b.sent();
                        this.tokenStore.setTokens(issuer, tokens);
                        return [3, 5];
                    case 3: return [4, this.messaging.sendMessage({
                            action: OutletAction.GET_ISSUER_TOKENS,
                            origin: config.tokenOrigin,
                            data: {
                                issuer: issuer,
                                filter: this.config.options.filters
                            },
                        })];
                    case 4:
                        data = _b.sent();
                        tokens = data.tokens;
                        this.tokenStore.setTokens(issuer, data.tokens);
                        _b.label = 5;
                    case 5:
                        if (this.config.autoEnableTokens)
                            this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens());
                        return [2, tokens];
                }
            });
        });
    };
    Client.prototype.updateSelectedTokens = function (selectedTokens) {
        this.tokenStore.setSelectedTokens(selectedTokens);
        this.eventSender.emitSelectedTokensToClient(selectedTokens);
    };
    Client.prototype.authenticateOnChain = function (authRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var issuer, unsignedToken, useEthKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issuer = authRequest.issuer, unsignedToken = authRequest.unsignedToken;
                        return [4, this.checkPublicAddressMatch(issuer, unsignedToken)];
                    case 1:
                        useEthKey = _a.sent();
                        if (!useEthKey) {
                            throw new Error("Address does not match");
                        }
                        return [2, { issuer: issuer, proof: useEthKey }];
                }
            });
        });
    };
    Client.prototype.authenticateOffChain = function (authRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var issuer, unsignedToken, tokenConfig, useEthKey, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issuer = authRequest.issuer, unsignedToken = authRequest.unsignedToken;
                        tokenConfig = this.tokenStore.getCurrentIssuers()[issuer];
                        useEthKey = null;
                        if (!tokenConfig.unEndPoint) return [3, 2];
                        return [4, this.checkPublicAddressMatch(issuer, unsignedToken)];
                    case 1:
                        useEthKey = _a.sent();
                        if (!useEthKey) {
                            throw new Error("Address does not match");
                        }
                        _a.label = 2;
                    case 2: return [4, this.messaging.sendMessage({
                            action: OutletAction.GET_PROOF,
                            origin: tokenConfig.tokenOrigin,
                            timeout: 0,
                            data: {
                                issuer: issuer,
                                token: unsignedToken,
                                address: authRequest.address ? authRequest.address : "",
                                wallet: authRequest.wallet ? authRequest.wallet : ""
                            }
                        })];
                    case 3:
                        data = _a.sent();
                        if (useEthKey)
                            Authenticator.validateUseTicket(data.proof, tokenConfig.base64attestorPubKey, tokenConfig.base64senderPublicKeys, useEthKey.address);
                        return [2, data];
                }
            });
        });
    };
    Client.prototype.authenticate = function (authRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var issuer, unsignedToken, config, timer, data, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issuer = authRequest.issuer, unsignedToken = authRequest.unsignedToken;
                        requiredParams(issuer && unsignedToken, "Issuer and signed token required.");
                        config = this.tokenStore.getCurrentIssuers()[issuer];
                        if (!config)
                            throw new Error("Provided issuer was not found.");
                        if (this.popup) {
                            timer = setTimeout(function () {
                                _this.popup.showLoader("<h4>Authenticating...</h4>", "<small>You may need to sign a new challenge in your wallet</small>");
                                _this.popup.openOverlay();
                            }, 1000);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        data = void 0;
                        if (!(config.onChain === true)) return [3, 3];
                        return [4, this.authenticateOnChain(authRequest)];
                    case 2:
                        data = _a.sent();
                        return [3, 5];
                    case 3: return [4, this.authenticateOffChain(authRequest)];
                    case 4:
                        data = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!data.proof)
                            return [2, this.handleProofError("Failed to get proof from the outlet.")];
                        logger(2, "Ticket proof successfully validated.");
                        this.eventSender.emitProofToClient(data.proof, data.issuer);
                        return [3, 7];
                    case 6:
                        err_2 = _a.sent();
                        logger(2, err_2);
                        this.handleProofError(err_2, issuer);
                        return [3, 7];
                    case 7:
                        if (this.popup) {
                            if (timer)
                                clearTimeout(timer);
                            this.popup.dismissLoader();
                            this.popup.closeOverlay();
                        }
                        return [2];
                }
            });
        });
    };
    Client.prototype.handleProofError = function (err, issuer) {
        if (this.popup)
            this.popup.showError(err);
        this.eventSender.emitProofToClient(null, issuer, err);
    };
    Client.prototype.checkPublicAddressMatch = function (issuer, unsignedToken) {
        return __awaiter(this, void 0, void 0, function () {
            var config, walletProvider, useEthKey, attestedAddress, walletAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.tokenStore.getCurrentIssuers()[issuer];
                        if (!config.unEndPoint) {
                            config = {
                                unEndPoint: "https://crypto-verify.herokuapp.com/use-devcon-ticket",
                                ethKeyitemStorageKey: "dcEthKeys",
                            };
                        }
                        if (!unsignedToken)
                            return [2, { status: false, useEthKey: null, proof: null }];
                        return [4, this.getWalletProvider()];
                    case 1:
                        walletProvider = _a.sent();
                        if (!!walletProvider.getConnectedWalletData().length) return [3, 3];
                        return [4, walletProvider.connectWith("MetaMask")];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4, getChallengeSigned(config, walletProvider)];
                    case 4:
                        useEthKey = _a.sent();
                        return [4, validateUseEthKey(config.unEndPoint, useEthKey)];
                    case 5:
                        attestedAddress = _a.sent();
                        walletAddress = walletProvider.getConnectedWalletData()[0].address;
                        if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase())
                            throw new Error("useEthKey validation failed.");
                        return [2, useEthKey];
                }
            });
        });
    };
    Client.prototype.addTokenViaMagicLink = function (magicLink) {
        return __awaiter(this, void 0, void 0, function () {
            var url, params, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(magicLink);
                        params = url.hash.length > 1 ? url.hash.substring(1) : url.search.substring(1);
                        return [4, this.messaging.sendMessage({
                                action: OutletAction.MAGIC_URL,
                                origin: url.origin + url.pathname,
                                data: {
                                    urlParams: params
                                }
                            })];
                    case 1:
                        data = _a.sent();
                        if (data.evt === OutletResponseAction.ISSUER_TOKENS)
                            return [2, data.tokens];
                        throw new Error(data.errors.join("\n"));
                }
            });
        });
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