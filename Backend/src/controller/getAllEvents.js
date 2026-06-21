const events = require("../models/events")

const getAllEvents = async (req, res) => {
    try {
        const allEvents = await events.find()
        const count = await events.countDocuments()
        // res.status(200).json({ count, allEvents })
        res.status(200).json({ allEvents })

    } catch (error) {
        res.status(400).json({ success: false, message: "Some Error While Getting Information About Events" });
    }
}

module.exports = { getAllEvents }