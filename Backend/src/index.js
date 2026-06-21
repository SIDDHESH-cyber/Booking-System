require('dotenv').config()

const express = require('express')
const { connect_to_database } = require('./config/connect_to_database')

const { getAllEvents } = require('./controller/getAllEvents')
const { createEvents } = require('./controller/createEvents')
const { getEventID } = require('./controller/getEventID')
const { reservationSeat } = require('./controller/reservationSeat')
const { bookingSeat } = require('./controller/bookingSeat')
const cors = require('cors');
// const Seats = require('./models/Seats')

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




// app.post("/api/bookings" , async (req, res) => {
//     const { eventID, reserve_id, seatNumber } = req.body;
//     try {
//         // const cleanEventID = new mongoose.Types.ObjectId(eventID);
//         // const cleanLockID = new mongoose.Types.ObjectId(reserve_id);

//         // const seatArray = Array.isArray(seatNumber) ? seatNumber : [seatNumber];
// console.log(eventID,seatNumber,reserve_id)
//         const updateResult = await Seats.updateMany(
//             {
//                 eventID,
//                 reserve_id,
//                 seatNumber: { $in: seatNumber },
//                 status: "lock",
//             },
//             {
//                 $set: {
//                     status: "close",
//                     reserve_id: null
//                 }
//             }
//         );

//         console.log("Database Response:", updateResult);

//         if (updateResult.matchedCount === 0) {
//             return res.status(400).send("No matching locked seats found. The lock may have expired.");
//         }

//         return res.send("Updated Successfully");

//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Server Error processing booking");
//     }
// })


// 1. MAKE SURE MONGOOSE IS REQUIRED AT THE VERY TOP OF YOUR index.js
const mongoose = require('mongoose'); 

// 2. UPDATE YOUR ROUTE TO THIS:
// app.post("/api/bookings" , async (req, res) => {
//     const { eventID, reserve_id, seatNumber } = req.body;
    
//     try {
//         const updateResult = await Seats.updateMany(
//             { eventID, seatNumber: { $in: seatNumber }, reserve_id },
//             {
//                 $set: { status: "close", reserve_id: null },
//             },
//         );

//         console.log("Database Response:", updateResult);

//         if (updateResult.matchedCount === 0) {
//             return res.status(400).send("No matching locked seats found. The lock may have expired.");
//         }

//         return res.send("Updated Successfully");

//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Server Error processing booking");
//     }
// });


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))