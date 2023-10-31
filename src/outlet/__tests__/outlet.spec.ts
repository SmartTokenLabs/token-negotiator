import { Outlet } from '../index'
import { TicketStorage } from '../ticketStorage'
import { TextEncoder, TextDecoder } from 'util'
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

describe('Test TicketStorage', () => {
	// @ts-ignore
	new TicketStorage(outlet.tokenConfig.issuers)
	test('storage has the correct data from given input', async () => {
		// @ts-ignore
		expect(outlet.tokenConfig.issuers).toEqual(_issuers)
	})
})
