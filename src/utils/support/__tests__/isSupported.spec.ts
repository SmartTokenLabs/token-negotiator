// @ts-nocheck

import { isBrowserDeviceWalletSupported } from '../isSupported';

describe('browser simulations', () => {
	test('check if browser is supported', () => {
		expect(isBrowserDeviceWalletSupported()).toEqual(true);
	});
	test('check if browser is supported', () => {
		expect(isBrowserDeviceWalletSupported({
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
			isImToken: true
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

		expect(isBrowserDeviceWalletSupported({
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
			isImToken: true
		})).toEqual(false);
	});
});
