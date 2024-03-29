import { AbstractView } from './view-interface'
import { logger } from '../../utils'
import { UIUpdateEventType } from '../index'
import { getWalletInfo, WalletInfo } from './utils/wallet-info'
import { SupportedWalletProviders } from '../../wallet/Web3WalletProvider'
import { getBrowserData } from '../../utils/support/getBrowserData'
import { SupportedBlockchainsEnum } from './../interface';

export class SelectWallet extends AbstractView {
	init() {
		this.client.registerUiUpdateCallback(UIUpdateEventType.WALLET_DISCONNECTED, undefined)
	}

	render() {
		let walletButtons = ''

		if (this.client.hasIssuerForBlockchain(SupportedBlockchainsEnum.EVM)) {
			if (this.client.safeConnectAvailable()) {
				const safeConnect = getWalletInfo(SupportedWalletProviders.SafeConnect)
				walletButtons += this.getWalletButtonHtml(safeConnect)
			}

			const alphaWallet = getWalletInfo(SupportedWalletProviders.AlphaWallet)
			walletButtons += this.getWalletButtonHtml(alphaWallet)

			if (typeof window.ethereum !== 'undefined') {
				const injectedWallet = getWalletInfo(SupportedWalletProviders.MetaMask)
				walletButtons += this.getWalletButtonHtml(injectedWallet)
			}

			const walletConnectV2 = getWalletInfo(SupportedWalletProviders.WalletConnectV2)
			const supportedWallets = [walletConnectV2]

			const browserData = getBrowserData()

			if (!browserData.edgeIOS) {
				supportedWallets.push(getWalletInfo(SupportedWalletProviders.Torus))
			}

			for (const walletInfo of supportedWallets) {
				walletButtons += this.getWalletButtonHtml(walletInfo)
			}
		}

		if (this.client.hasIssuerForBlockchain(SupportedBlockchainsEnum.EVM, true)) {
			const socios = getWalletInfo(SupportedWalletProviders.Socios)
			walletButtons += this.getWalletButtonHtml(socios)
		}

		if (this.client.hasIssuerForBlockchain(SupportedBlockchainsEnum.SOLANA)) {
			const phantom = getWalletInfo(SupportedWalletProviders.Phantom)
			walletButtons += this.getWalletButtonHtml(phantom)
		}

		if (this.client.hasIssuerForBlockchain(SupportedBlockchainsEnum.FLOW)) {
			const flow = getWalletInfo(SupportedWalletProviders.Flow)
			walletButtons += this.getWalletButtonHtml(flow)
		}

		if (this.client.hasIssuerForBlockchain(SupportedBlockchainsEnum.ULTRA)) {
			const ultra = getWalletInfo(SupportedWalletProviders.Ultra)
			walletButtons += this.getWalletButtonHtml(ultra)
		}

		this.viewContainer.innerHTML = `
            <div class="inner-content-tn scroll-tn">
              <div class="wallet-selection-view-tn">
                <div class="issuer-view-tn">
                  <div class="brand-tn">
                  	${
											this.params.viewOptions.backButtonView
												? `
                  		<button aria-label="back to token issuer menu" class="back-to-menu-tn" style="float: left; position: absolute;">
							<svg style="position: relative; top: 1px;" width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fill-rule="evenodd">
									<path d="m10.2 15.8 7.173 7.56c.55.587 1.453.587 2.01 0a1.554 1.554 0 0 0 0-2.12l-5.158-5.44 5.157-5.44a1.554 1.554 0 0 0 0-2.12 1.367 1.367 0 0 0-2.009 0L10.2 15.8z" fill="#000" fill-rule="nonzero"/>
								</g>
							</svg>
						</button>
                  	`
												: ''
										}
				  </div>
                  <div class="headline-container-tn">
                    <p style="text-align: center;">Select Wallet</p>
                  </div>
                  <div class="wallet-button-container-tn">
                  	${walletButtons}
                  </div>
                </div>
              </div>
            </div>
        `

		this.viewContainer.querySelectorAll('.wallet-button-tn').forEach((elem: any) => {
			elem.addEventListener('click', this.connectWallet.bind(this))
		})
	}

	private getWalletButtonHtml(wallet: WalletInfo) {
		return `
			<button class="wallet-button-tn ${wallet.name}" data-wallet="${wallet.name}" aria-label="${wallet.label} wallet button">
				${wallet.imgBig}
				<p>${wallet.label}</p>
			</button>
		`
	}

	async connectWallet(e: any) {
		let wallet: any = e.currentTarget.dataset.wallet
		let walletlabel: string = e.currentTarget.dataset.walletlabel
		walletlabel = walletlabel ?? wallet

		logger(2, 'Connect wallet: ' + wallet)

		this.ui.setForceToOpen(true)

		this.ui.showLoaderDelayed(
			['<h4>Connecting to ' + walletlabel + '...</h4>', '<small>You may need to unlock your wallet to continue.</small>'],
			500,
		)

		try {
			await this.client.negotiatorConnectToWallet(wallet)
			this.ui.dismissLoader()

			if (this.params?.data?.connectCallback) {
				this.params?.data?.connectCallback()
			} else {
				// TODO: It may be better/faster to fire this on view load.
				this.client.enrichTokenLookupDataOnChainTokens()
				this.ui.updateUI('main', { viewName: 'main' }, { viewTransition: 'slide-in-right' })
			}
			this.ui.setForceToOpen(false)
		} catch (err: any) {
			logger(2, 'negotiatorConnectToWallet error', e)
			this.ui.showError(err)
			setTimeout(() => {
				console.log('this.ui.setForceToOpen(false)')
				this.ui.setForceToOpen(false)
			}, 0)
		}
	}
}
