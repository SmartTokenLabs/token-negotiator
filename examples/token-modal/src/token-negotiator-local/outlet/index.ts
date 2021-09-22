import {
  readMagicUrl
} from '../core';
import OutletService from "./outletService";

// The Outlet is a module used to read tokens from a query string
// and store them into a localstorage with given params.

export class Outlet {
  // @ts-ignore
  constructor({ tokenUrlName, tokenSecretName, tokenIdName }) {
    const outletService = new OutletService();
    // assign incoming event requests
    window.addEventListener('message', function(event) { outletService.eventReciever(event.data); }, false);
    // read magic urls onload of page
    readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName);
  };
}


