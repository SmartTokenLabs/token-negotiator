import { URLSearchParams } from 'url'
import { EasTicketAttestation, TicketSchema } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'
import { KeyPair } from '@tokenscript/attestation/dist/libs/KeyPair'
import { base64ToUint8array, createIssuerHashArray, createOffChainCollectionHash, IssuerHashMap, logger } from '../utils'
import { uint8tohex } from '@tokenscript/attestation/dist/libs/utils'
import { Ticket } from '@tokenscript/attestation/dist/Ticket'
import { EAS_RPC_CONFIG } from '../core/eas'
import { EasFieldDefinition, OutletIssuerInterface } from './interfaces'
import { SignedDevconTicket } from '@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket'
import { AsnParser } from '@peculiar/asn1-schema'
import { decodeBase64ZippedBase64 } from '@tokenscript/attestation/dist/eas/AttestationUrl'
import { SignedOffchainAttestation } from '@ethereum-attestation-service/eas-sdk/dist/offchain/offchain'

export type TokenType = 'asn' | 'eas'

export class readSignedTicket {
	ticket: any
	constructor(source: Uint8Array) {
		const signedDevconTicket: SignedDevconTicket = AsnParser.parse(source, SignedDevconTicket)

		this.ticket = signedDevconTicket.ticket

		logger(3, this.ticket)
	}
}

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

// This data returned to clients has additional meta information
export type DecodedToken = DecodedTokenData & {
	type: TokenType
	tokenId: string
	signedToken: string
}

export interface DecodedTokenData {
	tokenId?: string
	eventId?: string
	ticketId?: string | number
	ticketClass?: number
	commitment?: Uint8Array
	easAttestation?: SignedOffchainAttestation
	easData?: EasFieldData
}

export interface DecodedTokenDataNewAndLegacy {
	tokenId?: string
	eventId?: string
	ticketId?: string | number
	ticketIdString?: string
	ticketIdNumber?: number
	ticketClass?: number
	commitment?: Uint8Array
	easAttestation?: SignedOffchainAttestation
	easData?: EasFieldData
}

export interface EasFieldData {
	[key: string]: {
		// Arbitrary token data for custom schemas
		label: string
		value: never
	}
}

interface TicketStorageSchema {
	[collectionHash: string]: StoredTicketRecord[]
}

export interface FilterInterface {
	[key: string]: any
}

export const DEFAULT_EAS_SCHEMA: TicketSchema = {
	fields: [
		{ name: 'eventId', type: 'string' },
		{ name: 'ticketId', type: 'string' },
		{ name: 'ticketClass', type: 'uint8' },
		{ name: 'commitment', type: 'bytes', isCommitment: true },
	],
}

export class TicketStorage {
	// private easManager: EasTicketAttestation

	private ticketCollections: TicketStorageSchema = {}

	private issuerHashConfigIndex?: { [hash: string]: OutletIssuerInterface }

	private static LOCAL_STORAGE_KEY = 'tn-tokens'

	private signingKeys: { [eventId: string]: KeyPair[] } = {}

