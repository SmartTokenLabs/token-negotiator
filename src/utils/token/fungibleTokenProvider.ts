import { tokenRequest } from './../index';
import { OnChainTokenConfig, SolanaIssuerConfig } from '../../client/interface';

const baseURL = 'https://api.token-discovery.tokenscript.org';


export const getFungibleTokens = async (issuer: any, ipfsBaseUrl?: string) => {
	let query: string;
	if ('blockchain' in issuer && issuer.blockchain === 'solana') {
		query = getSolanaFungibleTokens(issuer as SolanaIssuerConfig, ipfsBaseUrl)
	} else {
		query = getEvmFungibleTokens(issuer as OnChainTokenConfig, ipfsBaseUrl)
	}

	return tokenRequest(query, true);
}

export const getEvmFungibleTokens = (issuer: OnChainTokenConfig, ipfsBaseUrl: string) => {
	const { contract, chain } = issuer
	let query = `${baseURL}/get-fungible-token?owner=${contract}&chain=${chain}&blockchain=evm`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	return query;
}

export const getSolanaFungibleTokens = (issuer: SolanaIssuerConfig, ipfsBaseUrl: string) => {
	const { collectionAddress, chain } = issuer
	let query = `${baseURL}/get-fungible-token?owner=${collectionAddress}&chain=${chain}&blockchain=solana`;
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	return query
}
