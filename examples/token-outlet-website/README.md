# token-outlet

The token outlet component of the token negotiator is a location in which tokens should be read via magic link, stored and provided back to a token negotiating
component such as the configured Client or Overlay modules.

Note: 

If you are using the overlay component - this can be configured to double to function as the overlay + outlet. See the token-overlay example of how this can be acheived. 

## Development Commands

build `npm run build`
start `npm run start`
test `npm run test`

# Installation

To install this component:

1. run `npm run build`
2. deploy the output website to your server (preferably the token issuer website)
3. configure the index.ts file with the token data this page will host / manage
4. configure other components that wish to negotiate with this component.

// TODO: The package can only support this current configuration at this time.

tokenName: 'devcon-ticket',
attestationOrigin: "https://stage.attestation.id",
tokenOrigin: "http://localhost:3002",
tokenUrlName: 'ticket',
tokenSecretName: 'secret',
tokenIdName: 'id',
unsignedTokenDataName: 'ticket',
tokenParser: SignedDevconTicket,
localStorageItemName: 'dcTokens',
localStorageEthKeyItemName: 'dcEthKeys',
fabButton: '<svg></svg>'

