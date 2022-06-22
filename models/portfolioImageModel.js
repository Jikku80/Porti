const mongoose = require('mongoose');

const portfolioImageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Portfolio Image must belong to a User']
    },
    addImage: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

portfolioImageSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const PortfolioImage = mongoose.model('PortfolioImage', portfolioImageSchema);

module.exports = PortfolioImage;