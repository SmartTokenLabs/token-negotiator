import { SignedDevconTicket } from './../Attestation/SignedDevonTicket';
import { ethers } from "ethers";

const debug = 1;

function logger(level:number, ...args: any){
  if (level > debug) return;
  console.log(...args);
}

interface tokenConfig {
  attestationOrigin?: string,
  tokenOrigin?: string,
  tokenUrlName?: string,
  tokenSecretName?: string,
  unsignedTokenDataName?: string,
  tokenIdName?: string,
  tokenParser?: any,
  localStorageItemName?: string,
  localStorageEthKeyItemName?: string,
}

interface constructorOptions {
  debug?: number,
  attestationOrigin?: string,
  tokenOrigin?: string,
  userPermissionRequired?: boolean
}

interface iToken {
  token?: string,
  secret?: string,
  magic_link?: string,
  id?: string,
}

interface negotiatedTokens {
  tokens: any[],
  noTokens: boolean,
  success: boolean,
  message?: string
}

interface magicUrlTokenData {
  ticketBlob: string,
  ticketSecret: string,
  attestationOrigin: string,
  email?: string,
  magicLink?: string,
}

interface ethKey {
  address?: string,
  success: boolean,
  message?: string,
  expiry?: number,
  domain?: string,
  randomness?: string,
  signature?: string,
  UN?: string
}

interface iQueuedCommand {
  parentCommand?: string,
  parentData?: any
}



declare global {
  interface Window {
    ethereum: any;
    detachEvent: any;
    attachEvent: any;
  }
}

const getTokenConfig = (tokenId:string) => {
  let XMLconfig:tokenConfig = {} as tokenConfig;
  // this will come from a lookup table at a later stage.
  if (tokenId === "devcon-ticket") {
    XMLconfig = {
      attestationOrigin: "https://stage.attestation.id",
      tokenOrigin: "https://devcontickets.herokuapp.com/outlet/",
      tokenUrlName: 'ticket',
      tokenSecretName: 'secret',
      unsignedTokenDataName: 'ticket',
      tokenIdName: 'id',
      tokenParser: SignedDevconTicket,
      localStorageItemName: 'dcTokens',
      localStorageEthKeyItemName: 'dcEthKeys',
    };
  } else {
    logger(1,"Negotiator: missing token script for this token");
  }
  return XMLconfig;
}

export class Negotiator {
  private userPermissionRequired: boolean;
  private userPermissionStatus: boolean;
  queuedCommand: iQueuedCommand;
  // TODO describe filter interface
  filter:any;

  tokenOrigin: string;

  debug = 0;
  hideTokensIframe = true;

  attestationOrigin: string;
  tokenUrlName: string;
  tokenSecretName: string;
  tokenIdName: string;
  unsignedTokenDataName: string;
  // TODO define parse type/class
  tokenParser: any;
  localStorageItemName: string;
  localStorageEthKeyItemName: string;
  // TODO define type
  addTokenIframe: any;
  iframe: any;

  isTokenOriginWebsite: boolean;

  authenticator: any;

  // TODO set callback type
  negotiateCallback: any;
  signCallback: any;
  tokenIframeWrap: any;

  useEthKey:ethKey;

