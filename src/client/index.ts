// @ts-nocheck
import {Messaging, MessageAction, MessageResponseAction} from "./messaging";
import { Popup } from './popup';
import {asyncHandle, logger, requiredParams} from './../utils/index';
import {connectMetamaskAndGetAddress, getChallengeSigned, validateUseEthKey} from "../core/index";
import {OffChainTokenConfig, OnChainTokenConfig, tokenLookup} from './../tokenLookup';
import OnChainTokenModule from './../onChainTokenModule'
import Web3WalletProvider from './../utils/Web3WalletProvider';
import "./../theme/style.css";
import './../vendor/keyShape';

interface NegotiationInterface {
    type: string;
    issuers: OnChainTokenConfig|OffChainTokenConfig[];
    options: any;
}

declare global {
    interface Window {
        KeyshapeJS?: any;
        tokenToggleSelection: any;
        Authenticator: any;
        ethereum: any;
    }
}

interface AuthenticateInterface {
    issuer: any;
    unsignedToken: any;
}

export class Client {

    issuers: any[];
    type: string;
    filter: {};
    options: any;
    offChainTokens: any;
    onChainTokens: any;
    tokenLookup: any;
    selectedTokens: any;
    web3WalletProvider:any;
    messaging:Messaging;
    popup:Popup;

    constructor(config: NegotiationInterface) {

        const { type, issuers, options, filter } = config;

        requiredParams(type, 'type is required.');

        requiredParams(issuers, 'issuers are missing.');

        // TODO: Remove token lookup and use issuers instead - pretty much the same data
        this.tokenLookup = tokenLookup;

        this.type = type;

        this.options = options;

        this.filter = filter ? filter : {};

        this.issuers = issuers;

        this.offChainTokens = { tokenKeys: [] };

        this.onChainTokens = { tokenKeys: [] };

        this.selectedTokens = {};

        this.clientCallBackEvents = {};

        // apply data for view when active mode

        /*

            this.onChainTokens / this.offChainTokens: {
                tokenKeys: ['devcon', '0x...'],
                devcon: { 
                    tokens: [] 
                }
            }

        */

        this.prePopulateTokenLookupStore(issuers);

        // currently custom to Token Negotiator
        this.web3WalletProvider = new Web3WalletProvider();

        // on chain token manager module
        this.onChainTokenModule = new OnChainTokenModule();

        this.messaging = new Messaging();

        document.onclick = function (e) {

        }

    }

    prePopulateTokenLookupStore = (issuers:any) => {

        issuers.forEach((issuer: any) => {

            // create key with address and chain for easy reference
            let issuerKey = issuer.collectionID; 

            // Populate the token lookup store with initial data.
            this.updateTokenLookupStore(issuerKey, issuer);

            if((issuer.contract) && (issuer.chain)) {

                // stop duplicate entries
                if(this.onChainTokens[issuerKey]) return;

                // add onchain token (non-tokenscipt)
                this.onChainTokens.tokenKeys.push(issuerKey);

                // add empty tokens list (non-tokenscript)
                this.onChainTokens[issuerKey] = { tokens: [] };

            } else {
                
                // off chain token attestations 

                this.offChainTokens.tokenKeys.push(issuer.collectionID);

                this.offChainTokens[issuer.collectionID] = { tokens: [] };

            }

        });
    }
    
    getTokenData(){
        return {
            offChainTokens: this.offChainTokens,
            onChainTokens: this.onChainTokens,
            tokenLookup: this.tokenLookup,
            selectedTokens: this.selectedTokens
        };
    }

    // To enrich the token lookup store with data.
    // for on chain tokens that are not using token script this is 
    // required, for off chain this is most likely not required because the configurations
    // are already pre-defined e.g. title, issuer image image etc.
    updateTokenLookupStore(tokenKey, data) {

        if(!this.tokenLookup[tokenKey]) this.tokenLookup[tokenKey] = {};

        this.tokenLookup[tokenKey] = { ...this.tokenLookup[tokenKey], ...data };

    }

    async negotiatorConnectToWallet (walletType:string) {
    
        let walletAddress = await this.web3WalletProvider.connectWith(walletType);

        logger('wallet address found: ' + walletAddress);

        return walletAddress;

    }

