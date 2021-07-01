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
  * @returns {object} token data { success: true/false, tokens: [...{}] }
  */
  const tokenData = await negotiator.negotiate();
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
      negotiator.getTokenInstances().then(result => {
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

## Contributing

Coming soon.

## Licensing

TBC
