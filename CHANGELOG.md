> Description

This release introduces enhancements to impove the user experience that can be created with Token Negotiator
for both on and off chain tokens.

### Upgrade Steps

* Update NPM package to version 2.3.0

### Breaking Changes

* EventSenderConnectedWallet & EventSenderDisconnectedWallet event parameters have changed

### New Features

* ERC20 support 
* Flow Network support
* Redirect mode now enabled by default in browsers that do not support iframe or tab
* Remove KeyShape JS popup animation - now using CSS for all animations

### Bug Fixes

* Re-direct enhancements and fixes
* Remove the need for node polyfills when importing the project from NPM
* Enable closing of Token Outlet across all mobile browsers
* Use redirect mode for Firefox - iframe no longer works due to changes in storage state partitioning

### Performance Improvements

[none]
 
### Other Changes

* Husky and Prettier used for code quality / formatting
* Update to image in docs
* Add automatic version variable to build
* CI snapshot builds for staging & main via GH package registry

**Full Change log**: 

https://github.com/TokenScript/token-negotiator/compare/v2.1.0...v2.2.0
