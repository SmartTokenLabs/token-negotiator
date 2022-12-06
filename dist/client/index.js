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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { OutletAction, OutletResponseAction, Messaging } from "./messaging";
import { Ui } from './ui';
import { logger, requiredParams } from "../utils";
import { getNftCollection, getNftTokens } from "../utils/token/nftProvider";
import "./../vendor/keyShape";
import { Authenticator } from "@tokenscript/attestation";
import { TokenStore } from "./tokenStore";
import { SignedUNChallenge } from "./auth/signedUNChallenge";
import { TicketZKProof } from "./auth/ticketZKProof";
import { isUserAgentSupported, validateBlockchain } from '../utils/support/isSupported';
import { LocalOutlet } from "../outlet/localOutlet";
import { Outlet } from "../outlet";
import { browserBlocksIframeStorage } from "../utils/support/getBrowserData";
import { waitForElementToExist, errorHandler } from '../utils/index';
if (typeof window !== "undefined")
    window.tn = { version: "2.2.0" };
var NOT_SUPPORTED_ERROR = "This browser is not supported. Please try using Chrome, Edge, FireFox or Safari.";
export var defaultConfig = {
    type: "active",
    issuers: [],
    uiOptions: {
        uiType: "popup",
        containerElement: ".overlay-tn",
        openingHeading: "Validate your token ownership for access",
        issuerHeading: "Detected tokens",
        autoPopup: true,
        position: "bottom-right",
        alwaysShowStartScreen: false
    },
    autoLoadTokens: true,
    autoEnableTokens: true,
    messagingForceTab: false,
    forceOffChainTokenRedirect: true,
    tokenPersistenceTTL: 600,
    unSupportedUserAgent: {
        authentication: {
            config: {},
            errorMessage: NOT_SUPPORTED_ERROR
        },
        full: {
            config: {
                iE: true,
                iE9: true,
            },
            errorMessage: NOT_SUPPORTED_ERROR
        }
    },
};
export var ClientError;
(function (ClientError) {
    ClientError["POPUP_BLOCKED"] = "POPUP_BLOCKED";
    ClientError["USER_ABORT"] = "USER_ABORT";
})(ClientError || (ClientError = {}));
export var ClientErrorMessage;
(function (ClientErrorMessage) {
    ClientErrorMessage["POPUP_BLOCKED"] = "Please add an exception to your popup blocker before continuing.";
    ClientErrorMessage["USER_ABORT"] = "The user aborted the process.";
})(ClientErrorMessage || (ClientErrorMessage = {}));
var Client = (function () {
    function Client(config) {
        var _a;
        var _this = this;
        var _b;
        this.clientCallBackEvents = {};
        this.uiUpdateCallbacks = (_a = {},
            _a[0] = undefined,
            _a[1] = undefined,
            _a);
        this.cancelAutoload = true;
        this.eventSender = {
            emitAllTokensToClient: function (tokens) {
                _this.on("tokens", null, tokens);
            },
            emitSelectedTokensToClient: function (tokens) {
                _this.on("tokens-selected", null, { selectedTokens: tokens });
            },
            emitProofToClient: function (data, issuer, error) {
                if (error === void 0) { error = ""; }
                _this.on("token-proof", null, { data: data, issuer: issuer, error: error });
            },
            emitErrorToClient: function (error, issuer) {
                if (issuer === void 0) { issuer = "none"; }
                _this.on("error", null, { error: error, issuer: issuer });
            },
            emitConnectedWalletInstance: function (connectedWallet) {
                _this.on("connected-wallet", null, connectedWallet);
            },
            emitDisconnectedWalletInstance: function () {
                _this.on("disconnected-wallet", null, null);
            },
            emitNetworkChange: function (chain) {
                _this.on("network-change", null, chain);
            }
        };
        if (window.location.hash) {
            this.urlParams = new URLSearchParams(window.location.hash.substring(1));
            var action = this.getDataFromQuery("action");
            logger(2, "Client() fired. Action = \"".concat(action, "\""));
        }
        this.config = this.mergeConfig(defaultConfig, config);
        this.negotiateAlreadyFired = false;
        this.tokenStore = new TokenStore(this.config.autoEnableTokens, this.config.tokenPersistenceTTL);
        if (((_b = this.config.issuers) === null || _b === void 0 ? void 0 : _b.length) > 0)
            this.tokenStore.updateIssuers(this.config.issuers);
        this.messaging = new Messaging();
        this.registerOutletProofEventListener();
    }
    Client.getKey = function (file) {
        return Authenticator.decodePublicKey(file);
    };
    Client.prototype.getDataFromQuery = function (itemKey) {
        return this.urlParams ? this.urlParams.get(itemKey) : "";
    };
    Client.prototype.readProofCallback = function () {
        if (!this.getDataFromQuery)
            return false;
        var action = this.getDataFromQuery("action");
        if (action !== "proof-callback")
            return false;
        var issuer = this.getDataFromQuery("issuer");
        var attest = this.getDataFromQuery("attestation");
        var error = this.getDataFromQuery("error");
        this.emitRedirectProofEvent(issuer, attest, error);
    };
    Client.prototype.registerOutletProofEventListener = function () {
        var _this = this;
        window.addEventListener("auth-callback", function (e) {
            _this.emitRedirectProofEvent(e.detail.issuer, e.detail.proof, e.detail.error);
        });
    };
    Client.prototype.emitRedirectProofEvent = function (issuer, proof, error) {
        var _this = this;
        setTimeout(function () {
            if (error) {
                _this.handleProofError(new Error(error), issuer);
            }
            else {
                _this.eventSender.emitProofToClient({ proof: proof }, issuer, null);
            }
        }, 500);
    };
    Client.prototype.mergeConfig = function (defaultConfig, config) {
        var e_1, _a;
        var _b, _c;
        for (var key in config) {
            if (config[key] && config[key].constructor === Object) {
                defaultConfig[key] = this.mergeConfig((_b = defaultConfig[key]) !== null && _b !== void 0 ? _b : {}, config[key]);
            }
            else {
                defaultConfig[key] = config[key];
            }
        }
        if (defaultConfig.issuers && defaultConfig.issuers.length) {
            try {
                for (var _d = __values(defaultConfig.issuers), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var issuer = _e.value;
                    if (issuer.onChain === true) {
                        validateBlockchain((_c = issuer.blockchain) !== null && _c !== void 0 ? _c : "");
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return defaultConfig;
    };
    Client.prototype.getTokenStore = function () {
        return this.tokenStore;
    };
    Client.prototype.getUi = function () {
        return this.ui;
    };
    Client.prototype.createUiInstance = function () {
        this.ui = new Ui(this.config.uiOptions, this);
    };
    Client.prototype.triggerUiUpdateCallback = function (type, data) {
        if (this.uiUpdateCallbacks[type])
            this.uiUpdateCallbacks[type](data);
    };
    Client.prototype.registerUiUpdateCallback = function (type, callback) {
        this.uiUpdateCallbacks[type] = callback;
    };
    Client.prototype.safeConnectAvailable = function () {
        return this.config.safeConnectOptions !== undefined;
    };
    Client.prototype.solanaAvailable = function () {
        return (typeof window.solana !== 'undefined' &&
            this.config.issuers.filter(function (issuer) {
                var _a;
                return ((_a = issuer === null || issuer === void 0 ? void 0 : issuer.blockchain) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'solana';
            }).length > 0);
    };
    Client.prototype.getWalletProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Web3WalletProvider_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.web3WalletProvider) return [3, 2];
                        return [4, import("./../wallet/Web3WalletProvider")];
                    case 1:
                        Web3WalletProvider_1 = (_a.sent()).Web3WalletProvider;
                        this.web3WalletProvider = new Web3WalletProvider_1(this, this.config.safeConnectOptions);
                        _a.label = 2;
                    case 2: return [2, this.web3WalletProvider];
                }
            });
        });
    };
    Client.prototype.disconnectWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getWalletProvider()];
                    case 1:
                        wp = _a.sent();
                        wp.deleteConnections();
                        this.tokenStore.clearCachedTokens();
                        this.eventSender.emitConnectedWalletInstance(null);
                        this.eventSender.emitDisconnectedWalletInstance();
                        return [2];
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
    Client.prototype.enrichTokenLookupDataOnChainTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuers, _a, _b, _i, issuer, tokenData, lookupData, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.issuersLoaded = false;
                        this.triggerUiUpdateCallback(0);
                        issuers = this.tokenStore.getCurrentIssuers(true);
                        _a = [];
                        for (_b in issuers)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 6];
                        issuer = _a[_i];
                        tokenData = issuers[issuer];
                        if (tokenData.title)
                            return [3, 5];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4, getNftCollection(tokenData)];
                    case 3:
                        lookupData = _c.sent();
                        if (lookupData) {
                            lookupData.onChain = true;
                            this.tokenStore.updateTokenLookupStore(issuer, lookupData);
                        }
                        return [3, 5];
                    case 4:
                        e_2 = _c.sent();
                        logger(2, "Failed to load contract data for " + issuer + ": " + e_2.message);
                        return [3, 5];
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6:
                        this.issuersLoaded = true;
                        this.triggerUiUpdateCallback(1);
                        return [2];
                }
            });
        });
    };
    Client.prototype.checkUserAgentSupport = function (type) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var err;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!isUserAgentSupported((_b = (_a = this.config.unSupportedUserAgent) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.config)) return [3, 3];
                        err = this.config.unSupportedUserAgent[type].errorMessage;
                        if (!this.activeNegotiateRequired()) return [3, 2];
                        this.createUiInstance();
                        return [4, this.ui.initialize()];
                    case 1:
                        _c.sent();
                        this.ui.openOverlay();
                        this.ui.showError(err, false);
                        this.ui.viewContainer.style.display = 'none';
                        _c.label = 2;
                    case 2:
                        errorHandler(err, 'error', null, null, true, true);
                        _c.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    Client.prototype.activeNegotiateRequired = function () {
        return (this.config.type === "active");
    };
    Client.prototype.createCurrentUrlWithoutHash = function () {
        var _a;
        return (_a = window.location.origin + window.location.pathname + window.location.search) !== null && _a !== void 0 ? _a : ("?" + window.location.search);
    };
    Client.prototype.getNoTokenMsg = function (collectionID) {
        var _a;
        var store = this.getTokenStore().getCurrentIssuers();
        var collectionNoTokenMsg = (_a = store[collectionID]) === null || _a === void 0 ? void 0 : _a.noTokenMsg;
        return collectionNoTokenMsg ? collectionNoTokenMsg : '';
    };
    Client.prototype.negotiate = function (issuers, openPopup) {
        if (openPopup === void 0) { openPopup = false; }
        return __awaiter(this, void 0, void 0, function () {
            var currentIssuer, outlet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentIssuer = this.getOutletConfigForCurrentOrigin();
                        if (!currentIssuer) return [3, 2];
                        logger(2, "Sync Outlet fired in Client to read MagicLink before negotiate().");
                        outlet = new Outlet(currentIssuer, true);
                        return [4, outlet.readMagicLink()];
                    case 1:
                        _a.sent();
                        outlet = null;
                        _a.label = 2;
                    case 2: return [4, this.checkUserAgentSupport("full")];
                    case 3:
                        _a.sent();
                        if (issuers)
                            this.tokenStore.updateIssuers(issuers);
                        requiredParams(Object.keys(this.tokenStore.getCurrentIssuers()).length, "issuers are missing.");
                        if (!this.activeNegotiateRequired()) return [3, 5];
                        this.issuersLoaded = !this.tokenStore.hasUnloadedIssuers();
                        return [4, this.activeNegotiationStrategy(openPopup)];
                    case 4:
                        _a.sent();
                        return [3, 8];
                    case 5: return [4, this.enrichTokenLookupDataOnChainTokens()];
                    case 6:
                        _a.sent();
                        return [4, this.passiveNegotiationStrategy()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2];
                }
            });
        });
    };
    Client.prototype.activeNegotiationStrategy = function (openPopup) {
        return __awaiter(this, void 0, void 0, function () {
            var autoOpenPopup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ui) return [3, 1];
                        autoOpenPopup = this.tokenStore.hasUnloadedTokens();
                        if (this.ui.viewIsNotStart() && this.tokenStore.hasUnloadedIssuers())
                            this.enrichTokenLookupDataOnChainTokens();
                        return [3, 3];
                    case 1:
                        this.createUiInstance();
                        return [4, this.ui.initialize()];
                    case 2:
                        _a.sent();
                        autoOpenPopup = true;
                        _a.label = 3;
                    case 3:
                        if (this.config.autoEnableTokens && Object.keys(this.tokenStore.getSelectedTokens()).length)
                            this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens());
                        if (openPopup || (this.config.uiOptions.autoPopup === true && autoOpenPopup))
                            this.ui.openOverlay();
                        return [2];
                }
            });
        });
    };
    Client.prototype.tokenAutoLoad = function (onLoading, onComplete, refresh) {
        return __awaiter(this, void 0, void 0, function () {
            var count, _a, _b, _i, issuerKey, tokens, tokens_1, e_3;
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
                        if (!refresh && (tokens === null || tokens === void 0 ? void 0 : tokens.length) > 0)
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
                        e_3 = _c.sent();
                        e_3.message = "Failed to load " + issuerKey + ": " + e_3.message;
                        logger(2, e_3.message);
                        this.eventSender.emitErrorToClient(e_3, issuerKey);
                        onComplete(issuerKey, null);
                        return [3, 5];
                    case 5:
                        count++;
                        if (refresh)
                            return [3, 6];
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
    Client.prototype.setPassiveNegotiationWebTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuers, action, _loop_1, this_1, _a, _b, _i, issuer;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        issuers = this.tokenStore.getCurrentIssuers(false);
                        action = this.getDataFromQuery("action");
                        _loop_1 = function (issuer) {
                            var tokens, issuerConfig, resposeIssuer, resposeTokensEncoded, err_1;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        tokens = void 0;
                                        issuerConfig = this_1.tokenStore.getCurrentIssuers()[issuer];
                                        _d.label = 1;
                                    case 1:
                                        _d.trys.push([1, 6, , 7]);
                                        if (!((new URL(issuerConfig.tokenOrigin)).origin === document.location.origin)) return [3, 2];
                                        tokens = this_1.loadLocalOutletTokens(issuerConfig);
                                        return [3, 5];
                                    case 2:
                                        resposeIssuer = this_1.getDataFromQuery("issuer");
                                        if (!((action === OutletAction.GET_ISSUER_TOKENS + "-response"
                                            || action === "proof-callback")
                                            && issuer === resposeIssuer)) return [3, 3];
                                        resposeTokensEncoded = this_1.getDataFromQuery("tokens");
                                        try {
                                            tokens = JSON.parse(resposeTokensEncoded);
                                        }
                                        catch (e) {
                                            logger(2, "Error parse tokens from Response. ", e);
                                        }
                                        return [3, 5];
                                    case 3: return [4, this_1.loadRemoteOutletTokens(issuerConfig)];
                                    case 4:
                                        tokens = _d.sent();
                                        _d.label = 5;
                                    case 5: return [3, 7];
                                    case 6:
                                        err_1 = _d.sent();
                                        errorHandler('popup error', 'error', function () { return _this.eventSender.emitErrorToClient(err_1, issuer); }, null, true, false);
                                        return [2, "continue"];
                                    case 7:
                                        logger(2, "tokens:");
                                        logger(2, tokens);
                                        this_1.tokenStore.setTokens(issuer, tokens);
                                        return [2];
                                }
                            });
                        };
                        this_1 = this;
                        _a = [];
                        for (_b in issuers)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        issuer = _a[_i];
                        return [5, _loop_1(issuer)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Client.prototype.readTokensFromUrl = function () {
        var issuers = this.tokenStore.getCurrentIssuers(false);
        var issuer = this.getDataFromQuery("issuer");
        if (!issuer) {
            logger(3, "No issuer in URL.");
            return;
        }
        var issuerConfig = issuers[issuer];
        if (!issuerConfig) {
            logger(3, "No issuer config for \"".concat(issuer, "\" in URL."));
            return;
        }
        var tokens;
        try {
            if ((new URL(issuerConfig.tokenOrigin)).origin !== document.location.origin) {
                var resposeTokensEncoded = this.getDataFromQuery("tokens");
                try {
                    tokens = JSON.parse(resposeTokensEncoded);
                }
                catch (e) {
                    logger(2, "Error parse tokens from Response. ", e);
                }
            }
        }
        catch (err) {
            logger(1, "Error read tokens from URL");
            return;
        }
        if (!tokens) {
            logger(2, "No tokens for \"".concat(issuer, "\" in URL."));
            return;
        }
        logger(2, "readTokensFromUrl tokens:");
        logger(2, tokens);
        this.tokenStore.setTokens(issuer, tokens);
    };
    Client.prototype.setPassiveNegotiationOnChainTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issuers, walletProvider, _a, _b, _i, issuerKey, issuer, tokens, err_2;
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
                        if (!(_i < _a.length)) return [3, 7];
                        issuerKey = _a[_i];
                        issuer = issuers[issuerKey];
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4, getNftTokens(issuer, walletProvider.getConnectedWalletData()[0].address)];
                    case 4:
                        tokens = _c.sent();
                        this.tokenStore.setTokens(issuerKey, tokens);
                        return [3, 6];
                    case 5:
                        err_2 = _c.sent();
                        logger(2, err_2);
                        this.eventSender.emitErrorToClient(err_2, issuerKey);
                        return [3, 6];
                    case 6:
                        _i++;
                        return [3, 2];
                    case 7: return [2];
                }
            });
        });
    };
    Client.prototype.passiveNegotiationStrategy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, issuer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.setPassiveNegotiationWebTokens()];
                    case 1:
                        _a.sent();
                        return [4, this.setPassiveNegotiationOnChainTokens()];
                    case 2:
                        _a.sent();
                        tokens = this.tokenStore.getCurrentTokens();
                        logger(2, "Emit tokens");
                        logger(2, tokens);
                        for (issuer in tokens) {
                            tokens[issuer] = { tokens: tokens[issuer] };
                        }
                        this.eventSender.emitAllTokensToClient(tokens);
                        if (this.messaging.core.iframeStorageSupport === false && Object.keys(this.tokenStore.getCurrentTokens(false)).length === 0)
                            logger(2, "iFrame storage support not detected: Enable popups via your browser to access off-chain tokens with this negotiation type.");
                        return [2];
                }
            });
        });
    };
    Client.prototype.connectTokenIssuer = function (issuer) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var config, tokens, walletProvider, walletAddress;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        config = this.tokenStore.getCurrentIssuers()[issuer];
                        if (!config)
                            errorHandler('Undefined token issuer', 'error', null, null, true, true);
                        if (!(config.onChain === true)) return [3, 3];
                        return [4, this.getWalletProvider()];
                    case 1:
                        walletProvider = _b.sent();
                        walletAddress = (_a = walletProvider.getConnectedWalletData()[0]) === null || _a === void 0 ? void 0 : _a.address;
                        requiredParams(issuer, "issuer is required.");
                        requiredParams(walletAddress, "wallet address is missing.");
                        return [4, getNftTokens(config, walletAddress)];
                    case 2:
                        tokens = _b.sent();
                        return [3, 6];
                    case 3:
                        if (!((new URL(config.tokenOrigin)).origin === document.location.origin)) return [3, 4];
                        tokens = this.loadLocalOutletTokens(config);
                        return [3, 6];
                    case 4: return [4, this.loadRemoteOutletTokens(config)];
                    case 5:
                        tokens = _b.sent();
                        _b.label = 6;
                    case 6:
                        this.tokenStore.setTokens(issuer, tokens);
                        if (this.config.autoEnableTokens)
                            this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens());
                        return [2, tokens];
                }
            });
        });
    };
    Client.prototype.loadRemoteOutletTokens = function (issuer) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, redirectRequired, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = {
                            issuer: issuer,
                            filter: issuer.filters
                        };
                        if (issuer.accessRequestType)
                            data.access = issuer.accessRequestType;
                        redirectRequired = (browserBlocksIframeStorage() && this.config.type === "passive")
                            || this.config.forceOffChainTokenRedirect;
                        return [4, this.messaging.sendMessage({
                                action: OutletAction.GET_ISSUER_TOKENS,
                                origin: issuer.tokenOrigin,
                                data: data
                            }, this.config.messagingForceTab, this.config.type === "active" ? this.ui : null, redirectRequired ? this.createCurrentUrlWithoutHash() : false)];
                    case 1:
                        res = _c.sent();
                        return [2, (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.tokens) !== null && _b !== void 0 ? _b : []];
                }
            });
        });
    };
    Client.prototype.loadLocalOutletTokens = function (issuer) {
        var localOutlet = new LocalOutlet(issuer);
        return localOutlet.getTokens();
    };
    Client.prototype.updateSelectedTokens = function (selectedTokens) {
        this.tokenStore.setSelectedTokens(selectedTokens);
        this.eventSender.emitSelectedTokensToClient(selectedTokens);
    };
    Client.prototype.authenticate = function (authRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var issuer, unsignedToken, config, AuthType, authenticator, res, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.checkUserAgentSupport("authentication")];
                    case 1:
                        _a.sent();
                        issuer = authRequest.issuer, unsignedToken = authRequest.unsignedToken;
                        requiredParams(issuer && unsignedToken, "Issuer and unsigned token required.");
                        if (unsignedToken.signedToken) {
                            delete unsignedToken.signedToken;
                        }
                        config = this.tokenStore.getCurrentIssuers()[issuer];
                        if (!config)
                            errorHandler("Provided issuer was not found.", 'error', null, null, true, true);
                        if (this.ui) {
                            this.ui.showLoaderDelayed([
                                "<h4>Authenticating...</h4>",
                                "<small>You may need to sign a new challenge in your wallet</small>",
                                "<button class='cancel-auth-btn btn-tn' aria-label='Cancel authentication'>Cancel</button>"
                            ], 600, true);
                            this.enableAuthCancel(issuer);
                        }
                        if (authRequest.type) {
                            AuthType = authRequest.type;
                        }
                        else {
                            AuthType = config.onChain ? SignedUNChallenge : TicketZKProof;
                        }
                        authenticator = new AuthType(this);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        if (!authRequest.options)
                            authRequest.options = {};
                        authRequest.options.messagingForceTab = this.config.messagingForceTab;
                        logger(2, "authRequest", authRequest);
                        logger(2, "get proof at ", window.location.href);
                        return [4, authenticator.getTokenProof(config, [authRequest.unsignedToken], authRequest)];
                    case 3:
                        res = _a.sent();
                        logger(2, "proof received at ", window.location.href);
                        logger(2, "Ticket proof successfully validated.");
                        this.eventSender.emitProofToClient(res.data, issuer);
                        return [3, 5];
                    case 4:
                        err_3 = _a.sent();
                        logger(2, err_3);
                        if (err_3.message === "WALLET_REQUIRED") {
                            return [2, this.handleWalletRequired(authRequest)];
                        }
                        errorHandler(err_3, 'error', function () { return _this.handleProofError(err_3, issuer); }, null, false, true);
                        return [3, 5];
                    case 5:
                        if (this.ui) {
                            this.ui.dismissLoader();
                            this.ui.closeOverlay();
                        }
                        return [2, res.data];
                }
            });
        });
    };
    Client.prototype.enableAuthCancel = function (issuer) {
        var _this = this;
        waitForElementToExist('.cancel-auth-btn').then(function (cancelAuthButton) {
            cancelAuthButton.onclick = function () {
                var err = 'User cancelled authentication';
                _this.ui.showError(err);
                _this.eventSender.emitProofToClient(null, issuer, err);
            };
        });
    };
    Client.prototype.handleWalletRequired = function (authRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var walletProvider;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ui) return [3, 1];
                        this.ui.dismissLoader();
                        this.ui.openOverlay();
                        return [3, 4];
                    case 1: return [4, this.getWalletProvider()];
                    case 2:
                        walletProvider = _a.sent();
                        return [4, walletProvider.connectWith("MetaMask")];
                    case 3:
                        _a.sent();
                        return [2, this.authenticate(authRequest)];
                    case 4: return [2, new Promise(function (resolve, reject) {
                            _this.ui.updateUI("wallet", { connectCallback: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var res, e_4;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                this.ui.updateUI("main");
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                return [4, this.authenticate(authRequest)];
                                            case 2:
                                                res = _a.sent();
                                                resolve(res);
                                                return [3, 4];
                                            case 3:
                                                e_4 = _a.sent();
                                                reject(e_4);
                                                return [3, 4];
                                            case 4: return [2];
                                        }
                                    });
                                }); } });
                        })];
                }
            });
        });
    };
    Client.prototype.handleProofError = function (err, issuer) {
        if (this.ui)
            this.ui.showError(err);
        this.eventSender.emitProofToClient(null, issuer, err);
    };
    Client.prototype.getOutletConfigForCurrentOrigin = function () {
        var allIssuers = this.tokenStore.getCurrentIssuers();
        var currentIssuers = [];
        Object.keys(allIssuers).forEach(function (key) {
            var issuerConfig = allIssuers[key];
            try {
                if ((new URL(issuerConfig.tokenOrigin)).origin === document.location.origin) {
                    currentIssuers.push(issuerConfig);
                }
            }
            catch (err) {
                logger(2, err);
                console.log("issuer config error " + err.message);
            }
        });
        if (currentIssuers.length) {
            return currentIssuers[0];
        }
        return false;
    };
    Client.prototype.onlySameOrigin = function () {
        var allIssuers = this.tokenStore.getCurrentIssuers();
        var onlySameOriginFlag = true;
        Object.keys(allIssuers).forEach(function (key) {
            var issuerConfig = allIssuers[key];
            var thisOneSameOrigin = false;
            try {
                if ((new URL(issuerConfig.tokenOrigin)).origin === document.location.origin) {
                    thisOneSameOrigin = true;
                }
            }
            catch (err) {
                logger(2, err);
                console.log("issuer config error");
            }
            if (!thisOneSameOrigin) {
                onlySameOriginFlag = false;
            }
        });
        return onlySameOriginFlag;
    };
    Client.prototype.addTokenViaMagicLink = function (magicLink) {
        return __awaiter(this, void 0, void 0, function () {
            var url, params, res;
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
                            }, this.config.messagingForceTab)];
                    case 1:
                        res = _a.sent();
                        if (res.evt === OutletResponseAction.ISSUER_TOKENS)
                            return [2, res.data.tokens];
                        errorHandler(res.errors.join("\n"), 'error', null, false, true);
                        return [2];
                }
            });
        });
    };
    Client.prototype.on = function (type, callback, data) {
        requiredParams(type, "Event type is not defined");
        if ((type === 'tokens' || type === 'tokens-selected') && callback) {
            this.readTokensFromUrl();
        }
        if (type === 'token-proof' && callback) {
            logger(2, "token-proof listener atteched. check URL HASH for proof callbacks.");
            var action = this.getDataFromQuery("action");
            if (action === "proof-callback") {
                this.readProofCallback();
                document.location.hash = "";
            }
            else if (action === "email-callback") {
                var currentIssuer = this.getOutletConfigForCurrentOrigin();
                if (currentIssuer) {
                    logger(2, "Outlet fired to parse URL hash params.");
                    var outlet_1 = new Outlet(currentIssuer, true, this.urlParams);
                    outlet_1.pageOnLoadEventHandler().then(function () {
                        outlet_1 = null;
                    });
                }
                document.location.hash = "";
            }
        }
        if (callback) {
            this.clientCallBackEvents[type] = callback;
        }
        else {
            if (this.clientCallBackEvents[type]) {
                return this.clientCallBackEvents[type].call(type, data);
            }
        }
    };
    Client.prototype.switchTheme = function (newTheme) {
        this.ui.switchTheme(newTheme);
    };
    return Client;
}());
export { Client };
//# sourceMappingURL=index.js.map