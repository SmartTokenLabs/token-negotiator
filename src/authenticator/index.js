
/**
* @description 
*/

export class Authenticator {
  
  constructor() {}

  /**
  * @description gets authentication status of a token
  * @params {object} a token is required to attest ownership
  * @returns {boolean}
  */
  async getAuthenticationStatus(token) {
    return true;
  }
  
  /**
  * @description
  * @params {string} token
  */
  callTokenAuthentication(token){} 
  
  /**
  * @description
  * @params {string} contract address
  */
  callContractAuthentication(contractAddress){
    web3[contractAddress].vote("vote", contractAddress);
  }
  
}

   
}

