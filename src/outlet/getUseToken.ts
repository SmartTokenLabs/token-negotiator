import { DEFAULT_EAS_SCHEMA, StoredTicketRecord } from './ticketStorage'
import { EasZkProof } from '@tokenscript/attestation/dist/eas/EasZkProof'
import { EAS_RPC_CONFIG } from '../core/eas'
import { Authenticator } from '@tokenscript/attestation'
import { logger } from '../utils'
import { OutletIssuerInterface, ProofResult } from './interfaces'

export const getUseToken = async (
	issuerConfig: OutletIssuerInterface,
	attestationBlob: string,
	attestationSecret: string,
	ticketRecord: StoredTicketRecord,
) => {
	try {
		if (!ticketRecord.secret) {
			throw new Error('signedTokenSecret required')
		}
		if (!attestationSecret) {
			throw new Error('attestationSecret required')
		}
		if (!ticketRecord.token) {
			throw new Error('signedTokenBlob required')
		}
		if (!attestationBlob) {
			throw new Error('attestationBlob required')
		}
		if (!issuerConfig.base64attestorPubKey) {
			throw new Error('base64attestorPubKey required')
		}
		if (!issuerConfig.base64senderPublicKeys) {
			throw new Error('base64senderPublicKeys required')
		}

		let useToken

		if (ticketRecord.type === 'eas') {
			const easZkProof = new EasZkProof(DEFAULT_EAS_SCHEMA, EAS_RPC_CONFIG)
			useToken = easZkProof.getUseTicket(
				BigInt(ticketRecord.secret),
				BigInt(attestationSecret),
				ticketRecord.token,
				attestationBlob,
				issuerConfig.base64attestorPubKey,
				issuerConfig.base64senderPublicKeys,
			)
		} else {
			useToken = await Authenticator.getUseTicket(
				BigInt(ticketRecord.secret),
				BigInt(attestationSecret),
				ticketRecord.token,
				attestationBlob,
				issuerConfig.base64attestorPubKey,
				issuerConfig.base64senderPublicKeys,
			)
		}
		if (useToken) {
			return { proof: useToken, type: ticketRecord.type, tokenId: ticketRecord.tokenId } as ProofResult
		} else {
			logger(2, 'this.authResultCallback( empty ): ')
			throw new Error('Empty useToken')
		}
	} catch (e) {
		logger(2, `UseDevconTicket failed.`, e.message)
		logger(3, e)
		throw new Error('Failed to create UseTicket. ' + e.message)
	}
}
