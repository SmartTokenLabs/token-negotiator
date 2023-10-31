import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from './abstractAuthentication'
import { AuthenticateInterface, EthRPCMap, OffChainTokenConfig, OnChainTokenConfig } from '../interface'
import { OutletAction, Messaging } from '../messaging'
import { UNInterface } from './util/UN'
import { createIssuerHashArray, logger } from '../../utils'
import { shouldUseRedirectMode } from '../../utils/support/getBrowserData'
import { OutletIssuerInterface } from '../../outlet/interfaces'
import { DEFAULT_EAS_SCHEMA, TokenType } from '../../outlet/ticketStorage'
import { DEFAULT_RPC_MAP } from '../../constants'

export class TicketZKProof extends AbstractAuthentication implements AuthenticationMethod {
	TYPE = 'ticketZKProof'

	private messaging = new Messaging()

	async getTokenProof(
		issuerConfig: OnChainTokenConfig | OffChainTokenConfig,
		tokens: Array<any>,
		request: AuthenticateInterface,
	): Promise<AuthenticationResult> {
		logger(2, 'getTokenProof request:', request)

		if (issuerConfig.onChain === true) throw new Error(this.TYPE + ' is not available for off-chain tokens.')

		let redirectMode: false | string =
			request?.options?.useRedirect || shouldUseRedirectMode(this.client.config.offChainRedirectMode) || false

		if (redirectMode) redirectMode = request?.options?.redirectUrl || window.location.href

		let useEthKey: UNInterface | null = null

		if (issuerConfig.unEndPoint) {
			const SignedUNChallenge = (await import('./signedUNChallenge')).SignedUNChallenge;
			let unChallenge = new SignedUNChallenge(this.client)
			request.options = {
				...request.options,
				unEndPoint: issuerConfig.unEndPoint,
			}
			let unRes = await unChallenge.getTokenProof(request)
			useEthKey = unRes.data as UNInterface
		}

		const useEthKeyAddress = useEthKey ? useEthKey.address : ''
		const address = request.address ? request.address : useEthKeyAddress
		const wallet = request.wallet ? request.wallet : ''

		let data

		if (new URL(issuerConfig.tokenOrigin).origin === window.location.origin) {
			const localOutlet = new (await import('../../outlet/localOutlet')).LocalOutlet({
				issuers: Object.values(this.client.getTokenStore().getCurrentIssuers(false)) as unknown as OutletIssuerInterface[],
				ethRpcMap: this.client.config.ethRpcMap,
				skipEasRevokeCheck: this.client.config.skipEasRevokeCheck,
			})

			const issuerHashes = createIssuerHashArray(issuerConfig)

			data = await localOutlet.authenticate(
				issuerConfig as OffChainTokenConfig & OutletIssuerInterface,
				issuerHashes,
				tokens[0],
				address,
				wallet,
				redirectMode,
			)
		} else {
			logger(2, 'run OutletAction.GET_PROOF at ', window.location.href)
			let res = await this.messaging.sendMessage(
				{
					action: OutletAction.GET_PROOF,
					origin: issuerConfig.tokenOrigin,
					timeout: 0, // Don't time out on this event as it needs active input from the user
					data: {
						issuer: issuerConfig.collectionID,
						token: tokens[0],
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

		await TicketZKProof.validateProof(issuerConfig, data.proof, data.type, this.client.config.ethRpcMap, useEthKey?.address ?? '')

		if (useEthKey) proof.data.useEthKey = useEthKey

		return proof
	}

	public static async validateProof(
		issuerConfig: OffChainTokenConfig,
		proof: string,
		type: TokenType,
		ethRPCMap?: EthRPCMap,
		ethAddress = '',
	) {
		if (type === 'eas') {
			const schema = issuerConfig.eas ? { fields: issuerConfig.eas.fields } : DEFAULT_EAS_SCHEMA
			const EasZkProof = (await import('@tokenscript/attestation/dist/eas/EasZkProof')).EasZkProof;
			const easZkProof = new EasZkProof(schema, { ...DEFAULT_RPC_MAP, ...ethRPCMap })
			await easZkProof.validateUseTicket(
				proof,
				issuerConfig.base64attestorPubKey,
				issuerConfig.base64senderPublicKeys,
				ethAddress,
				'asn',
				'asn',
			)
		} else {
			const Authenticator = (await import('@tokenscript/attestation')).Authenticator;
			Authenticator.validateUseTicket(proof, issuerConfig.base64attestorPubKey, issuerConfig.base64senderPublicKeys, ethAddress)
		}
	}
}
