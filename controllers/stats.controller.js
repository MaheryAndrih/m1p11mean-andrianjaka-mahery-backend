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

const dailySalesVolume = async (req, res) => {
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
            dayOfWeek: { $dayOfWeek: "$date" }, // Changer le groupement par jour de la semaine
            year: { $year: "$date" },
            totalServicesPrice: "$serviceDetails.price"
          }
        },
        {
          $group: {
            _id: {
              dayOfWeek: "$dayOfWeek", // Changer la clé de groupement
              year: "$year"
            },
            totalServicesPrice: { $sum: "$totalServicesPrice" },
          }
        },
        {
          $project: {
            _id: 0,
            dayOfWeek: "$_id.dayOfWeek", // Changer le nom de la clé dans le résultat
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

module.exports = {salesVolume, dailySalesVolume}