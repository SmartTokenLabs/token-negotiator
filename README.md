# token-negotiator 

The token-negotiator is an NPM package designed for use with TokenScript. 

TokenScript is a framework which improves functionality, security and usability of blockchain token. It creates a layer between a blockchain and user devices, adding information, rules and functionalites both onchain and offchain. 

For more information please visit: [https://tokenscript.org/](tokenscript.org).

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

The tokens may or may not be authenticated. Check it before assuming the user actually own it:

````
assert(tokens[0]._authenticated) // true if authenticated - or any kind of api to let webster know if
                                 // he should call authenticator, which results in user interaction
/* the following detail perahps shouldn't be in README
   the _authenticated status should be an observable or something similar
   because if the underlying token changed owner, or if the authentication blob (if there exists one) 
   expires, or the seucrity policy requires reauthentication once per 10 mins and that 10 mins timed out,
   then webster's code needs to be updated about it, so _authenticated shouldn't be just a boolean, I think. 
   
   and webster does not have to call authenticator to make every token authenticated - sometimes he is lucky
   that the relevant tokens are all blockchain tokens linked to an Ethereum address, so if he called 
   authenticator on one blockchain tokens, all of them are authenticated because the address' ownership
   is authenticated. So he should always check authentication status before calling Authenticator.
    But such a model isn't applicable to DevconTickets because it also depends on the ticket
   secret.
   */
   
   /*
   Alternative design that uses an instance of Authenticator, this has the advantage that the user
   knows that authenticator is at work, where _authenticated method will implicitly use authenticator */
   
   assert(authenticator.getStatus(tokens[0]));
````



### Authenticator

Creates a new instance of the Authenticator module.

```javascript
  const authenticator = new Authenticator([optinal] auth_end_point); //  e.g. http://bogota.hotel/web3/auth
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
  // authenticate against web service
  if (!authenticator.getStatus(tokens[0])) {
      // this will trigger a user action to sign stuff, be mindful
      authenticator.webAuth(tokens[0]);
  }
  // or this auth against smart contract : weiwu don't remember how smart contract auth was done....
  // following code is make-believe
  if (!authenticator.getStatus(tokens[0])) {
      // this will trigger a user action to sign stuff, be mindful
      authObj = authenticator.contractAuth(tokens[0]);
      web3.contractABC.vote(vote, authObj.authContract);
  }
  
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