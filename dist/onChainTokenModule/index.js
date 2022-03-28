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
import { requiredParams } from './../utils/index';
var OnChainTokenModule = (function () {
    function OnChainTokenModule() {
    }
    OnChainTokenModule.prototype.getOnChainAPISupportBool = function (apiName, chain) {
        var apiBlockchainSupport = {
            opensea: [
                'eth',
                'mainnet',
                'rinkeby'
            ],
            alchemy: [
                'eth',
                'mainnet',
                'rinkeby',
                'arbitrum',
                'polygon',
                'optimism'
            ],
            moralis: [
                'eth',
                'mainnet',
                'rinkeby',
                'ropsten',
                'goerli',
                'kovan',
                'bsc',
                'polygon',
                'mumbai',
                'avalanche',
                'fantom'
            ]
        };
        return apiBlockchainSupport[apiName].indexOf(chain) >= -1;
    };
    OnChainTokenModule.prototype.getInitialContractAddressMetaData = function (issuer) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, chain, openSeaSlug, collectionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = issuer.contract, chain = issuer.chain, openSeaSlug = issuer.openSeaSlug;
                        collectionData = null;
                        if (!openSeaSlug) return [3, 2];
                        return [4, this.getContractDataOpenSea(contract, chain, openSeaSlug)];
                    case 1:
                        collectionData = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(!openSeaSlug && !collectionData)) return [3, 4];
                        return [4, this.getContractDataMoralis(contract, chain)];
                    case 3:
                        collectionData = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(!openSeaSlug && !collectionData)) return [3, 6];
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
        return __awaiter(this, void 0, void 0, function () {
            var options, options;
            return __generator(this, function (_a) {
                if (this.getOnChainAPISupportBool('opensea', chain) === false)
                    return [2];
                if (chain.toLocaleLowerCase() === "rinkeby") {
                    options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': '99687116fafa4daebc766eeedccce201' } };
                    return [2, fetch("https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=" + contractAddress + "&collection=" + openSeaSlug + "&order_direction=desc&offset=0&limit=20", options)
                            .then(function (response) { return response.json(); })
                            .then(function (response) {
                            return {
                                chain: chain,
                                contractAddress: contractAddress,
                                image: response.assets[0].collection.image_url,
                                title: response.assets[0].collection.name
                            };
                        })
                            .catch(function (err) { return console.error(err); })];
                }
                if (chain.toLocaleLowerCase() === "mainnet" || chain.toLocaleLowerCase() === "eth") {
                    options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': '3940c5b8cf4a4647bc22ff9b0a84f75a' } };
                    return [2, fetch("https://api.opensea.io/api/v1/assets?asset_contract_address=" + contractAddress + "&collection=" + openSeaSlug + "&order_direction=desc&offset=0&limit=20", options)
                            .then(function (response) { return response.json(); })
                            .then(function (response) {
                            return {
                                chain: chain,
                                contractAddress: contractAddress,
                                image: response.assets[0].collection.image_url,
                                title: response.assets[0].collection.name
                            };
                        })
                            .catch(function (err) { return console.error(err); })];
                }
                return [2];
            });
        });
    };
    OnChainTokenModule.prototype.getContractDataMoralis = function (contractAddress, chain) {
        return __awaiter(this, void 0, void 0, function () {
            var options, _chain;
            return __generator(this, function (_a) {
                if (this.getOnChainAPISupportBool('moralis', chain) === false)
                    return [2];
                options = {
                    method: 'GET',
                    headers: {
                        'x-api-key': 'WMrMeZLy2pajBLmwf1AUccxFzQy98OEMeDQPaTK8BcTI8XK2f9WZrVpjGYQcujSF'
                    }
                };
                if (chain.toLocaleLowerCase() === "mainnet" || chain.toLocaleLowerCase() === "eth") {
                    _chain = 'eth';
                    return [2, fetch("https://deep-index.moralis.io/api/v2/nft/" + contractAddress + "?chain=" + _chain + "&format=decimal&limit=1", options)
                            .then(function (response) { return response.json(); })
                            .then(function (response) {
                            var image = JSON.parse(response.result[0].metadata).image;
                            return {
                                api: 'moralis',
                                chain: chain,
                                contractAddress: contractAddress,
                                image: image,
                                title: response.result[0].name
                            };
                        })
                            .catch(function (err) { return console.error(err); })];
                }
                return [2];
            });
        });
    };
    OnChainTokenModule.prototype.getContractDataAlchemy = function (contractAddress, chain) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, apiKey, baseURL, tokenId, withMetadata, fetchURL, promise;
            return __generator(this, function (_a) {
                if (this.getOnChainAPISupportBool('alchemy', chain) === false)
                    return [2];
                requestOptions = {
                    method: 'GET',
                    headers: {
                        redirect: 'follow'
                    }
                };
                apiKey = "CWaS4PkRjFi3dAzrRD6lsrQ7vAyPYsnU";
                baseURL = "https://eth-mainnet.alchemyapi.io/v2/" + apiKey + "/getNFTsForCollection";
                tokenId = "0";
                withMetadata = "true";
                fetchURL = baseURL + "?contractAddress=" + contractAddress + "&cursorKey=" + tokenId + "&withMetadata=" + withMetadata;
                promise = new Promise(function (resolve, reject) {
                    fetch(fetchURL, requestOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (result) {
                        if (!result.nfts.length)
                            resolve([]);
                        resolve({
                            api: 'alchemy',
                            chain: chain,
                            contractAddress: contractAddress,
                            image: result.nfts[0].metadata.image,
                            title: result.nfts[0].title
                        });
                    })
                        .catch(function (error) { return console.log('error', error); });
                });
                return [2, promise];
            });
        });
    };
    OnChainTokenModule.prototype.connectOnChainToken = function (issuer, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, chain, openSeaSlug, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = issuer.contract, chain = issuer.chain, openSeaSlug = issuer.openSeaSlug;
                        tokens = [];
                        if (!openSeaSlug) return [3, 2];
                        return [4, this.getTokensOpenSea(contract, chain, owner, openSeaSlug)];
                    case 1:
                        tokens = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(!openSeaSlug && !tokens.length)) return [3, 4];
                        return [4, this.getTokensMoralis(contract, chain, owner)];
                    case 3:
                        tokens = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(!openSeaSlug && !tokens.length)) return [3, 6];
                        return [4, this.getTokensAlchemy(contract, chain, owner)];
                    case 5:
                        tokens = _a.sent();
                        _a.label = 6;
                    case 6: return [2, tokens];
                }
            });
        });
    };
    OnChainTokenModule.prototype.getTokensOpenSea = function (address, chain, owner, openSeaSlug, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var options, options;
            return __generator(this, function (_a) {
                if (this.getOnChainAPISupportBool('opensea', chain) === false)
                    return [2];
                requiredParams((chain && address && owner), 'cannot search for tokens, missing params');
                if (chain === 'rinkeby') {
                    options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': '99687116fafa4daebc766eeedccce201' } };
                    return [2, fetch("https://testnets-api.opensea.io/api/v1/assets?owner=" + owner + "&collection=" + openSeaSlug + "&order_direction=desc&offset=0&limit=20", options)
                            .then(function (response) { return response.json(); })
                            .then(function (response) {
                            return response.assets.map(function (item) {
                                var image = item.image_url ? item.image_url : '';
                                var title = item.name ? item.name : '';
                                return {
                                    api: 'opensea',
                                    title: title,
                                    image: image,
                                    data: item
                                };
                            });
                        })
                            .catch(function (err) {
                            console.error(err);
                        })];
                }
                if (chain === 'mainnet' || chain === 'eth') {
                    options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': '3940c5b8cf4a4647bc22ff9b0a84f75a' } };
                    return [2, fetch("https://api.opensea.io/api/v1/assets?owner=" + owner + "&collection=" + openSeaSlug + "&order_direction=desc&offset=0&limit=20", options)
                            .then(function (response) { return response.json(); })
                            .then(function (response) {
                            return response.assets.map(function (item) {
                                var image = item.image_url ? item.image_url : '';
                                var title = item.name ? item.name : '';
                                return {
                                    api: 'opensea',
                                    title: title,
                                    image: image,
                                    data: item
                                };
                            });
                        })
                            .catch(function (err) {
                            console.error(err);
                        })];
                }
                return [2];
            });
        });
    };
    OnChainTokenModule.prototype.getTokensMoralis = function (address, chain, owner, offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        return __awaiter(this, void 0, void 0, function () {
            var _chain, options;
            return __generator(this, function (_a) {
                if (this.getOnChainAPISupportBool('moralis', chain) === false)
                    return [2];
                requiredParams((chain && address && owner), 'cannot search for tokens, missing params');
                _chain = chain;
                if (chain === 'mainnet')
                    _chain = 'eth';
                options = {
                    method: 'GET',
                    headers: {
                        'x-api-key': 'WMrMeZLy2pajBLmwf1AUccxFzQy98OEMeDQPaTK8BcTI8XK2f9WZrVpjGYQcujSF'
                    }
                };
                return [2, fetch("https://deep-index.moralis.io/api/v2/" + owner + "/nft/" + address + "?chain=" + _chain + "&format=decimal", options)
                        .then(function (response) { return response.json(); })
                        .then(function (response) {
                        return response.result.map(function (item) {
                            var parsedMetaObj = JSON.parse(item.metadata);
                            var image = parsedMetaObj.image ? parsedMetaObj.image : '';
                            var title = parsedMetaObj.name ? parsedMetaObj.name : '';
                            return {
                                api: 'moralis',
                                title: title,
                                image: image,
                                data: parsedMetaObj
                            };
                        });
                    })
                        .catch(function (err) { return console.error(err); })];
            });
        });
    };
    OnChainTokenModule.prototype.getTokensAlchemy = function (address, chain, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                if (this.getOnChainAPISupportBool('alchemy', chain) === false)
                    return [2];
                promise = new Promise(function (resolve, reject) {
                    var requestOptions = {
                        method: 'GET',
                        headers: {
                            redirect: 'follow'
                        }
                    };
                    var baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
                    var fetchURL = baseURL + "?owner=" + owner + "&contractAddresses[]=" + address;
                    fetch(fetchURL, requestOptions)
                        .then(function (response) { return response.json(); })
                        .then(function (result) {
                        var tokens = result.ownedNfts.map(function (item) {
                            return {
                                api: 'alchemy',
                                title: item.title,
                                image: item.metadata.image,
                                data: item
                            };
                        });
                        resolve(tokens);
                    })
                        .catch(function (error) { return console.log('error', error); });
                });
                return [2, promise];
            });
        });
    };
    return OnChainTokenModule;
}());
export { OnChainTokenModule };
export default OnChainTokenModule;
//# sourceMappingURL=index.js.map