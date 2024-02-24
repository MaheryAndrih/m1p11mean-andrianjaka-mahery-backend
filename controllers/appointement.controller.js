const AppointementModel = require('../models/appointment.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.createAppointement = async (req, res) => {
    const newAppointment = new AppointementModel({
        date: req.body.date,
        heure: req.body.heure,
        customer: req.body.customer,
        employe: req.body.employe,
        services: req.body.services,
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

module.exports.getAppointmentsCountByMonth = async (req, res) => {
    const year = new Date().getFullYear();
    const countsByMonth = [];
    for (let month = 1; month <= 12; month++) {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);
        try {
            const count = await AppointementModel.countDocuments({
                date: {
                    $gte: startOfMonth,
                    $lte: endOfMonth
                }
            });
            countsByMonth.push(count);
        } catch (err) {
            return res.status(500).json({ message: "" + err });
        }
    }
    res.status(200).json(countsByMonth);
}

module.exports.getAppointmentsCountByWeek = async (req, res) => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to start of current week
    startOfWeek.setHours(0, 0, 0, 0); // Set to beginning of the day

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to end of the week
    endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

    try {
        const countsByDay = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            date.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            const count = await AppointementModel.countDocuments({
                date: {
                    $gte: date,
                    $lte: endOfDay
                }
            });

            countsByDay.push(count || 0);
        }

        res.status(200).json(countsByDay);
    } catch (err) {
        res.status(500).json({ message: "" + err });
    }
}
