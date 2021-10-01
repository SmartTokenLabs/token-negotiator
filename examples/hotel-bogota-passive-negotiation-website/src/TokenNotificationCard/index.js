import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import './TokenNotificationCard.css';

// TOKEN NOTIFICATION CARD COMPONENT
// - shows ticket number
// - manages the user selection if they will accept Devcon to connect with this page

// When Access is granted this view will show
function TokenView({tokensNumber}) {
    return (
      <Card className="tokenNotificationCard">
        <CardContent>
          <Typography
            gutterBottom
            variant="h1"
            component="h1"
          >
            {tokensNumber} Devcon Tickets
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
          >
            booking discounts available
          </Typography>
        </CardContent>
        <div className="cardBottomLip"></div>
      </Card>
  );
};

function TokenNotificationCard({ tokensNumber }) {
  return (
    <Zoom in={true} style={{ transitionDelay: true ? '500ms' : '0ms' }}>
      <TokenView tokensNumber={tokensNumber}></TokenView> 
    </Zoom>
  );
}

export default TokenNotificationCard;

