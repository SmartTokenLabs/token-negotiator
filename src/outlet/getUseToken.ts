import { DEFAULT_EAS_SCHEMA, StoredTicketRecord } from './ticketStorage'
import { EasZkProof } from '@tokenscript/attestation/dist/eas/EasZkProof'
import { Authenticator } from '@tokenscript/attestation'
import { logger } from '../utils'
import { OutletIssuerInterface, ProofResult } from './interfaces'
import { DEFAULT_RPC_MAP } from '../constants'
import { EthRPCMap } from '../client/interface'

export const getUseToken = async (
	issuerConfig: OutletIssuerInterface,
	attestationBlob: string,
	attestationSecret: string,
	ticketRecord: StoredTicketRecord,
	ethRpcMap?: EthRPCMap,
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
			const schema = issuerConfig.eas ? { fields: issuerConfig.eas.fields } : DEFAULT_EAS_SCHEMA

			const easZkProof = new EasZkProof(schema, { ...DEFAULT_RPC_MAP, ...ethRpcMap })
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
