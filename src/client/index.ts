
import {OutletAction, OutletResponseAction, Messaging} from "./messaging";
import { Ui, UItheme } from './ui';
import { logger, requiredParams } from "../utils";
import {getNftCollection, getNftTokens} from "../utils/token/nftProvider";
import "./../vendor/keyShape";
import { Authenticator } from "@tokenscript/attestation";
import {TokenStore} from "./tokenStore";
import { OffChainTokenConfig, OnChainTokenConfig, AuthenticateInterface, NegotiationInterface, Issuer, SolanaIssuerConfig, TokenNegotiatorEvents } from './interface';
import {SignedUNChallenge} from "./auth/signedUNChallenge";
import {TicketZKProof} from "./auth/ticketZKProof";
import {AuthenticationMethod} from "./auth/abstractAuthentication";
import { isUserAgentSupported, validateBlockchain } from '../utils/support/isSupported';
import {SelectWallet} from "./views/select-wallet";
import {SelectIssuers} from "./views/select-issuers";
import Web3WalletProvider from '../wallet/Web3WalletProvider';
import {LocalOutlet} from "../outlet/localOutlet";
import {Outlet, OutletInterface} from "../outlet";
import { browserBlocksIframeStorage } from "../utils/support/getBrowserData";
import { waitForElementToExist, errorHandler } from '../utils/index';

if(typeof window !== "undefined") window.tn = { version: "2.2.1" };

declare global {
	interface Window {
		KeyshapeJS?: any;
		tokenToggleSelection: any;
		ethereum: any;
		solana: any;
		tn: unknown;
	}
}

const NOT_SUPPORTED_ERROR = "This browser is not supported. Please try using Chrome, Edge, FireFox or Safari.";

const defaultConfig: NegotiationInterface = {
	type: "active",
	issuers: [],
	uiOptions: {
		uiType: "popup",
		// value ".overlay-tn" hardcoded in ui.ts
		containerElement: ".overlay-tn",
		openingHeading: "Validate your token ownership for access",
		issuerHeading: "Detected tokens",
		autoPopup: true,
		position: "bottom-right"
	},
	autoLoadTokens: true,
	autoEnableTokens: true,
	messagingForceTab: false,
	// by default use redirect flow for active negotiation()
	forceRedirect: true,
	unSupportedUserAgent: {
		authentication: {
			config: {
				// metaMaskAndroid: true,
				// alphaWalletAndroid: true,
				// mewAndroid: true,
				// imTokenAndroid: true,
			},
			errorMessage: NOT_SUPPORTED_ERROR
		},
		full: {
			config: {
				iE: true,
				iE9: true,
			},
			errorMessage: NOT_SUPPORTED_ERROR
		}
	},
}

export const enum UIUpdateEventType {
	ISSUERS_LOADING,
	ISSUERS_LOADED
}


export enum ClientError {
	POPUP_BLOCKED = "POPUP_BLOCKED",
	USER_ABORT = "USER_ABORT"
}

export enum ClientErrorMessage {
	POPUP_BLOCKED = "Please add an exception to your popup blocker before continuing.",
	USER_ABORT = "The user aborted the process."
}

export class Client {

	private negotiateAlreadyFired: boolean;
	public issuersLoaded: boolean;
	private config: NegotiationInterface;
	private web3WalletProvider: Web3WalletProvider;
	private messaging: Messaging;
	private ui: Ui;
	private clientCallBackEvents: {} = {};
	private tokenStore: TokenStore;
	private uiUpdateCallbacks: {[type in UIUpdateEventType]} = {
		[UIUpdateEventType.ISSUERS_LOADING]: undefined,
		[UIUpdateEventType.ISSUERS_LOADED]: undefined
	};

	private urlParams: URLSearchParams;

	static getKey(file: string){
		return  Authenticator.decodePublicKey(file);
	}

	constructor(config: NegotiationInterface) {
		if (window.location.hash) {
			this.urlParams = new URLSearchParams(window.location.hash.substring(1));
			document.location.hash = "";
			let action = this.getDataFromQuery("action");
			logger(2, `Client() fired. Action = "${action}"`);
		}

		this.config = this.mergeConfig(defaultConfig, config);

		this.negotiateAlreadyFired = false;

		this.tokenStore = new TokenStore(this.config.autoEnableTokens);

		if (this.config.issuers?.length > 0)
			this.tokenStore.updateIssuers(this.config.issuers);

		this.messaging = new Messaging();

		this.registerOutletProofEventListener();
	}

