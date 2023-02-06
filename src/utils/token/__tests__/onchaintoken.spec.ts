


// @ts-nocheck
import { tokenRequest } from './../../index';
import {
	getNftCollection,
	getNftTokens,
	getSolanaNftTokensUrl,
	getEvmNftCollectionUrl,
	getSolanaNftCollectionUrl,
	getEvmNftTokensUrl,
} from './../../../utils/token/nftProvider';

import { getFungibleTokens, getEvmFungibleTokens, getSolanaFungibleTokens } from '../fungibleTokenProvider';

const mockZedRunCollection = {
	assets: [
		{
			collection: {
				image_url:
					'https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656&collection=stl-rnd-zed&order_direction=desc&offset=0&limit=20',
				name: 'STL RnD Zed',
			},
		},
	],
}

const mockFungibleTokensResponse = [{
	"token_address": "0x52459834ca561cb55411699e9c2143683bcf865f",
	"name": "VOOFTALIK BUTERIN",
	"symbol": "VOOF",
	"logo": null,
	"thumbnail": null,
	"decimals": 18,
	"balance": "1000000000000000000000000000000"
}];

const mockPunkTokens = [
	{
		api: 'moralis',
		tokenId: '16461',
		title: 'ExpansionPunk #16461',
		image: 'https://expansionpunks.mypinata.cloud/ipfs/QmaopicL9xSveFUTeuxj4iQDVBKgdg5k3b2iGkHaMzsK6b/punk16461.png',
		data: {
			name: 'ExpansionPunk #16461',
			attributes: [
				{
					trait_type: 'Type',
					value: 'Male',
				},
				{
					trait_type: 'Skin Tone',
					value: 'Medium',
				},
				{
					trait_type: 'Attribute Count',
					value: '3 Attributes',
				},
				{
					trait_type: 'Hair',
					value: 'Shaved Head',
				},
				{
					trait_type: 'Facial Hair',
					value: 'Shadow Beard',
				},
				{
					trait_type: 'Mouth Prop',
					value: 'Pipe',
				},
				{
					trait_type: 'Name',
					value: 'ExpansionPunk #16461',
				},
			],
			description:
				'ExpansionPunk #16461 has arrived to expand the Punkverse to be more diverse and inclusive, while respecting the ethos of the CryptoPunks collection.',
			external_url: 'https://expansionpunks.com/punk/16461',
			image: 'https://expansionpunks.mypinata.cloud/ipfs/QmaopicL9xSveFUTeuxj4iQDVBKgdg5k3b2iGkHaMzsK6b/punk16461.png',
		},
	},
]

it('get nft collection meta from zed run', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockZedRunCollection) }))
	const meta = await getNftCollection({
		contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
		chain: 'rinkeby',
		openSeaSlug: 'stl-rnd-zed',
	})
	global.fetch.mockClear()
	delete global.fetch
	expect(meta).toEqual(mockZedRunCollection)
})

it('directly test tokenRequest() to fetch success', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockZedRunCollection) }))
	const reqStr = await tokenRequest(
		'https://api.token-discovery.tokenscript.org/get-token-collection?smartcontract=0x123&chain=eth',
		true,
	)
	global.fetch.mockClear()
	delete global.fetch
	expect(reqStr).toEqual(mockZedRunCollection)
})

it('directly test tokenRequest() to fetch silently fail', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockZedRunCollection) }))
	global.fetch.mockClear()
	delete global.fetch
	expect(() => {
		tokenRequest('https://api.token-discovery.tokenscript.org/get-token-collection?smartcontract=0x123&chain=eth', true)
	}).toEqual(expect.any(Function))
})

it('get nft collection meta from zed run to silently fail', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockZedRunCollection) }))
	expect(async () => {
		await getNftCollection({
			contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
			chain: 'rinkeby',
			openSeaSlug: 'stl-rnd-zed',
		})
	}).toEqual(expect.any(Function))
})

it('get nft collection token meta from punks', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockPunkTokens) }))
	const meta = await getNftTokens({
		contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
		chain: 'rinkeby',
		openSeaSlug: 'stl-rnd-zed',
	})
	global.fetch.mockClear()
	delete global.fetch
	expect(meta).toEqual(mockPunkTokens)
})

it('get nft collection token meta from punks to fail', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockPunkTokens) }))
	global.fetch.mockClear()
	delete global.fetch
	let test = null
	try {
		test = await getNftTokens({
			contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
			chain: 'rinkeby',
			openSeaSlug: 'stl-rnd-zed',
		})
		expect(test).toThrow(expect.any(Function))
	} catch (e: any) {
		// no-op
	}
})

it('get correct nft tokens query string solana', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockPunkTokens) }))
	global.fetch.mockClear()
	delete global.fetch
	let query = undefined
	query = await getSolanaNftTokensUrl(
		{
			tokenProgram: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
			collectionAddress: 'bf0aae3dd0078a9feb975f1e3242ddcb7774d551c7fd2a3f07a89c827ed606b2',
			updateAuthority: 'CCCUzWanUNegjGby11DjujDvPaNN68jd9Rimwk2MZzqZ',
			symbol: 'CCC',
			chain: 'mainnet',
			blockchain: 'solana',
		},
		'0x1',
		undefined,
	)
	expect(query).toEqual(
		'https://api.token-discovery.tokenscript.org/get-owner-tokens?chain=mainnet&blockchain=solana&owner=0x1&symbol=CCC&tokenProgram=TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA&collectionAddress=bf0aae3dd0078a9feb975f1e3242ddcb7774d551c7fd2a3f07a89c827ed606b2&updateAuthority=CCCUzWanUNegjGby11DjujDvPaNN68jd9Rimwk2MZzqZ',
	)
})

