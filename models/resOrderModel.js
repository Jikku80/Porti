const mongoose = require('mongoose');

const resOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    restro: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true,
        required: [true, 'Message should be provided!']
    },
    table: {
        type: String,
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
    total: {
        type: Number,
        trim: true
    },
    homedelivery: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const ResOrder = mongoose.model('ResOrder', resOrderSchema);

module.exports = ResOrder;