	getDataFromQuery(itemKey: any): string {
		return this.urlParams ? this.urlParams.get(itemKey) : "";
	}

	public readProofCallback(){

		if (!this.getDataFromQuery)
			return false;

		let action = this.getDataFromQuery("action");

		if (action !== "proof-callback")
			return false;

		const issuer = this.getDataFromQuery("issuer");
		const attest = this.getDataFromQuery("attestation");
		const error = this.getDataFromQuery("error");

		this.emitRedirectProofEvent(issuer, attest, error);
	}

	private registerOutletProofEventListener(){
		window.addEventListener("auth-callback", (e: CustomEvent) => {
			this.emitRedirectProofEvent(e.detail.issuer, e.detail.proof, e.detail.error);
		});
	}

	private emitRedirectProofEvent(issuer: string, proof?: string, error?: string){
		// Wait to ensure UI is initialized
		setTimeout(() => {
			if (error){
				this.handleProofError(new Error(error), issuer);
			} else {
				this.eventSender.emitProofToClient({proof}, issuer, null);
			}
		}, 500);
	}

	private mergeConfig(defaultConfig: NegotiationInterface, config: NegotiationInterface){

		for (let key in config){

			if (config[key] && config[key].constructor === Object){
				defaultConfig[key] = this.mergeConfig(defaultConfig[key] ?? {}, config[key]);
			} else {
				defaultConfig[key] = config[key];
			}
		}

		// Check if blockchain is supported one
		if (defaultConfig.issuers && defaultConfig.issuers.length) {
			for(const issuer of defaultConfig.issuers) {
				if (issuer.onChain === true) {
					validateBlockchain(issuer.blockchain ?? "");
				}
			}
	
		}
		return defaultConfig;
	}

	getTokenStore() {
		return this.tokenStore;
	}

	getUi(){
		return this.ui;
	}

	triggerUiUpdateCallback(type: UIUpdateEventType, data?: {}){
		if (this.uiUpdateCallbacks[type])
			this.uiUpdateCallbacks[type](data);
	}

	public registerUiUpdateCallback(type: UIUpdateEventType, callback: Function){
		this.uiUpdateCallbacks[type] = callback;
	}

	public safeConnectAvailable(){
		return this.config.safeConnectOptions !== undefined;
	}
	
	public solanaAvailable(){
		return  (
			typeof window.solana !== 'undefined' &&
			this.config.issuers.filter((issuer: SolanaIssuerConfig ) => {
				return issuer?.blockchain?.toLowerCase() === 'solana';
			}).length > 0
		) 
	}

	public async getWalletProvider(){

		if (!this.web3WalletProvider){
			const {Web3WalletProvider} = await import("./../wallet/Web3WalletProvider");
			this.web3WalletProvider = new Web3WalletProvider(this, this.config.safeConnectOptions);
		}

		return this.web3WalletProvider;
	}

	public async disconnectWallet(){
		let wp = await this.getWalletProvider();
		wp.deleteConnections();
		this.tokenStore.clearCachedTokens();
		if(this.ui?.updateUI) this.ui.updateUI(SelectWallet);
		this.eventSender.emitConnectedWalletInstance(null);
		this.eventSender.emitDisconnectedWalletInstance();
	}

	async negotiatorConnectToWallet(walletType: string) {

		let walletProvider = await this.getWalletProvider();

		let walletAddress = await walletProvider.connectWith(walletType);

		logger(2, "wallet address found: " + walletAddress);

		return walletAddress;
	}

	async enrichTokenLookupDataOnChainTokens() {

		this.issuersLoaded = false;
		this.triggerUiUpdateCallback(UIUpdateEventType.ISSUERS_LOADING);

		let issuers = this.tokenStore.getCurrentIssuers(true);

		for (let issuer in issuers){

			let tokenData = issuers[issuer];

			// Issuer contract data already loaded
			if (tokenData.title)
				continue;

			try {
				let lookupData = await getNftCollection(tokenData);
				if (lookupData) {
					// TODO: this might be redundant
					lookupData.onChain = true;

					// enrich the tokenLookup store with contract meta data
					this.tokenStore.updateTokenLookupStore(issuer, lookupData);
				}
			} catch (e){
				logger(2, "Failed to load contract data for " + issuer + ": " + e.message);
			}
		}

		this.issuersLoaded = true;
		this.triggerUiUpdateCallback(UIUpdateEventType.ISSUERS_LOADED);
	}

