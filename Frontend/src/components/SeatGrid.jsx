function SeatGrid({ seats, selectedSeats, setSelectedSeats }) {
  
  const handleSeatClick = (seatNumber, currentStatus) => {
    if (currentStatus === 'lock' || currentStatus === 'close') return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="grid-container">
      {seats.map((seat) => {
        let seatClass = "booked";
        
        if (seat.status === 'open') {
          seatClass = "available";
        } else if (seat.status === 'lock') {
          seatClass = "reserved"; 
        }
        if (selectedSeats.includes(seat.seatNumber)) {
          seatClass = "selected"; 
        }

        return (
          <button
            key={seat._id}
            className={`seat ${seatClass}`}
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
