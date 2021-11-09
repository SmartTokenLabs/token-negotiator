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
import { ethers } from "ethers";
import { getTokens } from "./../core/index";
import { config } from "./../config/index";
import OverlayService from "./overlayService";
var Client = (function () {
    function Client(filter, tokenName, options) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        if (options === void 0) { options = {}; }
        this.getTokenProofFromOutlet = function (tokensOrigin, localStorageItemName, unsignedToken) {
            _this.getTokenProofFromOutletIframe(tokensOrigin, localStorageItemName, unsignedToken);
            return new Promise(function (resolve, reject) {
                window.addEventListener('message', function (event) {
                    if (event.data.evt === 'setTokenProof') {
                        resolve(event.data.tokenProof);
                    }
                }, false);
            });
        };
        this.getTokenProofFromOutletIframe = function (tokensOrigin, localStorageItemName, unsignedToken) {
            return new Promise(function (resolve, reject) {
                var iframe = document.createElement('iframe');
                iframe.src = tokensOrigin;
                iframe.style.width = '1px';
                iframe.style.height = '1px';
                iframe.style.opacity = '0';
                document.body.appendChild(iframe);
                iframe.onload = function () {
                    iframe.contentWindow.postMessage({
                        evt: 'getTokenProof',
                        localStorageItemName: localStorageItemName,
                        unsignedToken: unsignedToken
                    }, tokensOrigin);
                    resolve(true);
                };
            });
        };
        if (!tokenName)
            throw new Error('Please provide token name.');
        if (options.useOverlay === true && !options.tokenSelectorContainer)
            throw new Error('tokenSelectorContainer is a required parameter when useOverlay is true.');
        this.tokenName = tokenName;
        this.config = config[tokenName];
        this.options = options;
        this.filter = filter;
    }
    Client.prototype.negotiate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens;
            return __generator(this, function (_a) {
                if (this.options.useOverlay === true) {
                    this.negotiateViaOverlay();
                }
                else {
                    tokens = this.negotiateViaOutlet();
                    return [2, tokens];
                }
                return [2];
            });
        });
    };
    Client.prototype.negotiateViaOutlet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, getTokens({
                            filter: this.filter,
                            tokenName: this.config.tokenName,
                            tokensOrigin: this.config.tokenOrigin,
                            localStorageItemName: this.config.localStorageItemName,
                            tokenParser: this.config.tokenParser,
                            unsignedTokenDataName: this.config.unsignedTokenDataName
                        })];
                    case 1:
                        tokens = _a.sent();
                        return [2, tokens];
                }
            });
        });
    };
    Client.prototype.negotiateViaOverlay = function () {
        var overlayService = new OverlayService(this.config, this.options, this.filter);
        this.overlayClickHandler = overlayService.overlayClickHandler;
    };
    Client.prototype.connectMetamaskAndGetAddress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.ethereum)
                            throw new Error('Please install metamask to continue.');
                        return [4, window.ethereum.request({ method: 'eth_requestAccounts' })];
                    case 1:
                        userAddresses = _a.sent();
                        if (!userAddresses || !userAddresses.length)
                            throw new Error("Active Wallet required");
                        return [2, userAddresses[0]];
                }
            });
        });
    };
    Client.prototype.signMessageWithBrowserWallet = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, signer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.connectMetamaskAndGetAddress()];
                    case 1:
                        _a.sent();
                        provider = new ethers.providers.Web3Provider(window.ethereum);
                        signer = provider.getSigner();
                        return [4, signer.signMessage(message)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    Client.prototype.authenticate = function (_a) {
        var unsignedToken = _a.unsignedToken, unEndPoint = _a.unEndPoint;
        return __awaiter(this, void 0, void 0, function () {
            var useEthKey, attestedAddress, walletAddress, tokenProof, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!unsignedToken || !unEndPoint)
                            return [2, { status: false, useEthKey: null, proof: null }];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4, this.getChallengeSigned(unEndPoint)];
                    case 2:
                        useEthKey = _b.sent();
                        return [4, this.validateUseEthKey(unEndPoint, useEthKey)];
                    case 3:
                        attestedAddress = _b.sent();
                        return [4, this.connectMetamaskAndGetAddress()];
                    case 4:
                        walletAddress = _b.sent();
                        if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase())
                            throw new Error('useEthKey validation failed.');
                        return [4, this.getTokenProofFromOutlet(this.config.tokenOrigin, this.config.localStorageItemName, unsignedToken)];
                    case 5:
                        tokenProof = _b.sent();
                        return [2, { status: true, useEthKey: useEthKey, proof: tokenProof }];
                    case 6:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [2, e_1];
                    case 7: return [2];
                }
            });
        });
    };
    Client.prototype.validateUseEthKey = function (endPoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, fetch(endPoint, {
                                method: 'POST',
                                cache: 'no-cache',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
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
                        e_2 = _a.sent();
                        return [2, {
                                success: false,
                                message: "validate ethkey request failed"
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    Client.prototype.getUnpredictableNumber = function (endPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json, e_3;
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
                        e_3 = _a.sent();
                        return [2, {
                                success: false,
                                message: "UN request failed"
                            }];
                    case 4: return [2];
                }
            });
        });
    };
    Client.prototype.addTokenThroughIframe = function (magicLink) {
        var iframe = document.createElement('iframe');
        iframe.src = magicLink;
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';
        document.body.appendChild(iframe);
    };
    Client.prototype.ethKeyIsValid = function (ethKey) {
        return ethKey.expiry >= Date.now();
    };
    Client.prototype.getChallengeSigned = function (unEndPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var storageEthKeys, ethKeys, address, useEthKey, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storageEthKeys = localStorage.getItem(this.config.localStorageEthKeyItemName);
                        ethKeys = (storageEthKeys && storageEthKeys.length) ? JSON.parse(storageEthKeys) : {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4, this.connectMetamaskAndGetAddress()];
                    case 2:
                        address = _a.sent();
                        address = address.toLowerCase();
                        useEthKey = void 0;
                        if (ethKeys && ethKeys[address] && !this.ethKeyIsValid(ethKeys[address])) {
                            delete ethKeys[address];
                        }
                        if (!(ethKeys && ethKeys[address])) return [3, 3];
                        useEthKey = ethKeys[address];
                        return [3, 5];
                    case 3: return [4, this.signNewChallenge(unEndPoint)];
                    case 4:
                        useEthKey = _a.sent();
                        if (useEthKey) {
                            ethKeys[useEthKey.address.toLowerCase()] = useEthKey;
                            localStorage.setItem(this.config.localStorageEthKeyItemName, JSON.stringify(ethKeys));
                        }
                        _a.label = 5;
                    case 5: return [2, useEthKey];
                    case 6:
                        e_4 = _a.sent();
                        console.error(e_4);
                        throw new Error(e_4.message);
                    case 7: return [2];
                }
            });
        });
    };
    Client.prototype.signNewChallenge = function (unEndPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var res, UN, randomness, domain, expiry, messageToSign, signature, msgHash, msgHashBytes, recoveredAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getUnpredictableNumber(unEndPoint)];
                    case 1:
                        res = _a.sent();
                        UN = res.number, randomness = res.randomness, domain = res.domain, expiry = res.expiration, messageToSign = res.messageToSign;
                        return [4, this.signMessageWithBrowserWallet(messageToSign)];
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
        });
    };
    return Client;
}());
export { Client };
//# sourceMappingURL=index.js.map