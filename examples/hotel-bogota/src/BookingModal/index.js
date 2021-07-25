
import React, { useReducer } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './BookingModal.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0071c3',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});


// BOOKING MODAL COMPONENT
// Booking form

export default function BookingModal({ image, roomType, applyDiscount, discount, price, tokens, book }) {

  // Modal State (open boolean)
  const [open, setOpen] = React.useState(false);

  // Form state.
  const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), { 
    reference: "Beeple",
    cardNo: "00000000000", 
    cardSort: "00-00-00",
    cardCsv: "000"
  });

  // Handle form input.
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  // Simple validation check.
  const formIsDisabled = () => {
    return false;
  }

  // handle form submission.
  const handleSubmit = evt => {
    evt.preventDefault();
    book({ formInput, roomType });
  };

  // Open Modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
  };
  
  // apply discount
  const discountPerc = discount.value ? discount.value : 0;
  const discountOfferValue = (discountPerc / 100) * price;
  const viewPrice = price - discountOfferValue;

  // example of application of tickets that can be used to apply a discount
  const discountTicketClasses = ["0"];

  return (
    <ThemeProvider theme={theme}>
      <Button color="primary" className="bookButton" onClick={handleClickOpen} variant="contained">
        Book
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <div className='modalContainer'>
          <div style={{ width: '100%', height: '138px', overflow: 'hidden' }}>
            <img 
              style={{ width: '100%', position: 'relative', top: '-71px' }}
              src={image}
            />
          </div>
          <DialogTitle
            className="title"
            disableTypography={true}
          >
            {roomType} 
          </DialogTitle>
          <DialogTitle
            className="subTitle"
            disableTypography={true}
          >
            {viewPrice} COP per night. { discount.value ? `(${discount.value}% discount)` : ""}
        </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="booking-name"
                label="Reference name"
                placeholder="Beeple"
                value="Beeple"
                helperText="(a check-in reference name for your booking)"
                fullWidth
                name="reference"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="card-no"
                label="Card Number"
                fullWidth
                placeholder="00000000000"
                value="00000000000"
                name="cardNo"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="card-sort"
                label="Card Sort Number"
                fullWidth
                placeholder="00-00-00"
                value="00-00-00"
                name="cardSort"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="card-csv"
                label="CSV"
                fullWidth
                value="000"
                placeholder="000"
                name="cardCsv"
                margin="normal"
                onChange={handleInput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </DialogContent>
          <div className="booking">
          <DialogActions>
          <Button
              color="primary"
              className="paynow"
              variant="contained"
              onClick={handleSubmit}
              color="primary"
              disabled={formIsDisabled()}
            >
              Pay Now
          </Button>
          </DialogActions>
        </div>
        </div>
      </Dialog>
    </ThemeProvider>
  );
}



