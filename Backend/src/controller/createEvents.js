const events = require("../models/events")
const Seats = require("../models/Seats")

const createEvents = async (req, res) => {

    const { name, date, place, totalSeats } = req.body
    try {
        const newEvent = new events({ name, date, place, totalSeats })
        const saveEvent = await newEvent.save()

        const seatCreation = []

        for (let i = 1; i <= totalSeats; i++) {
            seatCreation.push({
                eventID: saveEvent._id,
                seatNumber: `S${i}`
            })
        }

        await Seats.insertMany(seatCreation)

        // console.log(seatCreation)

        res.status(200).send(saveEvent._id)

    } catch (error) {
        res.status(400).json({ success: false, message: "Some Error While Creating Events" });
    }


}

module.exports = { createEvents }