	public checkUserAgentSupport(type: string){
		
		if (!isUserAgentSupported(this.config.unSupportedUserAgent?.[type]?.config)){
			
			// TODO do we check browser support in passive mode? looks like we just save "errorMessage"
			let err = this.config.unSupportedUserAgent[type].errorMessage;

			if (this.activeNegotiateRequired()) {
				this.ui = new Ui(this.config.uiOptions, this);
				this.ui.initialize();
				this.ui.openOverlay();
				this.ui.showError(err, false);
				this.ui.viewContainer.style.display = 'none';
			}

			// TODO what the sense of this handler?
			errorHandler(err, 'error', null, null, true, true);

		}
	}

	private activeNegotiateRequired(): boolean {
		
		return (
			this.config.type === "active" 
		);
	}

	private createCurrentUrlWithoutHash(): string {
		return window.location.origin + window.location.pathname + window.location.search??("?" + window.location.search);
	}

	public getNoTokenMsg (collectionID: string) {
		const store = this.getTokenStore().getCurrentIssuers();
		const collectionNoTokenMsg = store[collectionID]?.noTokenMsg;
		return collectionNoTokenMsg ? collectionNoTokenMsg : '';
	}

	async negotiate(issuers?: (OnChainTokenConfig | OffChainTokenConfig)[], openPopup = false) {

		let currentIssuer = this.getOutletConfigForCurrentOrigin();
		if (currentIssuer){
			logger(2, "Sync Outlet fired in Client to read MagicLink before negotiate().");
			let outlet = new Outlet(currentIssuer, true);
			await outlet.readMagicLink();
			outlet = null;
		}

		try {
			// TODO full for emailAttestation. isnt it?
			this.checkUserAgentSupport("full");
		} catch(err){
			errorHandler(NOT_SUPPORTED_ERROR, 'error', () => this.eventSender.emitErrorToClient(err), null, true, true);
			return;
		}
		

		if (issuers) this.tokenStore.updateIssuers(issuers);

		requiredParams(Object.keys(this.tokenStore.getCurrentIssuers()).length, "issuers are missing.");

		if (this.activeNegotiateRequired()) {

			this.issuersLoaded = !this.tokenStore.hasUnloadedIssuers();

			this.activeNegotiationStrategy(openPopup);

		} else {
			// TODO build logic to allow to connect with wallectConnect, Torus etc.
			// Logic to ask user to connect to wallet when they have provided web3 tokens to negotiate with.
			// See other TODO's in this flow.
			// if (window.ethereum && onChainTokens.tokenKeys.length > 0) await this.web3WalletProvider.connectWith('MetaMask');
			await this.enrichTokenLookupDataOnChainTokens();

			await this.passiveNegotiationStrategy();
		}

	}

	activeNegotiationStrategy(openPopup: boolean) {

		let autoOpenPopup;

		if (this.ui) {
			autoOpenPopup = this.tokenStore.hasUnloadedTokens();

			if (this.ui.viewIsNotStart() && this.tokenStore.hasUnloadedIssuers())
				this.enrichTokenLookupDataOnChainTokens();

		} else {
			this.ui = new Ui(this.config.uiOptions, this);
			this.ui.initialize();
			autoOpenPopup = true;
		}

		// emit existing cached tokens
		if (this.config.autoEnableTokens && Object.keys(this.tokenStore.getSelectedTokens()).length)
			this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens())

		if (openPopup || (this.config.uiOptions.autoPopup === true && autoOpenPopup))
			this.ui.openOverlay();
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
				e.message = "Failed to load " + issuerKey + ": " + e.message;
				logger(2, e.message);
				this.eventSender.emitErrorToClient(e, issuerKey);
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

