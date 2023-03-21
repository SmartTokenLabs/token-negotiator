import { AbstractView } from './view-interface'
import { TokenList, TokenListItemInterface } from './token-list'
import { IconView } from './icon-view'
import { logger } from '../../utils'
import { UIUpdateEventType } from '../index'
import { Issuer } from '../interface'

export class SelectIssuers extends AbstractView {
	issuerListContainer: any
	tokensContainer: any
	tokenListView: TokenList | undefined

	init() {
		this.client.registerUiUpdateCallback(UIUpdateEventType.ISSUERS_LOADING, () => {
			this.issuersLoading()
		})

		this.client.registerUiUpdateCallback(UIUpdateEventType.ISSUERS_LOADED, () => {
			this.ui.dismissLoader()
			this.client.cancelTokenAutoload()
			this.render()
		})

		this.client.registerUiUpdateCallback(UIUpdateEventType.WALLET_CHANGE, async () => {
			if (this.client.getTokenStore().hasOnChainTokens()) {
				const wallets = await this.client.getWalletProvider()
				if (wallets.getConnectionCount() === 0) {
					this.ui.updateUI('wallet', { viewName: 'wallet' }, { viewTransition: 'slide-in-left' })
				} else {
					await this.render()
				}
			} else {
				this.ui.updateUI('start', { viewName: 'start' }, { viewTransition: 'slide-in-left' })
			}
		})
	}

	async render() {
		await this.renderContent()
		this.afterRender()
	}

	protected async renderContent() {
		this.viewContainer.innerHTML = `
            <div class="inner-content-tn issuer-slider-tn">
              <div class="issuer-view-tn scroll-tn">
                <div class="brand-tn"></div>
                <div class="headline-container-tn">
                  <div>
                  	<p class="headline-tn">${this.params.options.issuerHeading}</p>
						<div class="toolbar-tn">
				  			<button class="btn-tn refresh-tn" aria-label="Refresh Tokens">
                  				<svg class="refresh-icon-tn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 383.748 383.748" style="enable-background:new 0 0 383.748 383.748;" xml:space="preserve"><g><path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30 C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593 L2.081,34.641v113.365h113.91L62.772,95.042z"/><path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042 c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888 c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"/></g></svg>
				  			</button>
							${await this.renderWalletButton()}
						</div>  	
				  </div>
				  ${this.getCustomContent()}
                </div>
				<nav class="token-issuer-nav-tn">
					<ul class="token-issuer-list-container-tn" role="menubar"></ul>
				</nav>
              </div>
              <div class="token-view-tn scroll-tn" style="display: none;">
                <div class="brand-tn"></div>
                <div style="display: flex; align-items: center;">
                  <button aria-label="back to token issuer menu" class="back-to-menu-tn">
                    <svg style="position: relative; top: 1px;" width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fill-rule="evenodd">
                            <path d="m10.2 15.8 7.173 7.56c.55.587 1.453.587 2.01 0a1.554 1.554 0 0 0 0-2.12l-5.158-5.44 5.157-5.44a1.554 1.554 0 0 0 0-2.12 1.367 1.367 0 0 0-2.009 0L10.2 15.8z" fill="#000" fill-rule="nonzero"/>
                        </g>
                    </svg>
                  </button>
                  <p class="headline-tn token-name">Token Name Here</p>
                </div>
                <ul class="token-list-container-tn" role="menubar"></ul>
              </div>
            </div>
        `

		this.viewContainer.querySelector('.back-to-menu-tn').addEventListener('click', this.backToIssuers.bind(this))

		this.setupWalletButton()

		const refreshBtn = this.viewContainer.querySelector('.refresh-tn')

		refreshBtn.addEventListener('click', () => {
			this.client.eventSender('tokens-refreshed', null)
			this.autoLoadTokens(true)
		})

		this.issuerListContainer = this.viewContainer.querySelector('.token-issuer-list-container-tn')
		this.tokensContainer = this.viewContainer.getElementsByClassName('token-view-tn')[0]

		if (!this.issuerListContainer) {
			logger(2, 'Element .token-issuer-list-container-tn not found')
			return
		}

		this.populateIssuers()

		let tokensListElem = this.tokensContainer.getElementsByClassName('token-list-container-tn')[0]

		this.tokenListView = new TokenList(this.client, this.ui, tokensListElem, { ...this.params })
	}

	protected afterRender() {
		if (this.client.issuersLoaded) {
			if (this.client.getTokenStore().hasUnloadedTokens()) this.autoLoadTokens()
		} else {
			this.issuersLoading()
		}
	}

	protected getCustomContent() {
		return ''
	}

