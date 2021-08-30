import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Header from './../Header';
import RoomCard from './../RoomCard';
import BookingDate from './../BookingDate';
import './../App.css';

const BookingPage = ({ tokens, negotiator }) => {
 
  // example of providing live benefits to customers based on rules of the number of tokens they hold
  const tokenHolderBenefits = {
    roomDiscount: (tokens.length > 0), // Single Or multi ticket holder
    freeShuttle: (tokens.length > 1)   // Multi ticket holder
  }

  // simple discount calculation
  const getRoomDiscountPrice = (price, discount) => {
    return (price) - ((discount / 100) * price);
  }

  // mock room data
  const mockRoomData = [{"type":"Deluxe Room","price": 200000,"frequency":"night","image":"./hotel_3.jpg"},{"type":"King Suite","price": 320000,"frequency":"night","image":"./hotel_2.png"},{"type":"Superior Deluxe Suite","price": 250030,"frequency":"night","image":"./hotel_1.jpg"}];

  // enrich the data with discount if available
  const roomTypesData = mockRoomData.map((room, index) => {
    if(tokenHolderBenefits.roomDiscount) {
      room['applyDiscount'] = true;
      room['discount'] = 10;
      room['discountPrice'] = getRoomDiscountPrice(room.price, room.discount)
    }
    return room;
  });

  // token proof
  let [useDiscountProof, setUseDiscountProof] = useState();

  // when a ticket is active and user triggers booking event
  const applyDiscount = async () => {
    
    const unpredicatbleNumberEndPoint = 'https://crypto-verify.herokuapp.com/use-devcon-ticket';
    
    // authenticate discount ticket is valid
    const authenticationData = await negotiator.authenticate({
      unEndPoint: unpredicatbleNumberEndPoint,
      unsignedToken: tokens[0]
    });

    // when the ticket is valid and validation data is present
    if(
      authenticationData.status === true &&
      authenticationData.useEthKey &&
      authenticationData.proof
    ) {

      // store token proof details in react state for later.
      // authenticationData: { status, useTicket, ethKey }
      setUseDiscountProof(authenticationData);

    } else {

      // handle scenario when the authentication process for discount is not valid.

    }
  }


  // this is the example point at which the hotel would send payment with booking & discount details
  const book = async (formData) => {

    // 
    const shoudApplyTokenDiscountProof = tokens.length > 0 && !useDiscountProof;

    if(shoudApplyTokenDiscountProof) {

      applyDiscount();
      
    } else {

      const checkoutEndPoint = "https://raw.githubusercontent.com/TokenScript/token-negotiator/main/examples/hotel-bogota/mockbackend-responses/pay.json";

      const params = {
        discount: useDiscountProof,
        bookingData: { formData }
      }

      // TODO add design to this step
      fetch(checkoutEndPoint + new URLSearchParams(params)).then(data => {
        alert('Transaction Complete, we look forward to your stay with us!');
      });

    }
  }

  return (
    <div>
      <Header />
      <BookingDate />
      <div className="roomCardsContainer">
        {roomTypesData.length > 0 && roomTypesData.map((room, index) => {
          return <RoomCard
            key={index}
            room={room}
            book={book}
          />
        })}
      </div>
      {
        tokenHolderBenefits.freeShuttle &&
        <div>
          <Typography
            style={{ padding: '20px' }}
            className="applyDiscountCopyContainer"
            gutterBottom
            variant="body2"
            component="p">
            🎉 &nbsp; Devcon Multi Ticket holder. Free shuttle service available with any booking.
          </Typography>
        </div>
      }
      <div className="tokenSelectorContainerElement" style={{position: 'fixed', right: 0, bottom: 0}}></div>
    </div>
  )
}

export default BookingPage;