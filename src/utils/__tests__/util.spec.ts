// @ts-nocheck
window.DISPLAY_DEBUG_LEVEL = 1

import { TextEncoder, TextDecoder } from 'util'
Object.assign(global, { TextDecoder, TextEncoder })

import { hasUncaughtExceptionCaptureCallback } from 'process'
import {
	createIssuerHashMap,
	createIssuerHashArray,
	createOffChainCollectionHash,
	logger,
	requiredParams,
	compareObjects,
	base64ToUint8array,
	waitForElementToExist,
	removeUrlSearchParams,
} from './../index'
import { errorHandler } from '../index'
import { toExpression } from '@babel/types'

// TODO: add unit tests for the following functions:
// logger, requiredParams, asyncHandle, attachPostMessageListener.

describe('util Spec object comparison', () => {
	test('expect a to be b shallow comparison', () => {
		const a = {
			data: 'In Ethereum, multi-signature wallets are implemented as a smart contract, that each of the approved external accounts sends a transaction to in order to "sign" a group transaction.',
		}
		const b = {
			data: 'In Ethereum, multi-signature wallets are implemented as a smart contract, that each of the approved external accounts sends a transaction to in order to "sign" a group transaction.',
		}
		expect(compareObjects(a, b)).toEqual(true)
	})
	test('expect a to be b deep comparison', () => {
		const a = { token: 'a', type: 'gold', class: 'x' }
		const b = { type: 'gold', token: 'a', class: 'x' }
		expect(compareObjects(a, b)).toEqual(true)
	})
	test('expect a not to be b shallow comparison', () => {
		const a = {
			data: 'Tokens standards like ERC-20 and ERC-721 require a separate contract to be deployed for each token type or collection. This places a lot of redundant bytecode on the Ethereum blockchain and limits certain functionality by the nature of separating each token contract into its own permissioned address. With the rise of blockchain games and platforms like Enjin Coin, game developers may be creating thousands of token types, and a new type of token standard is needed to support them. However, ERC-1155 is not specific to games and many other applications can benefit from this flexibility.',
		}
		const b = {
			data: 'Tokens standards like ERC-2000 and ERC-721 require a separate contract to be deployed for each token type or collection. This places a lot of redundant bytecode on the Ethereum blockchain and limits certain functionality by the nature of separating each token contract into its own permissioned address. With the rise of blockchain games and platforms like Enjin Coin, game developers may be creating thousands of token types, and a new type of token standard is needed to support them. However, ERC-1155 is not specific to games and many other applications can benefit from this flexibility.',
		}
		expect(compareObjects(a, b)).toEqual(false)
	})
	test('expect a not to be b deep comparison', () => {
		const a = { data: { transaction: { address: '0xFFFFF', uint: '100', bytes: '53454553', bool: true } } }
		const b = { data: { transaction: { address: '0x', uint: '100', bytes: '53454553', bool: true } } }
		expect(compareObjects(a, b)).toEqual(false)
	})
	test('expect a not to be b deep comparison 2', () => {
		const a = {}
		const b = { data: { transaction: { address: '0xFFFFF', uint: '100', bytes: '53454553', bool: true } } }
		expect(compareObjects(a, b)).toEqual(false)
	})
})
describe('util Spec base64ToUint8array', () => {
	test('expect base64 to be Uint8array', () => {
		expect(base64ToUint8array('RVJDNzIxLU5vbi1GdW5naWJsZS1Ub2tlbg==').toString()).toEqual(
			[69, 82, 67, 55, 50, 49, 45, 78, 111, 110, 45, 70, 117, 110, 103, 105, 98, 108, 101, 45, 84, 111, 107, 101, 110].toString(),
		)
	})
})
describe('util logging and errors', () => {
	test('expect error to be thrown', () => {
		const msg =
			'In order to have a decentralised database, you need to have security. In order to have security, you need to - you need to have incentives.'
		try {
			requiredParams(null, msg)
			// Fail test if above expression doesn't throw anything.
			expect(true).toBe(false)
		} catch (e) {
			// Error Caught
			expect(true).toBe(true)
		}
	})
	test('expect logger', () => {
		console.log = jest.fn()
		const msg = "It's the possibility of having a dream come true that makes life interesting."
		logger(1, msg)
		// The first argument of the first call to the function was 'hello'
		expect(console.log).toHaveBeenCalledWith(msg)
	})
})

describe('util Spec waitForElementToExist', () => {
	test('expect element to exist', () => {
		const newDiv = document.createElement('div')
		newDiv.classList.add('test_element')
		waitForElementToExist('.test_element').then((el) => {
			expect(el).toBe(newDiv)
		})
	})
})

describe('util Spec errorHandler', () => {
	test('expect to handle error', () => {
		const err = 'Error exception'
		expect(errorHandler(err, 'error', null, null, false, false)).toEqual({ message: err, data: null, type: 'error' })
	})
})

