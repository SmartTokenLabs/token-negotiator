import { URLSearchParams } from 'url'
import { EasTicketAttestation } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'
import { readSignedTicket } from '../index'
import { KeyPair } from '@tokenscript/attestation/dist/libs/KeyPair'
import { base64ToUint8array, createOffChainCollectionHash, IssuerHashMap } from '../../utils'
import { uint8tohex } from '@tokenscript/attestation/dist/libs/utils'
import { DecodedToken, DEFAULT_EAS_SCHEMA, FilterInterface, StoredTicketRecord, TokenType } from '../ticketStorage'
import { Ticket } from '@tokenscript/attestation/dist/Ticket'
import { MultiOutletInterface } from './index'
import { EAS_RPC_CONFIG } from '../../core/eas'

interface TicketStorageSchema {
	[collectionHash: string]: StoredTicketRecord[]
}

export class TicketStorage {
	private easManager: EasTicketAttestation

	private ticketCollections: TicketStorageSchema = {}

	private static LOCAL_STORAGE_KEY = 'tn-tokens'

	private signingKeys: { [eventId: string]: KeyPair[] } = {}

	constructor(private config: MultiOutletInterface) {
		this.processSigningKeys()

		this.easManager = new EasTicketAttestation(DEFAULT_EAS_SCHEMA, undefined, EAS_RPC_CONFIG, this.signingKeys)

		this.loadTickets()
	}

	/**
	 * Combine issuer signing keys into a single array for validation
	 * @private
	 */
	private processSigningKeys() {
		for (const issuer of this.config.issuers) {
			const keys = KeyPair.parseKeyArrayStrings(issuer.base64senderPublicKeys)

			for (const eventId in keys) {
				if (!this.signingKeys[eventId]) this.signingKeys[eventId] = []

				const eventKeys = keys[eventId]

				if (Array.isArray(eventKeys)) {
					this.signingKeys[eventId].push(...eventKeys)
				} else {
					this.signingKeys[eventId].push(eventKeys)
				}
			}
		}
	}

	public async importTicketFromMagicLink(urlParams: URLSearchParams) {
		// TODO: Remove these and replace with static config
		const tokenFromQuery = decodeURIComponent(urlParams.get('ticket'))
		const secretFromQuery = urlParams.get('secret')
		const idFromQuery = urlParams.has('id') ? urlParams.get('id') : ''
		const typeFromQuery = (urlParams.has('type') ? urlParams.get('type') : 'asn') as TokenType

		if (!(tokenFromQuery && secretFromQuery)) throw new Error('Incomplete token params in URL.')

		const tokenData = await this.decodeTokenData(typeFromQuery, tokenFromQuery)

		// Check the result for the signing key
		const signingKey = await this.validateTokenData(typeFromQuery, tokenFromQuery)

		const collectionHash = createOffChainCollectionHash(signingKey, tokenData.devconId ?? '')

		await this.updateOrInsertTicket(collectionHash, {
			type: typeFromQuery,
			token: tokenFromQuery,
			id: idFromQuery,
			secret: secretFromQuery,
			tokenId: this.getUniqueTokenId(tokenData),
		})
	}

	/**
	 * Take in a request of collection hashes and return the returns, keyed by client provided ID
	 * @param request
	 * @param filter
	 */
	public async getDecodedTokens(request: IssuerHashMap, filter?: FilterInterface) {
		const result: { [collectionId: string]: DecodedToken[] } = {}

		for (const collectionId in request) {
			result[collectionId] = []

			const collectionHashes = request[collectionId]

			for (const hash of collectionHashes) {
				if (!this.ticketCollections[hash]) continue

				let tokens = await Promise.all(
					this.ticketCollections[hash].map(async (ticket) => {
						const tokenData = await this.decodeTokenData(ticket.type, ticket.token)
						return <DecodedToken>{ type: ticket.type, signedToken: ticket.token, ...tokenData }
					}),
				)

				if (filter) tokens = TicketStorage.filterTokens(tokens, filter)

				result[collectionId].push(...tokens)
			}
		}

		return result
	}

