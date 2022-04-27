const mongoose = require('mongoose');
const validator = require('validator');

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide a name!'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email address!']
    },
    phn_no: {
        type: Number,
        trim: true,
        unique: true
    },
    showNo: {
        type: Boolean,
        default: false
    },
    fb: {
        type: String
    },
    location: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'Portfolio must belong to a User']
    },
    theme: {
        type: String,
        trim: true
    },
    imageCover: String,
    imageSecond: String,
    imageThird: String,
    imageFourth: String,
    imageFifth: String,
    images: [String],
    firstImgHead: {
        type: String,
        trim: true
    },
    secondImgHead: {
        type: String,
        trim: true
    },
    thirdImgHead: {
        type: String,
        trim: true
    },
    fourthImgHead: {
        type: String,
        trim: true
    },
    fifthImgHead: {
        type: String,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    what: {
        type: String,
        trim: true
    },
    why: {
        type: String,
        trim: true
    },
    previous: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

portfolioSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;