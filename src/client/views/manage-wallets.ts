import { AbstractView } from './view-interface'

class ManageWallets extends AbstractView {
	render() {
		this.viewContainer.innerHTML = `
			<h1>Wallet Connections Here!</h1>
		`
	}
}
