# token-negotiator

<!--
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftokenscript%2Ftoken-negotiator%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/tokenscript/token-negotiator/goto?ref=main)
-->

The Token Negotiator is an open source tool designed towards building the tokenised web. Where new types of experience can be created based around the ownership and use of tokens.

The following types of tokens are supported:

- Cryptographically created Tokens (Off Chain)

- Web3 NFT Tokens (On Chain)

(for new token issuers who are interested in using our technology please visit the following WIKI page: https://github.com/TokenScript/token-negotiator/wiki/Token-Issuer-Page).

### Token Negotiator supports Tokens across the following Chains

- mainnet / eth
- polygon
- arbitrum 
- optimism
- rinkeby
- ropsten
- goerli
- kovan
- bsc
- mumbai
- avalanche
- fantom
- POAP via XDai

## Installation

Within your application install the token negotiator:

NPM
```sh
  npm i @tokenscript/token-negotiator
```

Browser build
```html
  <script type="text/javascript" src="./token-negotiator-dist/negotiator.js"></script>
  <link rel="stylesheet" href="./token-negotiator-dist/theme/style.css" />
```

## Reading Tokens into a website or web application.

This library provides two ways to load tokens into your application, active or passive. 

### Active Negotiation of tokens

This approach embeds a html element UI widget into the web page. 

As the web developer you can configure which collections are supported by your website to provide custom experiences to token holders. 

Token holders can then attest ownership of tokens within collections, to access custom tokenised web experiences you design. 

<img src="https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/tn-example.png" alt="token negotiator component" style="width:280px;"/>

To start, first include the following html element into your page, this is where the token negotiator overlay widget will be embedded into the page.

````html
  <div class="overlay-tn"></div>
````

Add the library and styles for the UI component.

```javascript
  import { Client } from '@tokenscript/token-negotiator';
  import "@tokenscript/token-negotiator/dist/theme/style.css";
```

Include the following Javascript to configure the Token Negotiator with issuers that your website will recognise. 

```javascript
  
  import { Client } from '@tokenscript/token-negotiator';
  
  const filter = {};

  let tokens = [];

  // configure
  const negotiator = new Client({
    type: 'active',
    issuers: [
        {
          collectionID: 'devcon', 
          title: "Devcon",
          onChain: false,
          tokenOrigin: "http://localhost:3002/",
          attestationOrigin: "https://attestation.id/",
          unEndPoint: "https://crypto-verify.herokuapp.com/use-devcon-ticket",
          image: "https://raw.githubusercontent.com/TokenScript/token-negotiator/main/mock-images/devcon.svg",
          base64senderPublicKey: "",
          base64attestorPubKey: ""
        },
        { collectionID: 'expansion-punks', contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37', chain: 'eth' }
    ],
    options: {
      overlay: {
          openingHeading: "Open a new world of discounts available with your tokens.",
          issuerHeading: "Get discount with Ticket",
          repeatAction: "try again",
          theme: "light",
          position: "bottom-right"
      },
      filters: {},
      unSupportedUserAgent: {
          config: {
              // options to test against : ["iE", "iE9", "edge", "chrome", "phantomJS", "fireFox", "safari", "android", "iOS", "mac", "windows", "webView", "touchDevice", "metaMask", "alphaWallet", "mew", "trust", "goWallet", "status", "imToken", "metaMaskAndroid", "alphaWalletAndroid", "mewAndroid", "imTokenAndroid"];
              metaMaskAndroid: true,
              alphaWalletAndroid: true,
              mewAndroid: true,
              imTokenAndroid: true,
          }
      }
    }
  });

  // invoke

  negotiator.negotiate();

  // event hooks

  negotiator.on("tokens-selected", (tokens) => { 
    
    // use tokens

  });

  negotiator.on("token-proof", (proof) => { 
          
    // use proof

  });

```
### Passive Negotiation of tokens

This approach is designed for a fully custom ui/ux experience, where a list of all tokens are learnt by the client on negotiation.

````javascript

  import { Client } from '@tokenscript/token-negotiator';

  const negotiator = new Client({
    type: 'passive',
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
      },
      { collectionID: 'expansion-punks', contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37', chain: 'eth' }
    ],
    options: {}
  });

  negotiator.on('tokens', (issuerTokens) => {
    
    // use tokens

  });

  negotiator.on("token-proof", (tokenProof) => {

    // use proof

  });
  
  // invoke

  negotiator.negotiate();
  
````

### Managing Issuers on chain


