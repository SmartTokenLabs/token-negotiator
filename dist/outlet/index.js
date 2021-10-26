import { readMagicUrl } from '../core';
import OutletService from "./outletService";
import { config } from './../config';
export class Outlet {
    constructor({ tokenName }) {
        const outletService = new OutletService(config[tokenName]);
        window.addEventListener('message', function (event) { outletService.eventReciever(event.data); }, false);
        const { tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName } = config[tokenName];
        readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
    }
    ;
}
