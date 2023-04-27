import {
	rawTokenCheck,
	readTokenFromMagicUrl,
	storeMagicURL,
	decodeTokens,
	decodeToken,
	filterTokens,
	readTokens,
	OffChainTokenData,
	DecodedToken,
} from '../core'
import { logger, requiredParams, removeUrlSearchParams } from '../utils'
import { OutletAction, OutletResponseAction } from '../client/messaging'
import { AuthHandler } from './auth-handler'
import { SignedDevconTicket } from '@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket'
import { AsnParser } from '@peculiar/asn1-schema'
import { ResponseActionBase, ResponseInterfaceBase, URLNS } from '../core/messaging'

export interface OutletInterface {
	collectionID: string
	title?: string
	attestationOrigin: string
	attestationInTab?: boolean
	tokenParser?: any
	base64senderPublicKeys: { [key: string]: string }
	base64attestorPubKey: string
	signedTokenWhitelist?: string[]

	whitelistDialogWidth: string
	whitelistDialogHeight: string
	whitelistDialogRenderer?: (permissionTxt: string, acceptBtn: string, denyBtn: string) => string

	tokenUrlName?: string
	tokenSecretName?: string
	tokenIdName?: string
	unsignedTokenDataName?: string
	itemStorageKey?: string
	tokenOrigin?: string
}

export const defaultConfig = {
	tokenUrlName: 'ticket',
	tokenSecretName: 'secret',
	tokenIdName: 'mail',
	unsignedTokenDataName: 'ticket',
	itemStorageKey: 'dcTokens',
	signedTokenWhitelist: [],
	whitelistDialogWidth: '450px',
	whitelistDialogHeight: '350px',
}

export class readSignedTicket {
	ticket: any
	constructor(source: Uint8Array) {
		const signedDevconTicket: SignedDevconTicket = AsnParser.parse(source, SignedDevconTicket)

		this.ticket = signedDevconTicket.ticket

		logger(3, this.ticket)
	}
}

export class Outlet {
	tokenConfig: OutletInterface
	urlParams?: URLSearchParams

	singleUse = false

	redirectCallbackUrl?: URL

	constructor(config: OutletInterface, singleUse = false, urlParams: any = null) {
		this.tokenConfig = Object.assign(defaultConfig, config)
		this.singleUse = singleUse

		if (!this.tokenConfig.tokenParser) {
			this.tokenConfig.tokenParser = readSignedTicket
		}

		this.tokenConfig.signedTokenWhitelist = this.tokenConfig.signedTokenWhitelist.map((origin) => {
			try {
				return new URL(origin).origin
			} catch (e) {
				logger(2, 'Failed to validate whitelist origin: ' + e.message)
			}
		})

		if (urlParams) {
			this.urlParams = urlParams
		} else {
			let params = window.location.hash.length > 1 ? '?' + window.location.hash.substring(1) : window.location.search
			this.urlParams = new URLSearchParams(params)
		}

		if (!this.singleUse) {
			this.pageOnLoadEventHandler()
		}
	}

	getDataFromQuery(itemKey: string, namespaced = true): string {
		itemKey = (namespaced ? URLNS : '') + itemKey
		return this.urlParams ? this.urlParams.get(itemKey) : ''
	}

	getFilter() {
		const filter = this.getDataFromQuery('filter')
		return filter ? JSON.parse(filter) : {}
	}

