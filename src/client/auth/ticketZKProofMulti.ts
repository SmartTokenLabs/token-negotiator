import { AbstractAuthentication, AuthenticationMethodMulti, AuthenticationResult } from './abstractAuthentication'
import { OffChainTokenConfig, MultiTokenInterface, EthRPCMap } from '../interface'
import { OutletAction, Messaging } from '../messaging'
import { SignedUNChallenge } from './signedUNChallenge'
import { UNInterface } from './util/UN'
import { LocalOutlet } from '../../outlet/localOutlet'
import { createIssuerHashArray } from '../../utils'
import { shouldUseRedirectMode } from '../../utils/support/getBrowserData'
import { TicketZKProof } from './ticketZKProof'
import { MultiTokenAuthRequest, MultiTokenAuthResult, OutletIssuerInterface } from 'src/outlet/interfaces'

export class TicketZKProofMulti extends AbstractAuthentication implements AuthenticationMethodMulti {
	TYPE = 'ticketZKProofMulti'

	private messaging = new Messaging()

	// NOTE: A limitation at this time is that the user can only authenticate tokens
	// that use the same issuer origin, email and it's underlying config (see: firstCollectionFound via getTokenProofMulti).

	async getTokenProofMulti(
		tokenOrigin: string,
		tokens: { [issuerName: string]: MultiTokenInterface },
		request: any,
	): Promise<AuthenticationResult> {
		const firstCollectionFound = Object.keys(tokens)[0]

		// const tokenCollectionConfig = tokens[firstCollectionFound].requestTokens[0]
		const issuerCollectionConfig = tokens[firstCollectionFound].issuerConfig
		let redirectMode: false | string = this.getRedirectModeSetting(issuerCollectionConfig, request)
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

		const authRequest: MultiTokenAuthRequest = {}

		for (const issuerName in tokens) {
			authRequest[issuerName] = {
				issuerHashes: createIssuerHashArray(tokens[issuerName].issuerConfig),
				tokenIds: tokens[issuerName].tokenIds,
			}
		}

		let output
		if (new URL(tokenOrigin).origin === window.location.origin) {
			output = await this.authenticateLocally(authRequest, address, wallet, redirectMode, request)
		} else {
			output = await this.authenticateCrossOrigin(tokenOrigin, authRequest, address, wallet, redirectMode, request)
		}

		if (!output || !Object.keys(output)) throw new Error('Failed to get proof from the outlet.')

		return this.validateMultiTokenProof(output, useEthKey)
	}

	async validateMultiTokenProof(proofResult: MultiTokenAuthResult, useEthKey: UNInterface | null = null) {
		let proof: AuthenticationResult = {
			type: this.TYPE,
			data: proofResult,
			target: {
				tokens: [],
			},
		}

		await TicketZKProofMulti.validateProofResult(
			proofResult,
			this.client.getTokenStore().getCurrentIssuers(false) as unknown as OffChainTokenConfig[],
			this.client.config.ethRpcMap,
			useEthKey,
		)

		return proof
	}

	static async validateProofResult(
		proofResult: MultiTokenAuthResult,
		issuerConfig: OffChainTokenConfig[],
		ethRPCMap?: EthRPCMap,
		useEthKey: UNInterface | null = null,
	) {
		for (const issuer in proofResult) {
			for (const tokenId in proofResult[issuer]) {
				const result = proofResult[issuer][tokenId]

				const config = issuerConfig[issuer]

				await TicketZKProof.validateProof(config, result.proof, result.type, ethRPCMap, useEthKey?.address ?? '')
			}
		}
	}

	async authenticateCrossOrigin(
		tokenOrigin: string,
		userTokens: MultiTokenAuthRequest,
		address: string,
		wallet: string,
		redirectMode: string | false,
		request: any,
	) {
		let data = {}
		let res = await this.messaging.sendMessage(
			{
				action: OutletAction.GET_MUTLI_PROOF,
				origin: tokenOrigin,
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
		authRequest: MultiTokenAuthRequest,
		address: string,
		wallet: string,
		redirectMode: false | string,
		_request?: any,
	) {
		const localOutlet = new LocalOutlet({
			issuers: Object.values(this.client.getTokenStore().getCurrentIssuers(false)) as unknown as OutletIssuerInterface[],
			ethRpcMap: this.client.config.ethRpcMap,
			skipEasRevokeCheck: this.client.config.skipEasRevokeCheck,
		})

		return localOutlet.authenticateMany(authRequest, address, wallet, redirectMode)
	}

	getRedirectModeSetting(tokenCollectionConfig, request) {
		let redirectMode: false | string =
			tokenCollectionConfig?.options?.useRedirect || shouldUseRedirectMode(this.client.config.offChainRedirectMode) || false
		if (redirectMode) redirectMode = request?.options?.redirectUrl || window.location.href
		return redirectMode
	}
}
