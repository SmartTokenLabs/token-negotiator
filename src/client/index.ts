import { OutletAction, OutletResponseAction, Messaging } from './messaging'
import { Ui, UiInterface, UItheme } from './ui'
import { logger, requiredParams, waitForElementToExist, errorHandler, removeUrlSearchParams } from '../utils'
import { getNftCollection, getNftTokens } from '../utils/token/nftProvider'
import { TokenStore } from './tokenStore'
import {
	OffChainTokenConfig,
	OnChainTokenConfig,
	AuthenticateInterface,
	NegotiationInterface,
	TokenNegotiatorEvents,
	EventSenderTokenProof,
	EventSenderTokensSelected,
	EventSenderConnectedWallet,
	EventSenderDisconnectedWallet,
	EventSenderError,
	EventSenderViewChanged,
	OnChainIssuer,
	EventSenderViewLoaded,
	EventSenderOpenedOverlay,
	EventSenderClosedOverlay,
	EventSenderTokensRefreshed,
	EventSenderTokensLoaded,
} from './interface'
import { AuthenticationMethod } from './auth/abstractAuthentication'
import { isUserAgentSupported, validateBlockchain } from '../utils/support/isSupported'
import type Web3WalletProvider from '../wallet/Web3WalletProvider'
import { OutletInterface } from '../outlet'
import { shouldUseRedirectMode } from '../utils/support/getBrowserData'
import { VERSION } from '../version'
import { getFungibleTokenBalances, getFungibleTokensMeta } from '../utils/token/fungibleTokenProvider'
import { URLNS } from '../core/messaging'

if (typeof window !== 'undefined') window.tn = { VERSION }

interface EventSenderTokens {
	data: any[]
}

declare global {
	interface Window {
		tokenToggleSelection: any
		ethereum: any
		solana: any
		tn: unknown
	}
}

const NOT_SUPPORTED_ERROR = 'This browser is not supported. Please try using Chrome, Edge, FireFox or Safari.'

export const defaultConfig: NegotiationInterface = {
	type: 'active',
	issuers: [],
	uiOptions: {
		uiType: 'popup',
		containerElement: '.overlay-tn',
		openingHeading: 'Validate your token ownership for access',
		issuerHeading: 'Detected tokens',
		autoPopup: true,
		position: 'bottom-right',
		alwaysShowStartScreen: false,
	},
	autoLoadTokens: true,
	autoEnableTokens: true,
	messagingForceTab: false,
	tokenPersistenceTTL: 600,
	unSupportedUserAgent: {
		authentication: {
			config: {},
			errorMessage: NOT_SUPPORTED_ERROR,
		},
		full: {
			config: {
				iE: true,
				iE9: true,
			},
			errorMessage: NOT_SUPPORTED_ERROR,
		},
	},
}

export const enum UIUpdateEventType {
	ISSUERS_LOADING,
	ISSUERS_LOADED,
	WALLET_DISCONNECTED,
}

export enum ClientError {
	POPUP_BLOCKED = 'POPUP_BLOCKED',
	USER_ABORT = 'USER_ABORT',
}

export enum ClientErrorMessage {
	POPUP_BLOCKED = 'Please add an exception to your popup blocker before continuing.',
	USER_ABORT = 'The user aborted the process.',
}

export class Client {
	public issuersLoaded: boolean
	public config: NegotiationInterface
	private web3WalletProvider: Web3WalletProvider
	private messaging: Messaging
	protected ui: UiInterface
	private clientCallBackEvents: {} = {}
	protected tokenStore: TokenStore
	private uiUpdateCallbacks: { [type in UIUpdateEventType] } = {
		[UIUpdateEventType.ISSUERS_LOADING]: undefined,
		[UIUpdateEventType.ISSUERS_LOADED]: undefined,
		[UIUpdateEventType.WALLET_DISCONNECTED]: undefined,
	}

	private urlParams: URLSearchParams

