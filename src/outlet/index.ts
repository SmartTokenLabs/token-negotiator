import { readMagicUrl, storeMagicURL } from '../core';
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
		
    let parentURL = document.referrer;
    
    if (opener && parentURL) {

      let pUrl = new URL(parentURL);

      let parentOrigin = pUrl.origin;

      var storageTokens = this.prepareTokenOutput( tokenName );

      opener.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] }  }, parentOrigin);

    }	

  }

}