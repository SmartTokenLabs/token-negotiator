> Description

Feature release to support Socios OAuth2 Wallet Provider, additional configuration options and improvments.

### Upgrade Steps

- Update NPM package to version 3.1.0

### Breaking Changes

[none]

### New Features

- Added new configuration text to active mode ui options
- Off chain Token user flows now default to re-direct mode, due to all major browsers by default denying to cross origin local storage access via Iframes.
- Added Socios OAuth2 Wallet Provider support via compatbility with a new NPM package (https://www.npmjs.com/package/@tokenscript/token-negotiator-server)

### Bug Fixes

- Fix to ensure the validity of attestations when expired
- Show retry for on chain tokens when they fail to resolve the first time
- Off Chain Attestation Toggle button UX fix (for custom EAS tokens)

### Performance Improvements

[none]

**Full Change log**:

https://github.com/TokenScript/token-negotiator/compare/v3.0.2...v3.1.0
