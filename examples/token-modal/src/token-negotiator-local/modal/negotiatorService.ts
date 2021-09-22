// @ts-ignore
import { config } from "./../config";
import { getTokens } from './../core';
import { createModalMarkup, createToken, createFabButton } from "./componentFactory";

// NegotiatorService enscapsulates resources to use the negotiator service (modal)
// - html templates for modal and tokens
// - provides filtered tokens
// * proxy design pattern to expose public methods.

class NegotiatorService {

  // types
  getTokens: ({ filter, tokenName, tokensOrigin, localStorageItemName, tokenParser, unsignedTokenDataName }: { filter?: {}; tokenName?: string; tokensOrigin?: string; localStorageItemName?: string; tokenParser: any; unsignedTokenDataName: string; }) => Promise<unknown>;
  createModalMarkup: () => string;
  createToken: (data: any, index: any, tokenImage: string) => string;
  createFabButton: (buttonURL: string) => string;
  config: any;
  selectedTokenState: any[]
  tokenParser: string;
  filter: {};
  options: {};
  modalClickTimer: any; // ReturnType<typeof setTimeout>;

  constructor() {
    // assign public proxied functions
    this.createModalMarkup = createModalMarkup;
    this.createToken = createToken;
    this.createFabButton = createFabButton;
    this.getTokens = getTokens;
    // initial selected token state
    this.selectedTokenState = [];
  };

  // applies negotiation config from client
  // @ts-ignore
  set configuration ({ filter, tokenName, options }) {
    this.filter = filter;
    this.options = options;
    this.config = config[tokenName];
    this.tokenParser = this.config.tokenParser;
  }

  // manage selected token state (getter/setter)
  get selectedTokens() { return this.selectedTokenState };
  set selectedTokens(tokens) { this.selectedTokenState = tokens };

  // recieves events
  eventReciever = (data: any) => {
    switch (data.evt) {
      case 'getTokenButtonHTML':
        // TODO must be configured by client - read from 'data.evt'
        const dataEvtMock = { tokenName: 'devcon-ticket', filter: {}, options: { tokenSelectorContainer: ".tokenSelectorContainerElement" } };
        // apply the modal markup / animation timing properties
        document.querySelector('.tk-modal').innerHTML = this.createModalMarkup();
        // @ts-ignore
        document.getElementsByClassName('modal')[0].style.transition = 'all 0.2s ease-out';
        // apply config recieved from client
        this.configuration = {
          filter: dataEvtMock.filter,
          tokenName: dataEvtMock.tokenName,
          options: dataEvtMock.options
        };
        // get tokens
        this.getTokens({
          filter: {},
          tokenName: "devcon-ticket",
          tokensOrigin: "http://localhost:3002/",
          localStorageItemName: "dcTokens",
          tokenParser: this.config.tokenParser,
          unsignedTokenDataName: this.config.unsignedTokenDataName
        }).then((resultTokens: any) => {
          // apply tokens to web modal view
          this.addTokens(resultTokens.tokens);
          // send the fab token button to the client
          // to enable interaction with the modal
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
  }

  // sends events
  eventSender = {
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
       },
      "*");
    },
    // @ts-ignore
    modalClickTimer: null,
    emitModalToggleState: () => {
      const toggleModalState = this.modalClickHandler();
      // @ts-ignore
      clearTimeout(this.modalClickTimer);
      if (toggleModalState === 'close') {
        // @ts-ignore
        this.modalClickTimer = setTimeout(() => {
          window.top.postMessage({ evt: 'hideModal', state: toggleModalState }, "*");
        }, 1000);
      } else {
        window.top.postMessage({ evt: 'showModal', state: toggleModalState }, "*");
      }
    }
  }

  // recieved click event from client
  modalClickHandler = () => {
    const element = document.querySelector(".tk-modal .modal");
    const isOpen = element.classList.contains("open");
    element.classList.toggle("open");
    if (!isOpen) {
      window.top.postMessage({ evt: 'hideModal', state: 'open' }, "*");
      element.classList.add("open");
      return 'open';
    } else {
      window.top.postMessage({ evt: 'hideModal', state: 'close' }, "*");
      element.classList.remove("open");
      return 'close';
    }
  }

  // add html tokens to modal
  addTokens = (tokens: any) => {
    const tokenContainer = document.querySelector('.tk-modal .token-container');
    this.addToken(tokenContainer, tokens.map((data: any, index: number) => {
      return this.createToken(data, index, this.config.fabButton);
    }).join(''));
  }

  // add a single token to the modal
  addToken = (tokenContainer: any, str: string) => {
    tokenContainer.innerHTML = str;
  };

}

export default NegotiatorService;