    async setPassiveNegotiationWebTokens(offChainTokens: any) {

        await Promise.all(offChainTokens.tokenKeys.map(async (issuer: string): Promise<any> => {

            let data;

            const tokensOrigin = this.tokenLookup[issuer].tokenOrigin;

            try {
                data = await this.messaging.sendMessage({
                    issuer: issuer,
                    action: MessageAction.GET_ISSUER_TOKENS,
                    filter: this.filter,
                    origin: tokensOrigin
                });
            } catch (err){
                console.log(err);
                return;
            }

            console.log("tokens:");
            console.log(data.tokens);

            this.offChainTokens[issuer].tokens = data.tokens;

            return;

        }));

    }

    async enrichTokenLookupDataOffChainTokens(offChainTokens: any) {

        // TODO: Fetch offline token config from ticket issuer url
        /*await Promise.all(offChainTokens.tokenKeys.map(async (issuerKey: string): Promise<any> => {

            return fetch(`${this.tokenLookup[issuerKey].tokenConfigURI}`, {})
            .then(response => response.json())
            .then(response => {
                this.updateTokenLookupStore(issuerKey, response);
            })
            .catch(err => console.error(err));

        }));*/

    }

    async enrichTokenLookupDataOnChainTokens(onChainTokens: any) {

        await Promise.all(onChainTokens.tokenKeys.map(async (issuerKey: string): Promise<any> => {

            let lookupData = await this.onChainTokenModule.getInitialContractAddressMetaData(this.tokenLookup[issuerKey]);

            if (lookupData) {

                lookupData.onChain = true;

                // enrich the tokenLookup store with contract meta data
                this.updateTokenLookupStore(issuerKey, lookupData);
            }

        }));
    
    }

    async negotiate() {

        /*
            ------------------------------
            blockchain token reader module
            ------------------------------
        
            * await this.setBlockchainTokens(this.onChainTokens);
        */

        // if storage support - embed iframe for active and passive negotiation flows.
        // else open with window each time.

        // Enrich the look up data with the accepted on chain tokens
        await this.enrichTokenLookupDataOnChainTokens(this.onChainTokens);
        await this.enrichTokenLookupDataOffChainTokens(this.offChainTokens);

        if (this.type === 'active') {

            this.activeNegotiationStrategy();

        } else {

            if(window.ethereum) await this.web3WalletProvider.connectWith('MetaMask');

            this.passiveNegotiationStrategy();

        }

    }

    async activeNegotiationStrategy() {

        setTimeout(() => {

            this.popup = new Popup(this.options?.overlay, this);
            this.popup.initialize();

        }, 0);

    }

    async setPassiveNegotiationOnChainTokens (onChainTokens: any) {

        await Promise.all(onChainTokens.tokenKeys.map(async (issuerKey: string): Promise<any> => {

            const issuer = this.tokenLookup[issuerKey];

            const tokens = await this.onChainTokenModule.connectOnChainToken(
                issuer,
                this.web3WalletProvider.getConnectedWalletData()[0].address
            );

            this.onChainTokens[issuerKey].tokens = tokens;

        }));

    }

    async passiveNegotiationStrategy() {

        // Feature not supported when an end users third party cookies are disabled
        // because the use of a tab requires a user gesture.
        // TODO: this check should be skipped if there is no offchain tokens
        //       if there are offchain tokens, but there are also onchain tokens, show loaded tokens along with an error/warning message?

        let canUsePassive = false;

        if (this.offChainTokens.tokenKeys.length){
            canUsePassive = await this.messaging.getCookieSupport(this.tokenLookup[this.offChainTokens.tokenKeys[0]]?.tokenOrigin);
        }

        if (canUsePassive) {

            await asyncHandle(this.setPassiveNegotiationWebTokens(this.offChainTokens));
            await asyncHandle(this.setPassiveNegotiationOnChainTokens(this.onChainTokens));

            let outputOnChain = JSON.parse(JSON.stringify(this.onChainTokens));

            delete outputOnChain.tokenKeys;

            let outputOffChain = JSON.parse(JSON.stringify(this.offChainTokens));

            delete outputOffChain.tokenKeys;

            console.log("Emit tokens");
            console.log(outputOffChain);

            this.eventSender.emitAllTokensToClient({ ...outputOffChain, ...outputOnChain });

        } else {

            logger('Enable 3rd party cookies via your browser settings to use this negotiation type.');

        }

    }