  constructor(filter = {}, tokenId:string, options:constructorOptions = { userPermissionRequired: false }) {

    if (!tokenId) logger(1,"Negotiator: tokenId is a required parameter");

    // The XML config is used to define the token configuration.
    // This includes how the ticket will confirm its validity and the origin
    // of where the ticket was issued from.
    let XMLconfig = getTokenConfig(tokenId);
    // When True, the negotiator will require userPermissionStatus to be true to
    // read and provide tokens to client.
    this.userPermissionRequired = options.userPermissionRequired;
    // When userPermissionRequired is false, this flag defaults to true. Where
    // no permission (input from user) is required.
    this.userPermissionStatus = !!options.userPermissionRequired;
    // TODO annotate the usage of variables below.
    this.queuedCommand = {};
    this.filter = filter;
    //
    this.debug = 0;
    this.hideTokensIframe = true;
    this.tokenOrigin = XMLconfig.tokenOrigin;
    this.attestationOrigin = XMLconfig.attestationOrigin;
    this.tokenUrlName = XMLconfig.tokenUrlName;
    this.tokenSecretName = XMLconfig.tokenSecretName;
    this.tokenIdName = XMLconfig.tokenIdName;
    this.unsignedTokenDataName = XMLconfig.unsignedTokenDataName;
    this.tokenParser = XMLconfig.tokenParser;
    this.localStorageItemName = XMLconfig.localStorageItemName;
    this.localStorageEthKeyItemName = XMLconfig.localStorageEthKeyItemName;
    this.addTokenIframe = null;

    logger(2, options);

    if (options.hasOwnProperty('debug')) this.debug = options.debug;
    if (options.hasOwnProperty('attestationOrigin')) this.attestationOrigin = options.attestationOrigin;
    if (options.hasOwnProperty('tokenOrigin')) this.tokenOrigin = options.tokenOrigin;

    this.isTokenOriginWebsite = false;

    if (this.attestationOrigin) {
      // if attestationOrigin filled then token need attestaion
      let currentURL = new URL(window.location.href);
      let tokenOriginURL = new URL(this.tokenOrigin);

      if (currentURL.origin === tokenOriginURL.origin) {
        // its tokens website, where tokens saved in localStorage
        // lets get url params and save token data to the local storage
        this.isTokenOriginWebsite = true;
        this.readMagicUrl();
      }

      this.attachPostMessageListener((event:MessageEvent) => {
        if (event.origin !== tokenOriginURL.origin) {
          return;
        }
        if (event.data.iframeCommand && event.data.iframeCommand == "closeMe" && this.addTokenIframe) {
          this.addTokenIframe.remove();
          const tokenEvent = new Event('newTokenAdded');
          document.body.dispatchEvent(tokenEvent);
        }

      })

    }

    // do we inside iframe?
    if (window !== window.parent) {
      logger(3,'negotiator: its iframe, lets return tokens to the parent');

      // its iframe, listen for requests
      this.attachPostMessageListener(this.listenForParentMessages.bind(this))

      // send ready message to start interaction
      let referrer = new URL(document.referrer);
      window.parent.postMessage({ iframeCommand: "iframeReady", iframeData: '' }, referrer.origin);
    }

  }

