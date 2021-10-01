# hotel-bogota example dapp (active token negotiation)

### description

Shows capabilities of tokenScript within a Dapp to display tickets from the third party website Devcon. Once connected the end user can access discounts and features not available to a non-ticket holder.

Please note. There are two ways to negotiate tokens with the NPM package Token-Negotiator. 

Passive: where all tokens are learnt by the client website without any interaction from the end user.
Active: where the user must make an action to allow the website to learn about each token. 

This example demonstrates the 'active' flow.

### to run the application

1. install dependancies `npm i` or `yarn`
2. run `npm start` or `yarn start`

To See the token negotiator in action, you must also serve the /token-overlay 

1. cd into /token-overlay
2. install dependancies `npm i` or `yarn`
3. run `npm start` or `yarn start`

## Deployment

If using the examples to build your own solution, when your ready to deploy it to a server you can build each component with the command below
from within each project folder. Please note the negotiator requires a client and token outlet to function + token overlay if using the active flow.

1. build `npm build` or `yarn build`

## Which components help to drive the application?

When reviewing or building your own solution with the token negotiator there are a few core components that you will need to know about
expecially if you are tranferring this implementation into Vue, Angular, or a Vanilla Js solution.

1. `TokenContextProvider` - The token content provider contains the imported library "Client" module of the Token Negotiator. The Client module is designed for use 
with either the passive or active flow you decide upon. 
2. The configuration can also be found within `TokenContextProvider`, token name, filters and element you wish to embed the Token Neogotiators overlay component.
3. Using reacts context provider the tokens are managed in state and can be consumed, when activated by the end user. See ./bookingPage as an example of how
tokens can be utilised. 
4. When completing a full attested flow, see the ./bookingModal

### demo walk through (the backend steps use mock end points in the demos provided)

1. When the page opens, the end user will be able to open a token overlay on the botton right hand side of the page.
2. Once opened they can select a token which will be learnt by the client website (hotel bogota)
3. Click the 'Devcon' ticket
4. When you select to use discount meta mask will ask you to sign a message, click sign
5. Once complete, a discount should be applied (and the attestation for the ticket stored inside the Dapp ready for later)
6. If you choose to click 'Pay Now' the attestion is sent to the backend, where a transaction process can first veryify the ticket with the data given in the previous step.

### for support, please contact us where we're happy to help or hear any feedback you have to improve this demo and Token-Negotiator

Alphawallet <info@alphawallet.com>
 