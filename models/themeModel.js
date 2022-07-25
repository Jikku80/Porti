const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Name should be provided!']
    },
    picture: String,
    themeType: {
        type: String,
    },
    price: {
        type: String,
        trim: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;