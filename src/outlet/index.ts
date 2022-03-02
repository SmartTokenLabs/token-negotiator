import { readMagicUrl, storeMagicURL, rawTokenCheck } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';
import { MessageAction } from '../client/messaging';

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

    console.log("Outlet response for event ID " + evtid + " action " + action);
    // Outlet Page OnLoad Event Handler

    switch (action) {

      case MessageAction.GET_ISSUER_TOKENS:

          let issuerTokens = this.prepareTokenOutput(this.tokenName, this.getFilter());

          this.eventSender.emitIframeIssuerTokensActive(evtid, issuerTokens);

        break;

      /*case 'get-tab-issuer-tokens':

        // @ts-ignore
        const { storageTokens, parentOrigin } = this.getTabIssuerTokens(this.tokenName, this.getFilter());

        if(window.opener && storageTokens && parentOrigin) {

          this.eventSender.emitTabIssuerTokensActive(evtid, window.opener, storageTokens, parentOrigin);

        }

        break;*/

      case MessageAction.GET_PROOF:

        const token = this.getDataFromQuery('token');

        requiredParams(token, "unsigned token is missing");

        const isTabOrIframe = this.getDataFromQuery('type');

        this.sendTokenProof(token, isTabOrIframe);

        break;

      case MessageAction.COOKIE_CHECK:

        this.eventSender.emitCookieSupport(evtid);

        break;

      default:

        // store local storage item that can be later used to check if third party cookies are allowed.
        // Note: This test can only be performed when the localstorage / cookie is assigned, then later requested.
        localStorage.setItem('cookie-support-check', 'test');

        const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = this.tokenIssuer;

        const tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);

        if(tokens && tokens.length) storeMagicURL(tokens, itemStorageKey);

        // @ts-ignore
        let { storageTokens, parentOrigin } = this.getTabIssuerTokens(this.tokenName, this.getFilter());

        if(window.opener && storageTokens && parentOrigin) {

          this.eventSender.emitTabIssuerTokensPassive(evtid, window.opener, storageTokens, parentOrigin);

        }

        break;

    }

  }

  prepareTokenOutput ( tokenName:string, filter: any ) {

    const storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);

    if(!storageTokens) return [];

    const decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);

    const filteredTokens = filterTokens(decodedTokens, filter);

    return filteredTokens;

  }

  sendTokenProof ( token: any, type:any) {

    if(!token) return 'error';

    const unsignedToken = JSON.parse(token);

    rawTokenCheck(unsignedToken, this.tokenIssuer).then((tokenObj) => {

      //@ts-ignore
      window.authenticator.getAuthenticationBlob(tokenObj, (tokenProof) => {

        if(type === 'iframe') this.eventSender.emitTokenProofIframe(tokenProof);
        else this.eventSender.emitTokenProofTab(tokenProof);

      });

    });

  }

  getTabIssuerTokens ( tokenName:string, filter:any ) {

    let opener = window.opener;

    let referrer = document.referrer;

    if (opener && referrer) {

      let pUrl = new URL(referrer);

      let parentOrigin = pUrl.origin;

      var storageTokens = this.prepareTokenOutput( tokenName, filter );

      return { storageTokens, parentOrigin };

    } else {

      return { storageTokens: null, parentOrigin: null };

    }

  }

  eventSender = {

    emitCookieSupport: (evtid: any) => {

      window.parent.postMessage({
        evtid: evtid,
        evt: "cookie-support-check",
        thirdPartyCookies: localStorage.getItem('cookie-support-check')
      }, document.referrer);

    },
    emitTabIssuerTokensPassive: (evtid: any, opener: any, storageTokens: any, parentOrigin: any) => {

      opener.postMessage({
            evtid: evtid,
            evt: "set-tab-issuer-tokens-passive",
            issuer: this.tokenName,
            tokens: storageTokens
          },
          parentOrigin);

      // let referrer = document.referrer;

      // if (opener && referrer) {

      //   let pUrl = new URL(referrer);

      //   let parentOrigin = pUrl.origin;

      //   opener.postMessage({ evt: "set-tab-issuer-tokens-passive", tokens: storageTokens, issuer: this.tokenName }, parentOrigin);

      // }

    },
    emitTabIssuerTokensActive: (evtid: any, opener: any, storageTokens: any, parentOrigin: any) => {

      let target, origin;

      if (window.parent) {
        target = window.parent;
        origin = document.referrer;
      } else {
        let pUrl = new URL(document.referrer);
        origin = pUrl.origin;
      }

      target.postMessage({
        evtid: evtid,
        evt: "set-iframe-issuer-tokens-active",
        issuer: this.tokenName,
        tokens: storageTokens
      }, origin);

      // let referrer = document.referrer;

      // if (opener && referrer) {

      //   let pUrl = new URL(referrer);

      //   let parentOrigin = pUrl.origin;

      //   opener.postMessage({ evt: "set-tab-issuer-tokens-active", tokens: storageTokens, issuer: this.tokenName }, parentOrigin);

      // }

    },
    emitIframeIssuerTokensPassive: (evtid: any, tokens: any) => {

      let target, origin;

      if (window.parent) {
        target = window.parent;
        origin = document.referrer;
      } else {
        let pUrl = new URL(document.referrer);
        origin = pUrl.origin;
      }

      target.postMessage({
        evtid: evtid,
        evt: "set-iframe-issuer-tokens-active",
        issuer: this.tokenName,
        tokens: tokens
      }, origin);

    },
    emitIframeIssuerTokensActive: (evtid: any, tokens: any) => {

      let target, origin;

      if (window.parent) {
        target = window.parent;
        origin = document.referrer;
      } else {
        let pUrl = new URL(document.referrer);
        origin = pUrl.origin;
      }

      target.postMessage({
        evtid: evtid,
        evt: "set-iframe-issuer-tokens-active",
        issuer: this.tokenName,
        tokens: tokens
      }, origin);

    },
    emitTokenProofIframe: (tokenProof: any) => {

      window.parent.postMessage({
        evt: 'proof-iframe',
        proof: JSON.stringify(tokenProof),
        issuer: this.tokenName
      }, document.referrer);

    },
    emitTokenProofTab: (tokenProof: any) => {

      let opener = window.opener;

      let referrer = document.referrer;

      if (opener && referrer) {

        let pUrl = new URL(referrer);

        let parentOrigin = pUrl.origin;

        opener.postMessage({ evt: "proof-tab", proof: tokenProof, issuer: this.tokenName }, parentOrigin);

      }

    }

  }

}