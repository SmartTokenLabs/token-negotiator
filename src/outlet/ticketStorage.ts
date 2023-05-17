import { URLSearchParams } from 'url'
import { EasTicketAttestation } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'
import { OutletInterface } from './index'
import { KeyPair, KeysArray } from '@tokenscript/attestation/dist/libs/KeyPair'
import { base64ToUint8array } from '../utils'
import { uint8tohex } from '@tokenscript/attestation/dist/libs/utils'

export type TokenType = 'asn' | 'eas'

export interface StoredTicketRecord {
	type: TokenType
	token: string
	id: string
	secret: string
	tokenId: string // This is not a UID, rather it is an ID based on conference ID & ticket ID
}

export interface DecodedToken {
	type: TokenType
	devconId: string
	ticketIdNumber?: number
	ticketIdString?: string
	ticketClass: number
	commitment: Uint8Array
}

export interface FilterInterface {
	[key: string]: any
}

export class TicketStorage {
	private keysArray: KeysArray
	private easManager: EasTicketAttestation

	private tickets: StoredTicketRecord[] = []

	constructor(private config: OutletInterface) {
		this.keysArray = KeyPair.parseKeyArrayStrings(this.config.base64senderPublicKeys)

		this.easManager = new EasTicketAttestation(
			{
				fields: [
					{ name: 'devconId', type: 'string' },
					{ name: 'ticketIdString', type: 'string' },
					{ name: 'ticketClass', type: 'uint8' },
					{ name: 'commitment', type: 'bytes', isCommitment: true },
				],
			},
			this.config.eas.config,
			this.config.eas.provider,
			this.keysArray,
		)

		this.loadTickets()
	}

	public async importTicketFromMagicLink(urlParams: URLSearchParams) {
		const tokenFromQuery = decodeURIComponent(urlParams.get(this.config.tokenUrlName))
		const secretFromQuery = urlParams.get(this.config.tokenSecretName)
		const idFromQuery = urlParams.has(this.config.tokenIdName) ? urlParams.get(this.config.tokenIdName) : ''
		const typeFromQuery = (urlParams.has('type') ? urlParams.get('type') : 'asn') as TokenType

		if (!(tokenFromQuery && secretFromQuery)) throw new Error('Incomplete token params in URL.')

		const tokenData = await this.decodeTokenData(typeFromQuery, tokenFromQuery, true)

		await this.updateOrInsertTicket({
			type: typeFromQuery,
			token: tokenFromQuery,
			id: idFromQuery,
			secret: secretFromQuery,
			tokenId: this.getUniqueTokenId(tokenData),
		})
	}

	public async getDecodedTokens(includeSignedToken = false, filter?: FilterInterface) {
		const tokens = await Promise.all(
			this.tickets.map(async (ticket) => {
				const tokenData = await this.decodeTokenData(ticket.type, ticket.token)

				tokenData.type = ticket.type

				return includeSignedToken ? { signedToken: ticket.token, ...tokenData } : tokenData
			}),
		)

		if (filter) return TicketStorage.filterTokens(tokens, filter)

		return tokens
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

	public async getStoredTicketFromDecodedToken(decodedToken: DecodedToken) {
		const tokenId = this.getUniqueTokenId(decodedToken)

		for (const ticket of this.tickets) {
			// Backward compatibility with old data
			if (!ticket.tokenId) {
				ticket.tokenId = this.getUniqueTokenId(await this.decodeTokenData(ticket.type ?? 'asn', ticket.token))
				this.storeTickets()
			}

			if (ticket.tokenId === tokenId) return ticket
		}

		throw new Error('Could not find stored ticket for decoded token.')
	}

	private async decodeTokenData(type: 'eas' | 'asn', token: string, validate = false) {
		let tokenData: DecodedToken

		if (type === 'eas') {
			tokenData = await this.decodeEasToken(token, validate)
		} else {
			tokenData = this.decodeAsnToken(token, validate)
		}

		return tokenData
	}

	private async decodeEasToken(token: string, validate = false) {
		this.easManager.loadFromEncoded(token)

		if (validate) await this.easManager.validateEasAttestation()

		return this.easManager.getAttestationData() as DecodedToken
	}

	private decodeAsnToken(encodedToken: string, validate = false) {
		let decodedToken = new this.config.tokenParser(base64ToUint8array(encodedToken).buffer)

		// TODO: Validate ASN.1 tokens when they are imported
		if (decodedToken && decodedToken[this.config.unsignedTokenDataName]) {
			let token = decodedToken[this.config.unsignedTokenDataName]

			token = this.propsArrayBufferToHex(token)

			return token
		}

		throw new Error('Failed to decode token.')
	}

	private propsArrayBufferToHex(obj: DecodedToken) {
		Object.keys(obj).forEach((key) => {
			if (obj[key] instanceof Uint8Array) {
				obj[key] = '0x' + uint8tohex(new Uint8Array(obj[key]))
			}
		})
		return obj
	}

	private async updateOrInsertTicket(tokenRecord: StoredTicketRecord) {
		for (const [index, token] of this.tickets.entries()) {
			// Backward compatibility with old data
			if (!token.tokenId) {
				token.tokenId = this.getUniqueTokenId(await this.decodeTokenData(token.type ?? 'asn', token.token))
			}

			if (token.tokenId === tokenRecord.tokenId) {
				this.tickets[index] = tokenRecord
				this.storeTickets()
				return
			}
		}

		this.addTicket(tokenRecord)
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
			if (!localStorage.getItem(this.config.itemStorageKey)) return

			this.tickets = JSON.parse(localStorage.getItem(this.config.itemStorageKey)) as unknown as StoredTicketRecord[]
		} catch (e) {
			this.tickets = []
		}
	}

	private storeTickets() {
		localStorage.setItem(this.config.itemStorageKey, JSON.stringify(this.tickets))
	}

	private addTicket(ticket: StoredTicketRecord) {
		this.tickets.push(ticket)
		this.storeTickets()
	}
}