	async renderWalletButton() {
		const hasWallets = this.client.getTokenStore().hasOnChainTokens()
		const title = hasWallets ? 'Manage Wallets' : 'Disconnect Wallet'

		return `
			<button class="btn-tn dis-wallet-tn" style="display: none;" aria-label="${title}" title="${title}">
				${
					hasWallets
						? `
					<svg fill="currentColor" height="100%" width="12px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 76.304 76.304" xml:space="preserve">
						<g>
							<path d="M72.325,33.234v-2.947c0-5.389-3.698-9.919-8.686-11.217l-0.009-4.859c0-4.742-3.859-8.601-8.603-8.601h-0.455L14.31,18.1
							c-0.917,0.053-1.787,0.265-2.604,0.584h-0.105C5.205,18.684,0,23.889,0,30.287v28.804c0,6.397,5.204,11.603,11.601,11.603h49.123
							c6.396,0,11.601-5.205,11.601-11.603V55.26c2.323-0.899,3.979-3.151,3.979-5.789v-10.45C76.303,36.385,74.648,34.133,72.325,33.234
							z M70.303,49.47c0,0.118-0.093,0.211-0.211,0.211H53.851c-0.118,0-0.21-0.093-0.21-0.211V39.021c0-0.115,0.094-0.209,0.21-0.209
							h16.241c0.116,0,0.211,0.094,0.211,0.209V49.47z M55.398,11.637c1.261,0.18,2.232,1.266,2.232,2.579l0.008,4.469H32.679
							L55.398,11.637z M60.724,64.693H11.602c-3.093,0-5.601-2.509-5.601-5.603V30.287c0-3.095,2.508-5.603,5.601-5.603h49.122
							c3.094,0,5.601,2.508,5.601,5.603v2.525H53.851c-3.424,0-6.21,2.785-6.21,6.209V49.47c0,3.425,2.786,6.211,6.21,6.211h12.474v3.41
							C66.325,62.184,63.818,64.693,60.724,64.693z"/>
						</g>
					</svg>
				`
						: `
					<svg width="15px" height="100%" viewBox="0 0 384 384" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
						<g id="Layer1">
						<path d="M194.449,-0.378L194.449,29.622L29.577,29.622C29.577,95.909 30.577,354.191 30.577,354.191L194.449,354.191L194.449,384.191L16.077,384.191C7.517,384.191 0.577,377.251 0.577,368.691L0.577,15.122C0.577,6.562 7.517,-0.378 16.077,-0.378L194.449,-0.378Z"/>
							<g transform="matrix(1.39537,0,0,2.43013,-54.9803,-262.053)">
								<path d="M99.772,200.171L99.772,165.725L228.493,165.725L228.493,133.741L314.191,182.948L228.493,232.156L228.493,200.171L99.772,200.171Z"/>
							</g>
						</g>
					</svg>
				`
				}											
			</button>
		`
	}

	async setupWalletButton() {
		const walletBtn = this.viewContainer.querySelector('.dis-wallet-tn')
		walletBtn.style.display = 'block'
		walletBtn.addEventListener('click', () => {
			if (this.client.getTokenStore().hasOnChainTokens()) {
				this.ui.updateUI('manage-wallets', null, { viewTransition: 'slide-in-right' })
			} else {
				this.client.disconnectWallet()
			}
		})
	}

	issuersLoading() {
		this.ui.showLoader('<h4>Loading contract data...</h4>')
	}

	// TODO: back to wallet selection?

	populateIssuers() {
		let html = ''

		let issuers = this.client.getTokenStore().getCurrentIssuers()

		for (let issuerKey in issuers) {
			let data = issuers[issuerKey]
			let tokens = this.client.getTokenStore().getIssuerTokens(issuerKey) ?? []

			let title = data.title ? data.title : data.collectionID.replace(/[-,_]+/g, ' ')

			html += this.issuerConnectMarkup(title, data.image, issuerKey, tokens, data)
		}

		this.issuerListContainer.innerHTML = html

		for (let elem of this.issuerListContainer.getElementsByClassName('img-container-tn')) {
			let params = {
				src: elem.getAttribute('data-image-src'),
				title: elem.getAttribute('data-token-title'),
			}

			new IconView(elem, params).render()
		}

		this.issuerListContainer.addEventListener('click', (e: any) => {
			if (e.target.classList.contains('connect-btn-tn')) {
				this.connectTokenIssuer(e)
			} else if (e.target.classList.contains('tokens-btn-tn')) {
				const issuer = e.target.parentNode.dataset.issuer
				this.navigateToTokensView(issuer)
			}
		})
	}

	issuerConnectMarkup(title: string, image: string | undefined, issuer: string, tokens: any[], data: Issuer) {
		let buttonText = ''

		if (tokens?.length) buttonText = data?.fungible ? 'Balance found' : `${tokens.length} token${tokens.length > 1 ? 's' : ''} available`

		return `
            <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
              <div tabindex="0" style="display: flex; align-items: center;">
                <div class="img-container-tn issuer-icon-tn shimmer-tn" data-image-src="${image ?? ''}" data-token-title="${title}"></div>
                <p class="issuer-connect-title">${title}</p>
              </div>
              <button aria-label="connect with the token issuer ${issuer}" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" 
					class="connect-btn-tn"
					style="${tokens?.length ? 'display: none;' : ''}"
					data-issuer="${issuer}"
					${this.client.issuersLoaded === true ? '' : 'disabled'}
				>
				${
					this.client.issuersLoaded === true
						? 'Load'
						: '<div class="lds-ellipsis lds-ellipsis-sm" style=""><div></div><div></div><div></div><div></div></div>'
				}
			  </button>
              <button aria-label="tokens available from token issuer ${issuer}" 
										  aria-haspopup="true"
											aria-expanded="false" aria-controls="token-list-container-tn" 
              				class="tokens-btn-tn" style="${tokens?.length ? 'display: block;' : ''}" 
											data-issuer="${issuer}">
					${buttonText}
			  </button>
            </li>
        `
	}

