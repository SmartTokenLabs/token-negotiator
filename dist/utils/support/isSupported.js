import { getBrowserData } from './getBrowserData';
export var isBrowserDeviceWalletSupported = function (unsupportedDeviceAndBrowserConfig) {
    if (unsupportedDeviceAndBrowserConfig === undefined || unsupportedDeviceAndBrowserConfig === null)
        return true;
    var browserData = getBrowserData();
    var broswerIsSupported = true;
    var browserDeviceWalletSupportedMap = ["iE", "iE9", "edge", "chrome", "phantomJS", "fireFox", "safari", "android", "iOS", "mac", "windows", "touchDevice", "metaMask", "alphaWallet", "mew", "trust", "goWallet", "status", "isImToken"];
    browserDeviceWalletSupportedMap.forEach(function (item) {
        if (unsupportedDeviceAndBrowserConfig[item] &&
            unsupportedDeviceAndBrowserConfig[item] === true &&
            browserData[item] === true) {
            broswerIsSupported = false;
        }
    });
    return broswerIsSupported;
};
//# sourceMappingURL=isSupported.js.map