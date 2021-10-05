// @ts-nocheck
import {
  readMagicUrl
} from '../core';
import OutletService from "./outletService";

// The Outlet is a module used to read tokens from a query string
// and store them into a localstorage with given params.

export class Outlet {
  // @ts-ignore
  constructor({ tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName }) {
    const outletService = new OutletService();
    window.addEventListener('message', function(event) { outletService.eventReciever(event.data); }, false);
    readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
  };
}


