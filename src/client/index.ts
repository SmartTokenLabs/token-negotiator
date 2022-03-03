// @ts-nocheck
import { asyncHandle, requiredParams, attachPostMessageListener, logger, splitOnChainKey } from './../utils/index';
import { getChallengeSigned, validateUseEthKey, connectMetamaskAndGetAddress } from "../core/index";
import { createTokenMarkup } from './componentFactory';
import { tokenLookup } from './../tokenLookup';
import { Messaging, MessageAction } from "./messaging";
import { Popup } from './popup';
import OnChainTokenModule from './../onChainTokenModule'
import Web3WalletProvider from './../utils/Web3WalletProvider';
import "./../theme/style.css";
import './../vendor/keyShape';

/*interface GetTokenInterface {
    issuer:string;
    filter: any;
    tokensOrigin: any;
    negotiationType: string;
}*/

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
    issuerTabInstanceRefs: {}; // TODO: remove once fully migrated to messaging object
    type: string;
    filter: {};
    options: any;
    offChainTokens: any;
    onChainTokens: any;
    tokenLookup: any;
    selectedTokens: any;
    iframeStorageSupport: any; // TODO: remove once fully migrated to messaging object
    web3WalletProvider:any;
    messaging:Messaging;
    popup:Popup;

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

        this.clientCallBackEvents = {};

        // TODO: remove once fully migrated to messaging object
        this.iframeStorageSupport = false;

        // apply data for view when active mode

        /*

            this.onChainTokens / this.offChainTokens: {
                tokenKeys: ['devcon', '0x...'],
                devcon: { 
                    tokens: [] 
                }
            }

        */

        issuers.forEach((issuer: any) => {

            if(tokenLookup[issuer]){

                // For TokenScript Enabled Tokens

                if (tokenLookup[issuer].onChain === true) {

                    this.onChainTokens.tokenKeys.push(issuer);

                    this.onChainTokens[issuer] = { tokens: [] };

                } else {

                    this.offChainTokens.tokenKeys.push(issuer);

                    this.offChainTokens[issuer] = { tokens: [] };

                }

            } 

            // For direct on chain tokens

            if((issuer.contract) && (issuer.chain)) {

                // create key with address and chain for easy reference
                let issuerKey = `${issuer.contract}.${issuer.chain}`;

                if(issuer.openSeaSlug) issuerKey += `.${issuer.openSeaSlug}`;

                // Populate the token lookup store with initial data.
                this.updateTokenLookupStore(issuerKey, issuer);

                // stop duplicate entries
                if(this.onChainTokens[issuerKey]) return;

                // add onchain token (non-tokenscipt)
                this.onChainTokens.tokenKeys.push(issuerKey);

                // add empty tokens list (non-tokenscript)
                this.onChainTokens[issuerKey] = { tokens: [] };

            }

        });

        // assign event receiver
        attachPostMessageListener(this.eventReciever);

        // bind functions used externally. TODO use lib references, rather than hoisting to window scope.
        window.overlayClickHandler = this.overlayClickHandler.bind(this);
        window.tokenToggleSelection = this.tokenToggleSelection.bind(this);
        window.connectTokenIssuer = this.connectTokenIssuer.bind(this);
        window.navigateToTokensView = this.navigateToTokensView.bind(this);
        window.embedTokensIntoView = this.embedTokensIntoView.bind(this);
        window.showTokenView = this.showTokenView.bind(this);
        window.negotiatorConnectToWallet = this.negotiatorConnectToWallet.bind(this);
        window.negotiatorUpdateOverlayViewState = this.updateOverlayViewState.bind(this);

        // e.g.
        // this.boundClickEvt = this.handleClick.bind(this)
        // handleClick(e) { console.log(`target data: ${e}`) }

        // currently custom to Token Negotiator
        this.web3WalletProvider = new Web3WalletProvider();

        // on chain token manager module
        this.onChainTokenModule = new OnChainTokenModule();

        this.messaging = new Messaging();
    }

    getTokenData(){
        return {
            offChainTokens: this.offChainTokens,
            onChainTokens: this.onChainTokens,
            tokenLookup: this.tokenLookup
        };
    }

    // To enrich the token lookup store with data.
    // for on chain tokens that are not using token script this is 
    // required, for off chain this is most likely not required because the configurations
    // are already pre-defined e.g. title, issuer emblem image etc.
    updateTokenLookupStore(tokenKey, data) {

        if(!this.tokenLookup[tokenKey]) this.tokenLookup[tokenKey] = {};

        this.tokenLookup[tokenKey] = { ...this.tokenLookup[tokenKey], ...data };

    }

    async negotiatorConnectToWallet (walletType:string) {
    
        // const { default: Web3WalletProvider } = await import('./../utils/Web3WalletProvider');
        
        // this.web3WalletProvider = new Web3WalletProvider();
    
        const walletAddress = await this.web3WalletProvider.connectWith(walletType);

        logger('wallet address found: ', walletAddress);

        if (walletAddress) {

            setTimeout(() => {

                this.updateOverlayViewState("ISSUER");

            }, 200);

        } else { 

            // Please Try again state e.g. a View that says what went wrong that can be closed.

        }

    }

    async setPassiveNegotiationWebTokens(offChainTokens: any) {

        await Promise.all(offChainTokens.tokenKeys.map(async (issuer: string): Promise<any> => {

            const { tokenOrigin } = tokenLookup[issuer];

            this.messaging.sendMessage({
                issuer: issuer,
                action: "get-iframe-issuer-tokens",
                filter: this.filter,
                origin: tokenOrigin,
                negotiationType: 'passive'
            }).then((data)=>{
                this.offChainTokens[issuer].tokens = data.tokens;
            }).catch((err)=>{
                console.log(err);
            });

            return;

        }));

    }

    // add collection data
    async enrichTokenLookupDataOnChainTokens(onChainTokens: any) {

        await Promise.all(onChainTokens.tokenKeys.map(async (issuerKey: string): Promise<any> => {

            let lookupData = await this.onChainTokenModule.getInitialContractAddressMetaData(issuerKey);

            if (lookupData) {

                lookupData.onChain = true;

                // enrich the tokenLookup store with contract meta data
                this.updateTokenLookupStore(issuerKey, lookupData);
            }

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

        // await Promise.all(onChainTokens.tokenKeys.map(async (issuer: string): Promise<any> => {

        //     // const { tokenOrigin } = tokenLookup[issuer];
        //     // const tokens = await this.onChainTokenModule.connectOnChainToken();

        //     // const tokens = await this.getTokensIframe({ issuer: issuer, filter: this.filter, tokensOrigin: tokenOrigin, negotiationType: 'passive' });

        //     const tokens = await this.onChainTokenModule.connectOnChainToken();

        //     this.onChainTokens[issuer].tokens = tokens;

        //     return;

        // }));

        // // this will be a map 
        // // const tokens = await this.onChainTokenModule.connectOnChainToken();

        // console.log('tokens', tokens);

        return;

    }

    async negotiate() {

        /* 
        
            ------------------------------
            blockchain token reader module
            ------------------------------
        
            * await this.setBlockchainTokens(this.onChainTokens);

        */

        // if storage support - embed iframe for active and passive negotiation flows.
        // else open with window each time.

        // Enrich the look up data with the accepted on chain tokens
        await this.enrichTokenLookupDataOnChainTokens(this.onChainTokens);

        if (this.type === 'active') {

            this.activeNegotiationStrategy();

        } else {

            // const { default: Web3WalletProvider } = await import('./../utils/Web3WalletProvider');
            
            // this.web3WalletProvider = new Web3WalletProvider();

            if(window.ethereum) await this.web3WalletProvider.connectWith('MetaMask');

            this.passiveNegotiationStrategy();

        }

    }

    async activeNegotiationStrategy() {

        setTimeout(() => {

            this.popup = new Popup(this.options?.overlay, this);
            this.popup.initialize();

        }, 0);

    }

    async setPassiveNegotiationOnChainTokens (onChainTokens: any) {

        await Promise.all(onChainTokens.tokenKeys.map(async (issuerKey: string): Promise<any> => {

            const tokens = await this.onChainTokenModule.connectOnChainToken(
                issuerKey,
                this.web3WalletProvider.getConnectedWalletData()[0].address
            );

            const output = {
                data: {
                    evt: 'set-on-chain-issuer-tokens-passive',
                    tokens: tokens,
                    issuer: issuerKey
                }
            }

            this.eventReciever(output);

        }));

    }

    async passiveNegotiationStrategy(iframeStorageSupport: boolean) {

        // Feature not supported when an end users third party cookies are disabled
        // because the use of a tab requires a user gesture.
        // TODO: this check should be skipped if there is no offchain tokens
        //       if there are offchain tokens, but there are also onchain tokens, show loaded tokens along with an error/warning message?

        let canUsePassive = false;

        if (this.offChainTokens.tokenKeys.length){
            canUsePassive = await this.messaging.getCookieSupport(this.tokenLookup[this.offChainTokens.tokenKeys[0]]?.tokenOrigin);
        }

        if (canUsePassive === true) {

            await asyncHandle(this.setPassiveNegotiationWebTokens(this.offChainTokens));
            await asyncHandle(this.setPassiveNegotiationOnChainTokens(this.onChainTokens));

            let outputOnChain = JSON.parse(JSON.stringify(this.onChainTokens));

            delete outputOnChain.tokenKeys;

            // TODO - Create clone without token keys and return.
            let outputOffChain = JSON.parse(JSON.stringify(this.offChainTokens));

            delete outputOffChain.tokenKeys;

            this.eventSender.emitAllTokensToClient({ ...outputOffChain, ...outputOnChain });

        } else {

            logger('Enable 3rd party cookies via your browser settings to use this negotiation type.');

        }

    }

    updateOverlayViewState(state:string) {

        this.popup.updateOverlayViewState(state);
    }

    /*embedTokenConnectClientOverlayIframe() {

        setTimeout(() => {

            let entryPointElement = document.querySelector(".overlay-tn");

            requiredParams(entryPointElement, 'No entry point element with the class name of .overlay-tn found.');

            if (entryPointElement) {

                entryPointElement.innerHTML += '<div class="overlay-content-tn"></div>';

                this.updateOverlayViewState("INTRO");

                entryPointElement.innerHTML += createFabButtonMarkup();

                this.assignFabButtonAnimation();

                this.addTheme();

            }

        }, 0);
    }*/

    // embedIframeClientOverlay() {

    //     let _index = 0;

    //     let element = document.querySelector(".overlay-tn");

    //     requiredParams(element, 'No overlay element found.');

    //     if (element) {

    //         element.innerHTML += createOverlayMarkup(this.issuerHeading);

    //         element.innerHTML += createFabButtonMarkup();

    //         let refTokenContainerSelector = document.querySelector(".token-container-tn");

    //         this.offChainTokens.tokenKeys.map((issuer: string) => {

    //             const i = this.offChainTokens[issuer];

    //             if (i.tokens.length) {

    //                 // @ts-ignore
    //                 refTokenContainerSelector.innerHTML = "";

    //                 i.tokens.map((t: any) => {

    //                     const { title, emblem } = tokenLookup[issuer];

    //                     // @ts-ignore
    //                     refTokenContainerSelector.innerHTML += createTokenMarkup({
    //                         data: t,
    //                         tokenIssuerKey: issuer,
    //                         index: _index,
    //                         title: title,
    //                         emblem: emblem
    //                     });

    //                     _index++;

    //                 });

    //             }

    //         });

    //         this.assignFabButtonAnimation();

    //         this.addTheme();

    //     }

    //     window.tokenToggleSelection = this.tokenToggleSelection;

    // }

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

    issuerConnected(issuer: string, onChain:boolean) {

        const connectBtn = document.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);

        const tokenBtn = document.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

        connectBtn.style.display = "none";

        connectBtn.setAttribute('tabIndex', -1);

        tokenBtn.style.display = "block";

        if(onChain) {

            tokenBtn.innerHTML = `${this.onChainTokens[issuer].tokens.length} token/s available`;
            tokenBtn.setAttribute('aria-label', `Navigate to select from ${this.onChainTokens[issuer].tokens.length} of your ${issuer} tokens`);

        } else {

            tokenBtn.innerHTML = `${this.offChainTokens[issuer].tokens.length} token/s available`;
            tokenBtn.setAttribute('aria-label', `Navigate to select from ${this.offChainTokens[issuer].tokens.length} of your ${issuer} tokens`);

        }
        
        tokenBtn.setAttribute('tabIndex', 1);

    }

    navigateToTokensView(event: any) {

        const issuer = event.target.dataset.issuer;

        this.embedTokensIntoView(issuer);

        this.showTokenView(issuer);

    }

    embedTokensIntoView(issuer) {

        const refTokenViewSelector = document.getElementsByClassName("token-view-tn")[0];

        if (!issuer) {

            refTokenViewSelector.style.display = 'none';
            return;

        }

        refTokenViewSelector.style.display = 'block';

        refTokenViewSelector.scrollTo(0, 0);

        const refTokenContainerSelector = document.getElementsByClassName("token-list-container-tn")[0];

        refTokenContainerSelector.innerHTML = "";

        const config = this.tokenLookup[issuer];

        const location = config.onChain === false ? 'offChainTokens' : 'onChainTokens';

        document.getElementsByClassName("headline-tn token-name")[0].innerHTML = config.title;

        this[location][issuer].tokens.map((t: any, i: any) => {

            // TODO - Memory usage: load extra tokens when user scrolls to bottom of issuer
            // if(i < 25) {

            const { title, emblem } = tokenLookup[issuer];

            let isSelected = false;

            // TODO Define a constant value that can be checked regardless of which issuer token to speed up this check.

            this.selectedTokens[issuer]?.tokens.map((st, si) => {

                if (t.toString() === st.toString()) isSelected = true;

            });

            // @ts-ignore
            refTokenContainerSelector.innerHTML += createTokenMarkup({
                data: t,
                tokenIssuerKey: issuer,
                index: i,
                title: t.title ? t.title : title,
                emblem: t.image ? t.image : emblem,
                toggleState: isSelected
            });

            // }

        });
    }

    showTokenView(issuer: string) {

        var element = document.getElementsByClassName("overlay-content-tn")[0];
        
        element.classList.toggle("open");

        if (issuer) {

            const connectBtn = document.querySelector(`[data-issuer*="${issuer}"] .connect-btn-tn`);

            const tokenBtn = document.querySelector(`[data-issuer*="${issuer}"] .tokens-btn-tn`);

            connectBtn.setAttribute('aria-expanded', true);

            tokenBtn.setAttribute('aria-expanded', false);

            const issuerViewEl = document.querySelector(`.issuer-view-tn`);

            const tokenViewEl = document.querySelector(`.token-view-tn`);
            
            issuerViewEl.setAttribute('aria-hidden', false);
            
            tokenViewEl.setAttribute('aria-hidden', true);
            
        } else {

            const connectBtns = document.querySelectorAll(`.connect-btn-tn`);

            const tokenBtns = document.querySelectorAll(`.tokens-btn-tn`);

            connectBtns.forEach(function (userItem) {

                userItem.setAttribute('aria-expanded', false);

            });

            tokenBtns.forEach(function (userItem) {

                userItem.setAttribute('aria-expanded', false);

            });

            const issuerViewEl = document.querySelector(`.issuer-view-tn`);
            
            const tokenViewEl = document.querySelector(`.token-view-tn`);
            
            issuerViewEl.setAttribute('aria-hidden', true);
            
            tokenViewEl.setAttribute('aria-hidden', false);
            
        }
    }

    connectTokenIssuer(event){

        const data = event.currentTarget.dataset ?? event.target.dataset;
        const issuer = data.issuer;
        const filter = this.filter ? this.filter : {};
        const tokensOrigin = this.tokenLookup[issuer].tokenOrigin;

        if (this.tokenLookup[issuer].onChain){
            return this.connectOnChainTokenIssuer(event);
        }

        this.messaging.sendMessage({
            issuer: issuer,
            action: MessageAction.GET_ISSUER_TOKENS,
            origin: tokensOrigin,
            filter: filter,
            negotiationType: 'active' // TODO: Remove
        }).then((data)=>{

            // TODO: move logic out of event receiver
            const output = {
                data: data
            };

            this.eventReciever(output);

        }).catch((err)=>{
            // TODO: error handling
            console.log(err);
            //event.target.innerHTML = this.repeatAction ? this.repeatAction : 'retry';
            //event.target.classList.add("retry");
        });

    }

    async connectOnChainTokenIssuer (event) {

        const issuerKey = event.target.dataset.issuer;

        const tokens = await this.onChainTokenModule.connectOnChainToken(
            issuerKey,
            this.web3WalletProvider.getConnectedWalletData()[0].address
        );
        
        const output = {
            data: {
                evt: 'set-on-chain-issuer-tokens-active',
                tokens: tokens,
                issuer: issuerKey
            }
        }

        this.eventReciever(output);

    }

    tokenToggleSelection() {
        
        document.querySelectorAll('.token-tn .mobileToggle-tn').forEach((token: any, index: number) => {

            if (index === 0) {

                this.selectedTokens[token.dataset.key] = {};
                
                this.selectedTokens[token.dataset.key]['tokens'] = [];
            
            }

            if (token.checked === true) {

                let output = JSON.parse(token.dataset.token);

                this.selectedTokens[token.dataset.key].tokens.push(output);
                
            }

        });

        console.log(this.selectedTokens);

        this.eventSender.emitSelectedTokensToClient();

    }

    async authenticate(config: AuthenticateInterface) {
 
        const { issuer, unsignedToken } = config;

        requiredParams((issuer && unsignedToken), { status: false, useEthKey: null, proof: null });

        const addressMatch = await this.checkPublicAddressMatch(issuer, unsignedToken);

        // FIXME - UX needed to inform the user match was not found.
        // e.g. create warning notification inside overlay.
        if(!addressMatch) {
            // { status: false, useEthKey: null, proof: null };
            return;
        }

        // TODO: Remove once messaging object is fully implemented
        //const iframeStorageSupport = this.tokenLookup.tokenKeys.length > 0 ? await this.messaging.getCookieSupport(this.tokenLookup[this.offChainTokens.tokenKeys[0]]?.tokenOrigin) : false;

        //if(iframeStorageSupport === true) await this.getTokenProofIframe(issuer, unsignedToken);
        //else this.getTokenProofTab(issuer, unsignedToken);

        this.messaging.sendMessage({
            issuer: issuer,
            action: MessageAction.GET_PROOF,
            origin: tokensOrigin,
            token: unsignedToken,
            timeout: 0 // Don't time out on this event as it needs active input from the user
        }).then((data)=>{

            // TODO: move logic out of event receiver
            const output = {
                data: data
            };

            this.eventReciever(output);

        }).catch((err)=>{
            // TODO: error handling
            console.log(err);
            //event.target.innerHTML = this.repeatAction ? this.repeatAction : 'retry';
            //event.target.classList.add("retry");
        });

    }

    async checkPublicAddressMatch (issuer:string, unsignedToken:any) {

        const { unEndPoint, onChain } = tokenLookup[issuer];

        if (onChain === true || !unsignedToken || !unEndPoint) return { status: false, useEthKey: null, proof: null };

        try {

            let useEthKey = await getChallengeSigned(tokenLookup[issuer], this.web3WalletProvider);

            const attestedAddress = await validateUseEthKey(unEndPoint, useEthKey);

            const walletAddress = await connectMetamaskAndGetAddress();

            if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase()) throw new Error('useEthKey validation failed.');

            return true;

        } catch (e) {

            requiredParams(null, "Could not authenticate token");

        }

    }

    eventSender = {
        emitAllTokensToClient: (tokens:any) => {

            this.on("tokens", null, tokens);

        },
        emitSelectedTokensToClient: () => {

            this.on("tokens-selected", null, { selectedTokens: this.selectedTokens });

        },
        emitProofToClient: (proof: any, issuer: any) => {

            this.on("token-proof", null, { proof: proof, issuer: issuer });

        }
    }

    eventReciever = (event: any) => {

        let issuer, output;

        switch (event.data.evt) {

            case 'set-tab-issuer-tokens-active':

                // TODO: Move origin validation to messaging
                issuer = event.data.issuer;

                let childURL = tokenLookup[issuer].tokenOrigin;

                let cUrl = new URL(childURL);

                let childUrlOrigin = cUrl.origin;

                if (event.origin != childUrlOrigin) return;

                this.offChainTokens[issuer].tokens = event.data.tokens;

                /*if (this.issuerTabInstanceRefs[issuer]) {

                    this.issuerTabInstanceRefs[issuer].close();

                    delete this.issuerTabInstanceRefs[issuer];*/

                    this.issuerConnected(issuer, false);

                //}

                break;
            
            case 'set-tab-issuer-tokens-passive':

                issuer = event.data.issuer;

                output = {};

                output[issuer] = {};

                output[issuer].tokens = event.data.tokens;

                this.eventSender.emitAllTokensToClient(output);

                break;

            case 'set-iframe-issuer-tokens-active':

                issuer = event.data.issuer;

                this.offChainTokens[issuer].tokens = event.data.tokens;

                this.issuerConnected(issuer, false);

                break;
            
            case 'set-on-chain-issuer-tokens-active':

                issuer = event.data.issuer;

                this.onChainTokens[issuer].tokens = event.data.tokens;

                this.issuerConnected(issuer, true);

                break;

            case 'set-on-chain-issuer-tokens-passive':

                issuer = event.data.issuer;

                this.onChainTokens[issuer].tokens = event.data.tokens;

                break;

            case 'proof-tab':

                /*if (this.issuerTabInstanceRefs && this.issuerTabInstanceRefs[event.data.issuer] && this.iframeStorageSupport === false) {

                    this.issuerTabInstanceRefs[event.data.issuer].close();

                    delete this.issuerTabInstanceRefs[event.data.issuer];

                }*/

                // no break intended.

            case 'proof-iframe':

                this.eventSender.emitProofToClient(event.data.proof, event.data.issuer);

                break;

        }
    }

    addTokenThroughTab(magicLink: any) {

        let tab = this.messaging.openTab(magicLink);

        setTimeout(() => { tab?.close(); }, 2500);

    }

    addTokenThroughIframe(magicLink: any) {

        this.messaging.createIframe(magicLink);

    }

    on (type:string, callback?:any, data?:any) {

        requiredParams(type, "Event type is not defined");

        if (callback) {

            // assign callback reference to web developers event e.g. negotiator.on('tokens', (tokensForWebPage) => { ... }));
            
            this.clientCallBackEvents[type] = callback;

        } else {

            // event types: 'tokens', 'tokens-selected', 'proof'

            if(this.clientCallBackEvents[type]) {
             
                return this.clientCallBackEvents[type].call(type, data);

            }

        }

    }

}
