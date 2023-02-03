const mongoose = require('mongoose');

const orgBookSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        trim: true
    },
    organization: {
        type: String,
        trim: true
    },
    organizationName: {
        type: String,
        trim: true
    },
    numberPeople: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    todate: {
        type: String,
        trim: true
    },
    time: {
        type: String
    },
    total: {
        type: Number,
        trim: true
    },
    phn_no: {
        type: Number,
        trim: true
    },
    bookingInfo: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const OrgBook = mongoose.model('OrgBook', orgBookSchema);

module.exports = OrgBook;