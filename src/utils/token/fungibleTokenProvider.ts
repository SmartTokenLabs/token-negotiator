import { tokenRequest } from './../index'
import {Issuer, OnChainIssuer, OnChainTokenConfig, SolanaIssuerConfig} from '../../client/interface'
import {BASE_TOKEN_DISCOVERY_URL} from "./nftProvider";

export const getFungibleTokenBalances = async (issuer: OnChainIssuer, owner: string, ipfsBaseUrl?: string) => {
	const { contract, chain } = issuer

	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-owner-fungible-tokens?collectionAddress=${contract}&owner=${owner}&chain=${chain}&blockchain=${issuer.blockchain ?? "evm"}`
	if (issuer.symbol) query += `&symbol=${issuer.symbol}`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`

	return tokenRequest(query, true)
}

export const getFungibleTokensMeta = async (issuer: OnChainIssuer, ipfsBaseUrl?: string) => {
	const { contract, chain } = issuer

	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-fungible-token?collectionAddress=${contract}&chain=${chain}&blockchain=${issuer.blockchain ?? "evm"}`
	if (issuer.symbol) query += `&symbol=${issuer.symbol}`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`

	return tokenRequest(query, true)
}