	async setPassiveNegotiationWebTokens() {

		let issuers = this.tokenStore.getCurrentIssuers(false);

		let action = this.getDataFromQuery("action");

		for (let issuer in issuers){

			let tokens;

			const issuerConfig = this.tokenStore.getCurrentIssuers()[issuer] as OffChainTokenConfig;

			try {
				if ((new URL(issuerConfig.tokenOrigin)).origin === document.location.origin){
					tokens = this.loadLocalOutletTokens(issuerConfig);
				} else {
					// TODO make solution:
					// in case if we have multiple tokens then redirect flow will not work
					// because page will reload on first remote token
					let resposeIssuer = this.getDataFromQuery("issuer");

					if (
						(
							action === OutletAction.GET_ISSUER_TOKENS + "-response" 
							// have to read tokens from "proof-callback" action,
							// in other way page will be redirected in loop
							|| action === "proof-callback"
						)
					&& issuer == resposeIssuer) {
						let resposeTokensEncoded = this.getDataFromQuery("tokens");
						try {
							tokens = JSON.parse(resposeTokensEncoded);
						} catch (e){
							logger(2, "Error parse tokens from Response. ", e);
						}
					} else {						
						tokens = await this.loadRemoteOutletTokens(issuerConfig);
					}
				}
			} catch (err) {
				errorHandler('popup error', 'error', () => this.eventSender.emitErrorToClient(err, issuer), null, true, false);
				continue;
			}

			logger(2,"tokens:");
			logger(2, tokens);

			this.tokenStore.setTokens(issuer, tokens);

		}
	}

	readTokensFromUrl(){
		let issuers = this.tokenStore.getCurrentIssuers(false);
		let issuer = this.getDataFromQuery("issuer");

		if (!issuer) {
			logger(3, "No issuer in URL.")
			return;
		}

		const issuerConfig = issuers[issuer] as OffChainTokenConfig;
		if (!issuerConfig) {
			logger(3, `No issuer config for "${issuer}" in URL.`)
			return;
		}

		let tokens;


		try {
			if ((new URL(issuerConfig.tokenOrigin)).origin !== document.location.origin){
				// TODO make solution:
				// in case if we have multiple tokens then redirect flow will not work
				// because page will reload on first remote token
				

				let resposeTokensEncoded = this.getDataFromQuery("tokens");
				try {
					tokens = JSON.parse(resposeTokensEncoded);
				} catch (e){
					logger(2, "Error parse tokens from Response. ", e);
				}

			}
		} catch (err) {
			logger(1, "Error read tokens from URL");
			return;
		}

		if (!tokens) {
			logger(2, `No tokens for "${issuer}" in URL.`)
			return;
		}

		logger(2,"readTokensFromUrl tokens:");
		logger(2, tokens);

		this.tokenStore.setTokens(issuer, tokens);


	}

	async setPassiveNegotiationOnChainTokens() {

		let issuers = this.tokenStore.getCurrentIssuers(true);
		let walletProvider = await this.getWalletProvider();

		for (let issuerKey in issuers){

			let issuer: Issuer = issuers[issuerKey];

			try {
				const tokens = await getNftTokens(
					issuer,
					walletProvider.getConnectedWalletData()[0].address
				);

				this.tokenStore.setTokens(issuerKey, tokens);
			} catch (err) {
				logger(2, err);
				this.eventSender.emitErrorToClient(err, issuerKey);
			}
		}
	}

	async passiveNegotiationStrategy() {

		await this.setPassiveNegotiationWebTokens();

		await this.setPassiveNegotiationOnChainTokens();

		let tokens: any = this.tokenStore.getCurrentTokens();

		logger(2, "Emit tokens");
		logger(2, tokens);

		for (let issuer in tokens){
			tokens[issuer] = {tokens: tokens[issuer]};
		}

		this.eventSender.emitAllTokensToClient(tokens);

		// Feature not supported when an end users third party cookies are disabled
		// because the use of a tab requires a user gesture.
		if (this.messaging.core.iframeStorageSupport === false && Object.keys(this.tokenStore.getCurrentTokens(false)).length === 0)
			logger(2,
				"iFrame storage support not detected: Enable popups via your browser to access off-chain tokens with this negotiation type."
			);
	}

