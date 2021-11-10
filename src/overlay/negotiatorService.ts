// @ts-nocheck
// @ts-ignore
import { config } from "./../config";
import { getTokens } from './../core';
import { createOverlayMarkup, createToken, createFabButton } from "./componentFactory";

// NegotiatorService enscapsulates resources to use the negotiator service (overlay)
// - html templates for overlay and tokens
// - provides filtered tokens
// * proxy design pattern to expose public methods.

class NegotiatorService {

  // types
  getTokens: ({ filter, tokenName, tokensOrigin, localStorageItemName, tokenParser, unsignedTokenDataName }: { filter?: {}; tokenName?: string; tokensOrigin?: string; localStorageItemName?: string; tokenParser: any; unsignedTokenDataName: string; }) => Promise<unknown>;
  createOverlayMarkup: () => string;
  createToken: (data: any, index: any, tokenImage: string) => string;
  createFabButton: (buttonURL: string) => string;
  config: any;
  selectedTokenState: any[]
  tokenParser: string;
  filter: {};
  options: {};
  overlayClickTimer: any; // ReturnType<typeof setTimeout>;

  constructor() {
    // assign public proxied functions
    this.createOverlayMarkup = createOverlayMarkup;
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
  eventReciever = (dataObject: any) => {
    const { data, evt } = dataObject;
    switch (evt) {
      case 'getTokenButtonHTML':
        if (!data.tokenName) return console.warn('token negotiator: overlay eventReciever() missing required parameters.');
        // apply the overlay markup / animation timing properties
        document.querySelector('.tk-overlay').innerHTML = this.createOverlayMarkup();
        // @ts-ignore
        document.getElementsByClassName('overlay')[0].style.transition = 'all 0.2s ease-out';
        // apply config recieved from client
        this.configuration = {
          filter: data.filter,
          tokenName: data.tokenName, 
          options: data.options
        };
        // get tokens
        this.getTokens({
          filter: this.filter,
          tokenName: this.config.tokenName,
          tokensOrigin: this.config.tokenOrigin,
          localStorageItemName: this.config.localStorageItemName,
          tokenParser: this.config.tokenParser,
          unsignedTokenDataName: this.config.unsignedTokenDataName
        }).then((tokens: any) => {
          // apply tokens to web overlay view
          this.addTokens(tokens);
          // send the fab token button to the client
          // to enable interaction with the overlay
          this.eventSender.emitTokenButtonHTML();
        });
        break;
      case 'setSelectedTokens':
        this.eventSender.emitSelectedTokens();
        break;
      case 'setCloseOverlay':
        const element = document.querySelector(".tk-overlay .overlay");
        const isOpen = element.classList.contains("open");
        if(isOpen) this.overlayClickHandler();
        break;
      case 'setToggleOverlayHandler':
        this.eventSender.emitOverlayToggleState();
        break;
    }
  }

  // sends events
  eventSender = {
    emitTokenButtonHTML: () => {
      window.top.postMessage({
        evt: 'setTokenButtonHTML',
        button: this.createFabButton(this.config.fabButton)
      }, document.referrer);
    },
    emitSelectedTokens: () => {
      window.top.postMessage({
        evt: 'setSelectedTokens',
        selectedTokens: this.selectedTokens
       },
       document.referrer);
    },
    // @ts-ignore
    overlayClickTimer: null,
    emitOverlayToggleState: () => {
      const toggleOverlayState = this.overlayClickHandler();
      // @ts-ignore
      clearTimeout(this.overlayClickTimer);
      if (toggleOverlayState === 'close') this.closeOverlay();
      else this.showOverlay();
    }
  }

  closeOverlay = () => {
    // @ts-ignore
    this.overlayClickTimer = setTimeout(() => {
      window.top.postMessage({ evt: 'hideOvelay', state: 'close' }, document.referrer);
    }, 1000);
  }
  
  showOverlay = () => {
    window.top.postMessage({ evt: 'showOverlay', state: 'open' }, document.referrer);
  }

  // recieved click event from client
  overlayClickHandler = () => {
    const element = document.querySelector(".tk-overlay .overlay");
    const isOpen = element.classList.contains("open");
    element.classList.toggle("open");
    if (!isOpen) {
      window.top.postMessage({ evt: 'hideOverlay', state: 'open' }, document.referrer);
      element.classList.add("open");
      return 'open';
    } else {
      window.top.postMessage({ evt: 'hideOverlay', state: 'close' }, document.referrer);
      element.classList.remove("open");
      return 'close';
    }
  }

  // add html tokens to overlay
  addTokens = (tokens: any) => {
    const tokenContainer = document.querySelector('.tk-overlay .token-container');
    this.addToken(tokenContainer, tokens.map((data: any, index: number) => {
      return this.createToken(data, index, this.config.fabButton);
    }).join(''));
  }

  // add a single token to the overlay
  addToken = (tokenContainer: any, str: string) => {
    tokenContainer.innerHTML = str;
  };

}

export default NegotiatorService;
