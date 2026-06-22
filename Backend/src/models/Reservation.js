const { default: mongoose } = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    userID: { type: String },
    eventID: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
    seatNumber: [{ type: String }],
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 600, //10 minutes
    }
})

module.exports = mongoose.model('Reservation', ReservationSchema)