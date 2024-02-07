const user = require('../models/user.model');
const { Privilege } = require('../models/privilege.model');

const saveUser = async (req, res) => {


    const document = new user.User(req.body);
    document.save()
    .then(savedDocument =>{
        console.log("document saved successfully", savedDocument);
    })
    .catch(error =>{
        console.log("error occured while saving:", error);
    });
    
    res.json({message:"post is working"});
}

const getAllUsers = async (req,res) => {
    user.User.find()
    .then(users => {
        //console.log(ingredients);
        res.json(users);
    })
    .catch(err => res.status(400).json('Error; '+err));
}

const getAllPrivileges = async (req,res) => {
    Privilege.find()
    .then(privileges => {
        //console.log(privileges);
        res.json(privileges);
    })
    .catch(err => res.status(400).json('Error; '+err));
}

module.exports = {getAllUsers,saveUser,getAllPrivileges};