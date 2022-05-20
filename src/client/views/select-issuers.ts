import {AbstractView} from "./view-interface";
import {TokenList} from "./token-list";
import {TokenListItemInterface} from "./token-list";
import {IconView} from "./icon-view";
import { logger } from "../../utils";

export class SelectIssuers extends AbstractView {

	issuerListContainer: any;
	tokensContainer: any;
	tokenListView: TokenList|undefined;

	render(){

		this.viewContainer.innerHTML = `
            <div class="inner-content-tn issuer-slider-tn">
              <div class="issuer-view-tn scroll-tn">
                <div class="brand-tn"></div>
                <div class="headline-container-tn">
                  <p class="headline-tn">${this.params.options.issuerHeading}</p>
                </div>
                <ul class="token-issuer-list-container-tn" role="menubar"></ul>
              </div>
              <div class="token-view-tn scroll-tn" style="display: none;">
                <div class="brand-tn"></div>
                <div style="display: flex">
                  <button aria-label="back to token issuer menu" class="back-to-menu-tn">
                    <svg style="position: relative; top: 1px;" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
        `;

		this.viewContainer.querySelector('.back-to-menu-tn').addEventListener('click', this.backToIssuers.bind(this));

		this.issuerListContainer = document.querySelector(".token-issuer-list-container-tn");
		this.tokensContainer = document.getElementsByClassName("token-view-tn")[0];

		if (!this.issuerListContainer){
			logger(2, "Element .token-issuer-list-container-tn not found");
			return;
		}

		this.populateIssuers();

		let tokensListElem = this.tokensContainer.getElementsByClassName("token-list-container-tn")[0];

		this.tokenListView = new TokenList(this.client, this.popup, tokensListElem, {});

		this.autoLoadTokens();

	}

	// TODO: back to wallet selection?

	populateIssuers(){

		let store = this.client.getTokenStore();

		let html = "";

		store.getOffChainTokens().tokenKeys.map((issuer: string) => {
			let data = store.getCurrentIssuers()[issuer];

			if (data.title)
				html += this.issuerConnectMarkup(data.title, data.image, issuer);
		});

		store.getOnChainTokens().tokenKeys.map((issuer: string) => {
			let data = store.getCurrentIssuers()[issuer];

			if (data.title)
				html += this.issuerConnectMarkup(data.title, data.image, issuer);
		});

		this.issuerListContainer.innerHTML = html;

		// Init images
		for(let elem of this.issuerListContainer.getElementsByClassName('img-container-tn')){

			let params = {
				src: elem.getAttribute('data-image-src'),
				title: elem.getAttribute('data-token-title'),
			};

			new IconView(elem, params).render();
		}

		this.issuerListContainer.addEventListener('click', (e: any) => {
			if (e.target.classList.contains('connect-btn-tn')){
				this.connectTokenIssuer(e);
			} else if (e.target.classList.contains('tokens-btn-tn')){
				const issuer = e.target.parentNode.dataset.issuer;
				this.navigateToTokensView(issuer);
			}
		});

		this.client.getTokenStore().registerIssuerUpdateHook("select-issuers", ()=> {
			this.render();
		});
	}

	issuerConnectMarkup(title: string, image: string|undefined, issuer: string){
		return `
            <li class="issuer-connect-banner-tn" data-issuer="${issuer}" role="menuitem">
              <div style="display: flex; align-items: center;">
                <div class="img-container-tn issuer-icon-tn shimmer-tn" data-image-src="${image}" data-token-title="${title}"></div>
                <p class="issuer-connect-title">${title}</p>
              </div>
              <button aria-label="connect with the token issuer ${issuer}" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="connect-btn-tn" data-issuer="${issuer}">Load</button>
              <button aria-label="tokens available from token issuer ${issuer}" aria-haspopup="true" aria-expanded="false" aria-controls="token-list-container-tn" class="tokens-btn-tn" data-issuer="${issuer}">Tokens Available</button>
            </li>
        `;
	}

	backToIssuers(){

		this.tokensContainer.style.display = 'none';

		this.viewContainer.classList.toggle("open");

		// TODO - Review and uplift this logic. Its not working as expected from tests.

		// const connectBtns = this.viewContainer.querySelectorAll(`.connect-btn-tn`);
		// const tokenBtns = this.viewContainer.querySelectorAll(`.tokens-btn-tn`);

		// connectBtns.forEach(function (userItem:any) {
		//     userItem.setAttribute('aria-expanded', false);
		// });

		// tokenBtns.forEach(function (userItem:any) {
		//     userItem.setAttribute('aria-expanded', false);
		// });

		// const issuerViewEl = this.viewContainer.querySelector(`.issuer-view-tn`);
		// const tokenViewEl = this.viewContainer.querySelector(`.token-view-tn`);

		// issuerViewEl.setAttribute('aria-hidden', true);
		// tokenViewEl.setAttribute('aria-hidden', false);

	}