	/* static getKey(file: string) {
		return Authenticator.decodePublicKey(file)
	}*/

	constructor(config: NegotiationInterface) {
		if (window.location.hash) {
			this.urlParams = new URLSearchParams(window.location.hash.substring(1))
			let action = this.getDataFromQuery('action')
			logger(2, `Client() fired. Action = "${action}"`)
			this.removeCallbackParamsFromUrl()
		} else {
			this.urlParams = new URLSearchParams()
		}

		this.config = this.mergeConfig(defaultConfig, config)

		this.tokenStore = new TokenStore(this.config.autoEnableTokens, this.config.tokenPersistenceTTL)
		if (this.config.issuers?.length > 0) this.tokenStore.updateIssuers(this.config.issuers)

		this.messaging = new Messaging()
		this.registerOutletProofEventListener()
	}

	getDataFromQuery(itemKey: any): string {
		return this.urlParams ? this.urlParams.get(URLNS + itemKey) : ''
	}

	public readProofCallback() {
		if (!this.getDataFromQuery) return false

		let action = this.getDataFromQuery('action')

		if (action !== 'proof-callback') return false

		const issuer = this.getDataFromQuery('issuer')
		const attest = this.getDataFromQuery('attestation')
		const error = this.getDataFromQuery('error')

		this.emitRedirectProofEvent(issuer, attest, error)
	}

	private removeCallbackParamsFromUrl() {
		let params = new URLSearchParams(document.location.hash.substring(1))

		params = removeUrlSearchParams(params)

		document.location.hash = '#' + params.toString()
	}

	private registerOutletProofEventListener() {
		window.addEventListener('auth-callback', (e: CustomEvent) => {
			this.emitRedirectProofEvent(e.detail.issuer, e.detail.proof, e.detail.error)
		})
	}

	private emitRedirectProofEvent(issuer: string, proof?: string, error?: string) {
		// Wait to ensure UI is initialized
		setTimeout(() => {
			if (error) {
				this.handleProofError(new Error(error), issuer)
			} else {
				this.eventSender('token-proof', {
					issuer,
					error: null,
					data: { proof },
				})
			}
		}, 500)
	}

	private mergeConfig(defaultConfig: NegotiationInterface, config: NegotiationInterface) {
		for (let key in config) {
			if (config[key] && config[key].constructor === Object) {
				defaultConfig[key] = this.mergeConfig(defaultConfig[key] ?? {}, config[key])
			} else {
				defaultConfig[key] = config[key]
			}
		}

		// Check if blockchain is supported one
		// TODO: Put in separate method - issuers can also be specified via negotiate()
		if (defaultConfig.issuers?.length) {
			for (const issuer of defaultConfig.issuers) {
				if (issuer.onChain === true) {
					validateBlockchain(issuer.blockchain ?? '')
				}
			}
		}
		return defaultConfig
	}

	getTokenStore() {
		return this.tokenStore
	}

	getUi() {
		return this.ui
	}

	createUiInstance() {
		this.ui = new Ui(this.config.uiOptions, this)
	}

	triggerUiUpdateCallback(type: UIUpdateEventType, data?: {}) {
		if (this.uiUpdateCallbacks[type]) this.uiUpdateCallbacks[type](data)
	}

	public registerUiUpdateCallback(type: UIUpdateEventType, callback: Function) {
		this.uiUpdateCallbacks[type] = callback
	}

	public safeConnectAvailable() {
		return this.config.safeConnectOptions !== undefined
	}

	// TODO: Move to token store OR select-wallet view - this method is very similar to getCurrentBlockchains()
	public hasIssuerForBlockchain(blockchain: 'evm' | 'solana' | 'flow') {
		return (
			this.config.issuers.filter((issuer: OnChainTokenConfig) => {
				if (blockchain === 'evm' && !issuer.onChain) return true
				if (blockchain === 'solana' && typeof window.solana === 'undefined') return false

				return (issuer.blockchain ? issuer.blockchain.toLowerCase() : 'evm') === blockchain
			}).length > 0
		)
	}

