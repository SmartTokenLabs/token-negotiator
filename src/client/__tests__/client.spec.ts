// @ts-nocheck
import { Client } from "./../index";

function getOffChainConfigClient() {
  return new Client({
    type: "active",
    issuers: [
      {
        collectionID: 'devcon', 
        title: "Devcon",
        onChain: false,
        tokenOrigin: "http://localhost:3002/",
        attestationOrigin: "https://stage.attestation.id/",
        unEndPoint: "https://crypto-verify.herokuapp.com/use-devcon-ticket",
        image: "https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg",
        base64senderPublicKey: "",
        base64attestorPubKey: ""
      }
    ]
  });
}

describe('client spec', () => {

  test('tokenNegotiatorClient a new instance of client', () => {
    const tokenNegotiatorClient = getOffChainConfigClient();
    expect(tokenNegotiatorClient.issuers).toEqual(
      [{
        collectionID: 'devcon', 
        title: "Devcon",
        onChain: false,
        tokenOrigin: "http://localhost:3002/",
        attestationOrigin: "https://stage.attestation.id/",
        unEndPoint: "https://crypto-verify.herokuapp.com/use-devcon-ticket",
        image: "https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg",
        base64senderPublicKey: "",
        base64attestorPubKey: ""
      }]
    );
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
    const tokenNegotiatorClient = getOffChainConfigClient();
    const event = 'tokens-selected';
    tokenNegotiatorClient.on(event, () => {
      console.log(event)
    });
    expect(tokenNegotiatorClient.clientCallBackEvents[event]).toBeDefined();
  });

  test('tokenNegotiatorClient on callback must have an event type', () => {
    const tokenNegotiatorClient = getOffChainConfigClient();
    expect(() => {
      tokenNegotiatorClient.on('')
    }).toThrow('Event type is not defined');
  });

});
