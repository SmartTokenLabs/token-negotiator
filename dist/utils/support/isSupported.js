import { getBrowserData } from './getBrowserData';
export var isUserAgentSupported = function (unSupportedUserAgents) {
    if (unSupportedUserAgents === void 0) { unSupportedUserAgents = {}; }
    var browserData = getBrowserData();
    var unsupported = Object.keys(unSupportedUserAgents);
    return !(unsupported.some(function (browser) { return browserData[browser]; }));
};
//# sourceMappingURL=isSupported.js.map