import React, { useState, useEffect } from 'react';
import LogoCard from './LogoCard';
import RoomCard from './RoomCard';
import TokenNotificationCard from './TokenNotificationCard';
import Typography from '@material-ui/core/Typography';
import EthereumLogo from './EthereumLogo';
import BookingDate from './BookingDate';
import './App.css';

function App() {

  // Devcon Tickets (local react state of tokens)
  let [tokens, setTokens] = useState([]);

  // local react state of token specical offer
  let [freeShuttle, setFreeShuttle] = useState(false);

  // local react state of hotel room data
  let [roomTypesData, setRoomTypesData] = useState([]);

  // Selected token instance to apply discount, with the discount value on hotel booking.
  let [discount, setDiscount] = useState({ value: undefined, tokenInstance: null });

  // instance of the negotiator
  const tokensOrigin = "https://devcontickets.herokuapp.com/outlet/";

  // apply 
  let tokenFilter = {};

  // Create new instance of the Negotiator with params
  let negotiator = new Negotiator(
    { tokenFilter }, 
    { tokensOrigin }
  );

  // async example of initial hotel data loaded from source
  // [{"type":"Deluxe Room","price":110.3,"frequency":"per night","image":"./hotel_3.jpg"},{"type":"King Suite","price":89.3,"frequency":"per night","image":"./hotel_2.png"},{"type":"Superior Deluxe Suite","price":55.1,"frequency":"per night","image":"./hotel_1.jpg"}]
  const getRoomTypesData = async () => {
    try {
      const roomTypesEndpoint = await fetch('http://bogotabackend.herokuapp.com/');
      return roomTypesEndpoint.json();
    } catch (e) {
      throw e;
    }
  }

  // When a ticket is present and user applies it, the discount will be shown
  const applyDiscount = async (ticket) => {
    if (!ticket) {
      setDiscount({ value: undefined, tokenInstance: undefined })
    } else {
      const response = await fetch(`./roomTypesDiscountDataMock${ticket.ticketClass.toString()}.json`)
      if(response) {
        const data = await response.json();
        setDiscount({ value: data.discount, tokenInstance: ticket });
      }
    }
  }

  // attest booking
  const book = async (form) => {
    // TODO add web3 transaction here to use ticket
  }

  useEffect(() => {
    // Get tokens with applied filter
    negotiator.getTokenInstances(data => {
      // assign tokens to react local state
      setTokens(data.tokens);
      // assign any upfront discounts 
      // (e.g. by having a token a free shuttle service is available)
      data.tokens.map(token => {
        setFreeShuttle(true);
      });
    });
    // Get mock rooms initial data (before token discounts are applied)
    getRoomTypesData().then((data) => {
      // assign room data to react local state
      setRoomTypesData(data);
    })
  }, []);

  return (
    <div>
      <LogoCard title={"Hotel Bogota"} />
      <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
        {tokens.length > 0 &&
          <TokenNotificationCard tokensNumber={tokens.length} />
        }
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
            Free shuttle service available as a Devcon Ticket holder! Enjoy the event.
          </Typography>
        </div>
      }
    </div>
  );
}

export default App;
