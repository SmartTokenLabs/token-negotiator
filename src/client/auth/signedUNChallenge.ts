import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from './abstractAuthentication'
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from '../interface'
import { SafeConnectProvider } from '../../wallet/SafeConnectProvider'
import { UN, UNInterface } from './util/UN'
import { logger } from '../../utils'

export class SignedUNChallenge extends AbstractAuthentication implements AuthenticationMethod {
	TYPE = 'signedUN'
	private static DEFAULT_ENDPOINT = 'https://attestation-verify.tokenscript.org/un'

	async getTokenProof(
		_issuerConfig: OnChainTokenConfig | OffChainTokenConfig,
		_tokens: Array<any>,
		request: AuthenticateInterface,
	): Promise<AuthenticationResult> {
		let web3WalletProvider = await this.client.getWalletProvider()

		// TODO: Update once Flow & Solana signing support is added
		let connection = web3WalletProvider.getSingleSignatureCompatibleConnection()
		if (!connection) {
			throw new Error('WALLET_REQUIRED')
		}

		let address = connection.address

		if (!address) {
			throw new Error('WALLET_ADDRESS_REQUIRED')
		}

		let currentProof: AuthenticationResult | null = this.getSavedProof(address)

		if (currentProof) {
			let unChallenge = currentProof?.data as UNInterface

			if (unChallenge.expiration < Date.now() || !UN.verifySignature(unChallenge)) {
				this.deleteProof(address)
				currentProof = null
			}
		}

		if (!currentProof) {
			let walletConnection = connection.provider

			currentProof = {
				type: this.TYPE,
				data: {},
				target: {
					address: address,
				},
			}

			let endpoint = request.options?.unEndPoint ?? SignedUNChallenge.DEFAULT_ENDPOINT

			const challenge = await UN.getNewUN(endpoint)
			challenge.address = address
			let signature

			logger(2, 'challenge', challenge)
			if (walletConnection instanceof SafeConnectProvider) {
				signature = await walletConnection.signUNChallenge(challenge)
			} else {
				signature = await web3WalletProvider.signMessage(address, challenge.messageToSign)
			}

			challenge.signature = signature
			challenge.blockchain = connection.blockchain
			if (!(await UN.verifySignature(challenge))) {
				throw new Error('Address signature is invalid')
			}

			currentProof.data = challenge

			this.saveProof(address, currentProof)
		}

		return currentProof
	}
}
