import { Outlet } from '../index'
import { TicketStorage } from '../ticketStorage'
import { base64toBase64Url, hexStringToBase64Url } from '@tokenscript/attestation/dist/libs/utils'
import { Ticket } from '@tokenscript/attestation/dist/Ticket'
import { KeyPair } from '@tokenscript/attestation/dist/libs/KeyPair'
import { ethers } from 'ethers'
import { EasTicketAttestation } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'

// @ts-ignore
const outlet = new Outlet({
	collectionID: 'devcon',
	title: 'Devcon',
	tokenOrigin: 'http://localhost:3002/',
	attestationOrigin: 'https://test.attestation.id/',
	base64senderPublicKeys: {
		'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
	},
	base64attestorPubKey:
		'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
})

describe('Test modal dialog', () => {
	// TODO refactor the logic to enable unit tests to have an expected result
	// via user event trigger
	test('Expect modalDialogEventHandler to trigger user-accept', async () => {
		const output = await outlet.modalDialogEventHandler('1', 'write')
	})
	// TODO refactor the logic to enable unit tests to have an expected result
	// via user event trigger
	test('Expect modalDialogEventHandler to trigger user-abort', async () => {
		const output = await outlet.modalDialogEventHandler('1', 'read')
	})
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
		{ name: 'ticketIdString', type: 'string' },
		{ name: 'ticketClass', type: 'uint8' },
		{ name: 'commitment', type: 'bytes', isCommitment: true },
	],
}

async function createTestMagicLink(ticketType, ticketId, ticketClass) {
	let ticketInUrl, secret

	const email = 'test@test.com'
	const issuerPrivKey =
		'MIICSwIBADCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBBIIBVTCCAVECAQEEIM/T+SzcXcdtcNIqo6ck0nJTYzKL5ywYBFNSpI7R8AuBoIHjMIHgAgEBMCwGByqGSM49AQECIQD////////////////////////////////////+///8LzBEBCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcEQQR5vmZ++dy7rFWgYpXOhwsHApv82y3OKNlZ8oFbFvgXmEg62ncmo8RlXaT7/A4RCKj9F7RIpoVUGZxH0I/7ENS4AiEA/////////////////////rqu3OavSKA7v9JejNA2QUECAQGhRANCAARjMR62qoIK9pHk17MyHHIU42Ix+Vl6Q2gTmIF72vNpinBpyoBkTkV0pnI1jdrLlAjJC0I91DZWQhVhddMCK65c'

	if (ticketType === 'eas') {
		const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC)
		const wallet = new ethers.Wallet(KeyPair.privateFromPEM(issuerPrivKey).getPrivateAsHexString(), provider)

		const attestationManager = new EasTicketAttestation(EAS_TICKET_SCHEMA, {
			EASconfig: EAS_CONFIG,
			signer: wallet,
		})

		await attestationManager.createEasAttestation(
			{
				devconId: '6',
				ticketIdString: ticketId,
				ticketClass: ticketClass,
				commitment: email,
			},
			null,
		)

		ticketInUrl = base64toBase64Url(attestationManager.getEncoded())
		secret = attestationManager.getEasJson().secret
	} else {
		secret = BigInt(45845870684)

		let ticket = Ticket.createWithMail(email, '6', ticketId, ticketClass, { '6': KeyPair.privateFromPEM(issuerPrivKey) }, secret)

		if (!ticket.checkValidity()) {
			throw new Error('Ticket validity check failed')
		}

		if (!ticket.verify()) {
			throw new Error('Ticket verify failed')
		}

		ticketInUrl = hexStringToBase64Url(ticket.getDerEncoding())
	}

	return new URLSearchParams(new URL(`http://127.0.0.1?type=${ticketType}&ticket=${ticketInUrl}&secret=${secret}&mail=${email}`).search)
}

describe('Test TicketStorage', () => {
	const storage = new TicketStorage(outlet.tokenConfig)

	test('Store ASN ticket', async () => {
		await storage.importTicketFromMagicLink(await createTestMagicLink('asn', '1', 2))

		expect((await storage.getDecodedTokens()).length).toBe(1)
	})

	test('Store EAS ticket', async () => {
		await storage.importTicketFromMagicLink(await createTestMagicLink('eas', '2', 2))

		expect((await storage.getDecodedTokens()).length).toBe(2)
	})

	test('Ensure already added tickets are overwritten', async () => {
		await storage.importTicketFromMagicLink(await createTestMagicLink('eas', '1', 2))
		await storage.importTicketFromMagicLink(await createTestMagicLink('asn', '2', 2))

		expect((await storage.getDecodedTokens()).length).toBe(2)
	})

	test('Locate token via decoded data', async () => {
		const decToken = (await storage.getDecodedTokens())[0]

		const token = await storage.getStoredTicketFromDecodedToken(decToken)

		expect(token.tokenId).toBe(`${decToken.devconId}-${decToken.ticketIdString}`)
	})
})
