import { Outlet } from '../index'
import { TicketStorage } from '../ticketStorage'
import { TextEncoder, TextDecoder } from 'util'
import { createIssuerHashArray } from './../../utils/index'
Object.assign(global, { TextDecoder, TextEncoder })

const _issuers = [
	{
		collectionID: 'devcon',
		title: 'Devcon',
		tokenOrigin: 'http://localhost:3002/',
		attestationOrigin: 'https://test.attestation.id/',
		base64senderPublicKeys: {
			'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
		},
		base64attestorPubKey:
			'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
		whitelist: [],
	},
	{
		collectionID: 'test-2',
		title: 'Test Event 2',
		tokenOrigin: 'http://localhost:3002/',
		attestationOrigin: 'https://test.attestation.id/',
		base64senderPublicKeys: {
			'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABAjUvEi8UYyC+0rSFu+IwRBos/DEC6YMJV+eCnoYOC4nZU7uayKDJmBxVnmTOSwaM4+gufLbeqqxuovyF5gI3TQ=',
		},
		base64attestorPubKey:
			'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
		whitelist: [],
	},
	{
		collectionID: 'test-3',
		title: 'Test Event 3',
		tokenOrigin: 'http://localhost:3002/',
		attestationOrigin: 'https://test.attestation.id/',
		base64senderPublicKeys: {
			'7': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABAjUvEi8UYyC+0rSFu+IwRBos/DEC6YMJV+eCnoYOC4nZU7uayKDJmBxVnmTOSwaM4+gufLbeqqxuovyF5gI3TQ=',
		},
		base64attestorPubKey:
			'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
	},
]

const outlet = new Outlet({
	issuers: _issuers,
	whitelistDialogWidth: '100px',
	whitelistDialogHeight: '100px',
	whitelistDialogRenderer: (permissionTxt: string, acceptBtn: string, denyBtn: string) => {
		return `
			<div class="tn-auth-box">
				<div class="tn-auth-heading">
					<img alt="devcon" src="devcon_logo.svg" style="width: 150px;" />
				</div>
				<div class="tn-auth-content">
					<p>${permissionTxt}</p>
					${acceptBtn}
					${denyBtn}
				</div>
			</div>
		`
	},
})


describe('Issuer Client to Outlet check', () => {
	test('can create an issuer hash implementation of config', async () => {
		expect(outlet.getHashToConfigMap()).toEqual({ "0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05": { "attestationOrigin": "https://test.attestation.id/", "base64attestorPubKey": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=", "base64senderPublicKeys": { "6": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=" }, "collectionID": "devcon", "title": "Devcon", "tokenOrigin": "http://localhost:3002/", "whitelist": [] }, "0x55592fab10cace25a4b34b07aa8741dc3ae50100f73e2997619a5ccc82f62810": { "attestationOrigin": "https://test.attestation.id/", "base64attestorPubKey": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=", "base64senderPublicKeys": { "7": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABAjUvEi8UYyC+0rSFu+IwRBos/DEC6YMJV+eCnoYOC4nZU7uayKDJmBxVnmTOSwaM4+gufLbeqqxuovyF5gI3TQ=" }, "collectionID": "test-3", "title": "Test Event 3", "tokenOrigin": "http://localhost:3002/" }, "0x595e334142dd2a9ac6ce2195e560ac1efd926b9632ef10cc7dcf31fe1cb68863": { "attestationOrigin": "https://test.attestation.id/", "base64attestorPubKey": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=", "base64senderPublicKeys": { "6": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABAjUvEi8UYyC+0rSFu+IwRBos/DEC6YMJV+eCnoYOC4nZU7uayKDJmBxVnmTOSwaM4+gufLbeqqxuovyF5gI3TQ=" }, "collectionID": "test-2", "title": "Test Event 2", "tokenOrigin": "http://localhost:3002/", "whitelist": [] } });
	})

	test('can build an issuer list', async () => {
		const hashToConfigMap = outlet.getHashToConfigMap();
		const requestHashes = {
			attestationDao: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
			devcon: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
		}
		expect(outlet.getRequestIssuerList(requestHashes, hashToConfigMap)).toEqual([{ "attestationOrigin": "https://test.attestation.id/", "base64attestorPubKey": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=", "base64senderPublicKeys": { "6": "MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=" }, "collectionID": "devcon", "title": "Devcon", "tokenOrigin": "http://localhost:3002/", "whitelist": [] }]);
	})
	test('can build a filtered issuer list', async () => {
		const hashToConfigMap = outlet.getHashToConfigMap();
		const requestHashes = {
			attestationDao: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
			devcon: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
		}
		expect(outlet.getFilteredRequestHashes(requestHashes, hashToConfigMap, ['devcon', 'attestationDao'])).toEqual({ "attestationDao": ["0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05"], "devcon": ["0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05"] });
	})
	test('can build an empty filtered issuer list', async () => {
		const hashToConfigMap = outlet.getHashToConfigMap();
		const requestHashes = {
			attestationDao: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
			devcon: [
				'0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05',
				'0x76d49eaf820fc5313a752214192a223511244124e188557fe84d88d8ff8c3a2f',
			],
		}
		expect(outlet.getFilteredRequestHashes(requestHashes, hashToConfigMap, [])).toEqual(
			{
				"attestationDao": [],
				"devcon": [],
			}
		)
	})
})


describe('Test TicketStorage', () => {
	// @ts-ignore
	new TicketStorage(outlet.tokenConfig.issuers)
	test('storage has the correct data from given input', async () => {
		// @ts-ignore
		expect(outlet.tokenConfig.issuers).toEqual(_issuers)
	})
})
