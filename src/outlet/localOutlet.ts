import { AuthHandler } from './auth-handler'
import { DecodedToken, TicketStorage } from './ticketStorage'
import { IssuerHashMap, logger } from '../utils'
import { OutletIssuerInterface } from './index'
import { URLSearchParams } from 'url'
import { OffChainTokenConfig } from '../client/interface'
import { LocalStorageMessaging } from './../client/messaging'

export class LocalOutlet {
	private ticketStorage: TicketStorage

	constructor(issuers: OffChainTokenConfig[]) {
		this.ticketStorage = new TicketStorage(issuers)
	}

	public async readMagicLink(urlParams: URLSearchParams) {
		try {
			await this.ticketStorage.importTicketFromMagicLink(urlParams)
			const event = new Event('tokensupdated')
			document.body.dispatchEvent(event)
		} catch (e) {
			logger(2, e)
		}
	}

	async getTokens(request: IssuerHashMap) {
		return this.ticketStorage.getDecodedTokens(request)
	}

	async authenticate(
		tokenConfig: OutletIssuerInterface,
		issuerHashes: string[],
		decodedToken: DecodedToken,
		address: string,
		wallet: string,
		redirectMode: false | string = false,
	) {
		const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedToken(issuerHashes, decodedToken)
		let authHandler = new AuthHandler(tokenConfig, ticketRecord, decodedToken, address, wallet, redirectMode)
		const output = await authHandler.authenticate()
		return output
	}

	async authenticateMany(
		tokenConfig: OutletIssuerInterface,
		issuerKeyHashesAndRequestTokens: any,
		address: string,
		wallet: string,
		redirectMode: false | string = false,
	) {
		let output = {}
		await Promise.all(
			Object.keys(issuerKeyHashesAndRequestTokens).map(async (collectionKey: any) => {
				for (const token of issuerKeyHashesAndRequestTokens[collectionKey].requestTokens) {
					if (!output[collectionKey]) output[collectionKey] = []
					const auth = await this.authenticate(
						issuerKeyHashesAndRequestTokens[collectionKey].issuerConfig,
						issuerKeyHashesAndRequestTokens[collectionKey].issuerHashes,
						token.unsignedToken,
						address,
						wallet,
						redirectMode,
					)
					output[collectionKey].push(auth)
				}
			}),
		)
		localStorage.setItem(LocalStorageMessaging.TOKEN_AUTH_REQUEST, JSON.stringify(issuerKeyHashesAndRequestTokens))
		return output
	}
}
