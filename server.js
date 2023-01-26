const dotenv = require('dotenv');
const mongoose = require('mongoose');

// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION! SHUTTING SERVER DOWN...');
//     console.log(err.name, err.message);
//     process.exit();
// })

dotenv.config({ path: './config.env' });
const app = require('./app');

const http = require('http').Server(app);
const io = require('socket.io')(http);

url = process.env.DATABASE_LOCAL;
// url = process.env.DATABASE;

io.on('connection', (socket) => {
    socket.on("resorders", (restoid, oderuser) => {
        io.emit('resorders', restoid, oderuser)
    });
    socket.on("resorderreply", (restoid, oderuser, oderuserid) => {
        io.emit('resorderreply', restoid, oderuser, oderuserid)
    });
    socket.on("catorders", (catid) => {
        io.emit('catorders', catid)
    });
    socket.on("catorderreply", (catid, oderuser, oderuserid) => {
        io.emit('catorderreply', catid, oderuser, oderuserid)
    });
    socket.on("brobooking", (broid) => {
        io.emit('brobooking', broid)
    });
    socket.on("brobookingreply", (broid, brouser, brouserid) => {
        io.emit('brobookingreply', broid, brouser, brouserid)
    });
    socket.on("usermessage", (name, user, message, userid) => {
        io.emit('usermessage', name, user, message, userid)
    });
    socket.on("usermessagereply", (name, user, message, userid) => {
        io.emit('usermessagereply', name, user, message, userid)
    });
})



mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);

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
http.listen(port, () => {
    console.log(`Tapai ko App ${port} port ma chalirako xa...`);
})