	private static filterTokens(decodedTokens: DecodedToken[], filter: FilterInterface = {}) {
		let res: DecodedToken[] = []

		if (decodedTokens.length && typeof filter === 'object' && Object.keys(filter).length) {
			let filterKeys = Object.keys(filter)

			decodedTokens.forEach((token: DecodedToken) => {
				let fitFilter = 1

				filterKeys.forEach((key) => {
					if (token[key] && token[key].toString() !== filter[key].toString()) fitFilter = 0
				})

				if (fitFilter) res.push(token)
			})

			return res
		} else {
			return decodedTokens
		}
	}

	// TODO: This is for authentication and needs to be reworked to support multiple issuers
	/* public async getStoredTicketFromDecodedToken(decodedToken: DecodedToken) {

		const tokenId = this.getUniqueTokenId(decodedToken)

		for (const ticket of this.ticketCollections) {

			// TODO: Can be removed with multi-outlet
			// Backward compatibility with old data
			if (!ticket.tokenId || !ticket.type) {
				ticket.type = ticket.type ?? 'asn'
				ticket.tokenId = this.getUniqueTokenId(await this.decodeTokenData(ticket.type, ticket.token))
				this.storeTickets()
			}

			if (ticket.tokenId === tokenId) return ticket
		}

		throw new Error('Could not find stored ticket for decoded token.')
	}*/

	/**
	 * Validate token against all possible public keys
	 * @param type
	 * @param token
	 * @return The keypair used to sign the token
	 * @private
	 */
	private async validateTokenData(type: TokenType, token: string) {
		if (type === 'eas') {
			this.easManager.loadFromEncoded(token)

			await this.easManager.validateEasAttestation()

			return this.easManager.getSignerKeyPair()
		} else {
			const ticket = Ticket.fromBase64(token, this.signingKeys)

			return ticket.getKey()
		}
	}

	private async decodeTokenData(type: TokenType, token: string) {
		let tokenData: DecodedToken

		if (type === 'eas') {
			this.easManager.loadFromEncoded(token)

			tokenData = this.easManager.getAttestationData() as DecodedToken
		} else {
			// TODO: Use ticket class instead?
			let decodedToken = new readSignedTicket(base64ToUint8array(token))

			// TODO: Validate ASN.1 tokens when they are imported
			if (!decodedToken || !decodedToken['ticket']) throw new Error('Failed to decode token.')

			tokenData = this.propsArrayBufferToHex(decodedToken['ticket'])
		}

		return tokenData
	}

	private propsArrayBufferToHex(obj: DecodedToken) {
		Object.keys(obj).forEach((key) => {
			if (obj[key] instanceof Uint8Array) {
				obj[key] = '0x' + uint8tohex(new Uint8Array(obj[key]))
			}
		})
		return obj
	}

	private async updateOrInsertTicket(collectionHash: string, tokenRecord: StoredTicketRecord) {
		const collectionTickets = this.ticketCollections[collectionHash] ?? []

		for (const [index, ticket] of Object.entries(collectionTickets)) {
			// TODO: Can be removed with multi-outlet
			// Backward compatibility with old data
			if (!ticket.tokenId || !ticket.type) {
				ticket.type = ticket.type ?? 'asn'
				ticket.tokenId = this.getUniqueTokenId(await this.decodeTokenData(ticket.type, ticket.token))
			}

			if (ticket.tokenId === tokenRecord.tokenId) {
				collectionTickets[index] = tokenRecord
				this.ticketCollections[collectionHash] = collectionTickets
				this.storeTickets()
				return
			}
		}

		collectionTickets.push(tokenRecord)
		this.ticketCollections[collectionHash] = collectionTickets
		this.storeTickets()
	}

	/**
	 * Calculates a unique token ID to identify this ticket. Tickets can be reissued and have a different commitment, but are still the same token
	 * @private
	 */
	private getUniqueTokenId(decodedToken: DecodedToken) {
		return `${decodedToken.devconId}-${decodedToken.ticketIdNumber ?? decodedToken.ticketIdString}`
	}

	private loadTickets() {
		try {
			if (!localStorage.getItem(TicketStorage.LOCAL_STORAGE_KEY)) return

			this.ticketCollections = JSON.parse(localStorage.getItem(TicketStorage.LOCAL_STORAGE_KEY)) as unknown as TicketStorageSchema
		} catch (e) {
			this.ticketCollections = {}
		}
	}

	private storeTickets() {
		localStorage.setItem(TicketStorage.LOCAL_STORAGE_KEY, JSON.stringify(this.ticketCollections))
	}
}
