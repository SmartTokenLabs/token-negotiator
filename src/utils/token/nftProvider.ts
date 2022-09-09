// @ts-nocheck
import { OnChainTokenConfig, Issuer } from '../../client/interface';

const baseURL = "https://api.token-discovery.tokenscript.org";

export const getNftCollection = async (
  issuer: Issuer,
  ipfsBaseUrl?: string
) => {
  const blockchain = issuer?.blockchain ?? "ethereum";
  let query: string;
  if (blockchain === "solana") {
    query = getSolanaNftCollectionUrl(issuer, ipfsBaseUrl);
	} else {
		query = getEvmNftCollectionUrl(issuer, ipfsBaseUrl);
	}
  return tokenRequest(query, true);
};

const getEvmNftCollectionUrl = (issuer: any, ipfsBaseUrl: string) => {
  const { contract, chain, openSeaSlug } = issuer;
  let query = `${baseURL}/get-token-collection?smartContract=${contract}&chain=${chain}&blockchain=ethereum`;
  if (openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
  if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
  return query;
};

const getSolanaNftCollectionUrl = (issuer: any, ipfsBaseUrl: string) => {
  const { collectionAddress, chain } = issuer;
  let query = `${baseURL}/get-token-collection?collectionAddress=${collectionAddress}&chain=${chain}&blockchain=solana`;
  if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
  return query;
};

export const getNftTokens = (
  issuer: Issuer,
  owner: string,
  ipfsBaseUrl?: string
) => {
	const blockchain = issuer?.blockchain ?? "ethereum";
  let query: string;
  if (blockchain === "solana") {
    query = getSolanaNftTokensUrl(issuer, owner, ipfsBaseUrl);
	} else {
		query = getEvmNftTokensUrl(issuer, owner, ipfsBaseUrl);
	}
  return tokenRequest(query, true);
};

const getEvmNftTokensUrl = (issuer:any, owner:string, ipfsBaseUrl:string) => {
	const { contract, chain, openSeaSlug } = issuer;
  const blockchain = issuer?.blockchain ?? "ethereum";
  let query = `${baseURL}/get-owner-tokens?smartContract=${contract}&chain=${chain}&owner=${owner}&blockchain=${blockchain}`;
  if (openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
	return query;
}

const getSolanaNftTokensUrl = (issuer:any, owner:string, ipfsBaseUrl:string) => {
	const { chain, collectionSymbol } = issuer;
  const blockchain = issuer?.blockchain ?? "ethereum";
  let query = `${baseURL}/get-owner-tokens?chain=${chain}&owner=${owner}&blockchain=${blockchain}`;
  if (collectionSymbol) query += `&collectionSymbol=${collectionSymbol}`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`;
	return query;
}

export const tokenRequest = async (
  query: string,
  silenceRequestError: boolean
) => {
  try {
    const response = await fetch(query);
    const ok = response.status >= 200 && response.status <= 299 ? true : false;
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
