const DepenseModel = require('../models/depense.model');

module.exports.getDepense = async (req, res) => {
    try{
        const depenses = await DepenseModel.find();
        res.status(200).json(depenses);
    } catch (err) {
        return res.status(400).send("err");
    }
};

module.exports.createDepense = async (req, res) => {
    const newdepense = new DepenseModel({
        name: req.body.name
    });
    try{
        const depense = await newdepense.save();
        return res.status(201).json(depense);
    } catch (err) {
        return res.status(400).send("err");
    }
};