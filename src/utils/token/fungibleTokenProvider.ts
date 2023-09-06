import { tokenRequest } from './../index'
import { OnChainIssuer } from '../../client/interface'
import { BASE_TOKEN_DISCOVERY_URL } from './nftProvider'

export const getFungibleTokenBalances = async (issuer: OnChainIssuer, owner: string, ipfsBaseUrl?: string) => {
	const { contract, chain } = issuer
	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-owner-fungible-tokens?collectionAddress=${contract}&owner=${owner}&chain=${chain}&blockchain=${issuer.blockchain ?? 'evm&'}`
	if (issuer.symbol) query += `&symbol=${issuer.symbol}`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	if (issuer.oAuth2options) {
		query = issuer.oAuth2options.endpoints.userBalance.path;
	}
	return tokenRequest(query, true)
}

export const getFungibleTokensMeta = async (issuer: OnChainIssuer, ipfsBaseUrl?: string) => {
	
	const { contract, chain } = issuer

	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-fungible-token?collectionAddress=${contract}&chain=${chain}&blockchain=${
		issuer.blockchain ?? 'evm'
	}`
	if (issuer.symbol) query += `&symbol=${issuer.symbol}`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	return tokenRequest(query, true)
}
