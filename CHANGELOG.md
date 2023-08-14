> Description

This major version of the Token Negotiator provides simplification to the library interface, and new core features including multi-attestation support.

### Upgrade Steps

- Please refer to the migration from 2x to 3x guide. https://tokenscript.gitbook.io/token-negotiator/migrating-from-version-2x-to-3x

### Breaking Changes

- Passive Negotiation 'tokens' hook
- Off chain interface changes
- off chain Attestation schema changes (ASN / EAS)

### New Features

- Support for multi batch EAS & ASN attestation readability and authentication
- Dynamic EAS attestation support
- AlphaWallet provider selection in active UI mode
- Ultra Network support (BETA)
- Removal of Wallet Connect V1
- Migrated this libraries documentation from README to gitbooks https://tokenscript.gitbook.io/token-negotiator/
- Added attestation migration support utility function 'migrateLegacyTokenStorage'

### Bug Fixes

- MetaMask support via Wallet Connect V2

### Performance Improvements

- Simplified off chain storage of issuer data

**Full Change log**:

https://github.com/TokenScript/token-negotiator/compare/v2.7.1...v3.0.0
