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
var baseURL = "https://api.token-discovery.tokenscript.org";
export var getNftCollection = function (issuer, ipfsBaseUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        if ('blockchain' in issuer && issuer.blockchain === "solana") {
            query = getSolanaNftCollectionUrl(issuer, ipfsBaseUrl);
        }
        else {
            query = getEvmNftCollectionUrl(issuer, ipfsBaseUrl);
        }
        return [2, tokenRequest(query, true)];
    });
}); };
export var getEvmNftCollectionUrl = function (issuer, ipfsBaseUrl) {
    var contract = issuer.contract, chain = issuer.chain, openSeaSlug = issuer.openSeaSlug;
    var query = "".concat(baseURL, "/get-token-collection?smartContract=").concat(contract, "&chain=").concat(chain, "&blockchain=evm");
    if (openSeaSlug)
        query += "&openSeaSlug=".concat(openSeaSlug);
    if (ipfsBaseUrl)
        query += "&ipfsBaseUrl=".concat(ipfsBaseUrl);
    return query;
};
export var getSolanaNftCollectionUrl = function (issuer, ipfsBaseUrl) {
    var collectionAddress = issuer.collectionAddress, chain = issuer.chain;
    var query = "".concat(baseURL, "/get-token-collection?collectionAddress=").concat(collectionAddress, "&chain=").concat(chain, "&blockchain=solana");
    if (ipfsBaseUrl)
        query += "&ipfsBaseUrl=".concat(ipfsBaseUrl);
    return query;
};
export var getNftTokens = function (issuer, owner, ipfsBaseUrl) {
    var query;
    if ('blockchain' in issuer && issuer.blockchain === "solana") {
        query = getSolanaNftTokensUrl(issuer, owner, ipfsBaseUrl);
    }
    else {
        query = getEvmNftTokensUrl(issuer, owner, ipfsBaseUrl);
    }
    return tokenRequest(query, true);
};
export var getEvmNftTokensUrl = function (issuer, owner, ipfsBaseUrl) {
    var _a;
    var contract = issuer.contract, chain = issuer.chain, openSeaSlug = issuer.openSeaSlug;
    var blockchain = (_a = issuer === null || issuer === void 0 ? void 0 : issuer.blockchain) !== null && _a !== void 0 ? _a : "evm";
    if (!contract || !chain)
        return undefined;
    var query = "".concat(baseURL, "/get-owner-tokens?smartContract=").concat(contract, "&chain=").concat(chain, "&owner=").concat(owner, "&blockchain=").concat(blockchain);
    if (openSeaSlug)
        query += "&openSeaSlug=".concat(openSeaSlug);
    if (ipfsBaseUrl)
        query += "&ipfsBaseUrl=".concat(ipfsBaseUrl);
    return query;
};
export var getSolanaNftTokensUrl = function (issuer, owner, ipfsBaseUrl) {
    var _a;
    var chain = issuer.chain, tokenProgram = issuer.tokenProgram, collectionAddress = issuer.collectionAddress, updateAuthority = issuer.updateAuthority, symbol = issuer.symbol;
    var blockchain = (_a = issuer === null || issuer === void 0 ? void 0 : issuer.blockchain) !== null && _a !== void 0 ? _a : "evm";
    if (!chain && (!tokenProgram || !collectionAddress || !updateAuthority || !symbol))
        return undefined;
    var query = "".concat(baseURL, "/get-owner-tokens?chain=").concat(chain, "&blockchain=").concat(blockchain);
    if (owner)
        query += "&owner=".concat(owner);
    if (symbol)
        query += "&symbol=".concat(symbol);
    if (ipfsBaseUrl)
        query += "&ipfsBaseUrl=".concat(ipfsBaseUrl);
    if (tokenProgram)
        query += "&tokenProgram=".concat(tokenProgram);
    if (collectionAddress)
        query += "&collectionAddress=".concat(collectionAddress);
    if (updateAuthority)
        query += "&updateAuthority=".concat(updateAuthority);
    return query;
};
export var tokenRequest = function (query, silenceRequestError) { return __awaiter(void 0, void 0, void 0, function () {
    var response, ok, msg_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, fetch(query)];
            case 1:
                response = _a.sent();
                ok = response.status >= 200 && response.status <= 299;
                if (!ok && silenceRequestError === true) {
                    console.warn("token api request failed: ", query);
                    return [2];
                }
                if (ok)
                    return [2, response.json()];
                else
                    throw new Error("HTTP error! status: ".concat(response.status));
                return [3, 3];
            case 2:
                msg_1 = _a.sent();
                throw new Error("HTTP error.");
            case 3: return [2];
        }
    });
}); };
//# sourceMappingURL=nftProvider.js.map