describe('util Spec removeUrlSearchParams', () => {
	test('Expect no parameters to be left', () => {
		let params = new URLSearchParams('tn-action=get-tokens&tn-issuer=devcon')
		params = removeUrlSearchParams(params)
		expect(params.toString()).toEqual('')
	})
	test('Expect non-namespaced parameters to be removed', () => {
		let params = new URLSearchParams('tn-action=get-tokens&tn-issuer=devcon&email=test@test.com')
		params = removeUrlSearchParams(params, ['email'])
		expect(params.toString()).toEqual('')
	})
	test('Expect non-specified parameter to be retained', () => {
		let params = new URLSearchParams('tn-action=get-tokens&tn-issuer=devcon&email=test@test.com&redirectMode=always')
		params = removeUrlSearchParams(params, ['email'])
		expect(params.toString()).toEqual('redirectMode=always')
	})

	test('Create Issuer Hash Array', () => {
		expect(
			createIssuerHashArray({
				collectionID: 'devcon',
				onChain: false,
				title: 'Devcon',
				image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
				tokenOrigin: 'https://stltesting.tk/token-outlet/',
				attestationOrigin: 'https://attestation.id/',
				unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
				base64senderPublicKeys: {
					6: 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
					55: 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEAGJAHCiHbrCNAY9fAMdom4dGD6v/KkTIgRCkwLCjXFTkXWGrCEXHaZ8kWwdqlu0oYCrNQ2vdlqOl0s26/LzO8A==',
				},
				base64attestorPubKey:
					'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
				ticketIssuersUrlWebsitePrivateKey:
					'MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBBIIBVTCCAVECAQEEIM/T+SzcXcdtcNIqo6ck0nJTYzKL5ywYBFNSpI7R8AuBoIHjMIHgAgEBMCwGByqGSM49AQECIQD////////////////////////////////////+///8LzBEBCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEQQR5vmZ++dy7rFWgYpXOhwsHApv82y3OKNlZ8oFbFvgXmEg62ncmo8RlXaT7/A4RCKj9F7RIpoVUGZxH0I/7ENS4AiEA/////////////////////rqu3OavSKA7v9JejNA2QUECAQGhRANCAARjMR62qoIK9pHk17MyHHIU42Ix+Vl6Q2gTmIF72vNpinBpyoBkTkV0pnI1jdrLlAjJC0I91DZWQhVhddMCK65c',
			}),
		).toEqual([
			'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
			'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
		])
	})

	test('Create OffChain Collection Hash', () => {
		expect(
			createOffChainCollectionHash(
				{
					getPublicKeyAsHexStr: () => {
						return '0x000000'
					},
				},
				'devconnect',
			),
		).toEqual('0xc2bbce51b8fa0c9ab724b3553f58e496adbf44812295c8cc7376e145f0f8ed1c')
	})

	test('Create attestation request object with sha256 pub keys for outlet', () => {
		const issuers = [
			{
				collectionID: 'devcon',
				onChain: false,
				title: 'Devcon',
				image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
				tokenOrigin: 'https://stltesting.tk/token-outlet/',
				attestationOrigin: 'https://attestation.id/',
				unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
				base64senderPublicKeys: {
					6: 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
					55: 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEAGJAHCiHbrCNAY9fAMdom4dGD6v/KkTIgRCkwLCjXFTkXWGrCEXHaZ8kWwdqlu0oYCrNQ2vdlqOl0s26/LzO8A==',
				},
				base64attestorPubKey:
					'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
				ticketIssuersUrlWebsitePrivateKey:
					'MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBBIIBVTCCAVECAQEEIM/T+SzcXcdtcNIqo6ck0nJTYzKL5ywYBFNSpI7R8AuBoIHjMIHgAgEBMCwGByqGSM49AQECIQD////////////////////////////////////+///8LzBEBCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEQQR5vmZ++dy7rFWgYpXOhwsHApv82y3OKNlZ8oFbFvgXmEg62ncmo8RlXaT7/A4RCKj9F7RIpoVUGZxH0I/7ENS4AiEA/////////////////////rqu3OavSKA7v9JejNA2QUECAQGhRANCAARjMR62qoIK9pHk17MyHHIU42Ix+Vl6Q2gTmIF72vNpinBpyoBkTkV0pnI1jdrLlAjJC0I91DZWQhVhddMCK65c',
			},
			{
				collectionID: 'attestationDao',
				onChain: false,
				title: 'attestationDao',
				image: 'https://raw.githubusercontent.com/attestationDao/attestationDao.svg',
				tokenOrigin: 'https://stltesting.tk/token-outlet/',
				attestationOrigin: 'https://attestation.id/',
				unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
				base64senderPublicKeys: {
					6: 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
					55: 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEAGJAHCiHbrCNAY9fAMdom4dGD6v/KkTIgRCkwLCjXFTkXWGrCEXHaZ8kWwdqlu0oYCrNQ2vdlqOl0s26/LzO8A==',
				},
				base64attestorPubKey:
					'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
				ticketIssuersUrlWebsitePrivateKey:
					'MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBBIIBVTCCAVECAQEEIM/T+SzcXcdtcNIqo6ck0nJTYzKL5ywYBFNSpI7R8AuBoIHjMIHgAgEBMCwGByqGSM49AQECIQD////////////////////////////////////+///8LzBEBCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEQQR5vmZ++dy7rFWgYpXOhwsHApv82y3OKNlZ8oFbFvgXmEg62ncmo8RlXaT7/A4RCKj9F7RIpoVUGZxH0I/7ENS4AiEA/////////////////////rqu3OavSKA7v9JejNA2QUECAQGhRANCAARjMR62qoIK9pHk17MyHHIU42Ix+Vl6Q2gTmIF72vNpinBpyoBkTkV0pnI1jdrLlAjJC0I91DZWQhVhddMCK65c',
			},
		]
		expect(createIssuerHashMap(issuers)).toEqual({
			attestationDao: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
			devcon: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
		})
	})
})
