// @ts-ignore
import { tokenConfig } from "./../tokenConfig";
// @ts-ignore
import { base64ToUint8array } from './../utils';
import ModalTokenStateService from './modalTokenStateService';
import ComponentFactory from "./componentFactory";
import componentFactory from "./componentFactory";

// ModalView
// ModalEventController
// ModalService

export class ModalService {

  constructor(filter = {}, tokenName:any, options = {}) {
    if (!tokenName) console.log("Negotiator: tokenName is a required parameter");
    // @ts-ignore
    this.XMLconfig = tokenConfig[tokenName];
    // @ts-ignore
    this.tokenParser = this.XMLconfig.tokenParser;
  };

  getTokens(
    filter={}, 
    tokenName="devcon-ticket", 
    tokensOrigin="http://localhost:3002/"
  ) {
    return new Promise((resolve, reject) => {
      if (window.location.href === tokensOrigin) {
        // @ts-ignore
        const tokensOutput = this.readTokens(this.XMLconfig.localStorageItemName);
        if (tokensOutput.success && !tokensOutput.noTokens) {
          const decodedTokens:any = this.decodeTokens(tokensOutput.tokens);
          const filteredTokens:any = this.filterTokens(decodedTokens, filter);
          tokensOutput.tokens = filteredTokens;
          resolve(tokensOutput);
        } else {
          reject(false);
        }
      }
    })
  }

  filterTokens(decodedTokens:any, filter = {}) {
    // @ts-ignore
    if (Object.keys(filter).length == 0) filter = this.filter;
    let res:any = [];
    if (
      decodedTokens.length
      && typeof filter === "object"
      && Object.keys(filter).length
    ) {
      let filterKeys = Object.keys(filter);
      decodedTokens.forEach((token:any) => {
        let fitFilter = 1;
        filterKeys.forEach(key => {
          if (token[key].toString() != filter[key].toString()) fitFilter = 0;
        })
        if (fitFilter) res.push(token);
      })
      return res;
    } else {
      return decodedTokens;
    }
  }

  readTokens(localStorageItemName:any) {
    const storageTickets = localStorage.getItem(localStorageItemName);
    let tokens:any = [];
    let output:any = { tokens: [], noTokens: true, success: true };
    try {
      if (storageTickets && storageTickets.length) {
        tokens = JSON.parse(storageTickets);
        if (tokens.length !== 0) {
          tokens.forEach((item:any) => {
            if (item.token && item.secret) output.tokens.push(item);
          })
        }
        if (output.tokens.length) {
          output.noTokens = false;
        }
      }
    } catch (e) {
      console.log('Cant parse tokens in LocalStorage');
      // @ts-ignore
      if (typeof callBack === "function") {
        output.success = false;
      }
    }
    return output;
  }
  
  decodeTokens(rawTokens:any) {
    return rawTokens.map((tokenData) => {
      if (tokenData.token) {
        // @ts-ignore
        let decodedToken = new this.tokenParser(base64ToUint8array(tokenData.token).buffer);
        // @ts-ignore
        if (decodedToken && decodedToken[this.XMLconfig.unsignedTokenDataName]) return decodedToken[this.XMLconfig.unsignedTokenDataName];
      }
    });
  };
}

// NEGOTIATION
const modalTokenStateService = new ModalTokenStateService();
window.addEventListener('message', function(event) { modalEventReciever(event.data); }, false);
const modalClickHandler = () => {
  const element = document.querySelector(".tk-modal .modal");
  const isOpen = element.classList.contains("open");
  element.classList.toggle("open");
  if(!isOpen) {
    window.top.postMessage({ evt: 'hideModal', state: 'open' }, "*");
    element.classList.add("open");
    return 'open';
  } else {
    window.top.postMessage({ evt: 'hideModal', state: 'close' }, "*");
    element.classList.remove("open");
    return 'close';
  }
}

// MODAL
function addTokens(tokenContainer:any, str:string) { tokenContainer.innerHTML = str; }
// MODAL
const initNegotiator = (data:any) => {
  appendModalContent();
  applyModalAnimationSmoothing();
  const negotiatorModal = new ModalService(data.filter, data.tokenName, data.options);
  negotiatorModal.getTokens().then((results:any) => {
    if(results.tokens) {
      const tokenContainer = document.querySelector('.tk-modal .token-container');
      addTokens(tokenContainer, results.tokens.map((data:any, index:number) => {
        return ComponentFactory.createToken(data, index);
      }).join(''));
    }
  });
}
// MODAL
const applyModalAnimationSmoothing = () => {
  // Smooth transitions after initial page load.
  // @ts-ignore
  document.getElementsByClassName('modal')[0].style.transition = 'all 0.2s ease-out';
}

// GENERIC FOR A MODAL OR VOICE BOT
// 'initTokenNegotiator'
// 'setSelectedTokens'
// 'toggleTokenState'

