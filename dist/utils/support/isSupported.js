import { logger } from '..';
import { getBrowserData } from './getBrowserData';
import { errorHandler } from '../index';
export var SUPPORTED_EVM_BLOCKCHAINS = [
    "evm", "polygon", "optimism", "bsc", "avalanche", "fantom", "goerli", "mumbai", "arbitrum"
];
export var isUserAgentSupported = function (unSupportedUserAgents) {
    if (!unSupportedUserAgents)
        return true;
    var browserData = getBrowserData();
    logger(2, "unSupportedUserAgents: ", unSupportedUserAgents);
    logger(2, "browserData: ", browserData);
    var unsupported = Object.keys(unSupportedUserAgents);
    return !(unsupported.some(function (browser) { return unSupportedUserAgents[browser] && browserData[browser]; }));
};
export var validateBlockchain = function (blockchain) {
    if (blockchain === "") {
        var warning = "You did not specify 'blockchain', the default value is evm. Check our github to see supported values.";
        errorHandler(warning, 'warning', null, null);
        return "evm";
    }
    if (blockchain === "solana") {
        return "solana";
    }
    if (blockchain === "evm") {
        return "evm";
    }
    if (SUPPORTED_EVM_BLOCKCHAINS.includes(blockchain.toLowerCase())) {
        errorHandler("We recommend you to set `blockchain` as 'evm'.", 'warning', null, null);
        return "evm";
    }
    var err = "You set unsupported `blockchain` in the constructor. Check our github to see supported values.";
    errorHandler(err, 'error', null, null);
    return blockchain;
};
//# sourceMappingURL=isSupported.js.map