import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import './TokenNotificationCard.css';

// TOKEN NOTIFICATION CARD COMPONENT
// shows ticket

function TokenNotificationCard({ getTokens, tokensNumber }) {
  // react effect
  useEffect(() => {
    getTokens();
  }, []);
  return (
    <Zoom in={true} style={{ transitionDelay: true ? '500ms' : '0ms' }}>
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
    </Zoom>
  );
}

export default TokenNotificationCard;
