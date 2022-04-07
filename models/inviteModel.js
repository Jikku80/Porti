const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'You must provide a name!'],
        trim: true
    },
    sname: {
        type: String,
        required: [true, 'You must provide a name!'],
        trim: true
    },
    phn_no: {
        type: Number,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Invitation must belong to a User']
    },
    theme: {
        type: String,
        trim: true
    },
    imgCover: String,
    imgSecond: String,
    imgThird: String,
    imgFourth: String,
    imgFifth: String,
    imgs: [String],
    about: {
        type: String,
        trim: true
    },
    pdate: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    featuring: {
        type: String,
        trim: true
    },
    ptime: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

inviteSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;