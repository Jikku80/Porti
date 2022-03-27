const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address!'],
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email address!']
    },
    siteType: {
        type: String,
        enum: ['E-commerce', 'Logistic', 'Blog', 'E-learning', 'Media', 'Other'],
        default: 'E-commerce'
    },
    message: {
        type: String,
        trim: true
    },
    sentAt: {
        type: Date,
        default: Date.now()
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;