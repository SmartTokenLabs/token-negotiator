import { ethers } from "ethers";
import { tokenConfig } from "./tokenConfig";

export class Negotiator {

  constructor(filter = {}, tokenName, options = {}) {

    if (!tokenName) console.log("Negotiator: tokenName is a required parameter");

    // The XML config is used to define the token configuration.
    // This includes how the ticket will confirm its vailidity and the origin
    // of where the ticket was issued from.
    let XMLconfig = tokenConfig[tokenName];
    
    this.queuedCommand = false;
    this.filter = filter;
    this.tokensOrigin = XMLconfig.tokenOrigin;
    this.tokenModal = XMLconfig.tokenModal;
    this.debug = 0;
    this.hideTokensIframe = 1;
    this.tokenOrigin = XMLconfig.tokenOrigin;
    this.attestationOrigin = XMLconfig.attestationOrigin;
    this.tokenUrlName = XMLconfig.tokenUrlName;
    this.tokenSecretName = XMLconfig.tokenSecretName;
    this.tokenIdName = XMLconfig.tokenIdName;
    this.unsignedTokenDataName = XMLconfig.unsignedTokenDataName;
    
    // this customer friendly lib should not need to contain such data
    this.tokenParser = XMLconfig.tokenParser;

    this.localStorageItemName = XMLconfig.localStorageItemName;
    this.localStorageEthKeyItemName = XMLconfig.localStorageEthKeyItemName;
    this.addTokenIframe = null;
    this.modalTimer = null;

    if (options.hasOwnProperty('debug')) this.debug = options.debug;
    if (options.hasOwnProperty('attestationOrigin')) this.attestationOrigin = options.attestationOrigin;
    if (options.hasOwnProperty('tokenOrigin')) this.tokenOrigin = options.tokenOrigin;

    this.isTokenOriginWebsite = false;

    if (this.attestationOrigin) {
      // if attestationOrigin filled then token need attestaion
      let currentURL = new URL(window.location.href);
      let tokensOriginURL = new URL(this.tokensOrigin);

      if (currentURL.origin === tokensOriginURL) {
        // its tokens website, where tokens saved in localStorage
        // lets chech url params and save token data to the local storage
        this.isTokenOriginWebsite = true;
        this.readMagicUrl();
      }

      this.attachPostMessageListener(event => {
        if (event.origin !== tokensOriginURL.origin) {
          return;
        }
        if (event.data.iframeCommand && event.data.iframeCommand == "closeMe" && this.addTokenIframe) {
          this.addTokenIframe.remove();
          const tokenEvent = new Event('newTokenAdded');
          document.body.dispatchEvent(tokenEvent);
        }

      })

    }

    // TODO: Can we review this question below 'do we inside iframe'.
    // do we inside iframe? 
    if (window !== window.parent) {
      this.debug && console.log('negotiator: its iframe, lets return tokens to the parent');

      // its iframe, listen for requests
      this.attachPostMessageListener(this.listenForParentMessages.bind(this))

      // send ready message to start interaction
      let referrer = new URL(document.referrer);
      window.parent.postMessage({ iframeCommand: "iframeReady", iframeData: '' }, referrer.origin);
    }

    // embed Iframe
    setTimeout(() => {
      if(document.querySelector('.tokenSelectorContainerElement')) {
        // todo name the modal after the token outlet name.
        const iframe = `<iframe class="${tokenName}Modal" style="border:0; resize: none; overflow: auto;" height="335px" width="376px" src="${this.tokenModal}" allowtransparency="true" title="outlet" frameborder="0" style="border:0" allowfullscreen frameborder="no" scrolling="no"></iframe>`;
        // embed iframe
        document.querySelector('.tokenSelectorContainerElement').innerHTML = iframe;
        // onload of iframe post message
        document.querySelector(`.tokenSelectorContainerElement .${tokenName}Modal`).onload = function() { 
          document.querySelector(`.tokenSelectorContainerElement .${tokenName}Modal`)
          .contentWindow
          .postMessage(
            {
              evt: "getTokenButtonHTML" 
            }, '*');
        };
      }
    }, 0);
    
    // Handle Incoming Event Requests From Parent Window.
    window.addEventListener('message', (event) => {
      // if(event.origin !== '*') return; // review if we should whitelist access some events.
      this.eventController(event.data);
    }, false);
  }

