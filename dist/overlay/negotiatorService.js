import { config } from "./../config";
import { getTokens } from './../core';
import { createOverlayMarkup, createToken, createFabButton } from "./componentFactory";
class NegotiatorService {
    constructor() {
        this.eventReciever = (dataObject) => {
            const { data, evt } = dataObject;
            switch (evt) {
                case 'getTokenButtonHTML':
                    if (!data.tokenName)
                        return console.warn('token negotiator: overlay eventReciever() missing required parameters.');
                    document.querySelector('.tk-overlay').innerHTML = this.createOverlayMarkup();
                    document.getElementsByClassName('overlay')[0].style.transition = 'all 0.2s ease-out';
                    this.configuration = {
                        filter: data.filter,
                        tokenName: data.tokenName,
                        options: data.options
                    };
                    this.getTokens({
                        filter: this.filter,
                        tokenName: this.config.tokenName,
                        tokensOrigin: this.config.tokenOrigin,
                        localStorageItemName: this.config.localStorageItemName,
                        tokenParser: this.config.tokenParser,
                        unsignedTokenDataName: this.config.unsignedTokenDataName
                    }).then((tokens) => {
                        this.addTokens(tokens);
                        this.eventSender.emitTokenButtonHTML();
                    });
                    break;
                case 'setSelectedTokens':
                    this.eventSender.emitSelectedTokens();
                    break;
                case 'setToggleOverlayHandler':
                    this.eventSender.emitOverlayToggleState();
                    break;
            }
        };
        this.eventSender = {
            emitTokenButtonHTML: () => {
                window.top.postMessage({
                    evt: 'setTokenButtonHTML',
                    button: this.createFabButton(this.config.fabButton)
                }, "*");
            },
            emitSelectedTokens: () => {
                window.top.postMessage({
                    evt: 'setSelectedTokens',
                    selectedTokens: this.selectedTokens
                }, "*");
            },
            overlayClickTimer: null,
            emitOverlayToggleState: () => {
                const toggleOverlayState = this.overlayClickHandler();
                clearTimeout(this.overlayClickTimer);
                if (toggleOverlayState === 'close') {
                    this.overlayClickTimer = setTimeout(() => {
                        window.top.postMessage({ evt: 'hideOvelay', state: toggleOverlayState }, "*");
                    }, 1000);
                }
                else {
                    window.top.postMessage({ evt: 'showOverlay', state: toggleOverlayState }, "*");
                }
            }
        };
        this.overlayClickHandler = () => {
            const element = document.querySelector(".tk-overlay .overlay");
            const isOpen = element.classList.contains("open");
            element.classList.toggle("open");
            if (!isOpen) {
                window.top.postMessage({ evt: 'hideOverlay', state: 'open' }, "*");
                element.classList.add("open");
                return 'open';
            }
            else {
                window.top.postMessage({ evt: 'hideOverlay', state: 'close' }, "*");
                element.classList.remove("open");
                return 'close';
            }
        };
        this.addTokens = (tokens) => {
            const tokenContainer = document.querySelector('.tk-overlay .token-container');
            this.addToken(tokenContainer, tokens.map((data, index) => {
                return this.createToken(data, index, this.config.fabButton);
            }).join(''));
        };
        this.addToken = (tokenContainer, str) => {
            tokenContainer.innerHTML = str;
        };
        this.createOverlayMarkup = createOverlayMarkup;
        this.createToken = createToken;
        this.createFabButton = createFabButton;
        this.getTokens = getTokens;
        this.selectedTokenState = [];
    }
    ;
    set configuration({ filter, tokenName, options }) {
        this.filter = filter;
        this.options = options;
        this.config = config[tokenName];
        this.tokenParser = this.config.tokenParser;
    }
    get selectedTokens() { return this.selectedTokenState; }
    ;
    set selectedTokens(tokens) { this.selectedTokenState = tokens; }
    ;
}
export default NegotiatorService;
