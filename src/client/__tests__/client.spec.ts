// @ts-nocheck
import { Client } from "./../index";

function getSimpleClient() {
  return new Client({
    type: "active",
    issuers: [
      "devcon"
    ]
  });
}

describe('client spec', () => {

  test('tokenNegotiatorClient a new instance of client', () => {
    const tokenNegotiatorClient = getSimpleClient();
    expect(tokenNegotiatorClient.issuers).toEqual(["devcon"]);
  });

  test('tokenNegotiatorClient with valid contract and chain', () => {
    const tokenNegotiatorClient = new Client({
      type: "active",
      issuers: [
        { collectionID: "bayc", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' }
      ],
      options: {}
    });
    expect(tokenNegotiatorClient.issuers[0].chain).toEqual('rinkeby');
  });

  test('tokenNegotiatorClient duplicate collectionID is ignored', () => {
    const tokenNegotiatorClient = new Client({
      type: "active",
      issuers: [
        { collectionID: "bayc", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' },
        { collectionID: "bayc", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'mainnet' }
      ],
      options: {}
    });
    expect(tokenNegotiatorClient.issuers[0].chain).toEqual('rinkeby');
    expect(tokenNegotiatorClient.onChainTokens.tokenKeys.length).toBe(1);
  });

  test('tokenNegotiatorClient a failed new instance of client - missing issuers', () => {
    expect(() => {
      new Client({
        type: 'passive',
        options: {}
      })
    }).toThrow('issuers are missing.');
  });

  test('tokenNegotiatorClient a failed new instance of client - missing type', () => {
    expect(() => {
      new Client({
        type: undefined,
        issuers: [
          "devcon"
        ],
        options: {}
      })
    }).toThrow('type is required.');
  });

  test('tokenNegotiatorClient on callback with event type tokens-selected ', () => {
    const tokenNegotiatorClient = getSimpleClient();
    const event = 'tokens-selected';
    tokenNegotiatorClient.on(event, () => {
      console.log(event)
    });
    expect(tokenNegotiatorClient.clientCallBackEvents[event]).toBeDefined();
  });

  test('tokenNegotiatorClient on callback must have an event type', () => {
    const tokenNegotiatorClient = getSimpleClient();
    expect(() => {
      tokenNegotiatorClient.on('')
    }).toThrow('Event type is not defined');
  });

  // NOTE: As of 20-apr-2022 addTokenThroughIframe method no longer exists
  //
  // test('tokenNegotiatorClient to connect Metamask And Get Address with window eth', async () => {
  //   window.ethereum = () => {};
  //   const tokenNegotiatorClient = new Client({
  //     type: "active",
  //     issuers: [
  //       "devcon"
  //     ],
  //     options: {}
  //   });
  //   document.body.innerHTML = '<div><div style="margin: 0" class="test-app"></div></div>';
  //   tokenNegotiatorClient.addTokenThroughIframe('http://www.coinbase.com');
  // });

});
