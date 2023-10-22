import { OutletAction, OutletResponseAction, Messaging } from './messaging'
import { Ui, UiInterface, UItheme } from './ui'
import {
	logger,
	requiredParams,
	waitForElementToExist,
	errorHandler,
	removeUrlSearchParams,
	createIssuerHashMap,
	createIssuerHashArray,
	sleep,
} from '../utils'
import { getNftCollection, getNftTokens } from '../utils/token/nftProvider'
import { TokenStore } from './tokenStore'
import {
	OffChainTokenConfig,
	OnChainTokenConfig,
	AuthenticateInterface,
	NegotiationInterface,
	OnChainIssuer,
	OutletTokenResult,
	MultiTokenInterface,
	TokenNegotiatorEventsArgs,
} from './interface'
import { SignedUNChallenge } from './auth/signedUNChallenge'
import { TicketZKProof } from './auth/ticketZKProof'
import { TicketZKProofMulti } from './auth/ticketZKProofMulti'
import { AuthenticationMethod, AuthenticationMethodMulti } from './auth/abstractAuthentication'
import { isUserAgentSupported, validateBlockchain } from '../utils/support/isSupported'
import Web3WalletProvider from '../wallet/Web3WalletProvider'
import { LocalOutlet } from '../outlet/localOutlet'
import { shouldUseRedirectMode } from '../utils/support/getBrowserData'
import { VERSION } from '../version'
import { getFungibleTokenBalances, getFungibleTokensMeta } from '../utils/token/fungibleTokenProvider'
import { URLNS } from '../core/messaging'
import { TokenType } from '../outlet/ticketStorage'
import { MultiTokenAuthRequest, MultiTokenAuthResult, OutletIssuerInterface, ProofResult } from '../outlet/interfaces'
import { AttestationIdClient } from '../outlet/attestationIdClient'
import { EventHookHandler } from './eventHookHandler'
import { ethers } from 'ethers'
import { TokenListItemInterface } from './views/token-list'

if (typeof window !== 'undefined') window.tn = { VERSION }

