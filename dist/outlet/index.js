import { readMagicUrl } from '../core';
import OutletService from "./outletService";
export class Outlet {
    constructor({ tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName }) {
        const outletService = new OutletService();
        window.addEventListener('message', function (event) { outletService.eventReciever(event.data); }, false);
        readMagicUrl(tokenUrlName, tokenSecretName, tokenIdName, localStorageItemName);
    }
    ;
}
