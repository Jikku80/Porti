const mongoose = require('mongoose');

const comCommentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        trim: true
    },
    companyUserId: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true,
        required: [true, 'Message should be provided!']
    },
    productId: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const ComComment = mongoose.model('ComComment', comCommentSchema);

module.exports = ComComment;