// @ts-nocheck
import {OutletAction, OutletResponseAction} from "./messaging";
import { Messaging } from "../core/messaging";
import { Popup } from "./popup";
import { asyncHandle, logger, requiredParams } from "../utils";
import OnChainTokenModule from "./../onChainTokenModule";
import "./../vendor/keyShape";
import { Authenticator } from "@tokenscript/attestation";
import {TokenConfig, TokenStore} from "./tokenStore";
import {OffChainTokenConfig, OnChainTokenConfig, AuthenticateInterface, NegotiationInterface} from "./interface";
import {SignedUNChallenge} from "./auth/signedUNChallenge";
import {TicketZKProof} from "./auth/ticketZKProof";
import {AuthenticationMethod, AuthenticationResult} from "./auth/abstractAuthentication";

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
	autoPopup: true,
	messagingForceTab: false
}

export class Client {

	private negotiateAlreadyFired: boolean;
	private config: NegotiationInterface;
	private web3WalletProvider: Web3WalletProvider;
	private messaging: Messaging;
	private popup: Popup;
	private clientCallBackEvents: {} = {};
	private onChainTokenModule: OnChainTokenModule;
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

		this.onChainTokenModule = new OnChainTokenModule(
			this.config.onChainKeys,
			this.config.ipfsBaseUrl
		);

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

	public safeConnectAvailable(){
		return this.config.safeConnectOptions !== undefined;
	}

	private async getWalletProvider(){

		if (!this.web3WalletProvider){
			const {Web3WalletProvider} = await import("./../wallet/Web3WalletProvider");
			this.web3WalletProvider = new Web3WalletProvider(this.config.safeConnectOptions);
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

			let res;

			const tokensOrigin = this.tokenStore.getCurrentIssuers()[issuer].tokenOrigin;

			try {
				res = await this.messaging.sendMessage({
					action: OutletAction.GET_ISSUER_TOKENS,
					origin: tokensOrigin,
					data: {
						issuer: issuer,
						filter: this.config.options.filters
					}
				}, this.config.messagingForceTab);
			} catch (err) {
				logger(2,err);
				continue;
			}

			logger(2,"tokens:");
			logger(2,res.data.tokens);

			this.tokenStore.setTokens(issuer, res.data.tokens);

		}
	}

	async enrichTokenLookupDataOnChainTokens() {

		let issuers = this.tokenStore.getCurrentIssuers(true);

		for (let issuer in issuers){

			let tokenData = issuers[issuer];

			// Issuer contract data already loaded
			if (tokenData.title)
				continue;

			let lookupData = await this.onChainTokenModule.getInitialContractAddressMetaData(tokenData);

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

			const tokens = await this.onChainTokenModule.connectOnChainToken(
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

			tokens = await this.onChainTokenModule.connectOnChainToken(config, walletAddress);

			this.tokenStore.setTokens(issuer,  tokens);

		} else {

			let res = await this.messaging.sendMessage({
				action: OutletAction.GET_ISSUER_TOKENS,
				origin: config.tokenOrigin,
				data : {
					issuer: issuer,
					filter: this.config.options.filters
				},
			}, this.config.messagingForceTab);

			tokens = res.data.tokens;

			this.tokenStore.setTokens(issuer, res.data.tokens);
		}

		if (this.config.autoEnableTokens)
			this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens())

		return tokens;
	}

	updateSelectedTokens(selectedTokens) {
		this.tokenStore.setSelectedTokens(selectedTokens);
		this.eventSender.emitSelectedTokensToClient(selectedTokens);
	}

	async authenticate(authRequest: AuthenticateInterface): AuthenticationResult {
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

		let AuthType;

		if (authRequest.type){
			AuthType = authRequest.type;
		} else {
			AuthType = config.onChain ? SignedUNChallenge : TicketZKProof;
		}

		let authenticator: AuthenticationMethod = new AuthType();

		let res;

		try {
			authRequest.options.messagingForceTab = this.config.messagingForceTab;

			res = await authenticator.getTokenProof(config, [authRequest.unsignedToken], this.web3WalletProvider, authRequest);

			logger(2,"Ticket proof successfully validated.");

			this.eventSender.emitProofToClient(res.data, issuer);
		} catch (err) {
			logger(2,err);
			this.handleProofError(err, issuer);
			throw err;
		} finally {
			if (this.popup) {
				if (timer) clearTimeout(timer);
				this.popup.dismissLoader();
				this.popup.closeOverlay();
			}
		}

		return res;
	}

	private handleProofError(err, issuer) {
		if (this.popup) this.popup.showError(err);
		this.eventSender.emitProofToClient(null, issuer, err);
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

		let res = await this.messaging.sendMessage({
			action: OutletAction.MAGIC_URL,
			origin: url.origin + url.pathname,
			data: {
				urlParams: params
			}
		}, this.config.messagingForceTab);

		if (res.evt === OutletResponseAction.ISSUER_TOKENS) return res.data.tokens;

		throw new Error(res.errors.join("\n"));
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
