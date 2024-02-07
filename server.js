const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3500;
// cross origin Resource sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded
app.use(express.urlencoded({extended: false}));
//built-in middlewarefor json
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open',() =>{
    console.log("MongDB database connection established successfully");
})

app.use('/users', require('./routes/users'))


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));