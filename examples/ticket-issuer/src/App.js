import React, { useState, useEffect } from 'react';
import { Negotiator } from 'token-negotiator';
import Card from './Card';
import './App.css';

// A minimal example to read tokens and render them to a view.

function App() {
  // local State: tokens[], setTokens: Method to update the state of tokens.
  let [tokens, setTokens] = useState([]);
  // create instance of Negotiator.
  const filter = {};
  const token = "devcon-ticket";
  const options = {};
  const negotiator = new Negotiator(filter, token, options);
  // react effect
  useEffect(() => {
    // on success assign tokens to react state
    negotiator.getTokenInstances(res => {
      if(res.success) setTokens(res.tokens);
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
        <div className="tokensWrapper">
          {
            tokens && tokens.length > 0 && tokens.map((tokenInstance, index) => {
              return <Card key={index} tokenInstance={tokenInstance} />
            })
          }
          {
            !tokens.length && <div>
              <b>- no ticket found -</b>
              <p>Click <a target="_blank" href="https://devcontickets.herokuapp.com/outlet/?ticket=MIGbMA0CAQYCBWE3ap3-AgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNHADBEAiBwLK_95NPZo0W01HDBfyZisZ2KaNrzoWuxRV-nhjGLMAIgaOP4eVVINH5xM8Cv9OVDdyOG3BxUqyPVQOuDU9PaC9o=&secret=45845870684">here</a> to generate a ticket (for demo purposes only).</p> 
              <p>Click <a target="_blank" href="https://devcontickets.herokuapp.com/outlet/?ticket=MIGYMAoCAQYCAgFNAgECBEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNHADBEAiB4thME54fWjTs1eJ5XseTPk7sqOUa9JzVsDMURBwTlJwIgChH-eU6seNnC8hVDgBvLvUJPpGWviWsQ2WwWrcC7Meg=&secret=45845870684">here</a> to generate a ticket (for demo purposes only).</p> 
              <p>Click <a target="_blank" href="https://devcontickets.herokuapp.com/outlet/?ticket=MIGZMAoCAQYCAgDeAgEBBEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNIADBFAiEAy0hGTGFw_KWyk0EbDFI7y4x8LaplJ6PEPFDb-AQ82GUCIEKP4650eRZyvbgNbTcnjRLaRthc4oIFEn7FVS2nNJ6o&secret=45845870684">here</a> to generate a ticket (for demo purposes only).</p> 
              <p>Click <a target="_blank" href="https://devcontickets.herokuapp.com/outlet/?ticket=MIGXMAkCAQYCAW8CAQAEQQQollXEwRduRJlkFac1RNf_mJ67wZSp_RvH9rS0E8XpBiyQAFowkFiEM5eyZC3dyyT9N8xnbB2Z9GQrt48I4jaSA0cAMEQCIFavePjptmgxBsVuHp7bZSDxK0ovB8d9URp2VjiGos56AiA9apKTL6Kk74Jgf2H7Mb4EZqlsdwJLXSN23sC6aoRyKg==&secret=45845870684">here</a> to generate a ticket (for demo purposes only).</p> 
            </div>
          }
        </div>
      </div>
    </main>
  );
}

export default App;

