import {AbstractView} from "./view-interface";

export class Start extends AbstractView {

	render(){

		this.viewContainer.innerHTML = this.renderMainTemplate();

		// this.viewContainer.innerHTML = this.renderMainTemplate({openingHeading: this.params.options.openingHeading});

		this.viewContainer.querySelector('.opening-btn-tn').addEventListener('click', this.goToWalletSelection.bind(this));
	}

	renderMainTemplate(){
		return `
			<div class="opening-content-view-tn">
              <div class="brand-tn"></div>
              <div class="inner-content-tn">
                <div class="inner-content-block-tn">
                  <button class="opening-btn-tn" aria-label="Start connecting your tokens">${this.params.options.buttonText ?? "Let's go!"}</button>
                  <div class="opening-heading-tn">${this.params.options.openingHeading}</div>
                </div>
              </div>
            </div>
		`;
	}

	/* renderMainTemplate(params: {[key: string]: any}){
		return this.params.options.mainContent(params) ?? `
			<div class="opening-content-view-tn">
              <div class="brand-tn"></div>
              <div class="inner-content-tn">
                <div class="inner-content-block-tn">
                  <button class="opening-btn-tn" aria-label="Start connecting your tokens">Let's go!</button>
                  <div class="opening-heading-tn">${params.openingHeading}</div>
                </div>
              </div>
            </div>
		`;
	}*/

	async goToWalletSelection() {

		this.ui.showLoaderDelayed(["Initializing wallet.."], 500);

		if (await this.ui.canSkipWalletSelection()){
			this.client.enrichTokenLookupDataOnChainTokens();
			this.ui.updateUI("main");
		} else {
			this.ui.updateUI("wallet");
		}

		this.ui.dismissLoader();

	}

}