import React, { useState, useEffect } from 'react';
import { Negotiator } from 'token-negotiator';
import Card from './Card';
import './App.css';

// A minimal example to read tokens and render them to a view.

function App() {
  // local State: tokens[], setTokens: Method to update the state of tokens.
  let [tokens, setTokens] = useState([]);
  // create instance of Negotiator.
  const negotiator = new Negotiator();
  // react effect
  useEffect(() => {
    // on success assign tokens to react state
    negotiator.getTokenInstances().then((tokens) => {
      // react event to update state of tokens, component re-renders to show the latest tokens.
      setTokens(tokens);
    }, (error) => {
      console.log(error);
    });
  }, []);
  return (
    <div>
      {
        tokens.length > 0 && tokens.map((tokenInstance, index) => {
          return <Card key={index} tokenInstance={tokenInstance} />
        })
      }
      {
        !tokens.length && <p>No tickets found.</p>
      }
    </div>
  );
}

export default App;
