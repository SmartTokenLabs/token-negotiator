
import { getBrowserData } from './getBrowserData';

export interface BrowserDataInterface {
	iE?: boolean
	iE9?: boolean
	edge?: boolean
	chrome?: boolean
	phantomJS?: boolean
	fireFox?: boolean
	safari?: boolean
	android?: boolean
	iOS?: boolean
	mac?: boolean
	windows?: boolean
	webView?: boolean
	touchDevice?: boolean
	metaMask?: boolean
	alphaWallet?: boolean
	mew?: boolean
	trust?: boolean
	goWallet?: boolean
	status?: boolean
	imToken?: boolean

	metaMaskAndroid?: boolean
	alphaWalletAndroid?: boolean
	mewAndroid?: boolean
	imTokenAndroid?: boolean
}

export const isUserAgentSupported = (unSupportedUserAgents: BrowserDataInterface = {}): boolean => {
	const browserData = getBrowserData();
	const unsupported = Object.keys(unSupportedUserAgents);
	return !(unsupported.some(browser => browserData[browser]));
}
