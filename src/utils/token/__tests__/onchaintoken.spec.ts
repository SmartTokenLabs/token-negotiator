// @ts-nocheck

import { getNftCollection, tokenRequest, getNftTokens } from "./../../../utils/token/nftProvider";

const mockZedRunCollection = {
  assets: 
  [
    {
      collection: {
        image_url:
          "https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656&collection=stl-rnd-zed&order_direction=desc&offset=0&limit=20",
        name: "STL RnD Zed",
      },
    },
  ]
}

const mockPunkTokens = 
  [
    {
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
  ];

it("get nft collection meta from zed run", async () => {
  global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockZedRunCollection) }));
  const meta = await getNftCollection({ contract: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656", chain: "rinkeby", openSeaSlug: "stl-rnd-zed" });
  global.fetch.mockClear();
  delete global.fetch;
  expect(meta).toEqual(mockZedRunCollection);
});

it("directly test tokenRequest() to fetch success", async () => {
  global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockZedRunCollection) }));
  const reqStr = await tokenRequest("https://api.token-discovery.tokenscript.org/get-token-collection?smartcontract=0x123&chain=eth");
  global.fetch.mockClear();
  delete global.fetch;
  expect(reqStr).toEqual(mockZedRunCollection);
});

it("get nft collection token meta from punks", async () => {
  global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve(mockPunkTokens) }));
  const meta = await getNftTokens({ contract: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656", chain: "rinkeby", openSeaSlug: "stl-rnd-zed" });
  global.fetch.mockClear();
  delete global.fetch;
  expect(meta).toEqual(mockPunkTokens);
});


