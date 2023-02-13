import { Start } from './views/start'

import { logger, requiredParams } from '../utils'
import { Client, ClientError } from './index'
import { ViewInterface, ViewComponent } from './views/view-interface'
import { TokenStore } from './tokenStore'
import { SelectIssuers } from './views/select-issuers'
import { SelectWallet } from './views/select-wallet'

export type UIType = 'popup' | 'inline' // TODO: implement modal too
export type PopupPosition = 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right'
export type UItheme = 'light' | 'dark'
export type ViewType = 'start' | 'main' | 'wallet'

export interface UIOptionsInterface {
	uiType?: UIType
	containerElement?: string
	openingHeading?: string
	issuerHeading?: string
	repeatAction?: string
	theme?: UItheme
	position?: PopupPosition
	autoPopup?: boolean
	alwaysShowStartScreen?: boolean
	viewOverrides?: {
		[type: string]: {
			component?: ViewComponent
			options?: { [key: string]: any }
		}
	}
}

export interface UiInterface {
	viewContainer: HTMLElement
	initialize(): Promise<void>
	updateUI(ViewClass: ViewComponent | ViewType, data?: any)
	closeOverlay(): void
	openOverlay(): void
	togglePopup(): void
	viewIsNotStart(): boolean
	showError(error: string | Error)
	showError(error: string | Error, canDismiss: boolean)
	setErrorRetryCallback(retryCallback?: Function)
	showLoader(...message: string[])
	showLoaderDelayed(messages: string[], delay: number)
	showLoaderDelayed(messages: string[], delay: number, openOverlay: boolean)
	dismissLoader()
	switchTheme(newTheme: UItheme)
}

export class Ui implements UiInterface {
	protected static UI_CONTAINER_HTML = `
		<div class="overlay-content-tn" aria-label="Token negotiator overlay">
			<div class="load-container-tn" style="display: none;">
				<div class="lds-ellipsis loader-tn"><div></div><div></div><div></div><div></div></div>
				<div class="loader-msg-tn"></div>
				<button class="dismiss-error-tn btn-tn">Dismiss</button>
			</div>
			<div class="view-content-tn"></div>
		</div>
	`

	protected static FAB_BUTTON_HTML = `
		<button aria-label="token negotiator toggle" class="overlay-fab-button-tn">
		  <div class="overlay-fab-button-tn-img-container"></div>
		</button>
	`

	options?: UIOptionsInterface
	client: Client
	popupContainer: any
	viewContainer: any
	loadContainer: any
	currentView: ViewInterface | undefined
	retryCallback?: Function
	retryButton: any

	private isStartView = true

	constructor(options: UIOptionsInterface, client: Client) {
		this.options = options
		this.client = client
	}

	async initialize() {
		this.popupContainer = document.querySelector(this.options.containerElement)

		if (!this.popupContainer) {
			this.popupContainer = document.createElement('div')
			this.popupContainer.className = 'overlay-tn'
			document.body.appendChild(this.popupContainer)
		}

		this.initializeUIType()

		this.setTheme(this.options?.theme ?? 'light')

		this.viewContainer = this.popupContainer.querySelector('.view-content-tn')
		this.loadContainer = this.popupContainer.querySelector('.load-container-tn')
		this.retryButton = this.loadContainer.querySelector('.dismiss-error-tn')

		this.retryButton.addEventListener('click', () => {
			this.dismissLoader()
			if (this.retryCallback) {
				this.retryCallback()
				this.retryCallback = undefined
				this.retryButton.innerText = 'Dismiss'
			}
		})

		this.updateUI(await this.getStartScreen())
	}

	public getViewFactory(type: ViewType): [ViewComponent, { [key: string]: any }] {
		let viewOptions = {}

		if (this.options.viewOverrides?.[type]) {
			if (this.options.viewOverrides?.[type].options) viewOptions = this.options.viewOverrides?.[type].options

			if (this.options.viewOverrides?.[type].component)
				return [this.options.viewOverrides?.[type].component, viewOptions]
		}

		return [this.getDefaultView(type), viewOptions]
	}

	protected getDefaultView(type: ViewType): ViewComponent {
		switch (type) {
			case 'start':
				return Start
			case 'main':
				return SelectIssuers
			case 'wallet':
				return SelectWallet
		}
	}

	public async getStartScreen() {
		if (
			this.options.alwaysShowStartScreen ||
			!localStorage.getItem(TokenStore.LOCAL_STORAGE_KEY) ||
			!this.client.getTokenStore().getTotalTokenCount()
		)
			return 'start'

		if (await this.canSkipWalletSelection()) {
			this.client.enrichTokenLookupDataOnChainTokens()
			return 'main'
		} else {
			return 'wallet'
		}
	}

	public async canSkipWalletSelection() {
		if (this.client.getTokenStore().hasOnChainTokens()) {
			let wp = await this.client.getWalletProvider()
			await wp.loadConnections()
			return wp.getConnectedWalletData().length > 0
		} else {
			return true
		}
	}

