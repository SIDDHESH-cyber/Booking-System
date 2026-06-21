Create a Model -> Events , Seats , Seat_lock
Api -> Event_Create (With Number of Seats , Name Of Events , Price of Per Seat), 

POST event
GET events
GET events/:id

POST /lock_seat -> 10mins expire
POST /booking_confirmed

GET /seats


Expired Reservation Should not allow booking (After Expiry the Seat should be avaible to all user)
Prevent Double Booking using atomic operations or transcation 

Monogo -> Interanl Ledger = Oplog (Operational Log ) to access it Change Stream is use ; Change Stream to subscribe to a model so that any changes occur it can fire an event 
Websocket -> 2 way connection so can send any event when occured at backend


Backend With Expiry and without any security and optimisation and double booking

