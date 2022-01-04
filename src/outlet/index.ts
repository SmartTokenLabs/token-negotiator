import { readMagicUrl, storeMagicURL, rawTokenCheck } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';
import { decodeTokens, filterTokens } from './../core/index';

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

  constructor(config: OutletInterface) {

    const { tokenName } = config;

    // @ts-ignore
    this.tokenName = tokenName;

    requiredParams(tokenLookup[tokenName], "Please provide the token name");
    
    const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = tokenLookup[tokenName];

    const tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);

    if(tokens && tokens.length) {

      storeMagicURL(tokens, itemStorageKey);
    
    }

    this.sendTokens(tokenName);
    
  };

  prepareTokenOutput ( tokenName:string, filter:any ) {

    const storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);

    if(!storageTokens) return [];

    const decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);

    const filteredTokens = filterTokens(decodedTokens, filter);

    return filteredTokens;
    
  }
 
  sendTokens( tokenName:string ) {

    let opener = window.opener;
		
    let referrer = document.referrer;
    
    // TODO apply filter to this design flow:
    if (opener && referrer) {

      let pUrl = new URL(referrer);

      let parentOrigin = pUrl.origin;

      var storageTokens = this.prepareTokenOutput( tokenName, {} );

      opener.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] }  }, parentOrigin);

    }	else {
      
      window.addEventListener('message', (event) => { this.eventReciever(event.data); }, false);
      
    }

  }

  eventReciever = (data: any) => {
    switch (data.evt) {
      case 'getTokens': 
        const filter = data?.data?.filter;
        var storageTokens = this.prepareTokenOutput( this.tokenName, filter );
        this.eventSender.emitTokens(storageTokens);
      break;
      case 'getTokenProof':
        rawTokenCheck(data.unsignedToken, this.config.itemStorageKey);
      break;
    }
  }

  eventSender = {
    emitTokens: (tokens: any) => {
      window.parent.postMessage({ 
        evt: "tokens",
        data: { issuer: this.tokenName, tokens: tokens }  
      }, "*");
    },
    emitTokenProof: (tokenProof: any) => {
      window.parent.postMessage({
        evt: 'tokenProof',
        tokenProof: tokenProof
      }, "*");
    },  
  }

}