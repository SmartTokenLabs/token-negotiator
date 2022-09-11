
import { OnChainTokenConfig, Issuer, SolanaIssuerConfig, IssuerConfigInterface } from '../../client/interface';


const baseURL = "https://api.token-discovery.tokenscript.org";

export const getNftCollection = async (
	issuer: Issuer,
	ipfsBaseUrl?: string
) => {
	let query: string;
  
	if ('blockchain' in issuer && issuer.blockchain === "solana") {
		query = getSolanaNftCollectionUrl(issuer as SolanaIssuerConfig, ipfsBaseUrl);
	} else {
		query = getEvmNftCollectionUrl(issuer as OnChainTokenConfig, ipfsBaseUrl);
	}

	return tokenRequest(query, true);
};

export const getEvmNftCollectionUrl = (issuer: OnChainTokenConfig, ipfsBaseUrl: string) => {
	const {contract, chain, openSeaSlug} = issuer;
	let query = `${baseURL}/get-token-collection?smartContract=${contract}&chain=${chain}&blockchain=evm`;
	if (openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
	return query;
};

export const getSolanaNftCollectionUrl = (issuer: SolanaIssuerConfig, ipfsBaseUrl: string) => {
	const {collectionAddress, chain} = issuer;
	let query = `${baseURL}/get-token-collection?collectionAddress=${collectionAddress}&chain=${chain}&blockchain=solana`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
	return query;
};

export const getNftTokens = (
	issuer: Issuer,
	owner: string,
	ipfsBaseUrl?: string
) => {
	let query: string;
	if ('blockchain' in issuer && issuer.blockchain === "solana") {
		query = getSolanaNftTokensUrl(issuer as SolanaIssuerConfig, owner, ipfsBaseUrl);
	} else {
		query = getEvmNftTokensUrl(issuer, owner, ipfsBaseUrl);
	}
	return tokenRequest(query, true);
};

export const getEvmNftTokensUrl = (
	issuer: any,
	owner: string,
	ipfsBaseUrl: string
) => {
	const { contract, chain, openSeaSlug } = issuer;
	const blockchain = issuer?.blockchain ?? "evm";
	if(!contract || !chain) return undefined;
	let query = `${baseURL}/get-owner-tokens?smartContract=${contract}&chain=${chain}&owner=${owner}&blockchain=${blockchain}`;
	if (openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
	return query;
};

export const getSolanaNftTokensUrl = (
	issuer: SolanaIssuerConfig,
	owner: string,
	ipfsBaseUrl: string
) => {
	const {
		chain,
		tokenProgram,
		collectionAddress,
		updateAuthority,
		symbol,
	} = issuer;
	const blockchain = issuer?.blockchain ?? "evm";
	if(!chain && (!tokenProgram || !collectionAddress || !updateAuthority || !symbol)) return undefined;
	let query = `${baseURL}/get-owner-tokens?chain=${chain}&blockchain=${blockchain}`;
	if (owner) query += `&owner=${owner}`;
	if (symbol) query += `&symbol=${symbol}`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
	if (tokenProgram) query += `&tokenProgram=${tokenProgram}`;
	if (collectionAddress) query += `&collectionAddress=${collectionAddress}`;
	if (updateAuthority) query += `&updateAuthority=${updateAuthority}`;
	return query;
};

export const tokenRequest = async (
	query: string,
	silenceRequestError: boolean
) => {
	try {
		const response = await fetch(query);
		const ok = response.status >= 200 && response.status <= 299;
		if (!ok && silenceRequestError === true) {
			console.warn("token api request failed: ", query);
			return;
		}
		if (ok) return response.json();
		else throw new Error(`HTTP error! status: ${response.status}`);
	} catch (msg: any) {
		throw new Error(`HTTP error.`);
	}
};
