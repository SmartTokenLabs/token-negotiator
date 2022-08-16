// @ts-nocheck

import { Item } from "../tokenLookup";
import { ResponseActionBase } from "../core/messaging";
import { Outlet } from "./index";
import { Authenticator } from "@tokenscript/attestation";
import { logger } from "../utils";
import { getBrowserData } from "../utils/support/getBrowserData";

export interface DevconToken {
	ticketBlob: string;
	ticketSecret: bigint;
	email?: string;
	magicLink?: string;
	attestationOrigin: string;
	attestationInTab?: boolean;
}

interface PostMessageData {
	force?: boolean;
	email?: string;
	magicLink?: string;
}

function preparePopupCenter(w, h) {
	let win = window;
	if (window.parent != window) {
		win = window.parent;
	} 
	
	let w = Math.min(w, 800);

	// Fixes dual-screen position                             Most browsers      Firefox
	const dualScreenLeft = win.screenLeft !==  undefined ? win.screenLeft : win.screenX;
	const dualScreenTop = win.screenTop !==  undefined   ? win.screenTop  : win.screenY;

	let width = win.innerWidth ? win.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	let height = win.innerHeight ? win.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	const systemZoom = width / win.screen.availWidth;
	// const left = (width - w) / 2 / systemZoom + dualScreenLeft
	const left = (width - w) / 2 + dualScreenLeft
	// const top = (height - h) / 2 / systemZoom + dualScreenTop
	const top = (height - h) / 2  + dualScreenTop

	return `
		toolbar=no, 
		location=no, 
		directories=no, 
		status=no, 
		menubar=no, 
		scrollbars=yes, 
		resizable=yes, 
		copyhistory=yes, 
		width=${w }, 
		height=${h },
		top=${top}, 
		left=${left}
	`;
	
}

export class AuthHandler {
	private outlet: Outlet;
	private evtid: any;

	private signedTokenBlob: string | undefined;
	private magicLink: string | undefined;
	private email: string | undefined;
	private signedTokenSecret: bigint | undefined;
	private attestationOrigin: string | undefined;

	private attestationInTab: boolean;
	private attestationTabHandler: any;
	private buttonOverlay: HTMLElement | null = null;
	private tryingToGetAttestationInBackground: boolean = false;

	private iframe: HTMLIFrameElement | null = null;
	private iframeWrap: HTMLElement | null = null;

	private attestationBlob: string | null = null;
	private attestationSecret: bigint | null = null;

	private base64attestorPubKey: string | undefined;
	private base64senderPublicKeys: { [key: string]: string };

	constructor(
		outlet: Outlet,
		evtid: any,
		tokenDef: Item,
		tokenObj: DevconToken | any,
		address: string, 
		wallet: string
	) {
		this.outlet = outlet;
		this.evtid = evtid;
		this.base64senderPublicKeys = tokenDef.base64senderPublicKeys;
		this.base64attestorPubKey = tokenDef.base64attestorPubKey;

		this.signedTokenBlob = tokenObj.ticketBlob;
		this.magicLink = tokenObj.magicLink;
		this.email = tokenObj.email;
		this.signedTokenSecret = tokenObj.ticketSecret;

		this.attestationOrigin = tokenObj.attestationOrigin;
		this.attestationInTab = tokenObj.attestationInTab;

		this.address = address;
		this.wallet = wallet;
	}

	private openAttestationApp(){
		if (this.attestationInTab && !this.tryingToGetAttestationInBackground) {
			// TODO check if its an iframe, if TAB then no need to request to display 
			logger(2, "display new TAB to attest, ask parent to show current iframe");
			
			this.outlet.sendMessageResponse({
				evtid: this.evtid,
				evt: ResponseActionBase.SHOW_FRAME,
			});

			let button; 
			if (getBrowserData().metaMaskAndroid) {
				button = document.createElement("a");
				button.setAttribute("href", this.attestationOrigin);
				button.setAttribute("target", "_blank");
			} else {
				button = document.createElement("div");
			}
			button.setAttribute(
				"style",
				`
					background: #000c;
					color: #fff;
					padding: 10px;
					border: 1px solid #fff2;
					border-radius: 4px;
					cursor: pointer;
					transition: box-shadow 0.3s;
					box-shadow: 0 0px 10px #fffc;
				`
			);
			button.innerHTML = "Click to get Email Attestation";

			button.addEventListener("click", ()=>{
				// this.attestationTabHandler = window.open(this.attestationOrigin, '_blank');
				
				let winParams = preparePopupCenter(800, 700);
				// this.attestationTabHandler = window.open(this.attestationOrigin,"Attestation",winParams); 
				if (!getBrowserData().metaMaskAndroid) {
					this.attestationTabHandler = window.open(this.attestationOrigin, "Attestation");            
				}           

				button.remove();
				this.buttonOverlay.remove();
			})
			const styles = document.createElement("style");
			styles.innerHTML = `
				#button_overlay div:hover {
					box-shadow: 0 0px 14px #ffff !important;
				}
			`;

			this.buttonOverlay = document.createElement("div");
			this.buttonOverlay.id = "button_overlay"
			this.buttonOverlay.setAttribute(
				"style",
				`
					width:100%;
					height: 100vh; 
					position: fixed; 
					align-items: center; 
					justify-content: center;
					display: flex;
					top: 0; 
					left: 0; 
					background: #000c
				`
			);
			this.buttonOverlay.appendChild(button);
			this.buttonOverlay.appendChild(styles);
			document.body.appendChild(this.buttonOverlay);
		
		} else {
			logger(2, "open attestation in iframe");
			this.createIframe();
		}
	}

