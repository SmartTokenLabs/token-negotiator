import { SignedDevconTicket } from './../../Attestation/SignedDevonTicket';

/*

  tokenUid: String (unique token id name)
  attestationOrigin: String (origin location of attestation check)
  tokenModal: String (url location of modal web page contains modal component)
  tokenOrigin: String (url location of  token outlet)
  tokenIdName: String (used for query params ref)
  tokenUrlName: String (used for query params ref)
  tokenSecretName: String (used for query params ref)
  unsignedTokenDataName: String (key to locate nested data within decoded ticket)
  tokenParser: Ticket Class ()
  localStorageItemName: String (namespace used to locate tokens)
  localStorageEthKeyItemName: String (namespace used to locate keys)

  TODO - tokenParser isn't scaleable e.g. this lib can't hold 1m of token definitions.
  This should be held inside the Modal or Outlet.

*/

export const config = {
  "devcon-ticket": {
      tokenUid: 'devcon-ticket',
      attestationOrigin: "https://stage.attestation.id",
      tokenOrigin: "http://localhost:3002",
      // tokenOrigin: "https://devcontickets.herokuapp.com/outlet/",
      tokenUrlName: 'ticket',
      tokenSecretName: 'secret',
      tokenIdName: 'id',
      unsignedTokenDataName: 'ticket',
      tokenParser: SignedDevconTicket, 
      localStorageItemName: 'dcTokens',
      localStorageEthKeyItemName: 'dcEthKeys',
  }
}