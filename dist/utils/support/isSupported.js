import { logger } from '..';
import { getBrowserData } from './getBrowserData';
export var isUserAgentSupported = function (unSupportedUserAgents) {
    if (!unSupportedUserAgents)
        return true;
    var browserData = getBrowserData();
    logger(2, "unSupportedUserAgents: ", unSupportedUserAgents);
    logger(2, "browserData: ", browserData);
    var unsupported = Object.keys(unSupportedUserAgents);
    return !(unsupported.some(function (browser) { return unSupportedUserAgents[browser] && browserData[browser]; }));
};
//# sourceMappingURL=isSupported.js.map