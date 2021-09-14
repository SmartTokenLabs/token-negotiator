import React from 'react';
import { Negotiator } from './../token-negotiator-local';

class DevconTokenProvider  extends React.Component {

  constructor(props) {
    
    super(props);

    this.state = {
      tokens: [],
      negotiator: null
    }

    // add filters when specific tokens are required.
    const filter = {};
          
    // apply the tokenName to negotiate tokens from e.g. devcon-ticket.
    const tokenName = "devcon-ticket";

    // set required negotiator options.
    const options = {
      tokenSelectorContainer: ".tokenSelectorContainerElement"
    };

    // create new instance of the Negotiator with params.
    window.negotiator = new Negotiator(filter, tokenName, options);

    // TODO make this options into object params: { filter: , tokenName: , options: }

    // negotiator event handler
    window.addEventListener('message', (event) => {
      switch(event.data.evt) {
        case 'setSelectedTokens':
          this.setState({
            negotiator: window.negotiator,
            tokens: event.data.selectedTokens 
          }, () => {
            console.log('token event: ', this.state, event);
          });
          break;
        }
    }, false);

  }

  render() {
    return this.props.render({ 
      negotiator: this.state.negotiator, 
      tokens: this.state.tokens,
      modalContainer: this.state.modalContainer
    }); 
  }

}

export default DevconTokenProvider;

