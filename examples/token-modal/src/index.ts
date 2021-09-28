// Opens overlay for end user to select from their tokens.
import { Modal, Outlet } from './../../../src/index';

// peronalise styles here
import "./theme/style.css";

// instantiate modal class()
new Modal();

// instantiate the outlet class()
// read tokens from query string (token outlet).
new Outlet({
  tokenUrlName: 'ticket',
  tokenSecretName: 'secret',
  tokenIdName: 'id',
  localStorageItemName: 'dcTokens'
});
