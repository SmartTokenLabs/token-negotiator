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
import { Client } from '../../client/index';
import { Web3WalletProvider } from '../Web3WalletProvider';
var tokenNegotiatorClient = new Client({
    type: 'active',
    issuers: [
        { collectionID: 'rinkeby-punk', onChain: true, contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'rinkeby-punk' },
        { collectionID: 'expansion-punk', onChain: true, contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37', chain: 'eth' },
        { collectionID: 'women-tribe', onChain: true, contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'stl-rnd-women-tribe-nfts' }
    ]
});
var safeConnectOptions = {
    url: "https://safeconnect.tokenscript.org",
    initialProof: "address_attest",
};
describe('wallet spec', function () {
    var web3WalletProvider;
    var safeConnectProvider;
    test('web3WalletProvider a new instance', function () {
        web3WalletProvider = new Web3WalletProvider(tokenNegotiatorClient, safeConnectOptions);
        expect(web3WalletProvider).toBeDefined();
    });
    test('web3WalletProvider method connectWith - wallet type not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, web3WalletProvider.connectWith('abc')];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    err_1 = _a.sent();
                    expect(err_1).toEqual(new Error('Wallet type not found'));
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
    test('web3WalletProvider method signWith', function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, web3WalletProvider.connectWith('abc')];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    err_2 = _a.sent();
                    expect(err_2).toEqual(new Error('Wallet type not found'));
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
    test('web3WalletProvider emit saved connection to return null where no connections are configured', function () { return __awaiter(void 0, void 0, void 0, function () {
        var savedConnection;
        return __generator(this, function (_a) {
            savedConnection = web3WalletProvider.emitSavedConnection('0x1263b90F4e1DFe89A8f9E623FF57adb252851fC3');
            expect(savedConnection).toEqual(null);
            return [2];
        });
    }); });
    test('web3WalletProvider emit saved connection with data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var walletConnectProvider, walletConnect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, import("../WalletConnectProvider")];
                case 1:
                    walletConnectProvider = _a.sent();
                    return [4, walletConnectProvider.getWalletConnectProviderInstance()];
                case 2:
                    walletConnect = _a.sent();
                    web3WalletProvider.registerNewWalletAddress('0x1263b90F4e1DFe89A8f9E623FF57adb252851fC3'.toLocaleLowerCase(), '1', 'MetaMask', walletConnect);
                    web3WalletProvider.emitSavedConnection('0x1263b90F4e1DFe89A8f9E623FF57adb252851fC3');
                    return [2];
            }
        });
    }); });
    test('web3WalletProvider method registerNewWalletAddress and getConnectedWalletData', function () { return __awaiter(void 0, void 0, void 0, function () {
        var walletConnectProvider, walletConnect, TorusProvider, torus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, import("../WalletConnectProvider")];
                case 1:
                    walletConnectProvider = _a.sent();
                    return [4, walletConnectProvider.getWalletConnectProviderInstance()];
                case 2:
                    walletConnect = _a.sent();
                    expect(web3WalletProvider.registerNewWalletAddress('0x123', '1', 'MetaMask', walletConnect)).toEqual('0x123');
                    return [4, import("../TorusProvider")];
                case 3:
                    TorusProvider = _a.sent();
                    return [4, TorusProvider.getTorusProviderInstance()];
                case 4:
                    torus = _a.sent();
                    expect(web3WalletProvider.registerNewWalletAddress('0x12345', '1', 'phantom', torus.provider)).toEqual('0x12345');
                    expect(web3WalletProvider.getConnectedWalletData()).toBeDefined();
                    return [2];
            }
        });
    }); });
    test('web3WalletProvider method connectWith - MetaMask', function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, web3WalletProvider.connectWith('MetaMask')];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    err_3 = _a.sent();
                    expect(err_3).toEqual(new Error('MetaMask is not available. Please check the extension is supported and active.'));
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
    test('web3WalletProvider method SafeConnectAvailable', function () {
        expect(web3WalletProvider.safeConnectAvailable()).toEqual(true);
    });
    test('web3WalletProvider method getSafeConnectProvider', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, web3WalletProvider.getSafeConnectProvider()];
                case 1:
                    safeConnectProvider = _a.sent();
                    expect(safeConnectProvider).toBeDefined();
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=wallet.spec.js.map