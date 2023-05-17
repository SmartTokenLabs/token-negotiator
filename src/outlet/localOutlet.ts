import { defaultConfig, OutletInterface, readSignedTicket } from './index'
import { AuthHandler } from './auth-handler'
import { OffChainTokenConfig } from '../client/interface'
import { DecodedToken, TicketStorage } from './ticketStorage'

export class LocalOutlet {
	private tokenConfig
	private ticketStorage: TicketStorage

	constructor(config: OutletInterface & OffChainTokenConfig) {
		this.tokenConfig = Object.assign(defaultConfig, config)

		if (!this.tokenConfig.tokenParser) {
			this.tokenConfig.tokenParser = readSignedTicket
		}

		this.ticketStorage = new TicketStorage(this.tokenConfig)
	}

	async getTokens() {
		return this.ticketStorage.getDecodedTokens(true, this.tokenConfig.filter)
	}

	async authenticate(decodedToken: DecodedToken, address: string, wallet: string, redirectMode: false | string = false) {
		const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedToken(decodedToken)

		let authHandler = new AuthHandler(this.tokenConfig, ticketRecord, decodedToken, address, wallet, redirectMode)

		return await authHandler.authenticate()
	}
}
