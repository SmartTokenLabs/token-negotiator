
/**
* @description 
*/

export class Authenticator {
  /**
  * @description initialise the origin, token blob and secret 
  * @params {string} attestationOrigin origin attestor url
  */
  constructor(
    attestationOrigin
  ) {
    this.attestationOrigin = attestationOrigin;
    this.ticketBlob = window.ticketBlob;
    this.ticketSecret = window.ticketSecret;
  }

  /**
  * @params {object} token to check the authentication status
  * @returns {boolean}
  */
  getStatus(token){}
  
  /**
  * @description ...
  * @params {string} token
  */
  authWeb(token){} 
  
  /**
  * @description ...
  * @params {string} contract
  */
  authContract(contract){
    web3[contract].vote("vote", contract);
  }
  
}
