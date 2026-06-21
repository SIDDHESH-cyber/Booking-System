const events = require("../models/events")
const Seats = require("../models/Seats")

const getEventID = async (req, res) => {
    try{

        const eventCheck = await events.findById(req.params.id);
        if(!eventCheck) return res.status(404).json({message : "Event Not Found"})

        const seats = await Seats.find({ eventID: req.params.id })

        res.status(200).send({eventCheck , seats})
    }catch{
            res.status(400).json({ success: false, message: "Some Error While Getting Information About Events" });
    }
}

module.exports = { getEventID }