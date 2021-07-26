import React, { useState } from "react";
import DatePicker from './../DatePicker';

// BOOKING DATE COMPONENT
// Mock Date Picker for demo purposes only

const BookingDate = () => {

  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Form state.
  const [formInput, setFormInput] = useState({
    from: today,
    to: tomorrow
  });

  // Handle date change input
  const handleInput = (newValue, label) => {
    setFormInput({ [label]: newValue });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '92px 0 82px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
        <div style={{ margin: '10px' }}>
          <DatePicker
            name={'from'}
            label={'check in'}
            handleInput={handleInput}
            date={"08/01/2021"}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <DatePicker
            name={'to'}
            label={'check out'}
            handleInput={handleInput}
            date={"08/15/2021"}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingDate;