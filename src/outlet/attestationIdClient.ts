import { logger, removeUrlSearchParams } from '../utils'
import { isBrave } from '../utils/support/getBrowserData'
import { OutletAction } from '../client/messaging'
import { URLNS } from '../core/messaging'

interface PostMessageData {
	force?: boolean
	email?: string
	wallet?: string
	address?: string
}

export interface IdAttestationRecord {
	type: 'eas' | 'asn'
	identifierType: 'email'
	identifier: string
	identifierSecret: string
	attestation: string
	expiry: number
}

export interface StoredIdAttestations {
	// Keyed by identifiertype-identifier
	[typeAndId: string]: IdAttestationRecord
}

export class AttestationIdClient {
	private attestationInTab: boolean
	private attestationTabHandler: any
	private buttonOverlay: HTMLElement | null = null
	private tryingToGetAttestationInBackground = false

	private iframe: HTMLIFrameElement | null = null
	private iframeWrap: HTMLElement | null = null

	private wrapperBase = 'tn_attestation_open'
	private interval = null
	private rejectHandler: Function

	private LOCAL_STORAGE_KEY = 'tn-id-attestations'
	private attestations: StoredIdAttestations

	constructor(private attestationOrigin?: string, private showIframeCallback?: () => void, private redirectUrl?: false | string) {
		this.attestations = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) ?? ({} as StoredIdAttestations)
	}

	private getExistingAttestation(id: string, idType = 'email') {
		const key = idType + '/' + id

		if (this.attestations[key]) {
			const attestation = this.attestations[key]

			if (attestation.expiry > Math.round(Date.now() / 1000)) {
				return attestation
			}

			delete this.attestations[key]
		}

		return null
	}

	private saveAttestation(attestation: IdAttestationRecord) {
		this.attestations[attestation.identifierType + '/' + attestation.identifier] = attestation
		localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.attestations))
	}

	openAttestationApp() {
		if (this.attestationInTab && !this.tryingToGetAttestationInBackground) {
			// TODO check if its an iframe, if TAB then no need to request to display
			logger(2, 'display new TAB to attest, ask parent to show current iframe')
			if (this.showIframeCallback) this.showIframeCallback()

			let button: HTMLDivElement

			button = document.createElement('div')
			button.classList.add(this.wrapperBase + '_btn')
			button.innerHTML = 'Click to get Email Attestation'
			button.addEventListener('click', () => {
				this.attestationTabHandler = window.open(this.attestationOrigin, 'Attestation')

				button.remove()

				let title = this.buttonOverlay.querySelector('.' + this.wrapperBase + '_title')
				let subtitle = this.buttonOverlay.querySelector('.' + this.wrapperBase + '_subtitle')
				if (title) {
					title.innerHTML = 'Email Attestation verification in progress'
				}
				if (subtitle) {
					subtitle.innerHTML = 'Please complete the verification process to continue'
				}

				this.interval = setInterval(() => {
					if (this.attestationTabHandler.closed) {
						clearInterval(this.interval)
						this.rejectHandler(new Error('User closed TAB'))
					}
				}, 2000)
			})
			let wrapperID = this.wrapperBase + '_wrap_' + Date.now()
			const styles = document.createElement('style')
			styles.innerHTML = `
				#${wrapperID} {
					width:100%;
					height: 100vh; 
					position: fixed; 
					align-items: center; 
					justify-content: center;
					display: flex;
					top: 0; 
					left: 0; 
					background: #000f;
					display: flex;
					flex-direction: column;
					padding: 30px;
				}
				#${wrapperID} div:hover {
					box-shadow: 0 0px 14px #ffff !important;
				}
				#${wrapperID} .${this.wrapperBase}_content {
					color: #fff; 
					text-align: center;
				}
				#${wrapperID} .${this.wrapperBase}_title {
					
				}
				
				#${wrapperID} .${this.wrapperBase}_subtitle {
					font-size:18px;
					color: #ccc;
				}
				#${wrapperID} .${this.wrapperBase}_btn {
					margin: 20px auto 0;
					padding: 5px 15px;
					background: #0219fa;
					font-weight: 700;
					font-size: 20px;
					line-height: 1.3;
					border-radius: 100px;
					color: #fff;
					cursor: pointer;
					display: block;
					text-align: center;
				}

				@media (max-width: 768px){
					#${wrapperID} {
						padding: 20px 10px;
					}
					#${wrapperID} .${this.wrapperBase}_title {
						font-size: 24px;
					}
					#${wrapperID} .${this.wrapperBase}_btn {
						padding: 10px 15px;
						font-size: 18px;
					}
				}
			`

			this.buttonOverlay = document.createElement('div')
			this.buttonOverlay.id = wrapperID
			this.buttonOverlay.innerHTML = `<h1 class="${this.wrapperBase}_content ${this.wrapperBase}_title">Needs email attestation to complete verification.</h1><p class="${this.wrapperBase}_content ${this.wrapperBase}_subtitle"></p>`
			this.buttonOverlay.appendChild(button)
			this.buttonOverlay.appendChild(styles)
			document.body.appendChild(this.buttonOverlay)
		} else {
			logger(2, 'open attestation in iframe')
			this.createIframe()
		}
	}

	public captureAttestationIdCallback(urlParams: URLSearchParams) {
		if (!urlParams.has('attestation') || !urlParams.has('requestSecret')) {
			console.log('NO FUCKING ATTESTATION DETECTED!!!!!!!!!!!!!!!', urlParams.toString())
			return false
		}

		const email = urlParams.get('email')
		const attestationBlob = urlParams.get('attestation')
		const attestationSecret = '0x' + urlParams.get('requestSecret')

		const record = this.getAttestationDetails(email, attestationBlob, attestationSecret)

		this.saveAttestation(record)

		return true
	}

	private getAttestationDetails(email: string, attestation: string, attestationSecret: string) {
		// TODO: Get expiry from attestation.id
		let expiry = new Date()
		expiry.setDate(expiry.getDate() + 30)

		const attestationRecord: IdAttestationRecord = {
			type: 'asn',
			identifierType: 'email',
			identifier: email,
			identifierSecret: attestationSecret,
			attestation,
			expiry: Math.round(expiry.getTime() / 1000),
		}

		return attestationRecord
	}

	public getIdentifierAttestation(
		email: string,
		wallet?: string,
		walletAddress?: string,
		currentActionParams?: { [key: string]: any },
	): Promise<IdAttestationRecord> {
		return new Promise((resolve, reject) => {
			const existing = this.getExistingAttestation(email)

			if (existing) {
				resolve(existing)
				return
			}

			this.rejectHandler = reject
			if (this.redirectUrl) {
				const curParams = new URLSearchParams(window.location.hash.substring(1))

				const params = new URLSearchParams()
				params.set('email', email)
				params.set('address', walletAddress)
				params.set('wallet', wallet)

				const callbackUrl = new URL(this.redirectUrl)
				const callbackParams = new URLSearchParams(callbackUrl.hash.substring(1))

				if (currentActionParams) for (const key in currentActionParams) callbackParams.set(URLNS + key, currentActionParams[key])

				// Set the original action here, so we can come back to the same method after storing the attestation
				callbackParams.set(URLNS + 'orig-action', currentActionParams.action)
				callbackParams.set('email', email) // TODO: return with attestation.id callback
				callbackParams.set(URLNS + 'action', OutletAction.EMAIL_ATTEST_CALLBACK)

				// console.log('attestation.id callback params: ', callbackParams.toString())
				// callbackParams.set(URLNS + 'issuer', this.tokenConfig.collectionID)
				// callbackParams.set(URLNS + 'token', JSON.stringify(this.decodedToken))

				const requestor = curParams.get(URLNS + 'requestor')
				if (requestor) {
					callbackParams.set(URLNS + 'requestor', requestor)
				}
				callbackUrl.hash = callbackParams.toString()
				params.set('email-attestation-callback', callbackUrl.href)
				const goto = `${this.attestationOrigin}#${params.toString()}`
				logger(2, 'authenticate. go to: ', goto)
				window.location.href = goto
				return
			}

			// TODO: Is tab actually required? If we are storing in local storage on outlet
			if (this.attestationInTab && !isBrave()) {
				this.tryingToGetAttestationInBackground = true
			}

			if (!this.attestationOrigin) return reject(new Error('Attestation origin is null'))

			window.addEventListener('message', (e) => {
				let attestURL = new URL(this.attestationOrigin)
				if (e.origin !== attestURL.origin) {
					return
				}

				if ((this.iframe && this.iframeWrap && this.iframe.contentWindow) || this.attestationTabHandler) {
					this.postMessageAttestationListener(e, resolve, reject, email)
				}
			})
			// opens the attestation app in Iframe, supported iframe and tab modes.
			this.openAttestationApp()
		})
	}

	private createIframe() {
		const iframe = document.createElement('iframe')
		iframe.setAttribute('allow', 'clipboard-read')
		this.iframe = iframe

		iframe.src = this.attestationOrigin ?? ''
		iframe.style.width = '800px'
		iframe.style.height = '800px'
		iframe.style.maxHeight = '100vh'
		iframe.style.maxWidth = '100%'
		iframe.style.background = '#fff'

		let iframeWrap = document.createElement('div')
		this.iframeWrap = iframeWrap
		iframeWrap.setAttribute(
			'style',
			'width:101%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa',
		)
		iframeWrap.appendChild(iframe)

		document.body.appendChild(iframeWrap)
	}

	// TODO review this logic to map out the behaviour
	async postMessageAttestationListener(
		event: MessageEvent,
		resolve: (res: IdAttestationRecord) => void,
		reject: Function,
		email: string,
		wallet?: string,
		address?: string,
	) {
		logger(2, 'postMessageAttestationListener event (auth-handler)', event.data)

		let attestationHandler = this.attestationTabHandler ? this.attestationTabHandler : this.iframe.contentWindow

		if (typeof event.data.ready !== 'undefined' && event.data.ready === true) {
			let sendData: PostMessageData = { force: false }

			sendData.email = email
			if (wallet) sendData.wallet = wallet
			if (address) sendData.address = address

			attestationHandler.postMessage(sendData, this.attestationOrigin)

			return
		}

		if (typeof event.data.display !== 'undefined') {
			if (event.data.display === true) {
				if (this.iframeWrap) {
					if (this.tryingToGetAttestationInBackground) {
						this.tryingToGetAttestationInBackground = false
						this.iframe.remove()
						this.iframeWrap.remove()
						this.openAttestationApp()
						return
					}

					this.iframeWrap.style.display = 'flex'

					if (this.showIframeCallback) this.showIframeCallback()
				}
			} else {
				if (event.data.error) {
					logger(2, 'Error received from the iframe: ' + event.data.error)
					reject(new Error(event.data.error))
					if (this.buttonOverlay) this.buttonOverlay.remove()
				}

				if (this.iframeWrap) {
					this.iframeWrap.style.display = 'none'
				}
			}
		}

		if (!event.data?.attestation || !event.data?.requestSecret) {
			return
		}

		if (this.attestationTabHandler) {
			this.attestationTabHandler.close()
		}

		if (this.iframeWrap) {
			this.iframeWrap.remove()
		}

		const attestation = event.data?.attestation
		let attestationSecret = event.data?.requestSecret

		// TODO: Fix attestation.id to always return hex
		if (typeof attestationSecret === 'bigint') attestationSecret = '0x' + attestationSecret.toString(16)

		const attestationRecord = this.getAttestationDetails(email, attestation, attestationSecret)

		this.saveAttestation(attestationRecord)
		resolve(attestationRecord)

		if (this.buttonOverlay) this.buttonOverlay.remove()
	}
}
