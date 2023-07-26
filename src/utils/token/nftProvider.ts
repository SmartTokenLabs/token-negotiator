import { tokenRequest } from './../index'

import { OnChainTokenConfig, SolanaIssuerConfig, OnChainIssuer, UltraIssuerConfig } from '../../client/interface'
import { validateBlockchain } from '../support/isSupported'

import { JsonRpc } from 'eosjs'

export const BASE_TOKEN_DISCOVERY_URL = 'https://api.token-discovery.tokenscript.org'

export const getNftCollection = async (issuer: OnChainIssuer, ipfsBaseUrl?: string) => {
	let query: string

	if ('blockchain' in issuer && issuer.blockchain === 'ultra') {
		// TODO add some visualisation,
		return { title: `Ultra NFT factory "${issuer['factoryId']}"` }
	} else if ('blockchain' in issuer && issuer.blockchain === 'solana') {
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

// TODO add ultra TOKEN_DISCOVERY service

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

export const getNftTokens = async (issuer: OnChainIssuer, owner: string, ipfsBaseUrl?: string) => {
	let query: string
	if ('blockchain' in issuer && issuer.blockchain === 'ultra') {
		// TODO add to the Discovery Service

		let currentEndpoints: string[] = []
		try {
			const ultraEndpoints = {
				testnet: [
					'https://ultratest-api.eoseoul.io',
					'https://testnet.ultra.eosrio.io',
					'https://test.uos.eosusa.news',
					'https://api.ultra-testnet.cryptolions.io',
					'https://api.testnet.ultra.eossweden.org',
				],
				mainnet: [
					'https://ultra.eosrio.io',
					'https://api.ultra.cryptolions.io',
					'https://ultra-api.eoseoul.io',
					'https://uos.eosusa.news',
					'https://api.ultra.eossweden.org',
				],
			}
			currentEndpoints = ultraEndpoints[issuer.chain]
		} catch(e){
			throw new Error("Cant find endpoint")
		}
		
		let currentEndpointId = 0;
		
		try {

			// TODO add Ultra to the NFT monitoring service
			let result
			let nfts = []
			let lower_bound = 0
			do {
				let params = {
					json: true,
					code: issuer.contract, // "eosio.nft.ft",
					scope: owner,
					table: 'token.a',
					limit: 1,
					lower_bound,
				}
				let is_catched
				
				do {
					try{
						let currentEndpoint = currentEndpoints[currentEndpointId]
						let rpc = new JsonRpc(currentEndpoint, { fetch })
						
						result = await rpc.get_table_rows(params)
						is_catched = false
					} catch (e){
						is_catched = true
						currentEndpointId++
					}
				} while (is_catched && currentEndpointId < currentEndpoints.length) 
				
				lower_bound = result.next_key
				console.log(result.rows)
				if (result.rows.length){
					for (let i = 0; i < result.rows.length; i++) {
						let row = result.rows[i]
						if (row.token_factory_id.toString() === (issuer as UltraIssuerConfig).factoryId.toString()){
							nfts.push({
								blockchain: "ultra",
								collection: issuer.contract,
								description: "",
								image: "",
								symbol: "",
								title: "",
								tokenId: row.id,
								tokenUri: "",
								walletAddress: owner
							})
						}
					}
				}
			} while (result.more)
			return nfts
		} catch (e) {
			console.log( e )
			throw new Error("NFT read error")
 		}
	} else if ('blockchain' in issuer && issuer.blockchain === 'solana') {
		query = getSolanaNftTokensUrl(issuer as SolanaIssuerConfig, owner, ipfsBaseUrl)
	} else if ('blockchain' in issuer && issuer.blockchain === 'flow') {
		query = getFlowNftTokensUrl(issuer, owner)
	} else {
		query = getEvmNftTokensUrl(issuer, owner, ipfsBaseUrl)
	}
	return await tokenRequest(query, true)
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
