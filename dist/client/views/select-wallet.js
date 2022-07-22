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
import { AbstractView } from "./view-interface";
import { SelectIssuers } from "./select-issuers";
import { logger } from "../../utils";
var metaMaskSVG = '<svg width="62px" version="1.1" id="Layer_1" xmlns:ev="http://www.w3.org/2001/xml-events"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 318.6 318.6"style="enable-background:new 0 0 318.6 318.6;" xml:space="preserve"><style type="text/css">.st0{fill:#E2761B;stroke:#E2761B;stroke-linecap:round;stroke-linejoin:round;}.st1{fill:#E4761B;stroke:#E4761B;stroke-linecap:round;stroke-linejoin:round;}.st2{fill:#D7C1B3;stroke:#D7C1B3;stroke-linecap:round;stroke-linejoin:round;}.st3{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round;}.st4{fill:#CD6116;stroke:#CD6116;stroke-linecap:round;stroke-linejoin:round;}.st5{fill:#E4751F;stroke:#E4751F;stroke-linecap:round;stroke-linejoin:round;}.st6{fill:#F6851B;stroke:#F6851B;stroke-linecap:round;stroke-linejoin:round;}.st7{fill:#C0AD9E;stroke:#C0AD9E;stroke-linecap:round;stroke-linejoin:round;}.st8{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round;}.st9{fill:#763D16;stroke:#763D16;stroke-linecap:round;stroke-linejoin:round;}</style><polygon class="st0" points="274.1,35.5 174.6,109.4 193,65.8 "/><g><polygon class="st1" points="44.4,35.5 143.1,110.1 125.6,65.8 	"/><polygon class="st1" points="238.3,206.8 211.8,247.4 268.5,263 284.8,207.7 	"/><polygon class="st1" points="33.9,207.7 50.1,263 106.8,247.4 80.3,206.8 	"/><polygon class="st1" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1 	"/><polygon class="st1" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1 	"/><polygon class="st1" points="106.8,247.4 140.6,230.9 111.4,208.1 	"/><polygon class="st1" points="177.9,230.9 211.8,247.4 207.1,208.1 	"/></g><g><polygon class="st2" points="211.8,247.4 177.9,230.9 180.6,253 180.3,262.3 	"/><polygon class="st2" points="106.8,247.4 138.3,262.3 138.1,253 140.6,230.9 	"/></g><polygon class="st3" points="138.8,193.5 110.6,185.2 130.5,176.1 "/><polygon class="st3" points="179.7,193.5 188,176.1 208,185.2 "/><g><polygon class="st4" points="106.8,247.4 111.6,206.8 80.3,207.7 	"/><polygon class="st4" points="207,206.8 211.8,247.4 238.3,207.7 	"/><polygon class="st4" points="230.8,162.1 174.6,164.6 179.8,193.5 188.1,176.1 208.1,185.2 	"/><polygon class="st4" points="110.6,185.2 130.6,176.1 138.8,193.5 144.1,164.6 87.8,162.1 	"/></g><g><polygon class="st5" points="87.8,162.1 111.4,208.1 110.6,185.2 	"/><polygon class="st5" points="208.1,185.2 207.1,208.1 230.8,162.1 	"/><polygon class="st5" points="144.1,164.6 138.8,193.5 145.4,227.6 146.9,182.7 	"/><polygon class="st5" points="174.6,164.6 171.9,182.6 173.1,227.6 179.8,193.5 	"/></g><polygon class="st6" points="179.8,193.5 173.1,227.6 177.9,230.9 207.1,208.1 208.1,185.2 "/><polygon class="st6" points="110.6,185.2 111.4,208.1 140.6,230.9 145.4,227.6 138.8,193.5 "/><polygon class="st7" points="180.3,262.3 180.6,253 178.1,250.8 140.4,250.8 138.1,253 138.3,262.3 106.8,247.4 117.8,256.4 140.1,271.9 178.4,271.9 200.8,256.4 211.8,247.4 "/><polygon class="st8" points="177.9,230.9 173.1,227.6 145.4,227.6 140.6,230.9 138.1,253 140.4,250.8 178.1,250.8 180.6,253 "/><g><polygon class="st9" points="278.3,114.2 286.8,73.4 274.1,35.5 177.9,106.9 214.9,138.2 267.2,153.5 278.8,140 273.8,136.4 281.8,129.1 275.6,124.3 283.6,118.2 	"/><polygon class="st9" points="31.8,73.4 40.3,114.2 34.9,118.2 42.9,124.3 36.8,129.1 44.8,136.4 39.8,140 51.3,153.5 103.6,138.2 140.6,106.9 44.4,35.5 	"/></g><polygon class="st6" points="267.2,153.5 214.9,138.2 230.8,162.1 207.1,208.1 238.3,207.7 284.8,207.7 "/><polygon class="st6" points="103.6,138.2 51.3,153.5 33.9,207.7 80.3,207.7 111.4,208.1 87.8,162.1 "/><polygon class="st6" points="174.6,164.6 177.9,106.9 193.1,65.8 125.6,65.8 140.6,106.9 144.1,164.6 145.3,182.8 145.4,227.6 173.1,227.6 173.3,182.8 "/></svg>';
var walletConnectSVG = '<svg width="62px" height="62px" viewBox="0 0 319 319" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(1.7268,0,0,1.7268,159.3,155.744)"><g transform="matrix(1,0,0,1,-107.5,-107.5)"><path d="M55.953,84.792L72.263,100.335C72.263,100.335 84.86,78.281 106.774,78.436C106.774,78.436 126.648,75.152 143.824,101.06L160.354,85.616C160.354,85.616 143.436,59.639 107.409,59.615C107.409,59.615 79.188,56.141 55.953,84.792Z" style="fill:rgb(59,153,252);"/><path d="M42.568,93.225L25.838,109.259L74.827,157.509L107.434,125.302L141.274,157.461L188.677,109.672L172.91,93.916L141.771,126.195L107.369,93.403L74.398,126.501L42.568,93.225Z" style="fill:rgb(59,153,252);"/></g></g></svg>';
var torusSVG = '<svg width="62px" height="62px" viewBox="0 0 319 319" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(1.9124,0,0,1.9124,159.3,159.3)"><g transform="matrix(1,0,0,1,-107.5,-107.5)"><path d="M57.267,51.007L56.757,84.626L85.505,85.297L85.565,164.593L119.635,164.873L119.472,51.399L57.267,51.007Z" style="fill:rgb(57,150,254);"/><g transform="matrix(1.06773,0,0,1.04155,-3.94432,-8.22515)"><circle cx="139.434" cy="73.102" r="16.365" style="fill:rgb(57,150,254);"/></g></g></g></svg>';
var SelectWallet = (function (_super) {
    __extends(SelectWallet, _super);
    function SelectWallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectWallet.prototype.render = function () {
        var _this = this;
        var MetaMaskButton = (typeof window.ethereum !== 'undefined') ?
            "<button class=\"wallet-button-tn\" data-wallet=\"MetaMask\">\n                ".concat(metaMaskSVG, "\n                <p>MetaMask</p>\n            </button>") : ' ';
        this.viewContainer.innerHTML = "\n            <div class=\"inner-content-tn scroll-tn\">\n              <div class=\"wallet-selection-view-tn\">\n                <div class=\"issuer-view-tn\">\n                  <div class=\"brand-tn\"></div>\n                  <div class=\"headline-container-tn\">\n                    <p style=\"text-align: center;\">Select Wallet</p>\n                  </div>\n                  <div class=\"wallet-button-container-tn\">\n                    ".concat(MetaMaskButton, "\n                    <button class=\"wallet-button-tn\" data-wallet=\"WalletConnect\">\n                      ").concat(walletConnectSVG, "\n                      <p>Wallet Connect</p>\n                    </button>\n                    <button class=\"wallet-button-tn\" data-wallet=\"Torus\">\n                      ").concat(torusSVG, "\n                      <p>Torus</p>\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n        ");
        this.viewContainer.querySelectorAll('.wallet-button-tn').forEach(function (elem) {
            elem.addEventListener('click', _this.connectWallet.bind(_this));
        });
    };
    SelectWallet.prototype.connectWallet = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var wallet, timer, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wallet = e.currentTarget.dataset.wallet;
                        logger(2, "Connect wallet: " + wallet);
                        timer = setTimeout(function () {
                            _this.popup.showLoader("<h4>Connecting to " + wallet + "...</h4>", "<small>You may need to unlock your wallet to continue.</small>");
                        }, 500);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.client.negotiatorConnectToWallet(wallet)];
                    case 2:
                        _a.sent();
                        this.popup.updatePopup(SelectIssuers);
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.popup.showError((err_1.message ? err_1.message : err_1));
                        return [2];
                    case 4:
                        if (timer)
                            clearTimeout(timer);
                        this.popup.dismissLoader();
                        return [2];
                }
            });
        });
    };
    return SelectWallet;
}(AbstractView));
export { SelectWallet };
//# sourceMappingURL=select-wallet.js.map