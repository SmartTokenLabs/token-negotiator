// @ts-nocheck
import {
  readMagicUrl
} from '../core';
import OutletService from "./outletService";
import { config } from './../config';

// The Outlet is a module used to read tokens from a query string
// and store them into a localstorage with given params.

export class Outlet {
  // @ts-ignore
  constructor({ tokenName }) {
    const outletService = new OutletService();
    window.addEventListener('message', function(event) { outletService.eventReciever(event.data); }, false);
    const { tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName } = config[tokenName];
    readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
  };
}


