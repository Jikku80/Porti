const mongoose = require('mongoose');

const userMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Message must belong to a User']
    },
    message: {
        type: String,
        trim: true
    },
    sentBy: {
        type: String,
        trim: true
    },
    sentAt: {
        type: String,
        trim: true
    },
    received: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const UserMessage = mongoose.model('UserMessage', userMessageSchema);

module.exports = UserMessage;