
import { getBrowserData } from './getBrowserData';

// example use: unsupportedDeviceAndBrowserList
//   [
//     "metaMask",
//     "alphaWallet",
//     "mew",
//     "trust",
//     "goWallet",
//     "status"
//   ]
// unsupportedWarning (optional)

interface BrowserDataInterface {
  iE: boolean
  iE9: boolean
  edge: boolean
  chrome: boolean
  phantomJS: boolean
  fireFox: boolean
  safari: boolean
  android: boolean
  iOS: boolean
  mac: boolean
  windows: boolean
  webView: boolean
  touchDevice: boolean
  metaMask: boolean
  alphaWallet: boolean
  mew: boolean
  trust: boolean
  goWallet: boolean
  status: boolean
}

export const isBrowserDeviceWalletSupported = (unsupportedDeviceAndBrowserList:string[]) => {
  const browserData = getBrowserData();
  const unsupportedCheckArr = unsupportedDeviceAndBrowserList.filter((item) => { return (browserData[item.toLocaleLowerCase() as keyof BrowserDataInterface] === true) ? "true" : "false" });
  return !unsupportedCheckArr.includes("true");
}
