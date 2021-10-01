import React, { createContext, useState } from 'react';
import { Client } from './dist/client/index';

const TokenContext = createContext({ tokens: [] });

const TokenContextProvider = (props) => {
  const [tokens, setTokens] = useState([]);
  window.addEventListener('message', (event) => {
    switch(event.data.evt) {
      case 'setSelectedTokens':
        setTokens(event.data.selectedTokens);
        break;
    }
  }, false);

  return (
    <TokenNegotiatorInstance render={({ negotiator, modalContainer }) => (
        <TokenContext.Provider value={{ tokens, negotiator, modalContainer }}>
          {props.children}
        </TokenContext.Provider>
      )} /> 
    )
}
class TokenNegotiatorInstance  extends React.Component {
  constructor(props) {
    super(props);
    // add filters when specific tokens are required.
    const filter = {};
    // apply the tokenName to negotiate tokens from e.g. devcon-ticket.
    const tokenName = "devcon-ticket";
    // set required negotiator options. // TODO tokenOverlayContainer
    const options = { useOverlay: true, tokenSelectorContainer: ".tokenSelectorContainerElement" };
    // create new instance of the Negotiator with params
    window.negotiator = new Client(filter, tokenName, options);
    // instance of negotiator
    this.state = { negotiator: window.negotiator };
    window.negotiator.negotiate();
  }
  render() { return this.props.render({ negotiator: negotiator, modalContainer: this.state.modalContainer }) };
}

export { TokenContext, TokenContextProvider }
