import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import './TokenNotificationCard.css';

// TOKEN NOTIFICATION CARD COMPONENT
// show a discount if available to Devcon ticket holders.

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

function TokenNotificationCard({ negotiator, tokensNumber }) {
  
  let [userPermissionStatus, setUserPermissionStatus] = useState();

  const setPermissionEvent = (bool) => {
    negotiator.setUserPermission(bool);
  }

  // react effect
  useEffect(() => {
    // assign user permission status onload
    setUserPermissionStatus(negotiator.getUserPermission());
  }, []);

  return (
    <Zoom in={true} style={{ transitionDelay: true ? '500ms' : '0ms' }}>
      <div>
        { userPermissionStatus && <TokenView tokensNumber={tokensNumber}></TokenView> }
        { !userPermissionStatus && <Card className="tokenNotificationCard">
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
            >
              Do you give permission for Devcon to connect with this website?
            </Typography>
            <button onClick={e => setPermissionEvent(true)}>YES</button> <button onClick={e => setPermissionEvent(false)}>NO</button>
          </CardContent>
          <div className="cardBottomLip"></div>
        </Card>
      }
      </div>
    </Zoom>
  );
}

export default TokenNotificationCard;

