const mongoose = require('mongoose');

const catalougeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    serialno: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please provide Price to your item']
    },
    category: {
        type: String,
        trim: true,
        uppercase: true
    },
    subcategory: {
        type: String,
        trim: true,
        uppercase: true
    },
    detail: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Catalouge must belong to a User']
    },
    currency: {
        type: String,
        trim: true
    },
    applydiscount: {
        type: Boolean,
        default: false
    },
    hotItem: {
        type: Boolean,
        default: false
    },
    stockQuantity: {
        type: Number,
        trim: true
    },
    coverImage: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

catalougeSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Catalouge = mongoose.model('Catalouge', catalougeSchema);

module.exports = Catalouge;