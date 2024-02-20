const express = require('express');
const bodyParser = require('body-parser');
const serviceRoute = require('./routes/service.routes');
const appointmentRoute = require('./routes/appointment.routes');
const notificationRoute = require('./routes/notification.routes');
const cors = require('cors');
const notificationMiddlware = require('./middleware/notificationMiddleware');
/*const corsOptions = require('./config/corsOption');
const mongoose = require('mongoose');*/
require('dotenv').config();
require('./config/db');
const app = express();

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

notificationMiddlware.sendPush();

app.use('/work_schedule', require('./routes/work_schedule'))
app.use('/users', require('./routes/users'));
app.use('/services', serviceRoute);
app.use('/appointments', appointmentRoute);
app.use('/notification', notificationRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});