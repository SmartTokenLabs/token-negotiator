import React, { createContext, useState } from 'react';
import { Negotiator } from './negotiator';

const TokenContext = createContext({
  tokens: [],
  negotiator: null
});

const TokenContextProvider = (props) => {
  const [tokens, setTokens] = useState([]);
  // negotiator event handler
  window.addEventListener('message', (event) => {
    switch(event.data.evt) {
      case 'setSelectedTokens':
        setTokens(event.data.selectedTokens);
        break;
    }
  }, false);

  const { filter, tokenName, options } = props;
  window.negotiator = new Negotiator(filter||{}, tokenName, options);

  return (
      <TokenContext.Provider value={{ tokens }}>
        {props.children}
      </TokenContext.Provider>
  )
}

export { TokenContext, TokenContextProvider }
