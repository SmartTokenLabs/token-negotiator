# token-negotiator 

The token-negotiator is an NPM package designed for use with TokenScript. 

TokenScript is a framework which improves functionality, security and usability of blockchain token. It creates a layer between a blockchain and user devices, adding information, rules and functionalites both onchain and offchain. 

For more information please visit: [https://tokenscript.org/](tokenscript.org).

## Examples

https://tokenscript.github.io/token-negotiator/examples/

## Documentation

[guides and deployment](https://tokenscript.org/guides/Intro.html)

## Installation and usage

There are 2 locations that require the token-negotiator to be installed (As a consumer of a token, you will only need to follow the client steps).

1. Token Issuers Web Application.
2. Client Web Applications that utilise tokens. 

For all use cases, install the token-negotiator. From there we will share the steps to configure the pacakge for both the Token Issuer and Client.

```sh
npm i @alphawallet/token-negotiator
```

## Client: Installation

The client installation provides two solutions to bringing tokens into your website, web app or dapp. 

### Active Client Negotiation of tokens

This approach is designed with security in mind where the client website will not learn about the tokens
until the end user has selected them via an iframe to the Token Issuers domain. 

```javascript
  
  import { Client } from 'token-negotiator';
  
  const filter = {};

  let tokens = [];

  const tokenName = "devcon-ticket";

  const options = { useOverlay: true, tokenSelectorContainer: ".tokenSelectorContainerElement" };

  const negotiator = new Client(filter, tokenName, options);

  this.state = { negotiator: window.negotiator };

  negotiator.negotiate();

  window.addEventListener('message', (event) => {
    switch(event.data.evt) {
      case 'setSelectedTokens':
        tokens = event.data.selectedTokens;
        break;
    }
  }, false);
```
### Passive Client Negotiation of tokens

This approach is designed for a fully custom ui/ux experience, where a list of all tokens are learnt by the client on negotation. 

````javascript

  import { Client } from 'token-negotiator';

  let tokens = [];

  const filter = { 'devconId': 6 };

  const tokenName = "devcon-ticket";

  const options = {};
  
  const negotiator = new Client(filter, tokenName, options);

  negotiator.negotiate().then(result => {
    if(tokens){
      tokens = result;
    }
    }).catch((err) => {
      console.log('error', err);
    }
  );

````

### Negotiator Client Module API

````javascript

 /**
  * @param {Object} filter { 'devconId': 6, 'class': 'gold' } (optional rule to fiter tokens by keys and values - this acts as a simple filter where you cannot at this time filter many from the same key).
  * @param {String} tokenName token name identifier to negotiate 
  * @param {Object} options
  * @param {Boolean} options[useOverlay] optional rule to use token issuer overlay
  * @param {Object} options[tokenSelectorContainer] HTML Selector location to inject token issuer overlay when use overlay is set as true
  */
 negotiator.negotiate(
   filter,
   tokenName,
   options
 )

````
### Negotiator Client Authenticate ownership of Token

At the stage of negotiation, the client has learnt about the tokens which can be used to provide soft features such as
what discount could be applied with ownership of a token or entry to a VIP lounge for browsing purposes. The Token Negotiator can be then used to attest that the end user has ownership rights to the token, via the authenticate method.

```javascript

  /**
  * @param {URL} unEndPoint end point that returns the following JSON payload { un: number, expiry: date }
  * @param {object} unsignedToken token to attest
  * @returns {object} { ethKey (object), proof (object) }
  */
  const { useToken, useEthKey } = await negotiator.authenticate({ 
    unEndPoint, 
    unsignedToken 
  });


```

## Token Issuer: Installation 

The token issuer installation provides two ways for the consumers to acquire tokens - using the following process.
### Overlay: Installation

The overlay web component acts as an intermediatry component between the client and token outlet (explained below). Where a client will connect with an overlay to retrieve selected tokens.

The token issuer should create a web directory location for this component. 

The styles.css can be updated to reflect the Token Issuers brand (branding, token design).
 
````javascript
  
  import { Overlay } from 'token-negotiator';

  import "./theme/style.css";

  new Modal();

````

### Token outlet: Installation 

The token outlet is the location in which tokens are stored and dispatched. The Token Negotiator is flexible, where you can install both the overlay and outlet modules in the same location, or separate. 
 
````javascript
  
  import { Outlet } from 'token-negotiator';

  new Outlet({
    tokenUrlName: 'ticket',
    tokenSecretName: 'secret',
    tokenIdName: 'id',
    localStorageItemName: 'dcTokens'
  });

````

### Negotiator Token Outlet Module API

````javascript

  /**
  * @param {string} tokenUrlName name of the token to be read from a magic link
  * @param {String} tokenSecretName a secret that can be used to decode a token
  * @param {String} tokenIdName ticket identifier data e.g. email address
  * @param {String} localStorageItemName location to store tokens
  */
  new Outlet({
    tokenUrlName: 'ticket',
    tokenSecretName: 'secret',
    tokenIdName: 'id',
    localStorageItemName: 'dcTokens'
  });

````

### Help / Questions / Improvements

Please contact us or open an issue via github:
Alphawallet <info@alphawallet.com>

For working examples please visit and see readme for local setup:
https://tokenscript.github.io/token-negotiator/examples/

