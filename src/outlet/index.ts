import { rawTokenCheck, readMagicUrl, storeMagicURL } from "../core";
import { logger, requiredParams } from "../utils";
import { decodeTokens, filterTokens } from "../core";
import { OutletAction, OutletResponseAction } from "../client/messaging";
import { AuthHandler } from "./auth-handler";
// requred for default TicketDecoder.
import { SignedDevconTicket } from "@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket";
import { AsnParser } from "@peculiar/asn1-schema";
import { uint8toBuffer } from "../utils";
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

	pageOnLoadEventHandler() {
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

		// Wait until cookie is set for magic URL action
		if (action !== OutletAction.MAGIC_URL){
			this.sendCookieCheck(evtid);
		}

		switch (action) {
		case OutletAction.GET_ISSUER_TOKENS: {
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

			const { tokenUrlName, tokenSecretName, tokenIdName, itemStorageKey } =
				this.tokenConfig;

			try {
				const tokens = readMagicUrl(
					tokenUrlName,
					tokenSecretName,
					tokenIdName,
					itemStorageKey,
					this.urlParams
				);

				storeMagicURL(tokens, itemStorageKey);

				const event = new Event("tokensupdated");

				// Dispatch the event to force negotiator to reread tokens.
				// MagicLinkReader part of Outlet usually works in the parent window, same as Client, so it use same document
				document.body.dispatchEvent(event);

				this.sendTokens(evtid);
			} catch (e: any) {
				this.sendErrorResponse(evtid, e.message);
			}

			break;
		}
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