	public experimentalFeaturesEnabled(feature: string) {
		return this.config.experimentalFeatures && this.config.experimentalFeatures.indexOf(feature) > -1
	}

	public async getWalletProvider() {
		if (!this.web3WalletProvider) {
			const { Web3WalletProvider } = await import('./../wallet/Web3WalletProvider')
			this.web3WalletProvider = new Web3WalletProvider(this, this.config.walletOptions, this.config.safeConnectOptions)
		}

		return this.web3WalletProvider
	}

	public async disconnectWallet() {
		try {
			let wp = await this.getWalletProvider()
			await wp.deleteConnections()
			this.tokenStore.clearCachedTokens()
			this.eventSender('connected-wallet', null)
			this.eventSender('disconnected-wallet', null)
			this.triggerUiUpdateCallback(UIUpdateEventType.WALLET_DISCONNECTED)
		} catch (e) {
			logger(2, 'Failed to disconnect wallet', e)
		}
	}

	async negotiatorConnectToWallet(walletType: string) {
		let walletProvider = await this.getWalletProvider()
		return await walletProvider.connectWith(walletType)
	}

	async enrichTokenLookupDataOnChainTokens() {
		if (!this.getTokenStore().hasOnChainTokens()) {
			this.issuersLoaded = true
			return
		}

		this.issuersLoaded = false
		this.triggerUiUpdateCallback(UIUpdateEventType.ISSUERS_LOADING)

		let issuers = this.tokenStore.getCurrentIssuers(true)

		for (let issuer in issuers) {
			let tokenData = issuers[issuer] as OnChainIssuer

			// Issuer contract data already loaded
			if (tokenData.title) continue

			try {
				let lookupData

				if (tokenData.fungible) {
					lookupData = await getFungibleTokensMeta(tokenData)
				} else {
					lookupData = await getNftCollection(tokenData)
				}

				if (lookupData) {
					// TODO: this might be redundant
					lookupData.onChain = true

					if (!lookupData.title) lookupData.title = tokenData.collectionID

					// enrich the tokenLookup store with contract meta data
					this.tokenStore.updateTokenLookupStore(issuer, lookupData)
				}
			} catch (e) {
				logger(2, 'Failed to load contract data for ' + issuer + ': ' + e.message)
			}
		}

		this.issuersLoaded = true
		this.triggerUiUpdateCallback(UIUpdateEventType.ISSUERS_LOADED)
	}

	public async checkUserAgentSupport(type: string) {
		if (!isUserAgentSupported(this.config.unSupportedUserAgent?.[type]?.config)) {
			// TODO do we check browser support in passive mode? looks like we just save "errorMessage"
			let err = this.config.unSupportedUserAgent[type].errorMessage

			if (this.activeNegotiateRequired()) {
				this.createUiInstance()
				await this.ui.initialize()
				this.ui.openOverlay()
				this.ui.showError(err, false)
				this.ui.viewContainer.style.display = 'none'
			}

			// TODO what the sense of this handler?
			errorHandler(err, 'error', null, null, true, true)
		}
	}

	private activeNegotiateRequired(): boolean {
		return this.config.type === 'active'
	}

	public getNoTokenMsg(collectionID: string) {
		const store = this.getTokenStore().getCurrentIssuers()
		const collectionNoTokenMsg = store[collectionID]?.noTokenMsg
		return collectionNoTokenMsg ? collectionNoTokenMsg : ''
	}

