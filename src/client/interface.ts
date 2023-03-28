import { UIOptionsInterface } from './ui'
import { AuthenticationMethod } from './auth/abstractAuthentication'
import { SafeConnectOptions } from '../wallet/SafeConnectProvider'
import { BrowserDataInterface } from '../utils/support/isSupported'
import { WalletConnection } from '../wallet/Web3WalletProvider'

export type SupportedBlockchainsParam = 'evm' | 'flow' | 'solana'

export interface OffChainTokenConfig extends IssuerConfigInterface {
	onChain: false
	tokenOrigin?: string
	unEndPoint?: string
	base64senderPublicKeys: { [key: string]: string }
	base64attestorPubKey: string
	accessRequestType?: 'read' | 'write'
}

export interface OnChainTokenConfig extends IssuerConfigInterface {
	onChain: true
	contract: string
	chain: string
	openSeaSlug?: string
	blockchain?: SupportedBlockchainsParam
}

export interface SolanaIssuerConfig extends OnChainTokenConfig {
	blockchain: 'solana'
	collectionAddress?: string
	tokenProgram?: string
	updateAuthority?: string
}

export interface IssuerConfigInterface {
	collectionID: string
	onChain: boolean
	title?: string
	image?: string
	symbol?: string
	decimals?: number
	filters?: {}
	noTokenMsg?: string
	hideToggle?: boolean
	fungible?: boolean
}

export type Issuer = OffChainTokenConfig | SolanaIssuerConfig | OnChainTokenConfig
export type OnChainIssuer = SolanaIssuerConfig | OnChainTokenConfig
export interface NegotiationInterface {
	type: string
	issuers?: Issuer[]
	uiOptions?: UIOptionsInterface
	autoLoadTokens?: number | boolean
	autoEnableTokens?: boolean
	messagingForceTab?: boolean
	safeConnectOptions?: SafeConnectOptions
	// force enable/disable redirect mode. The default (undefined) is to only use redirect for browsers where iframes are not possible.
	offChainRedirectMode?: 'always' | 'never'
	tokenPersistenceTTL?: number
	unSupportedUserAgent?: {
		authentication?: {
			config: BrowserDataInterface
			errorMessage: string
		}
		full?: {
			config: BrowserDataInterface
			errorMessage: string
		}
	}
	noInternetErrorMessage?: string
	experimentalFeatures?: string[]
	walletOptions?: WalletOptionsInterface
}

export interface WalletOptionsInterface {
	walletConnectV2?: {
		chains?: string[]
		rpcMap: { [chainId: string]: string }
	}
}

export interface AuthenticateInterface {
	issuer: string
	tokenId?: number | string
	unsignedToken: any
	address?: string
	wallet?: string
	type?: AuthenticationMethod
	options?: any
	blockchain?: string
}

export type TokenNegotiatorEvents =
	| 'view-changed'
	| 'tokens-refreshed'
	| 'opened-overlay'
	| 'closed-overlay'
	| 'loaded'
	| 'token-proof'
	| 'connected-wallet'
	| 'disconnected-wallet'
	| 'tokens-selected'
	| 'tokens'
	| 'tokens-loaded'
	| 'network-change'
	| 'error'

export interface EventSenderViewLoaded {
	data: any
}
export interface EventSenderClosedOverlay {
	data: any
}
export interface EventSenderOpenedOverlay {
	data: any
}
export interface EventSenderTokensRefreshed {
	data: any
}
export interface EventSenderTokenProof {
	issuer: string
	error: any | null
	data: Object | null
}
export interface EventSenderError {
	issuer: string
	error: Error
}
export interface EventSenderViewChanged {
	viewName: string
	data: any
}

export interface EventSenderTokensSelected {
	selectedTokens: Object
}

export interface EventSenderTokensLoaded {
	loadedCollections: number
}

export type EventSenderConnectedWallet = WalletConnection | null
export interface EventSenderDisconnectedWallet {
	data: null
}
