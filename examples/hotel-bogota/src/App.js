import React, { useState, useEffect } from 'react';
import LogoCard from './LogoCard';
import RoomCard from './RoomCard';
import TokenNotificationCard from './TokenNotificationCard';
import Typography from '@material-ui/core/Typography';
import EthereumLogo from './EthereumLogo';
import BookingDate from './BookingDate';
import './App.css';
// import { Negotiator } from 'token-negotiator';
import { Negotiator } from './temp/negotiator';
  
// mock data e.g. server side hotel room price database
const mockRoomData = [{"type":"Deluxe Room","price": 0.5,"frequency":"per night","image":"./hotel_3.jpg"},{"type":"King Suite","price": 0.4,"frequency":"per night","image":"./hotel_2.png"},{"type":"Superior Deluxe Suite","price": 0.6,"frequency":"per night","image":"./hotel_1.jpg"}]
// mock discount of 10% applied to any ticket selected. In a real world scenario, this maybe different per ticket type and retrieved from a backend service.
const mockRoomDiscountData = 10;

function App() {

    // add filters when specific tokens are required
  const filter = {};
  // apply the token to negotciate (load) into the page
  const token = "devcon-ticket";
  // set required negotiator options
  const options = { 
    userPermissionRequired: true
  };
  // Create new instance of the Negotiator with params
  let negotiator = new Negotiator(filter, token, options);

  // Devcon Tickets (local react state of tokens)
  let [tokens, setTokens] = useState([]);

  // local react state of token specical offer
  let [freeShuttle, setFreeShuttle] = useState(false);

  // local react state of hotel room data
  let [roomTypesData, setRoomTypesData] = useState([]);

  // Selected token instance to apply discount, with the discount value on hotel booking.
  let [discount, setDiscount] = useState({ value: undefined, tokenInstance: null });

  // async example of initial hotel data loaded from source
  const getRoomTypesData = () => {
    return mockRoomData;
  }

  // example to return a discount
  const getApplicableDiscount = () => {
    return mockRoomDiscountData;
  }

  // When a ticket is present and user applies it, the discount will be shown
  const applyDiscount = async (ticket) => {
    if (!ticket) {
      setDiscount({ value: undefined, tokenInstance: undefined })
    } else {
      setDiscount({ value: getApplicableDiscount(), tokenInstance: ticket });
    }
  }

  // apply discount
  const book = async (form) => {
    // TODO add web3 transaction here to use ticket
    // Ticket can be acquired from discount object
    console.log(form);
  }

  // negotiation happens when this method is triggered
  // before this time, the token-negotiator is not used.
  const negotiate = () => {
    // on success assign tokens / changes to react state
    negotiator.getTokenInstances(res => {
      if(res.success){
        setTokens(res.tokens);
        setFreeShuttle(true);
      }
    });
  }

  // react effect
  useEffect(() => {
    // assign room data to react local state
    setRoomTypesData(getRoomTypesData());
  }, []);

  return (
    <div>
      <div className="header">
        <LogoCard title={"Hotel Bogota"} />
        <TokenNotificationCard negotiator={negotiator} tokensNumber={tokens.length} />
      </div>
      <BookingDate />
      <div className="roomCardsContainer">
        {roomTypesData.map((room, index) => {
          return <RoomCard
            key={index}
            room={room}
            applyDiscount={applyDiscount}
            discount={discount}
            tokens={tokens}
            book={book}
          />
        })}
      </div>
      {
        freeShuttle &&
        <div>
          <EthereumLogo />
          <Typography
            style={{ padding: '20px' }}
            className="applyDiscountCopyContainer"
            gutterBottom
            variant="body2"
            component="p">
            Free shuttle service available to you as a Devcon Ticket holder! Enjoy the event.
          </Typography>
        </div>
      }
    </div>
  );
}

export default App;

// Trigger:
// authenticator.webAuth(currentToken)
// Response:
// { object token data }
// Request: 
// Web3 SIGN ownership of Ethereum Address
// Response: { object proof of ownership }
// Request [POST]:
// authServerAPI( object token data + proof of address ownership )
// Response:
// True
// End User can now use the website

// Todo:
// (1 hour) Working on the 3rd Party check - to allow Devcon to utilise the website (inject tickets)
// (1 hour) Create mock backend Bogota/
// github/repo/hotel-bogota-mock-backend-json-reponses
// useTicketSuccess.json
// useTicketError.json
// github/repo/devcon-mock-backend-json-reponses/
// ticketAuthenticationServerSuccess.json
// ticketAuthenticationServerError.json
