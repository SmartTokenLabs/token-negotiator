# hotel-bogota example dapp (passive token negotiation)
### description

Shows capabilities of tokenScript within a Dapp to display tickets from the third party website Devcon. Once connected the end user can access discounts and features not available to a non-ticket holder.

Please note. There are two ways to negotiate tokens with the NPM package Token-Negotiator. 

Passive: where all tokens are learnt by the client website without any interaction from the end user.
Active: where the user must make an action to allow the website to learn about each token. 

This example demonstrates the 'passive' flow.

### to run the application

1. install dependancies `npm i` or `yarn`
2. run `npm start` or `yarn start`

To See the token negotiator in action, you must also serve the /token-outlet.

1. cd into /token-outlet
2. install dependancies `npm i` or `yarn`
3. run `npm start` or `yarn start`

## Deployment

If using the examples to build your own solution, when your ready to deploy it to a server you can build each component with the command below
from within each project folder. Please note the negotiator requires a client and token outlet to function.

1. build `npm build` or `yarn build`
### demo walk through (the backend steps use mock end points in the demos provided)

1. When the page opens, the negotiator will then locate the tickets and show how many you have.
3. Click 'Book' on one of the hotel rooms
4. Click the 'Devcon' ticket
5. When you select this meta mask will ask you to sign a message, click sign
6. Once complete, a discount should be applied (and the attestation for the ticket stored inside the Dapp ready for later)
7. If you choose to click 'Pay Now' the attestion is sent to the backend, where a transaction process can first veryify the ticket with the data given in the previous step.

### for support, please contact us where we're happy to help or hear any feedback you have to improve this demo and Token-Negotiator

Alphawallet <info@alphawallet.com>
 