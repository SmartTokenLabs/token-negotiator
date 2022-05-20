import { rawTokenCheck, readMagicUrl, storeMagicURL } from "../core";
import { logger, requiredParams } from "../utils/index";
import { decodeTokens, filterTokens } from "./../core/index";
import {
	MessageAction,
	MessageResponseInterface,
	MessageResponseAction,
} from "../client/messaging";
import { AuthHandler } from "./auth-handler";

// requred for default TicketDecoder
import { SignedDevconTicket } from "@tokenscript/attestation/dist/asn1/shemas/SignedDevconTicket";
import { AsnParser } from "@peculiar/asn1-schema";
import { uint8toBuffer } from "./../utils/index";

interface OutletInterface {
	config: any;
}

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
		this.tokenConfig = config;

		// set default tokenReader
		if (!this.tokenConfig.tokenParser) {
			this.tokenConfig.tokenParser = readSignedTicket;
		}

		this.pageOnLoadEventHandler();
	}

	getDataFromQuery(itemKey: any) {
		return this.urlParams ? this.urlParams.get(itemKey) : undefined;
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

		switch (action) {
		case MessageAction.GET_ISSUER_TOKENS: {
			this.sendTokens(evtid);

			break;
		}
		case MessageAction.GET_PROOF: {
			const token = this.getDataFromQuery("token");

			requiredParams(token, "unsigned token is missing");

			this.sendTokenProof(evtid, token);

			break;
		}
		case MessageAction.COOKIE_CHECK: {
			this.sendMessageResponse({
				evtid: evtid,
				evt: MessageResponseAction.COOKIE_CHECK,
				thirdPartyCookies: localStorage.getItem("cookie-support-check"),
			});

			break;
		}
		default: {
			// store local storage item that can be later used to check if third party cookies are allowed.
			// Note: This test can only be performed when the localstorage / cookie is assigned, then later requested.
			localStorage.setItem("cookie-support-check", "test");

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

	async sendTokenProof(evtid: any, token: any) {
		if (!token) return "error";

		const unsignedToken = JSON.parse(token);

		try {
			// check if token issuer
			let tokenObj = await rawTokenCheck(unsignedToken, this.tokenConfig);

			let authHandler = new AuthHandler(
				this,
				evtid,
				this.tokenConfig,
				tokenObj
			);

			let tokenProof = await authHandler.authenticate();

			this.sendMessageResponse({
				evtid: evtid,
				evt: MessageResponseAction.PROOF,
				issuer: this.tokenConfig.tokenName,
				proof: tokenProof,
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
			evt: MessageResponseAction.ISSUER_TOKENS,
			issuer: this.tokenConfig.tokenName,
			tokens: issuerTokens,
		});
	}

	public sendErrorResponse(evtid: any, error: string) {
		this.sendMessageResponse({
			evtid: evtid,
			evt: MessageResponseAction.ERROR,
			errors: [error],
		});
	}

	public sendMessageResponse(response: MessageResponseInterface) {
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

		let pUrl = new URL(document.referrer);
		origin = pUrl.origin;

		if (target) target.postMessage(response, origin);
	}
}
