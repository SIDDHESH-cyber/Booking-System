require('dotenv').config()

const express = require('express')
const { connect_to_database } = require('./config/connect_to_database')

const { getAllEvents } = require('./controller/getAllEvents')
const { createEvents } = require('./controller/createEvents')
const { getEventID } = require('./controller/getEventID')
const { reservationSeat } = require('./controller/reservationSeat')
const { bookingSeat } = require('./controller/bookingSeat')
const cors = require('cors');

const app = express()

connect_to_database()
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json())

app.get('/', (req, res) => res.send('Booking System Project'))

app.get('/api/events', getAllEvents)
app.get("/api/events/:id", getEventID)

app.post("/api/events", createEvents)
app.post('/api/reserve', reservationSeat)
app.post("/api/booking", bookingSeat)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))