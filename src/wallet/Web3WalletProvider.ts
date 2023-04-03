import { ethers } from 'ethers'
import { logger, strToHexStr, strToUtfBytes } from '../utils'
import { SafeConnectOptions } from './SafeConnectProvider'
import { Client } from '../client'
import { SupportedBlockchainsParam, WalletOptionsInterface, SignatureSupportedBlockchainsParamList } from '../client/interface'

interface WalletConnectionState {
	[index: string]: WalletConnection
}

export interface WalletConnection {
	address: string
	chainId: number | string
	providerType: string
	blockchain: SupportedBlockchainsParam
	provider?: ethers.providers.Web3Provider | any // solana(phantom) have different interface
	ethers?: any
}

export enum SupportedWalletProviders {
	MetaMask = 'MetaMask',
	WalletConnect = 'WalletConnect',
	WalletConnectV2 = 'WalletConnectV2',
	Torus = 'Torus',
	Phantom = 'Phantom',
	Flow = 'Flow',
	SafeConnect = 'SafeConnect',
}

export class Web3WalletProvider {
	private static LOCAL_STORAGE_KEY = 'tn-wallet-connections'

	connections: WalletConnectionState = {}

	constructor(private client: Client, private walletOptions?: WalletOptionsInterface, public safeConnectOptions?: SafeConnectOptions) {}

	saveConnections() {
		let savedConnections: WalletConnectionState = {}

		for (let address in this.connections) {
			let con = this.connections[address.toLowerCase()]

			savedConnections[address] = {
				address: con.address,
				chainId: con.chainId,
				providerType: con.providerType,
				blockchain: con.blockchain,
			}
		}

		localStorage.setItem(Web3WalletProvider.LOCAL_STORAGE_KEY, JSON.stringify(savedConnections))
	}

	emitSavedConnection(address: string): WalletConnection | null {
		if (Object.keys(this.connections).length && address) {
			this.client.eventSender('connected-wallet', this.connections[address.toLowerCase()])
			return this.connections[address.toLowerCase()]
		} else {
			return null
		}
	}

	emitNetworkChange(chainId: string) {
		if (chainId) {
			this.client.eventSender('network-change', chainId)

			return chainId
		}
	}

	async deleteConnections() {
		this.connections = {}

		let data = localStorage.getItem(Web3WalletProvider.LOCAL_STORAGE_KEY)
		if (data) {
			let state = JSON.parse(data)
			if (state) {
				for (let item in state) {
					let provider = state[item].providerType
					switch (provider) {
						case 'WalletConnect':
							{
								let walletConnectProvider = await import('./WalletConnectProvider')
								let walletConnect = await walletConnectProvider.getWalletConnectProviderInstance(true)
								if (walletConnect?.wc?._connected) {
									walletConnect
										.disconnect()
										.then(() => {
											// console.log('WalletConnect session disconnected');
										})
										.catch((error) => {
											console.error(error)
											// dirty way to remove session from local storage
											localStorage.removeItem('walletconnect')
										})
								}
							}
							break

						case 'WalletConnectV2':
							{
								let walletConnect2Provider = await import('./WalletConnectV2Provider')

								let universalWalletConnect = await walletConnect2Provider.getWalletConnectV2ProviderInstance()

								if (universalWalletConnect.session) {
									universalWalletConnect
										.disconnect()
										.then(() => {
											// console.log('WalletConnect2 session disconnected');
										})
										.catch((error) => {
											console.error(error)
											// dirty way to remove session from local storage
											localStorage.removeItem('wc@2:client:0.3//session')
										})
								}
							}
							break

						default:
					}
				}
			}
		}

		localStorage.removeItem(Web3WalletProvider.LOCAL_STORAGE_KEY)
		// remove session storage for the case of flow network
		sessionStorage.removeItem('CURRENT_USER')
	}

	async loadConnections() {
		let data = localStorage.getItem(Web3WalletProvider.LOCAL_STORAGE_KEY)

		if (!data) return

		let state = JSON.parse(data)

		if (!state) return

		for (let address in state) {
			let connection = state[address]

			try {
				await this.connectWith(connection.providerType, true)
			} catch (e) {
				console.log("Wallet couldn't connect: " + e.message)
				delete state[address]
				this.saveConnections()
				this.emitSavedConnection(address)
			}
		}
	}