  // Handle Event Business Logic
  eventController(data) {

    // if(data.evt) debugger;

    switch(data.evt) {
      case 'setTokenButtonHTML':
          if(!document.getElementById("tokenButtonContainer")) {
            const newDiv = document.createElement("div");
            newDiv.setAttribute('id', 'tokenButtonContainer')
            newDiv.style.display = 'flex';
            newDiv.style.justifyContent= 'flex-end';
            newDiv.innerHTML = data.button;
            document.getElementsByClassName("tokenSelectorContainerElement")[0].style.margin = '10px';
            document.getElementsByClassName("tokenSelectorContainerElement")[0].append(newDiv);
          }
        break;
      case 'setSelectedTokens':
        // defines the tokens that are available to the website
        // window.top.postMessage({ evt: 'setSelectedTokens', selectedTokens: originData.selectedTokens }, "*");
        break;
      case 'setToggleModalHandler':
        // defines the tokens that are available to the website
        // toggleTokenButtonHandler();
        break;
    }
  }

  animateModal() {
    // If the timer exists and this function triggers the timeout wasn't complete
    // so we hide the modal
    if(this.modalTimer) document.getElementsByClassName('devcon-ticketModal')[0].style.display = 'none';
    // clear timer each event
    clearTimeout(this.modalTimer);
    // allow for up to 1 second of css animation to close the modal
    if(document.getElementsByClassName('devcon-ticketModal')[0].style.display === 'block'){
      this.modalTimer = setTimeout(() => {
        document.getElementsByClassName('devcon-ticketModal')[0].style.display = 'none';
      }, 1000);
    } else {
      document.getElementsByClassName('devcon-ticketModal')[0].style.display = 'block';
    }
  }

  // manages when token button is pressed
  tokenButtonHandler() {
    // hide show iframe for modal
    this.animateModal();
    // dispatch event to hide/show modal within iframe
    document.querySelector(`.tokenSelectorContainerElement .devcon-ticketModal`)
    .contentWindow
    .postMessage({ evt: "setToggleModalHandler" }, '*');
  }

  async connectMetamaskAndGetAddress() {

    if (!window.ethereum) {
      throw new Error('Please install metamask before.');
    }

    // const userAddresses = await window.ethereum.request({ method: 'eth_accounts' });
    const userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!userAddresses || !userAddresses.length) {
      throw new Error("Active Wallet required");
    }

