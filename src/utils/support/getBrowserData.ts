export const getBrowserData = () => {
  
	const inBrowser = typeof window !== "undefined";
	const UA = inBrowser && window.navigator.userAgent.toLowerCase();

	// detect browser
	const isIE = UA && /msie|trident/.test(UA);
	const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
	const isEdge = UA && UA.indexOf("edg/") > 0;
	const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	const isPhantomJS = UA && /phantomjs/.test(UA);
	const isFireFox = UA && /firefox\/\d+/.test(UA);
	const isSafari = window.safari ? true : false;
	const isBrave = !!window.navigator["brave"];

	// detect OS
	const isAndroid = UA && UA.indexOf("android") > 0;
	const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	const isMac = UA && /\smac\s/.test(UA);
	const isWindows = UA && /windows/.test(UA);

	// detect if touch device
	let isTouchDevice = false;
	let isMobile = window.matchMedia;
	if (isMobile) {
		let match_mobile = isMobile("(pointer:coarse)");
		isTouchDevice = match_mobile.matches;
	}

	// detect wallet

	let windowEthereum = window.ethereum;
	
	if (typeof window.ethereum === "undefined") {
		windowEthereum = { 
			isMetaMask: false, 
			isAlphaWallet: false,
			isTrust: false,
			isStatusWallet: false,
			isGoWallet: false,
		};
	}  

	const isAlphaWallet = isTouchDevice && !!windowEthereum.isAlphaWallet;
	const isTrust = isTouchDevice && !!windowEthereum.isTrust;
	const isStatusWallet = isTouchDevice && !!windowEthereum.isStatusWallet;
	const isGoWallet = isTouchDevice && !!windowEthereum.isGoWallet;
	const isMyEthereumWallet =isTouchDevice && !!windowEthereum.isTrust && !!windowEthereum.isMetaMask;
	const isImToken = !!navigator.userAgent.match(/\simToken\//);
	
	const isMetaMask = isTouchDevice && !!windowEthereum.isMetaMask && !isTrust && !isBrave;

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
		imToken: isImToken,
		brave: isBrave,
		braveAndroid: isBrave && isAndroid,
		braveIOS: isBrave && isIOS,
		metaMaskAndroid: isAndroid && isMetaMask,
		alphaWalletAndroid: isAndroid && isAlphaWallet,
		mewAndroid: isAndroid && isMyEthereumWallet,
		imTokenAndroid: isAndroid && isImToken,
	};
};

export function isMacOrIOS() {
	return !!window.safari ||
		/iphone|ipad|ipod|ios/.test(window.navigator.userAgent ? window.navigator.userAgent.toLowerCase() : "");
}
