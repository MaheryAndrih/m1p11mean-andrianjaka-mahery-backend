const whitelist = ['https://localhost:3500','http://localhost:3000','http://localhost:4200'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else {
            callback(new Error("Not allowed by cors"));
        }
    },
    optionsSuccessStatus: 200
}

module.exports= corsOptions;