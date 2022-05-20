import {OffChainTokenConfig, OnChainTokenConfig} from "./interface";
import {ContractData} from "../onChainTokenModule";
import {logger} from "../utils";

interface TokenLookup {
	[collectionID: string]: OnChainTokenConfig | OffChainTokenConfig | ContractData
}

type TokenConfig = OnChainTokenConfig | OffChainTokenConfig;

export class TokenStore {

	private currentIssuers: string[] = [];
	// TODO: Cache token data? Example: user is navigating around single page application. Some page loads token data, the same token is requested by a another page.
	// 	Instead of reloading tokens again, use cached data. this would require getOff/OnChainTokens functions to filter according current issuers.
	//  We could also store this data in local storage to speed up loading on sites that are not a SPA.
	// TODO: merge these data structures?
	private offChainTokens: any = {tokenKeys: []};
	private onChainTokens: any = {tokenKeys: []};
	// Cached issuer data for contract level metadata
	private tokenLookup: TokenLookup = {};
	// TODO: change to disabled tokens
	private selectedTokens: any = {};
	private updatedCallbacks: {[id: string]: Function} = {}
	private autoEnableTokens: boolean;

	constructor(autoEnableTokens: boolean){
		this.autoEnableTokens = autoEnableTokens;
	}

	public updateIssuers(issuers: TokenConfig[]){

		if (this.currentIssuers.length > 0) {
			this.offChainTokens = {tokenKeys: []};
			this.onChainTokens = {tokenKeys: []};
		}

		this.currentIssuers = this.prePopulateTokenLookupStore(issuers);

		for (let i in this.updatedCallbacks){
			this.updatedCallbacks[i]();
		}
	}

	public registerIssuerUpdateHook(id: string, callback: Function){
		this.updatedCallbacks[id] = callback;
	}

	public getCurrentIssuers(){
		let current: TokenLookup = {};
		for (let collectionId of this.currentIssuers){
			current[collectionId] = this.tokenLookup[collectionId];
		}
		return current
	}

	public getOnChainTokens(){
		return this.onChainTokens;
	}

	public setOnChainTokens(issuer: string, tokens: any[]){
		this.onChainTokens[issuer].tokens = tokens;

		if (this.autoEnableTokens)
			this.selectedTokens[issuer] = { tokens: tokens }
	}

	public getOffChainTokens(){
		return this.offChainTokens;
	}

	public setOffChainTokens(issuer: string, tokens: any[]){
		this.offChainTokens[issuer].tokens = tokens;

		if (this.autoEnableTokens)
			this.selectedTokens[issuer] = { tokens: tokens }
	}

	public getSelectedTokens(){
		return this.selectedTokens;
	}

	public setSelectedTokens(selectedTokens: any){
		this.selectedTokens = selectedTokens;
	}

	private prePopulateTokenLookupStore(issuers: TokenConfig[]): string[] {

		let collectionIds: string[] = [];

		issuers.forEach((issuer: TokenConfig, i ) => {
			if (!issuer.collectionID) return;

			issuer.collectionID = this.formatCollectionID(issuer.collectionID);

			if ("contract" in issuer && "chain" in issuer) {
				issuer.chain = this.formatCollectionChain(issuer.chain);

				if (this.onChainTokens[issuer.collectionID]) {
					logger(1, `duplicate collectionID key ${issuer.collectionID}, use unique keys per collection.`);
					return;
				}

				this.onChainTokens.tokenKeys.push(issuer.collectionID);

				this.onChainTokens[issuer.collectionID] = { tokens: [] };
			} else {
				this.offChainTokens.tokenKeys.push(issuer.collectionID);

				this.offChainTokens[issuer.collectionID] = { tokens: [] };
			}

			// Don't overwrite config of existing/cached issuers
			if (!this.tokenLookup[issuer.collectionID])
				this.updateTokenLookupStore(issuer.collectionID, issuer);

			collectionIds.push(issuer.collectionID)
		});

		return collectionIds;
	}

	// To enrich the token lookup store with data.
	// for on chain tokens that are not using token script this is
	// required, for off chain this is most likely not required because the configurations
	// are already pre-defined e.g. title, issuer image image etc.
	public updateTokenLookupStore(tokenKey: string, data: OnChainTokenConfig | OffChainTokenConfig | ContractData) {

		this.tokenLookup[tokenKey] = { ...this.tokenLookup[tokenKey], ...data };
	}

	private formatCollectionChain(chain: string) {
		return chain.toLowerCase();
	}

	private formatCollectionID(collectionID: string) {
		let formatedCollectionID = collectionID;

		if (/[A-Z]+/g.test(collectionID) || /\s+/g.test(collectionID)) {
			formatedCollectionID = collectionID.replace(/\s+/g, "-").toLowerCase();

			logger(1, `Token Negotiator: Spaces or capital letters found in collectionID definition ${collectionID}, this has been re-formatted to ${formatedCollectionID}`);

			collectionID = formatedCollectionID;
		}

		return collectionID;
	}
}