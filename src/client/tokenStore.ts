import { OffChainTokenConfig, OnChainIssuer, OnChainTokenConfig, SolanaIssuerConfig, UltraIssuerConfig } from './interface'

import { logger } from '../utils'

interface IssuerLookup {
	[collectionID: string]: TokenConfig & { timestamp: number }
}

interface TokenLookup {
	[issuer: string]: { timestamp: number; tokens: TokenData[] | null }
}

interface TokenData {
	walletAddress?: string
	// TODO: add more common fields to this interface
	[key: string]: any
}

type TokenConfig = OnChainTokenConfig | OffChainTokenConfig | SolanaIssuerConfig | UltraIssuerConfig

export class TokenStore {
	public static LOCAL_STORAGE_KEY = 'tn-tokenStore'

	private currentIssuers: { [issuer: string]: boolean } = {} // mapping of issuer to on/off chain

	private tokenData: TokenLookup = {}

	private tokenLookup: IssuerLookup = {}

	// TODO: change to disabled tokens
	private selectedTokens: any = {}

	constructor(
		private autoEnableTokens: boolean,
		private tokenPersistenceTTL: number,
	) {
		if (this.tokenPersistenceTTL > 0) this.loadTokenStore()
	}

	public clearTokenStore() {
		localStorage.removeItem(TokenStore.LOCAL_STORAGE_KEY)
	}

	private loadTokenStore() {
		const tokenStoreData = JSON.parse(localStorage.getItem(TokenStore.LOCAL_STORAGE_KEY))

		if (!tokenStoreData) return

		for (let collectionId in tokenStoreData.tokenLookup) {
			const lookup = tokenStoreData.tokenLookup[collectionId] as TokenConfig & { timestamp: number }

			if (lookup.timestamp + this.tokenPersistenceTTL * 1000 > Date.now()) {
				this.tokenLookup[collectionId] = lookup
			}
		}

		for (let collectionId in tokenStoreData.tokenData) {
			const tokenData = tokenStoreData.tokenData[collectionId] as { timestamp: number; tokens: [] }

			if (tokenData.timestamp + this.tokenPersistenceTTL * 1000 > Date.now()) {
				this.tokenData[collectionId] = tokenData
			}
		}

		this.saveTokenStore()
	}

	private saveTokenStore() {
		if (this.tokenPersistenceTTL > 0)
			localStorage.setItem(
				TokenStore.LOCAL_STORAGE_KEY,
				JSON.stringify({
					tokenLookup: this.tokenLookup,
					tokenData: this.tokenData,
				}),
			)
	}

	public updateIssuers(issuers: TokenConfig[]) {
		if (Object.keys(this.currentIssuers).length > 0) {
			this.selectedTokens = {}
		}
		this.prePopulateTokenLookupStore(issuers)
	}

	public clearCachedTokens(onChain?: boolean, walletAddress?: string) {
		for (let i in this.tokenData) {
			if (onChain !== undefined && onChain !== this.tokenLookup[i].onChain) continue

			if (walletAddress && this.tokenData[i].tokens?.length > 0) {
				this.tokenData[i].tokens = this.tokenData[i].tokens.filter((token) => token.walletAddress !== walletAddress)

				if (this.tokenData[i].tokens.length === 0) {
					delete this.tokenData[i]
					delete this.selectedTokens[i]
				}
			} else {
				delete this.tokenData[i]
				delete this.selectedTokens[i]
			}
		}

		this.saveTokenStore()
	}

	public hasOnChainTokens() {
		for (let i in this.currentIssuers) {
			if (this.currentIssuers[i]) return true
		}

		return false
	}

	public getCurrentIssuers(onChainFilter?: boolean) {
		let current: IssuerLookup = {}
		for (let collectionId in this.currentIssuers) {
			if (onChainFilter === undefined || onChainFilter === this.currentIssuers[collectionId])
				current[collectionId] = this.tokenLookup[collectionId]
		}
		return current
	}