// COULD BE AN ABSTRACTION LAYER...
const modalEventReciever = (data:any) => {
  switch(data.evt) {
    case 'getTokenButtonHTML':
      // TODO - expects entire config as per mock
      const dataEvtMock = { evt: { tokenName: 'devcon-ticket', filter: {}, options: { tokenSelectorContainer: ".tokenSelectorContainerElement" } } } ;
      initNegotiator(dataEvtMock.evt);
      modalEventSender.emitTokenButtonHTML();
      break;
    case 'setSelectedTokens':
      modalEventSender.emitSelectedTokens();
      break;
    case 'setToggleModalHandler':
      modalEventSender.emitModalToggleState();
      break;
  }
}

// 
// COULD BE ABSTRACTED...
const modalEventSender = {
  emitTokenButtonHTML: () => {
    window.top.postMessage({ 
      evt: 'setTokenButtonHTML', 
      button: ComponentFactory.createFabButton(`${document.location.href}/theme/fab-button.svg`)
    }, "*");
  },
  emitSelectedTokens: () => {
    window.top.postMessage({ 
      evt: 'setSelectedTokens', 
      selectedTokens: modalTokenStateService.selectedTokens
     },
    "*");
  },
  // @ts-ignore
  modalClickTimer: null, 
  emitModalToggleState: () => {
    const toggleModalState = modalClickHandler();
    // @ts-ignore
    clearTimeout(this.modalClickTimer);
    if(toggleModalState === 'close') {
      // @ts-ignore
      this.modalClickTimer = setTimeout(() => {
        window.top.postMessage({ evt: 'hideModal', state: toggleModalState }, "*");
      }, 1000);
    } else {
      window.top.postMessage({ evt: 'showModal', state: toggleModalState }, "*");
    }
  }
}

// Modal token selection toggle event (this is triggered when the end user toggles on/off a token)
// @ts-ignore
window.tokenToggleSelection = () => {
  var output:any = [];
  document.querySelectorAll('.token .mobileToggle').forEach((token:any) => {
    if(token.checked === true) {
      output.push(JSON.parse(token.dataset.token));
    }
  });
  modalTokenStateService.selectedTokens = output;
  modalEventSender.emitSelectedTokens();
}

const appendModalContent = () => {
  document.querySelector('.tk-modal').innerHTML = componentFactory.createModalSkeleton();
}

