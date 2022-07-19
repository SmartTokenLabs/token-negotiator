// @ts-nocheck

import { isUserAgentSupported } from '../isSupported';

describe('browser simulations', () => {
	test('check if browser is supported', () => {
		expect(isUserAgentSupported()).toEqual(true);
	});
	test('check if browser is supported', () => {
		expect(isUserAgentSupported({
			iE: true,
			iE9: true,
			edge: true,
			chrome: true,
			phantomJS: true,
			fireFox: true,
			safari: true,
			android: true,
			iOS: true,
			mac: true,
			windows: true,
			webView: true,
			touchDevice: true,
			metaMask: true,
			alphaWallet: true,
			mew: true,
			trust: true,
			goWallet: true,
			status: true,
			imToken: true,
			metaMaskAndroid: true,
			alphaWalletAndroid: true,
			mewAndroid: true,
			imTokenAndroid: true,
		})).toEqual(true);
	});
	test('check if browser is not supported', () => {

		Object.defineProperty(
			global.navigator,
			'userAgent', 
			{
				value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36',
				writable: true,
				configurable: true
			},
		);

		expect(isUserAgentSupported({
			iE: true,
			iE9: true,
			edge: true,
			chrome: true,
			phantomJS: true,
			fireFox: true,
			safari: true,
			android: true,
			iOS: true,
			mac: false,
			windows: true,
			webView: true,
			touchDevice: true,
			metaMask: true,
			alphaWallet: true,
			mew: true,
			trust: true,
			goWallet: true,
			status: true,
			imToken: true,
			metaMaskAndroid: true,
			alphaWalletAndroid: true,
			mewAndroid: true,
			imTokenAndroid: true,
		})).toEqual(false);
	});
});
