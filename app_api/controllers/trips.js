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

const tripsCreate = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    });

    const q = await newTrip.save();

    if (!q) {
        return res
            .status(400)
            .json(err);
    } else {
        return res
            .status(201)
            .json(q);
    }
}

const tripsUpdate = async (req, res) => {
    const q = await Trip
        .findOneAndUpdate(
            {'code' : req.params.tripCode},
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) {
        return res
            .status(400)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
}

module.exports = {
    tripsList, 
    tripsFindByCode, 
    tripsCreate,
    tripsUpdate
};