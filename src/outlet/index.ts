import { rawTokenCheck, readMagicUrl, storeMagicURL, decodeTokens, filterTokens } from "../core";
import { logger, requiredParams, uint8toBuffer } from "../utils";
import { OutletAction, OutletResponseAction } from "../client/messaging";
import { AuthHandler } from "./auth-handler";
// requred for default TicketDecoder.
import { SignedDevconTicket } from "@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket";
import { AsnParser } from "@peculiar/asn1-schema";
import { ResponseActionBase, ResponseInterfaceBase } from "../core/messaging";

interface OutletInterface {
	collectionID: string;
	attestationOrigin: string;
	attestationInTab?: boolean;
	tokenParser?: any;
	base64senderPublicKeys: {[key: string]: string};
	base64attestorPubKey: string;

	// Possibly deprecated parameters which have defaults
	tokenUrlName?: string;
	tokenSecretName?: string;
	tokenIdName?: string;
	unsignedTokenDataName?: string;
	itemStorageKey?: string;
}

const defaultConfig = {
	tokenUrlName: "ticket",
	tokenSecretName: "secret",
	tokenIdName: "id",
	unsignedTokenDataName: "ticket",
	itemStorageKey: "dcTokens"
};

export class readSignedTicket {
	ticket: any;
	constructor(source: any) {
		const signedDevconTicket: SignedDevconTicket = AsnParser.parse(
			uint8toBuffer(source),
			SignedDevconTicket
		);

		this.ticket = signedDevconTicket.ticket;

		logger(3,this.ticket);
	}
}

export class Outlet {
	tokenConfig: any;
	urlParams?: URLSearchParams;

	constructor(config: OutletInterface) {
		this.tokenConfig = Object.assign(defaultConfig, config);

		// set default tokenReader
		if (!this.tokenConfig.tokenParser) {
			this.tokenConfig.tokenParser = readSignedTicket;
		}

		this.pageOnLoadEventHandler();
	}

	getDataFromQuery(itemKey: any): string {
		const val = this.urlParams ? this.urlParams.get(itemKey) : "";
		return val ? val : "";
	}

	getFilter() {
		const filter = this.getDataFromQuery("filter");
		return filter ? JSON.parse(filter) : {};
	}

	async pageOnLoadEventHandler() {
		let params =
			window.location.hash.length > 1
				? "?" + window.location.hash.substring(1)
				: window.location.search;
		this.urlParams = new URLSearchParams(params);

		const evtid = this.getDataFromQuery("evtid");
		const action = this.getDataFromQuery("action");

		// disable this check, because mostly user will open MagicLink from QR code reader or by MagicLink click at email, so document.referrer will be empty
		// if (!document.referrer && !this.getDataFromQuery('DEBUG'))
		//   return;

		logger(2,"Outlet received event ID " + evtid + " action " + action);
		// Outlet Page OnLoad Event Handler

		// TODO: should issuer be validated against requested issuer?


		try {

			switch (action) {
			case OutletAction.GET_ISSUER_TOKENS: {

				await this.whitelistCheck(evtid, "read");

				this.sendTokens(evtid);

				break;
			}
			case OutletAction.GET_PROOF: {
				const token: string = this.getDataFromQuery("token");
				const wallet: string = this.getDataFromQuery("wallet");
				const address: string = this.getDataFromQuery("address");
				requiredParams(token, "unsigned token is missing");
				this.sendTokenProof(evtid, token, address, wallet);
				break;
			}
			default: {
				// store local storage item that can be later used to check if third party cookies are allowed.
				// Note: This test can only be performed when the localstorage / cookie is assigned, then later requested.
				localStorage.setItem("cookie-support-check", "test");
				this.sendCookieCheck(evtid);

				const {tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey} =
					this.tokenConfig;

				const tokens = readMagicUrl(
					tokenUrlName,
					tokenSecretName,
					tokenIdName,
					itemStorageKey,
					this.urlParams
				);

				await this.whitelistCheck(evtid, "write");

				storeMagicURL(tokens, itemStorageKey);

				const event = new Event("tokensupdated");

				// Dispatch the event to force negotiator to reread tokens.
				// MagicLinkReader part of Outlet usually works in the parent window, same as Client, so it use same document
				document.body.dispatchEvent(event);

				this.sendTokens(evtid);

				break;
			}
			}

		} catch (e: any){
			console.error(e);
			this.sendErrorResponse(evtid, e.message);
		}
	}