    return userAddresses[0];
  }

  async signMessageWithBrowserWallet(message) {
    await this.connectMetamaskAndGetAddress();

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    return await signer.signMessage(message);
  }

  addTokenThroughIframe(magicLink) {
    console.log('createTokenIframe fired for : ' + magicLink);
    // open iframe and request tokens
    // this.attachPostMessageListener(this.listenForIframeMessages.bind(this));

    const iframe = document.createElement('iframe');
    this.addTokenIframe = iframe;
    iframe.src = magicLink;
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.opacity = 0;
    // let iframeWrap = document.createElement('div');
    // this.tokenIframeWrap = iframeWrap;
    // iframeWrap.setAttribute('style', 'width:100%; min-height: 100vh; position: fixed; align-items: center; justify-content: center; display: none; top: 0; left: 0; background: #fffa');
    // iframeWrap.appendChild(iframe);
    document.body.appendChild(iframe);
  }

  listenForParentMessages(event) {

    // listen only parent
    let referrer = new URL(document.referrer);
    if (event.origin !== referrer.origin) {
      return;
    }

    // console.log('iframe: event = ', event.data);

    // parentCommand+parentData required for interaction
    if (
      typeof event.data.parentCommand === "undefined"
      || typeof event.data.parentData === "undefined"
    ) {
      return;
    }

    // parentCommand contain command code
    let command = event.data.parentCommand;

    // parentData contains command content (token to sign or empty object)
    let data = event.data.parentData;

    console.log('iframe: command, data = ', command, data);

    switch (command) {
      case "signToken":
        // we receive decoded token, we have to find appropriate raw token
        if (typeof window.Authenticator === "undefined") {
          console.log('Authenticator not defined.');
          return;
        }

        let rawTokenData = this.getRawToken(data);

        let base64ticket = rawTokenData.token;
        let ticketSecret = rawTokenData.secret;
        this.authenticator = new Authenticator(this);

        let tokenObj = {
          ticketBlob: base64ticket,
          ticketSecret: ticketSecret,
          attestationOrigin: this.attestationOrigin,
        };
        if (rawTokenData && rawTokenData.id) tokenObj.email = rawTokenData.id;
        if (rawTokenData && rawTokenData.magic_link) tokenObj.magicLink = rawTokenData.magic_link;

        this.authenticator.getAuthenticationBlob(tokenObj,
          res => {
            console.log('sign result:', res);
            window.parent.postMessage({ iframeCommand: "useTokenData", iframeData: { useToken: res, message: '', success: !!res } }, referrer.origin);
          });
        break;
      case "tokensList":
        // TODO update
        // console.log('let return tokens');
        this.returnTokensToParent();
        break;

      default:
    }
  }

  commandDisplayIframe() {
    let referrer = new URL(document.referrer);
    window.parent.postMessage({ iframeCommand: "iframeWrap", iframeData: 'show' }, referrer.origin);
  }

  commandHideIframe() {
    let referrer = new URL(document.referrer);
    window.parent.postMessage({ iframeCommand: "iframeWrap", iframeData: 'hide' }, referrer.origin);
  }

  returnTokensToParent() {
    let tokensOutput = this.readTokens();
    if (tokensOutput.success && !tokensOutput.noTokens) {
      let decodedTokens = this.decodeTokens(tokensOutput.tokens);
      let filteredTokens = this.filterTokens(decodedTokens);
      tokensOutput.tokens = filteredTokens;
    }
    let referrer = new URL(document.referrer);
    window.parent.postMessage({ iframeCommand: "tokensData", iframeData: tokensOutput }, referrer.origin);
  }

  readMagicUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = urlParams.get(this.tokenUrlName);
    const secretFromQuery = urlParams.get(this.tokenSecretName);
    const idFromQuery = urlParams.get(this.tokenIdName);

    if (!(tokenFromQuery && secretFromQuery)) {
      return;
    }

    // Get the current Storage Tokens
    let tokensOutput = this.readTokens();
    let tokens = [];

    let isNewQueryTicket = true;

    if (!tokensOutput.noTokens) {
      // Build new list of tickets from current and query ticket { ticket, secret }
      tokens = tokensOutput.tokens;

      tokens.map(tokenData => {
        if (tokenData.token === tokenFromQuery) {
          isNewQueryTicket = false;
        }
      });

    }

    // Add ticket if new
    // if (isNewQueryTicket && tokenFromQuery && secretFromQuery) {
    if (isNewQueryTicket) {
      tokens.push({
        token: tokenFromQuery,
        secret: secretFromQuery,
        id: idFromQuery,
        magic_link: window.location.href
      }); // new raw object
    }
    // Set New tokens list raw only, websters will be decoded each time
    localStorage.setItem(this.localStorageItemName, JSON.stringify(tokens));

    if (window !== window.parent) {
      this.debug && console.log('negotiator: its iframe, lets close it');

      // send ready message to start interaction
      let referrer = new URL(document.referrer);
      window.parent.postMessage({ iframeCommand: "closeMe" }, referrer.origin);
    }
  }

  /*
    * Return token objects satisfying the current negotiator's requirements
    */
  filterTokens(decodedTokens, filter = {}) {
    if (Object.keys(filter).length == 0) {
      filter = this.filter;
    }
    let res = [];
    if (
      decodedTokens.length
      && typeof filter === "object"
      && Object.keys(filter).length
    ) {
      let filterKeys = Object.keys(filter);
      decodedTokens.forEach(token => {
        let fitFilter = 1;
        this.debug && console.log('test token:', token);
        filterKeys.forEach(key => {
          if (token[key].toString() != filter[key].toString()) fitFilter = 0;
        })
        if (fitFilter) {
          res.push(token);
          this.debug && console.log('token fits:', token);
        }
      })
      return res;
    } else {
      return decodedTokens;
    }
  }

  compareObjects(o1, o2) {
    for (var p in o1) {
      if (o1.hasOwnProperty(p)) {
        if (o1[p].toString() !== o2[p].toString()) {
          return false;
        }
      }
    }
    for (var p in o2) {
      if (o2.hasOwnProperty(p)) {
        if (o1[p].toString() !== o2[p].toString()) {
          return false;
        }
      }
    }
    return true;
  };

  // read tokens from local storage and return as object {tokens: [], noTokens: boolean, success: boolean}
  readTokens() {
    const storageTickets = localStorage.getItem(this.localStorageItemName);
    let tokens = [];
    let output = { tokens: [], noTokens: true, success: true };
    try {
      if (storageTickets && storageTickets.length) {
        // Build new list of tickets from current and query ticket { ticket, secret }
        tokens = JSON.parse(storageTickets);
        if (tokens.length !== 0) {

          // output.tokens = tokens;
          tokens.forEach(item => {
            if (item.token && item.secret) {
              output.tokens.push(item)
              // output.tokens.push({
              //     token: item.token,
              //     secret: item.secret
              // })
            }
          })
        }
        if (output.tokens.length) {
          output.noTokens = false;
        }
      }
    } catch (e) {
      console.log('Cant parse tokens in LocalStorage');
      if (typeof callBack === "function") {
        output.success = false;
      }
    }
    return output;
  }

  // this customer friendly lib should not need to contain such data
  // getRawToken(unsignedToken) {
  //   let tokensOutput = this.readTokens();
  //   if (tokensOutput.success && !tokensOutput.noTokens) {
  //     let rawTokens = tokensOutput.tokens;
  //     let token = false;
  //     if (rawTokens.length) {
  //       rawTokens.forEach(tokenData => {
  //         if (tokenData.token) {
  //           // this customer friendly lib should not need to contain such data
  //           let decodedToken = new this.tokenParser(this.base64ToUint8array(tokenData.token).buffer);
  //           if (decodedToken && decodedToken[this.unsignedTokenDataName]) {
  //             let decodedTokenData = decodedToken[this.unsignedTokenDataName];
  //             if (this.compareObjects(decodedTokenData, unsignedToken)) {
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

  listenForIframeMessages(event) {

    // console.log('listenForIframeMessages fired');

    let tokensOriginURL = new URL(this.tokensOrigin);

    // listen only tokensOriginURL
    if (event.origin !== tokensOriginURL.origin) {
      return;
    }

    // console.log('parent: event = ', event.data);

    // iframeCommand required for interaction
    if (
      typeof event.data.iframeCommand === "undefined"
      || typeof event.data.iframeData === "undefined"
    ) {
      return;
    }

    // iframeCommand contain command code

    let command = event.data.iframeCommand;

    // iframeData contains command content (tokens data, useToken , hide/display iframe)
    let data = event.data.iframeData;

    console.log('parent: command, data = ', command, data);

    switch (command) {
      case "iframeWrap":
        if (data == "show") {
          this.tokenIframeWrap.style.display = 'block';
        } else if (data == "hide") {
          this.tokenIframeWrap.style.display = 'none';
        }
        break;
      case "tokensData":
        // tokens received, disable listener
        this.detachPostMessageListener(this.listenForIframeMessages);
        // TODO remove iframeWraper
        this.tokenIframeWrap.remove();

        if (data.success && !data.noTokens) {
          data.tokens = this.filterTokens(data.tokens);
        }
        this.negotiateCallback(data);
        break;

      case "useTokenData":

        this.tokenIframeWrap.remove();

        this.signCallback && this.signCallback(data);
        this.signCallback = false;
        break;

      case "iframeReady":
        if (event && event.source) {
          event.source.postMessage(this.queuedCommand, event.origin);
          this.queuedCommand = '';
        }

        break;

      default:

    }
  }

  authenticate({unsignedToken, unEndPoint}) {
    return new Promise(async (resolve, reject) => {
      await this._authenticate(unsignedToken, unEndPoint, (proof, error) => {
        if (!proof || !this.useEthKey) return reject(error);
        resolve({ proof, useEthKey: this.useEthKey, status: true });
      })
    })
  }


  async _authenticate(unsignedToken, unEndPoint, signCallback) {
    let useEthKey;
    try {
      useEthKey = await this.getChallengeSigned(unEndPoint);
      const validateResult = await this.validateUseEthKey(unEndPoint, useEthKey);
      let walletAddress = await this.connectMetamaskAndGetAddress();
      if (walletAddress.toLowerCase() !== validateResult.toLowerCase()) {
        throw new Error('useEthKey validation failed.');
      }
    } catch (e) {
      signCallback(null, e);
      return;
    }

    this.useEthKey = useEthKey;

    this.signCallback = signCallback;
    // open iframe and request tokens
    this.queuedCommand = { parentCommand: 'signToken', parentData: unsignedToken };
    this.createIframe();
  }

  async validateUseEthKey(endPoint, data){
    try {
      const response = await fetch(endPoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      const json = await response.json();
      return json.address;
    } catch (e) {
      console.log(e);
      return '';
    }
  }

  async getUnpredictableNumber(endPoint) {
    try {
      const response = await fetch(endPoint);
      const json = await response.json();
      json.success = true;
      return json;
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: "UN request failed"
      }
    }
  }

  ethKeyIsValid(ethKey) {
    if (ethKey.expiry < Date.now()) return false;
    return true;
  }

  async getChallengeSigned(unEndPoint) {

    const storageEthKeys = localStorage.getItem(this.localStorageEthKeyItemName);
    let ethKeys;

    if (storageEthKeys && storageEthKeys.length) {
      ethKeys = JSON.parse(storageEthKeys);
    } else {
      ethKeys = {};
    }

    try {
      let address = await this.connectMetamaskAndGetAddress();
      address = address.toLowerCase();

      let useEthKey;

      if (ethKeys && ethKeys[address] && !this.ethKeyIsValid(ethKeys[address])) {
        console.log('remove invalid useEthKey');
        delete ethKeys[address];
      }

      if (ethKeys && ethKeys[address]) {
        useEthKey = ethKeys[address];
      } else {
        useEthKey = await this.signNewChallenge(unEndPoint);
        if (useEthKey) {
          ethKeys[useEthKey.address.toLowerCase()] = useEthKey;
          localStorage.setItem(this.localStorageEthKeyItemName, JSON.stringify(ethKeys));
        }
      }
      return useEthKey;

    } catch (e) {
      throw new Error(e.message);
    }
  }

  async signNewChallenge(unEndPoint) {
    let res = await this.getUnpredictableNumber(unEndPoint);

    console.log(res);
    const { number:UN, randomness, domain, expiration:expiry, messageToSign } = res;

    let signature = await this.signMessageWithBrowserWallet(messageToSign);
    const msgHash = ethers.utils.hashMessage(messageToSign);
    const msgHashBytes = ethers.utils.arrayify(msgHash);

    const recoveredAddress = ethers.utils.recoverAddress(msgHashBytes, signature);

    return {
      address: recoveredAddress,
      expiry,
      domain,
      randomness,
      signature,
      UN
    };
  }

  negotiate() {
    return new Promise((resolve, reject) => {
      this._negotiate((tokens) => {
        if (!tokens) return reject(false)
        resolve(tokens);
      })
    })
  }
  
  getTokenInstances() {
    return new Promise((resolve, reject) => {
      this._negotiate((tokens) => {
        if (!tokens) return reject(false)
        resolve(tokens);
      })
    })
  }

  _negotiate(callBack) {

    if(!this.attestationOrigin){
      console.warn({ msg: 'no attestation origin provided' });
      return;
    }

    this.negotiateCallback = callBack;
    
    if (window.location.href === this.tokensOrigin) {
      const tokensOutput = this.readTokens();
      // TODO: review this logic - if (tokensOutput) { // this would be a simpler way of doing this.
      if (tokensOutput.success && !tokensOutput.noTokens) {
        const decodedTokens = this.decodeTokens(tokensOutput.tokens);
        const filteredTokens = this.filterTokens(decodedTokens);
        tokensOutput.tokens = filteredTokens;
        this.negotiateCallback(tokensOutput);
      }
    } else {
      this.queuedCommand = { parentCommand: 'tokensList', parentData: '' };
      this.createIframe()
    }
  }

  createIframe() {
    console.log('createIframe fired');
    // open iframe and request tokens
    this.attachPostMessageListener(this.listenForIframeMessages.bind(this));

    const iframe = document.createElement('iframe');
    this.iframe = iframe;
    iframe.src = this.tokensOrigin;
    iframe.style.width = '800px';
    iframe.style.height = '700px';
    iframe.style.maxWidth = '100%';
    iframe.style.background = '#fff';
    let iframeWrap = document.createElement('div');
    this.tokenIframeWrap = iframeWrap;
    iframeWrap.setAttribute('style', 'width:100%; min-height: 100vh; position: fixed; align-items: center; justify-content: center; display: none; top: 0; left: 0; background: #fffa');
    iframeWrap.appendChild(iframe);
    document.body.appendChild(iframeWrap);
  }

  base64ToUint8array(base64str) {
    // decode base64url to base64. it will do nothing for base64
    base64str = base64str.split('-').join('+')
      .split('_').join('/')
      .split('.').join('=');
    let res;

    if (typeof Buffer !== 'undefined') {
      res = Uint8Array.from(Buffer.from(base64str, 'base64'));
    } else {
      res = Uint8Array.from(atob(base64str), c => c.charCodeAt(0));
    }
    return res;
  }

  decodeTokens(rawTokens) {
    if (this.debug) {
      console.log('decodeTokens fired');
      console.log(rawTokens);
    }
    let decodedTokens = [];
    if (rawTokens.length) {
      rawTokens.forEach(tokenData => {
        if (tokenData.token) {
          let decodedToken = new this.tokenParser(this.base64ToUint8array(tokenData.token).buffer);
          if (decodedToken && decodedToken[this.unsignedTokenDataName]) decodedTokens.push(decodedToken[this.unsignedTokenDataName]);
        } else {
          console.log('empty token data received');
        }
      })
    }
    return decodedTokens;
  }

  attachPostMessageListener(listener) {
    if (window.addEventListener) {
      window.addEventListener("message", listener, false);
    } else {
      // IE8
      window.attachEvent("onmessage", listener);
    }
  }
  detachPostMessageListener(listener) {
    if (window.addEventListener) {
      window.removeEventListener("message", listener, false);
    } else {
      // IE8
      window.detachEvent("onmessage", listener);
    }
  }
}
