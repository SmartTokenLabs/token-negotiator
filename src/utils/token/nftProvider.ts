import { tokenRequest } from './../index'

import { OnChainTokenConfig, SolanaIssuerConfig, OnChainIssuer } from '../../client/interface'
import { validateBlockchain } from '../support/isSupported'

export const BASE_TOKEN_DISCOVERY_URL = 'http://localhost:3000'

export const getNftCollection = async (issuer: OnChainIssuer, ipfsBaseUrl?: string) => {
	let query: string

	if ('blockchain' in issuer && issuer.blockchain === 'solana') {
		query = getSolanaNftCollectionUrl(issuer as SolanaIssuerConfig, ipfsBaseUrl)
	} else if ('blockchain' in issuer && issuer.blockchain === 'flow') {
		query = getFlowNftCollectionUrl(issuer)
	} else {
		query = getEvmNftCollectionUrl(issuer, ipfsBaseUrl)
	}

	return tokenRequest(query, true)
}

export const getEvmNftCollectionUrl = (issuer: OnChainTokenConfig, ipfsBaseUrl: string) => {
	const { contract, chain, openSeaSlug } = issuer
	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-token-collection?smartContract=${contract}&chain=${chain}&blockchain=evm`
	if (openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	return query
}

export const getSolanaNftCollectionUrl = (issuer: SolanaIssuerConfig, ipfsBaseUrl: string) => {
	const { collectionAddress, chain } = issuer
	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-token-collection?collectionAddress=${collectionAddress}&chain=${chain}&blockchain=solana`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	return query
}

export const getFlowNftCollectionUrl = (issuer: OnChainTokenConfig) => {
	const { contract, chain } = issuer
	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-token-collection?smartContract=${contract}&chain=${chain}&blockchain=flow`
	return query
}

export const getNftTokens = (issuer: OnChainIssuer, owner: string, ipfsBaseUrl?: string) => {
	let query: string
	if ('blockchain' in issuer && issuer.blockchain === 'solana') {
		query = getSolanaNftTokensUrl(issuer as SolanaIssuerConfig, owner, ipfsBaseUrl)
	} else if ('blockchain' in issuer && issuer.blockchain === 'flow') {
		query = getFlowNftTokensUrl(issuer, owner)
	} else {
		query = getEvmNftTokensUrl(issuer, owner, ipfsBaseUrl)
	}
	return tokenRequest(query, true)
}

export const getEvmNftTokensUrl = (issuer: OnChainTokenConfig, owner: string, ipfsBaseUrl: string) => {
	const { contract, chain, openSeaSlug } = issuer
	const blockchain = validateBlockchain(issuer?.blockchain ?? '')
	if (!contract || !chain) return undefined
	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-owner-tokens?smartContract=${contract}&chain=${chain}&owner=${owner}&blockchain=${blockchain}`
	if (openSeaSlug) query += `&openSeaSlug=${openSeaSlug}`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	return query
}

export const getSolanaNftTokensUrl = (issuer: SolanaIssuerConfig, owner: string, ipfsBaseUrl: string) => {
	const { chain, tokenProgram, collectionAddress, updateAuthority, symbol } = issuer
	const blockchain = validateBlockchain(issuer?.blockchain ?? '')
	if (!chain && (!tokenProgram || !collectionAddress || !updateAuthority || !symbol)) return undefined
	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-owner-tokens?chain=${chain}&blockchain=${blockchain}`
	if (owner) query += `&owner=${owner}`
	if (symbol) query += `&symbol=${symbol}`
	if (ipfsBaseUrl) query += `&ipfsBaseUrl=${ipfsBaseUrl}`
	if (tokenProgram) query += `&tokenProgram=${tokenProgram}`
	if (collectionAddress) query += `&collectionAddress=${collectionAddress}`
	if (updateAuthority) query += `&updateAuthority=${updateAuthority}`
	return query
}

export const getFlowNftTokensUrl = (issuer: OnChainIssuer, owner: string) => {
	const { contract, chain } = issuer
	const blockchain = validateBlockchain(issuer?.blockchain ?? '')
	if (!contract || !chain) return undefined
	let query = `${BASE_TOKEN_DISCOVERY_URL}/get-owner-tokens?smartContract=${contract}&chain=${chain}&owner=${owner}&blockchain=${blockchain}`
	return query
}