	async negotiate(issuers?: (OnChainTokenConfig | OffChainTokenConfig)[], openPopup = false, refreshTokens = false) {
		let currentIssuer = this.getOutletConfigForCurrentOrigin()

		if (currentIssuer) {
			logger(2, 'Sync Outlet fired in Client to read MagicLink before negotiate().')
			let outlet = new (await import('../outlet/localOutlet')).LocalOutlet(currentIssuer)
			await outlet.readMagicLink()
			outlet = null
		}

		await this.checkUserAgentSupport('full')
		if (issuers) {
			this.config.issuers = issuers
			this.tokenStore.updateIssuers(issuers)
		}

		requiredParams(Object.keys(this.tokenStore.getCurrentIssuers()).length, 'issuers are missing.')

		if (this.activeNegotiateRequired()) {
			this.issuersLoaded = !this.tokenStore.hasUnloadedIssuers()

			await this.activeNegotiationStrategy(openPopup)
		} else {
			await this.enrichTokenLookupDataOnChainTokens()

			if (refreshTokens) this.getTokenStore().clearCachedTokens()

			await this.passiveNegotiationStrategy()
		}

		this.eventSender('loaded', null)
	}

	async activeNegotiationStrategy(openPopup: boolean) {
		let autoOpenPopup

		if (this.ui) {
			autoOpenPopup = this.tokenStore.hasUnloadedTokens()

			if (this.ui.viewIsNotStart() && this.tokenStore.hasUnloadedIssuers()) {
				await this.enrichTokenLookupDataOnChainTokens()
			} else {
				this.triggerUiUpdateCallback(UIUpdateEventType.ISSUERS_LOADED)
			}
		} else {
			this.createUiInstance()
			await this.ui.initialize()
			autoOpenPopup = true
		}

		if (this.config.autoEnableTokens && Object.keys(this.tokenStore.getSelectedTokens()).length)
			this.eventSender('tokens-selected', {
				selectedTokens: this.tokenStore.getSelectedTokens(),
			})

		if (openPopup || (this.config.uiOptions.autoPopup === true && autoOpenPopup)) this.ui.openOverlay()
	}

	private cancelAutoload = true

	async tokenAutoLoad(onLoading: (issuer: string) => void, onComplete: (issuer: string, tokens: any[]) => void, refresh: boolean) {
		if (this.config.autoLoadTokens === false) return

		this.cancelAutoload = false

		let count = 1

		for (let issuerKey in this.tokenStore.getCurrentIssuers()) {
			let tokens = this.tokenStore.getIssuerTokens(issuerKey)

			if (!refresh && tokens != null) continue

			onLoading(issuerKey)

			try {
				let tokens = await this.connectTokenIssuer(issuerKey)

				if (!tokens) return // Site is redirecting

				onComplete(issuerKey, tokens)
			} catch (e) {
				e.message = 'Failed to load ' + issuerKey + ': ' + e.message
				logger(2, e.message)
				errorHandler('autoload tokens error', 'error', () => this.eventSender('error', { issuer: issuerKey, error: e }), null, true, false)
				onComplete(issuerKey, null)
			}

			count++

			if (refresh) continue

			if (this.cancelAutoload || (this.config.autoLoadTokens !== true && count > this.config.autoLoadTokens)) break
		}

		this.eventSender('tokens-loaded', { loadedCollections: Object.keys(this.tokenStore.getCurrentIssuers()).length })
	}

	cancelTokenAutoload() {
		this.cancelAutoload = true
	}

	async setPassiveNegotiationWebTokens(): Promise<void> {
		let issuers = this.tokenStore.getCurrentIssuers(false)

		let action = this.getDataFromQuery('action')

		for (let issuer in issuers) {
			let tokens

			const issuerConfig = this.tokenStore.getCurrentIssuers()[issuer] as OffChainTokenConfig

			try {
				if (new URL(issuerConfig.tokenOrigin).origin === document.location.origin) {
					tokens = await this.loadLocalOutletTokens(issuerConfig)
				} else {
					let responseIssuer = this.getDataFromQuery('issuer')

					if ((action === OutletAction.GET_ISSUER_TOKENS + '-response' || action === 'proof-callback') && issuer === responseIssuer) {
						let responseTokensEncoded = this.getDataFromQuery('tokens')
						try {
							tokens = JSON.parse(responseTokensEncoded)
						} catch (e) {
							logger(2, 'Error parse tokens from Response. ', e)
						}
					} else {
						tokens = this.tokenStore.getIssuerTokens(issuer)

						if (tokens !== null) continue

						tokens = await this.loadRemoteOutletTokens(issuerConfig)

						if (!tokens) return // Site is redirecting
					}
				}
			} catch (error) {
				errorHandler('popup error', 'error', () => this.eventSender('error', { issuer, error }), null, true, false)
				continue
			}

			logger(2, 'tokens:')
			logger(2, tokens)

			this.tokenStore.setTokens(issuer, tokens)
		}
	}

