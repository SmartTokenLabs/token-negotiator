import { Item } from "../tokenLookup";
import { Outlet } from "./index";
export interface DevconToken {
    ticketBlob: string;
    ticketSecret: bigint;
    email?: string;
    magicLink?: string;
    attestationOrigin: string;
    attestationInTab?: boolean;
}
export declare class AuthHandler {
    private outlet;
    private evtid;
    private signedTokenBlob;
    private magicLink;
    private email;
    private signedTokenSecret;
    private attestationOrigin;
    private attestationInTab;
    private attestationTabHandler;
    private buttonOverlay;
    private tryingToGetAttestationInBackground;
    private iframe;
    private iframeWrap;
    private attestationBlob;
    private attestationSecret;
    private base64attestorPubKey;
    private base64senderPublicKeys;
    constructor(outlet: Outlet, evtid: any, tokenDef: Item, tokenObj: DevconToken | any, address: string, wallet: string);
    private openAttestationApp;
    authenticate(): Promise<unknown>;
    private createIframe;
    postMessageAttestationListener(event: MessageEvent, resolve: Function, reject: Function): Promise<void>;
}