    async connectTokenIssuer(issuer:string) : Promise<any[]> {

        const filter = this.filter ? this.filter : {};
        const tokensOrigin = this.tokenLookup[issuer].tokenOrigin;

        if (this.tokenLookup[issuer].onChain){
            return this.connectOnChainTokenIssuer(this.tokenLookup[issuer]);
        }

        let data = await this.messaging.sendMessage({
            issuer: issuer,
            action: MessageAction.GET_ISSUER_TOKENS,
            origin: tokensOrigin,
            filter: filter,
        });

        this.offChainTokens[issuer].tokens = data.tokens;

        return data.tokens;
    }

    async connectOnChainTokenIssuer (issuer:any) : Promise<any[]> {

        const tokens = await this.onChainTokenModule.connectOnChainToken(
            issuer,
            this.web3WalletProvider.getConnectedWalletData()[0].address
        );

        this.onChainTokens[issuer.collectionID].tokens = tokens;

        return tokens;
    }

    updateSelectedTokens(selectedTokens){

        this.selectedTokens = selectedTokens;

        this.eventSender.emitSelectedTokensToClient();
    }

    async authenticate(config: AuthenticateInterface) {
 
        const { issuer, unsignedToken } = config;
        const tokensOrigin = this.tokenLookup[issuer].tokenOrigin;

        requiredParams((issuer && unsignedToken), { status: false, useEthKey: null, proof: null });

        // TODO: How to handle error display in passive negotiation? Use optional UI or emit errors to listener?
        if (this.popup)
            this.popup.showLoader(
                "<h4>Authenticating...</h4>",
                "<small>You may need to sign a new challenge in your wallet</small>"
            );

        try {
            const addressMatch = await this.checkPublicAddressMatch(issuer, unsignedToken);

            // e.g. create warning notification inside overlay.
            if(!addressMatch) {
                if (this.popup)
                    this.popup.showError("Address does not match.");
                return;
            }

            let data = await this.messaging.sendMessage({
                issuer: issuer,
                action: MessageAction.GET_PROOF,
                origin: tokensOrigin,
                token: unsignedToken,
                timeout: 0 // Don't time out on this event as it needs active input from the user
            });

            this.eventSender.emitProofToClient(data.proof, data.issuer);
        } catch (err){
            console.log(err);
            if (this.popup)
                this.popup.showError(err);
            return;
        }

        if (this.popup)
            this.popup.dismissLoader();
    }

    async checkPublicAddressMatch (issuer:string, unsignedToken:any) {

        const { unEndPoint, onChain } = tokenLookup[issuer];

        if (onChain === true || !unsignedToken || !unEndPoint) return { status: false, useEthKey: null, proof: null };

        try {

            let useEthKey = await getChallengeSigned(tokenLookup[issuer], this.web3WalletProvider);

            const attestedAddress = await validateUseEthKey(unEndPoint, useEthKey);

            const walletAddress = await connectMetamaskAndGetAddress();

            if (walletAddress.toLowerCase() !== attestedAddress.toLowerCase()) throw new Error('useEthKey validation failed.');

            return true;

        } catch (e) {

            requiredParams(null, "Could not authenticate token");

        }

    }

    eventSender = {
        emitAllTokensToClient: (tokens:any) => {

            this.on("tokens", null, tokens);

        },
        emitSelectedTokensToClient: () => {

            this.on("tokens-selected", null, { selectedTokens: this.selectedTokens });

        },
        emitProofToClient: (proof: any, issuer: any) => {

            this.on("token-proof", null, { proof: proof, issuer: issuer });

        }
    }

    async addTokenViaMagicLink(magicLink: any) {

        let url = new URL(magicLink);
        let params = url.hash.length > 1 ? url.hash.substring(1) : url.search.substring(1);

        let data = await this.messaging.sendMessage({
            action: MessageAction.MAGIC_URL,
            urlParams: params,
            origin: url.origin + url.pathname
        });

        if (data.evt == MessageResponseAction.ISSUER_TOKENS)
            return data.tokens;

        throw new Error(data.errors.join("\n"));
    }

    on (type:string, callback?:any, data?:any) {

        requiredParams(type, "Event type is not defined");

        if (callback) {

            // assign callback reference to web developers event e.g. negotiator.on('tokens', (tokensForWebPage) => { ... }));
            
            this.clientCallBackEvents[type] = callback;

        } else {

            // event types: 'tokens', 'tokens-selected', 'proof'

            if(this.clientCallBackEvents[type]) {
             
                return this.clientCallBackEvents[type].call(type, data);

            }

        }

    }

}
