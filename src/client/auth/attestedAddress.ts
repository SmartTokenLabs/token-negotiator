import { AbstractAuthentication, AuthenticationMethod, AuthenticationResult } from './abstractAuthentication'
import { AuthenticateInterface, OffChainTokenConfig, OnChainTokenConfig } from '../interface'
import { SafeConnectProvider } from '../../wallet/SafeConnectProvider'
import { ProofRequestInterface, SafeConnect } from './util/SafeConnect'

export class AttestedAddress extends AbstractAuthentication implements AuthenticationMethod {
	TYPE = 'attestedAddress'

	async getTokenProof(
		issuerConfig: OnChainTokenConfig | OffChainTokenConfig,
		_tokens: Array<any>,
		request: AuthenticateInterface,
	): Promise<AuthenticationResult> {
		let web3WalletProvider = await this.client.getWalletProvider()

		if (!web3WalletProvider.safeConnectAvailable()) throw new Error('Safe connect is not available')

		if (!issuerConfig.onChain) throw new Error(this.TYPE + ' is not available for off-chain tokens.')

		if (!request.options?.address) throw new Error('Address attestation requires a secondary address.')

		let wallet = web3WalletProvider.getConnectedWalletData()[0]

		let currentProof: AuthenticationResult | null = this.getSavedProof(wallet.address)

		if (currentProof?.data?.expiry < Date.now()) {
			this.deleteProof(wallet.address)
			currentProof = null
		}

		if (!currentProof) {
			if (wallet.provider instanceof SafeConnectProvider) {
				// This will request and save a new challenge from safe connect
				await wallet.provider.initSafeConnect()
				currentProof = this.getSavedProof(wallet.address)
			} else {
				let challenge = await SafeConnect.getChallenge(web3WalletProvider.safeConnectOptions.url, wallet.address)

				let signature = await web3WalletProvider.signMessage(wallet.address, challenge.messageToSign)

				// this.getUi().showLoader("Issuing Attestation");

				let serverPayload = <ProofRequestInterface>{
					type: 'address_attest',
					subject: await SafeConnect.getLinkPublicKey(),
					address: wallet.address,
					signature: signature,
					/* data: {
						context: data.context
					}*/
				}

				let attest = await SafeConnect.getAttestation(web3WalletProvider.safeConnectOptions.url, serverPayload)

				currentProof = {
					type: this.TYPE,
					data: {
						expiry: attest.expiry,
						...attest.data,
					},
					target: {
						address: attest.data.address,
					},
				}

				this.saveProof(attest.data.address, currentProof)
			}

			if (!currentProof) throw new Error('Could not get address attestation from safe connect')
		}

		let addrAttest = currentProof.data.attestation

		currentProof.data.attestation = await SafeConnect.createAndSignLinkAttestation(
			addrAttest,
			request.options.address,
			await SafeConnect.getLinkPrivateKey(),
		)

		return currentProof
	}
}
