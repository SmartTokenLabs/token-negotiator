# TODO's 

- TS CSS Module Solution: https://spin.atomicobject.com/2020/06/22/css-module-typescript/

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

  // configure

  const negotiator = new Client({
    type: 'active',
    issuers: ['devcon'],
    options: {
      overlay: {
        heading: "Get discount with Ticket",
        theme: "light",
        position: "bottom-right"
      }
    },
    filter: {}
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

This approach is designed for a fully custom ui/ux experience, where a list of all tokens are learnt by the client on negotation. 

````javascript

  import { Client } from '@tokenscript/token-negotiator';

  const negotiator = new Client({
    type: 'passive',
    issuers: tokenIssuers,
    options: {}
  });

  negotiator.on('tokens', (issuerTokens) => {
    
    // use tokens

  });

  negotiator.on("token-proof", (tokenProof) => {

    // use proof

  });

````

### Negotiator Client Module API

````javascript

 /**
  * @param {Object} filter { 'devconId': 6, 'class': 'gold' } (optional rule to fiter tokens by keys and values - this acts as a simple filter where you cannot at this time filter many from the same key).
  * @param {String} type passive or active
  * @param {String} issuers list of issuers tokens you choose to support (on / off chain)
  * @param {Object} options
  * @param {Object} options[overlay] object to configure the overlay
  * @param {String} options[overlay][heading] overlay heading
  * @param {String} options[overlay][theme] light or dark modes
  * @param {String} options[overlay][position] position (not currently functional) ("bottom-right"...)
  */
 negotiator.negotiate(
   filter,
   issuers,
   options
 )

````
### Authenticate ownership of Token

Authenicating ownership of the token will provide a proof with a limited expiry.

```javascript

  /**
  * @param {String} issuer token issuer
  * @param {Object} unsignedToken token to attest
  */
  negotiator.authenticate({ 
    issuer, 
    unsignedToken 
  });

  negotiator.on('proof', () => {

    // the proof will be recieved here (valid or failed)

  });

```

## Tests

run `npm run test`

## Development of this library.

See Developers Page inside Wiki

### Help / Questions / Improvements

Please contact us or open an issue via github:
Alchemynft <info@alchemynft.org>

For a quick start to using this product please see: https://github.com/TokenScript/token-negotiator-examples/wiki/quick-start

