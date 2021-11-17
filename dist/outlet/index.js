import { readMagicUrl } from '../core';
import OutletService from "./outletService";
import { config } from './../config';
function prop(obj, key) { return obj[key]; }
;
;
var Outlet = (function () {
    function Outlet(tokenConfig) {
        if (!window.Authenticator)
            throw new Error('Please ensure the authenticator exists.');
        var _config = prop(config, tokenConfig.tokenName);
        var outletService = new OutletService(_config, window.Authenticator);
        window.addEventListener('message', function (event) { outletService.eventReciever(event.data); }, false);
        var tokenUrlName = _config.tokenUrlName, tokenSecretName = _config.tokenSecretName, tokenIdName = _config.tokenIdName, localStorageItemName = _config.localStorageItemName;
        readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
    }
    return Outlet;
}());
export { Outlet };
;
//# sourceMappingURL=index.js.map