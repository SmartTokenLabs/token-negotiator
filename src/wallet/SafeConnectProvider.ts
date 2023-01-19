import { ResponseInterfaceBase } from '../core/messaging'
import { Messaging } from '../client/messaging'
import { KeyStore } from '@tokenscript/attestation/dist/safe-connect/KeyStore'
import { AbstractAuthentication, AuthenticationResult } from '../client/auth/abstractAuthentication'
import { AttestedAddress } from '../client/auth/attestedAddress'
import { UNInterface } from '../client/auth/util/UN'
import { SafeConnectChallenge } from '../client/auth/safeConnectChallenge'
import { UiInterface } from '../client/ui'
import { SafeConnect } from '../client/auth/util/SafeConnect'

export enum SafeConnectAction {
	CONNECT = 'connect',
	NEW_CHALLENGE = 'new_challenge',
}

export type ProofType = 'address_attest' | 'simple_challenge' | 'nft_attest'

export interface SafeConnectOptions {
	url: string
	initialProof: ProofType | false
}

export class SafeConnectProvider {
	private ui: UiInterface
	private keyStore = new KeyStore()
	private readonly options: SafeConnectOptions
	private messaging = new Messaging()

	constructor(ui: UiInterface, options: SafeConnectOptions) {
		this.ui = ui
		this.options = options
	}

	public async initSafeConnect() {
		let res: ResponseInterfaceBase = await this.messaging.sendMessage(
			{
				action: SafeConnectAction.CONNECT,
				origin: this.options.url,
				timeout: 0,
				data: await this.getInitialProofRequest(),
			},
			true,
			this.ui,
		)

		if (!this.options.initialProof) return res.data.address

		let attest = res.data

		this.processProofResult(attest)

		return attest.data?.address
	}

	private processProofResult(attest: any) {
		let proofModel: AbstractAuthentication
		let proofData: AuthenticationResult

		switch (this.options.initialProof) {
			case 'address_attest':
				proofModel = new AttestedAddress()

				proofData = {
					type: proofModel.TYPE,
					data: {
						expiry: attest.expiry,
						...attest.data,
					},
					target: {
						address: attest.data.address,
					},
				}

				proofModel.saveProof(attest.data.address, proofData)

				break

			case 'simple_challenge':
				proofModel = new SafeConnectChallenge()

				proofData = {
					type: proofModel.TYPE,
					data: attest.data,
					target: {
						address: attest.data.address,
					},
				}

				break
		}

		proofModel.saveProof(attest.data.address, proofData)
	}

	private async getInitialProofRequest() {
		let request: { type?: ProofType; subject?: string } = {}

		if (!this.options.initialProof) return

		request.type = this.options.initialProof

		if (this.options.initialProof !== 'simple_challenge') {
			request.subject = await SafeConnect.getLinkPublicKey()
		}

		return request
	}

	public async signUNChallenge(un: UNInterface) {
		let res: ResponseInterfaceBase = await this.messaging.sendMessage(
			{
				action: SafeConnectAction.CONNECT,
				origin: this.options.url,
				timeout: 0,
				data: {
					type: 'signed_un',
					un: encodeURIComponent(JSON.stringify(un)),
				},
			},
			true,
			this.ui,
		)

		return res.data.data.signature
	}
}
