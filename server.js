require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const serviceRoute = require('./routes/service.routes');
const appointmentRoute = require('./routes/appointment.routes');
const preferenceRoute = require('./routes/preference.routes');
const depenseRoute = require('./routes/depense.routes');
const notificationRoute = require('./routes/notification.routes');
const specialOfferRoute = require('./routes/specialOffer.route');
const statsRoute = require('./routes/stats.routes');
const cors = require('cors');
const notificationMiddlware = require('./middleware/notificationMiddleware');
/*const corsOptions = require('./config/corsOption');
const mongoose = require('mongoose');*/
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

app.use('/work_schedule', require('./routes/work_schedule'))
app.use('/users', require('./routes/users'));
app.use('/services', serviceRoute);
app.use('/appointments', appointmentRoute);
app.use('/preferences', preferenceRoute);
app.use('/depenses', depenseRoute);
app.use('/notification', notificationRoute);
app.use('/special-offers', specialOfferRoute);
app.use('/stats', statsRoute);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});