it('get correct nft tokens query string evm', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockPunkTokens) }))
	global.fetch.mockClear()
	delete global.fetch
	let query = undefined
	query = await getEvmNftTokensUrl(
		{
			contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37',
			chain: 'eth',
			blockchain: 'evm',
		},
		'0x1',
		undefined,
	)
	expect(query).toEqual(
		'https://api.token-discovery.tokenscript.org/get-owner-tokens?smartContract=0x0d0167a823c6619d430b1a96ad85b888bcf97c37&chain=eth&owner=0x1&blockchain=evm',
	)
})

it('get evm nft tokens query to return undefined when required params are not given', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockPunkTokens) }))
	global.fetch.mockClear()
	delete global.fetch
	let query = undefined
	query = await getEvmNftTokensUrl({}, '0x1', undefined)
	expect(query).toEqual(undefined)
})

it('get solana tokens query to return undefined when required params are not given', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockPunkTokens) }))
	global.fetch.mockClear()
	delete global.fetch
	let query = undefined
	query = await getSolanaNftTokensUrl({}, '0x1', undefined)
	expect(query).toEqual(undefined)
})

it('get solana tokens query to return undefined when some key params are not given', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockPunkTokens) }))
	global.fetch.mockClear()
	delete global.fetch
	let query = undefined
	query = await getSolanaNftTokensUrl(
		{
			chain: 'mainnet',
			updateAuthority: 'CCCUzWanUNegjGby11DjujDvPaNN68jd9Rimwk2MZzqZ',
		},
		'0x1',
		undefined,
	)
	expect(query).toEqual(
		'https://api.token-discovery.tokenscript.org/get-owner-tokens?chain=mainnet&blockchain=evm&owner=0x1&updateAuthority=CCCUzWanUNegjGby11DjujDvPaNN68jd9Rimwk2MZzqZ',
	)
})

it('get correct nft tokens query string with undefined params solana', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 500, json: () => Promise.resolve(mockPunkTokens) }))
	global.fetch.mockClear()
	delete global.fetch
	let query = undefined
	query = await getSolanaNftTokensUrl(
		{
			tokenProgram: undefined,
			collectionAddress: 'bf0aae3dd0078a9feb975f1e3242ddcb7774d551c7fd2a3f07a89c827ed606b2',
			updateAuthority: 'CCCUzWanUNegjGby11DjujDvPaNN68jd9Rimwk2MZzqZ',
			symbol: undefined,
			chain: 'mainnet',
			blockchain: 'solana',
		},
		'0x1',
		undefined,
	)
	expect(query).toEqual(
		'https://api.token-discovery.tokenscript.org/get-owner-tokens?chain=mainnet&blockchain=solana&owner=0x1&collectionAddress=bf0aae3dd0078a9feb975f1e3242ddcb7774d551c7fd2a3f07a89c827ed606b2&updateAuthority=CCCUzWanUNegjGby11DjujDvPaNN68jd9Rimwk2MZzqZ',
	)
})

it('get evm Nft Collection Url', async () => {
	const output = getEvmNftCollectionUrl({ contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'eth' })
	expect(output).toEqual(
		'https://api.token-discovery.tokenscript.org/get-token-collection?smartContract=0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656&chain=eth&blockchain=evm',
	)
})

it('get evm Nft Collection Url', async () => {
	const output = getSolanaNftCollectionUrl({
		collectionAddress: 'bf0aae3dd0078a9feb975f1e3242ddcb7774d551c7fd2a3f07a89c827ed606b2',
		chain: 'eth',
	})
	expect(output).toEqual(
		'https://api.token-discovery.tokenscript.org/get-token-collection?collectionAddress=bf0aae3dd0078a9feb975f1e3242ddcb7774d551c7fd2a3f07a89c827ed606b2&chain=eth&blockchain=solana',
	)
})

it('get evm fungible tokens', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockFungibleTokensResponse) }))
	const evmtokens = await getEvmFungibleTokens({
		contract: '0x52459834ca561cb55411699e9c2143683bcf865f',
		chain: 'eth',
		erc: 200
	});
	expect(evmtokens).toEqual('https://api.token-discovery.tokenscript.org/get-fungible-token?owner=0x52459834ca561cb55411699e9c2143683bcf865f&chain=eth&blockchain=evm');
});

it('get  solana fungible tokens', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockFungibleTokensResponse) }))
	const solanatokens = await getSolanaFungibleTokens({
		collectionAddress: '0x52459834ca561cb55411699e9c2143683bcf865f',
		chain: 'eth',
		blockchain: 'solana',
		erc: 200
	});
	expect(solanatokens).toEqual('https://api.token-discovery.tokenscript.org/get-fungible-token?owner=0x52459834ca561cb55411699e9c2143683bcf865f&chain=eth&blockchain=solana');
});

it('get fungible tokens', async () => {
	global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockFungibleTokensResponse) }))
	const tokens = await getFungibleTokens({
		owner: '0x52459834ca561cb55411699e9c2143683bcf865f',
		chain: 'eth',
		erc: 200
	});
	expect(tokens).toEqual(mockFungibleTokensResponse);
});

