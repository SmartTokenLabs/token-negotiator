import { AbstractAuthentication, AuthenticationMethod, AuthenticationMethodMulti, AuthenticationResult } from './abstractAuthentication'
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from '../interface'
import { OutletAction, Messaging } from '../messaging'
import { Authenticator } from '@tokenscript/attestation'
import { SignedUNChallenge } from './signedUNChallenge'
import { UNInterface } from './util/UN'
import { LocalOutlet } from '../../outlet/localOutlet'
import { OutletIssuerInterface } from '../../outlet'
import { createIssuerHashArray, logger } from '../../utils'
import { shouldUseRedirectMode } from '../../utils/support/getBrowserData'
import { EasZkProof } from '@tokenscript/attestation/dist/eas/EasZkProof'
import { DEFAULT_EAS_SCHEMA, TokenType } from '../../outlet/ticketStorage'
import { EAS_RPC_CONFIG } from '../../core/eas'

export class TicketZKProofMulti extends AbstractAuthentication implements AuthenticationMethodMulti {
	TYPE = 'ticketZKProofMulti'

	private messaging = new Messaging()

	// This is a work in progress to fully support multi-token authentication.
	// For now a user can only validate tokens that use the same key configuration
	// including; UN EndPoint, Token Issuer Origin in a single authentication request.
	// e.g. a user can authenticate 3 tokens from the config that use the same
	// validation method, origin and UN EndPoint.
	// but user cannot validate 2 tokens, from different tokens origing in this single process.

	// method getTokenProofMulti
	// param userTokens { issuer: { requestTokens: [], issuerConfig: {} }, issuer2: { ... }
	// param request { options, ... }
	async getTokenProofMulti(userTokens: any, request: any): Promise<any> {
		const firstCollectionFound = Object.keys(userTokens)[0]
		const tokenCollectionConfig = userTokens[firstCollectionFound].requestTokens[0]
		const issuerCollectionConfig = userTokens[firstCollectionFound].issuerConfig
		let redirectMode: false | string =
			tokenCollectionConfig?.options.useRedirect || shouldUseRedirectMode(this.client.config.offChainRedirectMode) || false
		if (redirectMode) redirectMode = request?.options?.redirectUrl || window.location.href
		let useEthKey: UNInterface | null = null
		if (issuerCollectionConfig?.unEndPoint) {
			let unChallenge = new SignedUNChallenge(this.client)
			request.options = {
				...request.options,
				unEndPoint: issuerCollectionConfig?.unEndPoint,
			}
			let unRes = await unChallenge.getTokenProof(request)
			useEthKey = unRes.data as UNInterface
		}
		const useEthKeyAddress = useEthKey ? useEthKey.address : ''
		const address = request.address ? request.address : useEthKeyAddress
		const wallet = request.wallet ? request.wallet : ''
		let data
		if (new URL(issuerCollectionConfig.tokenOrigin).origin === window.location.origin) {
			const localOutlet = new LocalOutlet(Object.values(this.client.getTokenStore().getCurrentIssuers(false)) as OffChainTokenConfig[])
			let issuerKeyHashesAndRequestTokens = {}
			// e.g. devcon, edcon (when sent from different tokens with the same issuer origin.
			for (const key in userTokens) {
				if (!issuerKeyHashesAndRequestTokens[key]) {
					issuerKeyHashesAndRequestTokens[key] = {
						issuerHashes: createIssuerHashArray(userTokens[key].issuerConfig),
						requestTokens: userTokens[key].requestTokens,
					}
				}
			}
			// TODO Review the implementation above/below - to make sure we send all public keys issuer hashes to the outlet.
			// for (const key in userTokens) {
			// 	if (!issuerKeyHashesAndRequestTokens[key]) {
			// 		issuerKeyHashesAndRequestTokens[key] = { issuerHashes: [], requestTokens: userTokens[key].requestTokens }
			// 	}
			// 	issuerKeyHashesAndRequestTokens[key].issuerHashes.push(createIssuerHashArray(userTokens[key].issuerConfig))
			// }
			data = await localOutlet.authenticateMany(
				issuerCollectionConfig as OffChainTokenConfig & OutletIssuerInterface,
				issuerKeyHashesAndRequestTokens,
				address,
				wallet,
				redirectMode,
			)
		} else {
			// TODO handle the cross origin version of this.
			// logger(2, 'run OutletAction.GET_PROOF at ', window.location.href)
			// console.log('...', firstCollectionFound)
			// let res = await this.messaging.sendMessage(
			// 	{
			// 		action: OutletAction.GET_MUTLI_PROOF,
			// 		origin: '', // firstCollectionFound.issuerConfig.tokenOrigin,
			// 		timeout: 0, // Don't time out on this event as it needs active input from the user
			// 		data: {
			// 			tokens: userTokens,
			// 			address: address,
			// 			wallet: wallet,
			// 		},
			// 	},
			// 	request.options.messagingForceTab,
			// 	this.client.getUi(),
			// 	redirectMode,
			// )
			// if (!res) {
			// 	return new Promise((resolve, reject) => {
			// 		setTimeout(() => {
			// 			reject(new Error('The outlet failed to load.'))
			// 		}, 30000)
			// 	})
			// }
			// data = res.data
		}
		if (!data.proof) throw new Error('Failed to get proof from the outlet.')
		let proof: AuthenticationResult = {
			type: this.TYPE,
			data: data,
			target: {
				tokens: [],
			},
		}
		// TODO update this logic to handle multi-proof
		await TicketZKProofMulti.validateProof(userTokens, data.proof, data.type, useEthKey?.address ?? '')
		if (useEthKey) proof.data.useEthKey = useEthKey
		return proof
	}

	public static async validateProof(issuerConfig: OffChainTokenConfig, proof: string, type: TokenType, ethAddress = '') {
		if (type === 'eas') {
			const easZkProof = new EasZkProof(DEFAULT_EAS_SCHEMA, EAS_RPC_CONFIG)
			await easZkProof.validateUseTicket(proof, issuerConfig.base64attestorPubKey, issuerConfig.base64senderPublicKeys, ethAddress)
		} else {
			Authenticator.validateUseTicket(proof, issuerConfig.base64attestorPubKey, issuerConfig.base64senderPublicKeys, ethAddress)
		}
	}
}