	async connectWith(walletType: string, checkConnectionOnly = false) {
		if (!walletType) throw new Error('Please provide a Wallet type to connect with.')

		if (!this[walletType as keyof Web3WalletProvider]) throw new Error('Wallet type not found')

		// @ts-ignore
		let address = await this[walletType as keyof Web3WalletProvider](checkConnectionOnly)

		// if user rejected connect to account
		if (!address) throw new Error("Wallet didn't connect")

		this.saveConnections()
		this.emitSavedConnection(address)
		return address
	}

	// TODO: Implement signing for Solana & Flow wallets
	async signMessage(address: string, message: string) {
		let provider = this.getWalletProvider(address)
		let connection = this.getConnectionByAddress(address)

		if (connection.blockchain === 'evm') {
			let signer = provider.getSigner(address)
			return await signer.signMessage(message)
		} else if (connection.blockchain === 'solana') {
			const signedMessage = await provider.signMessage(strToUtfBytes(message), 'utf8')
			return signedMessage.signature.toString('hex')
		} else if (connection.blockchain === 'flow') {
			let signatureObj = await provider.currentUser.signUserMessage(strToHexStr(message))

			if (signatureObj.length > 0) {
				console.log(signatureObj[0].signature)
				return signatureObj[0].signature
			} else {
				throw new Error('No signature')
			}
		} else {
			throw new Error(`Blockchain "${connection.blockchain}" not supported`)
		}
	}

	getConnectionByAddress(address: string) {
		return this.connections[address.toLowerCase()]
	}

	getWalletProvider(address: string) {
		address = address.toLowerCase()

		let connection = this.getConnectionByAddress(address)

		if (!connection) throw new Error('Connection not found for address')
		if (!connection.provider) throw new Error('Wallet provider not found for address')

		return connection.provider
	}

	hasAnyConnection(blockchain: SupportedBlockchainsParam[]) {
		for (const i in this.connections) {
			if (blockchain.includes(this.connections[i].blockchain)) {
				return true
			}
		}

		return false
	}

	getConnectedWalletAddresses(blockchain: SupportedBlockchainsParam) {
		return this.getConnectedWalletData(blockchain).map((connection) => connection.address)
	}

	getConnectedWalletData(blockchain: SupportedBlockchainsParam) {
		return Object.values(this.connections).filter((connection) => connection.blockchain === blockchain)
	}

	getSingleSignatureCompatibleConnection(): WalletConnection | false {
		let connection: WalletConnection | false = false
		SignatureSupportedBlockchainsParamList.forEach((bc) => {
			let connections = Object.values(this.connections).filter((connection) => connection.blockchain === bc)
			if (connections.length) connection = connections[0]
		})
		return connection
	}

