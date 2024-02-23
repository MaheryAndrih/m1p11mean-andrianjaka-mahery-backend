const AppointementModel = require('../models/appointment.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.createAppointement = async (req, res) => {
    const newAppointment = new AppointementModel({
        date: req.body.date,
        heure: req.body.heure,
        customer: req.body.customer,
        employe: req.body.employe,
        services: [req.body.services],
        rappel: req.body.rappel
    });
    try{
        const appointment = await newAppointment.save();
        return res.status(201).json(appointment);
    } catch(err){
        return res.status(400).send("err: "+err);
    }
}

module.exports.getHistoriqueUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const appoitments = await AppointementModel.find({customer: req.params.id}).populate('services').populate('customer');
        res.status(200).json(appoitments);
    } catch(err){
        return res.status(400).send("err: "+err);
    }
}

module.exports.getAppointmentList = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const appoitments = await AppointementModel.find({employe: req.params.id}).populate('services').populate('customer');
        res.status(200).json(appoitments);
    } catch(err){
        return res.status(400).send("err: "+err);
    }
}

module.exports.getAppointmentById = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const appointment = await AppointementModel.findById(req.params.id).populate('services');
        res.status(200).json(appointment);
    } catch(err){
        return res.status(400).send("err: "+err);
    }

}

module.exports.getAllAppointement = async (req, res) => {
    try{
        const appoitments = await AppointementModel.find().populate('services').populate('employe');
        res.status(200).json(appoitments);
    } catch(err){
        return res.status(400).send("err: "+err);
    }
}

module.exports.deleteAppointement = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        await AppointementModel.deleteOne({ _id: req.params.id}).exec();
        res.status(200).json({message: "Succesfully deleted"});
    } catch(err) {
        return res.status(400).json({message: ""+err});
    }
};

module.exports.payedAppointment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const appointment = await AppointementModel.findByIdAndUpdate(
            { _id: req.params.id },
            { ispayed: true },
            { new: true }
        );
        return res.send(appointment);
    } catch (err){
        return res.status(500).json({message: ""+err});
    }
}

module.exports.unpayedAppointment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const appointment = await AppointementModel.findByIdAndUpdate(
            { _id: req.params.id },
            { ispayed: false },
            { new: true }
        );
        return res.send(appointment);
    } catch (err){
        return res.status(500).json({message: ""+err});
    }
}

module.exports.getTaskCommission = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const appoitments = await AppointementModel.find({employe: req.params.id}).populate('services').populate('customer');
        res.status(200).json(appoitments);
    } catch(err){
        return res.status(400).send("err: "+err);
    }
}