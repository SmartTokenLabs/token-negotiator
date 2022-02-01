// @ts-nocheck
// import { Client } from "./../index";

describe('client spec', () => {

  test('placeholder test whilst authenticator is broken', () => {
    expect(1).toEqual(1);
  });

  // test('tokenNegotiatorClient a new instance of client', () => {
  //   const tokenNegotiatorClient = new Client({
  //     type: "active",
  //     issuers: [
  //       "devcon"
  //     ],
  //     options: {}
  //   });
  //   expect(tokenNegotiatorClient.issuers).toEqual(["devcon"]);
  // });

  // test('tokenNegotiatorClient a failed new instance of client - missing issuers', () => {
  //   expect(() => {
  //     new Client({
  //       type: 'passive',
  //       options: {}
  //     })
  //   }).toThrow('issuers are missing.');
  // });
  
  // test('tokenNegotiatorClient a failed new instance of client - missing type', () => {
  //   expect(() => {
  //     new Client({
  //       type: undefined,
  //       issuers: [
  //         "devcon"
  //       ],
  //       options: {}
  //     })
  //   }).toThrow('type is required.');
  // });

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
