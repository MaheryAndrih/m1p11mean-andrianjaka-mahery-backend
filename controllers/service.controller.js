const ServiceModel = require('../models/service.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllServices = async (req, res) => {
    const services = await ServiceModel.find();
    res.status(200).json(services);
};

module.exports.createService = async (req, res) => {
    const newService = new ServiceModel({
        name: req.body.name,
        price: req.body.price,
        duration: req.body.duration,
        commission: req.body.commission,
    });
    try{
        const service = await newService.save();
        return res.status(201).json(service);
    } catch (err) {
        return res.status(400).send("err");
    }
};

module.exports.updateService = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const service = await ServiceModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        return res.send(service);
    } catch (err){
        return res.status(500).json({message: ""+err});
    }
}

module.exports.deleteService = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        await ServiceModel.deleteOne({ _id: req.params.id}).exec();
        res.status(200).json({message: "Succesfully deleted"});
    } catch(err) {
        return res.status(400).json({message: ""+err});
    }
};

module.exports.getServiceById = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: '+req.params.id);

    try{
        const service = await ServiceModel.findById(req.params.id);
        res.status(200).json(service);
    } catch(err){
        return res.status(400).send("err: "+err);
    }
}

module.exports.searchService = async (req, res) => {
    service = {}
    if(req.body.name!=null){
        service.name = req.body.name
    }
    if(req.body.price!=null){
        service.price = req.body.price
    }
    if(req.body.duration!=null){
        service.duration = req.body.duration
    }
    if(req.body.commission!=null){
        service.commission = req.body.commission
    }
    try{
        if(req.body.name==null && req.body.price==null && req.body.duration==null && req.body.commission==null){
            const services = await ServiceModel.find();
            res.status(200).json(services);
        }else{
            const services = await ServiceModel.find(service);
            res.status(200).json(services);
        }
    } catch(err){
        return res.status(400).send("err: "+err);
    }
}