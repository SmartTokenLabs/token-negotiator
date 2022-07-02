// @ts-nocheck
import {OutletAction, OutletResponseAction} from "./messaging";
import { Messaging } from "../core/messaging";
import { Popup } from "./popup";
import { asyncHandle, logger, requiredParams } from "../utils";
import {connectMetamaskAndGetAddress, getChallengeSigned, validateUseEthKey } from "../core";
import {getNftCollection, getNftTokens} from "../utils/token/nftProvider";
import "./../vendor/keyShape";
import { Authenticator } from "@tokenscript/attestation";
import {TokenConfig, TokenStore} from "./tokenStore";
import {OffChainTokenConfig, OnChainTokenConfig, AuthenticateInterface, NegotiationInterface} from "./interface";

declare global {
	interface Window {
		KeyshapeJS?: any;
		tokenToggleSelection: any;
		ethereum: any;
	}
}

const defaultConfig: NegotiationInterface = {
	type: "active",
	issuers: [],
	options: {
		overlay: {
			openingHeading: "Validate your token ownership for access",
			issuerHeading: "Detected tokens"
		},
		filter: {}
	},
	autoLoadTokens: true,
	autoEnableTokens: true,
	autoPopup: true
}

export class Client {

	private negotiateAlreadyFired: boolean;
	private config: NegotiationInterface;
	private web3WalletProvider: Web3WalletProvider;
	private messaging: Messaging;
	private popup: Popup;
	private clientCallBackEvents: {} = {};
	private tokenStore: TokenStore;
	private uiUpdateCallbacks: {[id: string]: Function} = {}

	static getKey(file: string){
		return  Authenticator.decodePublicKey(file);
	}

	constructor(config: NegotiationInterface) {

		this.config = Object.assign(defaultConfig, config);

		this.negotiateAlreadyFired = false;

		this.tokenStore = new TokenStore(this.config.autoEnableTokens);

		if (this.config.issuers?.length > 0)
			this.tokenStore.updateIssuers(this.config.issuers);

		this.messaging = new Messaging();
	}

	getTokenStore() {
		return this.tokenStore;
	}

	triggerUiUpdateCallbacks(){
		for (let i in this.uiUpdateCallbacks){
			this.uiUpdateCallbacks[i]();
		}
	}

	public registerUiUpdateCallback(id: string, callback: Function){
		this.uiUpdateCallbacks[id] = callback;
	}

	private async getWalletProvider(){

		if (!this.web3WalletProvider){
			const {Web3WalletProvider} = await import("./../wallet/Web3WalletProvider");
			this.web3WalletProvider = new Web3WalletProvider();
		}

		return this.web3WalletProvider;
	}

	async negotiatorConnectToWallet(walletType: string) {

		let walletProvider = await this.getWalletProvider();

		let walletAddress = await walletProvider.connectWith(walletType);

		logger(2, "wallet address found: " + walletAddress);

		return walletAddress;
	}

	async setPassiveNegotiationWebTokens() {

		let issuers = this.tokenStore.getCurrentIssuers(false);

		for (let issuer in issuers){

			let data;

			const tokensOrigin = this.tokenStore.getCurrentIssuers()[issuer].tokenOrigin;

			try {
				data = await this.messaging.sendMessage({
					action: OutletAction.GET_ISSUER_TOKENS,
					origin: tokensOrigin,
					data: {
						issuer: issuer,
						filter: this.config.options.filters
					}
				});
			} catch (err) {
				logger(2,err);
				continue;
			}

			logger(2,"tokens:");
			logger(2,data.tokens);

			this.tokenStore.setTokens(issuer, data.tokens);

		}
	}

	async enrichTokenLookupDataOnChainTokens() {

		let issuers = this.tokenStore.getCurrentIssuers(true);

		for (let issuer in issuers){

			let tokenData = issuers[issuer];

			// Issuer contract data already loaded
			if (tokenData.title)
				continue;

			let lookupData = await getNftCollection(tokenData);

			if (lookupData) {
				// TODO: this might be redundant
				lookupData.onChain = true;

				// enrich the tokenLookup store with contract meta data
				this.tokenStore.updateTokenLookupStore(issuer, lookupData);
			}
		}
	}

	async negotiate(issuers?: OnChainTokenConfig | OffChainTokenConfig[], openPopup = false) {

		if (issuers) this.tokenStore.updateIssuers(issuers);

		requiredParams(Object.keys(this.tokenStore.getCurrentIssuers()).length, "issuers are missing.");

		await this.enrichTokenLookupDataOnChainTokens();

		if (this.config.type === "active") {
			this.activeNegotiationStrategy(openPopup);
		} else {
			// TODO build logic to allow to connect with wallectConnect, Torus etc.
			// Logic to ask user to connect to wallet when they have provided web3 tokens to negotiate with.
			// See other TODO's in this flow.
			// if (window.ethereum && onChainTokens.tokenKeys.length > 0) await this.web3WalletProvider.connectWith('MetaMask');

			this.passiveNegotiationStrategy();
		}
	}

