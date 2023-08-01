import { DecodedToken, TicketStorage } from './ticketStorage'
import { IssuerHashMap, logger } from '../utils'
import { AttestationIdClient } from './attestationIdClient'
import { getUseToken } from './getUseToken'
import { MultiTokenAuthRequest, MultiTokenAuthResult, OutletInterface, OutletIssuerInterface } from './interfaces'
import { OutletAction } from '../client/messaging'

export class LocalOutlet {
	protected ticketStorage: TicketStorage

	constructor(config: OutletInterface) {
		this.ticketStorage = new TicketStorage(config)
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

		const attestIdClient = new AttestationIdClient(tokenConfig.attestationOrigin, undefined, redirectMode)
		const idAttestation = await attestIdClient.getIdentifierAttestation(ticketRecord.id, wallet, address, {
			action: OutletAction.GET_PROOF,
			issuer: tokenConfig.collectionID,
			token: JSON.stringify(decodedToken),
		})

		return await getUseToken(tokenConfig, idAttestation.attestation, idAttestation.identifierSecret, ticketRecord)
	}

	async authenticateMany(
		authRequest: MultiTokenAuthRequest,
		address?: string,
		wallet?: string,
		redirectMode: false | string = false,
		showIframeCallback?: () => void,
	) {
		const output: MultiTokenAuthResult = {}

		for (const issuer in authRequest) {
			const request = authRequest[issuer]

			// TODO: Create a list of unique emails, then fetch all identifier attestations first before calling getUseToken.
			// This prevents execution of getUseToken before all required ID attestations are stored in localStorage.
			for (const tokenId of request.tokenIds) {
				const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedTokenOrId(request.issuerHashes, tokenId.toString())
				const config = this.ticketStorage.getConfigFromIssuerHash(ticketRecord.collectionHash)

				const attestIdClient = new AttestationIdClient(config.attestationOrigin, showIframeCallback, redirectMode)
				const idAttestation = await attestIdClient.getIdentifierAttestation(ticketRecord.id, wallet, address, {
					localClient: !showIframeCallback,
					action: OutletAction.GET_MUTLI_PROOF,
					tokens: JSON.stringify(authRequest),
				})

				const useToken = await getUseToken(config, idAttestation.attestation, idAttestation.identifierSecret, ticketRecord)

				if (!output[issuer]) output[issuer] = {}

				output[issuer][ticketRecord.tokenId] = useToken
			}
		}

		return output
	}
}
