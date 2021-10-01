import { Outlet } from './dist/index';

// instantiate the outlet class()
// - reads tokens from query string (token outlet).
// - provides tokens to library components

// configure the outlet with the tokens this page should store and provide as a service.

new Outlet({
  tokenUrlName: 'ticket',
  tokenSecretName: 'secret',
  tokenIdName: 'id',
  localStorageItemName: 'dcTokens'
});
