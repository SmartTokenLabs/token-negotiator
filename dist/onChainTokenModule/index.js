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
import { logger, requiredParams } from "../utils";
var DEFAULT_IPFS_BASE_URL = "https://gateway.pinata.cloud/ipfs/";
var OnChainTokenModule = (function () {
    function OnChainTokenModule(onChainModuleKeys, ipfsBaseUrl) {
        var _a, _b, _c;
        var moralisAPIKey = (_a = onChainModuleKeys === null || onChainModuleKeys === void 0 ? void 0 : onChainModuleKeys.moralis) !== null && _a !== void 0 ? _a : "fvPB0g6SCkF3ncJSip9afJPzdGxPs7oznJkOVLWn8VU4yzprUKhrpag0fhElxflJ";
        var alchemyAPIKey = (_b = onChainModuleKeys === null || onChainModuleKeys === void 0 ? void 0 : onChainModuleKeys.alchemy) !== null && _b !== void 0 ? _b : "CWaS4PkRjFi3dAzrRD6lsrQ7vAyPYsnU";
        var openSeaAPIKey = (_c = onChainModuleKeys === null || onChainModuleKeys === void 0 ? void 0 : onChainModuleKeys.opensea) !== null && _c !== void 0 ? _c : "6d967684497b46ed926277e95782946b";
        this.onChainApiConfig = {
            moralis: {
                chainSupport: [
                    "eth",
                    "mainnet",
                    "rinkeby",
                    "ropsten",
                    "goerli",
                    "kovan",
                    "bsc",
                    "polygon",
                    "mumbai",
                    "avalanche",
                    "fantom",
                ],
                config: {
                    mainnet: {
                        url: "https://deep-index.moralis.io/api/v2/",
                        apiKey: moralisAPIKey,
                    },
                },
            },
            alchemy: {
                chainSupport: [
                    "eth",
                    "mainnet",
                    "rinkeby",
                    "arbitrum",
                    "polygon",
                    "optimism",
                ],
                config: {
                    mainnet: {
                        url: "https://eth-mainnet.alchemyapi.io/v2/",
                        apiKey: alchemyAPIKey,
                    },
                    rinkeby: {
                        url: "https://eth-rinkeby.alchemyapi.io/v2/",
                        apiKey: alchemyAPIKey,
                    },
                    optimism: {
                        url: "https://opt-mainnet.g.alchemy.com/v2/",
                        apiKey: alchemyAPIKey,
                    },
                    arbitrum: {
                        url: "wss://arb-mainnet.g.alchemy.com/v2/",
                        apiKey: alchemyAPIKey,
                    },
                    polygon: {
                        url: "https://polygon-mainnet.g.alchemyapi.io/v2/",
                        apiKey: alchemyAPIKey,
                    },
                },
            },
            opensea: {
                chainSupport: ["eth", "mainnet", "rinkeby"],
                config: {
                    mainnet: {
                        url: "https://api.opensea.io/api/v1/",
                        apiKey: openSeaAPIKey,
                    },
                    rinkeby: {
                        url: "https://testnets-api.opensea.io/api/v1/"
                    },
                },
            },
            poap: {
                chainSupport: ["xdai"],
                config: {
                    mainnet: {
                        url: "",
                        apiKey: "",
                    },
                },
            },
        };
        this.ipfsBaseUrl = ipfsBaseUrl;
        this.hasIpfsSchemeSupport = (navigator.brave && navigator.brave.isBrave.name === "isBrave" || false);
    }
    OnChainTokenModule.prototype.getOnChainAPISupportBool = function (apiName, chain) {
        if (!this.onChainApiConfig[apiName])
            return false;
        return this.onChainApiConfig[apiName].chainSupport.indexOf(chain) > -1;
    };
    OnChainTokenModule.prototype.transformImageUrl = function (url) {
        var _a;
        if (!url)
            return url;
        if (this.hasIpfsSchemeSupport && !this.ipfsBaseUrl)
            return url;
        var useBase = (_a = this.ipfsBaseUrl) !== null && _a !== void 0 ? _a : DEFAULT_IPFS_BASE_URL;
        if (url.indexOf("ipfs://") === 0) {
            return url.replace("ipfs://", useBase);
        }
        if (!this.ipfsBaseUrl)
            return url;
        var regex = /https:\/\/gateway.pinata.cloud\/ipfs\//i;
        return url.replace(regex, useBase);
    };
    OnChainTokenModule.prototype.getInitialContractAddressMetaData = function (issuer) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, chain, openSeaSlug, collectionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = issuer.contract, chain = issuer.chain, openSeaSlug = issuer.openSeaSlug;
                        collectionData = null;
                        if (contract.toLowerCase() === "0x22c1f6050e56d2876009903609a2cc3fef83b415") {
                            return [2, {
                                    api: "poap",
                                    chain: chain,
                                    contract: contract,
                                    image: "https://storage.googleapis.com/subgraph-images/1647414847706poap.jpeg",
                                    title: "POAP Proof of attendance protocol",
                                }];
                        }
                        if (!(openSeaSlug !== undefined)) return [3, 2];
                        return [4, this.getContractDataOpenSea(contract, chain, openSeaSlug)];
                    case 1:
                        collectionData = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!!collectionData) return [3, 4];
                        return [4, this.getContractDataMoralis(contract, chain)];
                    case 3:
                        collectionData = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(openSeaSlug === undefined && !collectionData)) return [3, 6];
                        return [4, this.getContractDataAlchemy(contract, chain)];
                    case 5:
                        collectionData = _a.sent();
                        _a.label = 6;
                    case 6: return [2, collectionData];
                }
            });
        });
    };
    OnChainTokenModule.prototype.getContractDataOpenSea = function (contractAddress, chain, openSeaSlug) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, response, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.getOnChainAPISupportBool("opensea", chain))
                            return [2, null];
                        path = "/assets?asset_contract_address=".concat(contractAddress, "&collection=").concat(openSeaSlug, "&order_direction=desc&offset=0&limit=20");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.getDataOpensea(path, chain)];
                    case 2:
                        response = _b.sent();
                        return [3, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.warn("Failed to collect contract data from OpenSea API", error_1.message);
                        return [2, null];
                    case 4:
                        if (!((_a = response === null || response === void 0 ? void 0 : response.assets) === null || _a === void 0 ? void 0 : _a.length))
                            return [2, null];
                        return [2, {
                                api: "opensea",
                                chain: chain,
                                contract: contractAddress,
                                image: response.assets[0].collection.image_url,
                                title: response.assets[0].collection.name,
                            }];
                }
            });
        });
    };
    OnChainTokenModule.prototype.getContractDataMoralis = function (contractAddress, chain) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, response, image, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.getOnChainAPISupportBool("moralis", chain))
                            return [2, null];
                        if (chain === "mainnet")
                            chain = "eth";
                        path = "/nft/".concat(contractAddress, "?chain=").concat(chain, "&format=decimal&limit=1");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.getDataMoralis(path, chain)];
                    case 2:
                        response = _b.sent();
                        if (!((_a = response === null || response === void 0 ? void 0 : response.result) === null || _a === void 0 ? void 0 : _a.length))
                            return [2, null];
                        image = JSON.parse(response.result[0].metadata).image;
                        return [3, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.warn("Failed to collect contract data from Moralis API", err_1.message);
                        return [2, null];
                    case 4: return [2, {
                            api: "moralis",
                            chain: chain,
                            contract: contractAddress,
                            image: this.transformImageUrl(image),
                            title: response.result[0].name,
                        }];
                }
            });
        });
    };
    OnChainTokenModule.prototype.getContractDataAlchemy = function (contractAddress, chain) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var tokenId, withMetadata, path, response, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.getOnChainAPISupportBool("alchemy", chain))
                            return [2, null];
                        tokenId = "0";
                        withMetadata = "true";
                        path = "/getNFTsForCollection?contractAddress=".concat(contractAddress, "&cursorKey=").concat(tokenId, "&withMetadata=").concat(withMetadata);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.getDataAlchemy(path, chain)];
                    case 2:
                        response = _b.sent();
                        return [3, 4];
                    case 3:
                        err_2 = _b.sent();
                        console.warn("failed to collect contract data from Alchemy API", err_2);
                        return [2, null];
                    case 4:
                        if (!((_a = response === null || response === void 0 ? void 0 : response.nfts) === null || _a === void 0 ? void 0 : _a.length))
                            return [2, null];
                        return [2, {
                                api: "alchemy",
                                chain: chain,
                                contract: contractAddress,
                                image: this.transformImageUrl(response.nfts[0].metadata.image),
                                title: response.nfts[0].title,
                            }];
                }
            });
        });
    };
    OnChainTokenModule.prototype.connectOnChainToken = function (issuer, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, chain, openSeaSlug, tokens, openseaTokens, moralisTokens, alchemyTokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = issuer.contract, chain = issuer.chain, openSeaSlug = issuer.openSeaSlug;
                        tokens = {};
                        if (contract.toLowerCase() === "0x22c1f6050e56d2876009903609a2cc3fef83b415") {
                            return [2, this.getTokensPOAP(owner)];
                        }
                        if (!(openSeaSlug !== undefined)) return [3, 2];
                        return [4, this.getTokensOpenSea(contract, chain, owner, openSeaSlug)];
                    case 1:
                        openseaTokens = _a.sent();
                        tokens = this.mergeTokenMetadata(tokens, openseaTokens);
                        _a.label = 2;
                    case 2:
                        if (!!this.validateTokenMetadata(tokens)) return [3, 4];
                        return [4, this.getTokensMoralis(contract, chain, owner)];
                    case 3:
                        moralisTokens = _a.sent();
                        tokens = this.mergeTokenMetadata(tokens, moralisTokens);
                        _a.label = 4;
                    case 4:
                        if (!(!this.validateTokenMetadata(tokens) && openSeaSlug === undefined)) return [3, 6];
                        return [4, this.getTokensAlchemy(contract, chain, owner)];
                    case 5:
                        alchemyTokens = _a.sent();
                        tokens = this.mergeTokenMetadata(tokens, alchemyTokens);
                        _a.label = 6;
                    case 6:
                        logger(2, tokens);
                        return [2, Object.values(tokens)];
                }
            });
        });
    };
    OnChainTokenModule.prototype.mergeTokenMetadata = function (curTokens, tokens) {
        var e_1, _a;
        try {
            for (var tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                var token = tokens_1_1.value;
                if (!curTokens[token.tokenId]) {
                    curTokens[token.tokenId] = token;
                    continue;
                }
                if (!curTokens[token.tokenId].title && token.title)
                    curTokens[token.tokenId].title = token.title;
                if (!curTokens[token.tokenId].image && token.image)
                    curTokens[token.tokenId].image = token.image;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return curTokens;
    };
    OnChainTokenModule.prototype.validateTokenMetadata = function (tokens) {
        var _a;
        if (!Object.keys(tokens).length)
            return false;
        for (var tokenId in tokens) {
            var titleIsOfTypeStr = (typeof tokens[tokenId].title === 'string');
            var ImageHasLength = ((_a = tokens[tokenId].image) === null || _a === void 0 ? void 0 : _a.length) ? true : false;
            if (!titleIsOfTypeStr || !ImageHasLength)
                return false;
        }
        return true;
    };
    OnChainTokenModule.prototype.getTokensOpenSea = function (address, chain, owner, openSeaSlug, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                if (!this.getOnChainAPISupportBool("opensea", chain))
                    return [2, []];
                requiredParams(chain && address && owner, "cannot search for tokens, missing params");
                path = "/assets?owner=".concat(owner, "&collection=").concat(openSeaSlug, "&order_direction=desc&offset=0&limit=20");
                return [2, this.getDataOpensea(path, chain)
                        .then(function (response) {
                        return response.assets.filter(function (item) {
                            return item.token_id !== null;
                        }).map(function (item) {
                            var image = item.image_url ? item.image_url : "";
                            var title = item.name ? item.name : "";
                            return {
                                api: "opensea",
                                tokenId: item.token_id,
                                title: title,
                                image: image,
                                data: item,
                            };
                        });
                    })
                        .catch(function (error) {
                        console.warn("Failed to collect contract data from OpenSea API", error);
                        return [];
                    })];
            });
        });
    };
    OnChainTokenModule.prototype.getTokensMoralis = function (address, chain, owner, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var _chain, path;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.getOnChainAPISupportBool("moralis", chain))
                    return [2, []];
                requiredParams(chain && address && owner, "cannot search for tokens, missing params");
                _chain = chain;
                if (chain === "mainnet")
                    _chain = "eth";
                path = "/".concat(owner, "/nft/").concat(address, "?chain=").concat(_chain, "&format=decimal");
                return [2, this.getDataMoralis(path, chain).then(function (response) {
                        return response.result.filter(function (item) {
                            return item.token_id !== null;
                        }).map(function (item) {
                            var parsedMeta = null;
                            if (item.metadata) {
                                parsedMeta = JSON.parse(item.metadata);
                            }
                            var title = (parsedMeta === null || parsedMeta === void 0 ? void 0 : parsedMeta.title) || (parsedMeta === null || parsedMeta === void 0 ? void 0 : parsedMeta.name) || "";
                            return {
                                api: "moralis",
                                tokenId: item.token_id,
                                title: title,
                                image: (parsedMeta === null || parsedMeta === void 0 ? void 0 : parsedMeta.image) ? _this.transformImageUrl(parsedMeta === null || parsedMeta === void 0 ? void 0 : parsedMeta.image) : "",
                                data: parsedMeta,
                            };
                        });
                    })
                        .catch(function (err) {
                        console.warn("Failed to collect tokens from Moralis API", err.message);
                        return [];
                    })];
            });
        });
    };
    OnChainTokenModule.prototype.getTokensAlchemy = function (address, chain, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var path;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.getOnChainAPISupportBool("alchemy", chain))
                    return [2, []];
                path = "/getNFTs/?owner=".concat(owner, "&contractAddresses[]=").concat(address);
                return [2, this.getDataAlchemy(path, chain)
                        .then(function (result) {
                        return result.ownedNfts.filter(function (item) {
                            return (item === null || item === void 0 ? void 0 : item.id.tokenId) !== null;
                        }).map(function (item) {
                            var tokenId = Number(item.id.tokenId).toFixed(0);
                            return {
                                api: "alchemy",
                                tokenId: tokenId,
                                title: item.title,
                                image: _this.transformImageUrl(item.metadata.image),
                                data: item,
                            };
                        });
                    })
                        .catch(function (err) {
                        console.warn("Failed to collect tokens from Alchemy API", err.message);
                        return [];
                    })];
            });
        });
    };
    OnChainTokenModule.prototype.getDataOpensea = function (path, chain) {
        return __awaiter(this, void 0, void 0, function () {
            var config, options, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.getConfigForServiceAndChain("opensea", chain);
                        options = {
                            method: "GET",
                            headers: {
                                Accept: "application/json"
                            },
                        };
                        if (config.apiKey) {
                            options.headers["X-API-KEY"] = config.apiKey;
                        }
                        url = this.joinUrl(config.url, path);
                        return [4, this.httpJsonRequest(url, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    OnChainTokenModule.prototype.getDataAlchemy = function (path, chain) {
        return __awaiter(this, void 0, void 0, function () {
            var options, config, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            method: "GET",
                            headers: {
                                redirect: "follow",
                            },
                        };
                        config = this.getConfigForServiceAndChain("alchemy", chain);
                        url = this.joinUrl(config.url, config.apiKey + path);
                        return [4, this.httpJsonRequest(url, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    OnChainTokenModule.prototype.getDataMoralis = function (path, chain) {
        return __awaiter(this, void 0, void 0, function () {
            var config, options, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = this.getConfigForServiceAndChain("moralis", chain);
                        options = {
                            method: "GET",
                            headers: {}
                        };
                        if (config.apiKey) {
                            options.headers["X-API-KEY"] = config.apiKey;
                        }
                        url = this.joinUrl(config.url, path);
                        return [4, this.httpJsonRequest(url, options)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    OnChainTokenModule.prototype.joinUrl = function (baseUrl, path) {
        var baseEnd = baseUrl.charAt(baseUrl.length - 1);
        var pathStart = path.charAt(0);
        if (baseEnd !== "/" && pathStart !== "/") {
            return baseUrl + "/" + path;
        }
        else if (baseEnd === "/" && pathStart === "/") {
            return baseUrl + path.substring(1);
        }
        return baseUrl + path;
    };
    OnChainTokenModule.prototype.getConfigForServiceAndChain = function (service, chain, defaultCred) {
        if (defaultCred === void 0) { defaultCred = "mainnet"; }
        if (!this.onChainApiConfig[service])
            throw new Error("Invalid API service: " + service);
        if (chain === "eth")
            chain = "mainnet";
        var configs = this.onChainApiConfig[service].config;
        if (configs[chain])
            return configs[chain];
        if (defaultCred && configs[defaultCred])
            return configs[defaultCred];
        throw new Error("API config not available for " + service + " chain: " + chain);
    };
    OnChainTokenModule.prototype.httpJsonRequest = function (req, requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(req, requestOptions)];
                    case 1:
                        response = _a.sent();
                        if (response.status > 299 || response.status < 200) {
                            throw new Error("HTTP Request error: " + response.statusText);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, response.json()];
                    case 3: return [2, _a.sent()];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Failed to parse JSON response: " + err_3.message);
                    case 5: return [2];
                }
            });
        });
    };
    OnChainTokenModule.prototype.getTokensPOAP = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var url, tokens, res, e_2, res_1, res_1_1, token;
            var e_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = "https://api.poap.xyz/actions/scan/".concat(owner);
                        tokens = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.httpJsonRequest(url, {
                                method: "GET",
                            })];
                    case 2:
                        res = _b.sent();
                        return [3, 4];
                    case 3:
                        e_2 = _b.sent();
                        logger(2, e_2.message);
                        return [2, tokens];
                    case 4:
                        try {
                            for (res_1 = __values(res), res_1_1 = res_1.next(); !res_1_1.done; res_1_1 = res_1.next()) {
                                token = res_1_1.value;
                                tokens.push({
                                    api: "poap",
                                    title: token.event.name,
                                    image: token.event.image_url,
                                    data: token,
                                });
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (res_1_1 && !res_1_1.done && (_a = res_1.return)) _a.call(res_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return [2, tokens];
                }
            });
        });
    };
    return OnChainTokenModule;
}());
export { OnChainTokenModule };
export default OnChainTokenModule;
//# sourceMappingURL=index.js.map