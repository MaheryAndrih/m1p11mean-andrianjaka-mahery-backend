const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    lastName: String,
    firstName: String,
    birthDate: Date, // Utilisation du type Date pour la date de naissance
    gender: {
        code: String,
        name: String
    },
    email: { 
        type: String,
        unique: false //  pour assure que l'email est unique, on met unique: true
    },
    phoneNumber: String,
    password: String, // À remplacer par un champ haché (utilisation de bcrypt recommandée)
    privilege: {
        type: Schema.Types.ObjectId,
        ref: 'Privilege' // Référence à une collection distincte pour les privilèges
    },
    picture: String 
},
{
    timestamps: false,
});

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };
