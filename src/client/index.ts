// @ts-nocheck
import { asyncHandle, requiredParams, logger } from './../utils/index';
import { getTokens, getChallengeSigned, validateUseEthKey, connectMetamaskAndGetAddress, getTokenProof } from "../core/index";
import { createOverlayMarkup, createFabButton, createToken } from './componentFactory';
import { tokenLookup } from './../tokenLookup';
// import './../Attestation/authenticator';
import "./../theme/style.css";
import './../vendor/keyShape';

interface NegotiationInterface {
    type: string;
    issuers: string[];
    options: any
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
    type: string;
    options: any;
    offChainTokens: any;
    onChainTokens: any;

    constructor(config: NegotiationInterface) {

        const { type, issuers, options } = config;

        // @ts-ignore
        // this.authenticator = null; // new Authenticator();

        // @ts-ignore
        // requiredParams(this.authenticator, "authenticator is missing");

        // requiredParams(type, 'type is required.');

        // requiredParams(issuers, 'issuers are missing.');

        this.type = type;

        this.options = options;

        this.issuers = issuers;

        this.offChainTokens = { tokenKeys: [] };

        this.onChainTokens = { tokenKeys: [] };

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

    }

    async setWebTokens(offChainTokens: any) {

        await Promise.all(offChainTokens.tokenKeys.map(async (issuer: string): Promise<any> => {

            const { tokenOrigin, itemStorageKey, tokenParser, unsignedTokenDataName } = tokenLookup[issuer];

            const tokens = await getTokens({ filter: {}, tokensOrigin: tokenOrigin, itemStorageKey: itemStorageKey, tokenParser: tokenParser, unsignedTokenDataName: unsignedTokenDataName });

            this.offChainTokens[issuer].tokens = tokens;

            return tokens;

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

        // let [webTokens, webTokensErr] = await asyncHandle(this.setWebTokens(this.offChainTokens));
        // if (!webTokens || webTokensErr) {
        //     logger('token negotiator: no web tokens found.');
        // }

        // /* 
        
        //     ------------------------------
        //     blockchain token reader module
        //     ------------------------------
        
        //     * await this.setBlockchainTokens(this.onChainTokens);

        // */

        // if (this.type === 'active') {

        //     this.activeNegotiationStrategy();

        // } else {

        //     return this.passiveNegotiationStrategy();

        // }

        // Assume Active Flow for now:

        // 1. Show this demo can get the local storage data.

        // Outlet URL
		let childURL = "https://nicktaras.github.io/iframe-test/index.html";
		let cUrl = new URL(childURL);
		let childUrlOrigin = cUrl.origin;

        function attachPostMessageListener(listener) {
            if (window.addEventListener) {
            window.addEventListener("message", listener, false);
            } else {
            // IE8
            window.attachEvent("onmessage", listener);
            }
        }

        let listener = (event) => {
            if (event.origin != childUrlOrigin) return;
            logger.insertAdjacentHTML('beforeend', `<div>received postMessage from child: ${JSON.stringify(event.data)}</div>`);
        }

        attachPostMessageListener(listener);

        openit.addEventListener('click', ()=>{
            let	childRef = window.open(
            childURL,
            "win1",
            "left=100,top=100,width=320,height=320"
        );
            setInterval(()=>{
                childRef.postMessage({ iframeCommand: "parent to child" }, childURL);
            }, 2000);
            setTimeout(()=>{
                document.body.insertAdjacentHTML('beforeend', `<div>Lets close child tab...</div>`);
                childRef.close();
            }, 7000);
        })

    }

    async passiveNegotiationStrategy() {
        let outputOnChain = this.onChainTokens;
        delete outputOnChain.tokenKeys;
        let outputOffChain = this.offChainTokens;
        delete outputOffChain.tokenKeys;
        return { ...outputOffChain, ...outputOnChain };
    }

    activeNegotiationStrategy() {

        this.embedClientOverlay();

    }

    embedClientOverlay() {

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

    tokenToggleSelection() {

        // let selectedTokens: any = { "tokenKeys": [] };
        let selectedTokens: any = {};

        document.querySelectorAll('.token-tn .mobileToggle-tn').forEach((token: any, index: number) => {

            if (index === 0) {

                selectedTokens[token.dataset.key] = {};

                selectedTokens[token.dataset.key]['tokens'] = [];

                // selectedTokens.tokenKeys.push(token.dataset.key);

            }

            if (token.checked === true) {

                let output = JSON.parse(token.dataset.token);

                selectedTokens[token.dataset.key].tokens.push(output);

            }

        });

        window.postMessage({ evt: 'negotiatedTokensEvt', selectedTokens: selectedTokens }, window.location.origin);

    }

    async authenticate(config: AuthenticateInterface) {

        const { issuer, unsignedToken } = config;
        const { unEndPoint, onChain } = tokenLookup[issuer];

        // TODO handle onchain flow differently
        if (onChain === true || !unsignedToken || !unEndPoint) return { status: false, useEthKey: null, proof: null };

        try {

            let useEthKey = await getChallengeSigned(tokenLookup[issuer]);

            const attestedAddress = await validateUseEthKey(unEndPoint, useEthKey);

            const walletAddress = await connectMetamaskAndGetAddress();

            if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase()) throw new Error('useEthKey validation failed.');

            const tokenProof = await getTokenProof(
                unsignedToken,
                tokenLookup[issuer]
            );

            return { status: true, useEthKey, proof: tokenProof };

        } catch (e) {

            return { status: false, useEthKey: null, proof: null };

        }

    }

    addTokenThroughIframe(magicLink: any) {
        const iframe = document.createElement('iframe');
        iframe.src = magicLink;
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';
        document.body.appendChild(iframe);
    }

}