# tokenscript 

TokenScript is a framework which improves functionality, security and usability of blockchain token. It creates a layer between a blockchain and user devices, adding information, rules and functionalites both onchain and offchain. 

For more information please visit: [https://tokenscript.org/](tokenscript.org).

## Documentation

[guides and deployment](https://tokenscript.org/guides/Intro.html)

## Usage

```sh
npm install tokenscript
```

```javascript
import { Negotiator, Authenticator } from './TokenScript';
```

### Negotiator

Create a new instance of the Negotiator module.

```javascript
  /**
  *
  * @param {Array} filter optional filter rules
  */
  const negotiator = new Negotiator({
    filter: ["tickets", "expiry > today"]
  });
```

Resolve the tokens with filter applied.

```javascript
  const tokens = await negotiator.getTokenInstances();
```

### Authenticator

Create a new instance of the Authenticator module.

```javascript
  const authenticator = new Authenticator();
```

Trigger the authentication event

```javascript
  /**
  *
  * @param {string} base64ticket from the source provider e.g. received email
  * @param {string} ticketSecret from the source provider e.g. received email
  * @param {string} attestationOrigin url to attestation website
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

[![Test Coverage](TBC)

## Licensing

TBC