	registerNewWalletAddress(
		address: string,
		chainId: number | string,
		providerType: string,
		provider: any,
		blockchain: SupportedBlockchainsParam,
	) {
		// some blockchains, like solana, use addresses in base58
		// its case-sensitive, but chance to have collision
		// for single user almost zero
		this.connections[address.toLowerCase()] = { address, chainId, providerType, provider, blockchain, ethers }
		switch (blockchain) {
			case 'solana':
				provider.on('connect', (publicKey) => {
					let newAddress = publicKey.toBase58()
					logger(2, 'connected wallet: ', newAddress)
					this.registerNewWalletAddress(newAddress, 'mainnet-beta', 'phantom', window.solana, 'solana')
				})

				// Forget user's public key once they disconnect
				provider.on('disconnect', () => {
					logger(2, 'disconnected wallet.')
					delete this.connections[address.toLowerCase()]
					/**
					 * TODO do we need to disconnect all wallets?
					 * for now user cant connect to multiple wallets
					 * but do we need it for future?
					 */
					this.client.disconnectWallet()
				})

				provider.on('accountChanged', (publicKey) => {
					delete this.connections[address.toLowerCase()]
					if (publicKey) {
						// Set new public key and continue as usual
						logger(2, `Switched to account ${publicKey.toBase58()}`)
						this.registerNewWalletAddress(publicKey.toBase58(), 'mainnet-beta', 'phantom', window.solana, 'solana')
					} else {
						logger(2, 'Disconnected from wallet')
						delete this.connections[address.toLowerCase()]
						/**
						 * TODO do we need to disconnect all wallets?
						 * for now user cant connect to multiple wallets
						 * but do we need it for future?
						 */
						this.client.disconnectWallet()
					}
				})
				break
			case 'flow':
				provider.currentUser().subscribe((user) => {
					// TODO create multiple wallets and test wallet change
					logger(2, '=========Flow user subscription: ', user)
				})
				break
			case 'evm':
				// @ts-ignore
				provider.provider.on('accountsChanged', (accounts) => {
					logger(2, 'accountsChanged: ', accounts)
					if (!accounts || accounts.length === 0) {
						/**
						 * TODO do we need to disconnect all wallets?
						 * for now user cant connect to multiple wallets
						 * but do we need it for future?
						 */
						this.client.disconnectWallet()
						return
					}

					if (address === accounts[0]) return

					delete this.connections[address.toLowerCase()]

					address = accounts[0]

					this.registerNewWalletAddress(address, chainId, providerType, provider, 'evm')

					this.saveConnections()

					this.emitSavedConnection(address)

					this.client.getTokenStore().clearCachedTokens()
					this.client.enrichTokenLookupDataOnChainTokens()
				})

				// @ts-ignore
				provider.provider.on('chainChanged', (_chainId: any) => {
					this.registerNewWalletAddress(address, _chainId, providerType, provider, 'evm')

					this.saveConnections()

					this.emitNetworkChange(_chainId)
				})

				// @ts-ignore
				// walletconnect
				provider.provider.on('disconnect', (reason: any) => {
					if (reason?.message && reason.message.indexOf('MetaMask: Disconnected from chain') > -1) return
					/**
					 * TODO do we need to disconnect all wallets?
					 * for now user cant connect to multiple wallets
					 * but do we need it for future?
					 */
					this.client.disconnectWallet()
				})
				break
			default:
				logger(2, 'Unknown blockchain, dont attach listeners')
				return
		}
	}

	private async registerEvmProvider(provider: ethers.providers.Web3Provider, providerName: string) {
		const accounts = await provider.listAccounts()
		const chainId = (await provider.detectNetwork()).chainId

		if (accounts.length === 0) {
			throw new Error('No accounts found via wallet-connect.')
		}

		let curAccount = accounts[0]

		this.registerNewWalletAddress(curAccount, chainId, providerName, provider, 'evm')

		return curAccount
	}

	async MetaMask(checkConnectionOnly: boolean) {
		logger(2, 'connect MetaMask')

		if (typeof window.ethereum !== 'undefined') {
			await window.ethereum.enable() // fall back may be needed for FF to open Extension Prompt.

			const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

			return this.registerEvmProvider(provider, 'MetaMask')
		} else {
			throw new Error('MetaMask is not available. Please check the extension is supported and active.')
		}
	}

	async WalletConnect(checkConnectionOnly: boolean) {
		logger(2, 'connect Wallet Connect')

		const walletConnectProvider = await import('./WalletConnectProvider')

		const walletConnect = await walletConnectProvider.getWalletConnectProviderInstance(checkConnectionOnly)

		return new Promise((resolve, reject) => {
			if (checkConnectionOnly) {
				walletConnect.connector.on('display_uri', (err, payload) => {
					reject(new Error('Connection expired'))
				})
			}

			walletConnect
				.enable()
				.then(() => {
					const provider = new ethers.providers.Web3Provider(walletConnect, 'any')

					resolve(this.registerEvmProvider(provider, 'WalletConnect'))
				})
				.catch((e) => reject(e))
		})
	}

