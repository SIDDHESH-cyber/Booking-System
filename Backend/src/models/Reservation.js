const { default: mongoose } = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    userID: { type: String },
    eventID: { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: true },
    seatNumber: [{ type: String }],
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 10, //5 minutes
    }
})

module.exports = mongoose.model('Reservation', ReservationSchema)