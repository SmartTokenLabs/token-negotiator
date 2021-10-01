import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Card.css';

// Token Card COMPONENT
// Displays a single tickets data

function TokenCard({ tokenInstance, applyDiscount, discount }) {
  const isSelectedToken = (discount.tokenInstance && discount.tokenInstance.ticketId === tokenInstance.ticketId);
  return (
    <div onClick={e => applyDiscount(isSelectedToken ? null : tokenInstance)} className={isSelectedToken ? 'tokenCard selected' : 'tokenCard'}>
      <div className="ticketDetails">
        <Typography className="ticketClass" gutterBottom variant="h5" component="h2">
          {tokenInstance.ticketClass.toString()}
        </Typography>
        <Typography className="ticketId" variant="body2" color="textSecondary" component="p">
          {tokenInstance.ticketId.toString()}
        </Typography>
        <Typography className="devconId" variant="body2" color="textSecondary" component="p">
          Devcon ID: {tokenInstance.devconId.toString()}
        </Typography>
      </div>
      <img className="ticketImg" src="ticket_example_image.svg"></img>
    </div>
  );
}

export default TokenCard;
