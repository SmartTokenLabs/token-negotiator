# hotel-bogota example dapp

### description

Shows capabilities of tokenScript within a Dapp to display tickets from the third party website Devcon. Once connected the end user can access discounts and features not available to a non-ticket holder.

### to run the application

1. install dependancies `npm i` or `yarn`
2. run `npm start` or `yarn start`
3. build `npm build` or `yarn build`

### demo walk through

1. When the page opens, provide access to the Token Nogotiator by clicking 'Yes' in the top right hand side of the page.
2. The neegotiator will then locate the tickets and show how many you have.
3. Click 'Book' on one of the hotel rooms
4. Click the 'Devcon' ticket
5. When you select this meta mask will ask you to sign a message, click sign
6. Once complete, a discount should be applied (and the attestation for the ticket stored inside the Dapp ready for later)
7. If you choose to click 'Pay Now' the attestion is sent to the backend, where a transaction process can first veryify the ticket with the data given in the previous step.

### for support, please contact us where we're happy to help or hear any feedback you have to improve this demo and Token-Negotiator

Alphawallet <info@alphawallet.com>
 