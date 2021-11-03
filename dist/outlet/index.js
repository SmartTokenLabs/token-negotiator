import { readMagicUrl } from '../core';
import OutletService from "./outletService";
import { config } from './../config';
var Outlet = (function () {
    function Outlet(_a) {
        var tokenName = _a.tokenName;
        var _authenicator = window.Authenticator ? window.Authenticator : null;
        var outletService = new OutletService(config[tokenName], _authenicator);
        window.addEventListener('message', function (event) { outletService.eventReciever(event.data); }, false);
        var _b = config[tokenName], tokenUrlName = _b.tokenUrlName, tokenSecretName = _b.tokenSecretName, tokenIdName = _b.tokenIdName, localStorageItemName = _b.localStorageItemName;
        readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
    }
    ;
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map