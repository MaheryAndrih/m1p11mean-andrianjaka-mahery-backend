const notificationMiddlware = require('../middleware/notificationMiddleware');
const specialOffer = require('../models/specialOffer.model');

const receiveSubscription = async (req, res) => {
    const sub = req.body;
    res.json(sub);
}

const sendPushNotification = async (req, res) => {
    specialOffer.SpecialOffer.findOne().sort({ _id: -1 }).populate('services')
    .then(offers => {
        
    const payload = {
        "notification": {
            "data": {
                "onActionClick": {
                  "default": {"operation": "focusLastFocusedOrOpen", "url": "/#/users/user-list"}
                }
              },
            title: offers.offerName,
            vibrate: [100, 50, 100],
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsSmDGUx_39ggCLpYevJWANp6DdkJTcB_zDvkRqitXA&s"
        }
    };
    notificationMiddlware.sendPush(payload,res);
    })
    .catch(err => res.json(err));

    
    
}
module.exports = {receiveSubscription, sendPushNotification}