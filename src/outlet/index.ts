import {
  readMagicUrl
} from '../core';
import OutletService from "./outletService";
import { config } from './../config';

declare global {
  interface Window {
    Authenticator:any;
  }
}

function prop<T, K extends keyof T>(obj: T, key: K) { return obj[key]; };

interface Config { tokenName: any };

export class Outlet {
  constructor(tokenConfig: Config) {
    if(!window.Authenticator) throw new Error('Please ensure the authenticator exists.')
    const _config = prop(config, tokenConfig.tokenName);
    const outletService = new OutletService(_config, window.Authenticator);
    window.addEventListener('message', function(event) { outletService.eventReciever(event.data); }, false);
    const { tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName } = _config;
    readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
  }
};
