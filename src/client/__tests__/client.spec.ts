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

	test('tokenNegotiatorClient getTokenData', () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		const output = tokenNegotiatorClient.getTokenStore();
		expect(output).toEqual({
			offChainTokens: {
				"devcon": {
					"tokens": [],
				},
				"tokenKeys": [
					"devcon",
				],
			},
			onChainTokens: {
				tokenKeys: [],
			},
			tokenLookup: {
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
				},
			},
			selectedTokens: {}
		});
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
  
	test('tokenNegotiatorClient method checkPublicAddressMatch to return failed check data', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		const output = await tokenNegotiatorClient.checkPublicAddressMatch("devcon", null);
		expect(output).toEqual({ status: false, useEthKey: null, proof: null });
	});
  
	test('tokenNegotiatorClient method checkPublicAddressMatch to throw error', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		return tokenNegotiatorClient.checkPublicAddressMatch("devcon", { fake: "data" }).catch(err => {
			expect(err).toEqual(new Error("MetaMask is not available. Please check the extension is supported and active."));
		});
	});

	test('tokenNegotiatorClient method eventSender event hook functions', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		tokenNegotiatorClient.eventSender.emitAllTokensToClient([]);
		tokenNegotiatorClient.eventSender.emitSelectedTokensToClient();
		tokenNegotiatorClient.eventSender.emitProofToClient('test', 'devcon');
	});
  
	test('tokenNegotiatorClient method getOffChainConfigClient', async () => {
		const tokenNegotiatorClient = getOffChainConfigClient();
		return tokenNegotiatorClient.connectOnChainTokenIssuer('bayc').catch(err => {
			expect(err).toEqual(new Error("wallet address is missing."));
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
		expect((tokenNegotiatorClient.onChainTokens["b-a-y-c"]) ? true : false).toEqual(true);
		expect(tokenNegotiatorClient.tokenLookup["b-a-y-c"].chain).toEqual("rinkeby");
	});
	
	test('tokenNegotiatorClient method formatCollectionChain chain with uppercase chars', async () => {
		const tokenNegotiatorClient = new Client({
			type: "active",
			issuers: [
				{ collectionID: "bayc", contract: '0x26472AA24D795AbcB687bddb44d733ef55Ebdf09', chain: 'RINKEBY' }
			],
			options: {}
		});
		expect(tokenNegotiatorClient.tokenLookup["bayc"].chain).toEqual("rinkeby");
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
