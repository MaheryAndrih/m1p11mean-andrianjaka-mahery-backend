const user = require('../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const logged_user = await user.User.findOne({email});
        if(!logged_user){
            return res.status(401).json({message: 'Authentication failed'});
        }
        if(logged_user.password != password){
            return res.status(401).json({message: 'Authentication failed'});
        }
        const token = jwt.sign({userId: logged_user._id}, 'secret-key', {expiresIn: '6h'});
        
        res.status(200).json({
            "token": token,
            "user": logged_user
        });
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = {login}