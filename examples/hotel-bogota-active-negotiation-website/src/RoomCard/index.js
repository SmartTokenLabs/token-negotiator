import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import BookingModal from './../BookingModal';
import Typography from '@material-ui/core/Typography';
import './RoomCard.css';

// ROOM CARD COMPONENT
// Shows hotel room item; image, price and option to book.

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "20px"
  },
  media: {
    height: 140,
  },
});

export default function RoomCard({ room }) {
  const classes = useStyles();

  // applyDiscount
  // discount
  // discountPrice

  const { type, price, image, frequency } = room;
  return (
    <Card className="roomCard">
      <div>
        <CardMedia
          className={classes.media}
          image={image}
          title="token"
        />
        { !room.applyDiscount &&
          <CardContent>
              <Typography
                style={{ fontSize: '21px' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {type}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                COP {price} / {frequency}
              </Typography>
          </CardContent>
        }
        { room.applyDiscount &&
          <CardContent>
              <Typography
                style={{ fontSize: '21px' }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {type}
              </Typography>
              <div style={{display: 'flex'}}>
                <Typography
                  style={{ color: '#d3182e', textDecoration: 'line-through', marginRight: '4px'}}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  COP {room.price} / {frequency}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  COP {room.discountPrice} / {frequency}
                </Typography>
              </div>
          </CardContent>
        }
      </div>
      <CardActions>
        <BookingModal room={room} />
      </CardActions>
    </Card>
  );
}
