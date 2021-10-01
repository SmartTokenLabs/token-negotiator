import { config } from "./../config";
import { getTokens } from './../core';
import { createModalMarkup, createToken, createFabButton } from "./componentFactory";
class NegotiatorService {
    constructor() {
        this.eventReciever = (dataObject) => {
            const { data, evt } = dataObject;
            switch (evt) {
                case 'getTokenButtonHTML':
                    if (!data.tokenName)
                        return console.warn('token negotiator: overlay eventReciever() missing required parameters.');
                    document.querySelector('.tk-modal').innerHTML = this.createModalMarkup();
                    document.getElementsByClassName('modal')[0].style.transition = 'all 0.2s ease-out';
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
                case 'setToggleModalHandler':
                    this.eventSender.emitModalToggleState();
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
            modalClickTimer: null,
            emitModalToggleState: () => {
                const toggleModalState = this.modalClickHandler();
                clearTimeout(this.modalClickTimer);
                if (toggleModalState === 'close') {
                    this.modalClickTimer = setTimeout(() => {
                        window.top.postMessage({ evt: 'hideModal', state: toggleModalState }, "*");
                    }, 1000);
                }
                else {
                    window.top.postMessage({ evt: 'showModal', state: toggleModalState }, "*");
                }
            }
        };
        this.modalClickHandler = () => {
            const element = document.querySelector(".tk-modal .modal");
            const isOpen = element.classList.contains("open");
            element.classList.toggle("open");
            if (!isOpen) {
                window.top.postMessage({ evt: 'hideModal', state: 'open' }, "*");
                element.classList.add("open");
                return 'open';
            }
            else {
                window.top.postMessage({ evt: 'hideModal', state: 'close' }, "*");
                element.classList.remove("open");
                return 'close';
            }
        };
        this.addTokens = (tokens) => {
            const tokenContainer = document.querySelector('.tk-modal .token-container');
            this.addToken(tokenContainer, tokens.map((data, index) => {
                return this.createToken(data, index, this.config.fabButton);
            }).join(''));
        };
        this.addToken = (tokenContainer, str) => {
            tokenContainer.innerHTML = str;
        };
        this.createModalMarkup = createModalMarkup;
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
