import { attachPostMessageListener, logger, removePostMessageListener } from '../utils'
import { ClientError } from '../client'
import { browserBlocksIframeStorage } from '../utils/support/getBrowserData'
import { VERSION } from '../version'

// TODO move Message related interfaces/enum in to shared location /core

export interface RequestInterfaceBase {
	action: string
	origin: string
	timeout?: number
	data: { [key: string]: any }
}

export interface ResponseInterfaceBase {
	evtid: any
	evt: string
	data?: any
	errors?: string[]
	max_width?: string
	min_height?: string
}

export enum ResponseActionBase {
	COOKIE_CHECK = 'cookie-check',
	ERROR = 'error',
	SHOW_FRAME = 'show-frame',
}

declare global {
	interface Window {
		NEGOTIATOR_DEBUG: boolean
		safari?: any
	}
}

/* URL namespace is used to avoid possible collisions with URL parameter names */
export const URLNS = 'tn-'

const PREFIXES = parseInt(VERSION) <= 2 ? ['', URLNS] : [URLNS]

export class Messaging {
	iframeStorageSupport: null | boolean = null
	iframe: any = null
	listenerSet = false

	async sendMessage(
		request: RequestInterfaceBase,
		forceTab = false,
		redirectUrl: false | string = false,
	): Promise<ResponseInterfaceBase | void> {
		logger(2, 'Send request: ')
		logger(2, request)

		if (redirectUrl) {
			this.sendRedirect(request, redirectUrl)
			return
		}

		if (!forceTab && this.iframeStorageSupport === null) {
			// TODO: temp to test safari top level context access.
			// TODO do we need this verificaton?
			// if (window.location.hash !== "#safari-iframe-test")

			this.iframeStorageSupport = !browserBlocksIframeStorage()
		}

		if (!forceTab && this.iframeStorageSupport !== false) {
			try {
				return await this.sendIframe(request)
			} catch (e) {
				if (e === 'IFRAME_STORAGE') {
					return this.sendPopup(request)
				}
				throw e
			}
		} else {
			return this.sendPopup(request)
		}
	}

	private sendRedirect(request: RequestInterfaceBase, redirectUrl: string) {
		let id = Messaging.getUniqueEventId()
		let newLocation = this.constructUrl(id, request)

		// TODO change in MAJOR release
		for (const prefix of PREFIXES) {
			newLocation += `&${prefix}redirect=true&${prefix}requestor=${encodeURIComponent(redirectUrl)}`
		}

		logger(2, `redirect from ${window.location.href} to ${newLocation}`)

		window.location.href = newLocation
	}

	private sendIframe(request: RequestInterfaceBase): Promise<ResponseInterfaceBase> {
		return new Promise((resolve, reject) => {
			let id = Messaging.getUniqueEventId()
			let url = this.constructUrl(id, request)

			this.iframe = this.createIframe(() => {
				this.listenerSet = false
				this.removeModal()
				reject(ClientError.USER_ABORT)
			})

			if (!this.listenerSet) {
				this.listenerSet = true
				this.setResponseListener(id, request.origin, request.timeout, resolve, reject, () => {
					this.listenerSet = false
					this.removeModal()
				})
			}

			this.iframe.src = url
		})
	}

	private sendPopup(request: RequestInterfaceBase): Promise<ResponseInterfaceBase> {
		return new Promise((resolve, reject) => {
			let id = Messaging.getUniqueEventId()

			let tabRef: any = null

			this.setResponseListener(id, request.origin, request.timeout, resolve, reject, () => {
				if (tabRef) tabRef.close()
			})

			tabRef = this.openTab(this.constructUrl(id, request))

			if (!tabRef || tabRef.closed || typeof tabRef.closed == 'undefined') {
				reject(ClientError.POPUP_BLOCKED)
				return
			}

			let tabCloseCheck = setInterval(() => {
				if (!tabRef || tabRef.closed) {
					clearInterval(tabCloseCheck)
					reject(ClientError.USER_ABORT)
				}
			}, 500)
		})
	}

