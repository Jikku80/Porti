const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    slogan: {
        type: String,
        trim: true
    },
    Address: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'Restaurante must belong to a User']
    },
    theme: {
        type: String
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

restaurantSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;