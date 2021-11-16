// @ts-nocheck
// enscapsulates resources to use the negotiator service (outlet)

import {
  readTokens
} from '../core';

import { base64ToUint8array, compareObjects } from './../utils/index';

class OutletService {

  constructor(config, Authenticator) {
    if (config && Authenticator) {
      this.config = config;
      this.authenticator = new Authenticator();
    } else {
      console.warn('OutletService: Please provide the config and Authenticator to use this module service');
    }
  }

  // recieves events
  eventReciever = (data: any) => {
    switch (data.evt) {
      case 'getTokens':
        const tokens = readTokens(data.localStorageItemName);
        this.eventSender.emitTokens(tokens);
        break;
      case 'getTokenProof':
        this.rawTokenCheck(data.unsignedToken, this.config.localStorageItemName, this.config.tokenParser);
        break;
    }
  }

  // sends events
  eventSender = {
    emitTokens: (tokens: any) => {
      window.parent.postMessage({
        evt: 'setTokens',
        tokens: tokens
      }, document.referrer);
    },
    emitTokenProof: (tokenProof: any) => {
      window.parent.postMessage({
        evt: 'setTokenProof',
        tokenProof: tokenProof
      }, document.referrer);
    },
  }

  rawTokenCheck(unsignedToken, localStorageItemName, tokenParser) {
    let rawTokenData = this.getRawToken(unsignedToken, localStorageItemName, tokenParser);
    if (!rawTokenData) { return null };
    let base64ticket = rawTokenData.token;
    let ticketSecret = rawTokenData.secret;
    let tokenObj = {
      ticketBlob: base64ticket,
      ticketSecret: ticketSecret,
      attestationOrigin: this.config.attestationOrigin,
    };
    if (rawTokenData && rawTokenData.id) {
      tokenObj.email = rawTokenData.id;
    }
    if (rawTokenData && rawTokenData.magic_link) {
      tokenObj.magicLink = rawTokenData.magic_link;
    }
    this.authenticator.getAuthenticationBlob(tokenObj, () => {
      this.eventSender.emitTokenProof(tokenProof);
    });
  }

  getRawToken(unsignedToken, localStorageItemName, tokenParser) {
    if (!unsignedToken || !Object.keys(unsignedToken)) { throw new Error('Missing Params.'); }
    let rawTokens = readTokens(localStorageItemName);
    let token = {};
    if (rawTokens.length) {
      rawTokens.forEach(tokenData => {
        let decodedToken = new tokenParser(base64ToUint8array(tokenData).buffer);
        if (decodedToken && decodedToken[this.config.unsignedTokenDataName]) {
          let decodedTokenData = decodedToken[this.config.unsignedTokenDataName];
          const matchFound = compareObjects(decodedTokenData, unsignedToken);
          if (matchFound) {
            token = tokenData;
          }
        }
      });
      return token;
    } else {
      return null;
    }
  }
}

export default OutletService;
