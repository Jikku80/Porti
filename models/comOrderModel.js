const mongoose = require('mongoose');

const comOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true,
        required: [true, 'Message should be provided!']
    },
    total: {
        type: Number,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    orderInfo: {
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

const ComOrder = mongoose.model('ComOrder', comOrderSchema);

module.exports = ComOrder;