// @ts-nocheck
import { asyncHandle, requiredParams, attachPostMessageListener, logger } from './../utils/index';
import { getTokensIframe, getChallengeSigned, validateUseEthKey, connectMetamaskAndGetAddress } from "../core/index";
import { createOverlayMarkup, createFabButton, createToken, issuerConnectTab, issuerConnectIframe } from './componentFactory';
import { tokenLookup } from './../tokenLookup';
import "./../theme/style.css";
import './../vendor/keyShape';

interface NegotiationInterface {
    type: string;
    issuers: string[];
    options: any;
}

declare global {
    interface Window {
        KeyshapeJS?: any;
        tokenToggleSelection: any;
        Authenticator: any;
        ethereum: any;
    }
}

interface AuthenticateInterface {
    issuer: any;
    unsignedToken: any;
}

export class Client {

    issuers: string[];
    issuerIframeRefs:{};
    type: string;
    filter:{};
    options: any;
    offChainTokens: any;
    onChainTokens: any;
    selectedTokens:any;

    constructor(config: NegotiationInterface) {

        const { type, issuers, options, filter } = config;

        requiredParams(type, 'type is required.');

        requiredParams(issuers, 'issuers are missing.');

        this.tokenLookup = tokenLookup;

        this.type = type;

        this.options = options;
        
        this.filter = filter ? filter : {};

        this.issuers = issuers;

        this.offChainTokens = { tokenKeys: [] };

        this.onChainTokens = { tokenKeys: [] };

        this.selectedTokens = {};

        /*

            this.onChainTokens / this.offChainTokens: {
                tokenKeys: ['devcon'],
                devcon: { 
                    tokens: [] 
                }
            }

        */

        issuers.map((issuer: any) => {
            
            if (tokenLookup[issuer].onChain === true) {

                this.onChainTokens.tokenKeys.push(issuer);

                this.onChainTokens[issuer] = { tokens: [] };

            } else {

                this.offChainTokens.tokenKeys.push(issuer);

                this.offChainTokens[issuer] = { tokens: [] };

            }

        });

        // timeout used to apply single instances

        attachPostMessageListener(this.eventReciever);
            
        // TODO look at creating scope for this lib without relying on the users implementation variable which is used at this time.
        // e.g. window.negotiator = this;

    }

    async setPassiveNegotiationWebTokens(offChainTokens: any) {

        await Promise.all(offChainTokens.tokenKeys.map(async (issuer: string): Promise<any> => {

            const { tokenOrigin } = tokenLookup[issuer];

            const tokens = await getTokensIframe({ filter: this.filter, tokensOrigin: tokenOrigin, negotiationType: 'passive' });
            
            this.offChainTokens[issuer].tokens = tokens;

            return;

        }));
    }

    async setBlockChainTokens(onChainTokens: any) {

        /*

            -----------------------
            blockchain token module
            -----------------------

            Gather blockchain tokens from a chosen source (
                - The Graph
                - Custom API
                - EtherScan API
                - ...
            )

        */

        return;

    }

    async negotiate() {

        /* 
        
            ------------------------------
            blockchain token reader module
            ------------------------------
        
            * await this.setBlockchainTokens(this.onChainTokens);

        */

        this.iframeStorageSupport = await this.thirdPartyCookieSupportCheck(tokenLookup[this.offChainTokens.tokenKeys[0]].tokenOrigin);

        // if storage support - embed iframe for active and passive negotiation flows.
        // else open with window each time.

        if (this.type === 'active') {

            this.activeNegotiationStrategy(this.iframeStorageSupport);

        } else {

            return this.passiveNegotiationStrategy(this.iframeStorageSupport);

        }

    }

    async activeNegotiationStrategy(iframeStorageSupport:boolean) {

        if(!iframeStorageSupport) {

            this.embedTokenConnectClientOverlayTab();

        } else {

            this.embedTokenConnectClientOverlayIframe();

        }

    }

    async passiveNegotiationStrategy(iframeStorageSupport:boolean) {

        // Feature not supported when an end users third party cookies are disabled
        // because the use of a tab requires a user gesture at this time.

        if (iframeStorageSupport) {

            await asyncHandle(this.setPassiveNegotiationWebTokens(this.offChainTokens));

            let outputOnChain = this.onChainTokens;

            delete outputOnChain.tokenKeys;

            let outputOffChain = this.offChainTokens;

            delete outputOffChain.tokenKeys;

            return { ...outputOffChain, ...outputOnChain };

        } else {

            console.log('Enable 3rd party cookies to use this feature.');

        }

    }

