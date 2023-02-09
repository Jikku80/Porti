const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    searchName: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Message must belong to a User']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;