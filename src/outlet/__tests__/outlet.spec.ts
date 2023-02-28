// @ts-nocheck

import { Outlet } from '../index'

/*
  TODO: Find a solution for TypeError: Cannot convert a BigInt value to a number at Math.pow (<anonymous>)
  Thrown by import {Authenticator} from '@tokenscript/attestation' due to @tokenscript/attestation/src/libs/Point.ts
*/

describe('Outlet spec', () => {
	test('ensure token duplicates are not present', () => {
		const outlet = new Outlet({
			collectionID: 'devcon',
			onChain: false,
			title: 'Devcon',
			image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
			tokenOrigin: 'http://localhost:3002/',
			attestationOrigin: 'https://test.attestation.id/',
			base64senderPublicKeys: {
				'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
			},
			base64attestorPubKey:
				'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
			ticketIssuesUrlWebsitePrivateKey:
				'MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBBIIBVTCCAVECAQEEIM/T+SzcXcdtcNIqo6ck0nJTYzKL5ywYBFNSpI7R8AuBoIHjMIHgAgEBMCwGByqGSM49AQECIQD////////////////////////////////////+///8LzBEBCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEQQR5vmZ++dy7rFWgYpXOhwsHApv82y3OKNlZ8oFbFvgXmEg62ncmo8RlXaT7/A4RCKj9F7RIpoVUGZxH0I/7ENS4AiEA/////////////////////rqu3OavSKA7v9JejNA2QUECAQGhRANCAARjMR62qoIK9pHk17MyHHIU42Ix+Vl6Q2gTmIF72vNpinBpyoBkTkV0pnI1jdrLlAjJC0I91DZWQhVhddMCK65c',
		})

		const issuerTokens = [
			{ ticketIdNumber: 1 },
			{ ticketIdNumber: 2 },
			{ ticketIdNumber: 1 },
			{ ticketIdNumber: 3 },
			{ ticketIdNumber: 3 },
			{ ticketIdNumber: 5 },
			{ ticketIdNumber: 5 },
			{ ticketIdNumber: 6 },
			{ ticketIdNumber: 6 },
		]

		const noDuplicateTokens = outlet.removeDuplicatesByKey(issuerTokens, 'ticketIdNumber')

		expect(JSON.stringify(noDuplicateTokens)).toBe(
			'[{"ticketIdNumber":1},{"ticketIdNumber":2},{"ticketIdNumber":3},{"ticketIdNumber":5},{"ticketIdNumber":6}]',
		)
	})

	test('ensure token duplicates are not present when key is missing from object', () => {
		const outlet = new Outlet({
			collectionID: 'devcon',
			onChain: false,
			title: 'Devcon',
			image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
			tokenOrigin: 'http://localhost:3002/',
			attestationOrigin: 'https://test.attestation.id/',
			base64senderPublicKeys: {
				'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
			},
			base64attestorPubKey:
				'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
			ticketIssuesUrlWebsitePrivateKey:
				'MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBBIIBVTCCAVECAQEEIM/T+SzcXcdtcNIqo6ck0nJTYzKL5ywYBFNSpI7R8AuBoIHjMIHgAgEBMCwGByqGSM49AQECIQD////////////////////////////////////+///8LzBEBCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEQQR5vmZ++dy7rFWgYpXOhwsHApv82y3OKNlZ8oFbFvgXmEg62ncmo8RlXaT7/A4RCKj9F7RIpoVUGZxH0I/7ENS4AiEA/////////////////////rqu3OavSKA7v9JejNA2QUECAQGhRANCAARjMR62qoIK9pHk17MyHHIU42Ix+Vl6Q2gTmIF72vNpinBpyoBkTkV0pnI1jdrLlAjJC0I91DZWQhVhddMCK65c',
		})

		const issuerTokens = [
			{ classId: 1 },
			{ ticketIdNumber: 2 },
			{ ticketIdNumber: 1 },
			{ ticketIdNumber: 3 },
			{ ticketIdNumber: 3 },
			{ ticketIdNumber: 5 },
			{ ticketIdNumber: 5 },
			{ ticketIdNumber: 6 },
			{ ticketIdNumber: 6 },
		]

		const noDuplicateTokens = outlet.removeDuplicatesByKey(issuerTokens, 'ticketIdNumber')

		expect(JSON.stringify(noDuplicateTokens)).toBe(
			'[{"classId":1},{"ticketIdNumber":2},{"ticketIdNumber":1},{"ticketIdNumber":3},{"ticketIdNumber":5},{"ticketIdNumber":6}]',
		)
	})
})
