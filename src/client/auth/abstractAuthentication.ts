import { AuthenticateInterface, MultiTokenInterface, OffChainTokenConfig, OnChainTokenConfig } from '../interface'
import { Client } from '../index'
import { PROOF_STORAGE_KEY } from '../../constants'

export interface AuthenticationResult {
	type: string
	data: any
	target: {
		address?: string
		tokens?: []
	}
}

export interface AuthenticationMethod {
	TYPE: string
	getTokenProof(
		issuerConfig: OnChainTokenConfig | OffChainTokenConfig,
		tokens: Array<any>,
		request: AuthenticateInterface,
	): Promise<AuthenticationResult>
}

export interface AuthenticationMethodUN {
	TYPE: string
	getTokenProof(request: AuthenticateInterface): Promise<AuthenticationResult>
}

export interface MultiAuthenticateInterface {
	options?: any
}

export interface AuthenticationMethodMulti {
	TYPE: string
	getTokenProofMulti(
		tokenOrigin: string,
		tokens: { [issuerName: string]: MultiTokenInterface },
		options: MultiAuthenticateInterface,
	): Promise<AuthenticationResult>
}

export abstract class AbstractAuthentication {
	public abstract TYPE: string

	protected client: Client

	constructor(client?: Client) {
		this.client = client
	}

	public saveProof(key: string, proof: AuthenticationResult) {
		const challenges = this.getProofs()

		if (!proof) {
			this.deleteProof(key)
			return
		}

		challenges[this.getFullKey(key)] = proof

		localStorage.setItem(PROOF_STORAGE_KEY, JSON.stringify(challenges))
	}

	protected getSavedProof(key: string) {
		const challenges = this.getProofs()
		const fullKey = this.getFullKey(key)

		if (challenges[fullKey]) {
			return challenges[fullKey]
		}

		return null
	}

	protected deleteProof(key: string) {
		const challenges = this.getProofs()
		const fullKey = this.getFullKey(key)

		if (challenges[fullKey]) delete challenges[fullKey]

		localStorage.setItem(PROOF_STORAGE_KEY, JSON.stringify(challenges))
	}

	private getFullKey(key: string) {
		return this.TYPE + '-' + key.toLowerCase()
	}

	private getProofs(): { [key: string]: AuthenticationResult } {
		const data = localStorage.getItem(PROOF_STORAGE_KEY)
		return data?.length ? JSON.parse(data) : {}
	}
}