    embedTokenConnectClientOverlayIframe() {

        setTimeout(() => {

            let entryPointElement = document.querySelector(".overlay-tn");

            requiredParams(entryPointElement, 'No entry point element with the class name of .overlay-tn found.');

            if (entryPointElement) {

                entryPointElement.innerHTML += createOverlayMarkup(this.options?.overlay?.heading);
                
                entryPointElement.innerHTML += createFabButton();

                let refIssuerContainerSelector = document.querySelector(".token-issuer-list-container-tn");
                
                refIssuerContainerSelector.innerHTML = "";
                
                this.offChainTokens.tokenKeys.map((issuer: string) => {

                    refIssuerContainerSelector.innerHTML += issuerConnectIframe(issuer);

                });

                this.assignFabButtonAnimation();
                
                this.addTheme();

            }
            
            window.tokenToggleSelection = this.tokenToggleSelection;
            window.connectTokenIssuerWithIframe = this.connectTokenIssuerWithIframe;
            window.navigateToTokensView = this.navigateToTokensView;

        }, 0);
    }

    embedTokenConnectClientOverlayTab() {

        setTimeout(() => {

            let entryPointElement = document.querySelector(".overlay-tn");

            requiredParams(entryPointElement, 'No entry point element with the class name of .overlay-tn found.');

            if (entryPointElement) {

                entryPointElement.innerHTML += createOverlayMarkup(this.options?.overlay?.heading);
                
                entryPointElement.innerHTML += createFabButton();

                let refIssuerContainerSelector = document.querySelector(".token-issuer-list-container-tn");
                
                refIssuerContainerSelector.innerHTML = "";
                
                this.offChainTokens.tokenKeys.map((issuer: string) => {

                    refIssuerContainerSelector.innerHTML += issuerConnectTab(issuer);

                });

                this.assignFabButtonAnimation();
                
                this.addTheme();

            }
            
            window.tokenToggleSelection = this.tokenToggleSelection;
            window.connectTokenIssuerWithTab = this.connectTokenIssuerWithTab;
            window.navigateToTokensView = this.navigateToTokensView;

        }, 0);
    }
    
    embedIframeClientOverlay() {

        let _index = 0;

        let element = document.querySelector(".overlay-tn");

        requiredParams(element, 'No overlay element found.');

        if (element) {

            element.innerHTML += createOverlayMarkup(this.options?.overlay?.heading);

            element.innerHTML += createFabButton();

            let refTokenContainerSelector = document.querySelector(".token-container-tn");

            this.offChainTokens.tokenKeys.map((issuer: string) => {

                const i = this.offChainTokens[issuer];

                if (i.tokens.length) {

                    // @ts-ignore
                    refTokenContainerSelector.innerHTML = "";

                    i.tokens.map((t: any) => {

                        const { title, emblem } = tokenLookup[issuer];

                        // @ts-ignore
                        refTokenContainerSelector.innerHTML += createToken({
                            data: t,
                            tokenIssuerKey: issuer,
                            index: _index,
                            title: title,
                            emblem: emblem
                        });

                        _index++;

                    });

                }

            });

            this.assignFabButtonAnimation();
            
            this.addTheme();

        }

        window.tokenToggleSelection = this.tokenToggleSelection;

    }

    addTheme() {

        let refTokenSelector = document.querySelector(".overlay-tn");

        // @ts-ignore
        refTokenSelector.classList.add(this.options?.overlay?.theme ? this.options?.overlay?.theme : 'light');

    }