````javascript

  /**
  * @param {String} collectionID your own reference key to identify the collection by.
  * @param {String} contract smart contract address
  * @param {String} chain smart contract address chain 
  * @param {String} openSeaSlug (optional) add collection uri name if the collection features on Opensea
  */
  const onChainIssuer = { collectionID: 'expansion-punks', contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37', chain: 'eth', openSeaSlug: 'expansion-punks' }

````

### Managing Issuers off chain


````javascript
  
  /**
  * @param {String} collectionID your own reference key to identify the collection by.
  * @param {String} title the token collection config uri
  * @param {Boolean} onChain boolean if this token is on / off chain 
  * @param {String} tokenOrigin URL to token attestations
  * @param {String} attestationOrigin attestation server
  * @param {String} unEndPoint unpredictable number generator
  * @param {String} image image for collection
  * @param {String} base64senderPublicKey attestation public key
  * @param {String} base64attestorPubKey attestation public key
  * 
  */
  const offChainIssuer = { 
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
  
````

### Authenticate ownership of off chain Token

Authenticating ownership of the token will provide a proof with a limited expiry.

````javascript

  /**
  * @param {String} issuer token issuer
  * @param {Object} unsignedToken token to attest
  */
  negotiator.authenticate({ 
    issuer, 
    unsignedToken 
  });

  negotiator.on('proof', () => {

    // the proof will be received here (valid or failed)

  });

````

### For projects where you are not using a Node.js work flow.

1. Go to the following URL: https://github.com/TokenScript/token-negotiator

2. Download and then install this folder into your project `/token-negotiator-dist`

Configure the library using the following example.

````html

  <script type="text/javascript" src="./token-negotiator-dist/negotiator.js"></script>
  <link rel="stylesheet" href="./token-negotiator-dist/theme/style.css" />

  <body onload="init()">

    <div class="overlay-tn"></div>
    
    <script>

        function init() {

            window.negotiator = new negotiator.Client({
                type: 'active',
                issuers: [
                    { collectionID: "rinkeby-punks", contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'rinkeby-punk' },
                    { collectionID: "stl-rnd-women-tribe", contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'stl-rnd-women-tribe-nfts' },
                    { collectionID: "stl-rnd-zed-run", contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'stl-rnd-zed' },
                    { collectionID: "stl-rnd-bayc-derivatives", contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'stl-rnd-bayc-derivatives' },
                    { collectionID: "stl-riot-racers", contract: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656', chain: 'rinkeby', openSeaSlug: 'stl-rnd-riot-racers' }
                ],
                options: {
                    overlay: {
                    openingHeading: "Open a new world of discounts available with your tokens.",
                    issuerHeading: "Get discount with Ticket",
                    repeatAction: "try again",
                    theme: "light",
                    position: "bottom-right"
                    },
                    filters: {},
                }
            });

            window.negotiator.on("tokens-selected", (tokens) => {
                console.log(tokens);
            });

            window.negotiator.on("token-proof", (proof) => {
                console.log(proof);
            });

            window.negotiator.negotiate();

        }

    </script>


````

## filters

Key values applied to all tokens.

````javascript

  filter: {
    'devconId': 6,
    'ticketId': 417541561854,
    'class': '7'
  }

````

## Token Issuers

```javascript
import { client, outlet } from '@tokenscript/token-negotiator';
```

For off chain token issuers, there is an additional module within the Token Negotiator named { outlet } used to safely store, decode and dispatch token meta data to the client module (in page or cross origin).

A mock token implementation can be found here: https://github.com/TokenScript/token-negotiator-examples/tree/main/token-outlet-website/src

## New Token Issuers

Please reach out to us at <sayhi@smarttokenlabs.com>

## Tests

run `npm run test`

## Development of this library.

[Development WIKI](https://github.com/TokenScript/token-negotiator/wiki/developers)

### Help / Questions / Improvements

Please contact us or open an issue via github:
sayhi@smarttokenlabs.com

### Quick Start with Vue, React or Svelte

https://github.com/TokenScript/token-negotiator/wiki/quick-start-Vue

https://github.com/TokenScript/token-negotiator/wiki/quick-start-React

https://github.com/TokenScript/token-negotiator/wiki/quick-start-Svelte

### Examples

To review demo examples of the token negotiator please visit:

[Token Negotiator Examples](https://github.com/TokenScript/token-negotiator-examples)

### Roadmap of this library

[Our Roadmap](https://github.com/TokenScript/token-negotiator/wiki/road-map)
