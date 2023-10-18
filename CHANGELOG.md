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

### Bug Fixes

- TS interface custom view
- Single token off chain authentication incompatibility interface fix

### Performance / Quality Improvements 

- Reduced the duplication of variable definitions (moved to a common constants file).
- Increased unit test coverage

**Full Change log**:

https://github.com/TokenScript/token-negotiator/compare/v3.1.1....v3.2.0
