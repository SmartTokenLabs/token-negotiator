import { URLSearchParams } from 'url'
import { EasTicketAttestation } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'
import { OutletIssuerInterface, readSignedTicket } from './index'
import { KeyPair } from '@tokenscript/attestation/dist/libs/KeyPair'
import { base64ToUint8array, createOffChainCollectionHash, IssuerHashMap } from '../utils'
import { uint8tohex } from '@tokenscript/attestation/dist/libs/utils'
import { Ticket } from '@tokenscript/attestation/dist/Ticket'
import { EAS_RPC_CONFIG } from '../core/eas'
import { OffChainTokenConfig } from '../client/interface'

export type TokenType = 'asn' | 'eas'

export interface StoredTicketRecord {
	/**
	 * The format of the attestation
	 */
	type: TokenType
	/**
	 * The encoded token in base64
	 */
	token: string
	/**
	 * The id (usually email) used for the pedersen commitment
	 */
	id: string
	/**
	 * The secret used to generate the pedersen commitment
	 */
	secret: string
	/**
	 * This is not a UID, rather it is an ID based on conference ID & ticket ID
	 */
	tokenId: string
}

export interface DecodedToken {
	type: TokenType
	record: StoredTicketRecord
	devconId: string
	ticketIdNumber?: number
	ticketIdString?: string
	ticketClass: number
	commitment: Uint8Array
}

interface TicketStorageSchema {
	[collectionHash: string]: StoredTicketRecord[]
}

export interface FilterInterface {
	[key: string]: any
}

export const DEFAULT_EAS_SCHEMA = {
	fields: [
		{ name: 'devconId', type: 'string' },
		{ name: 'ticketIdString', type: 'string' },
		{ name: 'ticketClass', type: 'uint8' },
		{ name: 'commitment', type: 'bytes', isCommitment: true },
	],
}

export class TicketStorage {
	private easManager: EasTicketAttestation

	private ticketCollections: TicketStorageSchema = {}

	private static LOCAL_STORAGE_KEY = 'tn-tokens'

	private signingKeys: { [eventId: string]: KeyPair[] } = {}

	constructor(private issuers: OutletIssuerInterface[] | OffChainTokenConfig[]) {
		this.processSigningKeys()

		this.easManager = new EasTicketAttestation(DEFAULT_EAS_SCHEMA, undefined, EAS_RPC_CONFIG, this.signingKeys)

		this.loadTickets()
	}

	/**
	 * Combine issuer signing keys into a single array for validation
	 * @private
	 */
	private processSigningKeys() {
		if (!this.issuers) return

		for (const issuer of this.issuers) {
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

	public async importTicketFromMagicLink(urlParams: URLSearchParams): Promise<boolean> {
		const tokenFromQuery = decodeURIComponent(urlParams.get('ticket'))
		const secretFromQuery = urlParams.get('secret')
		const idFromQuery = urlParams.has('id') ? urlParams.get('id') : urlParams.get('mail') ?? ''
		const typeFromQuery = (urlParams.has('type') ? urlParams.get('type') : 'asn') as TokenType

		if (!(tokenFromQuery && secretFromQuery)) throw new Error('Incomplete token params in URL.')

		const tokenData = await this.decodeTokenData(typeFromQuery, tokenFromQuery)

		// Check the result for the signing key
		const signingKey = await this.validateTokenData(typeFromQuery, tokenFromQuery)

		const collectionHash = createOffChainCollectionHash(signingKey, tokenData.devconId ?? '')

		return await this.updateOrInsertTicket(collectionHash, {
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
	public async getDecodedTokens(request: IssuerHashMap) {
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

				result[collectionId].push(...tokens)
			}
		}

		return result
	}

	// TODO: This is for authentication and needs to be reworked to support multiple issuers at a time
	public async getStoredTicketFromDecodedToken(issuerHashes: string[], decodedToken: DecodedToken) {
		const tokenId = this.getUniqueTokenId(decodedToken)
		for (const hash of issuerHashes) {
			for (const ticket of this.ticketCollections[hash]) {
				// TODO: Can be removed with multi-outlet
				// Backward compatibility with old data
				if (!ticket.tokenId || !ticket.type) {
					ticket.type = ticket.type ?? 'asn'
					ticket.tokenId = this.getUniqueTokenId(await this.decodeTokenData(ticket.type, ticket.token))
					this.storeTickets()
				}
				if (ticket.tokenId === tokenId) {
					return ticket
				}
			}
		}
		console.log('throw errror, Could not find stored ticket for decoded token.')
		throw new Error('Could not find stored ticket for decoded token.')
	}

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

	private async updateOrInsertTicket(collectionHash: string, tokenRecord: StoredTicketRecord): Promise<boolean> {
		const collectionTickets = this.ticketCollections[collectionHash] ?? []
		for (const [index, ticket] of Object.entries(collectionTickets)) {
			// TODO: Can be removed with multi-outlet
			// Backward compatibility with old data
			if (!ticket.tokenId || !ticket.type) {
				ticket.type = ticket.type ?? 'asn'
				ticket.tokenId = this.getUniqueTokenId(await this.decodeTokenData(ticket.type, ticket.token))
			}
			if (ticket.tokenId === tokenRecord.tokenId) {
				if (JSON.stringify(tokenRecord) === JSON.stringify(ticket[index])) {
					return false
				}
				collectionTickets[index] = tokenRecord
				this.ticketCollections[collectionHash] = collectionTickets
				this.storeTickets()
				return true
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
