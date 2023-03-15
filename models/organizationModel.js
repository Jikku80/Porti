const mongoose = require('mongoose');
const validator = require('validator');

const organizationSchema = new mongoose.Schema({
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
    orgType: {
        type: String,
        trim: true
    },
    contact: {
        type: Number,
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
    pageCount: {
        type: Number
    },
    serviceTerms: {
        type: String,
        trim: true
    },
    privacyPolicies: {
        type: String,
        trim: true
    },
    currency: {
        type: String,
        trim: true
    },
    total: {
        type: Number,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'Company must belong to a User']
    },
    theme: {
        type: String,
        default: "65954198f2f59aac9b415952aa9c614fd74245ff"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

organizationSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;