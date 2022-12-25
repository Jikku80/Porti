const dotenv = require('dotenv');
const mongoose = require('mongoose');

// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION! SHUTTING SERVER DOWN...');
//     console.log(err.name, err.message);
//     process.exit();
// })

dotenv.config({ path: './config.env' });
const app = require('./app');

// url = process.env.DATABASE_LOCAL;
url = process.env.DATABASE;

mongoose.Promise = global.Promise;

mongoose.connect(url,
    {
        useNewUrlParser: true
    }
)
    .then(() => console.log("DB Connection Successful!"))
    .catch(err => {
        console.log("Could not connect to the database", err);
        process.exit();
    });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Tapai ko App ${port} port ma chalirako xa...`);
})
