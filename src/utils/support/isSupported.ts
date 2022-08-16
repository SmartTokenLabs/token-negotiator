
import { logger } from '..';
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
	brave?: boolean

	metaMaskAndroid?: boolean
	alphaWalletAndroid?: boolean
	mewAndroid?: boolean
	imTokenAndroid?: boolean
}

export const isUserAgentSupported = (unSupportedUserAgents?: BrowserDataInterface): boolean => {
	if (!unSupportedUserAgents) return true;
	const browserData = getBrowserData();
	logger(2, "unSupportedUserAgents: ", unSupportedUserAgents)
	logger(2, "browserData: ", browserData)
	const unsupported = Object.keys(unSupportedUserAgents);
	return !(unsupported.some(browser => unSupportedUserAgents[browser] && browserData[browser]));
}
