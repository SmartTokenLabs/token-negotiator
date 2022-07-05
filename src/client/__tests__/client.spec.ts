// @ts-nocheck
import { Client } from "../index";

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

		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()).toEqual({
			"devcon": {
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
		});
	});

	test('tokenNegotiatorClient getTokenStore Data', () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		const store = tokenNegotiatorClient.getTokenStore();

		expect(store.getCurrentTokens(false)).toEqual({
			"devcon": []
		});

		expect(store.getCurrentTokens(true)).toEqual({});

		expect(store.getCurrentIssuers()).toEqual({
			"devcon": {
				"attestationOrigin": "https://stage.attestation.id/",
				"base64attestorPubKey": "",
				"base64senderPublicKey": "",
				"collectionID": "devcon",
				"image": "https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg",
				"onChain": false,
				"title": "Devcon",
				"tokenOrigin": "http://localhost:3002/",
				"unEndPoint": "https://crypto-verify.herokuapp.com/use-devcon-ticket",
			}
		});

		expect(store.getSelectedTokens()).toEqual({});
	});

	test('tokenNegotiatorClient with valid contract and chain', () => {
		const tokenNegotiatorClient = new Client({
			type: "active",
			issuers: [
				{ collectionID: "bayc", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' }
			],
			options: {}
		});
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()["bayc"].chain).toEqual('rinkeby');
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
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()["bayc"].chain).toEqual('rinkeby');
		expect(Object.keys(tokenNegotiatorClient.getTokenStore().getCurrentTokens()).length).toBe(1);
	});

	test('tokenNegotiatorClient a failed new instance of client - missing issuers', () => {

		let client = new Client({
			type: 'passive',
			options: {}
		});

		return client.negotiate().catch((e) => {
			expect(e).toEqual(new Error('issuers are missing.'));
		});
	});

	test('tokenNegotiatorClient on callback with event type tokens-selected ', () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		const event = 'tokens-selected';
		tokenNegotiatorClient.on(event, () => {
			logger(2, event)
		});
		expect(tokenNegotiatorClient.clientCallBackEvents[event]).toBeDefined();
	});

	test('tokenNegotiatorClient on callback must have an event type', () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		expect(() => {
			tokenNegotiatorClient.on('')
		}).toThrow('Event type is not defined');
	});
  
	/* test('tokenNegotiatorClient method checkPublicAddressMatch to throw error', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		return tokenNegotiatorClient.getAddressChallenge(Challenge.DEFAULT_ENDPOINT).catch(err => {
			expect(err).toEqual(new Error("MetaMask is not available. Please check the extension is supported and active."));
		});
	});*/

	test('tokenNegotiatorClient method eventSender event hook functions', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		tokenNegotiatorClient.eventSender.emitAllTokensToClient([]);
		tokenNegotiatorClient.eventSender.emitSelectedTokensToClient();
		tokenNegotiatorClient.eventSender.emitProofToClient('test', 'devcon');
	});
  
	test('tokenNegotiatorClient method connectTokenIssuer with unknown issuer', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		return tokenNegotiatorClient.connectTokenIssuer('bayc').catch(err => {
			expect(err).toEqual(new Error("Undefined token issuer"));
		});
	});
  
	test('tokenNegotiatorClient method updateSelectedTokens', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient(); 
		tokenNegotiatorClient.updateSelectedTokens({'devcon': { "a": 'true' }});
	});
	
	test('tokenNegotiatorClient method formatCollectionID collection with uppercase chars and spaces', async () => {
		const tokenNegotiatorClient = new Client({
			type: "active",
			issuers: [
				{ collectionID: "B a Y c", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'rinkeby' }
			],
			options: {}
		});
		expect(!!(tokenNegotiatorClient.getTokenStore().getCurrentTokens()["b-a-y-c"])).toEqual(true);
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()["b-a-y-c"].chain).toEqual("rinkeby");
	});
	
	test('tokenNegotiatorClient method formatCollectionChain chain with uppercase chars', async () => {
		const tokenNegotiatorClient = new Client({
			type: "active",
			issuers: [
				{ collectionID: "bayc", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'RINKEBY' }
			],
			options: {}
		});
		expect(tokenNegotiatorClient.getTokenStore().getCurrentIssuers()["bayc"].chain).toEqual("rinkeby");
	});

	// TOOD Mock response from window
	// test('tokenNegotiatorClient method addTokenViaMagicLink to succeed in collection of tokens', async () => {
	//   window.open = jest.fn({
	//     data: { 
	//       evt: "issuer-tokens"
	//     },
	//     tokens: [
	//       { 
	//         class: "web3",  
	//         colour: "gold",
	//         vip: "true"
	//       }
	//     ]
	//   });
	//   const tokenNegotiatorClient = getOffChainConfigClient();
	//   const output = await tokenNegotiatorClient.addTokenViaMagicLink("https://en.wikipedia.org/wiki/Gavin_Wood?ticket=test&secret=test&id=test");
	//   expect(output).toEqual({});
	// });
  
});
