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
import { Negotiator } from 'token-negotiator';
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
    tokenId: "devcon-ticket",
    options: { userPermissionRequired: true }
  });
```

Resolves the tokens with filter applied.

```javascript
  /**
  *
  * @returns {object} token data 
  */
  let tokens = [];
  negotiator.getTokenInstances(result => {
    tokens = result.tokens;
  });
```

Authenticate ownership of Token

```javascript
  /**
  * @param {URL} unEndPoint unpredictable number generator end point
  * @param {object} ticket selected token/ticket
  * @returns {object} { status (true/false), useTicket (object), ethKey (object) }
  * - useTicket and ethKey can be used to verify a ticket is valid. 
  * - status indicates if the function was successful.
  */
  negotiator.authenticate({ unEndPoint, ticket });
```

Filters

When loading a page you may wish to only show a select set of tokens.

For example: with the following key/values `devconId, ticketId, ticketClass` you
may wish to only show `devconId` when the value is `6` and of `ticketClasses` of `A`. Below is an example of how this can be applied.

```javascript
  const negotiator = new Negotiator({
    filter: { devconId: 6, ticketClass: "A" },
    token: "devcon-ticket",
    options: {}
  });
```

Negotiator Options 

`userPermissionRequired` - Default is false. When true, the Token Negotiator will not allow `getTokenInstances()` to be found until access given. This feature can be thought of in a similar way to how cookies are managed with end user permissions. 

Example Use below:

````javascript
  // token list
  let tokens = [];
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
    // if the user has selected to give access
    if(negotiator.getUserPermission() === true){
      // get the tokens and utilise them in the web application
      negotiator.getTokenInstances(result => {
        tokens = result.tokens;
      });
    }
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
  * @param {object} token that the end user must prove ownership of (e.g. to be able to complete a checkout payment discount). 
  * @param {string} tokenId identifier name of that token type. 
  * @returns {string} ticket in hex format
  */
  authenticator.getAuthenticationBlob({
    token: devconTicket,
    tokenId: "devcon-ticket",
  }, useDevconTicket => {
    writeToLog('useDevconTicket received (in hex ): ' + useDevconTicket);
  };
````

## Contributing

A [guide for contributors](TBC)
covers reporting bugs, requesting features and submitting code changes.

## Licensing

TBC