	async pageOnLoadEventHandler() {
		const evtid = this.getDataFromQuery('evtid')
		const action = this.getDataFromQuery('action')
		const access = this.getDataFromQuery('access')

		const requester = this.getDataFromQuery('requestor')

		if (requester) this.redirectCallbackUrl = new URL(requester)

		logger(2, 'Outlet received event ID ' + evtid + ' action ' + action + ' at ' + document.location.href)

		// TODO: should issuer be validated against requested issuer?

		try {
			switch (action) {
				case OutletAction.GET_ISSUER_TOKENS: {
					await this.whitelistCheck(evtid, access === 'write' ? 'write' : 'read')

					this.sendTokens(evtid)

					break
				}
				case OutletAction.EMAIL_ATTEST_CALLBACK: {
					const requesterURL = this.redirectCallbackUrl
					const issuer = this.getDataFromQuery('issuer')

					try {
						const tokenString = this.getDataFromQuery('token')
						let token = JSON.parse(tokenString)

						const attestationBlob = this.getDataFromQuery('attestation', false)
						const attestationSecret = '0x' + this.getDataFromQuery('requestSecret', false)

						let authHandler = new AuthHandler(
							this,
							evtid,
							this.tokenConfig,
							await rawTokenCheck(token, this.tokenConfig),
							null,
							null,
							false,
						)

						const useToken = await authHandler.getUseToken(attestationBlob, attestationSecret)

						if (requesterURL) {
							const params = new URLSearchParams(requesterURL.hash.substring(1))
							params.set(URLNS + 'action', 'proof-callback')
							params.set(URLNS + 'issuer', issuer)
							params.set(URLNS + 'attestation', useToken as string)

							// TODO: Remove once https://github.com/AlphaWallet/attestation.id/pull/196 is merged
							params.delete('email')
							params.delete('#email')

							let outlet = new Outlet(this.tokenConfig, true)
							let issuerTokens = outlet.prepareTokenOutput({})

							logger(2, 'issuerTokens: ', issuerTokens)

							params.set(URLNS + 'tokens', JSON.stringify(issuerTokens))

							requesterURL.hash = params.toString()

							document.location.href = requesterURL.href

							return
						}

						this.dispatchAuthCallbackEvent(issuer, useToken, null)
					} catch (e: any) {
						if (requesterURL) return this.proofRedirectError(issuer, e.message)

						this.dispatchAuthCallbackEvent(issuer, null, e.message)
					}

					document.location.hash = removeUrlSearchParams(this.urlParams, ['attestation', 'requestSecret', 'address', 'wallet']).toString()

					break
				}
				case OutletAction.GET_PROOF: {
					const token: string = this.getDataFromQuery('token')
					const wallet: string = this.getDataFromQuery('wallet')
					const address: string = this.getDataFromQuery('address')
					requiredParams(token, 'unsigned token is missing')
					this.sendTokenProof(evtid, token, address, wallet)
					break
				}
				default: {
					// TODO: Remove singleUse - this is only needed in negotiator that calls readMagicLink.
					//  move single link somewhere that it can be used by both Outlet & LocalOutlet
					if (!this.singleUse) {
						await this.whitelistCheck(evtid, 'write')
						await this.readMagicLink()
						this.sendTokens(evtid)
					}

					break
				}
			}
		} catch (e: any) {
			console.error(e)
			this.sendErrorResponse(evtid, e?.message ?? e, this.getDataFromQuery('issuer'))
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

			if (newTokenId === tokenId) {
				existingTokens[index] = newToken
				return existingTokens
			}
		}

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

	private dispatchAuthCallbackEvent(issuer: string, proof?: string, error?: string) {
		const event = new CustomEvent('auth-callback', {
			detail: {
				proof: proof,
				issuer: issuer,
				error: error,
			},
		})

		window.dispatchEvent(event)
	}

	private async whitelistCheck(evtid, whiteListType: 'read' | 'write') {
		if ((!window.parent && !window.opener) || !document.referrer) return

		const origin = new URL(document.referrer).origin

		if (origin === document.location.origin) return

		let accessWhitelist = JSON.parse(localStorage.getItem('tn-whitelist')) ?? {}

		// TODO: Storage access API no longer gives access to localStorage in firefox, only cookies like Safari
		//		I'm keeping this here in case chrome implements state partitioning in the same way as Firefox
		//		originally did. If chrome goes the way of Mozilla & Apple then this can be removed
		// const storageAccessRequired = document.hasStorageAccess && !(await document.hasStorageAccess())

		const needsPermission =
			this.tokenConfig.signedTokenWhitelist.indexOf(origin) === -1 &&
			(!accessWhitelist[origin] || (accessWhitelist[origin].type === 'read' && whiteListType === 'write'))

		if (needsPermission /* || storageAccessRequired */) {
			return new Promise<void>((resolve, reject) => {
				const typeTxt = whiteListType === 'read' ? 'read' : 'read & write'
				const permissionTxt = `${origin} is requesting ${typeTxt} access to your ${this.tokenConfig.title} tickets`
				const acceptBtn = '<button style="cursor: pointer" id="tn-access-accept">Accept</button>'
				const denyBtn = '<button style="cursor: pointer" id="tn-access-deny">Deny</button>'

				const content = this.tokenConfig.whitelistDialogRenderer
					? this.tokenConfig.whitelistDialogRenderer(permissionTxt, acceptBtn, denyBtn)
					: `
						<div style="font-family: sans-serif; text-align: center; position: absolute; width: 100vw; min-height: 100vh;top: 0;
						left: 0;
						background: #0C0A50;
						z-index: 99999;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						color: #fff;
						padding: 30px;
						font-size: 24px;
						line-height: 1.2;">
							<p>${permissionTxt}</p>
							<div>
							${acceptBtn}
							${denyBtn}
							</div>
						</div>
					`

				document.body.insertAdjacentHTML('beforeend', content)

				document.getElementById('tn-access-accept').addEventListener('click', async () => {
					if (!accessWhitelist[origin] || whiteListType !== accessWhitelist[origin].type) {
						accessWhitelist[origin] = {
							type: whiteListType,
						}
						localStorage.setItem('tn-whitelist', JSON.stringify(accessWhitelist))
					}

					resolve()
				})

				document.getElementById('tn-access-deny').addEventListener('click', () => {
					reject('USER_ABORT')
				})

				this.sendMessageResponse({
					evtid,
					evt: ResponseActionBase.SHOW_FRAME,
					max_width: this.tokenConfig.whitelistDialogWidth,
					min_height: this.tokenConfig.whitelistDialogHeight,
				})
			})
		}
	}

	prepareTokenOutput(filter: any) {
		const storageTokens = localStorage.getItem(this.tokenConfig.itemStorageKey)

		if (!storageTokens) return []

		let includeSigned = false

		if (this.tokenConfig.signedTokenWhitelist?.length && this.tokenConfig.signedTokenWhitelist.indexOf(this.getRequestOrigin()) > -1) {
			includeSigned = true
		}

		const decodedTokens = decodeTokens(storageTokens, this.tokenConfig.tokenParser, this.tokenConfig.unsignedTokenDataName, includeSigned)

		return filterTokens(decodedTokens, filter)
	}

	async sendTokenProof(evtid: any, token: any, address: string, wallet: string) {
		if (!token) return 'error'

		const unsignedToken = JSON.parse(token)

		const redirect = this.getDataFromQuery('redirect') === 'true' ? document.location.href : false

		try {
			let tokenObj = await rawTokenCheck(unsignedToken, this.tokenConfig)

			let authHandler = new AuthHandler(this, evtid, this.tokenConfig, tokenObj, address, wallet, redirect, unsignedToken)

			let tokenProof = await authHandler.authenticate()

			this.sendMessageResponse({
				evtid: evtid,
				evt: OutletResponseAction.PROOF,
				data: {
					issuer: this.tokenConfig.collectionID,
					proof: tokenProof,
				},
			})
		} catch (e: any) {
			logger(2, e)

			if (redirect) return this.proofRedirectError(this.getDataFromQuery('issuer'), e.message)

			this.sendErrorResponse(evtid, e.message)
		}
	}

	private getRequestOrigin() {
		const requester = document.referrer

		if (!requester) return null

		try {
			return new URL(requester).origin
		} catch (e) {
			return null
		}
	}

	// TODO: Consolidate redirect callback for tokens, proof & errors into the sendMessageResponse function to remove duplication
	private sendTokens(evtid: any) {
		let issuerTokens = this.prepareTokenOutput(this.getFilter())

		logger(2, 'issuerTokens: (Outlet.sendTokens)', issuerTokens)

		if (this.redirectCallbackUrl) {
			try {
				let url = this.redirectCallbackUrl

				const params = new URLSearchParams(url.hash.substring(1))
				params.set(URLNS + 'action', OutletAction.GET_ISSUER_TOKENS + '-response')
				params.set(URLNS + 'issuer', this.tokenConfig.collectionID)
				params.set(URLNS + 'tokens', JSON.stringify(issuerTokens))

				url.hash = '#' + params.toString()

				let requesterURL = url.href

				logger(2, 'tokens ready. go to: ', requesterURL)

				document.location.href = requesterURL

				return
			} catch (e) {
				logger(2, 'Requestor redirect Error. ', e)
			}
		}

		this.sendMessageResponse({
			evtid: evtid,
			evt: OutletResponseAction.ISSUER_TOKENS,
			data: {
				issuer: this.tokenConfig.collectionID,
				tokens: issuerTokens,
			},
		})
	}

	public sendErrorResponse(evtid: any, error: string, issuer?: string) {
		if (this.redirectCallbackUrl) {
			let url = this.redirectCallbackUrl

			const params = new URLSearchParams(url.hash.substring(1))
			params.set(URLNS + 'action', ResponseActionBase.ERROR)
			params.set(URLNS + 'issuer', issuer)
			params.set(URLNS + 'error', error)

			url.hash = '#' + params.toString()

			document.location.href = url.href
			return
		}

		this.sendMessageResponse({
			evtid: evtid,
			evt: ResponseActionBase.ERROR,
			errors: [error],
		})
	}

	public proofRedirectError(issuer: string, error: string) {
		const requesterURL = this.redirectCallbackUrl.href

		const params = new URLSearchParams()
		params.set(URLNS + 'action', 'proof-callback')
		params.set(URLNS + 'issuer', issuer)
		params.set(URLNS + 'error', error)

		document.location.href = requesterURL + '#' + params.toString()
	}

	private isSameOrigin() {
		try {
			let tokenUrl = new URL(this.tokenConfig.tokenOrigin)
			if (tokenUrl.origin === document.location.origin) {
				return true
			} else {
				return false
			}
		} catch (e) {
			return false
		}
	}

	public sendMessageResponse(response: ResponseInterfaceBase) {
		if (!document.referrer) {
			return
		}

		let target

		if (window.opener && window.opener !== window) {
			target = window.opener
		} else if (window.parent !== window) {
			target = window.parent
		}

		if (target) {
			target.postMessage(response, '*')
		}

		// TODO: this is probably no longer needed as brave is set to always use redirect mode now
		if (!this.isSameOrigin()) {
			let style = `
				background: #eee;
				padding: 10px;
				color: #000;
				display: inline-block;
				border-radius: 4px;
				font-size: 1.2em;
				box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
			`
			let div = document.createElement('div')
			div.innerHTML = 'Data sent. Please close the tab and back to main app.'
			div.setAttribute('style', style)
			document.body.appendChild(div)
		}
	}
}
