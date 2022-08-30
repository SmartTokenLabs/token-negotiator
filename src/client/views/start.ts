import {AbstractView} from "./view-interface";
import {SelectWallet} from "./select-wallet";
import {SelectIssuers} from "./select-issuers";

export class Start extends AbstractView {

	render(){
		this.viewContainer.innerHTML = `
            <div class="opening-content-view-tn">
              <div class="brand-tn"></div>
              <div class="inner-content-tn">
                <div class="inner-content-block-tn">
                  <button class="opening-btn-tn" aria-label="Start connecting your tokens">Let's go!</button>
                  <div class="opening-heading-tn">${this.params.options.openingHeading}</div>
                </div>
              </div>
            </div>
        `;

		this.viewContainer.querySelector('.opening-btn-tn').addEventListener('click', this.goToWalletSelection.bind(this));
	}

	async goToWalletSelection() {
		this.client.checkInternetConnectivity();

		// TODO: Enable skipping of start screen when wallet is already connected?
		this.ui.showLoaderDelayed(["Initializing wallet.."], 500);

		if (this.client.getTokenStore().hasOnChainTokens()){
			let wp = await this.client.getWalletProvider();
			await wp.loadConnections();
			this.client.enrichTokenLookupDataOnChainTokens();
			this.ui.updateUI(wp.getConnectedWalletData().length ? SelectIssuers : SelectWallet);
		} else {
			this.ui.updateUI(SelectIssuers);
		}

		this.ui.dismissLoader();

	}

}