// @ts-nocheck
import { Client } from "./../../client/index";

describe('client spec', () => {
  test('tokenNegotiatorClient a new instance of client', () => {
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    expect(tokenNegotiatorClient.config.localStorageEthKeyItemName).toEqual("dcEthKeys");
    expect(tokenNegotiatorClient.config.tokenName).toEqual("devcon-ticket");
    expect(tokenNegotiatorClient.config.tokenOverlayOrigin).toEqual("https://tokenscript.github.io/token-negotiator-examples/github-pages-use-only/token-overlay-website/build/index.html");
  });
  
  test('tokenNegotiatorClient a failed new instance of client', () => {
    expect(() => {
      new Client({ tokenName: undefined, filter: {}, options: {} })
    }).toThrow('Please provide token name.');
  });
  
  test('tokenNegotiatorClient a failed new instance of client', () => {
    expect(() => {
      new Client({ tokenName: undefined, filter: {}, options: { useOverlay: true }});
    }).toThrow('Please provide token name.');
  });
  
  test('tokenNegotiatorClient a failed new instance of client overlay', () => {
    expect(() => {
      new Client({ tokenName: 'devcon-ticket', filter: {}, options: { useOverlay: true }});
    }).toThrow('tokenSelectorContainer is a required parameter when useOverlay is true.');
  });
  
  test('tokenNegotiatorClient to negotiate tokens via overlay', async () => {
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    tokenNegotiatorClient.negotiate();
  });
  
  test('tokenNegotiatorClient to negotiate tokens via overlay', async () => {
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: { useOverlay: true, tokenSelectorContainer: '.test' }});
    tokenNegotiatorClient.negotiate();
  });
  
  test('tokenNegotiatorClient to negotiate tokens via overlay', async () => {
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    tokenNegotiatorClient.negotiateViaOverlay();
  });
        
  test('tokenNegotiatorClient to connect Metamask And Get Address with window eth', async () => {
    window.ethereum = () => {};
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    document.body.innerHTML = '<div><div style="margin: 0" class="test-app"></div></div>';
    tokenNegotiatorClient.addTokenThroughIframe('http://www.coinbase.com');
  });
  
  test('tokenNegotiatorClient to connect Metamask And Get Address with window eth', async () => {
    window.ethereum = () => {};
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    document.body.innerHTML = '<div><div style="margin: 0" class="test-app"></div></div>';
    var date = new Date();
    tokenNegotiatorClient.ethKeyIsValid({ etokenNegotiatorClientpiry: date.setDate(date.getDate() - 1) });
  });
  
  test('tokenNegotiatorClient to fail fetching un', async () => {
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    tokenNegotiatorClient.getUnpredictableNumber(undefined);
  });

  it('returns un', async () => {
    var date = new Date();
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ 
          number: 23443432423,
          randomness: 234434,
          domain: '',
          expiration: (date.getDate() + 1),
          messageToSign: ''
         }),
      })
    );
    const res = await tokenNegotiatorClient.getUnpredictableNumber("www.google.com");
    expect(res.number).toEqual(23443432423);
  });
    
  test('tokenNegotiatorClient to validation of use Eth Key', async () => {
    const tokenNegotiatorClient = new Client({ tokenName: 'devcon-ticket', filter: {}, options: {} });
    tokenNegotiatorClient.validateUseEthKey(undefined, null);
  });
  
});
