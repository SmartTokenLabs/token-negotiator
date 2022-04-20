import { OnChainTokenModule } from "../index";

describe('On-chain token module', () => {

  test('getOnChainAPISupportBool should be true for supported APIs and chains', () => {
    const token = new OnChainTokenModule();
    expect(token.getOnChainAPISupportBool('opensea', 'eth')).toBe(true);
    expect(token.getOnChainAPISupportBool('alchemy', 'polygon')).toBe(true);
  });

  test('getOnChainAPISupportBool should be false for unsupported APIs and chains', () => {
    const token = new OnChainTokenModule();
    expect(token.getOnChainAPISupportBool('nosuchapi', 'eth')).toBe(false);
    expect(token.getOnChainAPISupportBool('opensea', 'nosuchchain')).toBe(false);
  });

});
