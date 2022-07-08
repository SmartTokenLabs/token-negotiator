// @ts-nocheck

import { isBrowserDeviceWalletSupported } from '../isSupported';

describe('browser simulations', () => {
	test('check if browser is supported', () => {
		expect(isBrowserDeviceWalletSupported([])).toEqual(true);
	});
});
