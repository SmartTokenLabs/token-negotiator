import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './logoCard.css';

// LOGO CARD COMPONENT
// shows the hotel title

function LogoCard({ title }) {
  return (
    <Card className="logoCard">
      <CardContent className="cardContent">
        <Typography
          gutterBottom
          variant="h1"
          component="h1"
        >
          {title}
        </Typography>
        <div className="logo-wrapper">
          <div className="logo-emblem"></div>
          <div className="logo-emblem"></div>
          <div className="logo-emblem"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LogoCard;

