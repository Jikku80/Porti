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
        type: String,
        trim: true,
        required: [true, 'Please provide Price to your item']
    },
    category: {
        type: String,
        trim: true
    },
    subcategory: {
        type: String,
        trim: true
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
    theme: {
        type: String
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