// @ts-nocheck
import { AbstractAuthentication } from '../auth/abstractAuthentication'
import { Client } from '../index'
import { TicketZKProof } from '../auth/ticketZKProof'
import { OffChainTokenConfig } from '../interface'
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

let tokenIssuer: OffChainTokenConfig = {
	collectionID: 'devcon',
	title: 'Devcon',
	onChain: false,
	tokenOrigin: 'http://some.url/',
	attestationOrigin: 'https://stage.attestation.id/',
	unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
	image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
	base64senderPublicKeys: {
		6: 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
	},
	base64attestorPubKey: '',
}

const config = {
	type: 'passive',
	enableOffChainRedirectMode: true,
	issuers: [tokenIssuer],
}

function getOffChainConfigClient() {
	return new Client({
		type: 'active',
		issuers: [tokenIssuer],
	})
}

function getOnChainConfigClient() {
	return new Client({
		type: 'active',
		issuers: [
			{ onChain: true, collectionID: 'bayc', contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' },
			{ onChain: true, collectionID: 'mayc', contract: '0x2F6F12b68165aBb483484927919D0d3fE450462E', chain: 'rinkeby' },
		],
		options: {},
	})
}

function getOnChainSolanaConfigClient() {
	return new Client({
		type: 'active',
		issuers: [
			{
				collectionID: 'penthouse-panther-club',
				collectionAddress: 'ff846ef2eed57e5367cf8826e63f4d53fe28d28aa67417accb6e4b48cbd19136',
				onChain: true,
				symbol: 'PPC',
				chain: 'mainnet',
				blockchain: 'solana',
			},
		],
		options: {},
	})
}

class LocalStorageMock {
	constructor() {
		this.store = {}
	}

	clear() {
		this.store = {}
	}

	getItem(key) {
		// console.log("LocalStorageMock (getItem):", key, this.store[key])
		return this.store[key] || null
	}

	setItem(key, value) {
		// console.log("LocalStorageMock (setItem):", key, value)
		if (value) {
			this.store[key] = String(value)
		} else {
			delete this.store[key]
		}
	}

	removeItem(key) {
		delete this.store[key]
	}
}

describe('client spec', () => {

	test('tokenNegotiatorClient a failed new instance of client - missing issuers key', () => {
		let client = new Client({
			type: 'passive',
			options: {},
		})

		return client.negotiate().catch((e) => {
			expect(e).toEqual(new Error('issuers are missing.'))
		})
	})

	test('client library interface method switch theme can be used', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		let client = new Client({
			type: 'active',
			issuers: tokenNegotiatorClient.getTokenStore().getCurrentIssuers(),
			options: {},
		})
		client.negotiate().then(() => {
			client.switchTheme('dark');
		});
	})

	test('client library can add token via magic link', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		let client = new Client({
			type: 'active',
			issuers: tokenNegotiatorClient.getTokenStore().getCurrentIssuers(),
			options: {},
		})
		client.negotiate().then(() => {
			client.addTokenViaMagicLink('https://outlet-stage.brandconnector.io/#type=asn&ticket=MIGTME0MATYCAgTUAgECBEEEDoIoocY3CRCPqbHzou84M7C-cWAfzrTnPwz7qWGWv3UVn53jWeTG8CSykYVk-SUdNwlGTiD-h8Xsf2cGzniNPQNCAK6Q153BMkBc9E2AR3MjEWNU_f-15Cl2w0EIvaqGoqYrHKSMm3CIjKik_KBRTzRrbQqM5lGe_jUivjhmfwR5HOUc&secret=6191295225924896663249851881131284553005448461740837624904453538708620527945&id=bob%40alice.com')
		});
	})

	test('client can trigger promise to manage', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		let client = new Client({
			type: 'active',
			issuers: tokenNegotiatorClient.getTokenStore().getCurrentIssuers(),
			options: {},
		})
		client.negotiate().then(() => {
			client.handleWalletRequired([]);
		});
	})

	test('client can handle proof error', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		let client = new Client({
			type: 'active',
			issuers: tokenNegotiatorClient.getTokenStore().getCurrentIssuers(),
			options: {},
		})
		client.negotiate().then(() => {
			client.handleProofError({ error: 'something went wrong' }, 'devconVi');
		});
	})

	test('tokenNegotiatorClient a failed new instance of client - missing issuers length', () => {
		let client = new Client({
			type: 'passive',
			issuers: [],
			options: {},
		})

		return client.negotiate().catch((e) => {
			expect(e).toEqual(new Error('issuers are missing.'))
		})
	})

	test('tokenNegotiatorClient a new instance of client', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()

		const issuers = tokenNegotiatorClient.getTokenStore().getCurrentIssuers()

		delete issuers['devcon'].timestamp

		expect(issuers.toString()).toEqual(
			{
				devcon: {
					attestationOrigin: 'https://stage.attestation.id/',
					base64attestorPubKey: '',
					base64senderPublicKey: '',
					base64senderPublicKeys: {
						'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
					},
					base64senderPublicKey: '',
					collectionID: 'devcon',
					image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
					onChain: false,
					title: 'Devcon',
					tokenOrigin: 'http://some.url/',
					unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
				},
			}.toString(),
		)
	})

	test('tokenNegotiatorClient getTokenStore Data', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		const store = tokenNegotiatorClient.getTokenStore()

		expect(store.getCurrentTokens(false)).toEqual({
			devcon: [],
		})

		expect(store.getCurrentTokens(true)).toEqual({})

		const issuers = store.getCurrentIssuers()

		delete issuers['devcon'].timestamp

		expect(issuers.toString()).toEqual(
			{
				devcon: {
					attestationOrigin: 'https://stage.attestation.id/',
					base64attestorPubKey: '',
					base64senderPublicKey: '',
					base64senderPublicKeys: {
						'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
					},
					base64senderPublicKey: '',
					collectionID: 'devcon',
					image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
					onChain: false,
					title: 'Devcon',
					tokenOrigin: 'http://some.url/',
					unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
				},
			}.toString(),
		)

		expect(store.getSelectedTokens()).toEqual({})
	})

	test('tokenNegotiatorClient method safeConnectAvailable', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		expect(tokenNegotiatorClient.safeConnectAvailable()).toBe(false)
	})

	test('tokenNegotiatorClient method solanaAvailable will return false with no window.solana instance', () => {
		const tokenNegotiatorClient = getOnChainSolanaConfigClient()
		expect(tokenNegotiatorClient.hasIssuerForBlockchain('solana')).toBe(false)
	})

	test('tokenNegotiatorClient method solanaAvailable should show Solana', () => {
		const tokenNegotiatorClient = getOnChainSolanaConfigClient()
		window.solana = jest.fn({ instance: true })
		expect(tokenNegotiatorClient.hasIssuerForBlockchain('solana')).toBe(true)
	})

	test('tokenNegotiatorClient method solanaAvailable should not show Solana with no required issuer tokens', () => {
		const tokenNegotiatorClient = getOnChainConfigClient()
		window.solana = jest.fn({ instance: true }) //
		expect(tokenNegotiatorClient.hasIssuerForBlockchain('solana')).toBe(false)
	})

	test('tokenNegotiatorClient method getWalletProvider', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		const { Web3WalletProvider } = await import('../../wallet/Web3WalletProvider')
		expect(await tokenNegotiatorClient.getWalletProvider()).toStrictEqual(
			new Web3WalletProvider(tokenNegotiatorClient, tokenNegotiatorClient.config.safeConnectOptions),
		)
	})

	test('tokenNegotiatorClient method negotiatorConnectToWallet', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		let metamask_err
		await (await tokenNegotiatorClient.getWalletProvider()).MetaMask().catch((err) => {
			metamask_err = err
		})
		return await tokenNegotiatorClient.negotiatorConnectToWallet('MetaMask').catch((err) => {
			expect(err).toEqual(metamask_err)
		})
	})

	test('tokenNegotiatorClient method enrichTokenLookupDataOnChainTokens', async () => {
		const tokenNegotiatorClient = getOnChainConfigClient()
		try {
			await tokenNegotiatorClient.enrichTokenLookupDataOnChainTokens()
		} catch (err) {
			expect(err).toEqual(new Error('HTTP error.'))
		}
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers(true)).toBeDefined()
	})

	test('tokenNegotiatorClient method setPassiveNegotiationWebTokens', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		await tokenNegotiatorClient.setPassiveNegotiationWebTokens()
		expect(tokenNegotiatorClient.getTokenStore().getIssuerTokens()).toBeDefined()
	})

	test('tokenNegotiatorClient disconnect Wallet', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		await tokenNegotiatorClient.disconnectWallet()
		const providerInstance = await tokenNegotiatorClient.getWalletProvider()
		expect(Object.keys(providerInstance.connections).length).toEqual(0)
	})

	test('tokenNegotiatorClient method setPassiveNegotiationOnChainTokens', async () => {
		const tokenNegotiatorClient = getOnChainConfigClient()
		await tokenNegotiatorClient.setPassiveNegotiationOnChainTokens()
		expect(tokenNegotiatorClient.getTokenStore().getIssuerTokens()).toBeDefined()
	})

	test('tokenNegotiatorClient method activeNegotiationStrategy', () => {
		const tokenNegotiatorActiveClient = getOnChainConfigClient()
		tokenNegotiatorActiveClient.activeNegotiationStrategy(true)
		tokenNegotiatorActiveClient.activeNegotiationStrategy(false)
	})

	test('tokenNegotiatorClient with valid contract and chain', () => {
		const tokenNegotiatorClient = new Client({
			type: 'active',
			issuers: [{ collectionID: 'bayc', contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' }],
			options: {},
		})
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()['bayc'].chain).toEqual('rinkeby')
	})

	test('tokenNegotiatorClient duplicate collectionID is ignored', () => {
		const tokenNegotiatorClient = new Client({
			type: 'active',
			issuers: [
				{ collectionID: 'bayc', contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' },
				{ collectionID: 'bayc', contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'mainnet' },
			],
			options: {},
		})
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()['bayc'].chain).toEqual('rinkeby')
		expect(Object.keys(tokenNegotiatorClient.getTokenStore().getCurrentTokens()).length).toBe(1)
	})

	test('tokenNegotiatorClient on callback with event type tokens-selected ', () => {
		const mockCallback = jest.fn();
		const tokenNegotiatorClient = getOffChainConfigClient()
		const event = 'tokens-selected'
		tokenNegotiatorClient.on(event, mockCallback)
		tokenNegotiatorClient.eventSender(event, { selectedTokens: {} });
		expect(mockCallback).toHaveBeenCalled();
	})

	test('tokenNegotiatorClient on callback with event type tokens-loaded', () => {
		const mockCallback = jest.fn();
		const tokenNegotiatorClient = getOffChainConfigClient()
		const event = 'tokens-loaded'
		tokenNegotiatorClient.on(event, mockCallback);
		tokenNegotiatorClient.eventSender(event, null);
		expect(mockCallback).toHaveBeenCalled();
	})

	test('tokenNegotiatorClient on callback must have an event type', () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		expect(() => {
			tokenNegotiatorClient.on('')
		}).toThrow('Event type is not defined')
	})

	test('tokenNegotiatorClient method eventSender event hook functions', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		tokenNegotiatorClient.eventSender('emitAllTokensToClient', [])
		tokenNegotiatorClient.eventSender('emitSelectedTokensToClient', { selectedTokens: null })
		tokenNegotiatorClient.eventSender('emitProofToClient', { data: 'test', issuer: 'devcon', error: null })
		tokenNegotiatorClient.eventSender('emitNetworkChange', '0x1')
	})

	test('tokenNegotiatorClient method connectTokenIssuer with unknown issuer', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		return tokenNegotiatorClient.connectTokenIssuer('bayc').catch((err) => {
			expect(err).toEqual(new Error('Undefined token issuer'))
		})
	})

	test('tokenNegotiatorClient method updateSelectedTokens', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		tokenNegotiatorClient.updateSelectedTokens({ devcon: { a: 'true' } })
	})

	test('tokenNegotiatorClient method formatCollectionID collection with uppercase chars and spaces', async () => {
		const tokenNegotiatorClient = new Client({
			type: 'active',
			issuers: [{ collectionID: 'B a Y c', contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' }],
			options: {},
		})
		expect(!!tokenNegotiatorClient.getTokenStore().getCurrentTokens()['b-a-y-c']).toEqual(true)
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()['b-a-y-c'].chain).toEqual('rinkeby')
	})

	test('tokenNegotiatorClient method formatCollectionChain chain with uppercase chars', async () => {
		const tokenNegotiatorClient = new Client({
			type: 'active',
			issuers: [{ collectionID: 'bayc', contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'RINKEBY' }],
			options: {},
		})
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()['bayc'].chain).toEqual('rinkeby')
	})

	test('tokenNegotiatorClient method authenticate', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient()
		tokenNegotiatorClient.getTokenStore().setTokens('devcon', [{ devcon: { a: 'true', collectionId: 'devcon' } }])
		const authRequest = {
			unsignedToken: { a: 'true', collectionId: 'devcon' },
		}
		try {
			await tokenNegotiatorClient.authenticate(authRequest)
		} catch (err) {
			expect(err).toEqual(new Error('MetaMask is not available. Please check the extension is supported and active.'))
		}
	})

	test('tokenNegotiatorClient method showCancelAuthentication', async () => {
		document.body.innerHTML = `<div class="cancel-auth-btn"></div>`

		const tokenNegotiatorClient = getOffChainConfigClient()
		const spy = jest.spyOn(tokenNegotiatorClient, 'enableAuthCancel')
		tokenNegotiatorClient.enableAuthCancel('devcon')
		expect(spy).toHaveBeenCalledTimes(1)
	})

	test('tokenNegotiatorClient method formatCollectionChain chain with uppercase chars', async () => {
		const tokenNegotiatorClient = new Client({
			type: 'active',
			issuers: [{ collectionID: 'bayc', contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'RINKEBY' }],
			options: {},
		})
		expect(tokenNegotiatorClient.getNoTokenMsg('bayc')).toEqual('')
	})

	test('tokenNegotiatorClient method formatCollectionChain chain with uppercase chars', async () => {
		const tokenNegotiatorClient = new Client({
			type: 'active',
			issuers: [
				{
					noTokenMsg: 'please visit the bayc club to purchase a ticket',
					collectionID: 'bayc',
					contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09',
					chain: 'RINKEBY',
				},
			],
			options: {},
		})
		expect(tokenNegotiatorClient.getNoTokenMsg('bayc')).toEqual('please visit the bayc club to purchase a ticket')
	})

	test('tokenNegotiatorClient abstractAuth saveProof', async () => {
		let localStorageOriginal = localStorage
		Object.defineProperty(global, 'localStorage', { value: new LocalStorageMock() })

		const abstractAuth = new AbstractAuthentication()
		abstractAuth.TYPE = 'test'
		await abstractAuth.saveProof('tn-proof', { a: 1 })
		expect(localStorage.getItem('tn-proof')).toEqual(JSON.stringify({ 'test-tn-proof': { a: 1 } }))
		await abstractAuth.deleteProof('tn-proof')
		expect(localStorage.getItem('tn-proof')).toEqual(JSON.stringify({}))
		Object.defineProperty(global, 'localStorage', { value: localStorageOriginal })
	})

	test('tokenNegotiatorClient abstractAuth getSavedProof', () => {
		const abstractAuth = new AbstractAuthentication()
		jest.spyOn(abstractAuth, 'getSavedProof')
		expect(abstractAuth.getSavedProof('tn-proof')).toBe(null)
	})

	test('tokenNegotiatorClient abstractAuth getFullKey', () => {
		const abstractAuth = new AbstractAuthentication()
		abstractAuth.TYPE = 'address_attest'
		jest.spyOn(abstractAuth, 'getFullKey')
		expect(abstractAuth.getFullKey('TN-proof')).toBe('address_attest-tn-proof')
	})

	test('tokenNegotiatorClient abstractAuth deletePRoof', async () => {
		const abstractAuth = new AbstractAuthentication()
		expect(abstractAuth.getSavedProof('123')).toEqual(null)
		abstractAuth.saveProof('123', '222')
		expect(abstractAuth.getSavedProof('123')).toEqual('222')
		await abstractAuth.deleteProof('123')
		expect(abstractAuth.getSavedProof('123')).toEqual(null)
	})

	test('tokenNegotiatorClient ticketZKProof', async () => {
		const ticketZKProof = new TicketZKProof()
		const issuer = {
			collectionID: 'devcon',
			onChain: false,
			title: 'Devcon',
			image: 'https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg',
			tokenOrigin: 'http://localhost:3002/',
			attestationOrigin: 'https://attestation.id/',
			unEndPoint: 'https://crypto-verify.herokuapp.com/use-devcon-ticket',
			base64senderPublicKeys: {
				'6': 'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABGMxHraqggr2keTXszIcchTjYjH5WXpDaBOYgXva82mKcGnKgGRORXSmcjWN2suUCMkLQj3UNlZCFWF10wIrrlw=',
			},
			base64attestorPubKey:
				'MIIBMzCB7AYHKoZIzj0CATCB4AIBATAsBgcqhkjOPQEBAiEA/////////////////////////////////////v///C8wRAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBEEEeb5mfvncu6xVoGKVzocLBwKb/NstzijZWfKBWxb4F5hIOtp3JqPEZV2k+/wOEQio/Re0SKaFVBmcR9CP+xDUuAIhAP////////////////////66rtzmr0igO7/SXozQNkFBAgEBA0IABL+y43T1OJFScEep69/yTqpqnV/jzONz9Sp4TEHyAJ7IPN9+GHweCX1hT4OFxt152sBN3jJc1s0Ymzd8pNGZNoQ=',
		}
		const tokenNegotiatorClient = getOnChainConfigClient()

		const authRequest = {
			issuer: issuer,
			unsignedToken: { devcon: { a: 'true' } },
		}
		jest.spyOn(ticketZKProof, 'getTokenProof')
		ticketZKProof.client = tokenNegotiatorClient
		try {
			await ticketZKProof.getTokenProof(issuer, tokenNegotiatorClient, authRequest)
		} catch (err) {
			expect(err).toEqual(new Error('WALLET_REQUIRED'))
		}
	})

	test('when no redirect errors are found via handleRecievedRedirectMessages', async () => {
		const tokenNegotiatorClient = getOnChainConfigClient()
		const error = tokenNegotiatorClient.handleRecievedRedirectMessages()
		expect(error).toEqual(null)
	})

})
