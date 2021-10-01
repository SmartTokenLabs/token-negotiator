# token modal
A modal gateway to negotiate tokens from the token outlet to the client. This can be thought of as an access driven relay between these two components.

When the modal is open and the tokens are switched activated, they will be provided to the client website.

## Development Process

// TODO - add a mock token flow
// const mockTokens = [
//   { ticketClass: 'a', ticketId: 'b', devconId: 'c' },
//   { ticketClass: 'd', ticketId: 'e', devconId: 'f' },
//   { ticketClass: 'g', ticketId: 'h', devconId: 'i' },
//   { ticketClass: 'i', ticketId: 'j', devconId: 'k' },
//   { ticketClass: 'l', ticketId: 'm', devconId: 'n' },
// ];

## Development Commands

build `npm run build`
start `npm run start`
test `npm run test`


## Nicks notes:

1. Enable the Modal to be both Modal and Outlet

How: 

a: Modal Opens Iframe (self or new window)
b: Reads Tokens
c: Closes

2. Merge Hotel Bogota Changes from Fyang

3. Update negotiator directory (using an SPA will reduce the effort needed by Tony)

'Enclave' / 'No mans land'

[TOKEN NEGOTIATOR NPM]

/src
  /negotiator
    /modal - change name to /overlay
      index.ts
      componentFacory.ts
      negotiatorService.ts
      negotiatorController.ts
    /client
      index.ts
      negotiatorService.ts
    /outlet
      index.ts
      negotiatorService.ts
    /core
      negotiatorFunctions.ts

[TOKEN NEGOTIATOR SPA]

/tokenIssuerWebApp
  /negotiator
    /pages
      outlet / modal (overlay webpage)
    /theme
      theme.css
      theme-fab-button.svg
    webpack
    tsconfig
    package
    gitignore


