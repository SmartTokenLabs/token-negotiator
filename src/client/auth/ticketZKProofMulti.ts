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

	async getTokenProofMulti(
		userTokens: any, // { devcon: { requestTokens: [], issuerConfig: {} }, edcon: { ... }
		request: any, //
	): Promise<any> {
		logger(2, 'getTokenProofMulti', userTokens, request)
		// as per limitations described above. We will use the config from this first object.
		const firstCollectionFound = Object.keys(userTokens)[0]
		let redirectMode: false | string =
			request?.options?.useRedirect || shouldUseRedirectMode(this.client.config.offChainRedirectMode) || false
		if (redirectMode) redirectMode = request?.options?.redirectUrl || window.location.href
		let useEthKey: UNInterface | null = null
		if (request.unEndPoint) {
			let unChallenge = new SignedUNChallenge(this.client)
			console.log('...', firstCollectionFound)
			request.options = {
				...request.options,
				unEndPoint: '', // firstCollectionFound.issuerConfig.unEndPoint,
			}
			let unRes = await unChallenge.getTokenProof(request)
			useEthKey = unRes.data as UNInterface
		}
		const useEthKeyAddress = useEthKey ? useEthKey.address : ''
		const address = request.address ? request.address : useEthKeyAddress
		const wallet = request.wallet ? request.wallet : ''
		let data
		if (new URL(request.issuerOrigin).origin === window.location.origin) {
			// userTokens: any, // { devcon: { requestTokens: [], issuerConfig: {} }, edcon: { ... }
			const localOutlet = new LocalOutlet(Object.values(this.client.getTokenStore().getCurrentIssuers(false)) as OffChainTokenConfig[])
			let authInput = { issuerHashes: [], tokens: [] }
			for (const key in userTokens) {
				authInput.issuerHashes.push(createIssuerHashArray(userTokens[key].issuerConfig))
				authInput.tokens.push(userTokens[key].requestTokens)
			}
			logger(2, 'this will break the config is inside each user token key.')
			data = await localOutlet.authenticateMany(
				userTokens.issuerConfig as OffChainTokenConfig & OutletIssuerInterface,
				authInput.issuerHashes,
				authInput.tokens[0], // TODO update to many tokens.
				address,
				wallet,
				redirectMode,
			)
		} else {
			logger(2, 'run OutletAction.GET_PROOF at ', window.location.href)
			console.log('...', firstCollectionFound)
			let res = await this.messaging.sendMessage(
				{
					action: OutletAction.GET_MUTLI_PROOF,
					origin: '', // firstCollectionFound.issuerConfig.tokenOrigin,
					timeout: 0, // Don't time out on this event as it needs active input from the user
					data: {
						tokens: userTokens,
						address: address,
						wallet: wallet,
					},
				},
				request.options.messagingForceTab,
				this.client.getUi(),
				redirectMode,
			)
			if (!res) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						reject(new Error('The outlet failed to load.'))
					}, 30000)
				})
			}
			data = res.data
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
		return {
			data: '',
		}
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