	private async whitelistCheck(evtid, whiteListType: "read" | "write"){

		if ((!window.parent && !window.opener) || !document.referrer)
			return;

		let accessWhitelist = JSON.parse(localStorage.getItem("tn-whitelist-" + whiteListType)) ?? [];
		const storageRequestNeeded = window.parent && !(await document.hasStorageAccess());
		const origin = new URL(document.referrer).origin;

		if (storageRequestNeeded || accessWhitelist.indexOf(origin) === -1){

			return new Promise<void>((resolve, reject) => {

				const typeTxt = whiteListType === "read" ? "read" : "read & write";

				document.body.innerHTML += `
					<div>
						<p>${origin} is requesting ${typeTxt} access to your ${this.tokenConfig.title} tickets</p>
						<button id='tn-access-accept'>Accept</button>
						<button id='tn-access-deny'>Deny</button>
					</div>
				`;

				document.getElementById("tn-access-accept").addEventListener("click", async () => {

					if (storageRequestNeeded){
						try {
							await document.requestStorageAccess();
						} catch (e) {
							console.error(e);
							//reject();
						}
						// Ensure whitelist is appended from top-level storage context
						accessWhitelist = JSON.parse(localStorage.getItem("tn-whitelist-" + whiteListType)) ?? [];
					}

					if (accessWhitelist.indexOf(origin) === -1) {
						accessWhitelist.push(origin);
						localStorage.setItem("tn-whitelist-" + whiteListType, JSON.stringify(accessWhitelist));
					}

					resolve();
				});

				document.getElementById("tn-access-deny").addEventListener("click", () => {
					reject("USER_ABORT");
				});

				this.sendMessageResponse({
					evtid,
					evt: ResponseActionBase.SHOW_FRAME,
					// max_width: "700px",
					// min_height: "600px"
				});
			});
		}
	}

	sendCookieCheck(evtid: string){
		this.sendMessageResponse({
			evtid: evtid,
			evt: ResponseActionBase.COOKIE_CHECK,
			data: {
				thirdPartyCookies: localStorage.getItem("cookie-support-check"),
			}
		});
	}

	prepareTokenOutput(filter: any) {
		const storageTokens = localStorage.getItem(this.tokenConfig.itemStorageKey);

		if (!storageTokens) return [];

		const decodedTokens = decodeTokens(
			storageTokens,
			this.tokenConfig.tokenParser,
			this.tokenConfig.unsignedTokenDataName
		);

		return filterTokens(decodedTokens, filter);
	}

	async sendTokenProof(evtid: any, token: any, address: string, wallet: string) {
		
		if (!token) return "error";

		const unsignedToken = JSON.parse(token);

		try {
			// check if token issuer
			let tokenObj = await rawTokenCheck(unsignedToken, this.tokenConfig);

			let authHandler = new AuthHandler(
				this,
				evtid,
				this.tokenConfig,
				tokenObj,
				address,
				wallet
			);

			let tokenProof = await authHandler.authenticate();

			this.sendMessageResponse({
				evtid: evtid,
				evt: OutletResponseAction.PROOF,
				data: {
					issuer: this.tokenConfig.collectionID,
					proof: tokenProof
				}
			});
		} catch (e: any) {
			logger(2,e);

			this.sendErrorResponse(evtid, e.message);
		}
	}

	private sendTokens(evtid: any) {
		let issuerTokens = this.prepareTokenOutput(this.getFilter());

		this.sendMessageResponse({
			evtid: evtid,
			evt: OutletResponseAction.ISSUER_TOKENS,
			data: {
				issuer: this.tokenConfig.collectionID,
				tokens: issuerTokens
			}
		});
	}

	public sendErrorResponse(evtid: any, error: string) {
		this.sendMessageResponse({
			evtid: evtid,
			evt: ResponseActionBase.ERROR,
			errors: [error],
		});
	}

	public sendMessageResponse(response: ResponseInterfaceBase) {
		// dont send Message if no referrer defined
		if (!document.referrer) {
			return;
		}

		let target, origin;

		if (!window.opener) {
			target = window.parent;
		} else {
			target = window.opener;
		}

		// let pUrl = new URL(document.referrer);
		// origin = pUrl.origin;

		if (target) target.postMessage(response, "*");
	}
}