	constructor(private issuers: OutletIssuerInterface[]) {
		this.processSigningKeys()

		// this.easManager = new EasTicketAttestation(DEFAULT_EAS_SCHEMA, undefined, EAS_RPC_CONFIG, this.signingKeys)

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

	private getIssuerHashIndex() {
		if (!this.issuerHashConfigIndex) {
			this.issuerHashConfigIndex = {}
			for (const issuer of this.issuers) {
				for (const hash of createIssuerHashArray(issuer)) {
					this.issuerHashConfigIndex[hash] = issuer
				}
			}
		}

		return this.issuerHashConfigIndex
	}

	public getConfigFromIssuerHash(hash: string) {
		const configIndex = this.getIssuerHashIndex()
		return configIndex[hash]
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

		const collectionHash = createOffChainCollectionHash(signingKey, tokenData.eventId ?? '', tokenData.easAttestation.message.schema)

		return await this.updateOrInsertTicket(collectionHash, {
			type: typeFromQuery,
			token: tokenFromQuery,
			id: idFromQuery,
			secret: secretFromQuery,
			tokenId: tokenData.tokenId,
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

						return <DecodedToken>{
							type: ticket.type,
							tokenId: ticket.tokenId,
							signedToken: ticket.token,
							...tokenData,
						}
					}),
				)

				result[collectionId].push(...tokens)
			}
		}

		return result
	}

	public async getStoredTicketFromDecodedTokenOrId(issuerHashes: string[], decodedTokenOrId: DecodedToken | string) {
		const tokenId = typeof decodedTokenOrId === 'string' ? decodedTokenOrId : decodedTokenOrId.tokenId

		for (const hash of issuerHashes) {
			for (const ticket of this.ticketCollections[hash]) {
				// Backward compatibility with old data
				if (!ticket.tokenId || !ticket.type) {
					ticket.type = ticket.type ?? 'asn'

					const decodedToken = await this.decodeTokenData(ticket.type, ticket.token)
					ticket.tokenId = decodedToken.tokenId
					this.storeTickets()
				}
				if (ticket.tokenId === tokenId) {
					return {
						collectionHash: hash,
						...ticket,
					}
				}
			}
		}
		throw new Error('Could not find stored ticket for decoded token or ID.')
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
			const { easManager } = this.getEasManagerAndFieldLabelsForToken(token)

			easManager.loadFromEncoded(token)

			await easManager.validateEasAttestation()

			return easManager.getSignerKeyPair()
		} else {
			const ticket = Ticket.fromBase64(token, this.signingKeys)

			return ticket.getKey()
		}
	}

	private async decodeTokenData(type: TokenType, token: string) {
		let tokenData: DecodedTokenData

		if (type === 'eas') {
			const { fieldDefinition, idFields, easManager } = this.getEasManagerAndFieldLabelsForToken(token)

			easManager.loadFromEncoded(token)

			const easAttest = easManager.getEasJson()
			const easData = easManager.getAttestationData() as any

			const easFieldData = {}

			for (const fieldDef of fieldDefinition) {
				easFieldData[fieldDef.name] = {
					label: fieldDef.label ?? fieldDef.name,
					value: easData[fieldDef.name],
				}
			}

			tokenData = this.assignTicketId(easData)

			tokenData = {
				ticketId: easData.ticketId,
				eventId: easData.eventId,
				ticketClass: easData.ticketClass,
				commitment: easData.commitment,
				easAttestation: easAttest.sig,
				easData: easFieldData,
			}

			tokenData.tokenId = this.getUniqueTokenId(tokenData, idFields)
		} else {
			// TODO: Use ticket class instead?
			let decodedToken = new readSignedTicket(base64ToUint8array(token))

			// TODO: Validate ASN.1 tokens when they are imported
			if (!decodedToken || !decodedToken['ticket']) throw new Error('Failed to decode token.')

			tokenData = this.propsArrayBufferToHex(decodedToken['ticket'])

			tokenData = this.assignTicketId(tokenData)

			tokenData.tokenId = this.getUniqueTokenId(tokenData)
		}

		return tokenData
	}

	private assignTicketId(tokenData: DecodedTokenDataNewAndLegacy) {
		if (!tokenData.ticketId) {
			tokenData.ticketId = tokenData.ticketIdString ?? tokenData.ticketIdNumber
			delete tokenData.ticketIdString
			delete tokenData.ticketIdNumber
		}
		return tokenData
	}

	private getEasManagerAndFieldLabelsForToken(token: string) {
		// Decode attestation URL = EAS JSON data
		const decoded = decodeBase64ZippedBase64(token)
		const schemaUid = decoded.sig.message.schema

		let schemaConfig: {
			fields: EasFieldDefinition[]
		}

		let idFields: string[] | undefined

		if (
			schemaUid !== '0x0000000000000000000000000000000000000000000000000000000000000000' &&
			schemaUid !== '0x7f6fb09beb1886d0b223e9f15242961198dd360021b2c9f75ac879c0f786cafd'
		) {
			let issuerConfig

			// Once we have decoded the URL, we have a schema ID
			for (const config of this.issuers) {
				if (config.eas?.schemaUid === schemaUid) issuerConfig = config
			}

			if (!issuerConfig) throw new Error('Schema configuration is not defined')

			schemaConfig = { fields: issuerConfig.eas.fields }
			idFields = issuerConfig.eas.idFields
		} else {
			schemaConfig = DEFAULT_EAS_SCHEMA
		}

		const fieldDefinition = []

		for (const fieldDef of schemaConfig.fields) {
			fieldDefinition.push({
				name: fieldDef.name,
				label: fieldDef.label ?? fieldDef.name,
			})
		}

		return {
			fieldDefinition: fieldDefinition,
			idFields,
			easManager: new EasTicketAttestation(schemaConfig, undefined, EAS_RPC_CONFIG, this.signingKeys),
		}
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
				const decodedToken = await this.decodeTokenData(ticket.type, ticket.token)
				ticket.tokenId = decodedToken.tokenId
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
	private getUniqueTokenId(decodedToken: DecodedTokenData, idFields?: string[]) {
		if (idFields) {
			const parts = []
			for (const field of idFields) parts.push(decodedToken.easData[field].value)
			return parts.join('-')
		}

		return `${decodedToken.eventId}-${decodedToken.ticketId}`
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
