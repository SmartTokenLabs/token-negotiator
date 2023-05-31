import { createIssuerHashArray, logger, removeUrlSearchParams, requiredParams } from '../utils'
import { ResponseActionBase, ResponseInterfaceBase, URLNS } from '../core/messaging'
import { OutletAction, OutletResponseAction } from '../client/messaging'
import { AuthHandler, ProofResult } from './auth-handler'
import { DecodedToken, TicketStorage } from './ticketStorage'
import { SignedDevconTicket } from '@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket'
import { AsnParser } from '@peculiar/asn1-schema'

export interface OutletIssuerInterface {
	collectionID: string
	title?: string
	tokenOrigin?: string
	attestationOrigin: string
	tokenParser?: any
	base64senderPublicKeys: { [key: string]: string }
	base64attestorPubKey: string
	// signedTokenWhitelist?: string[]
}

export interface OutletInterface {
	issuers: OutletIssuerInterface[]

	whitelistDialogWidth?: string
	whitelistDialogHeight?: string
	whitelistDialogRenderer?: (permissionTxt: string, acceptBtn: string, denyBtn: string) => string

	// TODO: Move to token specific config
	signedTokenWhitelist?: string[]
}

export const defaultConfig = {
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
	private ticketStorage: TicketStorage

	urlParams?: URLSearchParams

	redirectCallbackUrl?: URL

	constructor(private tokenConfig: OutletInterface, urlParams: any = null) {
		this.tokenConfig = Object.assign(defaultConfig, tokenConfig)

		// TODO: Whitelist per collectionId
		this.tokenConfig.signedTokenWhitelist = this.tokenConfig.signedTokenWhitelist.map((origin) => {
			try {
				return new URL(origin).origin
			} catch (e) {
				logger(2, 'Failed to validate whitelist origin: ' + e.message)
			}
		})

		this.ticketStorage = new TicketStorage(this.tokenConfig.issuers)

		if (urlParams) {
			this.urlParams = urlParams
		} else {
			let params = window.location.hash.length > 1 ? '?' + window.location.hash.substring(1) : window.location.search
			this.urlParams = new URLSearchParams(params)
		}

		this.pageOnLoadEventHandler().catch((e) => {
			console.error(e)
			logger(2, 'Outlet pageOnLoadEventHandler error: ' + e.message)
		})
	}

	getDataFromQuery(itemKey: string): string {
		if (this.urlParams) {
			if (this.urlParams.has(URLNS + itemKey)) return this.urlParams.get(URLNS + itemKey)

			return this.urlParams.get(itemKey) // Fallback to non-namespaced version for backward compatibility
		}

		return null
	}

	getCallbackUrlKey(key: string) {
		if (this.getDataFromQuery('ns')) return URLNS + key

		return key
	}

	getFilter() {
		const filter = this.getDataFromQuery('filter')
		return filter ? JSON.parse(filter) : {}
	}

	async modalDialogEventHandler(evtid: any, access: string) {
		const action = await this.whitelistCheck(evtid, access === 'write' ? 'write' : 'read')
		if (action === 'user-accept') await this.sendTokens(evtid)
		else if (action === 'user-abort')
			this.sendErrorResponse(evtid, 'USER_ABORT', this.getDataFromQuery('issuer'), 'offchain-issuer-connection')
	}

	async pageOnLoadEventHandler() {
		const evtid = this.getDataFromQuery('evtid')
		const action = this.getDataFromQuery('action')
		const access = this.getDataFromQuery('access')

		const requester = this.getDataFromQuery('requestor')

		if (requester) this.redirectCallbackUrl = new URL(requester)

		logger(2, 'Outlet received event ID ' + evtid + ' action ' + action + ' at ' + window.location.href)

		try {
			switch (action) {
				case OutletAction.GET_ISSUER_TOKENS: {
					await this.modalDialogEventHandler(evtid, access)
					break
				}
				case OutletAction.EMAIL_ATTEST_CALLBACK: {
					const requesterURL = this.redirectCallbackUrl
					const issuer = this.getDataFromQuery('issuer')

					try {
						const tokenString = this.getDataFromQuery('token')

						let token = JSON.parse(tokenString)

						const attestationBlob = this.getDataFromQuery('attestation')
						const attestationSecret = '0x' + this.getDataFromQuery('requestSecret')

						const issuerConfig = this.getIssuerConfigById(issuer)

						const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedToken(createIssuerHashArray(issuerConfig), token)

						const useToken = await AuthHandler.getUseToken(issuerConfig, attestationBlob, attestationSecret, ticketRecord)

						if (requesterURL) {
							const params = new URLSearchParams(requesterURL.hash.substring(1))
							params.set(this.getCallbackUrlKey('action'), 'proof-callback')
							params.set(this.getCallbackUrlKey('issuer'), issuer)
							params.set(this.getCallbackUrlKey('attestation'), useToken.proof as string)
							params.set(this.getCallbackUrlKey('type'), ticketRecord.type)
							params.set(this.getCallbackUrlKey('token'), tokenString)

							requesterURL.hash = params.toString()

							window.location.href = requesterURL.href

							return
						}

						this.dispatchAuthCallbackEvent(issuer, useToken, null)
					} catch (e: any) {
						console.error(e)

						if (requesterURL) return this.proofRedirectError(issuer, e.message)

						this.dispatchAuthCallbackEvent(issuer, null, e.message)
					}

					window.location.hash = removeUrlSearchParams(this.urlParams, ['attestation', 'requestSecret', 'address', 'wallet']).toString()

					break
				}
				case OutletAction.GET_PROOF: {
					const token: string = this.getDataFromQuery('token')
					const wallet: string = this.getDataFromQuery('wallet')
					const address: string = this.getDataFromQuery('address')
					requiredParams(token, 'unsigned token is missing')
					await this.sendTokenProof(evtid, token, address, wallet)

					break
				}
				default: {
					// TODO: Remove singleUse - this is only needed in negotiator that calls readMagicLink.
					//  move single link somewhere that it can be used by both Outlet & LocalOutlet
					// if (!this.singleUse) {
					await this.readMagicLink()
					// await this.modalDialogEventHandler(evtid, 'write')
					// }
					break
				}
			}
		} catch (e: any) {
			console.error(e)
			this.sendErrorResponse(evtid, e?.message ?? e, this.getDataFromQuery('issuer'))
		}
	}

	private getIssuerConfigById(collectionId: string) {
		for (const issuer of this.tokenConfig.issuers) {
			if (issuer.collectionID === collectionId) return issuer
		}

		throw new Error('Issuer ' + collectionId + ' not found')
	}

	public async readMagicLink() {
		try {
			await this.ticketStorage.importTicketFromMagicLink(this.urlParams)

			const event = new Event('tokensupdated')

			document.body.dispatchEvent(event)
		} catch (e) {
			logger(2, e)
		}
	}

	private dispatchAuthCallbackEvent(issuer: string, proof?: ProofResult, error?: string) {
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

		if (origin === window.location.origin) return

		let accessWhitelist = JSON.parse(localStorage.getItem('tn-whitelist')) ?? {}

		// TODO: Storage access API no longer gives access to localStorage in firefox, only cookies like Safari
		//		I'm keeping this here in case chrome implements state partitioning in the same way as Firefox
		//		originally did. If chrome goes the way of Mozilla & Apple then this can be removed
		// const storageAccessRequired = document.hasStorageAccess && !(await document.hasStorageAccess())

		const needsPermission =
			this.tokenConfig.signedTokenWhitelist.indexOf(origin) === -1 &&
			(!accessWhitelist[origin] || (accessWhitelist[origin].type === 'read' && whiteListType === 'write'))

		if (!needsPermission) return 'user-accept'

		/* || storageAccessRequired */
		return new Promise<any>((resolve, reject) => {
			const typeTxt = whiteListType === 'read' ? 'read' : 'read & write'
			const permissionTxt = `${origin} is requesting ${typeTxt} access to your tickets`

			// TODO: Dialog should display title & icon list for all configured issuers

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

			document.getElementById('tn-access-accept').addEventListener('click', () => {
				if (!accessWhitelist[origin] || whiteListType !== accessWhitelist[origin].type) {
					accessWhitelist[origin] = {
						type: whiteListType,
					}
					localStorage.setItem('tn-whitelist', JSON.stringify(accessWhitelist))
				}
				resolve('user-accept')
			})

			document.getElementById('tn-access-deny').addEventListener('click', () => {
				resolve('user-abort')
			})

			this.sendMessageResponse({
				evtid,
				evt: ResponseActionBase.SHOW_FRAME,
				max_width: this.tokenConfig.whitelistDialogWidth,
				min_height: this.tokenConfig.whitelistDialogHeight,
			})
		})
	}

	async sendTokenProof(evtid: any, token: any, address: string, wallet: string) {
		if (!token) return 'error'

		const decodedToken = JSON.parse(token) as DecodedToken

		const redirect = this.getDataFromQuery('redirect') === 'true' ? window.location.href : false

		try {
			// TODO: Add support for multiple issuers and multiple tokens, currently first issuer is hard-coded
			const issuer = this.tokenConfig.issuers[0]

			const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedToken(createIssuerHashArray(issuer), decodedToken)

			let authHandler = new AuthHandler(issuer, ticketRecord, decodedToken, address, wallet, redirect, this, evtid)

			let tokenProof = await authHandler.authenticate()

			this.sendMessageResponse({
				evtid: evtid,
				evt: OutletResponseAction.PROOF,
				data: {
					issuer: issuer.collectionID,
					...tokenProof,
				},
			})
		} catch (e: any) {
			logger(2, e)

			if (redirect) return this.proofRedirectError(this.getDataFromQuery('issuer'), e.message)

			this.sendErrorResponse(evtid, e.message)
		}
	}

	// TODO: Consolidate redirect callback for tokens, proof & errors into the sendMessageResponse function to remove duplication
	private async sendTokens(evtid: any) {
		const requestHashes = JSON.parse(this.getDataFromQuery('request'))

		let issuerTokens = await this.ticketStorage.getDecodedTokens(requestHashes, this.getFilter())

		logger(2, 'issuerTokens: (Outlet.sendTokens)', issuerTokens)

		if (this.redirectCallbackUrl) {
			try {
				let url = this.redirectCallbackUrl

				const params = new URLSearchParams(url.hash.substring(1))
				params.set(this.getCallbackUrlKey('action'), OutletAction.GET_ISSUER_TOKENS + '-response')
				// params.set(this.getCallbackUrlKey('issuer'), this.tokenConfig.collectionID)
				params.set(this.getCallbackUrlKey('tokens'), JSON.stringify(issuerTokens))

				url.hash = '#' + params.toString()

				let requesterURL = url.href

				logger(2, 'tokens ready. go to: ', requesterURL)

				window.location.href = requesterURL

				return
			} catch (e) {
				logger(2, 'Requestor redirect Error. ', e)
			}
		}

		this.sendMessageResponse({
			evtid: evtid,
			evt: OutletResponseAction.ISSUER_TOKENS,
			data: {
				// issuer: this.tokenConfig.collectionID,
				tokens: issuerTokens,
			},
		})
	}

	public sendErrorResponse(evtid: any, error: string, issuer?: string, type = 'error') {
		if (this.redirectCallbackUrl) {
			let url = this.redirectCallbackUrl

			const params = new URLSearchParams(url.hash.substring(1))
			params.set(this.getCallbackUrlKey('action'), ResponseActionBase.ERROR)
			params.set(this.getCallbackUrlKey('issuer'), issuer)
			params.set(this.getCallbackUrlKey('type'), type)
			params.set(this.getCallbackUrlKey('error'), error)

			url.hash = '#' + params.toString()

			window.location.href = url.href
			return
		}

		this.sendMessageResponse({
			evtid: evtid,
			evt: ResponseActionBase.ERROR,
			errors: [error],
		})
	}

	public proofRedirectError(issuer: string, error: string) {
		const requesterURL = this.redirectCallbackUrl

		const params = new URLSearchParams(requesterURL.hash.substring(1))
		params.set(this.getCallbackUrlKey('action'), 'proof-callback')
		params.set(this.getCallbackUrlKey('issuer'), issuer)
		params.set(this.getCallbackUrlKey('error'), error)

		requesterURL.hash = params.toString()

		window.location.href = requesterURL.href
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
	}
}
