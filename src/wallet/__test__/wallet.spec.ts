/* eslint-disable no-mixed-spaces-and-tabs */
import { Client } from '../../client/index'
import { SafeConnectOptions, SafeConnectProvider } from '../SafeConnectProvider'
import { Web3WalletProvider } from '../Web3WalletProvider'

let tokenNegotiatorClient = new Client({
	type: 'active',
	issuers: [
		{
			collectionID: 'rinkeby-punk',
			onChain: true,
			contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
			chain: 'rinkeby',
			openSeaSlug: 'rinkeby-punk',
		},
		{
			collectionID: 'expansion-punk',
			onChain: true,
			contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37',
			chain: 'eth',
		},
		{
			collectionID: 'women-tribe',
			onChain: true,
			contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
			chain: 'rinkeby',
			openSeaSlug: 'stl-rnd-women-tribe-nfts',
		},
	],
})

let safeConnectOptions: SafeConnectOptions = {
	url: 'https://safeconnect.tokenscript.org',
	initialProof: 'address_attest',
}

describe('wallet spec', () => {
	let web3WalletProvider: Web3WalletProvider
	let safeConnectProvider: SafeConnectProvider

	test('web3WalletProvider a new instance', () => {
		web3WalletProvider = new Web3WalletProvider(tokenNegotiatorClient, safeConnectOptions)
		expect(web3WalletProvider).toBeDefined()
	})

	test('web3WalletProvider method connectWith - wallet type not found', async () => {
		try {
			await web3WalletProvider.connectWith('abc')
		} catch (err) {
			expect(err).toEqual(new Error('Wallet type not found'))
		}
	})

	test('web3WalletProvider method signWith', async () => {
		try {
			await web3WalletProvider.connectWith('abc')
		} catch (err) {
			expect(err).toEqual(new Error('Wallet type not found'))
		}
	})

	test('web3WalletProvider emit saved connection to return null where no connections are configured', async () => {
		const savedConnection = web3WalletProvider.emitSavedConnection('0x1263b90F4e1DFe89A8f9E623FF57adb252851fC3')
		expect(savedConnection).toEqual(null)
	})

	test('web3WalletProvider emit saved connection with data', async () => {
		const walletConnectProvider = await import('../WalletConnectProvider')
		const walletConnect = await walletConnectProvider.getWalletConnectProviderInstance()
		web3WalletProvider.registerNewWalletAddress(
			'0x1263b90F4e1DFe89A8f9E623FF57adb252851fC3'.toLocaleLowerCase(),
			'1',
			'MetaMask',
			walletConnect,
		)
		web3WalletProvider.emitSavedConnection('0x1263b90F4e1DFe89A8f9E623FF57adb252851fC3')
	})

	test('web3WalletProvider emit Network Change with data', async () => {
		const walletConnectProvider = await import('../WalletConnectProvider')
		const walletConnect = await walletConnectProvider.getWalletConnectProviderInstance()
		web3WalletProvider.registerNewWalletAddress(
			'0x1263b90F4e1DFe89A8f9E623FF57adb252851fC3'.toLocaleLowerCase(),
			'1',
			'MetaMask',
			walletConnect,
		)
		expect(web3WalletProvider.emitNetworkChange('0x2')).toBe('0x2')
	})

	test('web3WalletProvider method registerNewWalletAddress and getConnectedWalletData', async () => {
		const walletConnectProvider = await import('../WalletConnectProvider')
		const walletConnect = await walletConnectProvider.getWalletConnectProviderInstance()
		expect(web3WalletProvider.registerNewWalletAddress('0x123', '1', 'MetaMask', walletConnect)).toEqual('0x123')
		const TorusProvider = await import('../TorusProvider')
		const torus = await TorusProvider.getTorusProviderInstance()
		expect(web3WalletProvider.registerNewWalletAddress('0x12345', '1', 'phantom', torus.provider)).toEqual('0x12345')
		expect(web3WalletProvider.getConnectedWalletData()).toBeDefined()
	})

	test('web3WalletProvider method connectWith - MetaMask', async () => {
		try {
			await web3WalletProvider.connectWith('MetaMask')
		} catch (err) {
			expect(err).toEqual(new Error('MetaMask is not available. Please check the extension is supported and active.'))
		}
	})

	test('web3WalletProvider method SafeConnectAvailable', () => {
		expect(web3WalletProvider.safeConnectAvailable()).toEqual(true)
	})

	test('web3WalletProvider method getSafeConnectProvider', async () => {
		safeConnectProvider = await web3WalletProvider.getSafeConnectProvider()
		expect(safeConnectProvider).toBeDefined()
	})
})
