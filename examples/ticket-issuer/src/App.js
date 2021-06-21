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
    <main className="pageStyles">
      <a href="/"><img className="logo" src="./devcon.svg"></img></a>
      <div className="flexCenter">
        <p>[DEMO Ticket Issuer Website]</p>
      </div>
      <div className="flexCenter">
        <img className="devcon_bogota" src="./devcon_bogota.svg"></img>
      </div>
      <div className="flexCenter">
        <p>A Devcon ticket provides access to the event and special offers between the dates X-XX for hotel bookings, travel, restaurants and more.</p>
      </div>
      <div className="flexCenter">
        <p>Your tickets:</p>
      </div>
      <div className="flexCenter">
        {
          tokens.length > 0 && tokens.map((tokenInstance, index) => {
            return <Card key={index} tokenInstance={tokenInstance} />
          })
        }
        {
          !tokens.length && <div>
            <b>- no ticket found -</b>
            <p>Click <a href="/?ticket=MIGbMA0CAQYCBWE3ap3-AgEABEEEEjVknVv9Kf7F2Ftt6QVO3I02eRadiE1kJ6kvr934-TApOLZxrh5GL3jLoEz9Jv42FspPv-LHFa6M9AaOuLAvIgNHADBEAiBwLK_95NPZo0W01HDBfyZisZ2KaNrzoWuxRV-nhjGLMAIgaOP4eVVINH5xM8Cv9OVDdyOG3BxUqyPVQOuDU9PaC9o=&secret=45845870684">here</a> to generate a ticket (for demo purposes only).</p> 
          </div>
        }
      </div>
    </main>
  );
}

export default App;

