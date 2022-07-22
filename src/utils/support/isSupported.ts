
import { getBrowserData } from './getBrowserData';

export interface BrowserDataInterface {
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
  imToken: boolean

  metaMaskAndroid: boolean
  alphaWalletAndroid: boolean
  mewAndroid: boolean
  imTokenAndroid: boolean
}

// List of known browsers/platforms that are not supported.
const unSupportedUserAgents: string[] = ["iE", "iE9"];

export const isUserAgentSupported = (): boolean => {
	let supported = true;
	const browserData = getBrowserData();
	for (const browser in browserData) {
		if (browserData[browser] && unSupportedUserAgents.includes(browser)) {
			supported = false;
		}
	}
	return supported; 
}
