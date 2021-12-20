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
import { asyncHandle, requiredParams, logger } from './../utils/index';
import { getTokens, getChallengeSigned, validateUseEthKey, connectMetamaskAndGetAddress, getTokenProof } from "../core/index";
import { createOverlayMarkup, createFabButton, createToken } from './componentFactory';
import { tokenLookup } from './../tokenLookup';
import './../Attestation/authenticator';
import "./../theme/style.css";
import './../vendor/keyShape';
var Client = (function () {
    function Client(config) {
        var _this = this;
        var type = config.type, issuers = config.issuers, options = config.options;
        this.authenticator = new Authenticator();
        requiredParams(this.authenticator, "authenticator is missing");
        requiredParams(type, 'type is required.');
        requiredParams(issuers, 'issuers are missing.');
        this.type = type;
        this.options = options;
        this.issuers = issuers;
        this.offChainTokens = { tokenKeys: [] };
        this.onChainTokens = { tokenKeys: [] };
        issuers.map(function (issuer) {
            if (tokenLookup[issuer].onChain === true) {
                _this.onChainTokens.tokenKeys.push(issuer);
                _this.onChainTokens[issuer] = { tokens: [] };
            }
            else {
                _this.offChainTokens.tokenKeys.push(issuer);
                _this.offChainTokens[issuer] = { tokens: [] };
            }
        });
    }
    Client.prototype.setWebTokens = function (offChainTokens) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(offChainTokens.tokenKeys.map(function (issuer) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, tokenOrigin, itemStorageKey, tokenParser, unsignedTokenDataName, tokens;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = tokenLookup[issuer], tokenOrigin = _a.tokenOrigin, itemStorageKey = _a.itemStorageKey, tokenParser = _a.tokenParser, unsignedTokenDataName = _a.unsignedTokenDataName;
                                        return [4, getTokens({ filter: {}, tokensOrigin: tokenOrigin, itemStorageKey: itemStorageKey, tokenParser: tokenParser, unsignedTokenDataName: unsignedTokenDataName })];
                                    case 1:
                                        tokens = _b.sent();
                                        this.offChainTokens[issuer].tokens = tokens;
                                        return [2, tokens];
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
            var _a, webTokens, webTokensErr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, asyncHandle(this.setWebTokens(this.offChainTokens))];
                    case 1:
                        _a = _b.sent(), webTokens = _a[0], webTokensErr = _a[1];
                        if (!webTokens || webTokensErr) {
                            logger('token negotiator: no web tokens found.');
                        }
                        if (this.type === 'active') {
                            this.activeNegotiationStrategy();
                        }
                        else {
                            return [2, this.passiveNegotiationStrategy()];
                        }
                        return [2];
                }
            });
        });
    };
    Client.prototype.passiveNegotiationStrategy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var outputOnChain, outputOffChain;
            return __generator(this, function (_a) {
                outputOnChain = this.onChainTokens;
                delete outputOnChain.tokenKeys;
                outputOffChain = this.offChainTokens;
                delete outputOffChain.tokenKeys;
                return [2, __assign(__assign({}, outputOffChain), outputOnChain)];
            });
        });
    };
    Client.prototype.activeNegotiationStrategy = function () {
        this.embedClientOverlay();
    };
    Client.prototype.embedClientOverlay = function () {
        var _this = this;
        var _a, _b;
        var _index = 0;
        var element = document.querySelector(".overlay-tn");
        requiredParams(element, 'No overlay element found.');
        if (element) {
            element.innerHTML += createOverlayMarkup((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.overlay) === null || _b === void 0 ? void 0 : _b.heading);
            element.innerHTML += createFabButton();
            var refTokenContainerSelector_1 = document.querySelector(".token-container-tn");
            this.offChainTokens.tokenKeys.map(function (issuer) {
                var i = _this.offChainTokens[issuer];
                if (i.tokens.length) {
                    refTokenContainerSelector_1.innerHTML = "";
                    i.tokens.map(function (t) {
                        var _a = tokenLookup[issuer], title = _a.title, emblem = _a.emblem;
                        refTokenContainerSelector_1.innerHTML += createToken({
                            data: t,
                            tokenIssuerKey: issuer,
                            index: _index,
                            title: title,
                            emblem: emblem
                        });
                        _index++;
                    });
                }
            });
            this.assignFabButtonAnimation();
            this.addTheme();
        }
        window.tokenToggleSelection = this.tokenToggleSelection;
    };
    Client.prototype.addTheme = function () {
        var _a, _b, _c, _d;
        var refTokenSelector = document.querySelector(".overlay-tn");
        refTokenSelector.classList.add(((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.overlay) === null || _b === void 0 ? void 0 : _b.theme) ? (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.overlay) === null || _d === void 0 ? void 0 : _d.theme : 'light');
    };
    Client.prototype.assignFabButtonAnimation = function () {
        if (window.KeyshapeJS) {
            window.KeyshapeJS.globalPause();
            window.KeyshapeJS.animate("#svg-tn-left", [{ p: 'mpath', t: [0, 400], v: ['0%', '100%'], e: [[1, 0, 0, .6, 1], [0]], mp: "M13,28.5L27.1,28.1" }, { p: 'rotate', t: [0, 400], v: [0, 0], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'scaleX', t: [0, 400], v: [1, 1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'scaleY', t: [0, 400], v: [1, 1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorX', t: [0, 400], v: [-13, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorY', t: [0, 400], v: [-13.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'd', t: [0, 400], v: ["path('M25.5,26C25.5,26,20.5,26,20.5,26C20.5,23.1,19.9,20.4,18.8,17.9C17.8,15.6,16.4,13.6,14.6,11.8C12.7,9.9,10.3,8.4,7.8,7.4C5.5,6.5,3,6,.5,6L.5,1C.5,1,.5,1,.5,1C.5,1,7.5,1,7.5,1L25.5,1L25.5,7.2C25.5,7.2,25.5,12.8,25.5,12.8C25.5,12.8,25.5,19,25.5,19Z')", "path('M31.8,32.8C31.5,33.2,30.9,33.4,30.4,33.4C29.9,33.4,29.4,33.2,29,32.8C29,32.8,1.4,5.2,1.4,5.2C1,4.8,.8,4.3,.8,3.8C.8,3.3,1,2.8,1.4,2.4L2.4,1.4C2.7,1,3.3,.8,3.8,.8C4.3,.8,4.8,1,5.2,1.4L5.2,1.4L32.8,29C33.2,29.4,33.4,29.9,33.4,30.4C33.4,30.9,33.2,31.5,32.8,31.8Z')"], e: [[1, 0, 0, .6, 1], [0]] }], "#svg-tn-right", [{ p: 'mpath', t: [0, 400], v: ['0%', '100%'], e: [[1, 0, 0, .6, 1], [0]], mp: "M41.5,28.7L27.1,28.1" }, { p: 'rotate', t: [0, 400], v: [0, 0], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorX', t: [0, 400], v: [-40.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorY', t: [0, 400], v: [-13.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'd', t: [0, 400], v: ["path('M53,1C53,1,53,1,53,1C53,1,53,12.9,53,12.9L53,19C53,19,53,26,53,26C53,26,40.2,26,40.2,26L34.1,26C34.1,26,28,26,28,26C28,26,28,12.6,28,12.6L28,7.4C28,7.4,28,1,28,1C28,1,40.6,1,40.6,1C40.6,1,45.9,1,45.9,1Z')", "path('M29,1.4C29.4,1,29.9,.8,30.4,.8C30.9,.8,31.5,1,31.8,1.4L32.8,2.4C33.2,2.7,33.4,3.3,33.4,3.8C33.4,4.3,33.2,4.8,32.8,5.2L5.2,32.8C4.8,33.2,4.3,33.4,3.8,33.4C3.3,33.4,2.8,33.2,2.4,32.8L1.4,31.8C1,31.5,.8,30.9,.8,30.4C.8,29.9,1,29.4,1.4,29C1.4,29,29,1.4,29,1.4Z')"], e: [[1, 0, 0, .6, 1], [0]] }], { autoremove: false }).range(0, 400);
        }
    };
    Client.prototype.openOverlay = function (openOverlay) {
        var element = document.querySelector(".overlay-tn");
        requiredParams(element, 'No overlay element found.');
        element.classList.toggle("open");
        if (openOverlay) {
            element.classList.add("open");
            window.KeyshapeJS.timelines()[0].time(0);
            window.KeyshapeJS.globalPlay();
        }
        else {
            element.classList.remove("open");
            window.KeyshapeJS.timelines()[0].time(0);
            window.KeyshapeJS.globalPause();
        }
    };
    Client.prototype.overlayClickHandler = function () {
        var element = document.querySelector(".overlay-tn");
        requiredParams(element, 'No overlay element found.');
        var isOpen = element.classList.contains("open");
        element.classList.toggle("open");
        if (!isOpen) {
            this.openOverlay(true);
        }
        else {
            this.openOverlay(false);
        }
    };
    Client.prototype.tokenToggleSelection = function () {
        var selectedTokens = {};
        document.querySelectorAll('.token-tn .mobileToggle-tn').forEach(function (token, index) {
            if (index === 0) {
                selectedTokens[token.dataset.key] = {};
                selectedTokens[token.dataset.key]['tokens'] = [];
            }
            if (token.checked === true) {
                var output = JSON.parse(token.dataset.token);
                selectedTokens[token.dataset.key].tokens.push(output);
            }
        });
        window.postMessage({ evt: 'negotiatedTokensEvt', selectedTokens: selectedTokens }, window.location.origin);
    };
    Client.prototype.authenticate = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var issuer, unsignedToken, _a, unEndPoint, onChain, useEthKey, attestedAddress, walletAddress, tokenProof, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        issuer = config.issuer, unsignedToken = config.unsignedToken;
                        _a = tokenLookup[issuer], unEndPoint = _a.unEndPoint, onChain = _a.onChain;
                        if (onChain === true || !unsignedToken || !unEndPoint)
                            return [2, { status: false, useEthKey: null, proof: null }];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4, getChallengeSigned(tokenLookup[issuer])];
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
                        return [4, getTokenProof(unsignedToken, tokenLookup[issuer])];
                    case 5:
                        tokenProof = _b.sent();
                        return [2, { status: true, useEthKey: useEthKey, proof: tokenProof }];
                    case 6:
                        e_1 = _b.sent();
                        return [2, { status: false, useEthKey: null, proof: null }];
                    case 7: return [2];
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
    return Client;
}());
export { Client };
//# sourceMappingURL=index.js.map