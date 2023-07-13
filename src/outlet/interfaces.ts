import { TokenType } from './ticketStorage'

export interface OutletInterface {
	issuers: OutletIssuerInterface[]
	whitelistDialogWidth?: string
	whitelistDialogHeight?: string
	whitelistDialogRenderer?: (permissionTxt: string, acceptBtn: string, denyBtn: string) => string
}

export interface MultiTokenAuthRequest {
	[collectionId: string]: {
		issuerHashes: string[]
		tokenIds: (string | number)[]
	}
}

export interface MultiTokenAuthResult {
	[collectionId: string]: {
		[tokenId: string]: ProofResult
	}
}

export interface OutletIssuerInterface {
	collectionID: string
	title?: string
	tokenOrigin?: string
	attestationOrigin: string
	tokenParser?: any
	base64senderPublicKeys: { [key: string]: string }
	base64attestorPubKey: string
	whitelist?: string[]
	eas?: {
		schemaUid: '0x7f6fb09beb1886d0b223e9f15242961198dd360021b2c9f75ac879c0f786cafd'
		fields: [
			{
				name: 'eventId'
				type: 'string'
			},
			{
				name: 'ticketId'
				type: 'string'
			},
			{
				name: 'ticketClass'
				type: 'uint8'
			},
			{
				name: 'commitment'
				type: 'bytes'
			},
		]
	}
}

export interface ProofResult {
	proof: string
	type: TokenType
	tokenId?: string | number
}
