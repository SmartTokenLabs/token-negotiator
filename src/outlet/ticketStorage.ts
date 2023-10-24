import {
	EasTicketAttestation,
	SchemaField,
	SignedOffchainAttestation,
	decodeBase64ZippedBase64,
} from '@tokenscript/attestation/dist/eas/EasTicketAttestation'
import { KeyPair } from '@tokenscript/attestation/dist/libs/KeyPair'
import { base64ToUint8array, createIssuerHashArray, createOffChainCollectionHash, errorHandler, IssuerHashMap, logger } from '../utils'
import { Ticket } from '@tokenscript/attestation/dist/Ticket'
import { EasFieldDefinition, OutletInterface, OutletIssuerInterface } from './interfaces'
import { DevconTicket, SignedDevconTicket } from '@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket'
import { AsnParser } from '@peculiar/asn1-schema'
import { DEFAULT_RPC_MAP, LOCAL_STORAGE_TOKEN_KEY } from '../constants'
import { TokenStore } from '../client/tokenStore'
export type TokenType = 'asn' | 'eas'

export class readSignedTicket {
	ticket: DevconTicket
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
	image?: string
}

export interface DecodedTokenData {
	tokenId?: string
	eventId?: string
	ticketId?: string | number | bigint
	ticketClass?: number
	commitment?: Uint8Array
	easAttestation?: SignedOffchainAttestation
	easData?: EasFieldData
	image?: string
}

export interface EasFieldData {
	[key: string]: {
		// Arbitrary token data for custom schemas
		label: string
		value: never
	}
}

interface TicketStorageSchema {
	[collectionHash: string]: Array<StoredTicketRecord>
}

export interface FilterInterface {
	[key: string]: any
}

export const DEFAULT_EAS_SCHEMA: { fields: (SchemaField & { label?: string })[] } = {
	fields: [
		{ name: 'eventId', type: 'string', label: 'Event ID' },
		{ name: 'ticketId', type: 'string', label: 'Ticket ID' },
		{ name: 'ticketClass', type: 'uint8', label: 'Ticket Class' },
		{ name: 'commitment', type: 'bytes', isCommitment: true, label: 'Email commitment' },
	],
}

export const DEFAULT_SCHEMA_UIDS = [
	'0x0000000000000000000000000000000000000000000000000000000000000000',
	// string eventId,string ticketId,uint8 ticketClass,bytes commitment
	'0x7f6fb09beb1886d0b223e9f15242961198dd360021b2c9f75ac879c0f786cafd',
	// string devconId,string ticketIdString,uint8 ticketClass,bytes commitment
	'0x0630f3342772bf31b669bdbc05af0e9e986cf16458f292dfd3b57564b3dc3247',
]

export class TicketStorage {
	private ticketCollections: TicketStorageSchema = {}

	private issuerHashConfigIndex?: { [hash: string]: OutletIssuerInterface }

	private signingKeys: { [eventId: string]: KeyPair[] } = {}

	constructor(private config: OutletInterface) {
		this.processSigningKeys()
		this.loadTickets()
	}

	/**
	 * Combine issuer signing keys into a single array for validation
	 * @private
	 */
	private processSigningKeys() {
		if (!this.config.issuers) return

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

	private getIssuerHashIndex() {
		if (!this.issuerHashConfigIndex) {
			this.issuerHashConfigIndex = {}
			for (const issuer of this.config.issuers) {
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

		if (!tokenFromQuery || !secretFromQuery) throw new Error('Incomplete token params in URL.')

		const tokenData = await this.decodeTokenData(typeFromQuery, tokenFromQuery)

		// Check the result for the signing key
		const signingKey = await this.validateTokenData(typeFromQuery, tokenFromQuery)

		const collectionHash = createOffChainCollectionHash(signingKey, tokenData.eventId ?? '', tokenData?.easAttestation?.message?.schema)

		return await this.updateOrInsertTicket(collectionHash, {
			type: typeFromQuery,
			token: tokenFromQuery,
			id: idFromQuery,
			secret: secretFromQuery,
			tokenId: tokenData.tokenId,
		})
	}

	public deleteTicketByDecodedTokenOrId(collectionId: string, decodedTokenOrId: DecodedToken | string) {
		const config = this.config.issuers.find((issuer) => issuer.collectionID === collectionId)
		const hashes = createIssuerHashArray(config)
		const tokenId = typeof decodedTokenOrId === 'string' ? decodedTokenOrId : decodedTokenOrId.tokenId

		for (const hash of hashes) {
			for (let i = 0; i < this.ticketCollections[hash].length; i++) {
				if (tokenId === this.ticketCollections[hash][0].tokenId) {
					this.ticketCollections[hash].splice(i, 1)
					this.storeTickets()
					return true
				}
			}
		}

		return false
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
							collectionId: collectionId,
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
	 * @param skipRevokeCheck
	 * @return The keypair used to sign the token
	 * @private
	 */
	private async validateTokenData(type: TokenType, token: string) {
		if (type === 'eas') {
			const { easManager } = this.getEasManagerAndFieldLabelsForToken(token)

			easManager.loadFromEncoded(token)

			await easManager.validateEasAttestation(this.config.skipEasRevokeCheck)

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
			let decodedToken = new readSignedTicket(base64ToUint8array(token))

			// TODO: Validate ASN.1 tokens when they are imported
			if (!decodedToken || !decodedToken.ticket) throw new Error('Failed to decode token.')

			const ticket = decodedToken.ticket

			tokenData = {
				eventId: ticket.devconId,
				ticketId: ticket.ticketIdString ?? ticket.ticketIdNumber.valueOf(),
				ticketClass: ticket.ticketClass,
				commitment: ticket.commitment,
			}

			tokenData.tokenId = this.getUniqueTokenId(tokenData)
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

		if (DEFAULT_SCHEMA_UIDS.indexOf(schemaUid) === -1) {
			let issuerConfig

			// Once we have decoded the URL, we have a schema ID
			for (const config of this.config.issuers) {
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
			easManager: new EasTicketAttestation(schemaConfig, undefined, { ...DEFAULT_RPC_MAP, ...this.config.ethRpcMap }, this.signingKeys),
		}
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
			if (!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) return
			this.ticketCollections = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) as unknown as TicketStorageSchema
		} catch (e) {
			this.ticketCollections = {}
		}
	}

	private storeTickets() {
		localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(this.ticketCollections))
	}

	public migrateLegacyTokenStorage(tokenStorageKey = 'dcTokens') {
		const storageData = localStorage.getItem(tokenStorageKey)
		if (storageData) {
			let tokens = JSON.parse(storageData)
			if (!tokens) {
				errorHandler('Failed to migrate token data.', 'error', null, null, true, false)
				return
			}
			let failedAttempt = false
			for (const tokenObj of tokens) {
				try {
					const { id, mail, secret, token, ticket, type } = tokenObj
					const params = new URLSearchParams({
						ticket: token ?? ticket,
						secret: secret,
						id: id ?? mail,
						type: type ?? 'asn',
					})
					this.importTicketFromMagicLink(params)
				} catch (e) {
					failedAttempt = true
				}
			}
			if (!failedAttempt) {
				localStorage.removeItem(tokenStorageKey)
				// enforce the update of tokens in storage
				// to utilise the latest via the main copy inside the outlet.
				const tokenStore = new TokenStore(true, 600)
				tokenStore.clearTokenStore()
			}
		}
	}
}
