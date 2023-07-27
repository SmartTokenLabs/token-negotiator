import { TokenType } from './ticketStorage'
import { AbiFieldTypes } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'

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
	base64attestorPubKey: string // TODO: Remove - only required in outlet
	whitelist?: string[]
	eas?: EasSchemaConfig
}

export interface EasSchemaConfig {
	schemaUid: string
	// Defined the fields used to calculate a unique token ID.
	idFields: string[]
	fields: EasFieldDefinition[]
}

export interface EasFieldDefinition {
	name: string
	label?: string
	type: AbiFieldTypes | string // TODO: Change type in attestation library
}

export interface ProofResult {
	proof: string
	type: TokenType
	tokenId?: string | number
}
