// @ts-nocheck
// OutletService enscapsulates resources to use the negotiator service (outlet)
// - reads tokens from query string
// - provides tokens through an iframe

import {
  readTokens
} from '../core';
class OutletService {

  constructor() {};

  // recieves events
  eventReciever = (data: any) => {
    switch (data.evt) {
      case 'getTokens': 
        const tokens = readTokens(data.localStorageItemName);
        this.eventSender.emitTokens(tokens);
      break;
      case 'getTokenProof':
        const tokenProof = rawTokenCheck(data.unsignedToken);
        this.eventSender.emitTokens(tokenProof);
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
    emitTokens: (tokenProof: any) => {
      window.parent.postMessage({
        evt: 'setTokenProof',
        tokenProof: tokenProof
      }, "*");
    },
  
  }

}

export default OutletService;
