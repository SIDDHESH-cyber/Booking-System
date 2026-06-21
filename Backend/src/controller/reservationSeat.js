const Reservation = require("../models/Reservation");
const Seats = require("../models/Seats");

const reservationSeat = async (req, res) => {
    const { eventID, seatNumber, userID } = req.body;

    try {
        const newReserve = new Reservation({ userID, eventID, seatNumber })
        const saveReserve = await newReserve.save()

        const updateSeats = await Seats.updateMany(
            {
                eventID,
                seatNumber: { $in: seatNumber },
                status: "open"
            },
            {
                $set: {
                    status: "lock",
                    reserve_id: saveReserve._id
                }
            })

        res.status(200).json({ success: true, message: "Your Seat Is Reserved" , _id : saveReserve._id});

    } catch (error) {

        res.status(400).json({ success: false, message: "Your Seat Is Not Reserved due to Some Error" });

    }
}

module.exports = { reservationSeat }