  async connectMetamaskAndGetAddress() {

    if (!window.ethereum) {
      throw new Error('Please install metamask before.');
    }

    let userAddresses;
    try {
      // const userAddresses = await window.ethereum.request({ method: 'eth_accounts' });
      userAddresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (e) {
      throw new Error("Active Wallet required");
    }

    if (!userAddresses || !userAddresses.length) {
      throw new Error("Active Wallet required");
    }

    return userAddresses[0];
  }

  async signMessageWithBrowserWallet(message:string): Promise<string> {
    await this.connectMetamaskAndGetAddress();

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    return await signer.signMessage(message);
  }

  addTokenThroughIframe(magicLink:string) {
    logger(3,'createTokenIframe fired for : ' + magicLink);
    // open iframe and request tokens
    // this.attachPostMessageListener(this.listenForIframeMessages.bind(this));

    const iframe = document.createElement('iframe');
    this.addTokenIframe = iframe;
    iframe.src = magicLink;
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.opacity = '0';
    // let iframeWrap = document.createElement('div');
    // this.tokenIframeWrap = iframeWrap;
    // iframeWrap.setAttribute('style', 'width:100%; min-height: 100vh; position: fixed; align-items: center; justify-content: center; display: none; top: 0; left: 0; background: #fffa');
    // iframeWrap.appendChild(iframe);
    document.body.appendChild(iframe);
  }

  // Once a user has given or revoked their permission to use the token-negotiator
  setUserPermission(bool:boolean) {
    this.userPermissionStatus = bool;
  }

  getUserPermission(): boolean {
    return this.userPermissionStatus;
  }

  listenForParentMessages(event:MessageEvent) {

    // listen only parent
    let referrer = new URL(document.referrer);
    if (event.origin !== referrer.origin) {
      return;
    }

    logger(3,'iframe: event = ', event.data);

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

    logger(2,'iframe: command, data = ', command, data);

    switch (command) {
      case "signToken":

        logger(2, "signToken command fired with payload data:");
        logger(2, data);
        // we receive decoded token, we have to find appropriate raw token
        // @ts-ignore
        if (typeof window['Authenticator'] === "undefined") {
          logger(1,'Authenticator not defined.');
          return;
        }

        if (!data || !Object.keys(data).length) {
          window.parent.postMessage({ iframeCommand: "useTokenData", iframeData: { useToken: {}, message: 'Token data required', success: false } }, referrer.origin);
          return;
        }

        let rawTokenData = this.getRawToken(data);

        let base64ticket = rawTokenData.token;
        let ticketSecret = rawTokenData.secret;

        // @ts-ignore
        this.authenticator = new window['Authenticator'](this);

        let tokenObj:magicUrlTokenData = {
          ticketBlob: base64ticket,
          ticketSecret: ticketSecret,
          attestationOrigin: this.attestationOrigin,
        };
        if (rawTokenData && rawTokenData.id) tokenObj.email = rawTokenData.id;
        if (rawTokenData && rawTokenData.magic_link) tokenObj.magicLink = rawTokenData.magic_link;

        this.authenticator.getAuthenticationBlob(tokenObj,
          // TODO type it
          (res:any, error: string) => {
            logger(3,'sign result:', res);
              window.parent.postMessage({ iframeCommand: "useTokenData", iframeData: { useToken: res, message: error, success: !!res } }, referrer.origin);
          });
        break;
      case "tokensList":
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
      tokensOutput.tokens = this.filterTokens(decodedTokens);
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
      logger(3,'[negotiator]: its iframe, lets close it');

      // send ready message to start interaction
      let referrer = new URL(document.referrer);
      window.parent.postMessage({ iframeCommand: "closeMe" }, referrer.origin);
    }
  }

  /*
    * Return token objects satisfying the current negotiator's requirements
    */
  // TODO type it
  filterTokens(decodedTokens: any[], filter:any = {}) {
    if (Object.keys(filter).length == 0) {
      filter = this.filter;
    }
    // TODO type it
    let res: any[] = [];
    if (
      decodedTokens.length
      && typeof filter === "object"
      && Object.keys(filter).length
    ) {
      let filterKeys = Object.keys(filter);
      decodedTokens.forEach(token => {
        let fitFilter = 1;
        logger(2,'test token:', token);
        filterKeys.forEach(key => {
          if (token[key].toString() != filter[key].toString()) fitFilter = 0;
        })
        if (fitFilter) {
          res.push(token);
          logger(3,'token fits:', token);
        }
      })
      return res;
    } else {
      return decodedTokens;
    }
  }

  compareObjects(o1:any, o2:any) {
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
  readTokens(): negotiatedTokens {
    const storageTickets = localStorage.getItem(this.localStorageItemName);
    logger(2,'storageTickets',storageTickets);

    let tokens = [];
    let output:negotiatedTokens = { tokens: [], noTokens: true, success: true };
    try {
      if (storageTickets && storageTickets.length) {
        // Build new list of tickets from current and query ticket { ticket, secret }
        tokens = JSON.parse(storageTickets);
        if (tokens.length !== 0) {

          // output.tokens = tokens;
          tokens.forEach((item:iToken) => {
            if (item.token && item.secret) {
              output.tokens.push(item)
            }
          })
        }
        if (output.tokens.length) {
          output.noTokens = false;
        }
      }
    } catch (e) {
      logger(3,'Cant parse tokens in LocalStorage. Error:',e);

      // TODO check that code
      if (typeof this.negotiateCallback === "function") {
        output.success = false;
      }
    }
    return output;
  }

  private getRawToken(unsignedToken:any): iToken {
    if (!unsignedToken || !Object.keys(unsignedToken).length) {
      logger(1,"getRawToken require token data");
      return;
    }

    logger(3,'getRawToken for item: ',unsignedToken);

    let tokensOutput = this.readTokens();
    if (tokensOutput.success && !tokensOutput.noTokens) {
      let rawTokens = tokensOutput.tokens;

      let token:iToken = {};

      if (rawTokens.length) {
        rawTokens.forEach(tokenData => {
          if (tokenData.token) {

            let decodedToken = new this.tokenParser(this.base64ToUint8array(tokenData.token).buffer);
            if (decodedToken && decodedToken[this.unsignedTokenDataName]) {
              let decodedTokenData = decodedToken[this.unsignedTokenDataName];

              if (this.compareObjects(decodedTokenData, unsignedToken)) {
                token = tokenData;
              }

            }
          } else {
            logger(2,'empty token data received');
          }

        })
      }

      return token;
    }
  }

  removeTokenIframe(){
    logger(2, 'this.detachPostMessageListener(this.listenForIframeMessages)');
    this.detachPostMessageListener(this.listenForIframeMessages);
    // TODO remove iframeWraper
    this.tokenIframeWrap.remove();
  }

  listenForIframeMessages(event:MessageEvent) {

    let tokenOriginURL = new URL(this.tokenOrigin);

    // listen only tokenOriginURL
    if (event.origin !== tokenOriginURL.origin) {
      return;
    }

    logger(3,'listenForIframeMessages. event received in: ' + document.location);

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

    logger(2,'[' + document.location + '][command, data] = ', command, data);

    switch (command) {
      case "iframeWrap":
        if (data == "show") {
          this.tokenIframeWrap.style.display = 'block';
        } else if (data == "hide") {
          this.tokenIframeWrap.style.display = 'none';
        }
        break;
      case "tokensData":

        this.removeTokenIframe();

        if (data.success && !data.noTokens) {
          data.tokens = this.filterTokens(data.tokens);
        }
        this.negotiateCallback(data);
        break;

      case "useTokenData":

        this.removeTokenIframe();

        if (!this.signCallback) {
          logger(2, "signCallback not defined");
          return;
        }

        if (data.success) {
          this.signCallback(data);
        } else {
          this.signCallback(null, data.message);
        }

        this.signCallback = false;
        break;

      case "iframeReady":
        if (event && event.source) {
          // @ts-ignore
          event.source.postMessage(this.queuedCommand, event.origin);
          this.queuedCommand = {};
        }

        break;

      default:

    }
  }

  authenticate(input:{unsignedToken:any, unEndPoint:string}) {
    return new Promise(async (resolve, reject) => {
      // TODO type it
      await this._authenticate(input.unsignedToken, input.unEndPoint, (proof:any, error:any) => {
        if (!proof || !proof.useToken || !this.useEthKey) return reject(error);
        logger(1, "Auth signCallback received: ", proof, error);
        resolve({ proof, useEthKey: this.useEthKey, status: true });
      })
    })
  }


  async _authenticate(unsignedToken:any, unEndPoint:string, signCallback:any) {
    let useEthKey;
    if (!unsignedToken || !Object.keys(unsignedToken).length){
      signCallback(null, "Empty token received.");
      return;
    }
    if (!unEndPoint ){
      signCallback(null, "Empty UN endpoint received.");
      return;
    }
    try {
      useEthKey = await this.getChallengeSigned(unEndPoint);
      const validateResult = await this.validateUseEthKey(unEndPoint, useEthKey);
      let walletAddress = await this.connectMetamaskAndGetAddress();
      if (walletAddress.toLowerCase() !== validateResult.toLowerCase()) {
        throw new Error('useEthKey validation failed.');
      }
    } catch (e) {
      logger(1, "Sign challenge error.");
      logger(2, e);
      signCallback(null, "UN Challenge failed. Error: " + e.message);
      return;
    }

    this.useEthKey = useEthKey;

    this.signCallback = signCallback;
    // open iframe and request tokens
    logger(3, 'unsignedToken', unsignedToken);
    this.queuedCommand = { parentCommand: 'signToken', parentData: unsignedToken };
    logger(3, 'authenticate - createIframe fired');
    this.createIframe();
  }

  async validateUseEthKey(endPoint:string, data:ethKey){
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
      logger(1,e);
      return '';
    }
  }

  async getUnpredictableNumber(endPoint:string) {
    try {
      const response = await fetch(endPoint);
      const json = await response.json();
      json.success = true;
      return json;
    } catch (e) {
      logger(2,e);
      return {
        success: false,
        message: "UN request failed"
      }
    }
  }

  ethKeyIsValid(useEthKey: ethKey) {
    if (useEthKey.expiry < Date.now()) return false;
    return true;
  }

  async getChallengeSigned(unEndPoint:string) {

    const storageEthKeys = localStorage.getItem(this.localStorageEthKeyItemName);
    let ethKeys:any = {};

    if (storageEthKeys && storageEthKeys.length) {
      ethKeys = JSON.parse(storageEthKeys);
    }

    try {
      let address = await this.connectMetamaskAndGetAddress();
      logger(2, address);
      address = address.toLowerCase();

      let useEthKey:ethKey;

      if (ethKeys && ethKeys[address] && !this.ethKeyIsValid(ethKeys[address])) {
        logger(3, 'remove invalid useEthKey');
        delete ethKeys[address];
      }

      if (ethKeys && ethKeys[address]) {
        useEthKey = ethKeys[address];
      } else {
        useEthKey = await this.signNewChallenge(unEndPoint);

        logger(3,'new useEthKey received');
        logger(3,useEthKey);

        if (useEthKey) {
          ethKeys[useEthKey.address.toLowerCase()] = useEthKey;
          localStorage.setItem(this.localStorageEthKeyItemName, JSON.stringify(ethKeys));
        }
      }
      return useEthKey;

    } catch (e) {
      logger(2, e);
      throw new Error(e.message);
    }
  }

  async signNewChallenge(unEndPoint:string): Promise<ethKey> {
    let res = await this.getUnpredictableNumber(unEndPoint);

    logger(2, "signNewChallenge");
    logger(2,res);
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
      UN,
      success: true
    };
  }

