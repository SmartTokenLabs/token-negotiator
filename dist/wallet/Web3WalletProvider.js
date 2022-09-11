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
import { logger } from "../utils";
var Web3WalletProvider = (function () {
    function Web3WalletProvider(client, safeConnectOptions) {
        this.connections = {};
        this.client = client;
        this.safeConnectOptions = safeConnectOptions;
    }
    Web3WalletProvider.prototype.saveConnections = function () {
        var savedConnections = {};
        for (var address in this.connections) {
            var con = this.connections[address];
            savedConnections[address] = {
                address: con.address,
                chainId: con.chainId,
                providerType: con.providerType,
                blockchain: con.blockchain
            };
        }
        localStorage.setItem(Web3WalletProvider.LOCAL_STORAGE_KEY, JSON.stringify(savedConnections));
    };
    Web3WalletProvider.prototype.emitSavedConnection = function (address) {
        if (Object.keys(this.connections).length &&
            address) {
            this.client.eventSender.emitConnectedWalletInstance(this.connections[address.toLocaleLowerCase()]);
            return this.connections[address.toLocaleLowerCase()];
        }
        else {
            return null;
        }
    };
    Web3WalletProvider.prototype.deleteConnections = function () {
        this.connections = {};
        localStorage.removeItem(Web3WalletProvider.LOCAL_STORAGE_KEY);
        localStorage.removeItem("walletconnect");
    };
    Web3WalletProvider.prototype.loadConnections = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, state, _a, _b, _i, address, connection, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = localStorage.getItem(Web3WalletProvider.LOCAL_STORAGE_KEY);
                        if (!data)
                            return [2];
                        state = JSON.parse(data);
                        if (!state)
                            return [2];
                        _a = [];
                        for (_b in state)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 6];
                        address = _a[_i];
                        connection = state[address];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4, this.connectWith(connection.providerType, true)];
                    case 3:
                        _c.sent();
                        return [3, 5];
                    case 4:
                        e_1 = _c.sent();
                        console.log("Wallet couldn't connect" + e_1.message);
                        delete state[address];
                        this.saveConnections();
                        this.emitSavedConnection(address);
                        return [3, 5];
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    Web3WalletProvider.prototype.connectWith = function (walletType, checkConnectionOnly) {
        if (checkConnectionOnly === void 0) { checkConnectionOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!walletType)
                            throw new Error('Please provide a Wallet type to connect with.');
                        if (!this[walletType]) return [3, 2];
                        return [4, this[walletType](checkConnectionOnly)];
                    case 1:
                        address = _a.sent();
                        logger(2, 'address', address);
                        this.saveConnections();
                        this.emitSavedConnection(address);
                        return [2, address];
                    case 2: throw new Error('Wallet type not found');
                }
            });
        });
    };
    Web3WalletProvider.prototype.signMessage = function (address, message) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, signer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = this.getWalletProvider(address);
                        signer = provider.getSigner(address);
                        return [4, signer.signMessage(message)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Web3WalletProvider.prototype.getWalletProvider = function (address) {
        var _a;
        address = address.toLowerCase();
        if (!((_a = this.connections[address]) === null || _a === void 0 ? void 0 : _a.provider))
            throw new Error("Wallet provider not found for address");
        return this.connections[address].provider;
    };
    Web3WalletProvider.prototype.getConnectedWalletData = function () {
        return Object.values(this.connections);
    };
    Web3WalletProvider.prototype.registerNewWalletAddress = function (address, chainId, providerType, provider, blockchain) {
        if (blockchain === void 0) { blockchain = 'evm'; }
        this.connections[address.toLowerCase()] = { address: address, chainId: chainId, providerType: providerType, provider: provider, blockchain: blockchain };
        return address;
    };
    Web3WalletProvider.prototype.registerProvider = function (provider, providerName) {
        return __awaiter(this, void 0, void 0, function () {
            var accounts, chainId, curAccount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, provider.listAccounts()];
                    case 1:
                        accounts = _a.sent();
                        return [4, provider.detectNetwork()];
                    case 2:
                        chainId = (_a.sent()).chainId;
                        if (accounts.length === 0) {
                            throw new Error("No accounts found via wallet-connect.");
                        }
                        curAccount = accounts[0];
                        this.registerNewWalletAddress(curAccount, chainId, providerName, provider);
                        provider.provider.on("accountsChanged", function (accounts) {
                            if (curAccount === accounts[0])
                                return;
                            console.log("Account changed: " + accounts[0]);
                            delete _this.connections[curAccount.toLowerCase()];
                            curAccount = accounts[0];
                            _this.registerNewWalletAddress(curAccount, chainId, providerName, provider);
                            _this.saveConnections();
                            _this.emitSavedConnection(curAccount);
                            _this.client.getTokenStore().clearCachedTokens();
                            _this.client.enrichTokenLookupDataOnChainTokens();
                        });
                        return [2, accounts[0]];
                }
            });
        });
    };
    Web3WalletProvider.prototype.MetaMask = function (checkConnectionOnly) {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger(2, 'connect MetaMask');
                        if (!(typeof window.ethereum !== 'undefined')) return [3, 2];
                        return [4, window.ethereum.enable()];
                    case 1:
                        _a.sent();
                        provider = new ethers.providers.Web3Provider(window.ethereum);
                        return [2, this.registerProvider(provider, "MetaMask")];
                    case 2: throw new Error("MetaMask is not available. Please check the extension is supported and active.");
                }
            });
        });
    };
    Web3WalletProvider.prototype.WalletConnect = function (checkConnectionOnly) {
        return __awaiter(this, void 0, void 0, function () {
            var walletConnectProvider, walletConnect;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger(2, 'connect Wallet Connect');
                        return [4, import("./WalletConnectProvider")];
                    case 1:
                        walletConnectProvider = _a.sent();
                        return [4, walletConnectProvider.getWalletConnectProviderInstance(checkConnectionOnly)];
                    case 2:
                        walletConnect = _a.sent();
                        return [2, new Promise(function (resolve, reject) {
                                if (checkConnectionOnly) {
                                    walletConnect.connector.on("display_uri", function (err, payload) {
                                        reject(new Error("Connection expired"));
                                    });
                                }
                                walletConnect.enable().then(function () {
                                    var provider = new ethers.providers.Web3Provider(walletConnect);
                                    resolve(_this.registerProvider(provider, "WalletConnect"));
                                }).catch(function (e) { return reject(e); });
                            })];
                }
            });
        });
    };
    Web3WalletProvider.prototype.Torus = function (checkConnectionOnly) {
        return __awaiter(this, void 0, void 0, function () {
            var TorusProvider, torus, provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, import("./TorusProvider")];
                    case 1:
                        TorusProvider = _a.sent();
                        return [4, TorusProvider.getTorusProviderInstance()];
                    case 2:
                        torus = _a.sent();
                        return [4, torus.init()];
                    case 3:
                        _a.sent();
                        return [4, torus.login()];
                    case 4:
                        _a.sent();
                        provider = new ethers.providers.Web3Provider(torus.provider);
                        return [2, this.registerProvider(provider, "Torus")];
                }
            });
        });
    };
    Web3WalletProvider.prototype.Phantom = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, accountAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger(2, 'connect Phantom');
                        if (!(typeof window.solana !== 'undefined')) return [3, 2];
                        return [4, window.solana.connect()];
                    case 1:
                        connection = _a.sent();
                        accountAddress = connection.publicKey.toBase58();
                        return [2, this.registerNewWalletAddress(accountAddress, "mainnet-beta", 'phantom', window.solana, 'solana')];
                    case 2: throw new Error("MetaMask is not available. Please check the extension is supported and active.");
                }
            });
        });
    };
    Web3WalletProvider.prototype.SafeConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger(2, 'connect SafeConnect');
                        return [4, this.getSafeConnectProvider()];
                    case 1:
                        provider = _a.sent();
                        return [4, provider.initSafeConnect()];
                    case 2:
                        address = _a.sent();
                        this.registerNewWalletAddress(address, 1, "SafeConnect", provider);
                        return [2, address];
                }
            });
        });
    };
    Web3WalletProvider.prototype.safeConnectAvailable = function () {
        return this.safeConnectOptions !== undefined;
    };
    Web3WalletProvider.prototype.getSafeConnectProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            var SafeConnectProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, import("./SafeConnectProvider")];
                    case 1:
                        SafeConnectProvider = (_a.sent()).SafeConnectProvider;
                        return [2, new SafeConnectProvider(this.client.getUi(), this.safeConnectOptions)];
                }
            });
        });
    };
    Web3WalletProvider.LOCAL_STORAGE_KEY = "tn-wallet-connections";
    return Web3WalletProvider;
}());
export { Web3WalletProvider };
export default Web3WalletProvider;
//# sourceMappingURL=Web3WalletProvider.js.map