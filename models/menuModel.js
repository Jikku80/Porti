const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    price: {
        type: Number,
        required: [true, 'Please provide Price to your item']
    },
    category: {
        type: String
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
    coverImage: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;