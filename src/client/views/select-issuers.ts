import {AbstractView} from "./view-interface";
import {TokenList} from "./token-list";
import {TokenListItemInterface} from "./token-list";

export class SelectIssuers extends AbstractView {

    issuerListContainer:any;
    tokensContainer:any;
    tokenListView:TokenList|undefined;

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

        let tokensListElem = this.tokensContainer.getElementsByClassName("token-list-container-tn")[0];

        this.tokenListView = new TokenList(this.client, this.popup, tokensListElem, {});

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

        this.issuerListContainer.addEventListener('click', (e:any) => {
            if (e.target.classList.contains('connect-btn-tn')){
                this.connectTokenIssuer(e);
            } else if (e.target.classList.contains('tokens-btn-tn')){
                this.navigateToTokensView(e);
            }
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

        const data = event.target.dataset;
        const issuer = data.issuer;

        let tokens:any[] = [];

        this.popup.showLoader("<h4>Loading tokens...</h4>");

        try {
            tokens = await this.client.connectTokenIssuer(issuer);
        } catch (err){
            console.log(err);
            this.popup.showError((err as string));
            return;
        }

        this.popup.dismissLoader();

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
        tokenBtn.innerHTML = `${tokens.length} token/s available`;
        tokenBtn.setAttribute('aria-label', `Navigate to select from ${tokens.length} of your ${issuer} tokens`);
        tokenBtn.setAttribute('tabIndex', 1);

    }

    navigateToTokensView(event: any) {

        const issuer = event.target.parentNode.dataset.issuer;

        this.updateTokensView(issuer);

        this.showTokenView(issuer);
    }

    updateTokensView(issuer:string) {

        this.tokensContainer.style.display = 'block';

        this.tokensContainer.scrollTo(0, 0);

        const tokenData = this.client.getTokenData();
        const config = this.client.getTokenData().tokenLookup[issuer];
        const location = config.onChain === false ? 'offChainTokens' : 'onChainTokens';

        document.getElementsByClassName("headline-tn token-name")[0].innerHTML = config.title;

        let tokens:TokenListItemInterface[] = [];

        tokenData[location][issuer].tokens.map((t: any, i: any) => {

            const { title, emblem } = config;

            let isSelected = false;

            // TODO Define a constant value that can be checked regardless of which issuer token to speed up this check.
            tokenData.selectedTokens[issuer]?.tokens.map((st:any, si:any) => {

                if (JSON.stringify(t) === JSON.stringify(st)) isSelected = true;

            });

            tokens.push({
                data: t,
                tokenIssuerKey: issuer,
                index: i,
                title: t.title ? t.title : title,
                emblem: t.image ? t.image : emblem,
                toggleState: isSelected
            });

        });

        this.tokenListView?.update({issuer: issuer, tokens: tokens})
    }

    showTokenView(issuer: string) {

        this.viewContainer.classList.toggle("open");

        const connectBtn = this.viewContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);
        const tokenBtn = this.viewContainer.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

        connectBtn.setAttribute('aria-expanded', true);
        tokenBtn.setAttribute('aria-expanded', false);

        const issuerViewEl = this.viewContainer.querySelector(`.issuer-view-tn`);
        const tokenViewEl = this.viewContainer.querySelector(`.token-view-tn`);

        issuerViewEl.setAttribute('aria-hidden', false);
        tokenViewEl.setAttribute('aria-hidden', true);
    }

}