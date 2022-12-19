> Description

This release introduces enhancements to impove the user experience that can be created with Token Negotiator
for both on and off chain tokens.

### Upgrade Steps

* Update NPM package to version 2.2.0

### Breaking Changes

[none]

### New Features

* RPC end points added for all supported networks
* UX smooth loading sequence auto load animation of tokens  
* UX use evm config when developer config network is not found for on chain tokens
* UX cancel authentication process button (signing of wallet)
* UX modal with user options added for off chain flow (connecting with cross origin site to learn tokens)
* UX hide toggle switches to simplify the active flow
* White listing functionality added for off chain flow
* New library hooks for wallet network change
* Multi-key off chain attestation support
* Off Chain Re-direct settings and UX enhancements to support wallet, desktop, mobile browsers
* Exposed ethers library instance
* Wallet Disconnect SVG added / remove the disconnect text
* UX/UI Refresh button and functionality added

### Bug Fixes

* CSS vertical alignment for multi-line token title
* Safari token title fix
* Code Quality, non functionality changing updates made
* Off chain attestation browser support fixes

### Performance Improvements

[none]
 
### Other Changes

* Unit test uplift
* MIT license added to package

**Full Change log**: 

https://github.com/TokenScript/token-negotiator/compare/v2.1.0...v2.2.0