  negotiate(): Promise<negotiatedTokens> {
    logger(2, "Negotiate() fired for: " + document.location);
    return new Promise((resolve, reject) => {
      this._negotiate((tokens:negotiatedTokens) => {
        logger(2, "Negotiate() result:");
        logger(2, tokens);
        if (!tokens) return reject({
          success: false,
          message: "error"
        })
        resolve(tokens);
      })
    })
  }

  _negotiate(callBack:any) {

    // if (this.userPermissionStatus === false) {
    //   logger(2, 'userPermissionStatus not allowed: ');
    //   return false;
    // }
    this.negotiateCallback = callBack;

    if (this.attestationOrigin) {
      logger(2, 'attestationOrigin: ' + this.attestationOrigin);

      if (window.location.href === this.tokenOrigin) {
        // just read an return tokens
        let tokensOutput = this.readTokens();
        if (tokensOutput.success && !tokensOutput.noTokens) {
          let decodedTokens = this.decodeTokens(tokensOutput.tokens);
          tokensOutput.tokens = this.filterTokens(decodedTokens);
          this.negotiateCallback(tokensOutput);
        }
      } else {
        this.queuedCommand = { parentCommand: 'tokensList', parentData: '' };
        logger(2, 'negotiate - createIframe fired');
        this.createIframe()
      }
    } else {
      logger(1, 'no attestationOrigin...');
      // TODO test token against blockchain and show tokens as usual view
    }
  }

