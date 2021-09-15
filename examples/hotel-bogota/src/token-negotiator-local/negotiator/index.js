import { ethers } from "ethers";
import { tokenConfig } from "./tokenConfig";

export class Negotiator {

  constructor(filter = {}, tokenName, options = {}) {
    if (!tokenName) console.warn("Negotiator: tokenName is a required parameter");
    if (!options.tokenSelectorContainer) console.warn("Negotiator: options.tokenSelectorContainer is a required parameter");
    this.tokenName = tokenName;
    this.config = tokenConfig[tokenName];
    this.options = options;
    this.filter = filter;
    this.assignClientListener();
    this.embedClientModal(
      tokenName, 
      this.config.tokenOrigin, 
      options.tokenSelectorContainer, 
      filter
    );
  }

  assignClientListener() {
    window.addEventListener('message', (event) => {
      if(event.origin !== this.config.tokenOrigin) return;
      this.clientEventController(event.data);
    }, false);
  }

  embedClientModal(tokenName, tokenOrigin, tokenSelectorContainer, filter) {
    setTimeout(() => {
      let refTokenSelector = document.querySelector(tokenSelectorContainer);
      if(refTokenSelector) {
        const iframe = `<div class="${tokenName}ModalWrapper"><iframe class="${tokenName}Modal" style="border:0; resize: none; overflow: auto;" height="335px" width="376px" src="${tokenOrigin}" allowtransparency="true" title="outlet" frameborder="0" style="border:0" allowfullscreen frameborder="no" scrolling="no"></iframe></div>`;
        refTokenSelector.innerHTML = iframe;
        let refModalSelector = document.querySelector(`${tokenSelectorContainer} .${tokenName}Modal`);
        refModalSelector.onload = function() { 
          refModalSelector
          .contentWindow
          .postMessage({ 
            evt: "getTokenButtonHTML", 
            data: { 
              filter
            } 
          }, '*');
        };
      }
    }, 0);
  }

  clientEventController(data) {
    switch(data.evt) {
      case 'setTokenButtonHTML':
          if(!document.getElementById("tokenButtonContainer")) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute('id', 'tokenButtonContainer')
            newDiv.style.cssText = `
              display: flex; 
              justify-content: flex-end;
              margin: 10px;
            `;
            newDiv.innerHTML = data.button;
            document.querySelector(`${this.options.tokenSelectorContainer}`).style.margin = '10px';
            document.querySelector(`${this.options.tokenSelectorContainer}`).append(newDiv);
          }
        break;
      case 'hideModal':
        document.querySelector(`${this.options.tokenSelectorContainer} .${this.tokenName}ModalWrapper`).style.display = 'none';
        break;
      case 'showModal':
        document.querySelector(`${this.options.tokenSelectorContainer} .${this.tokenName}ModalWrapper`).style.display = 'block';
        break;
    }
  }

  modalClickHandler() {
    document.querySelector(`${this.options.tokenSelectorContainer} .${this.tokenName}Modal`)
    .contentWindow
    .postMessage({ evt: "setToggleModalHandler" }, '*');
  }

  async connectMetamaskAndGetAddress() {
    if (!window.ethereum) throw new Error('Please install metamask to continue.');
    const userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!userAddresses || !userAddresses.length) throw new Error("Active Wallet required");
    return userAddresses[0];
  }

  async signMessageWithBrowserWallet(message) {
    await this.connectMetamaskAndGetAddress();
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    return await signer.signMessage(message);
  }


  // Point of discussion Nick, Oleg, Weiwu, Fyang. 
  // (Client, modal, communication)

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

    // TODO is this needed ?
    // open iframe and request tokens
    // this.queuedCommand = { parentCommand: 'signToken', parentData: unsignedToken };
    // this.createIframe();
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
    const storageEthKeys = localStorage.getItem(this.config.localStorageEthKeyItemName);
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
          localStorage.setItem(this.config.localStorageEthKeyItemName, JSON.stringify(ethKeys));
        }
      }
      return useEthKey;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async signNewChallenge(unEndPoint) {
    let res = await this.getUnpredictableNumber(unEndPoint);
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

}