	private setResponseListener(id: any, origin: string, timeout: number | undefined, resolve: any, reject: any, cleanUpCallback: any) {
		let received = false
		let timer: any = null

		let listener = (event: any) => {
			if (event.data.target) {
				return
			}

			let response: ResponseInterfaceBase = event.data
			let requestUrl = new URL(origin)

			if (response.evtid === id) {
				if (requestUrl.origin === event.origin && response.evt) {
					logger(2, 'event response received')
					logger(2, event.data)

					received = true

					// TODO: revert to tab when requestStorageAccess error is encountered in outlet - but only for browsers that support new tabs (no wallet dapp browsers)
					/* if (response.evt === ResponseActionBase.COOKIE_CHECK){
						if (!this.iframe || this.iframeStorageSupport === true)
							return;

						this.iframeStorageSupport = !!response?.data?.thirdPartyCookies;
						if (!this.iframeStorageSupport){
							afterResolveOrError();
							reject("IFRAME_STORAGE");
						}
						return;
					}*/

					if (response.evt === ResponseActionBase.ERROR) {
						if (response.errors[0] === 'IFRAME_STORAGE') {
							this.iframeStorageSupport = false
							reject('IFRAME_STORAGE')
						} else {
							reject(new Error(response.errors.join('. ')))
						}
					} else if (response.evt === ResponseActionBase.SHOW_FRAME) {
						if (timer) clearTimeout(timer)

						if (this.iframe) {
							let modal = this.getModal()
							modal.style.display = 'block'

							if (response.max_width) {
								let modalContent: HTMLElement = modal.querySelector('.modal-content-tn')
								if (modalContent) {
									modalContent.style.maxWidth = response.max_width
								}
							}

							if (response.min_height) {
								let iframe: HTMLElement = modal.querySelector('iframe')
								if (iframe) {
									iframe.style.minHeight = response.min_height
								}
							}
						}

						return
					} else {
						resolve(response)
					}

					afterResolveOrError()
				} else {
					logger(2, 'Does not match origin ' + event.origin)
				}
			}
		}

		let afterResolveOrError = () => {
			if (timer) clearTimeout(timer)
			removePostMessageListener(listener)
			if (!window.NEGOTIATOR_DEBUG) cleanUpCallback()
		}

		attachPostMessageListener(listener)

		if (timeout === undefined) timeout = 20000

		if (timeout > 0)
			timer = setTimeout(() => {
				if (!received) reject(new Error('Failed to receive response from window/iframe'))
				afterResolveOrError()
			}, timeout)
	}

	private getModal(closedCallback?) {
		let modal = document.getElementById('modal-tn')

		if (modal || !closedCallback) return modal

		modal = document.createElement('div')
		modal.id = 'modal-tn'
		modal.className = 'modal-tn'
		modal.style.display = 'none'

		modal.innerHTML = `
            <div class="modal-content-tn">
                <div class="modal-header-tn">
                    <span class="modal-close-tn">&times;</span>
                </div>
                <div class="modal-body-tn"></div>
            </div>
        `

		document.body.appendChild(modal)

		modal.getElementsByClassName('modal-close-tn')[0].addEventListener('click', () => {
			closedCallback()
		})

		return modal
	}

	private removeModal() {
		let modal = this.getModal()
		if (modal) {
			modal.style.display = 'none'
			modal.remove()
		}
	}

	// TODO: Use URLSearchParams object to build this query rather than manually constructing it
	//		This will prevent edge-case encoding issues.
	private constructUrl(id: any, request: RequestInterfaceBase) {
		let url = `${request.origin}#`

		// Notify outlet that param namespace is in use.
		// This enables using the namespace when redirecting back to the client page in order to support older negotiator versions
		url += `tn-ns=1`

		// TODO change in MAJOR release
		for (const prefix of PREFIXES) {
			url += `&${prefix}evtid=${id}&${prefix}action=${request.action}`
		}

		// in request to Outlet() to get tokens we dont have any token
		if (typeof request.data.token !== 'undefined') {
			// TODO change in MAJOR release
			for (const prefix of PREFIXES) {
				url += `&${prefix}token=${encodeURIComponent(JSON.stringify(request.data.token))}`
			}
		}

		for (let key in request.data) {
			let value = request.data[key]

			// no sense to send issuer config. Outlet() use own config,
			// it can be dangerous if Outlet beleive to external config from URL HASH
			if (key === 'issuer' || key === 'token') continue

			if (!value) continue

			if (value instanceof Array || value instanceof Object) {
				// TODO change in MAJOR release
				for (const prefix of PREFIXES) {
					url += `&${prefix}${key}=${JSON.stringify(value)}`
				}
			} else {
				if (key === 'urlParams') {
					url += `&${value}`
				} else {
					// TODO change in MAJOR release
					for (const prefix of PREFIXES) {
						url += `&${prefix}${key}=${value}`
					}
				}
			}
		}

		return url
	}

	public openTab(url: string) {
		return window.open(url, '_blank')
	}

	public createIframe(closeCallback?) {
		const iframe = document.createElement('iframe')
		iframe.setAttribute('allow', 'clipboard-read')

		let modal = this.getModal(closeCallback)

		modal.getElementsByClassName('modal-body-tn')[0].appendChild(iframe)

		return iframe
	}

	private static getUniqueEventId() {
		return new Date().getTime().toString()
	}
}