	async connectTokenIssuer(issuer: string) {

		const config = this.tokenStore.getCurrentIssuers()[issuer];

		if (!config)
			errorHandler('Undefined token issuer', 'error', null, null, true, true);

		let tokens;

		if (config.onChain === true) {

			let walletProvider = await this.getWalletProvider();

			const walletAddress = walletProvider.getConnectedWalletData()[0]?.address;

			requiredParams(issuer, "issuer is required.");
			requiredParams(walletAddress, "wallet address is missing.");

			tokens = await getNftTokens(config, walletAddress);

		} else {

			if ((new URL(config.tokenOrigin)).origin === document.location.origin){
				tokens = this.loadLocalOutletTokens(config);
			} else {
				tokens = await this.loadRemoteOutletTokens(config);
			}
		}

		this.tokenStore.setTokens(issuer,  tokens);

		if (this.config.autoEnableTokens)
			this.eventSender.emitSelectedTokensToClient(this.tokenStore.getSelectedTokens())

		return tokens;
	}

	private async loadRemoteOutletTokens(issuer: OffChainTokenConfig){

		const data: any = {
			issuer: issuer,
			filter: issuer.filters
		}

		if (issuer.accessRequestType)
			data.access = issuer.accessRequestType;

		let redirectRequired = 
			(browserBlocksIframeStorage() && this.config.type === "passive") 
			|| this.config.forceRedirect;

		const res = await this.messaging.sendMessage(
			{
				action: OutletAction.GET_ISSUER_TOKENS,
				origin: issuer.tokenOrigin,
				data: data
			}, 
			this.config.messagingForceTab, 
			this.config.type === "active" ? this.ui : null,
			redirectRequired ? this.createCurrentUrlWithoutHash() : false
		);

		return res.data?.tokens ?? [];
	}

	private loadLocalOutletTokens(issuer: OffChainTokenConfig){

		const localOutlet = new LocalOutlet((issuer as OutletInterface & OffChainTokenConfig));

		return localOutlet.getTokens();
	}

	updateSelectedTokens(selectedTokens) {
		this.tokenStore.setSelectedTokens(selectedTokens);
		this.eventSender.emitSelectedTokensToClient(selectedTokens);
	}

	checkUserAgentSupportHandler () {
		try {
			return this.checkUserAgentSupport("authentication")
		} catch(err){
			errorHandler(err, 'error', () => this.eventSender.emitErrorToClient(err), null, true, false);
			return;
		}
	}

	async authenticate(authRequest: AuthenticateInterface) {
		this.checkUserAgentSupportHandler();

		const { issuer, unsignedToken } = authRequest;

		requiredParams(
			issuer && unsignedToken,
			"Issuer and unsigned token required."
		);

		if (unsignedToken.signedToken){
			delete unsignedToken.signedToken;
		}

		const config = this.tokenStore.getCurrentIssuers()[issuer];

		if (!config)
			errorHandler("Provided issuer was not found.", 'error', null, null, true, true);

		// TODO: How to handle error display in passive negotiation? Use optional UI or emit errors to listener?

		if (this.ui) {
			this.ui.showLoaderDelayed([
				"<h4>Authenticating...</h4>",
				"<small>You may need to sign a new challenge in your wallet</small>",
				"<button class='cancel-auth-btn btn-tn' aria-label='Cancel authentication'>Cancel</button>"
			], 600, true);
			this.enableAuthCancel(issuer);
		}

		let AuthType;

		if (authRequest.type){
			AuthType = authRequest.type;
		} else {
			AuthType = config.onChain ? SignedUNChallenge : TicketZKProof;
		}

		let authenticator: AuthenticationMethod = new AuthType(this);

		let res;

		try {
			if (!authRequest.options)
				authRequest.options = {};

			authRequest.options.messagingForceTab = this.config.messagingForceTab;

			logger(2, "authRequest", authRequest);
			logger(2, "get proof at ", window.location.href);

			res = await authenticator.getTokenProof(config, [authRequest.unsignedToken], authRequest);

			logger(2, "proof received at ", window.location.href);

			logger(2,"Ticket proof successfully validated.");

			this.eventSender.emitProofToClient(res.data, issuer);

		} catch (err) {
			logger(2,err);

			if (err.message === "WALLET_REQUIRED"){
				return this.handleWalletRequired(authRequest);
			}

			errorHandler(err, 'error', () => this.handleProofError(err, issuer), null, false, true);
		}

		if (this.ui) {
			this.ui.dismissLoader();
			this.ui.closeOverlay();
		}

		return res.data;
	}

	public enableAuthCancel(issuer): void {
		waitForElementToExist('.cancel-auth-btn').then((cancelAuthButton: HTMLElement) => {
			cancelAuthButton.onclick = () => {
				const err = 'User cancelled authentication';
				this.ui.showError(err);
				this.eventSender.emitProofToClient(null, issuer, err);
			}
		});
	}

