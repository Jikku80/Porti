const mongoose = require('mongoose');

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
    Address: {
        type: String,
        trim: true,
    },
    contact: {
        type: String,
        trim: true,
    },
    coverImage: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'Company must belong to a User']
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