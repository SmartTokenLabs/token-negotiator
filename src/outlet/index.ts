import { readMagicUrl, storeMagicURL } from '../core';
import { requiredParams } from '../utils/index';
import { tokenLookup } from './../tokenLookup';

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

  constructor(config: OutletInterface) {

    const { tokenName } = config;

    requiredParams(!(tokenLookup[tokenName]), "Please provide the token name");
    
    const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = tokenLookup[tokenName];

    const tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);

    storeMagicURL(tokens, itemStorageKey);

  };

}

