const express = require('express');
const bodyParser = require('body-parser');
const serviceRoute = require('./routes/service.routes');
const appointmentRoute = require('./routes/appointment.routes');
const notificationRoute = require('./routes/notification.routes');
const cors = require('cors');
/*const corsOptions = require('./config/corsOption');
const mongoose = require('mongoose');*/
require('dotenv').config();
require('./config/db');
const app = express();
const webpush = require('web-push');
const publicKey = 'BF_cZPVjvQyMHBNcnwOGw10RSEOlvUAWkUCUw6NxOkj0uRxfRSB0jggUZG7JytvLdDgrGCaLOTLMN0l5h8p9UbY';
const privateKey = '6te5gvrK-bUmdzxwI0Elw1QERE7YUoQwBS78MqE8_6k';

/*
const sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/eYdKr0fm5hU:APA91bF7Rrf1UijheCkqMHN6VSNBgUn9Yue98Oft4m8wJvA7LPG39l7S0WbYQ4J9P-h-wQF5r3oj17fHes1T5hRqx1nXeMIfKqzbr5pmmm1THU1iD7dHQ_N3e1MUKbUsnIziafOd4xIR","expirationTime":null,"keys":{"p256dh":"BOM7Ozt0OCppEKyAjT672GvwvbRthxlQgf5nL_z3CVqvvoNtQyttUGIivTyXvTqgjsvpuwnzU8nPwQr9ZuIjdJw","auth":"0X6loBoCrJqxzhiJ-e6EZA"}};

const payload = {
    "notification": {
        "data": {
            "onActionClick": {
              "default": {"operation": "focusLastFocusedOrOpen", "url": "/#/users/user-list"}
            }
          },
        title: "Fun oh Heuristic",
        vibrate: [100, 50, 100]
    }
};

webpush.setVapidDetails('mailto:bob.ituniversity@gmail.com', publicKey, privateKey);
webpush.sendNotification(sub, JSON.stringify(payload));
*/
//const cors = require('cors');
// cross origin Resource sharing
app.use(cors());


const PORT = process.env.PORT || 3500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//built-in middleware to handle urlencoded
app.use(express.urlencoded({extended: false}));
//built-in middlewarefor json
app.use(express.json());

app.use('/work_schedule', require('./routes/work_schedule'))
app.use('/users', require('./routes/users'));
app.use('/services', serviceRoute);
app.use('/appointments', appointmentRoute);
app.use('/notification', notificationRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});