	async autoLoadTokens(){

		// TODO: prevent further token loading when issuers are updated
		await this.client.autoLoadTokens(this.issuerLoading.bind(this), (issuer: string, tokens: any[]) => {

			if (!tokens?.length){
				const connectBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);

				if (connectBtn)
					connectBtn.innerText = "Load";

				return;
			}

			this.issuerConnected(issuer, tokens, false);
		});
	}

	async connectTokenIssuer(event: any) {

		const data = event.target.dataset;

		const issuer = data.issuer;

		let tokens: any[] = [];

		this.popup.showLoader("<h4>Loading tokens...</h4>");

		try {
			tokens = await this.client.connectTokenIssuer(issuer);
		} catch (err){
			logger(2, err);
			this.popup.showError((err as string));
			return;
		}

		this.popup.dismissLoader();

		if (!tokens?.length){
			this.popup.showError("No tokens found!");
			return;
		}

		this.issuerConnected(issuer, tokens);
	}

	issuerLoading(issuer: string){
		const connectBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);

		if (connectBtn)
			connectBtn.innerHTML = '<div class="lds-ellipsis-sm" style=""><div></div><div></div><div></div><div></div></div>';
	}

	issuerConnected(issuer: string, tokens: any[], showTokens = true) {

		const connectBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);
		const tokenBtn = this.issuerListContainer.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

		if (!connectBtn || !tokenBtn){
			logger(2, "Could not find button handler");
		}

		connectBtn.style.display = "none";
		connectBtn.setAttribute('tabIndex', -1);

		tokenBtn.style.display = "block";
		tokenBtn.innerHTML = `${tokens.length} token/s available`;
		tokenBtn.setAttribute('aria-label', `Navigate to select from ${tokens.length} of your ${issuer} tokens`);
		tokenBtn.setAttribute('tabIndex', 1);

		if (showTokens)
			setTimeout(() => {
				this.navigateToTokensView(issuer);
			}, 250); // Timeout just makes it a bit of a smoother transition
	}

	navigateToTokensView(issuer: string) {

		this.updateTokensView(issuer);

		this.showTokenView(issuer);
	}

	updateTokensView(issuer: string) {

		this.tokensContainer.style.display = 'block';

		this.tokensContainer.scrollTo(0, 0);

		const tokenStore = this.client.getTokenStore();
		const config = this.client.getTokenStore().getCurrentIssuers()[issuer];
		const onChain = "onChain" in config && config.onChain;
		const tokenData = onChain ? tokenStore.getOnChainTokens()[issuer] : tokenStore.getOffChainTokens()[issuer];

		console.log(onChain);
		console.log(tokenData);

		if (config.title)
			document.getElementsByClassName("headline-tn token-name")[0].innerHTML = config.title;

		let tokens: TokenListItemInterface[] = [];

		tokenData.tokens.map((t: any, i: any) => {

			let isSelected = false;

			// TODO Define a constant value that can be checked regardless of which issuer token to speed up this check.
			tokenStore.getSelectedTokens()[issuer]?.tokens.map((st: any, si: any) => {

				if (JSON.stringify(t) === JSON.stringify(st)) isSelected = true;

			});

			if(!onChain) {

				const { title, image } = config;

				tokens.push(<TokenListItemInterface>{
					data: t,
					tokenIssuerKey: issuer,
					index: t.ticketId,
					title: title,
					image: image,
					toggleState: isSelected
				});

			} else {

				const tokenId = t.tokenId ?? i.toString();

				tokens.push({
					data: t,
					tokenIssuerKey: issuer,
					index: tokenId,
					title: t.title,
					image: t.image,
					toggleState: isSelected
				});

			}

		});

		this.tokenListView?.update({issuer: issuer, tokens: tokens})
	}

	showTokenView(issuer: string) {

		this.viewContainer.classList.toggle("open");

		// TODO review and uplift this code, its not working as expected.

		// const connectBtn = this.viewContainer.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);
		// const tokenBtn = this.viewContainer.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

		// connectBtn.setAttribute('aria-expanded', true);
		// tokenBtn.setAttribute('aria-expanded', false);

		// const issuerViewEl = this.viewContainer.querySelector(`.issuer-view-tn`);
		// const tokenViewEl = this.viewContainer.querySelector(`.token-view-tn`);

		// issuerViewEl.setAttribute('aria-hidden', false);
		// tokenViewEl.setAttribute('aria-hidden', true);
	}

}