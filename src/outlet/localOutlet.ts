import { DecodedToken, TicketStorage, TokenType } from './ticketStorage'
import { IssuerHashMap, logger } from '../utils'
import { AttestationIdClient } from './attestationIdClient'
import { getUseToken } from './getUseToken'
import { MultiTokenAuthRequest, MultiTokenAuthResult, OutletIssuerInterface } from './interfaces'

export class LocalOutlet {
	protected ticketStorage: TicketStorage

	constructor(issuers: OutletIssuerInterface[]) {
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
		address?: string,
		wallet?: string,
		redirectMode: false | string = false,
	) {
		const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedTokenOrId(issuerHashes, decodedToken)

		const attestIdClient = new AttestationIdClient(tokenConfig.attestationOrigin)
		const idAttestation = await attestIdClient.getIdentifierAttestation(ticketRecord.id, wallet, address)

		return await getUseToken(tokenConfig, idAttestation.attestation, idAttestation.identifierSecret, ticketRecord)
		// let authHandler = new AuthHandler(tokenConfig, ticketRecord, decodedToken, address, wallet, redirectMode)
		// const output = await authHandler.authenticate()
	}

	async authenticateMany(authRequest: MultiTokenAuthRequest, address: string, wallet: string, redirectMode: false | string = false) {
		// localStorage.setItem(LocalStorageMessaging.TOKEN_AUTH_REQUEST, JSON.stringify(issuerKeyHashesAndRequestTokens))
		const output: MultiTokenAuthResult = {}

		for (const issuer in authRequest) {
			const request = authRequest[issuer]
			for (const tokenId of request.tokenIds) {
				console.log('request: ', request)
				const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedTokenOrId(request.issuerHashes, tokenId.toString())
				const config = this.ticketStorage.getConfigFromIssuerHash(ticketRecord.collectionHash)

				const attestIdClient = new AttestationIdClient(config.attestationOrigin)
				const idAttestation = await attestIdClient.getIdentifierAttestation(ticketRecord.id, wallet, address)

				const useToken = await getUseToken(config, idAttestation.attestation, idAttestation.identifierSecret, ticketRecord)

				if (!output[issuer]) output[issuer] = {}

				output[issuer][ticketRecord.tokenId] = useToken
			}
		}

		/* await Promise.all(
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
		)*/

		return output
	}
}
