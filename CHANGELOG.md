> Description

This release focussed on bug fixes to Wallet Connections, enhancing error handling and bringing minor general improvements to the product.

### Upgrade Steps

* Update NPM package to version 2.6.0

### Breaking Changes

[none]

### New Features

[none]

### Bug Fixes

* Wallet Connect V1 UX improvements
* Enable disconnection of Phantom Wallet (through new API capabilities)
* Off Chain Token error handling enhancements
* General CSS updates (best practices and aesthetic improvements)
* All Sonar Cloud vulnerabilities addressed
* Fix to re-enable the change of accounts hook for EVM wallets (re-aligned to third party libraries)
* Removed from Readme our support for Cronos testnet and Avalanche testnet
* Removal of deprecated comments and code from source 
* Enable IM Token with off chain flow
* Solana Token Discovery faced some issues through this release cycle, now fixed
* Addition of Icon Graphic for IM Token
* Solana event hooks were not working expectedly, now fixed.

### Performance Improvements

[none]
 
### Other Changes

* Support for Cronos testnet and Avalanche testnet is no longer available. If using these networks, please consider using another EVM test net or migrating to a mainnet.

**Full Change log**:

https://github.com/TokenScript/token-negotiator/compare/v2.5.3...v2.6.0
