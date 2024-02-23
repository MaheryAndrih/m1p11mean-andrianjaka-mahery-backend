const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const specialOfferSchema = new Schema({
    offerName: String,
    offerPrice: Number,
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        required: true,
    }]
},
{
    timestamps: false,
});

const SpecialOffer = mongoose.model('SpecialOffer', specialOfferSchema);

module.exports = { SpecialOffer, specialOfferSchema };