	readTokensFromUrl() {
		let issuers = this.tokenStore.getCurrentIssuers(false)

		let action = this.getDataFromQuery('action')

		if (action === 'error') {
			return this.handleRedirectTokensError()
				.then()
				.catch((e) => logger(2, 'Error handle redirect tokens error. ', e))
		}

		if (action !== OutletAction.GET_ISSUER_TOKENS + '-response') return

		let issuer = this.getDataFromQuery('issuer')

		if (!issuer) {
			logger(3, 'No issuer in URL.')
			return
		}

		const issuerConfig = issuers[issuer] as OffChainTokenConfig
		if (!issuerConfig) {
			logger(3, `No issuer config for "${issuer}" in URL.`)
			return
		}

		let tokens

		try {
			if (new URL(issuerConfig.tokenOrigin).origin !== document.location.origin) {
				// TODO make solution:
				// in case if we have multiple tokens then redirect flow will not work
				// because page will reload on first remote token

				let resposeTokensEncoded = this.getDataFromQuery('tokens')
				try {
					tokens = JSON.parse(resposeTokensEncoded)
				} catch (e) {
					logger(2, 'Error parse tokens from Response. ', e)
				}
			}
		} catch (err) {
			logger(1, 'Error read tokens from URL')
			return
		}

		if (!tokens) {
			logger(2, `No tokens for "${issuer}" in URL.`)
			return
		}

		logger(2, 'readTokensFromUrl tokens:')
		logger(2, tokens)

		this.tokenStore.setTokens(issuer, tokens)
	}

	private async handleRedirectTokensError() {
		const error = this.getDataFromQuery('error')

		if (this.config.type === 'active') {
			this.createUiInstance()
			await this.ui.initialize()
			this.ui.showError(error)
		}

		this.eventSender('error', {
			issuer: this.getDataFromQuery('issuer'),
			error: new Error(error),
		})
	}

	async setPassiveNegotiationOnChainTokens() {
		let issuers = this.tokenStore.getCurrentIssuers(true)

		for (let issuerKey in issuers) {
			let tokens = this.tokenStore.getIssuerTokens(issuerKey)

			if (tokens !== null) continue

			let issuer = issuers[issuerKey] as OnChainIssuer

			try {
				const tokens = await this.loadOnChainTokens(issuer)

				this.tokenStore.setTokens(issuerKey, tokens)
			} catch (err) {
				logger(2, err)
				errorHandler(
					'passive loading of tokens error',
					'error',
					() => this.eventSender('error', { issuer: issuerKey, error: err }),
					null,
					true,
					false,
				)
			}
		}
	}

	async passiveNegotiationStrategy() {
		await this.setPassiveNegotiationWebTokens()

		await this.setPassiveNegotiationOnChainTokens()

		let tokens: any = this.tokenStore.getCurrentTokens()

		logger(2, 'Emit tokens')
		logger(2, tokens)

		for (let issuer in tokens) {
			tokens[issuer] = { tokens: tokens[issuer] }
		}

		this.eventSender('tokens', tokens)
		this.eventSender('tokens-loaded', { loadedCollections: Object.keys(tokens).length })

		// Feature not supported when an end users third party cookies are disabled
		// because the use of a tab requires a user gesture.
		if (this.messaging.core.iframeStorageSupport === false && Object.keys(this.tokenStore.getCurrentTokens(false)).length === 0)
			logger(
				2,
				'iFrame storage support not detected: Enable popups via your browser to access off-chain tokens with this negotiation type.',
			)
	}

