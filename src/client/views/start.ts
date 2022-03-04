import {AbstractView} from "./view-interface";
import {SelectWallet} from "./select-wallet";

export class Start extends AbstractView {

    render(){
        this.viewContainer.innerHTML = `
            <div class="opening-content-view-tn">
              <div class="brand-tn"></div>
              <div class="inner-content-tn">
                <div class="inner-content-block-tn">
                  <button class="opening-btn-tn">Let's go!</button>
                  <div class="opening-heading-tn">${this.params.options.openingHeading}</div>
                </div>
              </div>
            </div>
        `;

        this.viewContainer.querySelector('.opening-btn-tn').addEventListener('click', this.goToWalletSelection.bind(this));
    }

    goToWalletSelection(){
        this.popup.updatePopup(SelectWallet);
    }

}