const mongoose = require('mongoose');

const compReturnSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    userId: {
        type: String,
        trim: true
    },
    product: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    returnInfo: {
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

const CompReturn = mongoose.model('CompReturn', compReturnSchema);

module.exports = CompReturn;