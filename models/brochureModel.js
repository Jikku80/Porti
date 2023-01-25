const mongoose = require('mongoose');

const brochureSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    currency: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    detail: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Menu must belong to a User']
    },
    theme: {
        type: String
    },
    coverImage: String,
    itemLike: [String],
    itemDisLike: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

brochureSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Brochure = mongoose.model('Brochure', brochureSchema);

module.exports = Brochure;