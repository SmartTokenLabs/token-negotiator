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
		return await authHandler.authenticate()
	}

	async authenticateMany(
		tokenConfig: OutletIssuerInterface,
		issuerKeyHashesAndRequestTokens: any,
		address: string,
		wallet: string,
		redirectMode: false | string = false,
	) {
		const output = []
		for (const key in issuerKeyHashesAndRequestTokens) {
			issuerKeyHashesAndRequestTokens[key].requestTokens.forEach(async (token: any) => {
				output.push(
					await this.authenticate(
						tokenConfig,
						issuerKeyHashesAndRequestTokens[key].issuerHashes,
						token.unsignedToken,
						address,
						wallet,
						redirectMode,
					),
				)
			})
		}
		return output
	}
}
