const Reservation = require("../models/Reservation");
const Seats = require("../models/Seats");

const bookingSeat = async (req, res) => {

    const { reserve_id, eventID, seatNumber } = req.body;

    try {
        const reservationCheck = await Reservation.findById(reserve_id);

        if (reservationCheck == null) throw new Error("Error");

        const updateSeat = await Seats.updateMany(
            // { eventID, seatNumber: { $in: seatNumber }, reserve_id, status:"lock" },
            { eventID, seatNumber: { $in: seatNumber }, reserve_id },
            {
                $set: { status: "close", reserve_id: null },
            },
        );
        const deleteReservation = await Reservation.findByIdAndDelete(reserve_id)

        res.status(200).json({ success: true, message: "Your Booking Confirmed" });
        return;

    } catch {
            const timeOutSeats = await Seats.updateMany(
                { eventID, seatNumber: { $in: seatNumber } },
                {
                    $set: { status: "open", reserve_id: null },
                },
            );
            res.status(400).json({ success: false, message: "Your Booking Time Expired" });

            return;
        }
};

module.exports = { bookingSeat }