	async activeNegotiationStrategy(openPopup: boolean) {

		let autoOpenPopup;

		if (this.popup) {
			autoOpenPopup = this.tokenStore.hasUnloadedTokens();
			this.triggerUiUpdateCallbacks();
		} else {
			this.popup = new Popup(this.config.options?.overlay, this);
			this.popup.initialize();
			autoOpenPopup = true;
		}

		// emit existing cached tokens
		if (this.config.autoEnableTokens && Object.keys(this.tokenStore.getSelectedTokens()).length)
			this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens())

		if (openPopup || (this.config.autoPopup === true && autoOpenPopup))
			this.popup.openOverlay();
	}

	private cancelAutoload = true;

	async tokenAutoLoad(onLoading: (issuer: string) => void, onComplete: (issuer: string, tokens: any[]) => void) {

		if (this.config.autoLoadTokens === false)
			return;

		this.cancelAutoload = false;

		let count = 1;

		for (let issuerKey in this.tokenStore.getCurrentIssuers()){

			let tokens = this.tokenStore.getIssuerTokens(issuerKey)

			if (tokens?.length > 0)
				continue;

			onLoading(issuerKey);

			try {
				let tokens = await this.connectTokenIssuer(issuerKey);

				onComplete(issuerKey, tokens)
			} catch (e){
				console.log("Failed to load " + issuerKey + ": " + e);
				onComplete(issuerKey, null);
			}

			count++;

			if (this.cancelAutoload || (this.config.autoLoadTokens !== true && count > this.config.autoLoadTokens))
				break;
		}
	}

	cancelTokenAutoload(){
		this.cancelAutoload = true;
	}

	async setPassiveNegotiationOnChainTokens() {

		let issuers = this.tokenStore.getCurrentIssuers(true);
		let walletProvider = await this.getWalletProvider();

		for (let issuerKey in issuers){

			let issuer = issuers[issuerKey];

			const tokens = await getNftTokens(
				issuer,
				walletProvider.getConnectedWalletData()[0].address
			);

			this.tokenStore.setTokens(issuerKey, tokens);
		}
	}

	async passiveNegotiationStrategy() {

		await asyncHandle(
			this.setPassiveNegotiationWebTokens()
		);
		await asyncHandle(
			this.setPassiveNegotiationOnChainTokens()
		);

		let tokens = this.tokenStore.getCurrentTokens();

		logger(2, "Emit tokens");
		logger(2, tokens);

		for (let issuer in tokens){
			tokens[issuer] = {tokens: tokens[issuer]};
		}

		this.eventSender.emitAllTokensToClient(tokens);

		// Feature not supported when an end users third party cookies are disabled
		// because the use of a tab requires a user gesture.
		if (this.messaging.iframeStorageSupport === false && Object.keys(this.tokenStore.getCurrentTokens(false)).length === 0)
			logger(2,
				"iFrame storage support not detected: Enable popups via your browser to access off-chain tokens with this negotiation type."
			);
	}

	async connectTokenIssuer(issuer: string) {

		const config = this.tokenStore.getCurrentIssuers()[issuer];

		if (!config)
			throw new Error("Undefined token issuer")

		let tokens;

		if (config.onChain) {

			let walletProvider = await this.getWalletProvider();

			const walletAddress = walletProvider.getConnectedWalletData()[0]?.address;

			requiredParams(issuer, "issuer is required.");
			requiredParams(walletAddress, "wallet address is missing.");

			tokens = await getNftTokens(config, walletAddress);

			this.tokenStore.setTokens(issuer,  tokens);

		} else {

			let data = await this.messaging.sendMessage({
				action: OutletAction.GET_ISSUER_TOKENS,
				origin: config.tokenOrigin,
				data : {
					issuer: issuer,
					filter: this.config.options.filters
				},
			});

			tokens = data.tokens;

			this.tokenStore.setTokens(issuer, data.tokens);
		}

		if (this.config.autoEnableTokens)
			this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens())

		return tokens;
	}

	updateSelectedTokens(selectedTokens) {
		this.tokenStore.setSelectedTokens(selectedTokens);
		this.eventSender.emitSelectedTokensToClient(selectedTokens);
	}

	async authenticateOnChain(authRequest: AuthenticateInterface) {
		const { issuer, unsignedToken } = authRequest;

		let useEthKey = await this.checkPublicAddressMatch(issuer, unsignedToken);

		if (!useEthKey) {
			throw new Error("Address does not match");
		}

		return { issuer: issuer, proof: useEthKey };
	}

	async authenticateOffChain(authRequest: AuthenticateInterface) {
		const { issuer, unsignedToken } = authRequest;
		const tokenConfig = this.tokenStore.getCurrentIssuers()[issuer];

		let useEthKey = null;

		// useEthKey is not required when using the proof in a smart contract - UN endpoint config can be removed to prevent this check
		// TODO: Make this an explicit setting passed to the authenticate function
		if (tokenConfig.unEndPoint) {
			useEthKey = await this.checkPublicAddressMatch(issuer, unsignedToken);

			if (!useEthKey) {
				throw new Error("Address does not match");
			}
		}

		let data = await this.messaging.sendMessage({
			action: OutletAction.GET_PROOF,
			origin: tokenConfig.tokenOrigin,
			timeout: 0, // Don't time out on this event as it needs active input from the user
			data: {
				issuer: issuer,
				token: unsignedToken,
				address: authRequest.address ? authRequest.address : "",
				wallet: authRequest.wallet ? authRequest.wallet : ""
			}
		});

		if (useEthKey)
			Authenticator.validateUseTicket(
				data.proof,
				tokenConfig.base64attestorPubKey,
				tokenConfig.base64senderPublicKeys,
				useEthKey.address
			);

		// TODO: Provide object that include useEthKey object
		return data;
	}

	async authenticate(authRequest: AuthenticateInterface) {
		const { issuer, unsignedToken } = authRequest;
		requiredParams(
			issuer && unsignedToken,
			"Issuer and signed token required."
		);

		const config = this.tokenStore.getCurrentIssuers()[issuer];

		if (!config)
			throw new Error("Provided issuer was not found.");

		// TODO: How to handle error display in passive negotiation? Use optional UI or emit errors to listener?
		let timer;

		if (this.popup) {
			timer = setTimeout(() => {
				this.popup.showLoader(
					"<h4>Authenticating...</h4>",
					"<small>You may need to sign a new challenge in your wallet</small>"
				);
				this.popup.openOverlay();
			}, 1000);
		}

		try {
			let data;

			if (config.onChain) {
				data = await this.authenticateOnChain(authRequest);
			} else {
				data = await this.authenticateOffChain(authRequest);
			}

			if (!data.proof)
				return this.handleProofError("Failed to get proof from the outlet.");

			logger(2,"Ticket proof successfully validated.");

			this.eventSender.emitProofToClient(data.proof, data.issuer);
		} catch (err) {
			logger(2,err);
			this.handleProofError(err, issuer);
		}

		if (this.popup) {
			if (timer) clearTimeout(timer);
			this.popup.dismissLoader();
			this.popup.closeOverlay();
		}
	}

	private handleProofError(err, issuer) {
		if (this.popup) this.popup.showError(err);
		this.eventSender.emitProofToClient(null, issuer, err);
	}

	async checkPublicAddressMatch(issuer: string, unsignedToken: any) {
		let config: any = this.tokenStore.getCurrentIssuers()[issuer];

		// TODO: Remove once fully implemented for on-chain tokens
		if (!config.unEndPoint) {
			config = {
				unEndPoint: "https://crypto-verify.herokuapp.com/use-devcon-ticket",
				ethKeyitemStorageKey: "dcEthKeys",
			};
		}

		if (!unsignedToken) return { status: false, useEthKey: null, proof: null };

		// try {
		let walletProvider = await this.getWalletProvider();

		if (!walletProvider.getConnectedWalletData().length) {
			await walletProvider.connectWith("MetaMask");
		}

		let useEthKey = await getChallengeSigned(config, walletProvider);

		const attestedAddress = await validateUseEthKey(
			config.unEndPoint,
			useEthKey
		);

		const walletAddress = await connectMetamaskAndGetAddress();

		if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase())
			throw new Error("useEthKey validation failed.");

		return useEthKey;
	}

	eventSender = {
		// TODO: consolidate these events
		emitAllTokensToClient: (tokens: any) => {
			this.on("tokens", null, tokens);
		},
		emitSelectedTokensToClient: (tokens: any) => {
			this.on("tokens-selected", null, { selectedTokens: tokens });
		},
		emitProofToClient: (proof: any, issuer: any, error = "") => {
			this.on("token-proof", null, { proof, issuer, error });
		},
	};

	async addTokenViaMagicLink(magicLink: any) {
		let url = new URL(magicLink);
		let params =
			url.hash.length > 1 ? url.hash.substring(1) : url.search.substring(1);

		let data = await this.messaging.sendMessage({
			action: OutletAction.MAGIC_URL,
			origin: url.origin + url.pathname,
			data: {
				urlParams: params
			}
		});

		if (data.evt === OutletResponseAction.ISSUER_TOKENS) return data.tokens;

		throw new Error(data.errors.join("\n"));
	}

	on(type: string, callback?: any, data?: any) {
		requiredParams(type, "Event type is not defined");

		if (callback) {
			// assign callback reference to web developers event e.g. negotiator.on('tokens', (tokensForWebPage) => { ... }));

			this.clientCallBackEvents[type] = callback;
		} else {
			// event types: 'tokens', 'tokens-selected', 'proof'

			if (this.clientCallBackEvents[type]) {
				return this.clientCallBackEvents[type].call(type, data);
			}
		}
	}
}