	// TODO: combine functionality with messaging to enable tab support? Changes required in attestation.id code
	public authenticate() {
		return new Promise((resolve, reject) => {

			// dont do it for brawe, brawe doesnt support access to indexDB through iframe
			if (this.attestationInTab && !getBrowserData().brave){
				this.tryingToGetAttestationInBackground = true;
			}

			if (!this.attestationOrigin) return reject(new Error("Attestation origin is null"));

			window.addEventListener("message", (e) => {
				if (!this.attestationOrigin) return;

				let attestURL = new URL(this.attestationOrigin);

				if (e.origin !== attestURL.origin) {
					return;
				}

				if ((this.iframe && this.iframeWrap && this.iframe.contentWindow) || this.attestationTabHandler){
					this.postMessageAttestationListener(e, resolve, reject);
				}

			});

			this.openAttestationApp();
		});
	}

	private createIframe() {
		const iframe = document.createElement("iframe");
		iframe.setAttribute("allow", "clipboard-read");
		this.iframe = iframe;

		iframe.src = this.attestationOrigin ?? "";
		iframe.style.width = "800px";
		iframe.style.height = "700px";
		iframe.style.maxWidth = "100%";
		iframe.style.background = "#fff";

		let iframeWrap = document.createElement("div");
		this.iframeWrap = iframeWrap;
		iframeWrap.setAttribute(
			"style",
			"width:100%;min-height: 100vh; position: fixed; align-items: center; justify-content: center;display: none;top: 0; left: 0; background: #fffa"
		);
		iframeWrap.appendChild(iframe);

		document.body.appendChild(iframeWrap);
	}

	async postMessageAttestationListener(
		event: MessageEvent,
		resolve: Function,
		reject: Function
	) {
		logger(2,'postMessageAttestationListener event (auth-handler)', event.data);

		let attestationHandler = this.attestationTabHandler ? this.attestationTabHandler : this.iframe.contentWindow;
    
		if (typeof event.data.ready !== "undefined" && event.data.ready === true) {
			let sendData: PostMessageData = { force: false };

			if (this.email) sendData.email = this.email;
			if (this.wallet) sendData.wallet = this.wallet;
			if (this.address) sendData.address = this.address;

			attestationHandler.postMessage(sendData, this.attestationOrigin);
			return;
		}

		if (typeof event.data.display !== "undefined") {
			// force display/hide iframe/tab

			if (event.data.display === true) {
				
				// display works for iframe only
				if (this.iframeWrap) {
					
					if (this.tryingToGetAttestationInBackground){

						// doesnt have ready attestation, 
						// lets open attestation in the new tab
						this.tryingToGetAttestationInBackground = false;
						this.iframe.remove();
						this.iframeWrap.remove();
						this.openAttestationApp();
						return;
					} 
					
					this.iframeWrap.style.display = "flex";
				
					// ask parent to show this iframe
					this.outlet.sendMessageResponse({
						evtid: this.evtid,
						evt: ResponseActionBase.SHOW_FRAME,
					});
				}
			} else {

				if (event.data.error){
					logger(2,"Error received from the iframe: " + event.data.error);
					reject(new Error(event.data.error));
				}

				// display works for iframe only
				if (this.iframeWrap) {
					this.iframeWrap.style.display = "none";
				} 
			}
		}

		if (!event.data?.attestation || !event.data?.requestSecret) {
			return;
		}

		if (this.attestationTabHandler) {
			this.attestationTabHandler.close();
		}  
		
		if (this.iframeWrap){
			this.iframeWrap.remove();
		}

		

		this.attestationBlob = event.data?.attestation;
		this.attestationSecret = event.data?.requestSecret;

		try {
			if (!this.signedTokenSecret) {
				throw new Error("signedTokenSecret required");
			}
			if (!this.attestationSecret) {
				throw new Error("attestationSecret required");
			}
			if (!this.signedTokenBlob) {
				throw new Error("signedTokenBlob required");
			}
			if (!this.attestationBlob) {
				throw new Error("attestationBlob required");
			}
			if (!this.base64attestorPubKey) {
				throw new Error("base64attestorPubKey required");
			}
			if (!this.base64senderPublicKeys) {
				throw new Error("base64senderPublicKeys required");
			}

			let useToken = await Authenticator.getUseTicket(
				this.signedTokenSecret,
				this.attestationSecret,
				this.signedTokenBlob,
				this.attestationBlob,
				this.base64attestorPubKey,
				this.base64senderPublicKeys
			);

			if (useToken) {
				logger(2,'this.authResultCallback( useToken ): ');
				resolve(useToken);
			} else {
				console.log("this.authResultCallback( empty ): ");
				throw new Error("Empty useToken");
			}
		} catch (e) {
			logger(2,`UseDevconTicket failed.`, e.message);
			logger(3, e);
			reject(new Error("Failed to create UseTicket. " + e.message));
		}
		// construct UseDevconTicket, see
		// https://github.com/TokenScript/attestation/blob/main/data-modules/src/UseDevconTicket.asd

		// TODO we dont have ready UseDevconTicket constructor yet
		// let useDevconTicket = new UseDevconTicket({
		//     signedDevconTicket: signedDevonTicket,
		//     identifierAttestation: identifierAttestation,
		//     proof: proof
		// })
		// // Serialise it (for use as a transaction parameter) and return it
		// return useDevconTicket.serialize();
	}
}
