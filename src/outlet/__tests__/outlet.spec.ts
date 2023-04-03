import { Outlet } from '../index'
import { LocalOutlet } from '../localOutlet'
/*
  TODO: Find a solution for TypeError: Cannot convert a BigInt value to a number at Math.pow (<anonymous>)
  Thrown by import {Authenticator} from '@tokenscript/attestation' due to @tokenscript/attestation/src/libs/Point.ts
*/

const devconConfig = {
	collectionID: 'devcon',
	title: 'Devcon',
	tokenOrigin: document.location.origin,
	attestationOrigin: 'https://test.attestation.id/',
	base64senderPublicKeys: {
		'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
	},
	base64attestorPubKey:
		'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
}

window.history.pushState(
	null,
	'',
	'/?ticket=MIGTME0MATYCAgTTAgEBBEEELP0-vySEqJgldcvPSwL5VH_Bjta--7eHQafKwrwvH5MaPlOxSUqRtPf4GLs73BRJy-shtne8OV5C2e4-6qf5ggNCAEBVl-qTKHcKDKyjNszQ2NOOHS78dp56zQ6kWxxP2R4bE8-ZQs_zfTUS_HcNaLvyrsiil9ihndmcYD32Traiyscc&secret=45845870684&id=miccy@smarttokenlabs.com',
)

// @ts-ignore
const outlet = new Outlet(devconConfig)

describe('Test magic link token merging', () => {
	// TicketId: 1235; Email 1
	const ticket1 = {
		token:
			'MIGTME0MATYCAgTTAgEBBEEELP0-vySEqJgldcvPSwL5VH_Bjta--7eHQafKwrwvH5MaPlOxSUqRtPf4GLs73BRJy-shtne8OV5C2e4-6qf5ggNCAEBVl-qTKHcKDKyjNszQ2NOOHS78dp56zQ6kWxxP2R4bE8-ZQs_zfTUS_HcNaLvyrsiil9ihndmcYD32Traiyscc',
		id: '1',
		secret: '1',
		magic_link: '',
	}
	// TicketId: 1235; Email 2
	const ticket2 = {
		token:
			'MIGTME0MATYCAgTTAgEBBEEEDjlqyo764Y_sfQFUVOLrk6BN6RB7NDJuoxNL07aa13UPBrUh9mgF0Itge2EolzZkCXIN0mlHo0PhTIHhWMsOIwNCAIGsxXnRlAZb8ihGQo5CXnq1Gxui7ELcM0gKfR8EDnmNdGOGNLxjJdAuLRPyUuek9uuShQbkR-acpKsmlW86g_kb',
		id: '2',
		secret: '1',
		magic_link: '',
	}
	// TicketId: 1236; Email 1
	const ticket3 = {
		token:
			'MIGTME0MATYCAgTUAgECBEEELP0-vySEqJgldcvPSwL5VH_Bjta--7eHQafKwrwvH5MaPlOxSUqRtPf4GLs73BRJy-shtne8OV5C2e4-6qf5ggNCAHJ4nMSLoDSshkso5w1MDup5fWBIt1mCByU2HVf8uu_5eIhXM6fpkQq3Uyr7m0VxcYK3eehaaPLOqnPId9teDYIb',
		id: '1',
		secret: '1',
		magic_link: '',
	}

	test('Expect new attestation to be added', () => {
		const tokens = outlet.mergeNewToken(ticket3, [ticket1]) as any[]
		expect(tokens.length).toBe(2)
	})
	test('Expect existing attestation with same ID to be overwritten', () => {
		const tokens = outlet.mergeNewToken(ticket2, [ticket1]) as any[]
		expect(tokens.length).toBe(1)
	})
	test('Expect duplicate attestation to be skipped', () => {
		const tokens = outlet.mergeNewToken(ticket1, [ticket1])
		expect(tokens).toBe(false)
	})
})

describe('Test local outlet', () => {
	window.history.pushState(
		null,
		'',
		'/?ticket=MIGTME0MATYCAgTTAgEBBEEELP0-vySEqJgldcvPSwL5VH_Bjta--7eHQafKwrwvH5MaPlOxSUqRtPf4GLs73BRJy-shtne8OV5C2e4-6qf5ggNCAEBVl-qTKHcKDKyjNszQ2NOOHS78dp56zQ6kWxxP2R4bE8-ZQs_zfTUS_HcNaLvyrsiil9ihndmcYD32Traiyscc&secret=45845870684&id=miccy@smarttokenlabs.com',
	)

	// @ts-ignore
	const localOutlet = new LocalOutlet(devconConfig)

	test('Read magic link', () => {
		expect(() => localOutlet.readMagicLink()).not.toThrow()
	})

	test('check token was installed', () => {
		const tokens = localOutlet.getTokens()
		expect(tokens.length).toBe(1)
	})

	test('Authenticate iframe', () => {
		const tokens = localOutlet.getTokens()

		localOutlet.authenticate(tokens[0], '0x00', 'MetaMask')
	})

	/* test("Authenticate redirect", () => {
		const tokens = localOutlet.getTokens();

		localOutlet.authenticate(tokens[0], "0x00", "MetaMask", document.location.href)
	})*/
})

describe('Test remote outlet', () => {
	window.history.pushState(
		null,
		'',
		'/?ticket=MIGTME0MATYCAgTTAgEBBEEELP0-vySEqJgldcvPSwL5VH_Bjta--7eHQafKwrwvH5MaPlOxSUqRtPf4GLs73BRJy-shtne8OV5C2e4-6qf5ggNCAEBVl-qTKHcKDKyjNszQ2NOOHS78dp56zQ6kWxxP2R4bE8-ZQs_zfTUS_HcNaLvyrsiil9ihndmcYD32Traiyscc&secret=45845870684&id=miccy@smarttokenlabs.com',
	)

	// @ts-ignore
	const outlet = new Outlet(devconConfig)

	test('Read magic link', () => {
		expect(() => outlet.readMagicLink()).not.toThrow()
	})

	test('check token was installed', () => {
		const tokens = outlet.prepareTokenOutput({})
		expect(tokens.length).toBe(1)
	})

	test('test is same origin', () => {
		expect(outlet.isSameOrigin()).toBe(true)
	})

	test('send error response', () => {
		expect(() => outlet.sendErrorResponse('123', 'Test error')).not.toThrow()
	})
})
