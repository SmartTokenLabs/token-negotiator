import { decodeTokens, filterTokens, rawTokenCheck } from '../core'
import { AuthHandler } from './auth-handler'
import { AbstractOutlet } from './abstractOutlet'
import { removeUrlSearchParams } from '../utils'

export class LocalOutlet extends AbstractOutlet {
	getTokens() {
		const storageTokens = localStorage.getItem(this.tokenConfig.itemStorageKey)

		if (!storageTokens) return []

		const decodedTokens = decodeTokens(storageTokens, this.tokenConfig.tokenParser, this.tokenConfig.unsignedTokenDataName, true)

		return filterTokens(decodedTokens, this.tokenConfig.filter)
	}

	async authenticate(unsignedToken: any, address: string, wallet: string, redirectMode: false | string = false) {
		let tokenObj = await rawTokenCheck(unsignedToken, this.tokenConfig)

		let authHandler = new AuthHandler(null, null, this.tokenConfig, tokenObj, address, wallet, redirectMode, unsignedToken)

		return await authHandler.authenticate()
	}

	async processAttestationCallback() {
		const issuer = this.getDataFromQuery('issuer')

		try {
			const useToken = await this.processAttestationIdCallback()

			// Same origin request, emit event
			this.dispatchAuthCallbackEvent(issuer, useToken, null)
		} catch (e: any) {
			this.dispatchAuthCallbackEvent(issuer, null, e.message)
		}

		document.location.hash = removeUrlSearchParams(this.urlParams, ['attestation', 'requestSecret', 'address', 'wallet']).toString()
	}
}
