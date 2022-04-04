import {rawTokenCheck, readMagicUrl, storeMagicURL} from '../core';
import {requiredParams} from '../utils/index';
import {decodeTokens, filterTokens} from './../core/index';
import { MessageAction, MessageResponseInterface, MessageResponseAction } from '../client/messaging';
import {AuthHandler} from "./auth-handler";

interface OutletInterface {
  config: any;
}

export class Outlet {

  tokenConfig: any;
  urlParams?: URLSearchParams;

  constructor(config: OutletInterface) {

    this.tokenConfig = config;

    this.pageOnLoadEventHandler();

  };

  getDataFromQuery ( itemKey:any ) {
    return this.urlParams ? this.urlParams.get(itemKey) : undefined;
  }

  getFilter(){
    const filter = this.getDataFromQuery('filter');
    return filter ? JSON.parse(filter) : {};
  }

  pageOnLoadEventHandler () {

    let params = window.location.hash.length > 1 ? "?"+window.location.hash.substring(1) : window.location.search;
    this.urlParams = new URLSearchParams(params);

    const evtid = this.getDataFromQuery('evtid');
    const action = this.getDataFromQuery('action');

    if (!document.referrer && !this.getDataFromQuery('DEBUG'))
      return;

    console.log("Outlet received event ID " + evtid + " action " + action);
    // Outlet Page OnLoad Event Handler

    // store local storage item that can be later used to check if third party cookies are allowed.
    // Note: This test can only be performed when the localstorage / cookie is assigned, then later requested.
    localStorage.setItem('cookie-support-check', 'test');

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

        const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = this.tokenConfig;

        try {
            const tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey, this.urlParams);

            storeMagicURL(tokens, itemStorageKey);

            this.sendTokens(evtid);

        } catch (e:any) {
            this.sendErrorResponse(evtid, e.message);
        }

        break;

    }

  }

  prepareTokenOutput ( filter: any ) {

    const storageTokens = localStorage.getItem(this.tokenConfig.itemStorageKey);

    if(!storageTokens) return [];

    const decodedTokens = decodeTokens(storageTokens, this.tokenConfig.tokenParser, this.tokenConfig.unsignedTokenDataName);

    return filterTokens(decodedTokens, filter);

  }

  async sendTokenProof (evtid:any, token: any) {

    if(!token) return 'error';

    const unsignedToken = JSON.parse(token);

    try {
          // check if token issuer
          let tokenObj = await rawTokenCheck(unsignedToken, this.tokenConfig);

          let authHandler = new AuthHandler(this, evtid, this.tokenConfig, tokenObj);

          let tokenProof = await authHandler.authenticate();

          this.sendMessageResponse({
            evtid: evtid,
            evt: MessageResponseAction.PROOF,
            issuer: this.tokenConfig.tokenName,
            proof: tokenProof
          });

    } catch (e:any){
        console.log("Error getting proof:");
        console.log(e);

        // TODO: We shouldn't be sending the full exception here, instead return error messages only.
        this.sendErrorResponse(evtid, e);
    }

  }

  private sendTokens(evtid: any){

    let issuerTokens = this.prepareTokenOutput(this.getFilter());

    this.sendMessageResponse({
      evtid: evtid,
      evt: MessageResponseAction.ISSUER_TOKENS,
      issuer: this.tokenConfig.tokenName,
      tokens: issuerTokens
    });
  }

  public sendErrorResponse(evtid: any, error:string){
    this.sendMessageResponse({
      evtid: evtid,
      evt: MessageResponseAction.ERROR,
      errors: [error]
    });
  }

  public sendMessageResponse(response:MessageResponseInterface){

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