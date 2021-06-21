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
npm install token-negotiator
```

```javascript
import { Negotiator, Authenticator } from 'token-negotiator';
```

### Negotiator

Creates a new instance of the Negotiator module.

```javascript
  /**
  *
  * @param {Array} filter optional filter rules
  */
  const negotiator = new Negotiator({
    filter: ["tickets", "expiry > today"]
  });
```

Resolves the tokens with filter applied.

```javascript
/**
  *
  * @returns {object} token data 
  */
  const tokens = await negotiator.getTokenInstances();
```

### Authenticator

Creates a new instance of the Authenticator module.

```javascript
  const authenticator = new Authenticator();
```

Triggers an attestation request event

```javascript
  /**
  *
  * @param {string} base64ticket provided to the end user
  * @param {string} ticketSecret provided to the end user
  * @param {string} attestationOrigin url to attest the base64ticket + ticketSecret
  * @returns {string} ticket in hex format
  */
  authenticator.getAuthenticationBlob({
    ticketBlob: base64ticket,
    ticketSecret: ticketSecret,
    attestationOrigin: 'https://stage.attestation.id/',
  }, useDevconTicket => {
    writeToLog('useDevconTicket received (in hex ): ' + useDevconTicket);
  };
 ```

## Contributing

A [guide for contributors](TBC)
covers reporting bugs, requesting features and submitting code changes.

## Licensing

TBC
