const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb://localhost:27017/"+process.env.DB_NAME,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB: ",err));