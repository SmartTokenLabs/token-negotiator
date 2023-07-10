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
}

export interface ProofResult {
	proof: string
	type: TokenType
	tokenId?: string | number
}
