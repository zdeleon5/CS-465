const mongoose = require('mongoose');
const Trip = require('../models/travlr');

const tripsList = async (req, res) => {
    try {
        const q = await Trip
        .find({})
        .exec();
        console.log(q);

        if (!q) {
            return res.status(404).json({ message: "No trips found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const tripsFindByCode = async (req, res) => {
    try {
        const q = await Trip
        .find({code: req.params.tripCode})
        .exec();
        console.log(q);

        if (!q) {
            return res.status(404).json({ message: "No trips found" });
        } else {
            return res.status(200).json(q);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    tripsList, tripsFindByCode
};