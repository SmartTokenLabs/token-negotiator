> Description

This patch release addresses an off chain token management scenario.

### Upgrade Steps

* Update NPM package to version 2.7.1

### Breaking Changes

[none]

### New Features

[none]

### Bug Fixes

* When off chain tokens are added to the application a fix has been added to stop the 'tokensupdated' event hook from triggering when these tokens already existed. 
* Addition of this hook to the README documentation. 

### Performance Improvements

[none]
 
### Other Changes

[none]

**Full Change log**:

https://github.com/TokenScript/token-negotiator/compare/v2.6.0...v2.7.0
