// @ts-nocheck
// OutletService enscapsulates resources to use the negotiator service (outlet)
// - reads tokens from query string
// - provides tokens through an iframe
import { Authenticator } from "./../authenticator/dist/authenticator";

import {
  readTokens
} from '../core';

import { base64ToUint8array, compareObjects } from './../utils/index';
class OutletService {

  constructor(config) {
    this.config = config;
  };

  // recieves events
  eventReciever = (data: any) => {
    switch (data.evt) {
      case 'getTokens': 
        const tokens = readTokens(data.localStorageItemName);
        this.eventSender.emitTokens(tokens);
      break;
      case 'getTokenProof':
        const tokenProof = this.rawTokenCheck(data.unsignedToken, this.config.localStorageItemName, this.config.tokenParser);
        this.eventSender.emitTokenProof(tokenProof);
      break;
    }
  }

  // sends events
  eventSender = {
    emitTokens: (tokens: any) => {
      window.parent.postMessage({
        evt: 'setTokens',
        tokens: tokens
      }, "*");
    },
    emitTokenProof: (tokenProof: any) => {
      window.parent.postMessage({
        evt: 'setTokenProof',
        tokenProof: tokenProof
      }, "*");
    },
  
  }

  rawTokenCheck(unsignedToken, localStorageItemName, tokenParser) {
    // need to be able to install this module:
    // this.authenticator = new Authenticator();
    let rawTokenData = this.getRawToken(unsignedToken, localStorageItemName, tokenParser);
    let base64ticket = rawTokenData.token;
    let ticketSecret = rawTokenData.secret;
    let tokenObj = {
        ticketBlob: base64ticket,
        ticketSecret: ticketSecret,
        attestationOrigin: this.config.attestationOrigin,
    };
    if (rawTokenData && rawTokenData.id)
        tokenObj.email = rawTokenData.id;
    if (rawTokenData && rawTokenData.magic_link)
        tokenObj.magicLink = rawTokenData.magic_link;
    // const output = getAuthenticationBlob(tokenObj);
    return true;
  }

  getRawToken(unsignedToken, localStorageItemName, tokenParser) {
    if (!unsignedToken || !Object.keys(unsignedToken).length) return;
        let tokensOutput = readTokens(localStorageItemName);
        if (tokensOutput.success && !tokensOutput.noTokens) {
            let rawTokens = tokensOutput.tokens;
            let token = {};
            if (rawTokens.length) {
                rawTokens.forEach(tokenData => {
                    if (tokenData.token) {
                        let decodedToken = new tokenParser(base64ToUint8array(tokenData.token).buffer);
                        if (decodedToken && decodedToken[this.config.unsignedTokenDataName]) {
                            let decodedTokenData = decodedToken[this.config.unsignedTokenDataName];
                            if (compareObjects(decodedTokenData, unsignedToken)) token = tokenData;
                        }
                    }
                });
            }
            return token;
        }
        else {
            return null;
        }
  }

}

export default OutletService;
