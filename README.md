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
  * @param {Object} filter optional filter rules 
  * @param {Object} options api options (required options shown below)
  * @param {String} token name (required)
  */
  const negotiator = new Negotiator({
    filter: { 'devconId': 6 },
    token: "devcon-ticket",
    options: { userPermissionRequired: true }
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

Filters

When loading a page you may wish to only show a select set of tokens.

For example: with the following key/values `devconId, ticketId, ticketClass` you
may wish to only show `devconId` when the value is `6` and of `ticketClasses` of `A`. Below is an example of how this can be applied.

```javascript
const negotiator = new Negotiator({
    filter: { devconId: 6, ticketClass: "A" }
  });
```

Negotiator Options 

`userPermissionRequired` - Default is false. When true, the Token Negotiator will not allow `getTokenInstances()` to be used. Until access from the end user has given permissions to connect third party tokens with the origin website they are visiting.

Example Use below:

````javascript

  // initial config object
  const negotiator = new Negotiator({
    filter: { 'devconId': 6 },
    token: "devcon-ticket",
    options: { userPermissionRequired: true }
  });

  // An example click event where the User clicks 'Yes' or 'No' to allow access.
  const userPermissionClickEvent = (bool) => {
    // set permission inside negotiator state
    negotiator.setUserPermission(bool);
    // assign user permission status on change
    setUserPermissionStatus(negotiator.getUserPermission());
  }
````

User consent to connect the website to the token, this is only required when 'userPermissionRequired' is set as true.

```javascript
/**
  * @param {Boolean} boolean 
  */
  negotiator.setUserPermission(boolean);
```

The Negotiator will hold state of the permission, which can be accessed at any time. 

```javascript
/**
  * @returns {Boolean} boolean
  */
  negotiator.getUserPermission();
```

### Authenticator (in Progress)

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
