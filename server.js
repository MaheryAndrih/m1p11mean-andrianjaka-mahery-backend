const express = require('express');
const bodyParser = require('body-parser');
const serviceRoute = require('./routes/service.routes');
const appointmentRoute = require('./routes/appointment.routes');
const cors = require('cors');
/*const corsOptions = require('./config/corsOption');
const mongoose = require('mongoose');*/
require('dotenv').config();
require('./config/db');
const app = express();
const webpush = require('web-push');
const publicKey = 'BF_cZPVjvQyMHBNcnwOGw10RSEOlvUAWkUCUw6NxOkj0uRxfRSB0jggUZG7JytvLdDgrGCaLOTLMN0l5h8p9UbY';
const privateKey = '6te5gvrK-bUmdzxwI0Elw1QERE7YUoQwBS78MqE8_6k';

const sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/fQHZ6cnKkAA:APA91bEOgJsDscka_7lA0neyaxbH7IgqyEcUE785C2vdUusma5dKA9plVXqCXP1BCbG-LlDdQjGB3lQBNyhTeevo6MhYaLgzKAqznfgbQDGensuzaQ6xjRqLGVV2qKOkEoP4EnA6Gbxp","expirationTime":null,"keys":{"p256dh":"BOsxTh9gp2dj9FURCX--6mxZBRWnBCsY0C-ekjZMvqqXRXTR4F5CU59eBblQhtUHKtvLXbJZK3aNc7GxOQetCGI","auth":"IDB2cgCQWRQywPCZGTONaw"}}

const payload = {
    "notification": {
        data: {url:'http://www.youtube.com/funofheuristic'},
        title: "Fun oh Heuristic",
        vibrate: [100, 50, 100]
    }
};

webpush.setVapidDetails('mailto:bob.ituniversity@gmail.com', publicKey, privateKey);
webpush.sendNotification(sub, JSON.stringify(payload));
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});