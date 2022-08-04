const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Name should be provided!']
    },
    picture: String,
    themeId: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Theme must have a unique themeId']
    },
    themeType: {
        type: String,
    },
    themeCategory: String,
    price: {
        type: Number,
        trim: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    validUser: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;