	async connectTokenIssuer(issuer: string): Promise<unknown[] | void> {
		const config = this.tokenStore.getCurrentIssuers()[issuer]
		if (!config) errorHandler('Undefined token issuer', 'error', null, null, true, true)

		let tokens

		if (config.onChain === true) {
			tokens = await this.loadOnChainTokens(config)
		} else {
			if (new URL(config.tokenOrigin).origin === document.location.origin) {
				tokens = await this.loadLocalOutletTokens(config)
			} else {
				tokens = await this.loadRemoteOutletTokens(config)

				if (!tokens) return // Site is redirecting
			}
		}

		this.tokenStore.setTokens(issuer, tokens)

		if (this.config.autoEnableTokens) {
			this.eventSender('tokens-selected', {
				selectedTokens: this.tokenStore.getSelectedTokens(),
			})
		}

		return tokens
	}

	private async loadOnChainTokens(issuer: OnChainIssuer): Promise<any[]> {
		let walletProvider = await this.getWalletProvider()

		// TODO: Collect tokens from all addresses for this blockchain
		const walletAddress = walletProvider.getConnectedWalletAddresses(issuer.blockchain)?.[0]

		requiredParams(walletAddress, 'wallet address is missing.')

		// TODO: Allow API to return tokens for multiple addresses
		let tokens

		if (issuer.fungible) {
			tokens = await getFungibleTokenBalances(issuer, walletAddress)
		} else {
			tokens = await getNftTokens(issuer, walletAddress)
		}

		tokens.map((token) => {
			token.walletAddress = walletAddress
			return token
		})

		return tokens
	}

	private async loadRemoteOutletTokens(issuer: OffChainTokenConfig): Promise<unknown[] | void> {
		const data: {
			issuer: OffChainTokenConfig
			filter?: {}
			access?: string
		} = {
			issuer: issuer,
			filter: issuer.filters,
		}

		if (issuer.accessRequestType) data.access = issuer.accessRequestType

		const redirectRequired = shouldUseRedirectMode(this.config.offChainRedirectMode)

		if (redirectRequired) this.tokenStore.setTokens(issuer.collectionID, [])

		const res = await this.messaging.sendMessage(
			{
				action: OutletAction.GET_ISSUER_TOKENS,
				origin: issuer.tokenOrigin,
				data: data,
			},
			this.config.messagingForceTab,
			this.config.type === 'active' ? this.ui : null,
			redirectRequired ? document.location.href : false,
		)

		if (!res) return // Site is redirecting

		return res.data?.tokens ?? []
	}

	private async loadLocalOutletTokens(issuer: OffChainTokenConfig) {
		const localOutlet = new (await import('../outlet/localOutlet')).LocalOutlet(issuer as OutletInterface & OffChainTokenConfig)
		return localOutlet.getTokens()
	}

	updateSelectedTokens(selectedTokens) {
		this.tokenStore.setSelectedTokens(selectedTokens)
		this.eventSender('tokens-selected', { selectedTokens })
	}

