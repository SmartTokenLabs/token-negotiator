import { AuthHandler } from './auth-handler'
import { DecodedToken, FilterInterface, TicketStorage } from './ticketStorage'
import { IssuerHashMap, logger } from '../utils'
import { OutletIssuerInterface } from './index'
import { URLSearchParams } from 'url'
import { OffChainTokenConfig } from '../client/interface'

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
		// goes to outlet at this point > then to attestation origin.
		// TODO consider instead having a multi-authenticate function? Sending all tokens etc.
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
		await Object.keys(issuerKeyHashesAndRequestTokens).forEach(async (collectionKey: any) => {
			await issuerKeyHashesAndRequestTokens[collectionKey].requestTokens.forEach(async (token: any) => {
				if (!output[collectionKey]) output[collectionKey] = []
				const auth = await this.authenticate(
					tokenConfig,
					issuerKeyHashesAndRequestTokens[collectionKey].issuerHashes,
					token.unsignedToken,
					address,
					wallet,
					redirectMode,
				)
				output[collectionKey].push(auth)
			})
		})
		return await output
	}
}
