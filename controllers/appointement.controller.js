const AppointementModel = require('../models/appointment.model');
const ObjectID = require('mongoose').Types.ObjectId;
const nodemailer = require('nodemailer');

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
    const currentDay = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1; // Adjust to make Monday the first day of the week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay); // Set to start of current week
    startOfWeek.setHours(0, 0, 0, 0);

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

module.exports.getEmployeScheduleByMonth = async (req, res) => {
    const year = new Date().getFullYear();
    const totalDurationsByMonth = Array(12).fill(0);
    try {
        const appointments = await AppointementModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(year, 0, 1), // Start of the year
                        $lte: new Date(year, 11, 31, 23, 59, 59) // End of the year
                    }
                }
            },
            {
                $unwind: "$services"
            },
            {
                $lookup: {
                    from: "services",
                    localField: "services",
                    foreignField: "_id",
                    as: "service_details"
                }
            },
            {
                $unwind: "$service_details"
            }
        ]);
        appointments.forEach(appointment => {
            const month = new Date(appointment.date).getMonth();
            totalDurationsByMonth[month] += appointment.service_details.duration;
        });
        res.status(200).json(totalDurationsByMonth);
    } catch (err) {
        res.status(500).json({ message: "" + err });
    }
};

module.exports.getEmployeScheduleByWeek = async (req, res) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1; // Adjust to make Monday the first day of the week
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay); // Set to start of current week
    startOfWeek.setHours(0, 0, 0, 0); // Set to beginning of the day

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to end of the week
    endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

    const totalDurationsByDay = Array(7).fill(0);

    try {
        const appointments = await AppointementModel.find({
            date: {
                $gte: startOfWeek,
                $lte: endOfWeek
            }
        }).populate('services');

        appointments.forEach(appointment => {
            const dayOfWeek = new Date(appointment.date).getDay();
            appointment.services.forEach(service => {
                totalDurationsByDay[(dayOfWeek + 6) % 7] += service.duration; // Adjust to make Monday the first day of the week
            });
        });

        res.status(200).json(totalDurationsByDay);
    } catch (err) {
        res.status(500).json({ message: "" + err });
    }
};

module.exports.sendEmail = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maheryandrih1@gmail.com',
            pass: 'd'
        }
    });
    let mailOptions = {
        from: 'maheryandrih1@gmail.com',
        to: 'andria.mahery.nandrianina@gmail.com',
        subject: req.body.subject,
        text: req.body.text
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).json({ message: "" + error });
        } else {
            res.status(200).json("Email envoye avec succès");
        }
    });
}