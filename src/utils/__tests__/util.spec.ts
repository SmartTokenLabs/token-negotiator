// @ts-nocheck
window.DISPLAY_DEBUG_LEVEL = 1

import { logger, requiredParams, compareObjects, base64ToUint8array, waitForElementToExist } from './../index';

// TODO: add unit tests for the following functions:
// logger, requiredParams, asyncHandle, attachPostMessageListener.

describe('util Spec object comparison', () => {
	test('expect a to be b shallow comparison', () => {
		const a = { data: 'In Ethereum, multi-signature wallets are implemented as a smart contract, that each of the approved external accounts sends a transaction to in order to "sign" a group transaction.' };
		const b = { data: 'In Ethereum, multi-signature wallets are implemented as a smart contract, that each of the approved external accounts sends a transaction to in order to "sign" a group transaction.' };
		expect(compareObjects(a, b)).toEqual(true);
	});
	test('expect a to be b deep comparison', () => {
		const a = { token: 'a', type: 'gold', class:'x' };
		const b = { type: 'gold', token: 'a', class:'x' };
		expect(compareObjects(a, b)).toEqual(true);
	});
	test('expect a not to be b shallow comparison', () => {
		const a = { data: 'Tokens standards like ERC-20 and ERC-721 require a separate contract to be deployed for each token type or collection. This places a lot of redundant bytecode on the Ethereum blockchain and limits certain functionality by the nature of separating each token contract into its own permissioned address. With the rise of blockchain games and platforms like Enjin Coin, game developers may be creating thousands of token types, and a new type of token standard is needed to support them. However, ERC-1155 is not specific to games and many other applications can benefit from this flexibility.'};
		const b = { data: 'Tokens standards like ERC-2000 and ERC-721 require a separate contract to be deployed for each token type or collection. This places a lot of redundant bytecode on the Ethereum blockchain and limits certain functionality by the nature of separating each token contract into its own permissioned address. With the rise of blockchain games and platforms like Enjin Coin, game developers may be creating thousands of token types, and a new type of token standard is needed to support them. However, ERC-1155 is not specific to games and many other applications can benefit from this flexibility.'};
		expect(compareObjects(a, b)).toEqual(false);
	});
	test('expect a not to be b deep comparison', () => {
		const a = { data: { transaction: { address: '0xFFFFF', uint: '100', bytes: '53454553', bool: true } }};
		const b = { data: { transaction: { address: '0x', uint: '100', bytes: '53454553', bool: true } }};
		expect(compareObjects(a, b)).toEqual(false);
	});
	test('expect a not to be b deep comparison 2', () => {
		const a = {};
		const b = { data: { transaction: { address: '0xFFFFF', uint: '100', bytes: '53454553', bool: true } }};
		expect(compareObjects(a, b)).toEqual(false);
	});
});
describe('util Spec base64ToUint8array', () => {
	test('expect base64 to be Uint8array', () => {
		expect(base64ToUint8array('RVJDNzIxLU5vbi1GdW5naWJsZS1Ub2tlbg==').toString()).toEqual([69, 82, 67, 55, 50, 49, 45, 78, 111, 110, 45, 70, 117, 110, 103, 105, 98, 108, 101, 45, 84, 111, 107, 101, 110].toString());
	});
});
describe('util logging and errors', () => {
	test('expect error to be thrown', () => {
		const msg = 'In order to have a decentralised database, you need to have security. In order to have security, you need to - you need to have incentives.';
		try {
			requiredParams(null, msg);
			// Fail test if above expression doesn't throw anything.
			expect(true).toBe(false);
		} catch (e) {
			// Error Caught
			expect(true).toBe(true);
		}
	});
	test('expect logger', () => {
		console.log = jest.fn();
		const msg = "It's the possibility of having a dream come true that makes life interesting.";
		logger(1, msg);
		// The first argument of the first call to the function was 'hello'
		expect(console.log).toHaveBeenCalledWith(msg);
	});
});

describe('util Spec waitForElementToExist', async () => {
	const newDiv = document.createElement('div').classList.add('test_element');
	const elemToCheck = await waitForElementToExist('.test_element');
	test('expect element to exist', () => {
		expect(elemToCheck).toBe(newDiv);
	});
});