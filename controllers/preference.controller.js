const PreferenceModel = require('../models/preference.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getCustomerPreferences = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const preference = await PreferenceModel.find({customer: req.params.id}).populate('service').populate('employe');
        res.status(200).json(preference);
    } catch(err){
        return res.status(400).send("err: "+err);
    }
};

module.exports.createPreferences = async (req, res) => {
    const newPreference = new PreferenceModel(req.body);
    try{
        const preference = await newPreference.save();
        return res.status(201).json(preference);
    } catch (err) {
        return res.status(400).send("err");
    }
};

module.exports.updatePreference = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const preference = await PreferenceModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        return res.send(preference);
    } catch (err){
        return res.status(500).json({message: ""+err});
    }
};