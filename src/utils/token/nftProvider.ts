// @ts-nocheck
import { OnChainTokenConfig } from "../../client/interface";

const baseURL = "https://api.token-discovery.tokenscript.org"

export const getNftCollection = async (
  issuer: OnChainTokenConfig,
	ipfsBaseUrl?: string
) => {
	const { contract, network, openSeaSlug } = issuer;
	const blockchain = issuer?.blockchain ?? "ethereum";
	let query = `${baseURL}/get-token-collection?smartContract=${contract}&network=${network}blockchain=${blockchain}&ipfsBaseUrl=${ipfsBaseUrl}`;
	if(openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
	return tokenRequest(query, true);
};

export const getNftTokens = async (
  issuer: OnChainTokenConfig,
  owner: string,
	ipfsBaseUrl?: string
) => {
	const { contract, network, openSeaSlug } = issuer;
	const blockchain = issuer?.blockchain ?? "ethereum";
	let query = `${baseURL}/get-owner-tokens?smartContract=${contract}&network=${network}&owner=${owner}&blockchain=${blockchain}&ipfsBaseUrl=${ipfsBaseUrl}`;
	if(openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
	return tokenRequest(query, false);
};

export const tokenRequest = async (query:string, silenceRequestError:boolean) => {
	try {
		const response = await fetch(query);
		const ok = (response.status >= 200 && response.status <= 299) ? true : false;
		if (!ok && silenceRequestError === true) { console.warn('token api request failed: ', query); return; }
		if (ok) return response.json();
		else throw new Error(`HTTP error! status: ${response.status}`);		
	} catch (msg:any) {
		throw new Error(`HTTP error.`);
	}
}

