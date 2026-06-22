import { useState, useEffect } from 'react';
import axios from 'axios';
import SeatGrid from './components/SeatGrid';
import BookingConfirmation from './components/BookingConfirmation';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [eventData, setEventData] = useState(null);
  const [userName, setUserName] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [activeReservation, setActiveReservation] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data..allEvents));
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    axios.get(`http://localhost:5000/api/events/${selectedEventId}`)
      .then(res => setEventData(res.data));
  }, [selectedEventId]);

  useEffect(() => {
  if (!selectedEventId) return;
  const fetchSeats = () => {
    axios.get(`http://localhost:5000/api/events/${selectedEventId}`)
      .then(res => setEventData(res.data))
      .catch(err => console.error("Error refreshing seats:", err));
  };
  fetchSeats();
  const interval = setInterval(fetchSeats, 11000); 
  return () => clearInterval(interval);

}, [selectedEventId]);

  const handleReserve = async () => {
    if (!userName.trim() || selectedSeats.length === 0) {
      setError('Please type your name and select at least one seat.');
      return;
    }
    console.log(userName,selectedEventId,selectedSeats)
    try {
      const res = await axios.post('http://localhost:5000/api/reserve', {
        userID: userName,
        eventID: selectedEventId,
        seatNumber: selectedSeats
      });

      setActiveReservation({ reservationId: res.data._id, eventId: selectedEventId, seats: selectedSeats });
      setStep(2); 
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Seats are no longer available.');
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', color: '#6d28d9' }}>Bookings System - SortMyScene</h1>
      {error && <div className="error-banner">{error}</div>}

      {step === 1 ? (
        <div>
          <div className="input-group">
            <label><strong>Your Full Name</strong></label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>

          <div className="input-group">
            <label><strong>Select Live Event</strong></label>
            <select
              value={selectedEventId}
              onChange={(e) => { setSelectedEventId(e.target.value); setSelectedSeats([]); }}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}>
              <option value="">-- Choose an Event --</option>
              {events.map(evt => <option key={evt._id} value={evt._id}>{evt.name}</option>)}
            </select>
          </div>

          {eventData && (
            <>
              <SeatGrid seats={eventData.seats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
              <button className="btn" onClick={handleReserve}>Reserve Seats Now</button>
            </>
          )}
        </div>
      ) : (
        <BookingConfirmation 
          reservationData={activeReservation} 
          onSuccess={() => { alert('Success!'); window.location.reload(); }}
          onFailure={(msg) => { setError(msg); setStep(1); }}
        />
      )}
    </div>
  );
}

export default App;