	async authenticate(authRequest: AuthenticateInterface) {
		await this.checkUserAgentSupport('authentication')

		const { issuer, unsignedToken } = authRequest

		requiredParams(issuer && unsignedToken, 'Issuer and unsigned token required.')

		if (unsignedToken.signedToken) {
			delete unsignedToken.signedToken
		}

		const config = this.tokenStore.getCurrentIssuers()[issuer]

		if (!config) errorHandler('Provided issuer was not found.', 'error', null, null, true, true)

		// TODO: How to handle error display in passive negotiation? Use optional UI or emit errors to listener?

		if (this.ui) {
			this.ui.showLoaderDelayed(
				[
					'<h4>Authenticating...</h4>',
					'<small>You may need to sign a new challenge in your wallet</small>',
					"<button class='cancel-auth-btn btn-tn' aria-label='Cancel authentication'>Cancel</button>",
				],
				600,
				true,
			)
			this.enableAuthCancel(issuer)
		}

		let AuthType

		if (authRequest.type) {
			AuthType = authRequest.type
		} else {
			AuthType = config.onChain
				? (await import('./auth/signedUNChallenge')).SignedUNChallenge
				: (await import('./auth/ticketZKProof')).TicketZKProof
		}

		let authenticator: AuthenticationMethod = new AuthType(this)

		let res

		try {
			if (!authRequest.options) authRequest.options = {}

			authRequest.options.messagingForceTab = this.config.messagingForceTab

			logger(2, 'authRequest', authRequest)
			logger(2, 'get proof at ', window.location.href)

			res = await authenticator.getTokenProof(config, [authRequest.unsignedToken], authRequest)

			if (!res) return // Site is redirecting

			logger(2, 'proof received at ', window.location.href)

			logger(2, 'Ticket proof successfully validated.')

			this.eventSender('token-proof', { data: res.data, error: null, issuer })
		} catch (err) {
			logger(2, err)

			if (err.message === 'WALLET_REQUIRED') {
				return this.handleWalletRequired(authRequest)
			}

			errorHandler(err, 'error', () => this.handleProofError(err, issuer), null, false, true)
		}

		if (this.ui) {
			this.ui.dismissLoader()
			this.ui.closeOverlay()
		}

		return res.data
	}

	public enableAuthCancel(issuer): void {
		waitForElementToExist('.cancel-auth-btn')
			.then((cancelAuthButton: HTMLElement) => {
				cancelAuthButton.onclick = () => {
					const err = 'User cancelled authentication'
					this.ui.showError(err)
					this.eventSender('token-proof', { issuer, error: err, data: null })
				}
			})
			.catch((err) => {
				logger(2, err)
			})
	}

	private async handleWalletRequired(authRequest) {
		if (this.ui) {
			this.ui.dismissLoader()
			this.ui.openOverlay()
		} else {
			// TODO: Show wallet selection modal for passive mode or emit event instead of connecting metamask automatically
			let walletProvider = await this.getWalletProvider()
			await walletProvider.connectWith('MetaMask')
			return this.authenticate(authRequest)
		}

		return new Promise((resolve, reject) => {
			const opt = { viewTransition: 'slide-in-right' }
			this.ui.updateUI(
				'wallet',
				{
					viewName: 'wallet',
					connectCallback: async () => {
						this.ui.updateUI('main', { viewName: 'main' }, opt)
						try {
							let res = await this.authenticate(authRequest)
							resolve(res)
						} catch (e) {
							reject(e)
						}
					},
				},
				opt,
			)
		})
	}

	private handleProofError(err, issuer) {
		if (this.ui) this.ui.showError(err)
		this.eventSender('token-proof', { issuer, error: err, data: null })
	}

	async eventSender(eventName: 'loaded', data: EventSenderViewLoaded)
	async eventSender(eventName: 'tokens-refreshed', data: EventSenderTokensRefreshed)
	async eventSender(eventName: 'closed-overlay', data: EventSenderClosedOverlay)
	async eventSender(eventName: 'opened-overlay', data: EventSenderOpenedOverlay)
	async eventSender(eventName: 'view-changed', data: EventSenderViewChanged)
	async eventSender(eventName: 'tokens', data: EventSenderTokens)
	async eventSender(eventName: 'token-proof', data: EventSenderTokenProof)
	async eventSender(eventName: 'tokens-selected', data: EventSenderTokensSelected)
	async eventSender(eventName: 'tokens-loaded', data: EventSenderTokensLoaded)
	async eventSender(eventName: 'connected-wallet', data: EventSenderConnectedWallet)
	async eventSender(eventName: 'disconnected-wallet', data: EventSenderDisconnectedWallet)
	async eventSender(eventName: 'network-change', data: string)
	async eventSender(eventName: 'error', data: EventSenderError)

