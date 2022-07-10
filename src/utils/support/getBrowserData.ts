// @ts-nocheck
const inBrowser = typeof window !== "undefined";
const UA = inBrowser && window.navigator.userAgent.toLowerCase();

// detect browser
const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
const isEdge = UA && UA.indexOf("edge/") > 0;
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
const isPhantomJS = UA && /phantomjs/.test(UA);
const isFireFox = UA && /firefox\/\d+/.test(UA);
const isSafari = window.safari ? true : false;

// detect OS
const isAndroid = UA && UA.indexOf("android") > 0;
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// detect device
const isMac = window.navigator.platform.toLowerCase().includes("mac");
const isWindows = window.navigator.platform.toLowerCase().includes("win");

// detect if touch device
let isTouchDevice = false;
let isMobile = window.matchMedia;
if (isMobile) {
  let match_mobile = isMobile("(pointer:coarse)");
  isTouchDevice = match_mobile.matches;
}

// detect wallet
if (typeof ethereum === "undefined") var ethereum = {};
const isMetaMask = isTouchDevice && ethereum.isMetaMask;
const isAlphaWallet = isTouchDevice && ethereum.isAlphaWallet;
const isTrust = isTouchDevice && ethereum.isTrust;
const isStatusWallet = isTouchDevice && ethereum.isStatusWallet;
const isGoWallet = isTouchDevice && ethereum.isGoWallet;
const isMyEthereumWallet =
  isTouchDevice && ethereum.isTrust && ethereum.isMetaMask;
const isImToken = !!navigator.userAgent.match(/\simToken\//);

export const getBrowserData = () => {
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
