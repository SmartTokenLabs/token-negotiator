import React, { useState, useEffect } from 'react';
import Header from './Header';
import RoomCard from './RoomCard';
import Typography from '@material-ui/core/Typography';
import EthereumLogo from './EthereumLogo';
import BookingDate from './BookingDate';
// import { Negotiator } from 'token-negotiator';
import { Negotiator } from './token-negotiator-local/index';
import './App.css';

window.negotiator = null;
  
// mock data e.g. server side hotel room price database
const mockRoomData = [{"type":"Deluxe Room","price": 200000,"frequency":"night","image":"./hotel_3.jpg"},{"type":"King Suite","price": 320000,"frequency":"night","image":"./hotel_2.png"},{"type":"Superior Deluxe Suite","price": 250030,"frequency":"night","image":"./hotel_1.jpg"}]

// mock discount of 10% applied to any ticket selected. In a real world scenario, this maybe different per ticket type and retrieved from a backend service.
const mockRoomDiscountData = 10;

function App() {

  // add filters when specific tokens are required
  const filter = {};
  
  // apply the tokenName to negotiate tokens from e.g. devcon-ticket.
  const tokenName = "devcon-ticket";

  // set required negotiator options
  const options = {
    tokenSelectorContainer: ".tokenSelectorContainerElement"
  };

  // create new instance of the Negotiator with params
  window.negotiator = new Negotiator(filter, tokenName, options);

  // devcont tickets (react state of tokens)
  let [tokens, setTokens] = useState([]);

  // react state of token specical offer
  let [freeShuttle, setFreeShuttle] = useState(false);

  // react state of hotel room data
  let [roomTypesData, setRoomTypesData] = useState([]);

  // selected token instance to apply discount, with the discount value on hotel booking.
  let [discount, setDiscount] = useState({ value: undefined, tokenInstance: null });

  // token proof
  let [useDiscountProof, setUseDiscountProof] = useState({ status: false, useTicket: undefined, ethKey: undefined });

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

    // toggle room discount offer on/off
    if (!ticket || ticket === null) {
      
      // clear discount
      setDiscount({ value: undefined, tokenInstance: undefined });

      // clear discount proof data
      setUseDiscountProof({ status: false, proof: undefined, useEthKey: undefined });

    } else {

      // endpoint to get an unpredictable number (mock example)
      const unpredicatbleNumberEndPoint = 'https://crypto-verify.herokuapp.com/use-devcon-ticket';
      
      // authenticate discount ticket is valid
      const authenticationData = await negotiator.authenticate({
        unEndPoint: unpredicatbleNumberEndPoint,
        unsignedToken: ticket
      });

      console.log("authenticationData", authenticationData);

      // when the ticket is valid and validation data is present
      if(
        authenticationData.status === true &&
        authenticationData.useEthKey &&
        authenticationData.proof
      ) {

        // store token proof details in react state for later.
        // authenticationData: { status, useTicket, ethKey }
        setUseDiscountProof(authenticationData);
        
        // share discount price via react state with the user inside react view.
        setDiscount({ value: getApplicableDiscount(), tokenInstance: ticket });

      } else {

        // handle scenario when the authentication process for discount is not valid.

      }
    }
  }

  // This is the example point at which the hotel would send payment with booking & discount details
  const book = async (formData) => {

    const checkoutEndPoint = "https://raw.githubusercontent.com/TokenScript/token-negotiator/main/examples/hotel-bogota/mockbackend-responses/pay.json";

    const params = {
      discount: useDiscountProof,
      bookingData: { formData }
    }

    // data for backend to validate discount
    console.log("useDiscountProof", params);

    fetch(checkoutEndPoint + new URLSearchParams(params)).then(data => {
      alert('Transaction Complete, we look forward to your stay with us!');
    });
  
  }

  // negotiation happens when this method is triggered
  // before this time, the token-negotiator is not used.
  const getTokens = () => {
    negotiator.negotiate().then(results => {
      if(results.success){
        setTokens(results.tokens);
        setFreeShuttle(true);
        console.log(results.tokens);
      }
    });
  }

  // react effect
  useEffect(() => {
    // assign room data to react local state
    setRoomTypesData(getRoomTypesData());
    getTokens();
  }, []);

  return (
    <div>
      <Header />
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
          <div className="tokenSelectorContainerElement" style={{position: 'fixed', right: 0, bottom: 0}}></div>
        </div>
      }
    </div>
  );
}

export default App;
