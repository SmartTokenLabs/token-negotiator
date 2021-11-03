# token-negotiator

The token-negotiator is an NPM package designed for use with TokenScript. 

TokenScript is a framework which improves functionality, security and usability of blockchain token. It creates a layer between a blockchain and user devices, adding information, rules and functionalites.

With a tokenScript and the Token-Negotiator, you can create and store attestations that can be utilised to create modern and custom tokenised web experiences. 

For further information about TokenScript please visit: [https://tokenscript.org/](tokenscript.org).

(for new token issuers please visit the following WIKI page: https://github.com/TokenScript/token-negotiator/wiki/Token-Issuer-Page).

### Examples

A live demonsration of the Token Negotiator and development examples can be found here.

https://github.com/TokenScript/token-negotiator-examples 

## Installation

Within your web application / dapp install the token negotiator.

```sh
npm i @tokenScript/token-negotiator
```

This library provides two ways to load tokens into your application, active or passive. 

### Active Negotiation of tokens

This approach is designed with security in mind where the client website will not learn about the tokens
until the end user has selected them via an token negotiator overlay web component loaded into the page.

```javascript
  
  import { Client } from '@tokenscript/token-negotiator';
  
  const filter = {};

  let tokens = [];

  const tokenName = "devcon-ticket";

  const options = { 
    useOverlay: true, // enables active negotiation
    tokenSelectorContainer: ".tokenSelectorContainerElement" // an HTML container element for the overlay to load within
  };

  const negotiator = new Client(filter, tokenName, options);

  negotiator.negotiate();

  window.addEventListener('message', (event) => {
    switch(event.data.evt) {
      case 'setSelectedTokens':
        tokens = event.data.selectedTokens;
        // do something with tokens here.
        break;
    }
  }, false);
```
### Passive Negotiation of tokens

This approach is designed for a fully custom ui/ux experience, where a list of all tokens are learnt by the client on negotation. 

````javascript

  import { Client } from '@tokenscript/token-negotiator';

  let tokens = [];

  const filter = {};

  const tokenName = "devcon-ticket";

  const options = {};
  
  const negotiator = new Client(filter, tokenName, options);

  negotiator.negotiate().then(result => {
    if(result){
      tokens = result;
      // do something with tokens here.
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
### Authenticate ownership of Token

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

  // un is a short lived unpredictable number that a server can provide towards the authenticated use of a token.

```

## Tests

run `npm run test`

## Development of this library.

See Developers Page inside Wiki

### Help / Questions / Improvements

Please contact us or open an issue via github:
Alchemynft <info@alchemynft.org>

For a quick start to using this product please see: https://github.com/TokenScript/token-negotiator-examples/wiki/quick-start

