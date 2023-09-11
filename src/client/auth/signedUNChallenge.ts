import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult, AuthenticationMethodUN } from './abstractAuthentication'
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from '../interface'
import { SafeConnectProvider } from '../../wallet/SafeConnectProvider'
import { UN, UNInterface } from './util/UN'
import { logger } from '../../utils'

export class SignedUNChallenge extends AbstractAuthentication implements AuthenticationMethodUN {
	TYPE = 'signedUN'

	async getTokenProof(request: AuthenticateInterface): Promise<any> {
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

			const isVerified = await UN.verifySignature(unChallenge);
			if (unChallenge.expiration < Date.now() || isVerified) {
				this.deleteProof(address)
				currentProof = null
			}
		} else {
			let walletConnection = connection.provider

			currentProof = {
				type: this.TYPE,
				data: {},
				target: {
					address: address,
				},
			}

			const challenge = await UN.getNewUN(request.options?.unEndPoint)
			challenge.address = address
			let signature

			logger(2, 'challenge', challenge)
			if (walletConnection instanceof SafeConnectProvider) {
				signature = await walletConnection.signUNChallenge(challenge)
			} else {
				signature = await web3WalletProvider.signMessage(address, challenge.messageToSign)
			}

			const publicKeys = connection.meta?.publicKeys
			if (publicKeys?.length) {
				// ultra allows single key only
				challenge.publicKey = publicKeys[0];
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