// DEVELOPMENT MODE:
(() => {
  // THIS LINE ALLOWS MODAL TO SHOW FOR DEVELOPMENT USE ONLY
  // TODO: APPLY A DEVELOPMENT FLAG TO THIS / SO IN PRODUCTION THE MODAL 
  // WILL BE HIDDEN FROM VIEW.
  if (window.top === window.self) { 
    const dataEvtMock = { evt: { tokenName: 'devcon-ticket', filter: {}, options: { tokenSelectorContainer: ".tokenSelectorContainerElement" } } } ;
    initNegotiator(dataEvtMock.evt);
    // @ts-ignore
    document.getElementsByClassName('modal')[0].style.opacity = 1;
  }
})();

  // // TODO Consider where this should live. NOT Used inside modal.
  // getRawToken(unsignedToken) {
  //   let tokensOutput = this.readTokens();
  //   if (tokensOutput.success && !tokensOutput.noTokens) {
  //     let rawTokens = tokensOutput.tokens;
  //     let token = false;
  //     if (rawTokens.length) {
  //       rawTokens.forEach(tokenData => {
  //         if (tokenData.token) {
  //           let decodedToken = new this.tokenParser(this.base64ToUint8array(tokenData.token).buffer);
  //           if (decodedToken && decodedToken[this.unsignedTokenDataName]) {
  //             let decodedTokenData = decodedToken[this.unsignedTokenDataName];
  //             if (compareObjects(decodedTokenData, unsignedToken)) {
  //               token = tokenData;
  //             }
  //           }
  //         } else {
  //           console.log('empty token data received');
  //         }
  //       })
  //     }
  //     return token;
  //   }
  // }

  // listenForIframeMessages(event) {
  //   // console.log('listenForIframeMessages fired');
  //   let tokensOriginURL = new URL(this.tokensOrigin);
  //   // listen only tokensOriginURL
  //   if (event.origin !== tokensOriginURL.origin) {
  //     return;
  //   }
  //   // console.log('parent: event = ', event.data);
  //   // iframeCommand required for interaction
  //   if (
  //     typeof event.data.iframeCommand === "undefined"
  //     || typeof event.data.iframeData === "undefined"
  //   ) {
  //     return;
  //   }
  //   // iframeCommand contain command code
  //   let command = event.data.iframeCommand;
  //   // iframeData contains command content (tokens data, useToken , hide/display iframe)
  //   let data = event.data.iframeData;
  //   console.log('parent: command, data = ', command, data);
  //   switch (command) {
  //     case "iframeWrap":
  //       if (data == "show") {
  //         this.tokenIframeWrap.style.display = 'block';
  //       } else if (data == "hide") {
  //         this.tokenIframeWrap.style.display = 'none';
  //       }
  //       break;
  //     case "tokensData":
  //       // tokens received, disable listener
  //       this.detachPostMessageListener(this.listenForIframeMessages);
  //       // TODO remove iframeWraper
  //       this.tokenIframeWrap.remove();
  //       if (data.success && !data.noTokens) {
  //         data.tokens = this.filterTokens(data.tokens);
  //       }
  //       this.negotiateCallback(data);
  //       break;
  //     case "useTokenData":
  //       this.tokenIframeWrap.remove();
  //       this.signCallback && this.signCallback(data);
  //       this.signCallback = false;
  //       break;
  //     case "iframeReady":
  //       if (event && event.source) {
  //         event.source.postMessage(this.queuedCommand, event.origin);
  //         this.queuedCommand = '';
  //       }
  //       break;
  //     default:
  //   }
  // }

  // createIframe() {
  //   console.log('createIframe fired');
  //   // open iframe and request tokens
  //   this.attachPostMessageListener(this.listenForIframeMessages.bind(this));
  //   const iframe = document.createElement('iframe');
  //   this.iframe = iframe;
  //   iframe.src = this.tokensOrigin;
  //   iframe.style.width = '800px';
  //   iframe.style.height = '700px';
  //   iframe.style.maxWidth = '100%';
  //   iframe.style.background = '#fff';
  //   let iframeWrap = document.createElement('div');
  //   this.tokenIframeWrap = iframeWrap;
  //   iframeWrap.setAttribute('style', 'width:100%; min-height: 100vh; position: fixed; align-items: center; justify-content: center; display: none; top: 0; left: 0; background: #fffa');
  //   iframeWrap.appendChild(iframe);
  //   document.body.appendChild(iframeWrap);
  // }

  // attachPostMessageListener(listener) {
  //   if (window.addEventListener) {
  //     window.addEventListener("message", listener, false);
  //   } else {
  //     // IE8
  //     window.attachEvent("onmessage", listener);
  //   }
  // }
  // detachPostMessageListener(listener) {
  //   if (window.addEventListener) {
  //     window.removeEventListener("message", listener, false);
  //   } else {
  //     // IE8
  //     window.detachEvent("onmessage", listener);
  //   }
  // }

  // addTokenThroughIframe(magicLink) {
  //   console.log('createTokenIframe fired for : ' + magicLink);
  //   const iframe = document.createElement('iframe');
  //   this.addTokenIframe = iframe;
  //   iframe.src = magicLink;
  //   iframe.style.width = '1px';
  //   iframe.style.height = '1px';
  //   iframe.style.opacity = 0;
  //   document.body.appendChild(iframe);
  // }

  // listenForParentMessages(event) {
  //   let referrer = new URL(document.referrer);
  //   if (event.origin !== referrer.origin) return;
  //   if (
  //     typeof event.data.parentCommand === "undefined"
  //     || typeof event.data.parentData === "undefined"
  //   ) {
  //     return;
  //   }
  //   // parentCommand contain command code
  //   let command = event.data.parentCommand;
  //   // parentData contains command content (token to sign or empty object)
  //   let data = event.data.parentData;
  //   console.log('iframe: command, data = ', command, data);
  //   switch (command) {
  //     case "signToken":
  //       // we receive decoded token, we have to find appropriate raw token
  //       if (typeof window.Authenticator === "undefined") {
  //         console.log('Authenticator not defined.');
  //         return;
  //       }
  //       let rawTokenData = this.getRawToken(data);
  //       let base64ticket = rawTokenData.token;
  //       let ticketSecret = rawTokenData.secret;
  //       this.authenticator = new Authenticator(this);
  //       let tokenObj = {
  //         ticketBlob: base64ticket,
  //         ticketSecret: ticketSecret,
  //         attestationOrigin: this.attestationOrigin,
  //       };
  //       if (rawTokenData && rawTokenData.id) tokenObj.email = rawTokenData.id;
  //       if (rawTokenData && rawTokenData.magic_link) tokenObj.magicLink = rawTokenData.magic_link;
  //       this.authenticator.getAuthenticationBlob(tokenObj,
  //         res => {
  //           console.log('sign result:', res);
  //           window.parent.postMessage({ iframeCommand: "useTokenData", iframeData: { useToken: res, message: '', success: !!res } }, referrer.origin);
  //         });
  //       break;
  //     case "tokensList":
  //       this.returnTokensToParent();
  //       break;
  //     default:
  //   }
  // }

  // commandDisplayIframe() {
  //   let referrer = new URL(document.referrer);
  //   window.parent.postMessage({ iframeCommand: "iframeWrap", iframeData: 'show' }, referrer.origin);
  // }

  // commandHideIframe() {
  //   let referrer = new URL(document.referrer);
  //   window.parent.postMessage({ iframeCommand: "iframeWrap", iframeData: 'hide' }, referrer.origin);
  // }

  // returnTokensToParent() {
  //   let tokensOutput = this.readTokens();
  //   if (tokensOutput.success && !tokensOutput.noTokens) {
  //     let decodedTokens = this.decodeTokens(tokensOutput.tokens);
  //     let filteredTokens = this.filterTokens(decodedTokens);
  //     tokensOutput.tokens = filteredTokens;
  //   }
  //   let referrer = new URL(document.referrer);
  //   window.parent.postMessage({ iframeCommand: "tokensData", iframeData: tokensOutput }, referrer.origin);
  // }