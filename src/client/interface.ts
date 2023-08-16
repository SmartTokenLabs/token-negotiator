import { UIOptionsInterface } from './ui'
import { AuthenticationMethod } from './auth/abstractAuthentication'
import { SafeConnectOptions } from '../wallet/SafeConnectProvider'
import { BrowserDataInterface } from '../utils/support/isSupported'
import { WalletConnection } from '../wallet/Web3WalletProvider'
import { DecodedToken } from '../outlet/ticketStorage'
import { EasSchemaConfig } from '../outlet/interfaces'

export type SupportedBlockchainsParam = 'evm' | 'flow' | 'solana' | 'ultra'
export const SignatureSupportedBlockchainsParamList = ['evm', 'flow', 'solana', 'ultra']

export interface OffChainTokenConfig extends IssuerConfigInterface {
	onChain: false
	tokenOrigin?: string
	unEndPoint?: string
	base64senderPublicKeys: { [key: string]: string }
	base64attestorPubKey: string // TODO: Remove - only required in outlet
	eas?: EasSchemaConfig
}

export interface OnChainTokenConfig extends IssuerConfigInterface {
	onChain: true
	contract: string
	chain: string
	openSeaSlug?: string
	blockchain?: SupportedBlockchainsParam
}

export interface UltraIssuerConfig extends OnChainTokenConfig {
	blockchain: 'ultra'
	// NFT collection is static
	contract: 'eosio.nft.ft'
	factoryId?: number
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
	noTokenMsg?: string
	hideToggle?: boolean
	fungible?: boolean
	oauth2?: boolean
	oauth2ConsumerKey?: string
}

export type Issuer = OffChainTokenConfig | SolanaIssuerConfig | OnChainTokenConfig | UltraIssuerConfig
export type OnChainIssuer = SolanaIssuerConfig | OnChainTokenConfig | UltraIssuerConfig
export interface NegotiationInterface {
	type: 'active' | 'passive'
	issuers?: Issuer[]
	uiOptions?: UIOptionsInterface
	autoLoadTokens?: number | boolean
	autoEnableTokens?: boolean
	messagingForceTab?: boolean
	safeConnectOptions?: SafeConnectOptions
	offChainRedirectMode?: 'always' | 'never'
	tokenPersistenceTTL?: number
	ethRpcMap?: EthRPCMap
	skipEasRevokeCheck?: boolean
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

export interface EthRPCMap {
	[chainId: number]: string
}

export interface WalletOptionsInterface {
	walletConnectV2?: {
		chains?: string[]
	}
}

export interface MultiTokenInterface {
	issuerConfig: OffChainTokenConfig
	tokenIds: (string | number)[]
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

export interface TokenNegotiatorEventsArgs {
	'view-changed': EventSenderViewChanged
	'tokens-refreshed': EventSenderTokensRefreshed
	'opened-overlay': EventSenderOpenedOverlay
	'closed-overlay': EventSenderClosedOverlay
	loaded: EventSenderViewLoaded
	'token-proof': any // EventSenderTokenProof // TODO: Update this
	'connected-wallet': EventSenderConnectedWallet
	'disconnected-wallet': EventSenderDisconnectedWallet
	'tokens-selected': EventSenderTokensSelected
	tokens: EventSenderTokens
	'tokens-loaded': EventSenderTokensLoaded
	'network-change': string
	error: EventSenderError
}

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

export interface EventSenderTokens {
	data: any[]
}

export interface EventSenderTokensLoaded {
	loadedCollections: number
}

export type EventSenderConnectedWallet = WalletConnection | null
export interface EventSenderDisconnectedWallet {
	data: null
}

export interface OutletTokenResult {
	[collectionId: string]: DecodedToken[]
}