	async eventSender(eventName: TokenNegotiatorEvents, data: any) {
		await Promise.resolve(this.on(eventName, null, data))
	}

	getOutletConfigForCurrentOrigin(origin: string = document.location.origin) {
		let allIssuers = this.tokenStore.getCurrentIssuers(false)
		let currentIssuers = []

		Object.keys(allIssuers).forEach((key) => {
			let issuerConfig = allIssuers[key] as OffChainTokenConfig

			try {
				if (new URL(issuerConfig.tokenOrigin).origin === origin) {
					currentIssuers.push(issuerConfig)
				}
			} catch (err) {
				logger(2, err)
			}
		})

		if (currentIssuers.length) {
			return currentIssuers[0]
		}
		return false
	}

	onlySameOrigin() {
		let allIssuers = this.tokenStore.getCurrentIssuers(false)
		let onlySameOriginFlag = true

		Object.keys(allIssuers).forEach((key) => {
			let issuerConfig = allIssuers[key] as OffChainTokenConfig
			let thisOneSameOrigin = false
			try {
				if (new URL(issuerConfig.tokenOrigin).origin === document.location.origin) {
					thisOneSameOrigin = true
				}
			} catch (err) {
				logger(2, err)
			}

			if (!thisOneSameOrigin) {
				onlySameOriginFlag = false
			}
		})

		return onlySameOriginFlag
	}

	async addTokenViaMagicLink(magicLink: any) {
		let url = new URL(magicLink)
		let params = url.hash.length > 1 ? url.hash.substring(1) : url.search.substring(1)

		const redirectRequired = shouldUseRedirectMode(this.config.offChainRedirectMode)

		try {
			let res = await this.messaging.sendMessage(
				{
					action: OutletAction.MAGIC_URL,
					origin: url.origin + url.pathname,
					data: {
						urlParams: params,
					},
				},
				this.config.messagingForceTab,
				undefined,
				redirectRequired ? document.location.href : false,
			)

			if (!res)
				return new Promise((_resolve) => {
					return
				}) // Site is redirecting

			if (res.evt === OutletResponseAction.ISSUER_TOKENS) {
				const issuerConfig = this.getOutletConfigForCurrentOrigin(url.origin)
				if (issuerConfig) this.tokenStore.setTokens(issuerConfig.collectionID, res.data.tokens)

				return res.data.tokens
			}
		} catch (e) {
			errorHandler(e.message, 'error', null, false, true)
		}
	}

	on(type: TokenNegotiatorEvents, callback?: any, data?: any) {
		requiredParams(type, 'Event type is not defined')

		if ((type === 'tokens' || type === 'tokens-selected') && callback) {
			this.readTokensFromUrl()
		}

		if (type === 'token-proof' && callback) {
			logger(2, 'token-proof listener atteched. check URL HASH for proof callbacks.')

			const action = this.getDataFromQuery('action')

			if (action === 'proof-callback') {
				this.readProofCallback()
			} else if (action === 'email-callback') {
				let currentIssuer = this.getOutletConfigForCurrentOrigin()

				if (currentIssuer) {
					logger(2, 'Outlet fired to parse URL hash params.')
					this.processLocalOutletAttestationCallback(currentIssuer)
						.catch((err) => {
							logger(2, err)
						})
				}
			}
		}

		if (callback) {
			this.clientCallBackEvents[type] = callback
		} else {
			if (this.clientCallBackEvents[type]) {
				return this.clientCallBackEvents[type].call(type, data)
			}
		}
	}

	private async processLocalOutletAttestationCallback(currentIssuer) {
		let outlet = new (await import('../outlet/localOutlet')).LocalOutlet(currentIssuer, this.urlParams)
		outlet.processAttestationCallback()
	}

	switchTheme(newTheme: UItheme) {
		this.ui.switchTheme(newTheme)
	}
}
