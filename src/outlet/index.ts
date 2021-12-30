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

    requiredParams(tokenLookup[tokenName], "Please provide the token name");
    
    const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } = tokenLookup[tokenName];

    const tokens = readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey);

    storeMagicURL(tokens, itemStorageKey);
    
    // [{"token":"MIGWMA0MATYCBWE3ap3-AgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAOOZKRpcE6tLBuPbfE_SmwPk2wNjbj5vpa6kkD7eqQXvBOCa0WNo8dEHKvipeUGZZEWWjJKxooB44dEYdQO70Vgc","secret":"45845870684","id":"mah@mah.com","magic_link":"http://localhost:3002/?ticket=MIGWMA0MATYCBWE3ap3-AgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAOOZKRpcE6tLBuPbfE_SmwPk2wNjbj5vpa6kkD7eqQXvBOCa0WNo8dEHKvipeUGZZEWWjJKxooB44dEYdQO70Vgc&secret=45845870684&id=mah@mah.com"}]

    // Manualy add this and see if this works 
    // If so we can leave this in place etc
    // localStorage.setItem('test222', 'data from child');

  };

}

