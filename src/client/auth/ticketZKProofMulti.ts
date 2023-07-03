import { AbstractAuthentication, AuthenticationMethodMulti, AuthenticationResult } from './abstractAuthentication'
import { OffChainTokenConfig, MultiTokenInterface } from '../interface'
import { OutletAction, Messaging } from '../messaging'
import { Authenticator } from '@tokenscript/attestation'
import { SignedUNChallenge } from './signedUNChallenge'
import { UNInterface } from './util/UN'
import { LocalOutlet } from '../../outlet/localOutlet'
import { OutletIssuerInterface } from '../../outlet'
import { createIssuerHashArray } from '../../utils'
import { shouldUseRedirectMode } from '../../utils/support/getBrowserData'
import { EasZkProof } from '@tokenscript/attestation/dist/eas/EasZkProof'
import { DEFAULT_EAS_SCHEMA, TokenType } from '../../outlet/ticketStorage'
import { EAS_RPC_CONFIG } from '../../core/eas'

export class TicketZKProofMulti extends AbstractAuthentication implements AuthenticationMethodMulti {
	TYPE = 'ticketZKProofMulti'

	private messaging = new Messaging()

	// NOTE: A limitation at this time is that the user can only authenticate tokens
	// that use the same issuer origin, email and it's underlying config (see: firstCollectionFound via getTokenProofMulti).

	async getTokenProofMulti(userTokens: MultiTokenInterface[], request: any): Promise<AuthenticationResult> {
		const firstCollectionFound = Object.keys(userTokens)[0]
		const tokenCollectionConfig = userTokens[firstCollectionFound].requestTokens[0]
		const issuerCollectionConfig = userTokens[firstCollectionFound].issuerConfig
		let redirectMode: false | string = this.getRedirectModeSetting(tokenCollectionConfig, request)
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
		let output
		if (new URL(issuerCollectionConfig.tokenOrigin).origin === window.location.origin) {
			output = await this.authenticateLocally(userTokens, issuerCollectionConfig, address, wallet, redirectMode)
		} else {
			output = await this.authenticateCrossOrigin(issuerCollectionConfig, userTokens, address, wallet, request, redirectMode)
		}
		if (!output || !Object.keys(output)) throw new Error('Failed to get proof from the outlet.')
		return this.validateMultiTokenProof(output, issuerCollectionConfig, useEthKey)
	}

	async validateMultiTokenProof(data: any, issuerCollectionConfig: OffChainTokenConfig, useEthKey: UNInterface | null = null) {
		let proof: AuthenticationResult = {
			type: this.TYPE,
			data: data,
			target: {
				tokens: [],
			},
		}
		if (Object.keys(data)) {
			await Promise.all(
				Object.keys(data).map(async (collectionKey) => {
					for (const [index, value] of data[collectionKey].entries()) {
						await TicketZKProofMulti.validateProof(issuerCollectionConfig, value.proof, value.type, useEthKey?.address ?? '')
						if (useEthKey) proof.data[collectionKey][index].useEthKey = useEthKey
					}
				}),
			)
		}
		return proof
	}

	async authenticateCrossOrigin(
		issuerCollectionConfig: OffChainTokenConfig,
		userTokens: MultiTokenInterface[],
		address: string,
		wallet: string,
		request,
		redirectMode: string | false,
	) {
		let data = {}
		let res = await this.messaging.sendMessage(
			{
				action: OutletAction.GET_MUTLI_PROOF,
				origin: issuerCollectionConfig.tokenOrigin,
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
		return data
	}

	async authenticateLocally(
		userTokens: MultiTokenInterface[],
		issuerCollectionConfig: OffChainTokenConfig,
		address: string,
		wallet: string,
		redirectMode: false | string,
	) {
		const localOutlet = new LocalOutlet(Object.values(this.client.getTokenStore().getCurrentIssuers(false)) as OffChainTokenConfig[])
		let issuerKeyHashesAndRequestTokens = {}
		for (const key in userTokens) {
			if (!issuerKeyHashesAndRequestTokens[key]) {
				issuerKeyHashesAndRequestTokens[key] = {
					issuerHashes: createIssuerHashArray(userTokens[key].issuerConfig),
					requestTokens: userTokens[key].requestTokens,
				}
			}
		}
		return localOutlet.authenticateMany(
			issuerCollectionConfig as OffChainTokenConfig & OutletIssuerInterface,
			issuerKeyHashesAndRequestTokens,
			address,
			wallet,
			redirectMode,
		)
	}

	getRedirectModeSetting(tokenCollectionConfig, request) {
		let redirectMode: false | string =
			tokenCollectionConfig?.options?.useRedirect || shouldUseRedirectMode(this.client.config.offChainRedirectMode) || false
		if (redirectMode) redirectMode = request?.options?.redirectUrl || window.location.href
		return redirectMode
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
