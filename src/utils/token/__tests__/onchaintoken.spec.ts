// @ts-nocheck

import { getNftCollection, tokenRequest, getNftTokens } from "./../../../utils/token/nftProvider";

beforeEach(() => {
  fetch.mockClear();
});

const mockZedRun = {
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

it("get nft collection meta from zed run", async () => {
  
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockZedRun) }));

  const meta = await getNftCollection({
    contract: "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656",
    chain: "rinkeby",
    openSeaSlug: "stl-rnd-zed",
  });

  global.fetch.mockClear();
  delete global.fetch;

  expect(meta).toEqual({"assets": [{"collection": {"image_url": "https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656&collection=stl-rnd-zed&order_direction=desc&offset=0&limit=20", "name": "STL RnD Zed"}}]});
});

it("test http fetch success", async () => {
  
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockZedRun) }));

  const reqStr = await tokenRequest("https://api.token-discovery.tokenscript.org/smartcontract=0x123&chain=eth");

  global.fetch.mockClear();
  delete global.fetch;

  expect(reqStr).toEqual({"assets": [{"collection": {"image_url": "https://rinkeby-api.opensea.io/api/v1/assets?asset_contract_address=0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656&collection=stl-rnd-zed&order_direction=desc&offset=0&limit=20", "name": "STL RnD Zed"}}]});
});
