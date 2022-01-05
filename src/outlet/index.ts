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
  tokenIssuer: any;

  constructor(config: OutletInterface) {

    const { tokenName } = config;

    this.tokenName = tokenName;
    this.tokenIssuer = tokenLookup[tokenName];

    requiredParams(tokenLookup[tokenName], "Please provide the token name when installing token outlet");
    
    const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = this.tokenIssuer;

    const tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);

    if(tokens && tokens.length) {

      storeMagicURL(tokens, itemStorageKey);
    
    }

    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');

    if(action === 'get-tokens') {

      this.sendTokens(tokenName);

    } else if (action === 'get-token-proof') {

      const token = urlParams.get('token');

      requiredParams(token, "unsigned token is missing");

      this.sendTokenProof(token);

    } else {

      requiredParams(null, "Please provide an action");

    }

    // TODO - create a condition / check that determines if this is accepted.
    // for third party cookies / cross origin communication
    window.addEventListener('message', (event) => { this.eventReciever(event); }, false);
    
  };

  prepareTokenOutput ( tokenName:string, filter: any ) {

    const storageTokens = localStorage.getItem(tokenLookup[tokenName].itemStorageKey);

    if(!storageTokens) return [];

    const decodedTokens = decodeTokens(storageTokens, tokenLookup[tokenName].tokenParser, tokenLookup[tokenName].unsignedTokenDataName);

    const filteredTokens = filterTokens(decodedTokens, filter);

    return filteredTokens;
    
  }

  sendTokenProof ( token: any ) {

    if(!token) return 'error';

    const unsignedToken = JSON.parse(token);

    rawTokenCheck(unsignedToken, this.tokenIssuer).then((tokenObj) => {

      let opener = window.opener;
		
      let referrer = document.referrer;
      
      if (opener && referrer) {

        let pUrl = new URL(referrer);

        let parentOrigin = pUrl.origin;

        //@ts-ignore
        window.authenticator.getAuthenticationBlob(tokenObj, (tokenProof) => {
        
          opener.postMessage({ evt: "proof", data: { proof: tokenProof, issuer: this.tokenName }  }, parentOrigin);

        });

      }	
          
    });     

  }
 
  sendTokens( tokenName:string ) {

    let opener = window.opener;
		
    let referrer = document.referrer;
    
    if (opener && referrer) {

      let pUrl = new URL(referrer);

      let parentOrigin = pUrl.origin;

      const urlParams = new URLSearchParams(window.location.search);
      
      const findFilter = urlParams.get('filter');

      const filter = findFilter ? JSON.parse(findFilter) : {};

      var storageTokens = this.prepareTokenOutput( tokenName, filter );

      opener.postMessage({ evt: "tokens", data: { issuer: this.tokenName, tokens: storageTokens || [] }  }, parentOrigin);

    }	

  }

  eventReciever = (event: any) => {
    switch (event.data.evt) {
      case 'getTokens': 
        const filter = event.data?.data?.filter;
        var storageTokens = this.prepareTokenOutput( this.tokenName, filter );
        this.eventSender.emitTokens(storageTokens);
      break;
      case 'getTokenProof':
        const unsignedToken = JSON.parse(JSON.stringify(event.data.data.unsignedToken));
        rawTokenCheck(unsignedToken, this.tokenIssuer).then((tokenProof) => {
          this.eventSender.emitTokenProof(tokenProof);
        });        
      break;
    }
  }

  // TODO Pipe all event management through here.
  // determining which type of PostMessage should be utilised.
  eventSender = {
    emitTokens: (tokens: any) => {
      window.parent.postMessage({ 
        evt: "tokens",
        data: { issuer: this.tokenName, tokens: tokens }  
      }, document.referrer);
    },
    emitTokenProof: (tokenProof: any) => {
      window.parent.postMessage({
        evt: 'proof',
        data: { tokenProof: JSON.stringify(tokenProof) }
      }, document.referrer);
    },  
  }

}