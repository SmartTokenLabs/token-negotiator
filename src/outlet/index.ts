import {rawTokenCheck, readMagicUrl, storeMagicURL} from '../core';
import {requiredParams} from '../utils/index';
import {tokenLookup} from './../tokenLookup';
import {decodeTokens, filterTokens} from './../core/index';
import { MessageAction, MessageResponseInterface, MessageResponseAction } from '../client/messaging';

interface OutletInterface {
  tokenName: string;
}

declare global {
  interface Window {
    Authenticator: any;
  }
}

export class Outlet {

  authenticator: any;
  config: any;
  tokenName: any;
  tokenIssuer: any;

  constructor(config: OutletInterface) {

    const { tokenName } = config;

    this.tokenName = tokenName;
    this.tokenIssuer = tokenLookup[tokenName];

    requiredParams(tokenLookup[tokenName], "Please provide the token name when installing token outlet");

    this.pageOnLoadEventHandler();

  };

  getDataFromQuery ( itemKey:any ) {
    const urlParams = new URLSearchParams(window.location.search);
    const item = urlParams.get(itemKey);
    return item ? item : undefined;
  }

  getFilter(){
    const filter = this.getDataFromQuery('filter');
    return filter ? JSON.parse(filter) : {};
  }

  pageOnLoadEventHandler () {

    const evtid = this.getDataFromQuery('evtid');
    const action = this.getDataFromQuery('action');

    if (!document.referrer)
      return;

    console.log("Outlet received event ID " + evtid + " action " + action);
    // Outlet Page OnLoad Event Handler

    // TODO: should issuer be validated against requested issuer?

    switch (action) {

      case MessageAction.GET_ISSUER_TOKENS:

        this.sendTokens(evtid);

        break;

      case MessageAction.GET_PROOF:

        const token = this.getDataFromQuery('token');

        requiredParams(token, "unsigned token is missing");

        this.sendTokenProof(evtid, token);

        break;

      case MessageAction.COOKIE_CHECK:

        this.sendMessageResponse({
          evtid: evtid,
          evt: MessageResponseAction.COOKIE_CHECK,
          thirdPartyCookies: localStorage.getItem('cookie-support-check')
        })

        break;

      default:

        // store local storage item that can be later used to check if third party cookies are allowed.
        // Note: This test can only be performed when the localstorage / cookie is assigned, then later requested.
        localStorage.setItem('cookie-support-check', 'test');

        const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = this.tokenIssuer;

        const tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);

        if(tokens && tokens.length) storeMagicURL(tokens, itemStorageKey);

        this.sendTokens(evtid);

        break;

    }

  }

  prepareTokenOutput ( tokenName:string, filter: any ) {

    const storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);

    if(!storageTokens) return [];

    const decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);

    return filterTokens(decodedTokens, filter);

  }

  sendTokenProof (evtid:any, token: any) {

    if(!token) return 'error';

    const unsignedToken = JSON.parse(token);

    rawTokenCheck(unsignedToken, this.tokenIssuer).then((tokenObj) => {

      //@ts-ignore
      window.authenticator.getAuthenticationBlob(tokenObj, (tokenProof) => {

        this.sendMessageResponse({
          evtid: evtid,
          evt: MessageResponseAction.PROOF,
          issuer: this.tokenName,
          proof: JSON.stringify(tokenProof)
        });

      });

    });

  }

  private sendTokens(evtid: any){

    let issuerTokens = this.prepareTokenOutput(this.tokenName, this.getFilter());

    this.sendMessageResponse({
      evtid: evtid,
      evt: MessageResponseAction.ISSUER_TOKENS,
      issuer: this.tokenName,
      tokens: issuerTokens
    });
  }

  private sendMessageResponse(response:MessageResponseInterface){

    let target, origin;

    if (!window.opener) {
      target = window.parent;
    } else {
      target = window.opener;
    }

    let pUrl = new URL(document.referrer);
    origin = pUrl.origin;

    if (target)
      target.postMessage(response, origin);
  }

}