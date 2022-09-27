import {defaultConfig, OutletInterface, readSignedTicket} from "./index";
import {decodeTokens, filterTokens, rawTokenCheck} from "../core";
import {AuthHandler} from "./auth-handler";
import {OffChainTokenConfig} from "../client/interface";

export class LocalOutlet {

	private tokenConfig;

	constructor(config: OutletInterface & OffChainTokenConfig) {
		this.tokenConfig = Object.assign(defaultConfig, config);

		// set default tokenReader
		if (!this.tokenConfig.tokenParser) {
			this.tokenConfig.tokenParser = readSignedTicket;
		}
	}

	getTokens(){

		const storageTokens = localStorage.getItem(this.tokenConfig.itemStorageKey);

		if (!storageTokens) return [];

		const decodedTokens = decodeTokens(
			storageTokens,
			this.tokenConfig.tokenParser,
			this.tokenConfig.unsignedTokenDataName,
			true
		);

		return filterTokens(decodedTokens, this.tokenConfig.filter);
	}

	/* async authenticate(unsignedToken: any){

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
	}*/

}