const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: { type: String },
    date: { type: String },
    place: { type: String },
    totalSeats: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Events', eventSchema)