	public getCurrentBlockchains() {
		const blockChains = []

		const issuers = this.getCurrentIssuers(true)

		for (let i in issuers) {
			const issuer = issuers[i] as OnChainTokenConfig

			if (blockChains.indexOf(issuer.blockchain) === -1) {
				blockChains.push(issuer.blockchain)
			}
		}

		return blockChains
	}

	public getCurrentTokens(onChainFilter?: boolean) {
		let current: { [issuer: string]: any[] } = {}
		for (let collectionId in this.currentIssuers) {
			if (onChainFilter === undefined || onChainFilter === this.currentIssuers[collectionId])
				current[collectionId] = this.tokenData[collectionId]?.tokens ?? []
		}
		return current
	}

	public getTotalTokenCount(onChainFilter?: boolean) {
		const tokens = this.getCurrentTokens(onChainFilter)

		return Object.keys(tokens).reduce((count, key) => count + tokens[key].length, 0)
	}

	public hasUnloadedIssuers() {
		let issuers = this.getCurrentIssuers(true)

		for (let i in issuers) {
			if (!issuers[i].title) return true
		}

		return false
	}

	public hasUnloadedTokens() {
		for (let tokens of Object.values(this.getCurrentTokens())) {
			if (tokens.length === 0) return true
		}
		return false
	}

	public getIssuerTokens(issuer: string) {
		if (this.tokenData[issuer]) return this.tokenData[issuer].tokens ?? []
		return null
	}

	public setTokens(issuer: string, tokens: TokenData[]) {
		this.tokenData[issuer] = { timestamp: Date.now(), tokens }

		this.saveTokenStore()

		if (this.autoEnableTokens) this.selectedTokens[issuer] = { tokens: tokens }
	}

	public getSelectedTokens() {
		return this.selectedTokens
	}

	public setSelectedTokens(selectedTokens: any) {
		this.selectedTokens = selectedTokens
	}

	private prePopulateTokenLookupStore(issuers: TokenConfig[]) {
		let collectionIds: { [issuer: string]: boolean } = {}
		issuers.forEach((issuer: TokenConfig, i) => {
			if (!issuer.collectionID) return

			if (issuer.onChain === undefined) issuer.onChain = true

			issuer.collectionID = this.formatCollectionID(issuer.collectionID)

			if (collectionIds[issuer.collectionID] !== undefined) {
				logger(1, `duplicate collectionID key ${issuer.collectionID}, use unique keys per collection.`)
				return
			}

			if ('chain' in issuer) issuer.chain = this.formatCollectionChain(issuer.chain)

			if (this.tokenData[issuer.collectionID] !== undefined) {
				if (this.autoEnableTokens && this.tokenData[issuer.collectionID].tokens?.length)
					this.selectedTokens[issuer.collectionID] = { tokens: this.tokenData[issuer.collectionID].tokens }
			}

			if (!this.tokenLookup[issuer.collectionID]) this.updateTokenLookupStore(issuer.collectionID, issuer, false)

			collectionIds[issuer.collectionID] = issuer.onChain
		})
		this.currentIssuers = collectionIds
	}

	public updateTokenLookupStore(tokenKey: string, data: OnChainTokenConfig | OffChainTokenConfig, save = true) {
		this.tokenLookup[tokenKey] = { ...this.tokenLookup[tokenKey], ...data, timestamp: Date.now() }

		if (save) this.saveTokenStore()
	}

	private formatCollectionChain(chain: string) {
		return chain.toLowerCase()
	}

	private formatCollectionID(collectionID: string) {
		let formatedCollectionID = collectionID

		if (/[A-Z]+/g.test(collectionID) || /\s+/g.test(collectionID)) {
			formatedCollectionID = collectionID.replace(/\s+/g, '-').toLowerCase()

			logger(
				1,
				`Token Negotiator: Spaces or capital letters found in collectionID definition ${collectionID}, this has been re-formatted to ${formatedCollectionID}`,
			)

			collectionID = formatedCollectionID
		}

		return collectionID
	}
}
