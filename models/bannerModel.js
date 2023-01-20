const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    bannerInfo: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    discountpercent: {
        type: Number,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'Restaurante must belong to a User']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

bannerSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;