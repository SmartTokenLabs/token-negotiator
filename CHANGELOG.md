> Description

Minor release for off chain token attestations

### Upgrade Steps

- Update NPM package to version 3.1.1

### Breaking Changes

[none]

### New Features

- Upgrade attestation lib to support validation of new EAS off-chain attestation version
- Prevent delete of signedToken property on token object
- Change single token auth to use tokenId instead of sending the entire token object in URL
- Add labels to default ticket schema

### Bug Fixes

[none]

### Performance Improvements

[none]

**Full Change log**:

https://github.com/TokenScript/token-negotiator/compare/v3.1.0....v3.1.1
