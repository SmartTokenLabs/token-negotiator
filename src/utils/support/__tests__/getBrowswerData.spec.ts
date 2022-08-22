import { getBrowserData } from './../getBrowserData';

Object.defineProperty(
	global.navigator,
	'userAgent', 
	{
		value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36',
		writable: true,
		configurable: true
	},
);

describe('browser simulations', () => {
	test('get object defining the browser device or wallet details', () => {
		expect(window.navigator.userAgent).toEqual('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36');
		expect(getBrowserData()).toEqual({
			iE: false,
			iE9: false,
			edge: false,
			chrome: true,
			phantomJS: false,
			fireFox: false,
			safari: false,
			android: false,
			iOS: false,
			mac: true,
			windows: false,
			touchDevice: false,
			metaMask: false,
			alphaWallet: false,
			mew: false,
			trust: false,
			goWallet: false,
			status: false,
			imToken: false,
			brave: false,
			braveAndroid: false,
			braveIOS: false,
			metaMaskAndroid: false,
			alphaWalletAndroid: false,
			mewAndroid: false,
			imTokenAndroid: false,
		});
	});
});
