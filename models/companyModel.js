const mongoose = require('mongoose');
const validator = require('validator');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name should be provided!']
    },
    slogan: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email address!']
    },
    social: {
        type: String,
        trim: true
    },
    locationLink: {
        type: String,
        trim: true
    },
    Address: {
        type: String,
        trim: true,
    },
    compType: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true,
    },
    coverImage: {
        type: String
    },
    themecolor: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'Company must belong to a User']
    },
    theme: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

companySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Company = mongoose.model('Company', companySchema);

module.exports = Company;