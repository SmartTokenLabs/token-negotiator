var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { AbstractAuthentication } from "./abstractAuthentication";
import { OutletAction, Messaging } from "../messaging";
import { Authenticator } from "@tokenscript/attestation";
import { SignedUNChallenge } from "./signedUNChallenge";
import { LocalOutlet } from "../../outlet/localOutlet";
import { logger } from "../../utils";
var TicketZKProof = (function (_super) {
    __extends(TicketZKProof, _super);
    function TicketZKProof() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TYPE = "ticketZKProof";
        _this.messaging = new Messaging();
        return _this;
    }
    TicketZKProof.prototype.getTokenProof = function (issuerConfig, tokens, request) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var redirectMode, useEthKey, unChallenge, unRes, useEthKeyAddress, address, wallet, data, localOutlet, _d, res, proof;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger(2, "getTokenProof request:", request);
                        if (issuerConfig.onChain === true)
                            throw new Error(this.TYPE + " is not available for off-chain tokens.");
                        redirectMode = ((_a = request === null || request === void 0 ? void 0 : request.options) === null || _a === void 0 ? void 0 : _a.useRedirect) || false;
                        if (redirectMode)
                            redirectMode = ((_b = request === null || request === void 0 ? void 0 : request.options) === null || _b === void 0 ? void 0 : _b.redirectUrl) || document.location.origin + document.location.pathname + document.location.search;
                        useEthKey = null;
                        if (!issuerConfig.unEndPoint) return [3, 2];
                        unChallenge = new SignedUNChallenge(this.client);
                        request.options = __assign(__assign({}, request.options), { unEndPoint: issuerConfig.unEndPoint });
                        return [4, unChallenge.getTokenProof(issuerConfig, tokens, request)];
                    case 1:
                        unRes = _e.sent();
                        useEthKey = unRes.data;
                        _e.label = 2;
                    case 2:
                        useEthKeyAddress = useEthKey ? useEthKey.address : "";
                        address = request.address ? request.address : useEthKeyAddress;
                        wallet = request.wallet ? request.wallet : "";
                        if (!((new URL(issuerConfig.tokenOrigin)).origin === document.location.origin)) return [3, 4];
                        localOutlet = new LocalOutlet(issuerConfig);
                        data = {};
                        _d = data;
                        return [4, localOutlet.authenticate(tokens[0], address, wallet, redirectMode)];
                    case 3:
                        _d.proof = _e.sent();
                        return [3, 6];
                    case 4:
                        logger(2, "run OutletAction.GET_PROOF at ", window.location.href);
                        return [4, this.messaging.sendMessage({
                                action: OutletAction.GET_PROOF,
                                origin: issuerConfig.tokenOrigin,
                                timeout: 0,
                                data: {
                                    issuer: issuerConfig.collectionID,
                                    token: tokens[0],
                                    address: address,
                                    wallet: wallet
                                }
                            }, request.options.messagingForceTab, this.client.getUi(), redirectMode)];
                    case 5:
                        res = _e.sent();
                        if (redirectMode) {
                            return [2, new Promise(function (resolve, reject) {
                                    setTimeout(function () {
                                        reject(new Error("The outlet failed to load."));
                                    }, 20000);
                                })];
                        }
                        data = res.data;
                        _e.label = 6;
                    case 6:
                        if (!data.proof)
                            throw new Error("Failed to get proof from the outlet.");
                        proof = {
                            type: this.TYPE,
                            data: data,
                            target: {
                                tokens: []
                            }
                        };
                        if (useEthKey) {
                            Authenticator.validateUseTicket(data.proof, issuerConfig.base64attestorPubKey, issuerConfig.base64senderPublicKeys, (_c = useEthKey.address) !== null && _c !== void 0 ? _c : "");
                            proof.data.useEthKey = useEthKey;
                        }
                        return [2, proof];
                }
            });
        });
    };
    return TicketZKProof;
}(AbstractAuthentication));
export { TicketZKProof };
//# sourceMappingURL=ticketZKProof.js.map