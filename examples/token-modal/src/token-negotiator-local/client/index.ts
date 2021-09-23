import { ethers } from "ethers";
import { config } from "./../config/index";

export class Client {

  constructor(filter = {}, tokenName:string, options = {}) {
    if (!tokenName) console.warn("Negotiator: tokenName is a required parameter");
    // @ts-ignore
    if (!options.tokenSelectorContainer) console.warn("Negotiator: options.tokenSelectorContainer is a required parameter");
    // @ts-ignore
    this.tokenName = tokenName;
    // @ts-ignore
    this.config = config[tokenName];
    // @ts-ignore
    this.options = options;
    // @ts-ignore
    this.filter = filter;
    this.assignClientListener();
    this.embedClientModal(
      tokenName,
      // @ts-ignore
      this.config.tokenOrigin,
      // @ts-ignore
      options,
      filter
    );
  }

  assignClientListener() {
    window.addEventListener('message', (event) => {
      // @ts-ignore
      if(event.origin !== this.config.tokenOrigin) return;
      this.clientEventController(event.data);
    }, false);
  }

  embedClientModal(tokenName: string, tokenOrigin: string, options: any, filter: any) {
    setTimeout(() => {
      let refTokenSelector = document.querySelector(options.tokenSelectorContainer);
      if(refTokenSelector) {
        const iframe = `<div class="${tokenName}ModalWrapper"><iframe class="${tokenName}Modal" style="border:0; resize: none; overflow: auto;" height="335px" width="376px" src="${tokenOrigin}" allowtransparency="true" title="outlet" frameborder="0" style="border:0" allowfullscreen frameborder="no" scrolling="no"></iframe></div>`;
        refTokenSelector.innerHTML = iframe;
        let refModalSelector = document.querySelector(`${options.tokenSelectorContainer} .${tokenName}Modal`);
        // @ts-ignore
        refModalSelector.onload = function() {
          refModalSelector
          // @ts-ignore
          .contentWindow
          .postMessage({
            evt: "getTokenButtonHTML",
            data: {
              filter,
              tokenName, 
              options
            }
          }, '*');
        };
      }
    }, 0);
  }

  clientEventController(data: any) {
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
            // @ts-ignore
            document.querySelector(`${this.options.tokenSelectorContainer}`).style.margin = '10px';
            // @ts-ignore
            document.querySelector(`${this.options.tokenSelectorContainer}`).append(newDiv);
          }
        break;
      case 'hideModal':
        // @ts-ignore
        document.querySelector(`${this.options.tokenSelectorContainer} .${this.tokenName}ModalWrapper`).style.display = 'none';
        break;
      case 'showModal':
        // @ts-ignore
        document.querySelector(`${this.options.tokenSelectorContainer} .${this.tokenName}ModalWrapper`).style.display = 'block';
        break;
    }
  }

  modalClickHandler() {
    // @ts-ignore
    document.querySelector(`${this.options.tokenSelectorContainer} .${this.tokenName}Modal`)
    // @ts-ignore
    .contentWindow
    .postMessage({ evt: "setToggleModalHandler" }, '*');
  }

  async connectMetamaskAndGetAddress() {
    // @ts-ignore
    if (!window.ethereum) throw new Error('Please install metamask to continue.');
    // @ts-ignore
    const userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!userAddresses || !userAddresses.length) throw new Error("Active Wallet required");
    return userAddresses[0];
  }

  async signMessageWithBrowserWallet(message: any) {
    await this.connectMetamaskAndGetAddress();
    // @ts-ignore
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    return await signer.signMessage(message);
  }


  // Point of discussion Nick, Oleg, Weiwu, Fyang.
  // (Client, modal, communication)

  async authenticate({unsignedToken, unEndPoint}) {
    try {
      let useEthKey = await this.getChallengeSigned(unEndPoint);
      const validateResult = await this.validateUseEthKey(unEndPoint, useEthKey);
      let walletAddress = await this.connectMetamaskAndGetAddress();
      if (walletAddress.toLowerCase() !== validateResult.toLowerCase()) {
        throw new Error('useEthKey validation failed.');
      }
      // @ts-ignore
      this.useEthKey = useEthKey;
      return {status: true, useEthKey, proof: 'proof'};
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async validateUseEthKey(endPoint: string, data: any){
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
      console.error(e);
      return '';
    }
  }

  async getUnpredictableNumber(endPoint: string) {
    try {
      const response = await fetch(endPoint);
      const json = await response.json();
      json.success = true;
      return json;
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: "UN request failed"
      }
    }
  }

  ethKeyIsValid(ethKey: any) {
    return ethKey.expiry >= Date.now();
  }

  async getChallengeSigned(unEndPoint: string) {
    // @ts-ignore
    const storageEthKeys = localStorage.getItem(this.config.localStorageEthKeyItemName);
    let ethKeys: any;
    if (storageEthKeys && storageEthKeys.length) {
      ethKeys = JSON.parse(storageEthKeys);
    } else {
      ethKeys = {};
    }
    try {
      let address = await this.connectMetamaskAndGetAddress();
      address = address.toLowerCase();
      let useEthKey: any;
      if (ethKeys && ethKeys[address] && !this.ethKeyIsValid(ethKeys[address])) {
        delete ethKeys[address];
      }
      if (ethKeys && ethKeys[address]) {
        useEthKey = ethKeys[address];
      } else {
        useEthKey = await this.signNewChallenge(unEndPoint);
        if (useEthKey) {
          ethKeys[useEthKey.address.toLowerCase()] = useEthKey;
          // @ts-ignore
          localStorage.setItem(this.config.localStorageEthKeyItemName, JSON.stringify(ethKeys));
        }
      }
      return useEthKey;
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  }

  async signNewChallenge(unEndPoint: string) {
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
