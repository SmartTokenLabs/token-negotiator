import {AbstractView} from "./view-interface";

interface CreateTokenInterface {
    tokenIssuerKey: string;
    title: string;
    index: number;
    emblem: string;
    data: any;
    toggleState: boolean;
}

export class SelectIssuers extends AbstractView {

    issuerListContainer:any;
    tokensContainer:any;

    render(){

        this.viewContainer.innerHTML = `
            <div class="inner-content-tn">
              <div class="issuer-view-tn">
                <div class="brand-tn"></div>
                <div class="headline-container-tn">
                  <p class="headline-tn">${this.params.options.issuerHeading}</p>
                </div>
                <ul class="token-issuer-list-container-tn" role="menubar"></ul>
              </div>
              <div class="token-view-tn" style="display: none;">
                <div class="brand-tn"></div>
                <div style="display: flex">
                  <button aria-label="back to token issuer menu" class="back-to-menu-tn">
                    <svg style="position: relative; top: 1px;" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fill-rule="evenodd">
                            <circle fill="#EFEFEF" cx="16" cy="16" r="16"/>
                            <path d="m10.2 15.8 7.173 7.56c.55.587 1.453.587 2.01 0a1.554 1.554 0 0 0 0-2.12l-5.158-5.44 5.157-5.44a1.554 1.554 0 0 0 0-2.12 1.367 1.367 0 0 0-2.009 0L10.2 15.8z" fill="#000" fill-rule="nonzero"/>
                        </g>
                    </svg>
                  </button>
                  <p class="headline-tn token-name">Token Name Here</p>
                </div>
                <ul class="token-list-container-tn" role="menubar"></ul>
              </div>
            </div>
        `;

        this.viewContainer.querySelector('.back-to-menu-tn').addEventListener('click', this.backToIssuers.bind(this));

        this.issuerListContainer = document.querySelector(".token-issuer-list-container-tn");
        this.tokensContainer = document.getElementsByClassName("token-view-tn")[0];

        if (!this.issuerListContainer){
            console.log("Element .token-issuer-list-container-tn not found");
            return;
        }

        this.populateIssuers();

    }

    // TODO: back to wallet selection?

    populateIssuers(){

        let data = this.client.getTokenData();

        let html = "";

        data.offChainTokens.tokenKeys.map((issuer: string) => {
            html += this.issuerConnectMarkup(data.tokenLookup[issuer].title, data.tokenLookup[issuer].emblem, issuer);
        });

        data.onChainTokens.tokenKeys.map((issuer: string) => {
            html += this.issuerConnectMarkup(data.tokenLookup[issuer].title, data.tokenLookup[issuer].emblem, issuer);
        });

        this.issuerListContainer.innerHTML = html;

        this.issuerListContainer.querySelectorAll('.connect-btn-tn').forEach((elem:any) => {
            elem.addEventListener('click', this.connectTokenIssuer.bind(this));
        });
        this.issuerListContainer.querySelectorAll('.tokens-btn-tn').forEach((elem:any) => {
            elem.addEventListener('click', this.navigateToTokensView.bind(this));
        });
    }

    issuerConnectMarkup(title:string, image:string, issuer:string){
        return `
            <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
              <div style="display: flex; align-items: center;">
                <img style="height: 32px; width: 32px; border-radius: 45px; margin-right: 9px;" src="${image}">
                <p class="issuer-connect-title">${title}</p>
              </div>
              <button aria-label="connect with the token issuer ${issuer}" aria-hidden="false" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="connect-btn-tn" data-issuer="${issuer}">Connect</button>
              <button aria-label="tokens available from token issuer ${issuer}" aria-hidden="true" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="tokens-btn-tn" data-issuer="${issuer}">Tokens Available</button>
            </li>
        `;
    }

    backToIssuers(){

        this.tokensContainer.style.display = 'none';

        this.viewContainer.classList.toggle("open");

        const connectBtns = this.viewContainer.querySelectorAll(`.connect-btn-tn`);

        const tokenBtns = this.viewContainer.querySelectorAll(`.tokens-btn-tn`);

        connectBtns.forEach(function (userItem:any) {

            userItem.setAttribute('aria-expanded', false);

        });

        tokenBtns.forEach(function (userItem:any) {

            userItem.setAttribute('aria-expanded', false);

        });

        const issuerViewEl = this.viewContainer.querySelector(`.issuer-view-tn`);

        const tokenViewEl = this.viewContainer.querySelector(`.token-view-tn`);

        issuerViewEl.setAttribute('aria-hidden', true);

        tokenViewEl.setAttribute('aria-hidden', false);

    }

    async connectTokenIssuer(event:any) {

        const data = event.currentTarget.dataset ?? event.target.dataset;
        const issuer = data.issuer;

        let tokens:any[] = [];

        try {
            tokens = await this.client.connectTokenIssuer(issuer);
        } catch (err){
            console.log(err); // TODO: error handling
            return;
        }

        this.issuerConnected(issuer, tokens);
    }

    issuerConnected(issuer: string, tokens:any[]) {

        const connectBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);

        const tokenBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

        if (!connectBtn || !tokenBtn){
            console.log("Could not find button handler");
        }

        connectBtn.style.display = "none";

        connectBtn.setAttribute('tabIndex', -1);

        tokenBtn.style.display = "block";

        //if(onChain) {

