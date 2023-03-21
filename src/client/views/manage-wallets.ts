import { AbstractView } from './view-interface'
import { SupportedBlockchainsParam } from '../interface'
import { UIUpdateEventType } from '../index'
import { getWalletInfo } from './utils/wallet-info'

const DisconnectButtonSVG = `
	<svg width="12px" height="100%" viewBox="0 0 384 384" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
		<g id="Layer1">
		<path d="M194.449,-0.378L194.449,29.622L29.577,29.622C29.577,95.909 30.577,354.191 30.577,354.191L194.449,354.191L194.449,384.191L16.077,384.191C7.517,384.191 0.577,377.251 0.577,368.691L0.577,15.122C0.577,6.562 7.517,-0.378 16.077,-0.378L194.449,-0.378Z"/>
			<g transform="matrix(1.39537,0,0,2.43013,-54.9803,-262.053)">
				<path d="M99.772,200.171L99.772,165.725L228.493,165.725L228.493,133.741L314.191,182.948L228.493,232.156L228.493,200.171L99.772,200.171Z"/>
			</g>
			</g>
	</svg>
`

export class ManageWallets extends AbstractView {
	init() {
		this.client.registerUiUpdateCallback(UIUpdateEventType.WALLET_CHANGE, async () => {
			const wallets = await this.client.getWalletProvider()

			if (wallets.getConnectionCount() === 0) {
				this.ui.updateUI('wallet', { viewName: 'wallet' }, { viewTransition: 'slide-in-left' })
			} else {
				await this.render()
			}
		})
	}

	async render() {
		this.viewContainer.innerHTML = `
			<div class="inner-content-tn" style="flex-direction: column; width: 100% !important;">
				<div class="scroll-tn">
					<div class="headline-container-tn">
						<div>
							<div class="brand-tn">
								<button aria-label="back to token issuer menu" class="back-to-menu-tn">
									<svg style="position: relative; top: 1px;" width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
										<g fill="none" fill-rule="evenodd">
											<path d="m10.2 15.8 7.173 7.56c.55.587 1.453.587 2.01 0a1.554 1.554 0 0 0 0-2.12l-5.158-5.44 5.157-5.44a1.554 1.554 0 0 0 0-2.12 1.367 1.367 0 0 0-2.009 0L10.2 15.8z" fill="#000" fill-rule="nonzero"/>
										</g>
									</svg>
								</button>
							</div>
							<div style="flex-grow: 1;">
								<p class="headline-tn">My Wallets</p>
							</div>
							<div class="toolbar-tn">
								<button class="btn-tn add-wallet-tn" aria-label="Add another wallet" title="Add another wallet">
									<strong style="font-size: 20px; line-height: 12px;">+</strong>
								</button>
								<button class="btn-tn dis-wallet-tn" aria-label="Disconnect all wallets" title="Disconnect all wallets">
									${DisconnectButtonSVG}									
								</button>
							</div>  	
						</div>
					</div>
					<div class="wallet-list-tn" style="width: 100%;">
						${await this.renderCurrentWalletConnections()}
					</div>
				</div>
			</div>
		`

		this.setupWalletButtons()
		this.setupBackButton()
	}

	private setupWalletButtons() {
		this.viewContainer.querySelectorAll('.dis-wallet-tn').forEach((elem) =>
			elem.addEventListener('click', (e) => {
				const elem = e.currentTarget
				this.client.disconnectWallet(
					elem.hasAttribute('data-address') ? elem.getAttribute('data-address') : null,
					elem.hasAttribute('data-providertype') ? elem.getAttribute('data-providertype') : null,
				)
			}),
		)

		const addWalletBtn = this.viewContainer.querySelector('.add-wallet-tn')
		addWalletBtn.addEventListener('click', () => {
			this.ui.updateUI('wallet', null, { viewTransition: 'slide-in-right', backButtonView: 'manage-wallets' })
		})
	}

	private setupBackButton() {
		const backBtn = this.viewContainer.querySelector('.back-to-menu-tn')
		backBtn.addEventListener('click', () => {
			this.ui.updateUI('main', null, { viewTransition: 'slide-in-left' })
		})
	}

	async renderCurrentWalletConnections() {
		const wallets = await this.client.getWalletProvider()

		let html = ''

		for (const blockchain of ['evm', 'solana', 'flow'] as SupportedBlockchainsParam[]) {
			// If TN has connected wallets of this type, render the header and each wallet connection as a row
			if (wallets.hasAnyConnection([blockchain])) {
				let typeLabel = ''

				switch (blockchain) {
					case 'evm':
						typeLabel = 'Ethereum EVM'
						break
					case 'solana':
						typeLabel = 'Solana'
						break
					case 'flow':
						typeLabel = 'Flow'
						break
					default:
						typeLabel = blockchain
				}

				html += `<h3 class="wallets-header headline-tn">${typeLabel}</h3>`

				for (const connection of wallets.getConnectedWalletData(blockchain)) {
					const address = connection.address

					html += `
						<div class="wallet-connection-tn">
							<div class="wallet-icon-tn">
								${getWalletInfo(connection.providerType)?.imgBig}
							</div>
							<div class="wallet-info-tn">
								<small class="wallet-address-tn" title="${address}">
									<span class="ellipsis">${address.substring(0, address.length - 5)}</span>
									${address.substring(address.length - 5, address.length)}
								</small>
								<div class="wallet-name-tn">${connection.providerType}</div>
							</div>
							<div class="wallet-disconnect-tn">
								<button class="btn-tn dis-wallet-tn" aria-label="Disconnect Wallet" title="Disconnect Wallet" data-address="${address}" data-providertype="${
						connection.providerType
					}">
									${DisconnectButtonSVG}
								</button>
							</div>
						</div>
					`
				}
			}
		}

		return html
	}
}
