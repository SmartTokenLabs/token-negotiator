import { AuthHandler } from './auth-handler'
import { DecodedToken, FilterInterface, TicketStorage } from './ticketStorage'
import { IssuerHashMap, logger } from '../utils'
import { OutletIssuerInterface } from './index'
import { URLSearchParams } from 'url'

export class LocalOutlet {
	private ticketStorage = new TicketStorage()

	public async readMagicLink(urlParams: URLSearchParams) {
		try {
			await this.ticketStorage.importTicketFromMagicLink(urlParams)

			const event = new Event('tokensupdated')

			document.body.dispatchEvent(event)
		} catch (e) {
			logger(2, e)
		}
	}

	async getTokens(request: IssuerHashMap, filter?: FilterInterface) {
		return this.ticketStorage.getDecodedTokens(request, filter)
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
}
