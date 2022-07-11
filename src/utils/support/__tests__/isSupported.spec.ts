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
});
