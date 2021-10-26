// @ts-nocheck
import {
  readMagicUrl
} from '../core';
import OutletService from "./outletService";
import { config } from './../config';

// The Outlet is a module used to read tokens from a query string
// and store them into a localstorage with given params.

export class Outlet {
  // @ts-ignore
  constructor({ tokenName }) {
    const outletService = new OutletService(config[tokenName]);
    window.addEventListener('message', function(event) { outletService.eventReciever(event.data); }, false);
    const { tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName } = config[tokenName];
    readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
  };
}

  // getRawToken(unsignedToken:any) {
  //   if (!unsignedToken || !Object.keys(unsignedToken).length) return;
  //   let tokensOutput = this.readTokens();
  //   if (tokensOutput.success && !tokensOutput.noTokens) {
  //     let rawTokens = tokensOutput.tokens;
  //     let token:iToken = {};
  //     if (rawTokens.length) {
  //       rawTokens.forEach(tokenData => {
  //         if (tokenData.token) {
  //           let decodedToken = new this.tokenParser(this.base64ToUint8array(tokenData.token).buffer);
  //           if (decodedToken && decodedToken[this.unsignedTokenDataName]) {
  //             let decodedTokenData = decodedToken[this.unsignedTokenDataName];
  //             if (this.compareObjects(decodedTokenData, unsignedToken)) {
  //               token = tokenData;
  //             }
  //           }
  //         }
  //       })
  //     }
  //     return token;
  //   }
  // }

  // async signToken(unsignedToken) {
  //   // we receive decoded token, we have to find appropriate raw token
  //   // @ts-ignore
  //   // if (typeof window['Authenticator'] === "undefined") return { proof: null }; 
  //   if (!unsignedToken) return { proof: null }; 
  //   if (!data || !Object.keys(data).length) {
  //     window.parent.postMessage({ 
  //       iframeCommand: "useTokenData", 
  //       iframeData: { 
  //         useToken: {}, 
  //         message: 'Token data required', 
  //         success: false } 
  //       }, 
  //       referrer.origin
  //     );
  //     return;
  //   }
  //   let rawTokenData = this.getRawToken(data);
  //   let base64ticket = rawTokenData.token;
  //   let ticketSecret = rawTokenData.secret;
  //   // @ts-ignore
  //   // this.authenticator = new window['Authenticator'](this);
  //   this.authenticator = new Authenticator();
  //   let tokenObj:magicUrlTokenData = {
  //     ticketBlob: base64ticket,
  //     ticketSecret: ticketSecret,
  //     attestationOrigin: this.attestationOrigin,
  //   };
  //   if (rawTokenData && rawTokenData.id) tokenObj.email = rawTokenData.id;
  //   if (rawTokenData && rawTokenData.magic_link) tokenObj.magicLink = rawTokenData.magic_link;
  //   this.authenticator.getAuthenticationBlob(tokenObj,
  //     // TODO type it
  //     (res:any, error: string) => {
  //       logger(3,'sign result:', res);
  //         window.parent.postMessage({ iframeCommand: "useTokenData", iframeData: { useToken: res, message: error, success: !!res } }, referrer.origin);
  //     });
  // }