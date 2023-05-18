import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from './abstractAuthentication'
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from '../interface'
import { OutletAction, Messaging } from '../messaging'
import { Authenticator } from '@tokenscript/attestation'
import { SignedUNChallenge } from './signedUNChallenge'
import { UNInterface } from './util/UN'
import { LocalOutlet } from '../../outlet/localOutlet'
import { OutletInterface } from '../../outlet'
import { logger } from '../../utils'
import { shouldUseRedirectMode } from '../../utils/support/getBrowserData'

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

		if (redirectMode) redirectMode = request?.options?.redirectUrl || document.location.href

		let useEthKey: UNInterface | null = null

		if (issuerConfig.unEndPoint) {
			let unChallenge = new SignedUNChallenge(this.client)
			request.options = {
				...request.options,
				unEndPoint: issuerConfig.unEndPoint,
			}
			let unRes = await unChallenge.getTokenProof(issuerConfig, tokens, request)
			useEthKey = unRes.data as UNInterface
		}

		const useEthKeyAddress = useEthKey ? useEthKey.address : ''
		const address = request.address ? request.address : useEthKeyAddress
		const wallet = request.wallet ? request.wallet : ''

		let data

		if (new URL(issuerConfig.tokenOrigin).origin === document.location.origin) {
			const localOutlet = new LocalOutlet(issuerConfig as OffChainTokenConfig & OutletInterface)

			data = {}
			data.proof = await localOutlet.authenticate(tokens[0], address, wallet, redirectMode)
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

		if (useEthKey) {
			Authenticator.validateUseTicket(
				data.proof,
				issuerConfig.base64attestorPubKey,
				issuerConfig.base64senderPublicKeys,
				useEthKey.address ?? '',
			)

			proof.data.useEthKey = useEthKey
		}

		return proof
	}
}
