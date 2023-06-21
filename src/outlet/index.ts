import { createIssuerHashArray, createIssuerHashMap, IssuerHashMap, logger, removeUrlSearchParams, requiredParams } from '../utils'
import { ResponseActionBase, ResponseInterfaceBase, URLNS } from '../core/messaging'
import { OutletAction, OutletResponseAction } from '../client/messaging'
import { AuthHandler, ProofResult } from './auth-handler'
import { DecodedToken, TicketStorage } from './ticketStorage'
import { SignedDevconTicket } from '@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket'
import { AsnParser } from '@peculiar/asn1-schema'
import { IssuerConfigInterface, OffChainTokenConfig } from '../client/interface'
import { Whitelist } from './whitelist'

// TS2322: Type '{ issuers: any[]; whitelistDialogRenderer: (permissionTxt: string, acceptBtn: string, denyBtn: string) => string; }' is not assignable to type 'OutletInterface'.
// Object literal may only specify known properties, and 'issuers' does not exist in type 'OutletInterface'.

export interface OutletIssuerInterface {
	collectionID: string
	title?: string
	tokenOrigin?: string
	attestationOrigin: string
	tokenParser?: any
	base64senderPublicKeys: { [key: string]: string }
	base64attestorPubKey: string
	whitelist?: string[]
}

export interface OutletInterface {
	issuers: OutletIssuerInterface[]
	whitelistDialogWidth?: string
	whitelistDialogHeight?: string
	whitelistDialogRenderer?: (permissionTxt: string, acceptBtn: string, denyBtn: string) => string
}

export const defaultConfig = {
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
	private whitelist: Whitelist

	urlParams?: URLSearchParams

	redirectCallbackUrl?: URL

	constructor(private tokenConfig: OutletInterface, urlParams: any = null) {
		this.tokenConfig = Object.assign(defaultConfig, tokenConfig)

		this.ticketStorage = new TicketStorage(this.tokenConfig.issuers)
		this.whitelist = new Whitelist(this.tokenConfig, () => {
			const evtid = this.getDataFromQuery('evtid')

			this.sendMessageResponse({
				evtid,
				evt: ResponseActionBase.SHOW_FRAME,
				max_width: this.tokenConfig.whitelistDialogWidth,
				min_height: this.tokenConfig.whitelistDialogHeight,
			})
		})

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

			return this.urlParams.get(itemKey) // Fallback to non-namespaced version for attestation.id parameters
		}

		return null
	}

	getCallbackUrlKey(key: string) {
		return URLNS + key
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
					await this.sendTokens(evtid)
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
					// TODO: Replace with new request to handle multiple issuers & tokens
					const issuer: string = this.getDataFromQuery('issuer')
					const token: string = this.getDataFromQuery('token')
					const wallet: string = this.getDataFromQuery('wallet')
					const address: string = this.getDataFromQuery('address')
					requiredParams(token, 'unsigned token is missing')
					await this.sendTokenProof(evtid, issuer, token, address, wallet)

					break
				}
				case OutletAction.GET_MUTLI_PROOF: {
					logger(2, 'Outlet received event ID GET_MUTLI_PROOF ' + evtid + ' action ' + action + ' at ' + window.location.href)
					// TODO: Replace with new request to handle multiple issuers & tokens
					const issuer: string = this.getDataFromQuery('issuer')
					const tokens: string = this.getDataFromQuery('token')
					const wallet: string = this.getDataFromQuery('wallet')
					const address: string = this.getDataFromQuery('address')
					//
					// requiredParams(token, 'unsigned token is missing')
					// await this.sendTokenProof(evtid, issuer, token, address, wallet)
					break
				}
				default: {
					if (this.getDataFromQuery('ticket')) {
						await this.readMagicLink()
						await this.sendTokens(evtid)
					}
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
			if (await this.ticketStorage.importTicketFromMagicLink(this.urlParams)) {
				const event = new Event('tokensupdated')
				document.body.dispatchEvent(event)
				// TODO: tokens could be read from the hooks "tokens" and "tokens-selected" by
				// triggering await this.sendTokens(this.getDataFromQuery('evtid')) at this point instead.
				// Let's review this approach to confirm if this hook is required.
			}
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

	async sendTokenProof(evtid: string, collectionId: string, token: string, address: string, wallet: string) {
		if (!token) return 'error'

		const decodedToken = JSON.parse(token) as DecodedToken

		const redirect = this.getDataFromQuery('redirect') === 'true' ? window.location.href : false

		try {
			// TODO: Add support for multiple issuers and multiple tokens
			const issuer = this.getIssuerConfigById(collectionId)

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
		} catch (e) {
			logger(2, e)

			if (redirect) return this.proofRedirectError(this.getDataFromQuery('issuer'), e.message)

			this.sendErrorResponse(evtid, e.message)
		}
	}

	// TODO: Consolidate redirect callback for tokens, proof & errors into the sendMessageResponse function to remove duplication
	private async sendTokens(evtid: any) {
		const requestHashes = JSON.parse(this.getDataFromQuery('request')) as IssuerHashMap

		if (!requestHashes) return

		// Create a map of outlet hashes to issuer config
		const hashToConfigMap = {}

		for (const issuer of this.tokenConfig.issuers) {
			const hashes = createIssuerHashArray(issuer)
			for (const hash of hashes) {
				hashToConfigMap[hash] = issuer
			}
		}

		const reqIssuers: OutletIssuerInterface[] = []

		// Loop through client request hashes & create an array of issuers for whitelist processing
		for (const issuer in requestHashes) {
			for (const hash of requestHashes[issuer]) {
				if (hashToConfigMap[hash]) {
					if (reqIssuers.indexOf(hashToConfigMap[hash]) === -1) reqIssuers.push(hashToConfigMap[hash])
				}
			}
		}

		const whitelistedIssuers = await this.whitelist.whitelistCheck(reqIssuers, false)

		// Remove hashes that don't exist in outlets own config and non-whitelisted issuers
		for (const issuer in requestHashes) {
			const filteredHashes = []
			for (const hash of requestHashes[issuer]) {
				if (hashToConfigMap[hash] && whitelistedIssuers.indexOf(hashToConfigMap[hash].collectionID) > -1) {
					filteredHashes.push(hash)
				}
			}
			requestHashes[issuer] = filteredHashes
		}

		let issuerTokens = await this.ticketStorage.getDecodedTokens(requestHashes)

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
