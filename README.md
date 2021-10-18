# token-negotiator

The token-negotiator is an NPM package designed for use with TokenScript. 

TokenScript is a framework which improves functionality, security and usability of blockchain token. It creates a layer between a blockchain and user devices, adding information, rules and functionalites.

With a tokenScript enabled token, you can build a custom tokenised web experience with the use of token-negotiator, using both on and off chain web capabilities.

For further information about TokenScript please visit: [https://tokenscript.org/](tokenscript.org).

### Examples

A live demonsration of the Token Negotiator and development examples can be found here.

https://github.com/TokenScript/token-negotiator-examples

### The following documentation is divided into the two sections

- Client installation (utilising exisiting tokens)
- Token issuer installation (for token issuers/suppliers)

## Client: Installation

Within your web application / dapp install the token negotiator.

```sh
npm i @tokenScript/token-negotiator
```

The library provides two ways to load tokens into your application, active or passive. 

### Client: Active Negotiation of tokens

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
### Client: Passive Negotiation of tokens

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

### Client: Negotiator Client Module API

````javascript

 /**
  * @param {Object} filter { 'devconId': 6, 'class': 'gold' } (optional rule to fiter tokens by keys and values - this acts as a simple filter where you cannot at this time filter many from the same key).
  * @param {String} tokenName token name identifier to negotiate 
  * @param {Object} options
  * @param {Boolean} options[useOverlay] optional rule to use token issuer overlay
  * @param {Object} options[tokenSelectorContainer] HTML Selector location to inject token issuer overlay when use overlay is set as true
  */
 client.negotiate(
   filter,
   tokenName,
   options
 )

````
### Client: Authenticate ownership of Token

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

## Token Issuer: Installation 

This library requires three web utilies to be added to make use of a token with the token negotiator. 

These components/web pages are;

- a Token Overlay (for active negotiation)
- a Token Outlet (a central place to store ticket attestations)
- a Token issuer interface, which is used to direct a magic link.

(note: the token issuer could be web page or another interface that has web capabilities).

### Token Issuer: Overlay web page installation

The overlay web page acts as an intermediatry component between the client and token outlet (explained below). Where a client will connect with an overlay to retrieve selected tokens.

Please download and install `/overlay` from:
https://github.com/TokenScript/token-negotiator-examples

The styles.css can be updated to reflect the Token Issuers brand (branding, token design).

Once the styles have been updated, you can build the application and host it via the token-issuers origin website. 

````javascript
  
  import { Overlay } from '@tokenscript/token-negotiator';

  import "./theme/style.css";

  new Modal();

````

### Token Issuer: Outlet web page installation 

The token outlet is the location in which tokens are stored and dispatched. 

Please download and install `/outlet` from:
https://github.com/TokenScript/token-negotiator-examples

Once the `tokenName` has been configured you can build the application and host it via the token-issuers origin website. 
 
````javascript

  import { Outlet } from '@tokenscript/token-negotiator';

  new Outlet({
    tokenName: 'devcon-ticket'
  });

````

### Token Issuer: Token Config

At this stage of our development road map, compatible tokens are stored inside this package. As a token issuer, please contact us at: Alchemynft <info@alchemynft.org>
where we would be like to connect with you and help support your token.

The config file provides the settings to communicate tokens between the issuer and client.

````
  "devcon-ticket": {
    tokenName: 'devcon-ticket',
    attestationOrigin: "https://token-issuer-website/attestation/index.html",
    tokenOrigin: "https://token-issuer-website.eth/origin/index.html",
    tokenOverlayOrigin: "https://token-issuer-website.eth/overlay/index.html",
    tokenUrlName: 'ticket',
    tokenSecretName: 'secret',
    tokenIdName: 'id',
    unsignedTokenDataName: 'ticket',
    tokenParser: SignedDevconTicket,
    localStorageItemName: 'dcTokens',
    localStorageEthKeyItemName: 'dcEthKeys',
    fabButton: '<svg...'
  }
````

## Tests

run `npm run test`

## Development of this library.

See Developers Page inside Wiki

### Help / Questions / Improvements

Please contact us or open an issue via github:
Alchemynft <info@alchemynft.org>

For working examples please visit and see readme for local setup:
https://tokenscript.github.io/token-negotiator/examples/

