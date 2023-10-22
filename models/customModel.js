const mongoose = require('mongoose');

const customthemeSchema = new mongoose.Schema({
    navpos: {
        type: String,
        trim: true
    },
    navfontsize: {
        type: String,
        trim: true
    },
    navfontfam: {
        type: String,
        trim: true
    },
    navvisibility: {
        type: String,
        trim: true
    },
    hamnav: {
        type: String,
        trim: true
    },
    navheight: {
        type: String,
        trim: true
    },
    navwidth: {
        type: String,
        trim: true
    },
    navcontentpos: {
        type: String,
        trim: true
    },
    navbackcol: {
        type: String,
        trim: true
    },
    navcol: {
        type: String,
        trim: true
    },
    covpos: {
        type: String,
        trim: true
    },
    covfilter: {
        type: String,
        trim: true
    },
    covfilterper: {
        type: String,
        trim: true
    },
    covstyle: {
        type: String,
        trim: true
    },
    covvisibility: {
        type: String,
        trim: true
    },
    covheight: {
        type: String,
        trim: true
    },
    covwidth: {
        type: String,
        trim: true
    },
    covimg: {
        type: String,
        trim: true
    },
    bodbackcol: {
        type: String,
        trim: true
    },
    bodcol: {
        type: String,
        trim: true
    },
    bodfontfam: {
        type: String,
        trim: true
    },
    bodalign: {
        type: String,
        trim: true
    },
    bodfontsize: {
        type: String,
        trim: true
    },
    bodwidth: {
        type: String,
        trim: true
    },
    bodpos: {
        type: String,
        trim: true
    },
    searchvisibility: {
        type: String,
        trim: true
    },
    searchpos: {
        type: String,
        trim: true
    },
    searchwidth: {
        type: String,
        trim: true
    },
    searchcol: {
        type: String,
        trim: true
    },
    itembackcol: {
        type: String,
        trim: true
    },
    itemfontcol: {
        type: String,
        trim: true
    },
    flexitem: {
        type: String,
        trim: true
    },
    alignitem: {
        type: String,
        trim: true
    },
    itemfontsize: {
        type: String,
        trim: true
    },  
    itemwidth: {
        type: String,
        trim: true
    },  
    itempos: {
        type: String,
        trim: true
    },
    buttonbackcol: {
        type: String,
        trim: true
    },
    buttoncol: {
        type: String,
        trim: true
    },
    buttonradius: {
        type: String,
        trim: true
    },
    itemmargin: {
        type: String,
        trim: true
    },
    orderbackcol: {
        type: String,
        trim: true
    },
    orderfontcol: {
        type: String,
        trim: true
    },
    flexorder: {
        type: String,
        trim: true
    },
    alignorder: {
        type: String,
        trim: true
    },
    orderfontsize: {
        type: String,
        trim: true
    },  
    orderwidth: {
        type: String,
        trim: true
    },  
    orderpos: {
        type: String,
        trim: true
    },
    ordermargin: {
        type: String,
        trim: true
    },
    // buttonradius: {
    //     type: String,
    //     trim: true
    // },
    // buttonbackcol: {
    //     type: String,
    //     trim: true
    // },
    // buttoncol: {
    //     type: String,
    //     trim: true
    // },
    footerbackcol: {
        type: String,
        trim: true
    },
    footerfontcol: {
        type: String,
        trim: true
    },
    flexfooter: {
        type: String,
        trim: true
    },
    alignfooter: {
        type: String,
        trim: true
    },
    footerfontsize: {
        type: String,
        trim: true
    },  
    footerwidth: {
        type: String,
        trim: true
    },  
    footerpos: {
        type: String,
        trim: true
    },
    footerpadding: {
        type: String,
        trim: true
    },
    footerradius: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'Custom Theme must belong to a User']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

customthemeSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

const CustomTheme = mongoose.model('CustomTheme', customthemeSchema);

module.exports = CustomTheme;