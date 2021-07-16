# token-negotiator 

The token-negotiator is an NPM package designed for use with TokenScript. 

TokenScript is a framework which improves functionality, security and usability of blockchain token. It creates a layer between a blockchain and user devices, adding information, rules and functionalites both onchain and offchain. 

For more information please visit: [https://tokenscript.org/](tokenscript.org).

## Examples

https://tokenscript.github.io/token-negotiator/examples/

## Documentation

[guides and deployment](https://tokenscript.org/guides/Intro.html)

## Usage

```sh
npm i @alphawallet/token-negotiator
```

```javascript
import { Negotiator } from 'token-negotiator';
```

### Negotiator

Creates a new instance of the Negotiator module. 

```javascript
  /**
  *
  * @param {Object} filter optional filter rules 
  * @param {Object} options api options (required options shown below)
  * @param {String} tokenName name (required)
  */
  const negotiator = new Negotiator({
    filter: { 'devconId': 6 },
    tokenName: "devcon-ticket",
    options: {}
  });
```

Resolves the tokens with filter applied.

```javascript
  /**
  *
  * @returns {object} token data { success: true/false, tokens: [...{}] }
  */
  const negotiatedTokens = await negotiator.negotiate();
```

Authenticate ownership of Token.

```javascript
  /**
  * @param {URL} unEndPoint end point must return { un: number, expiry: date }
  * @param {object} unsignedToken selected un-signed token/ticket
  * @returns {object} { status (true/false), useToken (object), useEthKey (object)
  * - useTicket and ethKey can be used to verify a ticket is valid. 
  * - status indicates if the function was successful.
  */
  const { status, useToken, useEthKey } = await negotiator.authenticate({ unEndPoint, unsignedToken });
```

Filters

When loading a page you may wish to only show a select set of tokens.

For example: with the following key/values `devconId, ticketId, ticketClass` you may wish to only show `devconId` when the value is `6` and of `ticketClasses` of `A`. Below is an example of how this can be applied.

```javascript
  const negotiator = new Negotiator({
    filter: { devconId: 6, ticketClass: "A" },
    tokenName: "devcon-ticket",
    options: {}
  });
```

Negotiator Options 

(coming soon)

