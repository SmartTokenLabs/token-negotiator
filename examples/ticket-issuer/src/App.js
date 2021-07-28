import React, { useState, useEffect } from 'react';
// import { Negotiator } from 'token-negotiator';
import { Negotiator } from './token-negotiator-local/index';
import Card from './Card';
import './App.css';

// A minimal example to read tokens and render them to a view.

const mockTicketData = [
  {
    ticket: "MIGWMA0MATYCBWE3ap3-AgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAOOZKRpcE6tLBuPbfE_SmwPk2wNjbj5vpa6kkD7eqQXvBOCa0WNo8dEHKvipeUGZZEWWjJKxooB44dEYdQO70Vgc",
    secret:"45845870684",
    id:"mah@mah.com"
  },
  {
    ticket: "MIGXMA4MAjExAgVhN2qd_gIBAARBBCiWVcTBF25EmWQVpzVE1_-YnrvBlKn9G8f2tLQTxekGLJAAWjCQWIQzl7JkLd3LJP03zGdsHZn0ZCu3jwjiNpIDQgBbJBY1Ctlp_czUwB85yF1e5kpZ-lQ_-UZ7jaCYSFoEx028Jit1HIDLCJezKdsNn9c9IO7-HC-_r2ZLaYQ9GGrbHA==",
    secret:"45845870684",
    id:"mah@mah.com"
  },
  {
    ticket: "MIGTMAoMATYCAgDeAgEABEEEKJZVxMEXbkSZZBWnNUTX_5ieu8GUqf0bx_a0tBPF6QYskABaMJBYhDOXsmQt3csk_TfMZ2wdmfRkK7ePCOI2kgNCAEZYXbNmWXDsAqIc5uf7SirR-dLCMLdEVN5teFrV93VbcKE_DED8c6jtFQ5LH2SRXwPEtXZqWfEh1c2OHTEYqfwb",
    secret:"45845870684",
    id:"mah@mah.com"
  },
  {
    ticket: "MIGSMAkMATECAQECAQAEQQQollXEwRduRJlkFac1RNf_mJ67wZSp_RvH9rS0E8XpBiyQAFowkFiEM5eyZC3dyyT9N8xnbB2Z9GQrt48I4jaSA0IAOf4d0N9shWfPIgRXZPdBRhlRyIARDT0tJwNWYwy2ILVKnIy-qPzFsgdI6sZHm1OY6UsJKuDlp0A7EMC8vS5YhRs=",
    secret:"45845870684",
    id:"mah@mah.com"
  },
];

function App() {

  // local react state for tokens
  let [tokens, setTokens] = useState([]);
  
  // create configuration and instance of Negotiator.
  const filter = {};
  const token = "devcon-ticket";
  const options = {};
  const negotiator = new Negotiator(filter, token, options);
  
  useEffect(async () => {
    // retrieve existing tokens on initialisation of this component
    const devconData = await negotiator.negotiate();
    if(devconData.success) setTokens(devconData.tokens);
  }, []);

  const openTicketInIframe = async ({event, ticket, secret, id}) => {
    event.preventDefault();
    // add token through magic link
    // const magicLink = `https://devcontickets.herokuapp.com/outlet/?ticket=${ticket}&secret=${secret}&id=${id}`;
    const magicLink = `http://127.0.0.1:8080/?ticket=${ticket}&secret=${secret}&id=${id}`;
    negotiator.addTokenThroughIframe(magicLink); 
    // apply token to react state
    const devconData = await negotiator.negotiate();
    if(devconData.success) setTokens(devconData.tokens);
  }

  return (
    <main>
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
              <p>Generate ticket:</p>
              <div className="ticketWrapper">
                {
                  mockTicketData.map((mockTicket, index) => {
                    return (
                      <button key={index} className="makeTicket" onClick={event => openTicketInIframe({ 
                        event,
                        ticket: mockTicket.ticket,
                        secret: mockTicket.secret,
                        id: mockTicket.id
                      })}>Create Ticket</button> 
                    )
                  })
                }
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  );
}

export default App;