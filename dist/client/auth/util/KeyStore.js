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
import { hexStringToUint8, uint8tohex } from "@tokenscript/attestation/dist/libs/utils";
var subtle = window.crypto.subtle;
var KeyStore = (function () {
    function KeyStore() {
    }
    KeyStore.prototype.getOrCreateKey = function (algorithm, id) {
        return __awaiter(this, void 0, void 0, function () {
            var attestHoldingKey, holdingPubKey, fullId, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fullId = algorithm + (id ? "-" + id : "");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4, this.getKey(fullId)];
                    case 2:
                        attestHoldingKey = _b.sent();
                        if (!attestHoldingKey) return [3, 3];
                        holdingPubKey = hexStringToUint8(attestHoldingKey.spki);
                        return [3, 7];
                    case 3:
                        console.log("Generating new attestation holding key...");
                        return [4, subtle.generateKey({
                                name: algorithm,
                                modulusLength: 1024,
                                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                                hash: { name: "SHA-256" }
                            }, false, ["sign", "verify"])];
                    case 4:
                        attestHoldingKey = _b.sent();
                        _a = Uint8Array.bind;
                        return [4, subtle.exportKey("spki", attestHoldingKey.publicKey)];
                    case 5:
                        holdingPubKey = new (_a.apply(Uint8Array, [void 0, _b.sent()]))();
                        return [4, this.saveKey(fullId, attestHoldingKey.privateKey, attestHoldingKey.publicKey, uint8tohex(holdingPubKey))];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        console.log("Holding public: " + uint8tohex(holdingPubKey));
                        return [2, { attestHoldingKey: attestHoldingKey, holdingPubKey: holdingPubKey }];
                    case 8:
                        e_1 = _b.sent();
                        console.log("Failed to create attestor keypair: " + e_1.message);
                        throw e_1;
                    case 9: return [2];
                }
            });
        });
    };
    KeyStore.prototype.getKey = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        _this.getDb().then(function (db) {
                            var transaction = db.transaction(KeyStore.TABLE_NAME, "readonly");
                            var store = transaction.objectStore(KeyStore.TABLE_NAME);
                            var data = store.get(id);
                            data.onsuccess = function () {
                                resolve(data.result);
                                db.close();
                            };
                            data.onerror = function (e) {
                                reject(e);
                            };
                        }).catch(function (e) {
                            console.log(e);
                            reject(e.message);
                        });
                    })];
            });
        });
    };
    KeyStore.prototype.saveKey = function (id, privKey, pubKey, spki) {
        return __awaiter(this, void 0, void 0, function () {
            var db_1, transaction, store, obj, req, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.getDb()];
                    case 1:
                        db_1 = _a.sent();
                        transaction = db_1.transaction(KeyStore.TABLE_NAME, "readwrite");
                        store = transaction.objectStore(KeyStore.TABLE_NAME);
                        obj = {
                            id: id,
                            privateKey: privKey,
                            publicKey: pubKey,
                            spki: spki
                        };
                        req = store.put(obj);
                        req.onsuccess = function () {
                            db_1.close();
                        };
                        return [3, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log("Failed to store key" + e_2.message);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    KeyStore.prototype.getDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        var dbReq = indexedDB.open(KeyStore.DB_NAME, 1);
                        dbReq.onupgradeneeded = function (event) {
                            var db = event.target.result;
                            if (!db.objectStoreNames.contains(KeyStore.TABLE_NAME))
                                db.createObjectStore(KeyStore.TABLE_NAME, { keyPath: "id" });
                        };
                        dbReq.onsuccess = function (event) {
                            var db = event.target.result;
                            resolve(db);
                        };
                        dbReq.onerror = function (event) {
                            reject('Error opening database ' + event.target.errorCode);
                        };
                    })];
            });
        });
    };
    KeyStore.DB_NAME = "SCKeyStore";
    KeyStore.TABLE_NAME = "Keys";
    return KeyStore;
}());
export { KeyStore };
//# sourceMappingURL=KeyStore.js.map