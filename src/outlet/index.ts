import { logger, requiredParams, removeUrlSearchParams } from '../utils'
import { OutletAction, OutletResponseAction } from '../client/messaging'
import { AuthHandler, ProofResult } from './auth-handler'
import { SignedDevconTicket } from '@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket'
import { AsnParser } from '@peculiar/asn1-schema'
import { ResponseActionBase, ResponseInterfaceBase, URLNS } from '../core/messaging'
import { EASSignerOrProvider } from '@tokenscript/attestation/dist/eas/EasTicketAttestation'
import { DecodedToken, FilterInterface, TicketStorage } from './ticketStorage'
import { ethers } from 'ethers'

export interface OutletInterface {
	collectionID: string
	title?: string
	attestationOrigin: string
	attestationInTab?: boolean
	tokenParser?: any
	base64senderPublicKeys: { [key: string]: string }
	base64attestorPubKey: string
	signedTokenWhitelist?: string[]
	eas?: {
		config: {
			address: string
			version: string
			chainId: number
		}
		provider: EASSignerOrProvider
	}

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
	eas: {
		config: {
			address: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
			version: '0.26',
			chainId: 11155111,
		},
		provider: new ethers.providers.JsonRpcProvider('https://rpc.sepolia.org/'),
	},
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
	ticketStorage: TicketStorage

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

		this.ticketStorage = new TicketStorage(this.tokenConfig)

		if (urlParams) {
			this.urlParams = urlParams
		} else {
			let params = window.location.hash.length > 1 ? '?' + window.location.hash.substring(1) : window.location.search
			this.urlParams = new URLSearchParams(params)
		}

		if (!this.singleUse) {
			this.pageOnLoadEventHandler()
				.then()
				.catch((e) => {
					logger(2, 'Outlet pageOnLoadEventHandler error: ' + e.message)
				})
		}
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

		// TODO: should issuer be validated against requested issuer?

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

						const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedToken(token)

						const useToken = await AuthHandler.getUseToken(this.tokenConfig, attestationBlob, attestationSecret, ticketRecord)

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
					if (!this.singleUse) {
						await this.readMagicLink()
						await this.modalDialogEventHandler(evtid, 'write')
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

	async prepareTokenOutput(filter?: FilterInterface) {
		let includeSigned = false

		if (this.tokenConfig.signedTokenWhitelist?.length && this.tokenConfig.signedTokenWhitelist.indexOf(this.getRequestOrigin()) > -1) {
			includeSigned = true
		}

		return this.ticketStorage.getDecodedTokens(includeSigned, filter)
	}

	async sendTokenProof(evtid: any, token: any, address: string, wallet: string) {
		if (!token) return 'error'

		const decodedToken = JSON.parse(token) as DecodedToken

		const redirect = this.getDataFromQuery('redirect') === 'true' ? window.location.href : false

		try {
			const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedToken(decodedToken)

			let authHandler = new AuthHandler(this.tokenConfig, ticketRecord, decodedToken, address, wallet, redirect, this, evtid)

			let tokenProof = await authHandler.authenticate()

			this.sendMessageResponse({
				evtid: evtid,
				evt: OutletResponseAction.PROOF,
				data: {
					issuer: this.tokenConfig.collectionID,
					...tokenProof,
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
	private async sendTokens(evtid: any) {
		let issuerTokens = await this.prepareTokenOutput(this.getFilter())

		logger(2, 'issuerTokens: (Outlet.sendTokens)', issuerTokens)

		if (this.redirectCallbackUrl) {
			try {
				let url = this.redirectCallbackUrl

				const params = new URLSearchParams(url.hash.substring(1))
				params.set(this.getCallbackUrlKey('action'), OutletAction.GET_ISSUER_TOKENS + '-response')
				params.set(this.getCallbackUrlKey('issuer'), this.tokenConfig.collectionID)
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
				issuer: this.tokenConfig.collectionID,
				tokens: issuerTokens,
			},
		})
	}

	public sendErrorResponse(evtid: any, error: string, issuer?: string, type = 'error') {
		if (this.redirectCallbackUrl) {
			let url = this.redirectCallbackUrl

			const params = new URLSearchParams(url.hash.substring(1))
			params.set(this.getCallbackUrlKey('action'), ResponseActionBase.ERROR)
			params.set(this.getCallbackUrlKey('issuer'), issuer || this.tokenConfig.collectionID)
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

	private isSameOrigin() {
		try {
			let tokenUrl = new URL(this.tokenConfig.tokenOrigin)
			if (tokenUrl.origin === window.location.origin) {
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