  createIframe() {
    // open iframe and request tokens
    this.attachPostMessageListener(this.listenForIframeMessages.bind(this));

    const iframe = document.createElement('iframe');
    this.iframe = iframe;
    iframe.src = this.tokenOrigin;
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

  base64ToUint8array(base64str:string) {
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

  decodeTokens(rawTokens: iToken[]) {
    logger(2,'decodeTokens fired');
    logger(2,rawTokens);
    // TODO type it
    let decodedTokens: any[] = [];
    if (rawTokens.length) {
      rawTokens.forEach((tokenData:iToken) => {
        if (tokenData.token) {
          let decodedToken = new this.tokenParser(this.base64ToUint8array(tokenData.token).buffer);
          if (decodedToken && decodedToken[this.unsignedTokenDataName]) decodedTokens.push(decodedToken[this.unsignedTokenDataName]);
        } else {
          logger(1,'empty token data received');
        }

      })
    }
    return decodedTokens;
  }

  attachPostMessageListener(listener:EventListener) {
    if (window.addEventListener) {
      window.addEventListener("message", listener, false);
    } else {
      // IE8
      window.attachEvent("onmessage", listener);
    }
  }
  detachPostMessageListener(listener:EventListener) {
    if (window.addEventListener) {
      window.removeEventListener("message", listener, false);
    } else {
      // IE8
      window.detachEvent("onmessage", listener);
    }
  }
}
