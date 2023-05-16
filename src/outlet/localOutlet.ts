import { defaultConfig, OutletInterface, readSignedTicket } from './index'
import { AuthHandler } from './auth-handler'
import { OffChainTokenConfig } from '../client/interface'
import { TicketStorage } from './ticketStorage'

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

	async authenticate(unsignedToken: any, address: string, wallet: string, redirectMode: false | string = false) {
		// let tokenObj = await rawTokenCheck(unsignedToken, this.tokenConfig)

		const tokenObj = await this.ticketStorage.getStoredTicketFromDecodedToken(unsignedToken)

		let authHandler = new AuthHandler(
			null,
			null,
			this.tokenConfig,
			{ token: tokenObj.token, secret: tokenObj.secret },
			address,
			wallet,
			redirectMode,
			unsignedToken,
		)

		return await authHandler.authenticate()
	}
}
