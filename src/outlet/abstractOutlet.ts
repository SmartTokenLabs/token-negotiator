import { defaultConfig, OutletInterface, readSignedTicket } from './index'
import { OffChainTokenConfig } from '../client/interface'
import { DecodedToken, decodeToken, OffChainTokenData, rawTokenCheck, readTokenFromMagicUrl, readTokens, storeMagicURL } from '../core'
import { Authenticator } from '@tokenscript/attestation'
import { logger } from '../utils'
import { URLNS } from '../core/messaging'

export abstract class AbstractOutlet {
	protected tokenConfig
	protected urlParams

	constructor(config: OutletInterface | (OutletInterface & OffChainTokenConfig), urlParams: URLSearchParams = null) {
		this.tokenConfig = Object.assign(defaultConfig, config)

		// set default tokenReader
		if (!this.tokenConfig.tokenParser) {
			this.tokenConfig.tokenParser = readSignedTicket
		}

		if (urlParams) {
			this.urlParams = urlParams
		} else {
			let params = window.location.hash.length > 1 ? '?' + window.location.hash.substring(1) : window.location.search
			this.urlParams = new URLSearchParams(params)
		}
	}

	public async readMagicLink() {
		const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = this.tokenConfig

		try {
			const newToken = readTokenFromMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, this.urlParams)
			let tokensOutput = readTokens(itemStorageKey)

			const newTokens = this.mergeNewToken(newToken, tokensOutput.tokens)

			if (newTokens !== false) {
				storeMagicURL(newTokens, itemStorageKey)
			}

			const event = new Event('tokensupdated')

			// Dispatch the event to force negotiator to reread tokens.
			// MagicLinkReader part of Outlet usually works in the parent window, same as Client, so it use same document
			document.body.dispatchEvent(event)
		} catch (e) {
			console.warn(e)
		}
	}

	/**
	 * Merges a new magic link into the existing token data. If a token is found with the same ID it is overwritten.
	 * @private
	 * @returns false when no changes to the data are required - the token is already added
	 */
	public mergeNewToken(newToken: OffChainTokenData, existingTokens: OffChainTokenData[]): OffChainTokenData[] | false {
		const decodedNewToken = decodeToken(newToken, this.tokenConfig.tokenParser, this.tokenConfig.unsignedTokenDataName, false)

		const newTokenId = this.getUniqueTokenId(decodedNewToken)

		for (const [index, tokenData] of existingTokens.entries()) {
			// Nothing required, this token already exists
			if (tokenData.token === newToken.token) {
				return false
			}

			const decodedTokenData = decodeToken(tokenData, this.tokenConfig.tokenParser, this.tokenConfig.unsignedTokenDataName, false)

			const tokenId = this.getUniqueTokenId(decodedTokenData)

			// Overwrite existing token
			if (newTokenId === tokenId) {
				existingTokens[index] = newToken
				return existingTokens
			}
		}

		// Add as new token
		existingTokens.push(newToken)
		return existingTokens
	}

	/**
	 * Calculates a unique token ID to identify this ticket. Tickets can be reissued and have a different commitment, but are still the same token
	 * @private
	 */
	private getUniqueTokenId(decodedToken: DecodedToken) {
		return `${decodedToken.devconId}-${decodedToken.ticketIdNumber ?? decodedToken.ticketIdString}`
	}

	getDataFromQuery(itemKey: string, namespaced = true): string {
		itemKey = (namespaced ? URLNS : '') + itemKey
		return this.urlParams ? this.urlParams.get(itemKey) : ''
	}

	public async processAttestationIdCallback() {
		const tokenString = this.getDataFromQuery('token')
		let token = JSON.parse(tokenString)

		// Note: these params come from attestation.id and are not namespaced
		const attestationBlob = this.getDataFromQuery('attestation', false)
		const attestationSecret = '0x' + this.getDataFromQuery('requestSecret', false)

		const tokenObj = await rawTokenCheck(token, this.tokenConfig)

		return await this.getUseToken(attestationBlob, attestationSecret, tokenObj)
	}

	public async getUseToken(attestationBlob: any, attestationSecret: any, tokenObj) {
		try {
			if (!tokenObj.signedTokenSecret) {
				throw new Error('signedTokenSecret required')
			}
			if (!attestationSecret) {
				throw new Error('attestationSecret required')
			}
			if (!tokenObj.signedTokenBlob) {
				throw new Error('signedTokenBlob required')
			}
			if (!attestationBlob) {
				throw new Error('attestationBlob required')
			}
			if (!this.tokenConfig.base64attestorPubKey) {
				throw new Error('base64attestorPubKey required')
			}
			if (!this.tokenConfig.base64senderPublicKeys) {
				throw new Error('base64senderPublicKeys required')
			}

			let useToken = await Authenticator.getUseTicket(
				tokenObj.signedTokenSecret,
				attestationSecret,
				tokenObj.signedTokenBlob,
				attestationBlob,
				this.tokenConfig.base64attestorPubKey,
				this.tokenConfig.base64senderPublicKeys,
			)

			if (useToken) {
				logger(2, 'this.authResultCallback( useToken ): ')
				return useToken
			} else {
				logger(2, 'this.authResultCallback( empty ): ')
				throw new Error('Empty useToken')
			}
		} catch (e) {
			logger(2, `UseDevconTicket failed.`, e.message)
			logger(3, e)
			throw new Error('Failed to create UseTicket. ' + e.message)
		}
	}

	protected dispatchAuthCallbackEvent(issuer: string, proof?: string, error?: string) {
		const event = new CustomEvent('auth-callback', {
			detail: {
				proof: proof,
				issuer: issuer,
				error: error,
			},
		})

		window.dispatchEvent(event)
	}
}
