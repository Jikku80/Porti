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
    country: {
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
    resType: {
        type: String,
        trim: true
    },
    theme: {
        type: String
    },
    phn_no: {
        type: Number,
        trim: true
    },
    homedelivery: {
        type: Boolean,
        default: false
    },
    serviceTerms: {
        type: String,
        trim: true
    },
    privacyPolicies: {
        type: String,
        trim: true
    },
    coverImage: String,
    pageCount: Number,
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