import { readMagicUrl, storeMagicURL } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
var Outlet = (function () {
    function Outlet(config) {
        var tokenName = config.tokenName;
        requiredParams(tokenLookup[tokenName], "Please provide the token name");
        var _a = tokenLookup[tokenName], tokenUrlName = _a.tokenUrlName, tokenSecretName = _a.tokenSecretName, tokenIdName = _a.tokenIdName, itemStorageKey = _a.itemStorageKey;
        var tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);
        storeMagicURL(tokens, itemStorageKey);
    }
    ;
    return Outlet;
}());
export { Outlet };
//# sourceMappingURL=index.js.map