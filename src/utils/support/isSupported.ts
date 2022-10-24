
import { logger } from '..';
import { getBrowserData } from './getBrowserData';

export const SUPPORTED_EVM_BLOCKCHAINS = [
	"evm", "polygon", "optimism", "bsc", "avalanche", "fantom", "goerli", "mumbai", "arbitrum"
];

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

export const validateBlockchain = (blockchain: string) => {
	if (blockchain === "") {
		console.warn("You did not specify 'blockchain', the default value is evm. Check our github to see supported values.");
		return "evm";
	}
	if (blockchain === "solana") {
		return "solana";
	}

	if (blockchain === "evm") {
		return "evm";
	}

	if (SUPPORTED_EVM_BLOCKCHAINS.includes(blockchain.toLowerCase())) {
		console.warn("We recommend you to set `blockchain` as 'evm'.");
		return "evm";
	}

	console.error("You set unsupported `blockchain` in the constructor. Check our github to see supported values.");
	return blockchain;
} 
