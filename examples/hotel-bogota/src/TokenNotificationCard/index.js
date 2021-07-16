import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import './TokenNotificationCard.css';

// TOKEN NOTIFICATION CARD COMPONENT
// - shows ticket number
// - manages the user selection if they will accept Devcon to connect with this page

function PermissionView({ setPermissionEvent }) {
  return (
    <Card className="tokenNotificationCard">
      <CardContent>
       <Typography
         gutterBottom
         variant="body1"
         component="p"
       >
         Do you give permission for Devcon to connect with this website?
       </Typography>
       <button onClick={event => setPermissionEvent(true)}>YES</button> <button onClick={e => setPermissionEvent(false)}>NO</button>
      </CardContent>
      <div className="cardBottomLip"></div>
    </Card>
  )
}

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

function TokenNotificationCard({ getTokens, tokensNumber, tokenPermissionRequired }) {

  let [userPermissionStatus, setUserPermissionStatus] = useState(
    tokenPermissionRequired === true ? undefined : false
  );

  const setPermissionEvent = (event) => {
    // set permission inside negotiator state
    setUserPermissionStatus(event);
  }

  // react effect
  useEffect(() => {
    if(userPermissionStatus === true) getTokens();
  }, [userPermissionStatus]);

  return (
    <Zoom in={true} style={{ transitionDelay: true ? '500ms' : '0ms' }}>
      <div>
        { userPermissionStatus && <TokenView tokensNumber={tokensNumber}></TokenView> }
        { userPermissionStatus === undefined && <PermissionView setPermissionEvent={event => setPermissionEvent(event)}></PermissionView>
      }
      </div>
    </Zoom>
  );
}

export default TokenNotificationCard;