            tokenBtn.innerHTML = `${tokens.length} token/s available`;
            tokenBtn.setAttribute('aria-label', `Navigate to select from ${tokens.length} of your ${issuer} tokens`);

        /*} else {

            tokenBtn.innerHTML = `${this.offChainTokens[issuer].tokens.length} token/s available`;
            tokenBtn.setAttribute('aria-label', `Navigate to select from ${this.offChainTokens[issuer].tokens.length} of your ${issuer} tokens`);

        }*/

        tokenBtn.setAttribute('tabIndex', 1);

    }

    navigateToTokensView(event: any) {

        const issuer = event.currentTarget.dataset.issuer;

        this.embedTokensIntoView(issuer);

        this.showTokenView(issuer);

    }

    embedTokensIntoView(issuer:string) {

        //const refTokenViewSelector = document.getElementsByClassName("token-view-tn")[0];

        /*if (!issuer) {

            refTokenViewSelector.style.display = 'none';
            return;

        }*/

        this.tokensContainer.style.display = 'block';

        this.tokensContainer.scrollTo(0, 0);

        const refTokenContainerSelector = this.tokensContainer.getElementsByClassName("token-list-container-tn")[0];

        refTokenContainerSelector.innerHTML = "";

        const tokenData = this.client.getTokenData();

        const config = this.client.getTokenData().tokenLookup[issuer];

        const location = config.onChain === false ? 'offChainTokens' : 'onChainTokens';

        document.getElementsByClassName("headline-tn token-name")[0].innerHTML = config.title;

        let html = "";

        tokenData[location][issuer].tokens.map((t: any, i: any) => {

            // TODO - Memory usage: load extra tokens when user scrolls to bottom of issuer
            // if(i < 25) {

            const { title, emblem } = config;

            let isSelected = false;

            // TODO Define a constant value that can be checked regardless of which issuer token to speed up this check.

            tokenData.selectedTokens[issuer]?.tokens.map((st:any, si:any) => {

                if (t.toString() === st.toString()) isSelected = true;

            });

            html += this.createTokenMarkup({
                data: t,
                tokenIssuerKey: issuer,
                index: i,
                title: t.title ? t.title : title,
                emblem: t.image ? t.image : emblem,
                toggleState: isSelected
            });

            // }

        });

        refTokenContainerSelector.innerHTML = html;

        refTokenContainerSelector.querySelectorAll('.mobileToggle-tn').forEach((elem:any) => {
            elem.addEventListener('click', this.tokenToggleSelection.bind(this));
        });
    }

    createTokenMarkup(config: CreateTokenInterface) {

        const { tokenIssuerKey, title, data, index, emblem, toggleState } = config;
        return `
            <li class='token-tn'>
              <img class='emblem-tn' src=${emblem} />
              <div class='data-tn'>
                  <p class='token-title-tn'>${title}</p>
                  <p class='detail-tn'>#${index}</p>
                </div>
              <div class='toggle-tn'>
                <input ${toggleState ? 'checked' : '' } data-key='${tokenIssuerKey}' data-token='${JSON.stringify(data)}' data-index='${index}' type='checkbox' name='toggle${index}' class='mobileToggle-tn toggle-tn' id='toggle${index}'>
                <label for='toggle${index}'></label>
              </div>
            </li>
        `;
    }

    showTokenView(issuer: string) {

        //var element = document.getElementsByClassName("overlay-content-tn")[0];

        this.viewContainer.classList.toggle("open");

        if (issuer) {

            const connectBtn = this.viewContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);

            const tokenBtn = this.viewContainer.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

            connectBtn.setAttribute('aria-expanded', true);

            tokenBtn.setAttribute('aria-expanded', false);

            const issuerViewEl = this.viewContainer.querySelector(`.issuer-view-tn`);

            const tokenViewEl = this.viewContainer.querySelector(`.token-view-tn`);

            issuerViewEl.setAttribute('aria-hidden', false);

            tokenViewEl.setAttribute('aria-hidden', true);

        } /*else {

            const connectBtns = this.viewContainer.querySelectorAll(`.connect-btn-tn`);

            const tokenBtns = this.viewContainer.querySelectorAll(`.tokens-btn-tn`);

            connectBtns.forEach(function (userItem:any) {

                userItem.setAttribute('aria-expanded', false);

            });

            tokenBtns.forEach(function (userItem:any) {

                userItem.setAttribute('aria-expanded', false);

            });

            const issuerViewEl = this.viewContainer.querySelector(`.issuer-view-tn`);

            const tokenViewEl = this.viewContainer.querySelector(`.token-view-tn`);

            issuerViewEl.setAttribute('aria-hidden', true);

            tokenViewEl.setAttribute('aria-hidden', false);

        }*/
    }

    // TODO: probably don't need to iterate all inputs.
    tokenToggleSelection() {

        let selectedTokens = this.client.getTokenData().selectedTokens;

        this.tokensContainer.querySelectorAll('.mobileToggle-tn').forEach((token: any, index: number) => {

            if (index === 0) {

                selectedTokens[token.dataset.key] = {};

                selectedTokens[token.dataset.key]['tokens'] = [];

            }

            if (token.checked === true) {

                let output = JSON.parse(token.dataset.token);

                selectedTokens[token.dataset.key].tokens.push(output);

            }

        });

        console.log("Tokens selected:");
        console.log(selectedTokens);
        //console.trace();

        this.client.updateSelectedTokens(selectedTokens);

    }

}