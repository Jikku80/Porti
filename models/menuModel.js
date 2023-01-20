const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
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
        trim: true,
        required: [true, 'Please provide Price to your item']
    },
    category: {
        type: String,
        uppercase: true
    },
    detail: {
        type: String,
        trim: true
    },
    applydiscount: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean,
        default: true
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

menuSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;