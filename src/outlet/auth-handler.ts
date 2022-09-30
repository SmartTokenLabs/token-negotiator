// @ts-nocheck

import { ResponseActionBase } from "../core/messaging";
import { OutletAction } from "../client/messaging";
import {Outlet, OutletInterface} from "./index";
import { Authenticator } from "@tokenscript/attestation";
import { logger } from "../utils";
import {isBrave, isMacOrIOS} from "../utils/support/getBrowserData";

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
	
	w = Math.min(w, 800);

	// Fixes dual-screen position                             Most browsers      Firefox
	const dualScreenLeft = win.screenLeft !==  undefined ? win.screenLeft : win.screenX;
	const dualScreenTop = win.screenTop !==  undefined   ? win.screenTop  : win.screenY;

	const clientWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	const clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	let width = win.innerWidth ? win.innerWidth : clientWidth;
	let height = win.innerHeight ? win.innerHeight : clientHeight;

	const left = (width - w) / 2 + dualScreenLeft
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
	private tryingToGetAttestationInBackground = false;

	private iframe: HTMLIFrameElement | null = null;
	private iframeWrap: HTMLElement | null = null;

	private attestationBlob: string | null = null;
	private attestationSecret: bigint | null = null;

	private base64attestorPubKey: string | undefined;
	private base64senderPublicKeys: { [key: string]: string };

	private wrapperBase = "tn_attestation_open";
	private interval = null;
	private rejectHandler: Function;

	constructor(
		outlet?: Outlet,
		evtid?: any,
		private tokenDef: OutletInterface,
		private tokenObj: DevconToken | any,
		private address?: string,
		private wallet?: string,
		private redirectUrl?: false|string,
		private unsignedToken?: any
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

		this.attestationInTab = tokenObj.attestationInTab !== undefined ? tokenObj.attestationInTab : (isBrave() || isMacOrIOS());
	}

	openAttestationApp(){

		if (this.attestationInTab && !this.tryingToGetAttestationInBackground) {

			// TODO check if its an iframe, if TAB then no need to request to display 
			logger(2, "display new TAB to attest, ask parent to show current iframe");

			if (this.outlet)
				this.outlet.sendMessageResponse({
					evtid: this.evtid,
					evt: ResponseActionBase.SHOW_FRAME,
					max_width: "500px",
					min_height: "300px"
				});

			let button: HTMLDivElement;
			
			button = document.createElement("div");
			button.classList.add(this.wrapperBase + "_btn");
			button.innerHTML = "Click to get Email Attestation";

			button.addEventListener("click", ()=>{
				
				// let winParams = preparePopupCenter(800, 700);
				// this.attestationTabHandler = window.open(this.attestationOrigin,"Attestation",winParams); 
				
				this.attestationTabHandler = window.open(this.attestationOrigin, "Attestation");                  

				button.remove();

				let title = this.buttonOverlay.querySelector("." + this.wrapperBase + "_title");
				let subtitle = this.buttonOverlay.querySelector("." + this.wrapperBase + "_subtitle");
				if (title) {
					title.innerHTML = "Email Attestation verification in progress";
				}
				if (subtitle) {
					subtitle.innerHTML = "Please complete the verification process to continue";
				}

				this.interval = setInterval(()=>{
					if (this.attestationTabHandler.closed){
						console.log("child tab closed... ");
						clearInterval(this.interval);
						this.rejectHandler(new Error("User closed TAB"));
					}
					
				}, 2000);

				// this.buttonOverlay.remove();
			})
			
			let wrapperID = this.wrapperBase + "_wrap_" + Date.now();
			const styles = document.createElement("style");
			styles.innerHTML = `
				#${wrapperID} {
					width:100%;
					height: 100vh; 
					position: fixed; 
					align-items: center; 
					justify-content: center;
					display: flex;
					top: 0; 
					left: 0; 
					background: #000f;
					display: flex;
					flex-direction: column;
					padding: 30px;
				}
				#${wrapperID} div:hover {
					box-shadow: 0 0px 14px #ffff !important;
				}
				#${wrapperID} .${this.wrapperBase}_content {
					color: #fff; 
					text-align: center;
				}
				#${wrapperID} .${this.wrapperBase}_title {
					
				}
				
				#${wrapperID} .${this.wrapperBase}_subtitle {
					font-size:18px;
					color: #ccc;
				}
				#${wrapperID} .${this.wrapperBase}_btn {
					margin: 20px auto 0;
					padding: 5px 15px;
					background: #0219fa;
					font-weight: 700;
					font-size: 20px;
					line-height: 1.3;
					border-radius: 100px;
					color: #fff;
					cursor: pointer;
					display: block;
					text-align: center;
				}

				@media (max-width: 768px){
					#${wrapperID} {
						padding: 20px 10px;
					}
					#${wrapperID} .${this.wrapperBase}_title {
						font-size: 24px;
					}
					#${wrapperID} .${this.wrapperBase}_btn {
						padding: 10px 15px;
						font-size: 18px;
					}
				}
			`;

			this.buttonOverlay = document.createElement("div");
			this.buttonOverlay.id = wrapperID;
			this.buttonOverlay.innerHTML = `<h1 class="${this.wrapperBase}_content ${this.wrapperBase}_title">Needs email attestation to complete verification.</h1><p class="${this.wrapperBase}_content ${this.wrapperBase}_subtitle"></p>`;
			this.buttonOverlay.appendChild(button);
			this.buttonOverlay.appendChild(styles);
			document.body.appendChild(this.buttonOverlay);
			// button.click();
		
		} else {
			logger(2, "open attestation in iframe");
			this.createIframe();
		}
	}

	// TODO: combine functionality with messaging to enable tab support? Changes required in attestation.id code
	public authenticate() {
		return new Promise((resolve, reject) => {
			this.rejectHandler = reject;

			if (this.redirectUrl){

				const curParams = new URLSearchParams(document.location.hash.substring(1));

				const params = new URLSearchParams();
				params.set("action", OutletAction.EMAIL_ATTEST_CALLBACK);
				params.set("email", this.email);
				params.set("address", this.address);
				params.set("wallet", this.wallet);
				params.set("issuer", this.tokenDef.collectionID);
				params.set("token", JSON.stringify(this.unsignedToken));
				params.set("email-attestation-callback", this.redirectUrl);

				const requestor = curParams.get("requestor");

				if (requestor)
					params.set("requestor", requestor);

				const goto = `${this.attestationOrigin}#${params.toString()}`
				logger(2, "authenticate. go to: ", goto);

				document.location.href = goto;

				return;
			}

			// don't do it for brave, brave doesn't support access to indexDB through iframe
			if (this.attestationInTab && !isBrave()){
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

			this.openAttestationApp(reject);
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

	public async getUseToken(attestationBlob: any, attestationSecret: any) {

		try {
			if (!this.signedTokenSecret) {
				throw new Error("signedTokenSecret required");
			}
			if (!attestationSecret) {
				throw new Error("attestationSecret required");
			}
			if (!this.signedTokenBlob) {
				throw new Error("signedTokenBlob required");
			}
			if (!attestationBlob) {
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
				attestationSecret,
				this.signedTokenBlob,
				attestationBlob,
				this.base64attestorPubKey,
				this.base64senderPublicKeys
			);

			if (useToken) {
				logger(2,'this.authResultCallback( useToken ): ');
				return useToken;
			} else {
				console.log("this.authResultCallback( empty ): ");
				throw new Error("Empty useToken");
			}

			if (this.buttonOverlay)
				this.buttonOverlay.remove();

		} catch (e) {
			logger(2,`UseDevconTicket failed.`, e.message);
			logger(3, e);
			reject(new Error("Failed to create UseTicket. " + e.message));
			if (this.buttonOverlay)
				this.buttonOverlay.remove();
		}

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
					if (this.outlet)
						this.outlet.sendMessageResponse({
							evtid: this.evtid,
							evt: ResponseActionBase.SHOW_FRAME,
							// max_width: "700px",
							// min_height: "600px"
						});
				}
			} else {

				if (event.data.error){
					logger(2,"Error received from the iframe: " + event.data.error);
					reject(new Error(event.data.error));
					if (this.buttonOverlay)
						this.buttonOverlay.remove();
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
			// console.log("tab close disabled for now");
			this.attestationTabHandler.close();
		}  
		
		if (this.iframeWrap){
			this.iframeWrap.remove();
		}

		this.attestationBlob = event.data?.attestation;
		this.attestationSecret = event.data?.requestSecret;

		return getUseToken(this.attestationBlob, this.attestationSecret);

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
