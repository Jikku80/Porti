const mongoose = require('mongoose');

const resReserveSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    userId: {
        type: String,
        trim: true
    },
    numberPeople: {
        type: Number,
        trim: true
    },
    restro: {
        type: String,
        trim: true
    },
    restroName: {
        type: String,
        trim: true
    },
    time: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    bookingInfo: {
        type: String,
        trim: true
    },
    phn_no: {
        type: Number,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const ResReserve = mongoose.model('ResReserve', resReserveSchema);

module.exports = ResReserve;