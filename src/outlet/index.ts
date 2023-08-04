import { createIssuerHashArray, IssuerHashMap, logger, removeUrlSearchParams, requiredParams } from '../utils'
import { ResponseActionBase, ResponseInterfaceBase, URLNS } from '../core/messaging'
import { OutletAction, OutletResponseAction } from '../client/messaging'
import { DecodedToken } from './ticketStorage'
import { Whitelist } from './whitelist'
import { LocalOutlet } from './localOutlet'
import { AttestationIdClient } from './attestationIdClient'
import { getUseToken } from './getUseToken'
import { MultiTokenAuthRequest, MultiTokenAuthResult, OutletInterface, OutletIssuerInterface, ProofResult } from './interfaces'

export const defaultConfig = {
	whitelistDialogWidth: '450px',
	whitelistDialogHeight: '350px',
}

export class Outlet extends LocalOutlet {
	// private ticketStorage: TicketStorage
	private whitelist: Whitelist

	urlParams?: URLSearchParams

	redirectCallbackUrl?: URL

	constructor(
		private tokenConfig: OutletInterface,
		urlParams: URLSearchParams = null,
	) {
		super(tokenConfig)

		this.tokenConfig = Object.assign(defaultConfig, tokenConfig)

		// this.ticketStorage = new TicketStorage(this.tokenConfig.issuers)
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
					// Request came from local client instance, process it in Client class when "token-proof" event callback is registered
					if (this.getDataFromQuery('localClient') === 'true') {
						return
					}
					await this.processAttestationIdCallback(evtid)
					break
				}
				case OutletAction.GET_PROOF: {
					await this.sendTokenProof(evtid)
					break
				}
				case OutletAction.GET_MUTLI_PROOF: {
					await this.sendMultiTokenProof(evtid)
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

	private processAttestationIdCallback(evtid: string) {
		const requesterURL = this.redirectCallbackUrl
		const issuer = this.getDataFromQuery('issuer')

		try {
			const attestIdClient = new AttestationIdClient()
			attestIdClient.captureAttestationIdCallback(this.urlParams)

			const originalAction = this.getDataFromQuery('orig-action')

			switch (originalAction) {
				case OutletAction.GET_PROOF:
					this.sendTokenProof(evtid)
					break
				case OutletAction.GET_MUTLI_PROOF:
					this.sendMultiTokenProof(evtid)
					break
				default:
					throw new Error('Original action not defined in attestation.id callback')
			}
		} catch (e: any) {
			console.error(e)

			if (requesterURL) return this.proofRedirectError(issuer, e.message)
		}

		window.location.hash = removeUrlSearchParams(this.urlParams, ['attestation', 'requestSecret', 'address', 'wallet']).toString()
	}

	private getIssuerConfigById(collectionId: string) {
		if (this.tokenConfig.issuers) {
			for (const issuer of this.tokenConfig.issuers) {
				if (issuer.collectionID === collectionId) return issuer
			}
			throw new Error('Issuer ' + collectionId + ' not found')
		}
	}

	public async readMagicLink() {
		if (!this.urlParams.has('ticket')) return

		await this.ticketStorage.importTicketFromMagicLink(this.urlParams)
	}

	async sendMultiTokenProof(evtid: string) {
		const tokens: string = this.getDataFromQuery('tokens')
		const wallet: string = this.getDataFromQuery('wallet')
		const address: string = this.getDataFromQuery('address')
		requiredParams(tokens, 'unsigned token is missing')

		const redirect = this.getDataFromQuery('redirect') === 'true' ? window.location.href : false

		try {
			const authRequest = JSON.parse(tokens) as MultiTokenAuthRequest

			const output = await this.authenticateMany(authRequest, address, wallet, redirect, () => {
				this.sendMessageResponse({
					evtid: evtid,
					evt: ResponseActionBase.SHOW_FRAME,
					max_width: this.tokenConfig.whitelistDialogWidth,
					min_height: this.tokenConfig.whitelistDialogHeight,
				})
			})

			if (this.redirectCallbackUrl) {
				const requesterURL = this.redirectCallbackUrl

				const params = new URLSearchParams(requesterURL.hash.substring(1))
				params.set(this.getCallbackUrlKey('action'), 'proof-callback')
				params.set(this.getCallbackUrlKey('multi-token'), 'true')
				params.set(this.getCallbackUrlKey('tokens'), JSON.stringify(output))

				requesterURL.hash = params.toString()
				window.location.href = requesterURL.href
				return
			}

			this.sendMessageResponse({
				evtid: evtid,
				evt: OutletResponseAction.PROOF,
				data: output,
			})
		} catch (e) {
			logger(2, e)
			if (redirect) return this.proofRedirectError(this.getDataFromQuery('issuer'), e.message)
			this.sendErrorResponse(evtid, e.message)
		}
	}

	async sendTokenProof(evtid: string) {
		const collectionId: string = this.getDataFromQuery('issuer')
		const token: string = this.getDataFromQuery('token')
		const wallet: string = this.getDataFromQuery('wallet')
		const address: string = this.getDataFromQuery('address')
		requiredParams(token, 'unsigned token is missing')

		const decodedToken = JSON.parse(token) as DecodedToken

		const redirect = this.getDataFromQuery('redirect') === 'true' ? window.location.href : false

		try {
			const issuer = this.getIssuerConfigById(collectionId)

			const ticketRecord = await this.ticketStorage.getStoredTicketFromDecodedTokenOrId(createIssuerHashArray(issuer), decodedToken)

			const attestIdClient = new AttestationIdClient(
				issuer.attestationOrigin,
				() => {
					this.sendMessageResponse({
						evtid: evtid,
						evt: ResponseActionBase.SHOW_FRAME,
						max_width: this.tokenConfig.whitelistDialogWidth,
						min_height: this.tokenConfig.whitelistDialogHeight,
					})
				},
				redirect,
			)

			const idAttestation = await attestIdClient.getIdentifierAttestation(ticketRecord.id, wallet, address, {
				action: OutletAction.GET_PROOF,
				issuer: collectionId,
				token: JSON.stringify(decodedToken),
			})

			const tokenProof = await getUseToken(issuer, idAttestation.attestation, idAttestation.identifierSecret, ticketRecord)

			if (this.redirectCallbackUrl) {
				const requesterURL = this.redirectCallbackUrl

				const params = new URLSearchParams(requesterURL.hash.substring(1))
				params.set(this.getCallbackUrlKey('action'), 'proof-callback')
				params.set(this.getCallbackUrlKey('issuer'), collectionId)
				params.set(this.getCallbackUrlKey('attestation'), tokenProof.proof as string)
				params.set(this.getCallbackUrlKey('type'), ticketRecord.type)
				params.set(this.getCallbackUrlKey('token'), token)

				requesterURL.hash = params.toString()
				window.location.href = requesterURL.href
				return
			}

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
