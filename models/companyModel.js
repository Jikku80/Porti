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
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email address!']
    },
    country: {
        type: String,
        trim: true
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
    fontColor: {
        type: String
    },
    headColor: {
        type: String
    },
    secHeadColor: {
        type: String
    },
    focusColor: {
        type: String
    },
    fontFam: {
        type: String
    },
    polygon: {
        type: String
    },
    covWidth: {
        type: String
    },
    covHeight: {
        type: String
    },
    homedelivery: {
        type: Boolean,
        default: false
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
    serviceTerms: {
        type: String,
        trim: true
    },
    privacyPolicies: {
        type: String,
        trim: true
    },
    pageCount: Number,
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