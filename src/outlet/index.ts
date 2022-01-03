import { readMagicUrl, storeMagicURL, readTokens } from '../core';
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

  prepareTokenOutput ( tokenName:string ) {

    const storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);

    if(!storageTokens) return [];

    const decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);

    // FIXME: add filter
    const filteredTokens = filterTokens(decodedTokens, {});

    return filteredTokens;
    
  }

  sendTokens( tokenName:string ) {

    let opener = window.opener;
		
    let referrer = document.referrer;
    
    var storageTokens = this.prepareTokenOutput( tokenName );

    if (opener && referrer) {

      let pUrl = new URL(referrer);

      let parentOrigin = pUrl.origin;

      opener.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] }  }, parentOrigin);

    }	else {
      
      // Issue is that we dont know the filter for this.
      // use evt send and rec.
      window.parent.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] }  }, '*');
      
    }

  }

  // TODO re-implement for authenticator:
   
  // eventReciever = (data: any) => {
  //   switch (data.evt) {
  //     case 'getTokenProof':
  //       // TODO - if this can be done via the authenticator alone we can simplify this whole step and emit tokens on load
  //       // this.rawTokenCheck(data.unsignedToken, this.config.itemStorageKey, this.config.tokenParser);
  //     break;
  //   }
  // }

  // eventSender = {
  //   emitTokens: (tokens: any) => {
  //   emitTokenProof: (tokenProof: any) => {
  //     window.parent.postMessage({
  //       evt: 'tokenProof',
  //       tokenProof: tokenProof
  //     }, "*");
  //   },  
  // }

}