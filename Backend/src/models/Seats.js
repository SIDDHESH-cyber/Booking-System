const { default: mongoose } = require("mongoose");

const seatSchema = new mongoose.Schema({
    eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Events', required: true },
    seatNumber: { type: String, required: true },
    status: {
        type: String,
        enum: ['open', 'close', 'lock'],
        default: "open"
    },
    reserve_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }
})

module.exports = mongoose.model('Seats', seatSchema)