import { OnChainTokenConfig } from "../../client/interface";

const baseURL = "https://api.token-discovery.tokenscript.org"

export const getNftCollection = async (
  issuer: OnChainTokenConfig
) => {
	const { contract, chain, openSeaSlug } = issuer;
	let query = `${baseURL}/get-token-collection?smartContract=${contract}&chain=${chain}`;
	if(openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
	return tokenRequest(query);
};

export const getNftTokens = async (
  issuer: OnChainTokenConfig,
  owner: string
) => {
	const { contract, chain, openSeaSlug } = issuer;
	let query = `${baseURL}/get-owner-tokens?smartContract=${contract}&chain=${chain}&owner=${owner}`;
	if(openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
	return tokenRequest(query);
};

export const tokenRequest = async (query:string) => {
	try {
		const response = await fetch(query);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		return response.json();  
	} catch (msg:any) {
		throw new Error(`HTTP error!`);
	}
}
