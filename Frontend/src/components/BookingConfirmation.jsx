import React, { useState, useEffect } from "react";
import axios from "axios";

function BookingConfirmation({ reservationData, onSuccess, onFailure }) {
  const [timeLeft, setTimeLeft] = useState(10); // 10 minutes
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(async () => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        return;
      }
      if (timeLeft === 1) {
        clearInterval(timer); // Stop the clock
        setIsExpired(true);
        onFailure("Your 10-minute reservation hold has expired.");

        try {
          console.log("Timer hit zero! Sending cleanup request to API...");

          await axios.post("http://localhost:5000/api/booking/", {
            reserve_id: null,
            eventID: reservationData.eventId,
            seatNumber: reservationData.seats,
          });

          console.log("API cleanup success. Refreshing page now...");
        } catch (err) {
          console.error("Cleanup API failed:", err);
        }

        // Refresh the page AFTER the API call is fully done
        // window.location.reload();
        return;
      }
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, reservationData, onFailure]);

  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:5000/api/booking/", {
        reserve_id: reservationData.reservationId,
        eventID: reservationData.eventId,
        seatNumber: reservationData.seats,
      });
      onSuccess();
    } catch (err) {
      // Run as Query to remove lock from seats

      onFailure("Booking failed. Seats might have expired.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Confirming Your Reservation</h2>

      {isExpired ? (
        <div>
          <h3 style={{ color: "red" }}>⏰ Time Has Expired!</h3>
          <button className="btn" onClick={() => window.location.reload()}>
            🔄 Start Over
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: "24px",
              margin: "20px",
              color: "red",
              fontWeight: "bold",
            }}
          >
            ⏳ Time Remaining: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
          <p>
            <strong>Selected:</strong> {reservationData.seats.join(", ")}
          </p>
          <button
            className="btn"
            style={{ backgroundColor: "#10b981" }}
            onClick={handleConfirm}
          >
            Confirm & Finalize Booking
          </button>
        </>
      )}
    </div>
  );
}

export default BookingConfirmation;
