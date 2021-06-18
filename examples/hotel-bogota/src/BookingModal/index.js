
import React, { useReducer } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TokenCard from './../TokenCard';
import './BookingModal.css';

// BOOKING MODAL COMPONENT
// Booking form

export default function BookingModal({ roomType, applyDiscount, discount, price, tokens, book }) {

  // Modal State (open boolean)
  const [open, setOpen] = React.useState(false);

  // Form state.
  const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), { reference: "" });

  // Handle form input.
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  // Simple validation check.
  const formIsValid = () => {
    return !(
      (formInput.reference.length > 0)
    );
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
  const discountTicketClasses = [0n];

  // Text to accompany the tickets (only shown when there are tickets)
  const TicketCopy = (index) => {
    if (index === 0) {
      return (
        <p className="smallCopy">Select a ticket to apply discount:</p>
      );
    }
  }

  return (
    <div>
      <Button
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Book
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <div className='container'>
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
            {viewPrice} ETH per night. { discount.value ? `(${discount.value}% discount applied)` : ""}
        </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="booking-name"
                label="Booking check-in reference name"
                type="text"
                fullWidth
                name="reference"
                onChange={handleInput}
              />
              {tokens &&
                tokens
                  .filter(_token => discountTicketClasses.indexOf(_token.ticketClass) > -1)
                  .map((token, index) => (
                    <div key={index}>
                      {TicketCopy(index)}
                      <TokenCard
                        applyDiscount={applyDiscount}
                        tokenInstance={token}
                        discount={discount}
                      />
                    </div>
                  ))
              }
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
            >
              Cancel
          </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={formIsValid()}
            >
              Book Now
          </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}



