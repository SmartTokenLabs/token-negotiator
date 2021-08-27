class ClientTokenService {

  state: { 
    data: {
      selectedTokens: any[]; 
    };
  };

  constructor() {
    this.state = {
      data: {
        selectedTokens: []
      }
    }
  }
      
  get selectedTokens() {
    return this.state.data.selectedTokens
  }

  set selectedTokens(tokens) {
    this.state.data.selectedTokens = tokens;
  }

}

export default ClientTokenService;