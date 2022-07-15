export var getBrowserData = function () {
    var inBrowser = typeof window !== "undefined";
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isIE = UA && /msie|trident/.test(UA);
    var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
    var isEdge = UA && UA.indexOf("edge/") > 0;
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
    var isPhantomJS = UA && /phantomjs/.test(UA);
    var isFireFox = UA && /firefox\/\d+/.test(UA);
    var isSafari = window.safari ? true : false;
    var isAndroid = UA && UA.indexOf("android") > 0;
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
    var isMac = window.navigator.platform.toLowerCase().includes("mac");
    var isWindows = window.navigator.platform.toLowerCase().includes("win");
    var isTouchDevice = false;
    var isMobile = window.matchMedia;
    if (isMobile) {
        var match_mobile = isMobile("(pointer:coarse)");
        isTouchDevice = match_mobile.matches;
    }
    if (typeof ethereum === "undefined")
        var ethereum = {
            isMetaMask: false,
            isAlphaWallet: false,
            isTrust: false,
            isStatusWallet: false,
            isGoWallet: false,
        };
    var isMetaMask = isTouchDevice && ethereum.isMetaMask;
    var isAlphaWallet = isTouchDevice && ethereum.isAlphaWallet;
    var isTrust = isTouchDevice && ethereum.isTrust;
    var isStatusWallet = isTouchDevice && ethereum.isStatusWallet;
    var isGoWallet = isTouchDevice && ethereum.isGoWallet;
    var isMyEthereumWallet = isTouchDevice && ethereum.isTrust && ethereum.isMetaMask;
    var isImToken = !!navigator.userAgent.match(/\simToken\//);
    return {
        iE: isIE,
        iE9: isIE9,
        edge: isEdge,
        chrome: isChrome,
        phantomJS: isPhantomJS,
        fireFox: isFireFox,
        safari: isSafari,
        android: isAndroid,
        iOS: isIOS,
        mac: isMac,
        windows: isWindows,
        touchDevice: isTouchDevice,
        metaMask: isMetaMask,
        alphaWallet: isAlphaWallet,
        mew: isMyEthereumWallet,
        trust: isTrust,
        goWallet: isGoWallet,
        status: isStatusWallet,
        isImToken: isImToken
    };
};
//# sourceMappingURL=getBrowserData.js.map