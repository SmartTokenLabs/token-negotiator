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

Dev Notes (remove when complete):

- Spin up the outlet with http-server
- Serve hotel bogota

TODO's

- finish open / close functionality e.g. load and unload Iframe with tickets
- load tickets into container from window
- selection event logic handling needed
- Connect data to hotel bogota allowing for discount to be applied etc

SEE: eventController & tokenButtonHandler 

Development notes towards the re-work of the NPM package

  1. Token Negotiator Client 

  negotiator.negotiate({ filter })

  This function will open the modal and load the button into the page.
  Filter will be stored in the negotiator state ready to dispatch
  to modal in later events.

  2. Token Negotiator Modal (button pressed) Client event
  
  negotiator.getTokenInstances()

  dispatches event to Modal with filter (stored in memory)

  Modal opens, showing tokens.
  
  3. Modal toggle single token on/off event

  // internal methods used inside modal
  negotiator.toggleToken(tokenID) // updates selected tokens state
  >>> then >>>
  negotiator.dispatchTokens()     // dispatches selected tokens to client

  // attach to client (receives incoming events from modal)
  // learns tokens that are sent only
  negotiator.tokenListener() 

