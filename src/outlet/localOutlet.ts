import { AuthHandler } from './auth-handler'
// import { MultiAuthHandler } from './auth-handler-multi'
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
		// An implementation that can be used to send a multi-request to attestation.id
		// build an array of tokens to authenticate, via a new method called multi-authenticate()
		// The need for this is to create a solution where attestation.id validates
		// a set of off chain tokens from various sub issuers with different email addresses used.
		// let tokens = {}
		// Object.keys(issuerKeyHashesAndRequestTokens).forEach((collectionKey: any) => {
		// 	issuerKeyHashesAndRequestTokens[collectionKey].requestTokens.forEach(async (token: any) => {
		// 		if (!tokens[collectionKey]) tokens[collectionKey] = []
		// 		const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedToken(
		// 			issuerKeyHashesAndRequestTokens[collectionKey].issuerHashes,
		// 			token.unsignedToken,
		// 		)
		// 		tokens[collectionKey].push({
		// 			tokenConfig,
		// 			unsignedToken: token.unsignedToken,
		// 			address,
		// 			wallet,
		// 			redirectMode,
		// 			ticketRecord,
		// 		})
		// 	})
		// })
		// // set up the multi auth class for instantiation
		// let multiAuthHandler = new MultiAuthHandler(tokenConfig, tokens, address, wallet, redirectMode)
		// const output = await multiAuthHandler.authenticateMany()
		// return output

		let output = {}

		await Promise.all(
			Object.keys(issuerKeyHashesAndRequestTokens).map(async (collectionKey: any) => {
				for (const token of issuerKeyHashesAndRequestTokens[collectionKey].requestTokens) {
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
				}
			}),
		)

		// 	issuerKeyHashesAndRequestTokens[collectionKey].requestTokens.forEach(async (token: any) => {
		// 		if (!output[collectionKey]) output[collectionKey] = []
		// 		const auth = await this.authenticate(
		// 			tokenConfig,
		// 			issuerKeyHashesAndRequestTokens[collectionKey].issuerHashes,
		// 			token.unsignedToken,
		// 			address,
		// 			wallet,
		// 			redirectMode,
		// 		)
		// 		output[collectionKey].push(auth)
		// 	})

		// todo see what it would be best to store the tokens. For local and normal modes.
		// local first can be done for testing purposes.
		localStorage.setItem('token-auth-request', JSON.stringify(issuerKeyHashesAndRequestTokens))
		return output
	}
}
