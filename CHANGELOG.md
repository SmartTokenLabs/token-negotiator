> Description

Feature release including multi-hook support, improved UX for off chain token holders and general improvements.

### Upgrade Steps

- Update NPM package to version 3.2.0

### Breaking Changes

[none]

### New Features

- Extended the configuration options for 'active' mode ui text
- Off Chain Token Issuer UX improvements to notify the end user when the page will re-direct
- Re-direct view state UX improvements for 'active' mode
- Re-direct accept / deny options given to end user (to cancel the loading of tokens)
- Multi-Hook support added
- Added selected token issuer keys to 'tokens-selected' event hook
- Explicitly include ethers library availabilty via Token Negotiator library interface `client.externalUtils.evm.ethers`
- Aligned on chain authentication with off chain user interface (for single token authentication on the client side). Multi token on chain authentication is not yet supported (via the current library features). 

### Bug Fixes

- TS interface custom view
- Single token off chain authentication incompatibility interface fix
- EAS authentication fixed via attestation.id updated dependency @tokenscript/attestation to version "0.7.0-rc.2"

### Performance / Quality Improvements 

- Reduced the duplication of variable definitions (moved to a common constants file).
- Increased unit test coverage

**Full Change log**:

https://github.com/TokenScript/token-negotiator/compare/v3.1.1....v3.2.0
