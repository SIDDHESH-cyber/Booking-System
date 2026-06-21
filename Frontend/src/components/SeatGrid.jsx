import React from 'react';

function SeatGrid({ seats, selectedSeats, setSelectedSeats }) {
  
  const handleSeatClick = (seatNumber, currentStatus) => {
    // Stop user clicks if the database says the seat is 'lock' or 'close'
    if (currentStatus === 'lock' || currentStatus === 'close') return;

    // Toggle local blue selection array
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="grid-container">
      {seats.map((seat) => {
        // 1. Map your backend JSON status values to your CSS class naming structure
        let seatClass = "booked"; // Fallback to gray if anything matches 'close'
        
        if (seat.status === 'open') {
          seatClass = "available"; // Turns Green
        } else if (seat.status === 'lock') {
          seatClass = "reserved";  // Turns Yellow
        }

        // 2. Override to blue if you click the seat locally
        if (selectedSeats.includes(seat.seatNumber)) {
          seatClass = "selected"; // Turns Blue
        }

        return (
          <button
            key={seat._id}
            className={`seat ${seatClass}`}
            // Disable button if it's already held by someone else or fully sold out
            disabled={seat.status === 'lock' || seat.status === 'close'}
            onClick={() => handleSeatClick(seat.seatNumber, seat.status)}
          >
            {seat.seatNumber}
          </button>
        );
      })}
    </div>
  );
}

export default SeatGrid;