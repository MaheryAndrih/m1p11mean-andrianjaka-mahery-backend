const { response } = require('express');
const specialOffer = require('../models/specialOffer.model');
const serviceModel = require('../models/service.model');
const saveSpecialOffer = async (req, res) => {
    const document = new specialOffer.SpecialOffer(req.body);
    document.save()
    .then(saved =>{
        return specialOffer.SpecialOffer.findById(saved._id).populate('services')
    })
    .then(new_offer =>{
        service = {
            name: new_offer.offerName,
            price: new_offer.offerPrice,
            commission: 20,
            duration: 0
        }

        new_offer.services.forEach(offer => {
            service.duration = service.duration + offer.duration;
        });

        return new serviceModel(service).save()
    })
    .then(service => res.json(service))
    .catch(err => res.json(err));
}

const getAllSpecialOffers = async (req, res) => {
    specialOffer.SpecialOffer.find().populate('services')
    .then(offers => res.json(offers))
    .catch(err => res.json(err));
}

const updateSpecialOffer = async (req, res) => {
    const criteria = {_id: req.params.id};
    const updateData = {$set: req.body};
    specialOffer.SpecialOffer.updateOne(criteria, updateData)
    .then(data => res.json(data))
    .catch(err => res.json(err));
}

const getSpecialOfferById = async (req, res) => {
    offerId = req.params.id;
    specialOffer.SpecialOffer.findById(offerId).populate('services')
    .then(data => res.json(data))
    .catch(err => res.json(err))
}

module.exports = {saveSpecialOffer, getAllSpecialOffers, updateSpecialOffer, getSpecialOfferById};