const appointmentModel = require('../models/appointment.model');

const salesVolume = async (req, res) => {
    appointmentModel.aggregate([
        {
          $lookup: {
            from: "services",
            localField: "services",
            foreignField: "_id",
            as: "serviceDetails"
          }
        },
        {
          $unwind: "$serviceDetails"
        },
        {
          $project: {
            _id: 1,
            month: { $month: "$date" },
            year: { $year: "$date" },
            totalServicesPrice: "$serviceDetails.price"
          }
        },
        {
          $group: {
            _id: {
              month: "$month",
              year: "$year"
            },
            totalServicesPrice: { $sum: "$totalServicesPrice" },
          }
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            totalServicesPrice: 1,
          }
        }
      ])
    .then(appointments => {
        res.json(appointments);
    })
    .catch(err => res.status(400).json('Error; '+err));
}

module.exports = {salesVolume}