	backToIssuers() {
		this.tokensContainer.style.display = 'none'

		this.viewContainer.querySelector('.issuer-slider-tn').classList.toggle('open')

		// TODO - Review and uplift this logic. Its not working as expected from tests
	}

	async autoLoadTokens(refresh = false) {
		await this.client.tokenAutoLoad(
			this.issuerLoading.bind(this),
			(issuer: string, tokens: any[]) => {
				if (!tokens?.length) {
					const connectBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`)

					if (connectBtn) connectBtn.innerText = 'Load'

					return
				}

				this.issuerConnected(issuer, tokens, false)
			},
			refresh,
		)
	}

	async connectTokenIssuer(event: any) {
		const data = event.target.dataset

		const issuer = data.issuer

		let tokens: unknown[] | void = []

		this.ui.showLoader('<h4>Loading tokens...</h4>')

		try {
			tokens = await this.client.connectTokenIssuer(issuer)

			if (!tokens) return // Site is redirecting
		} catch (err) {
			logger(2, err)
			this.ui.showError(err)
			this.client.eventSender('error', { issuer, error: err })
			return
		}

		this.ui.dismissLoader()

		if (!tokens?.length) {
			this.ui.showError(`No tokens found! ${this.client.getNoTokenMsg(issuer)}`)
			return
		}

		this.issuerConnected(issuer, tokens)
	}

	issuerLoading(issuer: string) {
		const tokensBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`)

		if (tokensBtn) tokensBtn.style.display = 'none'

		const connectBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`)

		if (connectBtn) {
			connectBtn.innerHTML = '<div class="lds-ellipsis lds-ellipsis-sm" style=""><div></div><div></div><div></div><div></div></div>'
			connectBtn.style.display = 'block'
		}
	}

	issuerConnected(issuer: string, tokens: any[], showTokens = true) {
		const connectBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`)
		const tokenBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`)

		if (!connectBtn || !tokenBtn) {
			logger(2, 'Could not find button handler')
		}

		connectBtn.style.display = 'none'
		connectBtn.setAttribute('tabIndex', -1)

		tokenBtn.style.display = 'block'
		let issuers = this.client.getTokenStore().getCurrentIssuers()

		tokenBtn.innerHTML =
			tokens.length && issuers[issuer].fungible ? 'Balance found' : `${tokens.length} token${tokens.length > 1 ? 's' : ''} available`
		tokenBtn.setAttribute('aria-label', `Navigate to select from ${tokens.length} of your ${issuer} tokens`)
		tokenBtn.setAttribute('tabIndex', 1)

		if (showTokens)
			setTimeout(() => {
				this.navigateToTokensView(issuer)
			}, 250)
	}

	navigateToTokensView(issuer: string) {
		this.updateTokensView(issuer)

		this.showTokenView(issuer)
	}

	updateTokensView(issuer: string) {
		this.tokensContainer.style.display = 'block'

		this.tokensContainer.scrollTo(0, 0)

		const tokenStore = this.client.getTokenStore()
		const config = tokenStore.getCurrentIssuers()[issuer]
		const tokenData = tokenStore.getIssuerTokens(issuer) ?? []

		if (config.title) this.viewContainer.getElementsByClassName('headline-tn token-name')[0].innerHTML = config.title

		let tokens: TokenListItemInterface[] = []

		tokenData?.map((t: any, i: any) => {
			let isSelected = false

			// TODO Define a constant value that can be checked regardless of which issuer token to speed up this check.
			tokenStore.getSelectedTokens()[issuer]?.tokens.map((st: any) => {
				if (JSON.stringify(t) === JSON.stringify(st)) isSelected = true
			})

			if (config.onChain === false) {
				const { title, image } = config

				tokens.push(<TokenListItemInterface>{
					data: t,
					tokenIssuerKey: issuer,
					index: t.tiketIdNumber ?? t.ticketIdNumber ?? i,
					title: title,
					image: image,
					toggleState: isSelected,
					hideToggle: config?.hideToggle,
				})
			} else {
				const tokenId = t.tokenId ?? i.toString()

				tokens.push({
					data: t,
					tokenIssuerKey: issuer,
					index: tokenId,
					title: t.title,
					image: t.image ?? config.image,
					fungible: config.fungible,
					decimals: config.decimals,
					symbol: config.symbol,
					balance: t.balance,
					toggleState: isSelected,
					hideToggle: config?.hideToggle,
				})
			}
		})

		this.tokenListView?.update({ data: { issuer: issuer, tokens: tokens } })
	}

	showTokenView(issuer: string) {
		this.viewContainer.querySelector('.issuer-slider-tn').classList.toggle('open')

		// TODO review and uplift this code, its not working as expected.
	}
}