    assignFabButtonAnimation() {

        if (window.KeyshapeJS) {

            window.KeyshapeJS.globalPause();

            window.KeyshapeJS.animate("#svg-tn-left", [{ p: 'mpath', t: [0, 400], v: ['0%', '100%'], e: [[1, 0, 0, .6, 1], [0]], mp: "M13,28.5L27.1,28.1" }, { p: 'rotate', t: [0, 400], v: [0, 0], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'scaleX', t: [0, 400], v: [1, 1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'scaleY', t: [0, 400], v: [1, 1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorX', t: [0, 400], v: [-13, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorY', t: [0, 400], v: [-13.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'd', t: [0, 400], v: ["path('M25.5,26C25.5,26,20.5,26,20.5,26C20.5,23.1,19.9,20.4,18.8,17.9C17.8,15.6,16.4,13.6,14.6,11.8C12.7,9.9,10.3,8.4,7.8,7.4C5.5,6.5,3,6,.5,6L.5,1C.5,1,.5,1,.5,1C.5,1,7.5,1,7.5,1L25.5,1L25.5,7.2C25.5,7.2,25.5,12.8,25.5,12.8C25.5,12.8,25.5,19,25.5,19Z')", "path('M31.8,32.8C31.5,33.2,30.9,33.4,30.4,33.4C29.9,33.4,29.4,33.2,29,32.8C29,32.8,1.4,5.2,1.4,5.2C1,4.8,.8,4.3,.8,3.8C.8,3.3,1,2.8,1.4,2.4L2.4,1.4C2.7,1,3.3,.8,3.8,.8C4.3,.8,4.8,1,5.2,1.4L5.2,1.4L32.8,29C33.2,29.4,33.4,29.9,33.4,30.4C33.4,30.9,33.2,31.5,32.8,31.8Z')"], e: [[1, 0, 0, .6, 1], [0]] }], "#svg-tn-right", [{ p: 'mpath', t: [0, 400], v: ['0%', '100%'], e: [[1, 0, 0, .6, 1], [0]], mp: "M41.5,28.7L27.1,28.1" }, { p: 'rotate', t: [0, 400], v: [0, 0], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorX', t: [0, 400], v: [-40.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'anchorY', t: [0, 400], v: [-13.5, -17.1], e: [[1, 0, 0, .6, 1], [0]] }, { p: 'd', t: [0, 400], v: ["path('M53,1C53,1,53,1,53,1C53,1,53,12.9,53,12.9L53,19C53,19,53,26,53,26C53,26,40.2,26,40.2,26L34.1,26C34.1,26,28,26,28,26C28,26,28,12.6,28,12.6L28,7.4C28,7.4,28,1,28,1C28,1,40.6,1,40.6,1C40.6,1,45.9,1,45.9,1Z')", "path('M29,1.4C29.4,1,29.9,.8,30.4,.8C30.9,.8,31.5,1,31.8,1.4L32.8,2.4C33.2,2.7,33.4,3.3,33.4,3.8C33.4,4.3,33.2,4.8,32.8,5.2L5.2,32.8C4.8,33.2,4.3,33.4,3.8,33.4C3.3,33.4,2.8,33.2,2.4,32.8L1.4,31.8C1,31.5,.8,30.9,.8,30.4C.8,29.9,1,29.4,1.4,29C1.4,29,29,1.4,29,1.4Z')"], e: [[1, 0, 0, .6, 1], [0]] }], { autoremove: false }).range(0, 400);

        }

    }

    openOverlay(openOverlay: boolean) {

        const element = document.querySelector(".overlay-tn");

        requiredParams(element, 'No overlay element found.');

        // @ts-ignore
        element.classList.toggle("open");

        if (openOverlay) {

            // @ts-ignore
            element.classList.add("open");

            window.KeyshapeJS.timelines()[0].time(0);

            window.KeyshapeJS.globalPlay();

        } else {

            // @ts-ignore
            element.classList.remove("open");

            window.KeyshapeJS.timelines()[0].time(0);

            window.KeyshapeJS.globalPause();

        }
    }

    overlayClickHandler() {

        const element = document.querySelector(".overlay-tn");

        requiredParams(element, 'No overlay element found.');

        // @ts-ignore
        const isOpen = element.classList.contains("open");

        // @ts-ignore
        element.classList.toggle("open");

        if (!isOpen) {

            this.openOverlay(true);

        } else {

            this.openOverlay(false);

        }

    }

    issuerConnected(issuer:string) {
        
        const connectBtn = document.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);
        
        const tokenBtn = document.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);
        
        connectBtn.style.display = "none";
        
        connectBtn.setAttribute('aria-hidden', true);
        
        tokenBtn.style.display = "block";
        
        tokenBtn.innerHTML = `View Tokens (${this.offChainTokens[issuer].tokens.length})`;
        
        tokenBtn.setAttribute('aria-hidden', false);
        
    }

    navigateToTokensView(event:any) {
        
        const issuer = event.target.dataset.issuer;

        window.negotiator.embedTokensIntoView(issuer);

        window.negotiator.showTokenView(issuer);

    }

    embedTokensIntoView(issuer){

        const refTokenContainerSelector = document.getElementsByClassName("token-view-tn")[0];

        if(!issuer) {

            refTokenContainerSelector.style.display = 'none';
            return;

        };
            
        refTokenContainerSelector.style.display = 'block';
        
        refTokenContainerSelector.scrollTo(0, 0);

        const refTokenContainerSelector = document.getElementsByClassName("token-list-container-tn")[0];
        
        refTokenContainerSelector.innerHTML = "";

        const config = window.negotiator.tokenLookup[issuer];
        
        const location = config.onChain ? 'onChainTokens' : 'offChainTokens';

        document.getElementsByClassName("headline-tn token-name")[0].innerHTML = config.title;

        window.negotiator[location][issuer].tokens.map((t: any, i:any) => {

            // TODO - Memory usage: load extra tokens when user scrolls to bottom of issuer
            // if(i < 25) {

                const { title, emblem } = tokenLookup[issuer];

                let isSelected = false;

                // TODO Define a constant value that can be checked
                // regardless of which issuer token to speed up this check
                window.negotiator.selectedTokens[issuer]?.tokens.map((st, si) => {
                    if(t.toString() === st.toString()) isSelected = true;
                });

                // @ts-ignore
                refTokenContainerSelector.innerHTML += createToken({
                    data: t,
                    tokenIssuerKey: issuer,
                    index: i,
                    title: title,
                    emblem: emblem,
                    toggleState: isSelected
                });

            // }

        });
    }

    showTokenView(issuer:string) {

        var element = document.getElementsByClassName("overlay-content-tn")[0];
        element.classList.toggle("open");

        if(issuer){

            const connectBtn = document.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);

            const tokenBtn = document.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

            connectBtn.setAttribute('aria-expanded', true);

            tokenBtn.setAttribute('aria-expanded', true);

        } else {

            const connectBtns = document.querySelectorAll(`.connect-btn-tn`);

            const tokenBtns = document.querySelectorAll(`.tokens-btn-tn`);

            connectBtns.forEach(function(userItem) {

                userItem.setAttribute('aria-expanded', false);

            });

            tokenBtns.forEach(function(userItem) {

                userItem.setAttribute('aria-expanded', false);

            });

        }
    }

    connectTokenIssuerWithIframe(event) {

        const issuer = event.currentTarget.dataset.issuer;

        const filter = window.negotiator.filter ? window.negotiator.filter : {};
        
        const tokensOrigin = window.negotiator.tokenLookup[issuer].tokenOrigin;

        getTokensIframe({ filter: filter, tokensOrigin: tokensOrigin, negotiationType: 'active' });

    }

    connectTokenIssuerWithTab(event) {
            
        const issuer = event.target.dataset.issuer;
        
        const filter = window.negotiator.filter ? JSON.stringify(window.negotiator.filter) : '{}';
        
        let	tabRef = window.open(
            `${tokenLookup[issuer].tokenOrigin}?action=get-tab-issuer-tokens&filter=${filter}`,
            "win1",
            "left=0,top=0,width=320,height=320"
        );

        if(!window.negotiator.issuerIframeRefs) {
            window.negotiator.issuerIframeRefs = {};
        }

        window.negotiator.issuerIframeRefs[issuer] = tabRef;

    }

    tokenToggleSelection() {

        window.negotiator.selectedTokens = {};

        document.querySelectorAll('.token-tn .mobileToggle-tn').forEach((token: any, index: number) => {

            if (index === 0) {

                window.negotiator.selectedTokens[token.dataset.key] = {};

                window.negotiator.selectedTokens[token.dataset.key]['tokens'] = [];

            }

            if (token.checked === true) {

                let output = JSON.parse(token.dataset.token);

                window.negotiator.selectedTokens[token.dataset.key].tokens.push(output);

            }

        });

        window.negotiator.eventSender.emitTokensToClient();
        
    }


    async authenticate(config: AuthenticateInterface) {

        const { issuer, unsignedToken } = config;

        const { unEndPoint, onChain } = tokenLookup[issuer];

        if (onChain === true || !unsignedToken || !unEndPoint) return { status: false, useEthKey: null, proof: null };

        // try {

            let useEthKey = await getChallengeSigned(tokenLookup[issuer]);

            const attestedAddress = await validateUseEthKey(unEndPoint, useEthKey);

            const walletAddress = await connectMetamaskAndGetAddress();

            if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase()) throw new Error('useEthKey validation failed.');

            this.getTokenProof(unsignedToken, issuer);
        
        // } catch (e) {

            // requiredParams(null, "Could not authenticate token");

        // }

    }

    async getTokenProof (unsignedToken: any, issuer: any) {
        
        let	tabRef = window.open(
            `${tokenLookup[issuer].tokenOrigin}?action=get-token-proof&token=${JSON.stringify(unsignedToken)}&issuer=${issuer}`,
            "win1",
            `left=0,top=0,width=${window.innerWidth},height=${window.innerHeight}`
        );

        if(!window.negotiator.issuerIframeRefs) {
            window.negotiator.issuerIframeRefs = {};
        }

        window.negotiator.issuerIframeRefs[issuer] = tabRef;

        // normal flow: 3rd party cookie flow.

        // this.eventSender.getTokenProof(unsignedToken, tokenIssuer); // then ?

    }

    eventSender = {
        emitTokensToClient: () => {
            window.postMessage({ evt: 'token-negotiator-tokens', selectedTokens: window.negotiator.selectedTokens }, window.location.origin);
        },
        emitProofToClient: (proof:any, issuer: any) => {
            window.postMessage({ evt: 'token-negotiator-token-proof', proof: proof, issuer: issuer }, window.location.origin);
        }
    }

    eventReciever = (event: any) => {

        switch (event.data.evt) {

          case 'set-tab-issuer-tokens': 
                    
                const issuer = event.data.data.issuer;

                let childURL = tokenLookup[issuer].tokenOrigin;
            
                let cUrl = new URL(childURL);
            
                let childUrlOrigin = cUrl.origin;
            
                if (event.origin != childUrlOrigin) return;
            
                this.offChainTokens[issuer].tokens = event.data.data.tokens;
            
                if(window.negotiator.issuerIframeRefs[issuer]) {

                    window.negotiator.issuerIframeRefs[issuer].close();

                    delete window.negotiator.issuerIframeRefs[issuer];
                
                    this.issuerConnected(issuer);

                }
            
          break;
          
          case 'set-iframe-issuer-tokens-active':

            const issuer = event.data.data.issuer;
        
            this.offChainTokens[issuer].tokens = event.data.data.tokens;

            this.issuerConnected(issuer);
            
          break;
          
          case 'proof': 

            if (window.negotiator.issuerIframeRefs[event.data.data.issuer]) {

                window.negotiator.issuerIframeRefs[event.data.data.issuer].close();

                delete window.negotiator.issuerIframeRefs[event.data.data.issuer];

            }

            this.eventSender.emitProofToClient(event.data.data.proof, event.data.data.issuer);

          break;

        }
    }
        
    addTokenThroughTab(magicLink: any) {
    
        var tab = window.open(
            magicLink,
            "win1",
            "left=0,top=0,width=320,height=320"
        );
        
        // TODO use an event to determine when the window has loaded
        setTimeout(() => {
            tab?.close();
        }, 2500);

    }

    // Cookie supported only
    addTokenThroughIframe(magicLink: any) {
        
        const iframe = document.createElement('iframe');
        
        iframe.src = magicLink;
        
        iframe.style.width = '1px';
        
        iframe.style.height = '1px';
        
        iframe.style.opacity = '0';
        
        document.body.appendChild(iframe);
        
    }

    async thirdPartyCookieSupportCheck(tokensOrigin: any) {
        
        const iframe = document.createElement('iframe');
        
        iframe.src = tokensOrigin + '?action=cookie-support-check';
        
        iframe.style.width = '1px';
        
        iframe.style.height = '1px';
        
        iframe.style.opacity = '0';
        
        document.body.appendChild(iframe);

        return new Promise((resolve) => {

            let listener = (event) => {

                if (event.data.evt === 'cookie-support-check') {

                    // TODO
                    // removeChild(iframe);

                    console.log('support for third party cookies: ', event.data.data.thirdPartyCookies ? true : false);
                    
                    resolve(event.data.data.thirdPartyCookies ? true : false);

                }

                // allow 15 seconds for this check to be completed (expectation it can be done within 2-3 seconds).
                // falling back to solution that will work across all devices.
                setTimeout(() => { 

                    // TODO
                    // removeChild(iframe);

                    resolve(null) 

                }, 15000);

            };

            attachPostMessageListener(listener);

        })
        
    }

}