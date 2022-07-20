// @ts-nocheck

import { OnChainTokenModule } from "../index";

function mockFetch(data: any) {
	return jest.fn().mockImplementation(() =>
		Promise.resolve({
			ok: true,
			json: () => data
		})
	);
}

describe('On-chain token module', () => {

	test('getOnChainAPISupportBool should be true for supported APIs and chains', () => {
		const token = new OnChainTokenModule();
		expect(token.getOnChainAPISupportBool('opensea', 'eth')).toBe(true);
		expect(token.getOnChainAPISupportBool('alchemy', 'rinkeby')).toBe(true);
		expect(token.getOnChainAPISupportBool('alchemy', 'polygon')).toBe(true);
	});

	test('getOnChainAPISupportBool should be false for unsupported APIs and chains', () => {
		const token = new OnChainTokenModule();
		expect(token.getOnChainAPISupportBool('nosuchapi', 'eth')).toBe(false);
		expect(token.getOnChainAPISupportBool('opensea', 'nosuchchain')).toBe(false);
	});

	test('getInitialContractAddressMetaData should return OpenSea data', async () => {
		const mockOpenSeaResponse = {
			assets: [
				{
					collection: {
						image_url: 'https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656&collection=stl-rnd-zed&order_direction=desc&offset=0&limit=20',
						name: 'STL RnD Zed'
					}
				}
			]
		}
		global.fetch = mockFetch(mockOpenSeaResponse);
		const token = new OnChainTokenModule();
		const issuer = { collectionID: "c", contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'stl-rnd-zed' }
		const metaData = await token.getInitialContractAddressMetaData(issuer);
		expect(metaData.api).toBe('opensea'); // api property is not currently returned for OpenSea
		expect(metaData.chain).toBe(issuer.chain);
		expect(metaData.contract).toBe(issuer.contract);
		expect(metaData.title).toBe(mockOpenSeaResponse.assets[0].collection.name);
		expect(metaData.image).toBe(mockOpenSeaResponse.assets[0].collection.image_url);
	});

	test('getInitialContractAddressMetaData should return Moralis data', async () => {
		const image = 'https://qaimages.lysto.io/assets/bxrt5/token-book.png';
		const mockMoralisResponse = {
			result: [
				{
					metadata: `{"name":"Membership Token #1","description":"Get Exclusive access to membership club for this NFT","image":"${image}"}`,
					name: 'MaticTest01'
				}
			]
		}
		global.fetch = mockFetch(mockMoralisResponse);
		const token = new OnChainTokenModule();
		const issuer =
      { collectionID: "c", contract: '0x94683E532AA9e5b47EF86bBb2D43b768C76c6C19', chain: 'polygon' }
		const metaData = await token.getInitialContractAddressMetaData(issuer);
		expect(metaData.api).toBe('moralis');
		expect(metaData.chain).toBe(issuer.chain);
		expect(metaData.contract).toBe(issuer.contract);
		expect(metaData.title).toBe(mockMoralisResponse.result[0].name);
		expect(metaData.image).toBe(image);
	});

	test('getInitialContractAddressMetaData should return Alchemy data', async () => {
		const alchemyResponse = {
			nfts: [
				{
					metadata: {
						image: 'https://theinternet.com/alchemy-nft.jpg',
					},
					title: 'Alchemy NFT'
				}
			]
		}
		global.fetch = mockFetch( alchemyResponse);
		const token = new OnChainTokenModule();
		const issuer =
      { collectionID: "c", contract: '0x94683E532AA9e5b47EF86bBb2D43b768C76c6C19', chain: 'eth' } // Chain not supported on Moralis, ensuring Alchemy is used
		const metaData = await token.getInitialContractAddressMetaData(issuer);
		expect(metaData.api).toBe('alchemy');
		expect(metaData.chain).toBe(issuer.chain);
		expect(metaData.contract).toBe(issuer.contract);
		expect(metaData.title).toBe(alchemyResponse.nfts[0].title);
		expect(metaData.image).toBe(alchemyResponse.nfts[0].metadata.image);
	});

	test('getInitialContractAddressMetaData should return undefined for unrecognised issuer', async () => {
		const token = new OnChainTokenModule();
		const issuer =
      { collectionID: "c", contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'nosuchchain', openSeaSlug: 'stl-rnd-zed' }
		expect(await token.getInitialContractAddressMetaData(issuer)).toBe(null);
	});
	
	test('validateTokenMetadata is true when token holds all required data', async () => {
		const onChainMod = new OnChainTokenModule();
		const mockMoralisResponse = {
    	"16461": {
        "api": "moralis",
        "tokenId": "16461",
        "title": "ExpansionPunk #16461",
        "image": "https://expansionpunks.mypinata.cloud/ipfs/QmaopicL9xSveFUTeuxj4iQDVBKgdg5k3b2iGkHaMzsK6b/punk16461.png",
        "data": {
            "name": "ExpansionPunk #16461",
            "attributes": [
                {
                    "trait_type": "Type",
                    "value": "Male"
                },
                {
                    "trait_type": "Skin Tone",
                    "value": "Medium"
                },
                {
                    "trait_type": "Attribute Count",
                    "value": "3 Attributes"
                },
                {
                    "trait_type": "Hair",
                    "value": "Shaved Head"
                },
                {
                    "trait_type": "Facial Hair",
                    "value": "Shadow Beard"
                },
                {
                    "trait_type": "Mouth Prop",
                    "value": "Pipe"
                },
                {
                    "trait_type": "Name",
                    "value": "ExpansionPunk #16461"
                }
            ],
            "description": "ExpansionPunk #16461 has arrived to expand the Punkverse to be more diverse and inclusive, while respecting the ethos of the CryptoPunks collection.",
            "external_url": "https://expansionpunks.com/punk/16461",
            "image": "https://expansionpunks.mypinata.cloud/ipfs/QmaopicL9xSveFUTeuxj4iQDVBKgdg5k3b2iGkHaMzsK6b/punk16461.png"
					}
        }
			}
		expect(onChainMod.validateTokenMetadata(mockMoralisResponse)).toBe(true);
	});

	test('validateTokenMetadata is true when token holds empty title and image path', async () => {
		const onChainMod = new OnChainTokenModule();
		const mockMoralisResponse = {
			"16461": {
        "api": "moralis",
        "tokenId": "16461",
        "title": "",
        "image": "https://expansionpunks.mypinata.cloud/ipfs/QmaopicL9xSveFUTeuxj4iQDVBKgdg5k3b2iGkHaMzsK6b/punk16461.png"
			}
		}
		expect(onChainMod.validateTokenMetadata(mockMoralisResponse)).toBe(true);
	});


});
