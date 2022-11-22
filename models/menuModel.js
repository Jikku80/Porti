const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    price: {
        type: String,
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
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Menu must belong to a User']
    },
    theme: {
        type: String
    },
    coverImage: String,
    fontColor: {
        type: String
    },
    headColor: {
        type: String
    },
    secHeadColor: {
        type: String
    },
    backColor: {
        type: String
    },
    focusColor: {
        type: String
    },
    fontFam: {
        type: String
    },
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