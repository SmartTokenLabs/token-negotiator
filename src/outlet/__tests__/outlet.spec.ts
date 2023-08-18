import { Outlet } from '../index'
import { TicketStorage } from '../ticketStorage'
import { base64toBase64Url, hexStringToBase64Url } from '@tokenscript/attestation/dist/libs/utils'
import { Ticket } from '@tokenscript/attestation/dist/Ticket'
import { KeyPair } from '@tokenscript/attestation/dist/libs/KeyPair'
import { ethers } from 'ethers'
import { EasTicketAttestation } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'
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

const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e' // Sepolia v0.26

const SEPOLIA_RPC = 'https://rpc.sepolia.org/'

export const EAS_CONFIG = {
	address: EASContractAddress,
	version: '0.26',
	chainId: 11155111,
}

const EAS_TICKET_SCHEMA = {
	fields: [
		{ name: 'devconId', type: 'string' },
		{ name: 'ticketId', type: 'string' },
		{ name: 'ticketClass', type: 'uint8' },
		{ name: 'commitment', type: 'bytes', isCommitment: true },
	],
}

// Commented for now to enable the build. Uncomment when needed.
// async function createTestMagicLink(ticketType, ticketId, ticketClass) {
// 	let ticketInUrl, secret

// 	const email = 'test@test.com'
// 	const issuerPrivKey =
// 		'MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBBIIBVTCCAVECAQEEIM/T+SzcXcdtcNIqo6ck0nJTYzKL5ywYBFNSpI7R8AuBoIHjMIHgAgEBMCwGByqGSM49AQECIQD////////////////////////////////////+///8LzBEBCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEQQR5vmZ++dy7rFWgYpXOhwsHApv82y3OKNlZ8oFbFvgXmEg62ncmo8RlXaT7/A4RCKj9F7RIpoVUGZxH0I/7ENS4AiEA/////////////////////rqu3OavSKA7v9JejNA2QUECAQGhRANCAARjMR62qoIK9pHk17MyHHIU42Ix+Vl6Q2gTmIF72vNpinBpyoBkTkV0pnI1jdrLlAjJC0I91DZWQhVhddMCK65c'

// 	if (ticketType === 'eas') {
// 		const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC)
// 		const wallet = new ethers.Wallet(KeyPair.privateFromPEM(issuerPrivKey).getPrivateAsHexString(), provider)

// 		const attestationManager = new EasTicketAttestation(EAS_TICKET_SCHEMA, {
// 			EASconfig: EAS_CONFIG,
// 			signer: wallet,
// 		})

// 		await attestationManager.createEasAttestation({
// 			devconId: '6',
// 			ticketIdString: ticketId,
// 			ticketClass: ticketClass,
// 			commitment: email,
// 		})

// 		ticketInUrl = base64toBase64Url(attestationManager.getEncoded())
// 		secret = attestationManager.getEasJson().secret
// 	} else {
// 		secret = BigInt(45845870684)

// 		let ticket = Ticket.createWithMail(email, '6', ticketId, ticketClass, { '6': KeyPair.privateFromPEM(issuerPrivKey) }, secret)

// 		if (!ticket.checkValidity()) {
// 			throw new Error('Ticket validity check failed')
// 		}

// 		if (!ticket.verify()) {
// 			throw new Error('Ticket verify failed')
// 		}

// 		ticketInUrl = hexStringToBase64Url(ticket.getDerEncoding())
// 	}

// 	return new URLSearchParams(new URL(`http://127.0.0.1?type=${ticketType}&ticket=${ticketInUrl}&secret=${secret}&mail=${email}`).search)
// }

describe('Test TicketStorage', () => {
	// @ts-ignore
	const storage = new TicketStorage(outlet.tokenConfig.issuers)

	test('storage has the correct data from given input', async () => {
		// @ts-ignore
		expect(outlet.tokenConfig.issuers).toEqual(_issuers)
	})

	// test('Store ASN ticket', async () => {
	// 	await storage.importTicketFromMagicLink(await createTestMagicLink('asn', '1', 2))
	// const request = {
	// 	'devcon': ['0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05'],
	// 	'test-2': ['0x595e334142dd2a9ac6ce2195e560ac1efd926b9632ef10cc7dcf31fe1cb68863'],
	// 	'test-3': ['0x55592fab10cace25a4b34b07aa8741dc3ae50100f73e2997619a5ccc82f62810'],
	// }
	// 	expect((await storage.getDecodedTokens(request)).length).toBe(1)
	// })
	// test('Store EAS ticket', async () => {
	// 	await storage.importTicketFromMagicLink(await createTestMagicLink('eas', '2', 2))
	// 	const request = {
	// 		'devcon': ['0x0915bb6dcd508278764d9bfff6ba113c87c761ed78e84ed238811f2264a83a05'],
	// 		'test-2': ['0x595e334142dd2a9ac6ce2195e560ac1efd926b9632ef10cc7dcf31fe1cb68863'],
	// 		'test-3': ['0x55592fab10cace25a4b34b07aa8741dc3ae50100f73e2997619a5ccc82f62810'],
	// 	}
	// 	expect((await storage.getDecodedTokens(request)).length).toBe(2)
	// })
	// test('Ensure already added tickets are overwritten', async () => {
	// 	await storage.importTicketFromMagicLink(await createTestMagicLink('eas', '1', 2))
	// 	await storage.importTicketFromMagicLink(await createTestMagicLink('asn', '2', 2))
	// 	expect((await storage.getDecodedTokens()).length).toBe(2)
	// })
	// test('Locate token via decoded data', async () => {
	// 	const decToken = (await storage.getDecodedTokens())[0]
	// 	const token = await storage.getStoredTicketFromDecodedToken(decToken)
	// 	expect(token.tokenId).toBe(`${decToken.devconId}-${decToken.ticketId}`)
	// })
})