	private async handleWalletRequired(authRequest){

		if (this.ui) {
			this.ui.dismissLoader();
			this.ui.openOverlay();
		} else {
			// TODO: Show wallet selection modal for passive mode or emit event instead of connecting metamask automatically
			let walletProvider = await this.getWalletProvider();
			await walletProvider.connectWith("MetaMask");
			return this.authenticate(authRequest);
		}

		return new Promise((resolve, reject) => {
			this.ui.updateUI(SelectWallet, {connectCallback: async () => {
				this.ui.updateUI(SelectIssuers);
				try {
					let res = await this.authenticate(authRequest);
					resolve(res);
				} catch (e){
					reject(e);
				}
			}});
		});
	}

	private handleProofError(err, issuer) {
		if (this.ui) this.ui.showError(err);
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
		emitProofToClient: (data: any, issuer: any, error: Error|string = "") => {
			this.on("token-proof", null, { data, issuer, error });
		},
		emitErrorToClient: (error: Error, issuer = "none") => {
			this.on("error", null, {error, issuer});
		},
		emitConnectedWalletInstance: (connectedWallet: any) => {
			this.on("connected-wallet", null, connectedWallet);
		},
		emitDisconnectedWalletInstance: () => {
			this.on("disconnected-wallet", null, null);
		},
		emitNetworkChange: (chain: any) => {
			this.on("network-change", null, chain);
		}
	};

	// is it useful? better remove it, we never use it
	/*
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

		errorHandler(res.errors.join("\n"), 'error', null, false, true);
	}*/

	getOutletConfigForCurrentOrigin(){
		let allIssuers = this.tokenStore.getCurrentIssuers();
		let currentIssuers = [];

		Object.keys(allIssuers).forEach(key => {
			let issuerConfig = allIssuers[key] as OffChainTokenConfig;

			try {

				if (
					(new URL(issuerConfig.tokenOrigin)).origin === document.location.origin 
					// should not be 2 tokens with same origin
					// && issuerConfig.collectionID == issuer
				){
					currentIssuers.push(issuerConfig);
				} 
			} catch (err) {
				logger(2,err);
				console.log("issuer config error");
			}
		})

		if (currentIssuers.length){
			return currentIssuers[0];
		}
		return false;
	}

	onlySameOrigin(){
		let allIssuers = this.tokenStore.getCurrentIssuers();
		let onlySameOriginFlag = true;

		Object.keys(allIssuers).forEach(key => {
			let issuerConfig = allIssuers[key] as OffChainTokenConfig;
			let thisOneSameOrigin = false;
			try {
				if (
					(new URL(issuerConfig.tokenOrigin)).origin === document.location.origin 
				){
					thisOneSameOrigin = true;
				} 
			} catch (err) {
				logger(2,err);
				console.log("issuer config error");
			}

			// if any issuerConfig missing tokenOrigin or something wrong then skip sameOrigin flow
			if (!thisOneSameOrigin) {
				onlySameOriginFlag = false;
			}
		})

		return onlySameOriginFlag;
	}

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
		errorHandler(res.errors.join("\n"), 'error', null, false, true);
	}

	on(type: TokenNegotiatorEvents, callback?: any, data?: any) {
		requiredParams(type, "Event type is not defined");

		// try to read tokens when listener attached
		if((type === 'tokens' || type === 'tokens-selected') && callback){
			this.readTokensFromUrl();
		}

		// read token-proof only when callback attached ( init listener by user )
		if(type === 'token-proof' && callback) {
			logger(2, "token-proof listener atteched. check URL HASH for proof callbacks.");
			
			const action = this.getDataFromQuery("action");
						
			if (action === "proof-callback") {
				this.readProofCallback();
			} else if (action === "email-callback") {

				let currentIssuer = this.getOutletConfigForCurrentOrigin();

				if (currentIssuer){
					logger(2, "Outlet fired to parse URL hash params.");

					let outlet = new Outlet(currentIssuer, true, this.urlParams);			
					outlet.pageOnLoadEventHandler().then(()=>{
						outlet = null;
					});
				}
			}
		}

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

	switchTheme(newTheme: UItheme) {
		this.ui.switchTheme(newTheme);
	}
}