	async WalletConnectV2(checkConnectionOnly: boolean) {
		logger(2, 'connect Wallet Connect V2')

		const walletConnectProvider = await import('./WalletConnectV2Provider')

		const universalWalletConnect = await walletConnectProvider.getWalletConnectV2ProviderInstance()

		let QRCodeModal

		universalWalletConnect.on('display_uri', async (uri: string) => {
			QRCodeModal = (await import('@walletconnect/qrcode-modal')).default

			QRCodeModal.open(uri, () => {
				this.client.getUi().showError('User closed modal')
			})
		})

		// Subscribe to session delete
		universalWalletConnect.on('session_delete', ({ id, topic }: { id: number; topic: string }) => {
			// TODO: There is currently a bug in the universal provider that prevents this handler from being called.
			//  After this is fixed, this should handle the event correctly
			//  https://github.com/WalletConnect/walletconnect-monorepo/issues/1772
			this.client.disconnectWallet()
		})

		let preSavedWalletOptions = this.walletOptions

		return new Promise((resolve, reject) => {
			if (checkConnectionOnly && !universalWalletConnect.session) {
				reject('Not connected')
			} else {
				// let pairing

				let connect

				if (universalWalletConnect.session) {
					connect = universalWalletConnect.enable()
				} else {
					connect = universalWalletConnect.connect({
						namespaces: {
							eip155: {
								methods: ['eth_sendTransaction', 'eth_signTransaction', 'eth_sign', 'personal_sign', 'eth_signTypedData'],
								chains: preSavedWalletOptions?.walletConnectV2?.chains ?? walletConnectProvider.WC_V2_DEFAULT_CHAINS,
								events: ['chainChanged', 'accountsChanged'],
								rpcMap: preSavedWalletOptions?.walletConnectV2?.rpcMap ?? walletConnectProvider.WC_DEFAULT_RPC_MAP,
							},
						},
						// pairingTopic: pairing?.topic,
					})
				}

				connect
					.then(() => {
						logger(2, 'WC2 connected.....')
						// in case of enable() QRCodeModal undefined
						QRCodeModal?.close()
						const provider = new ethers.providers.Web3Provider(universalWalletConnect, 'any')
						resolve(this.registerEvmProvider(provider, 'WalletConnectV2'))
					})
					.catch((e) => {
						logger(2, 'WC2 connect error...', e)
						// in case of enable() QRCodeModal undefined
						QRCodeModal?.close()
						reject(e)
					})
			}
		})
	}

	async Torus(checkConnectionOnly: boolean) {
		const TorusProvider = await import('./TorusProvider')

		const torus = await TorusProvider.getTorusProviderInstance()

		await torus.init()

		await torus.login()

		const provider = new ethers.providers.Web3Provider(torus.provider, 'any')

		return this.registerEvmProvider(provider, 'Torus')
	}

	async Phantom(checkConnectionOnly: boolean) {
		logger(2, 'connect Phantom')

		if (typeof window.solana !== 'undefined') {
			const connection = await window.solana.connect()

			const accountAddress: string = connection.publicKey.toBase58()

			// mainnet-beta
			// TODO: Create registerSolanaProvider method to create event listeners (see registerEvmProvider)
			this.registerNewWalletAddress(accountAddress, 'mainnet-beta', 'phantom', window.solana, 'solana')
			return accountAddress
		} else {
			throw new Error('Phantom is not available. Please check the extension is supported and active.')
		}
	}

	async SafeConnect(checkConnectionOnly: boolean) {
		logger(2, 'connect SafeConnect')

		const provider = await this.getSafeConnectProvider()

		const address = await provider.initSafeConnect()

		this.registerNewWalletAddress(address, 1, 'SafeConnect', provider, 'evm')

		return address
	}

	async Flow(checkConnectionOnly: boolean) {
		const flowProvider = await import('./FlowProvider')
		const fcl = flowProvider.getFlowProvider()

		await fcl.currentUser.authenticate()
		let currentUser = await fcl.currentUser.snapshot()

		// No user address after authenticate() then connect was unsuccesfull
		if (!currentUser.addr) throw new Error('Failed to connect Flow wallet')

		// TODO set chainID
		// TODO: Create registerFlowProvider method to create event listeners (see registerEvmProvider)
		this.registerNewWalletAddress(currentUser.addr, 1, 'flow', fcl, 'flow')

		return currentUser.addr
	}

	safeConnectAvailable() {
		return this.safeConnectOptions !== undefined
	}

	async getSafeConnectProvider() {
		const { SafeConnectProvider } = await import('./SafeConnectProvider')

		return new SafeConnectProvider(this.client.getUi(), this.safeConnectOptions)
	}
}

export default Web3WalletProvider