	getUIContainer() {
		return Ui.UI_CONTAINER_HTML
	}

	getFabButton() {
		return Ui.FAB_BUTTON_HTML
	}

	initializeUIType() {
		this.popupContainer.classList.add(this.options.uiType + '-tn')

		switch (this.options.uiType) {
			case 'popup':
				this.options.position
					? this.popupContainer.classList.add(this.options.position)
					: this.popupContainer.classList.add('bottom-right')

				this.popupContainer.innerHTML = this.getUIContainer() + this.getFabButton()

				this.popupContainer
					.querySelector('.overlay-fab-button-tn')
					.addEventListener('click', this.togglePopup.bind(this))

				this.popupContainer.addEventListener('click', (event: Event) => {
					event.stopPropagation()
				})

				document.addEventListener('click', () => {
					this.closeOverlay()
				})

				break
			case 'inline':
				this.popupContainer.innerHTML = Ui.UI_CONTAINER_HTML

				break
		}
	}

	closeOverlay() {
		if (this.options.uiType === 'inline') return
		this.popupContainer.classList.add('close')
		this.popupContainer.classList.remove('open')
	}

	openOverlay() {
		if (this.options.uiType === 'inline') return
		// Prevent out-of-popup click from closing the popup straight away
		setTimeout(() => {
			this.popupContainer.classList.add('open')
			this.popupContainer.classList.remove('close')
		}, 10)
	}

	togglePopup() {
		requiredParams(this.popupContainer, 'No overlay element found.')
		let openOverlay = !this.popupContainer.classList.contains('open')
		if (openOverlay) {
			this.openOverlay()
		} else {
			this.closeOverlay()
		}
	}

	updateUI(viewFactory: ViewComponent | ViewType, data?: any) {
		let viewOptions = {}

		if (typeof viewFactory === 'string') {
			this.isStartView = viewFactory === 'start'

			const [component, opts] = this.getViewFactory(viewFactory)
			viewFactory = component
			viewOptions = opts
		} else {
			this.isStartView = false
		}

		if (!this.viewContainer) {
			logger(3, 'Element .overlay-content-tn not found: popup not initialized')
			return
		}

		// @ts-ignore
		this.currentView = new viewFactory(this.client, this, this.viewContainer, {
			options: this.options,
			viewOptions,
			data: data,
		})

		this.currentView.render()
	}

	viewIsNotStart() {
		return !this.isStartView
	}

	showError(error: string | Error, canDismiss = true) {
		this.cancelDelayedLoader()

		if (typeof error !== 'string') {
			if (error.name === ClientError.USER_ABORT) {
				return this.dismissLoader()
			}
			error = error.message ? error.message : error.toString()
		} else {
			if (error === ClientError.USER_ABORT) return this.dismissLoader()
		}

		this.loadContainer.querySelector('.loader-tn').style.display = 'none'
		this.retryButton.style.display = 'block'

		this.loadContainer.querySelector('.loader-msg-tn').innerHTML = error

		this.loadContainer.style.display = 'flex'

		if (!canDismiss) {
			this.loadContainer.querySelector('.dismiss-error-tn').style.display = 'none'
		}
	}

	setErrorRetryCallback(retryCallback?: Function) {
		this.retryCallback = retryCallback
		this.retryButton.innerText = 'Retry'
	}

	loadTimer?: any = null

	showLoaderDelayed(messages: string[], delay: number, openOverlay = false) {
		if (this.loadTimer) clearTimeout(this.loadTimer)

		this.loadTimer = setTimeout(() => {
			this.showLoader(...messages)
			if (openOverlay) this.openOverlay()
		}, delay)
	}

	protected cancelDelayedLoader() {
		if (this.loadTimer) {
			clearTimeout(this.loadTimer)
			this.loadTimer = null
		}
	}

	showLoader(...message: string[]) {
		this.cancelDelayedLoader()

		this.loadContainer.querySelector('.loader-tn').style.display = 'block'
		this.loadContainer.querySelector('.dismiss-error-tn').style.display = 'none'

		this.loadContainer.querySelector('.loader-msg-tn').innerHTML = message.join('\n')

		this.loadContainer.style.display = 'flex'
	}

	dismissLoader() {
		this.cancelDelayedLoader()
		this.loadContainer.style.display = 'none'
	}

	protected setTheme(theme: UItheme) {
		if (this.popupContainer) {
			this.popupContainer.classList.remove(this.options.theme + '-tn')
			theme = this.validateTheme(theme)
			this.popupContainer.classList.add(theme + '-tn')
			this.options.theme = theme
		}
	}

	private validateTheme(theme: string): UItheme {
		if (theme && theme === 'dark') {
			return theme
		}
		return 'light'
	}

	switchTheme(newTheme: UItheme) {
		this.setTheme(newTheme)
	}
}
