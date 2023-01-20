const mongoose = require('mongoose');

const catalogBannerSchema = new mongoose.Schema({
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

catalogBannerSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const CatalogBanner = mongoose.model('CatalogBanner', catalogBannerSchema);

module.exports = CatalogBanner;