declare global {
	interface Window {
		tokenToggleSelection: any
		ethereum: any
		solana: any
		ultra: any
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
		openingHeading: 'Open a new world of perks, benefits and opportunities with your attestation, collectible or token.',
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
	ISSUER_UNAVAILABLE = 'ISSUER_UNAVAILABLE',
}

export enum ClientErrorMessage {
	POPUP_BLOCKED = 'Please add an exception to your popup blocker before continuing.',
	USER_ABORT = 'The user aborted the process.',
	ISSUER_UNAVAILABLE = 'The issuer is unavailable.',
}

export class Client {
	public issuersLoaded: boolean
	public config: NegotiationInterface
	private web3WalletProvider: Web3WalletProvider
	private messaging: Messaging
	private eventHookHandler: EventHookHandler
	protected ui: UiInterface
	protected tokenStore: TokenStore
	public externalUtils = {
		evm: {
			ethers,
		},
	}
	private uiUpdateCallbacks: { [type in UIUpdateEventType] } = {
		[UIUpdateEventType.ISSUERS_LOADING]: undefined,
		[UIUpdateEventType.ISSUERS_LOADED]: undefined,
		[UIUpdateEventType.WALLET_DISCONNECTED]: undefined,
	}
	private userCancelTokenAutoload: boolean

	private urlParams: URLSearchParams

	/* static getKey(file: string) {
		return Authenticator.decodePublicKey(file)
	}*/

	constructor(config: NegotiationInterface) {
		this.eventHookHandler = new EventHookHandler()

		if (window.location.hash) {
			this.urlParams = new URLSearchParams(window.location.hash.substring(1))
			let action = this.getDataFromQuery('action')
			logger(2, `Client() fired. Action = "${action}"`)
			this.removeCallbackParamsFromUrl()
		} else {
			this.urlParams = new URLSearchParams()
		}

		this.config = this.mergeConfig(defaultConfig, config)

		// TODO investigate if this works correctly.
		this.config.autoLoadTokens = localStorage.getItem('tn-autoload-tokens') === 'false' ? false : this.config.autoLoadTokens

		this.tokenStore = new TokenStore(this.config.autoEnableTokens, this.config.tokenPersistenceTTL)
		// @ts-ignore
		if (this.config.issuers?.length > 0) this.tokenStore.updateIssuers(this.config.issuers)

		this.messaging = new Messaging()
		// this.registerOutletProofEventListener()
	}

	handleRecievedRedirectMessages() {
		const issuer = this.getDataFromQuery('issuer')
		const error = this.getDataFromQuery('error')
		const type = this.getDataFromQuery('type')
		if (error === 'USER_ABORT' && type === 'offchain-issuer-connection') {
			let userAbortError = new Error(error)
			userAbortError.name = 'USER_ABORT'
			errorHandler(
				'issuer denied connection with off chain issuer',
				'error',
				() => this.eventSender('error', { issuer: issuer, error: userAbortError }),
				null,
				true,
				false,
			)
			return userAbortError
		}
		return null
	}

	getDataFromQuery(itemKey: any): string {
		if (this.urlParams) {
			return this.urlParams.get(URLNS + itemKey)
		}
		return null
	}

	public async readProofCallback() {
		if (!this.getDataFromQuery) return false
		let action = this.getDataFromQuery('action')
		let multiToken = this.getDataFromQuery('multi-token')
		if (action !== 'proof-callback') return false
		// single or multi token flow
		if (multiToken !== 'true') this.readProofCallbackLegacy()
		else this.readProofCallbackMultiToken()
	}

	private async readProofCallbackMultiToken() {
		const proofs = JSON.parse(this.getDataFromQuery('tokens')) as MultiTokenAuthResult
		const error = this.getDataFromQuery('error')

		// for each issuer
		for (const issuer in proofs) {
			// validate proof
			const issuerConfig = this.tokenStore.getCurrentIssuers(false)[issuer] as OffChainTokenConfig
			for (const tokenId in proofs[issuer]) {
				await TicketZKProof.validateProof(issuerConfig, proofs[issuer][tokenId].proof, proofs[issuer][tokenId].type)
			}
		}
		this.emitMultiRedirectProofEvent(proofs, error)
	}

	private async readProofCallbackLegacy() {
		const issuer = this.getDataFromQuery('issuer')
		const attest = this.getDataFromQuery('attestation')
		const type = this.getDataFromQuery('type') as TokenType
		const error = this.getDataFromQuery('error')

		await TicketZKProof.validateProof(this.tokenStore.getCurrentIssuers(false)[issuer] as OffChainTokenConfig, attest, type as TokenType)

		this.emitRedirectProofEvent(issuer, { proof: attest, type }, error)
	}

	private removeCallbackParamsFromUrl() {
		let params = new URLSearchParams(window.location.hash.substring(1))

		params = removeUrlSearchParams(params)

		window.location.hash = '#' + params.toString()
	}

	/* private registerOutletProofEventListener() {
		window.addEventListener('auth-callback', (e: CustomEvent) => {
			this.emitRedirectProofEvent(e.detail.issuer, e.detail.proof, e.detail.error)
		})
	}*/

	// TODO: Merge these proof events
	private emitRedirectProofEvent(issuer: string, proof?: ProofResult, error?: string) {
		// Wait to ensure UI is initialized
		setTimeout(() => {
			if (error) {
				this.handleProofError(new Error(error), issuer)
			} else {
				this.eventSender('token-proof', {
					issuer,
					error: null,
					data: proof,
				})
			}
		}, 500)
	}

	private emitMultiRedirectProofEvent(proofs?: MultiTokenAuthResult, error?: string) {
		// Wait to ensure UI is initialized
		setTimeout(() => {
			if (error) {
				this.handleProofError(new Error(error), 'multi token authentication error')
			} else {
				this.eventSender('token-proof', {
					issuers: proofs,
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
	public hasIssuerForBlockchain(blockchain: 'evm' | 'solana' | 'flow' | 'ultra', useOauth = false) {
		const _blockchain = blockchain.toLocaleLowerCase()
		return (
			this.config.issuers.filter((issuer: OnChainTokenConfig) => {
				const issuerBlockChain = issuer.blockchain?.toLocaleLowerCase()
				const blockChainUsed = issuerBlockChain === blockchain
				const solanaEnabled = blockChainUsed && _blockchain === 'solana' && typeof window.solana !== 'undefined'
				const ultraEnabled = blockChainUsed && _blockchain === 'ultra' && typeof window.ultra !== 'undefined'
				const flowEnabled = blockChainUsed && _blockchain === 'flow'
				const evmEnabled = blockChainUsed && _blockchain === 'evm' && !issuer.oAuth2options && !useOauth
				const sociosEnabled = blockChainUsed && _blockchain === 'evm' && issuer.oAuth2options && useOauth
				const fallBackToEVM = _blockchain === 'evm' && !issuerBlockChain && !useOauth
				return solanaEnabled || ultraEnabled || evmEnabled || sociosEnabled || flowEnabled || fallBackToEVM
			}).length > 0
		)
	}

	public async getWalletProvider() {
		if (!this.web3WalletProvider) {
			// TODO - this is already installed in the file header.
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
			localStorage.removeItem('tn-autoload-tokens')
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
				logger(2, 'Failed to load contract data for ' + issuer + ': ' + e.message, e)
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
			let outlet = new LocalOutlet({
				issuers: Object.values(this.tokenStore.getCurrentIssuers(false)) as unknown as OutletIssuerInterface[],
				ethRpcMap: this.config.ethRpcMap,
				skipEasRevokeCheck: this.config.skipEasRevokeCheck,
			})
			await outlet.readMagicLink(this.urlParams)
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

		this.handleRecievedRedirectMessages()

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

		if (this.config.autoEnableTokens && Object.keys(this.tokenStore.getSelectedTokens()).length) this.tokensSelectedCallBackHandler()
		if (openPopup || (this.config.uiOptions.autoPopup === true && autoOpenPopup)) this.ui.openOverlay()
	}

	private tokensSelectedCallBackHandler = () => {
		this.eventSender('tokens-selected', {
			selectedTokens: this.tokenStore.getSelectedTokens(),
			selectedIssuerKeys: Object.keys(this.tokenStore.getSelectedTokens()),
		})
	}

	private cancelAutoload = true

	async tokenAutoLoad(onLoading: (issuer: string) => void, onComplete: (issuer: string, tokens: any[]) => void, refresh: boolean) {
		if (this.config.autoLoadTokens === false) return

		this.cancelAutoload = false

		let count = 1

		if (refresh) this.tokenStore.clearCachedTokens()

		for (let issuerKey in this.tokenStore.getCurrentIssuers()) {
			let tokens = this.tokenStore.getIssuerTokens(issuerKey)

			if (tokens != null) {
				onComplete(issuerKey, tokens)
				continue
			}

			onLoading(issuerKey)

			try {
				let tokens = await this.connectTokenIssuer(issuerKey)

				if (!tokens) return // Site is redirecting

				onComplete(issuerKey, tokens)
			} catch (e) {
				e.message = 'Failed to load ' + issuerKey + ': ' + e.message
				logger(2, e)
				errorHandler('autoload tokens error', 'error', () => this.eventSender('error', { issuer: issuerKey, error: e }), null, true, false)
				onComplete(issuerKey, null)
			}

			count++

			if (refresh) continue

			if (this.cancelAutoload || (this.config.autoLoadTokens !== true && count > this.config.autoLoadTokens)) break
		}

		this.eventSender('tokens-loaded', { loadedCollections: Object.keys(this.tokenStore.getCurrentIssuers()).length })

		// use retry logic here too
		// document.querySelectorAll('.connect-btn-tn .lds-ellipsis').forEach((el) => {
		// 	el.parentElement.innerHTML = this.config.uiOptions?.loadAction ?? 'Load Collection'
		// })
	}

	public cancelTokenAutoload() {
		this.cancelAutoload = true
		localStorage.setItem('tn-autoload-tokens', 'false')
	}

	async setPassiveNegotiationWebTokens(): Promise<void> {
		let issuers = this.tokenStore.getCurrentIssuers(false)

		let action = this.getDataFromQuery('action')

		for (let issuer in issuers) {
			let tokens

			const issuerConfig = this.tokenStore.getCurrentIssuers()[issuer] as OffChainTokenConfig

			try {
				// TODO: Consolidate this with the logic in readTokensFromUrl (probably best to run this in the Client constructor)
				if (new URL(issuerConfig.tokenOrigin).origin === window.location.origin) {
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
				errorHandler(error, 'error', () => this.eventSender('error', { issuer, error }), null, true, false)
				continue
			}

			logger(2, 'tokens:')
			logger(2, tokens)

			this.storeOutletTokenResponse(tokens)
		}
	}

	readTokensFromUrl() {
		let action = this.getDataFromQuery('action')

		if (action === 'error') {
			return this.handleRedirectTokensError()
				.then()
				.catch((e) => logger(2, 'Error handle redirect tokens error. ', e))
		}

		if (action !== OutletAction.GET_ISSUER_TOKENS + '-response') return

		if (!this.getDataFromQuery('tokens')) {
			logger(3, 'No issuer in URL.')
			return
		}

		let tokens

		try {
			let resposeTokensEncoded = this.getDataFromQuery('tokens')
			try {
				tokens = JSON.parse(resposeTokensEncoded) as OutletTokenResult
			} catch (e) {
				logger(2, 'Error parse tokens from Response. ', e)
			}
		} catch (err) {
			logger(1, 'Error read tokens from URL')
			return
		}

		logger(2, 'readTokensFromUrl tokens:')
		logger(2, tokens)

		this.storeOutletTokenResponse(tokens)
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

		this.tokensSelectedCallBackHandler()
		this.eventSender('tokens-loaded', { loadedCollections: Object.keys(this.tokenStore.getCurrentTokens()).length })

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
			// @ts-ignore
			tokens = await this.loadOutletTokens(config)
		}

		if (this.config.autoEnableTokens) {
			this.tokensSelectedCallBackHandler()
		}

		return tokens
	}

	private async loadOnChainTokens(issuer: OnChainIssuer): Promise<any[]> {
		let walletProvider = await this.getWalletProvider()

		// TODO: Collect tokens from all addresses for this blockchain
		const walletAddress = walletProvider.getConnectedWalletAddresses(issuer.blockchain)?.[0]

		if (!issuer.oAuth2options) requiredParams(walletAddress, 'wallet address is missing.')

		// TODO: Allow API to return tokens for multiple addresses
		let tokens

		if (issuer.fungible) {
			tokens = await getFungibleTokenBalances(issuer, walletAddress, null)
		} else {
			tokens = await getNftTokens(issuer, walletAddress, null)
		}

		tokens.map((token) => {
			token.walletAddress = walletAddress
			token.collectionId = issuer.collectionID
			return token
		})

		this.tokenStore.setTokens(issuer.collectionID, tokens)

		return tokens
	}

	public prepareMultiOutletRequest(initialIssuer: OffChainTokenConfig) {
		const requestBatchOfSameOutletIssuers = [initialIssuer]
		for (const issuer of Object.values(this.tokenStore.getCurrentIssuers(false)) as OffChainTokenConfig[]) {
			if (issuer.tokenOrigin === initialIssuer.tokenOrigin) requestBatchOfSameOutletIssuers.push(issuer)
		}
		return createIssuerHashMap(requestBatchOfSameOutletIssuers)
	}

	private async loadOutletTokens(config: OffChainTokenConfig) {
		let tokens

		if (new URL(config.tokenOrigin).origin === window.location.origin) {
			tokens = await this.loadLocalOutletTokens(config)
		} else {
			tokens = await this.loadRemoteOutletTokens(config)

			if (!tokens) return // Site is redirecting
		}

		this.storeOutletTokenResponse(tokens)

		return tokens[config.collectionID]
	}

	private storeOutletTokenResponse(tokens: OutletTokenResult) {
		for (const issuer in tokens) {
			this.tokenStore.setTokens(issuer, tokens[issuer])
		}
	}

	private async loadRemoteOutletTokens(issuer: OffChainTokenConfig): Promise<OutletTokenResult | void> {
		const redirectRequired = shouldUseRedirectMode(this.config.offChainRedirectMode)
		if (redirectRequired) this.tokenStore.setTokens(issuer.collectionID, [])
		if (this.ui && !issuer.onChain) {
			await waitForElementToExist('.load-container-tn')
			this.ui.showLoader(
				`<h4>${this.config.uiOptions?.reDirectIssuerEventHeading ?? 'Connecting to Issuers...'}</h4>`,
				`<small>${this.config.uiOptions?.reDirectIssuerBodyEvent ?? 'Your browser will re-direct shortly'}</small>`,
				`<button class='cancel-autoload-btn btn-tn' aria-label='Cancel page re-direct'>${
					this.config.uiOptions?.cancelAction ?? 'Cancel'
				}</button>`,
			)
			this.enableTokenAutoLoadCancel()
			this.eventSender('page-redirecting', { collectionId: issuer.collectionID, tokenOrigin: issuer.tokenOrigin })
			await sleep(this.config.uiOptions.userCancelIssuerAutoRedirectTimer ?? 2500)
			if (this.userCancelTokenAutoload) {
				this.userCancelTokenAutoload = false
				return {}
			}
		}
		const res = await this.messaging.sendMessage(
			{
				action: OutletAction.GET_ISSUER_TOKENS,
				origin: issuer.tokenOrigin,
				data: {
					request: this.prepareMultiOutletRequest(issuer),
				},
			},
			this.config.messagingForceTab,
			this.config.type === 'active' ? this.ui : null,
			redirectRequired ? window.location.href : false,
		)
		if (!res) return // Site is redirecting
		return res.data?.tokens ?? {}
	}

	private async loadLocalOutletTokens(issuer: OffChainTokenConfig) {
		const localOutlet = new LocalOutlet({
			issuers: Object.values(this.tokenStore.getCurrentIssuers(false)) as unknown as OutletIssuerInterface[],
			ethRpcMap: this.config.ethRpcMap,
			skipEasRevokeCheck: this.config.skipEasRevokeCheck,
		})
		return await localOutlet.getTokens(this.prepareMultiOutletRequest(issuer))
	}

	updateSelectedTokens(selectedTokens) {
		this.tokenStore.setSelectedTokens(selectedTokens)
		this.tokensSelectedCallBackHandler()
	}

	async prepareToAuthenticateToken(authRequest: AuthenticateInterface) {
		await this.checkUserAgentSupport('authentication')
		let unsignedToken = authRequest?.unsignedToken
		if (!unsignedToken && authRequest.collectionId) unsignedToken = authRequest
		const issuer = authRequest?.issuer ?? unsignedToken?.collectionId ?? authRequest?.collectionId
		const tokenId = authRequest?.tokenId
		console.log('tokenIssuer', issuer, 'unsignedToken', unsignedToken)
		requiredParams(issuer && (unsignedToken || tokenId), 'Issuer and unsigned token required MUTLI.')
		const config = this.tokenStore.getCurrentIssuers()[issuer]
		if (!config) errorHandler('Provided issuer was not found.', 'error', null, null, true, true)
		return { unsignedToken, issuer, tokenId }
	}

	async getMultiRequestBatch(authRequests: AuthenticateInterface[]) {
		let authRequestBatch: { onChain: {}; offChain: { [origin: string]: { [issuer: string]: MultiTokenInterface } } } = {
			onChain: {},
			offChain: {},
		}
		await Promise.all(
			authRequests.map(async (authRequestItem) => {
				const reqItem = await this.prepareToAuthenticateToken(authRequestItem)
				const issuerConfig = this.tokenStore.getCurrentIssuers()[reqItem.issuer] as OffChainTokenConfig
				if (issuerConfig.onChain === false) {
					if (!authRequestBatch.offChain[issuerConfig.tokenOrigin]) authRequestBatch.offChain[issuerConfig.tokenOrigin] = {}
					if (!authRequestBatch.offChain[issuerConfig.tokenOrigin][reqItem.issuer]) {
						authRequestBatch.offChain[issuerConfig.tokenOrigin][reqItem.issuer] = {
							tokenIds: [],
							issuerConfig: issuerConfig,
						}
					}
					authRequestBatch.offChain[issuerConfig.tokenOrigin][reqItem.issuer].tokenIds.push(
						reqItem.tokenId ?? reqItem.unsignedToken.tokenId,
					)
					return
				}
				throw new Error('On-chain token are not supported by batch authentication at this time.')
			}),
		)
		if (Object.keys(authRequestBatch.offChain).length > 1) {
			throw new Error('Only a single token origin is supported by batch authentication at this time.')
		}
		return authRequestBatch
	}

	async authenticateMultiple(authRequests: AuthenticateInterface[]) {
		try {
			let messagingForceTab = false

			if (this.ui) {
				this.ui.showLoaderDelayed(
					[
						`<h4>${this.config.uiOptions?.authenticationHeadingEvent ?? 'Authenticating...'}</h4>`,
						`<small>${this.config.uiOptions?.authenticationBodyEvent ?? 'You may need to sign a new challenge in your wallet'}</small>`,
						`<button class='cancel-auth-btn btn-tn' aria-label='Cancel authentication'>${
							this.config.uiOptions?.cancelAction ?? 'Cancel'
						}</button>`,
					],
					600,
					true,
				)
				this.enableAuthCancel(authRequests)
			}

			const authRequestBatch = await this.getMultiRequestBatch(authRequests)
			let issuerProofs = {}

			// Off Chain: // ['https://devcon.com']['issuer'][list of tokenIds]
			for (const tokenOrigin in authRequestBatch.offChain) {
				let AuthType = TicketZKProofMulti
				let authenticator: AuthenticationMethodMulti = new AuthType(this)
				const authRequest = {
					options: {
						useRedirect: messagingForceTab,
					},
				}
				try {
					const result = await authenticator.getTokenProofMulti(tokenOrigin, authRequestBatch.offChain[tokenOrigin], authRequest)
					if (!result) return // Site is redirecting
					issuerProofs = result.data
				} catch (err) {
					if (err.message === 'WALLET_REQUIRED') {
						return this.handleWalletRequired(authRequest)
					}
					// errorHandler(err, 'error', () => this.handleProofError(err, `multi issuer authentication via ${ tokenOrigin }`), null, false, true)
					console.error(err)
					throw err
				}
			}
			if (this.ui) {
				this.ui.dismissLoader()
				this.ui.closeOverlay()
			}

			this.eventSender('token-proof', {
				issuers: issuerProofs,
			})

			return { issuers: issuerProofs }
		} catch (err) {
			errorHandler(err, 'error', null, false, true, true)
		}
	}

	async authenticate(authRequest: any) {
		if (Array.isArray(authRequest)) return this.authenticateMultiple(authRequest as AuthenticateInterface[])
		else return this.authenticateToken(authRequest as AuthenticateInterface)
	}

	async authenticateToken(authRequest: AuthenticateInterface | any) {
		await this.checkUserAgentSupport('authentication')

		const tokenIssuer = authRequest.issuer ?? authRequest.unsignedToken?.collectionId ?? authRequest.collectionId
		let unsignedToken = authRequest.unsignedToken
		if (!unsignedToken && authRequest.collectionId) unsignedToken = authRequest

		console.log('tokenIssuer', tokenIssuer, 'unsignedToken', unsignedToken)
		requiredParams(tokenIssuer && unsignedToken, 'Issuer and unsigned token required. SINGLE')

		const config = this.tokenStore.getCurrentIssuers()[tokenIssuer]

		if (!config) errorHandler('Provided issuer was not found.', 'error', null, null, true, true)

		// TODO: How to handle error display in passive negotiation? Use optional UI or emit errors to listener?

		if (this.ui) {
			this.ui.showLoaderDelayed(
				[
					`<h4>${this.config.uiOptions?.authenticationHeadingEvent ?? 'Authenticating...'}</h4>`,
					`<small>${this.config.uiOptions?.authenticationBodyEvent ?? 'You may need to sign a new challenge in your wallet'}</small>`,
					`<button class='cancel-auth-btn btn-tn' aria-label='Cancel authentication'>${
						this.config.uiOptions?.cancelAction ?? 'Cancel'
					}</button>`,
				],
				600,
				true,
			)
			this.enableAuthCancel(tokenIssuer)
		}

		let AuthType

		if (authRequest.type) {
			AuthType = authRequest.type
		} else {
			AuthType = config.onChain ? SignedUNChallenge : TicketZKProof
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

			this.eventSender('token-proof', { data: res.data, error: null, issuer: tokenIssuer })
		} catch (err) {
			logger(2, err)

			if (err.message === 'WALLET_REQUIRED') {
				return this.handleWalletRequired(authRequest)
			}

			errorHandler(err, 'error', () => this.handleProofError(err, tokenIssuer), null, false, true)
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
					this.eventSender('user-cancel', { eventType: 'Authentication' })
					this.eventSender('token-proof', { issuer, error: err, data: null })
				}
			})
			.catch((err) => {
				logger(2, err)
			})
	}

	public enableTokenAutoLoadCancel(): void {
		waitForElementToExist('.cancel-autoload-btn')
			.then((cancelAuthButton: HTMLElement) => {
				cancelAuthButton.onclick = () => {
					this.userCancelTokenAutoload = true
					this.cancelTokenAutoload()
					this.ui.dismissLoader()
					// TODO implement communication (pub/sub events)
					// to de-couple this logic for default and custom views to utilise.
					document.querySelectorAll('.connect-btn-tn .lds-ellipsis').forEach((el) => {
						el.parentElement.innerHTML = this.config.uiOptions?.loadAction ?? 'Load Collection'
					})
					this.eventSender('user-cancel', { eventType: 'page-redirect' })
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

	async eventSender<T extends keyof TokenNegotiatorEventsArgs, R extends TokenNegotiatorEventsArgs[T]>(eventName: T, data: R) {
		await Promise.resolve(this.on(eventName, undefined, data))
	}

	getOutletConfigForCurrentOrigin(origin: string = window.location.origin) {
		const allIssuers = this.tokenStore.getCurrentIssuers(false)
		const currentIssuers: OffChainTokenConfig[] = []

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

	async addTokenViaMagicLink(magicLink: any) {
		let url = new URL(magicLink)
		let params = url.hash.length > 1 ? url.hash.substring(1) : url.search.substring(1)

		const redirectRequired = shouldUseRedirectMode(this.config.offChainRedirectMode)

		const request = createIssuerHashMap(Object.values(this.tokenStore.getCurrentIssuers(false)) as OffChainTokenConfig[])

		try {
			let res = await this.messaging.sendMessage(
				{
					action: OutletAction.MAGIC_URL,
					origin: url.origin + url.pathname,
					data: {
						request,
						urlParams: params,
					},
				},
				this.config.messagingForceTab,
				undefined,
				redirectRequired ? window.location.href : false,
			)

			if (!res)
				return new Promise((_resolve) => {
					return
				}) // Site is redirecting
			if (res.evt === OutletResponseAction.ISSUER_TOKENS) {
				const issuerConfig = this.getOutletConfigForCurrentOrigin(url.origin)
				if (issuerConfig) this.storeOutletTokenResponse(res.data.tokens)
				this.eventSender('tokens-selected', {
					selectedTokens: this.tokenStore.getSelectedTokens(),
					selectedIssuerKeys: Object.keys(this.tokenStore.getSelectedTokens()),
				})
				return res.data.tokens
			}
		} catch (e) {
			errorHandler(e.message, 'error', null, false, true)
		}
	}

	on<T extends keyof TokenNegotiatorEventsArgs, R extends (data: TokenNegotiatorEventsArgs[T]) => Promise<void> | void>(
		type: T,
		callback?: R,
		data?: TokenNegotiatorEventsArgs[T],
	) {
		requiredParams(type, 'Event type is not defined')

		if (type === 'tokens-selected' && callback) {
			this.readTokensFromUrl()
		}

		if (type === 'token-proof' && callback) {
			logger(2, 'token-proof listener atteched. check URL HASH for proof callbacks.')

			const action = this.getDataFromQuery('action')

			if (action === 'proof-callback') {
				this.readProofCallback()
			} else if (action === 'email-callback') {
				this.processAttestationIdCallback()
			}
		}

		// callback defined when hook added.
		if (callback) {
			this.eventHookHandler.subscribe(type, callback)
		} else {
			this.eventHookHandler.trigger(type, data)
		}
	}

	private async processAttestationIdCallback() {
		try {
			const attestIdClient = new AttestationIdClient()
			attestIdClient.captureAttestationIdCallback(this.urlParams)
			const originalAction = this.getDataFromQuery('orig-action')

			const localOutlet = new LocalOutlet({
				issuers: Object.values(this.tokenStore.getCurrentIssuers(false)) as unknown as OutletIssuerInterface[],
				ethRpcMap: this.config.ethRpcMap,
				skipEasRevokeCheck: this.config.skipEasRevokeCheck,
			})

			switch (originalAction) {
				case OutletAction.GET_PROOF: {
					const collectionId: string = this.getDataFromQuery('issuer')
					const tokenId: string = this.getDataFromQuery('tokenId')

					const issuerConfig = this.tokenStore.getCurrentIssuers(false)[collectionId] as unknown as OutletIssuerInterface

					const issuerHashes = createIssuerHashArray(issuerConfig)

					const result = await localOutlet.authenticate(issuerConfig, issuerHashes, tokenId)

					await TicketZKProof.validateProof(issuerConfig as unknown as OffChainTokenConfig, result.proof, result.type)

					this.eventSender('token-proof', {
						issuer: collectionId,
						proof: result,
					})

					break
				}
				case OutletAction.GET_MUTLI_PROOF: {
					const authRequest = JSON.parse(this.getDataFromQuery('tokens')) ?? ({} as MultiTokenAuthRequest)

					const result = await localOutlet.authenticateMany(authRequest)

					await TicketZKProofMulti.validateProofResult(
						result,
						this.getTokenStore().getCurrentIssuers(false) as unknown as OffChainTokenConfig[],
					)

					this.eventSender('token-proof', {
						issuers: result,
					})

					break
				}
				default:
					throw new Error('Original action not defined in attestation.id callback')
			}
		} catch (e: any) {
			console.error(e)
			this.emitRedirectProofEvent(null, null, e.message)
		}

		window.location.hash = removeUrlSearchParams(this.urlParams, ['attestation', 'requestSecret', 'address', 'email', 'wallet']).toString()
	}

	switchTheme(newTheme: UItheme) {
		this.ui.switchTheme(newTheme)
	}
}
