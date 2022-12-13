const fs = require('fs');

const qr = require('qrcode');

const Message = require('./../models/messageModel');
const User = require('./../models/userModel');

const APIFeatures = require('./../utils/apiFeatures')

const Portfolio = require('./../models/portfolioModel');
const PortfolioImages = require('./../models/portfolioImageModel');
const Restaurant = require('./../models/restaurantDetailModel');
const Menu = require('./../models/menuModel');
const Catalouge = require('./../models/catalougeModel');
const Company = require("./../models/companyModel");
const Invite = require('./../models/inviteModel');
const Theme = require('./../models/themeModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const PortfolioImage = require('../models/portfolioImageModel');
const { compareSync } = require('bcryptjs');
const { constants } = require('crypto');

exports.homePage = catchAsync(async (req, res, next) => {
    res.status(200).render('homepage', {
        title: 'LakheyDeTech'
    })
})

exports.getOverview = catchAsync(async (req, res, next) => {

    res.status(200).render('overview', {
        title: 'Login | SignUp'
    })
})

exports.getAllMsg = catchAsync(async (req, res, next) => {

    const message = await Message.find();
    res.status(200).render('message', {
        title: 'messages',
        message
    })
})

exports.newMsg = catchAsync(async (req, res, next) => {
    await Message.create(req.body)

    res.status(200).render('overview', {
    })
})

exports.portiHighlights = catchAsync(async (req, res, next) => {
    res.status(200).render('highlights', {
        title: "Porti Highlights"
    })
})

exports.gotoPort = catchAsync(async (req, res, next) => {

    const portfolio = await Portfolio.findOne({ user: req.user.id })
    const portfolioImage = await PortfolioImage.findOne({ user: req.user.id })
    const menu = await Menu.findOne({ user: req.user.id })
    const catalouge = await Catalouge.findOne({ user: req.user.id })
    const restro = await Restaurant.findOne({ user: req.user.id })
    const company = await Company.findOne({ user: req.user.id })
    const theme = await Theme.find().sort('-createdAt');
    res.status(200).render('create', {
        title: `Let's Suit Up`,
        portfolio,
        portfolioImage,
        menu,
        catalouge,
        restro,
        company,
        theme
    })
})

exports.gotoInviMid = catchAsync(async (req, res) => {
    const id = req.params.id
    await Invite.find({ user: id }).populate('user').then(invites => {
        res.status(200).render('Invitations', {
            title: 'Your Invitations',
            invites
        })
    }).catch(err => console.log(err));
})

exports.myPort = catchAsync(async (req, res) => {
    const id = req.params.id
    const pg = 1;
    const features = new APIFeatures(PortfolioImage.find({ user: id }), { limit: 4, page: pg }).paginate();
    const portImage = await features.query
    const theme = await Theme.find({ themeCategory: "Portfolio" })
    await Portfolio.findOne({ user: id }).populate('user').then(portfolio => {
        res.status(200).render('layouts/landing', {
            title: 'Portfolio Detail',
            portfolio,
            portImage,
            theme
        })
    }).catch(err => console.log(err));
})

exports.myInvi = catchAsync(async (req, res) => {
    const id = req.params.id
    const theme = await Theme.find({ themeCategory: "Invitation" })
    await Invite.findOne({ _id: id }).populate('user').then(invite => {
        res.status(200).render('layouts/landingSec', {
            title: 'Invitation Detail',
            invite,
            theme
        })
    }).catch(err => console.log(err));
})

exports.layoutTally = catchAsync(async (req, res, next) => {
    const user_name = req.params.username
    const usr = await User.find({ name: user_name });

    const pg = 1;
    const features = new APIFeatures(PortfolioImage.find({ user: usr[0]._id }), { limit: 12, page: pg }).paginate();
    const portImage = await features.query
    await Portfolio.findOne({ user: usr[0]._id }).populate('user').then(portfolio => {

        let theme = portfolio.theme

        switch (theme) {
            case "a9993e364706816aba3e25717850c26c9cd0d89d":
                res.status(200).render('layouts/first', {
                    title: portfolio.name,
                    portfolio,
                    portImage
                })
                break;
            case "589c22335a381f122d129225f5c0ba3056ed5811":
                res.status(200).render('layouts/second', {
                    title: portfolio.name,
                    portfolio,
                    portImage
                })
                break;
            case "481743d632b80d39bc2771d19be3ca3005b3f8af":
                res.status(200).render('layouts/third', {
                    title: portfolio.name,
                    portfolio,
                    portImage
                })
                break;
            case "d798d4338adeb553a1089a58e61e18c2fcdf77bb":
                res.status(200).render('layouts/fourth', {
                    title: portfolio.name,
                    portfolio,
                    portImage
                });
                break;
            case "da98568d1b2005611973ad49868b38aa8ae68fd7":
                res.status(200).render('layouts/fifth', {
                    title: portfolio.name,
                    portfolio
                })
                break;
            case "836b9b955a98e0f2e2d678c179696d6ac53356eb":
                res.status(200).render('layouts/sixth', {
                    title: portfolio.name,
                    portfolio
                });
                break;
            default:
                res.status(404).render('404.pug')
        }

    })
});

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    });
};


exports.updateUserData = catchAsync(async (req, res, next) => {
    const UserList = await User.find();
    let newUserName = req.body.name;
    let inun = newUserName.toLowerCase()
    let allUserNames = []
    UserList.forEach((item) => {
        userNames = item.name
        allUserNames.push(userNames.toLowerCase())
    })

    if (allUserNames.includes(inun)) {
        return next(new AppError('User with this username already exits', 409));
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name,
            email: req.body.email
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser
    });
});

exports.restForm = (req, res) => {
    res.status(200).render('reset', {
        title: 'Reset Your Password'
    })
}

exports.updatePortData = catchAsync(async (req, res, next) => {

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.body.id,
        {
            name: req.body.name,
            email: req.body.email,
            fb: req.body.fb,
            location: req.body.location,
            phn_no: req.body.phn_no,
            showNo: req.body.showNo,
            role: req.body.role,
            theme: req.body.theme,
            about: req.body.about,
            what: req.body.what,
            why: req.body.why,
            previous: req.body.previous,
            failure: req.body.failure,
            motivation: req.body.motivation,
            msg: req.body.msg,
            problem: req.body.problem,
            solution: req.body.solution,
            searchVisible: req.body.searchVisible
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json({
        status: 'success',
        updatedPortfolio
    });
});

exports.updatePortDataSec = catchAsync(async (req, res, next) => {

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.body.id,
        {
            name: req.body.name,
            about: req.body.about,
            what: req.body.what,
            why: req.body.why,
            email: req.body.email,
            fb: req.body.fb,
            role: req.body.role,
            location: req.body.location,
            phn_no: req.body.phn_no,
            showNo: req.body.showNo,
            theme: req.body.theme,
            searchVisible: req.body.searchVisible
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json({
        status: 'success',
        updatedPortfolio
    });
});

exports.removePortiOldImg = catchAsync(async (req, res, next) => {
    const item = await Portfolio.findByIdAndUpdate(req.body.id)
    if (fs.existsSync(`public/images/ports/imageCover/${item.imageCover}`)) {
        if (item.imageCover.length !== 0) {
            await fs.promises.unlink(`public/images/ports/imageCover/${item.imageCover}`);
        }
    }

    next();
})

exports.updatePortImgData = catchAsync(async (req, res, next) => {

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.body.id,
        {
            imageCover: req.file.originalname,
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).render('layouts/landing', {
        title: updatedPortfolio.name,
        portfolio: updatedPortfolio
    });
});

exports.removePortiOldImgColl = catchAsync(async (req, res, next) => {
    const item = await Portfolio.findByIdAndUpdate(req.body.id)
    let imgs = item.images;
    for (let i = 0; i < imgs.length; i++) {
        if (fs.existsSync(`public/images/ports/imageColl/${item.images[i]}`)) {
            if (item.images[i].length !== 0) {
                await fs.promises.unlink(`public/images/ports/imageColl/${item.images[i]}`);
            }
        }
    }
    next();
})

exports.updatePortImgCollec = catchAsync(async (req, res, next) => {

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.body.id,
        {
            images: req.body.images
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).render('layouts/landing', {
        title: updatedPortfolio.name,
        portfolio: updatedPortfolio
    });
});

exports.qrCodeGen = catchAsync(async (req, res, next) => {
    const qrUrl = req.body.qrurl;
    if (qrUrl.length === 0) res.send('Empty Data!');

    qr.toDataURL(qrUrl, (err, src) => {
        if (err) res.send('Error Occured');
        res.status(201).json({
            status: 'success',
            src
        });
    })
})


exports.searchPorti = catchAsync(async (req, res, next) => {
    const values = req.params.values;
    const lowVals = values.toLowerCase();

    if (lowVals == "portfolio" || lowVals == "portfolios" || lowVals == "profile" || lowVals == "profiles") {
        const portfolio = await Portfolio.find({ searchVisible: true })
        res.status(200).json({ status: 'success', portfolio })
        return;
    }

    if (lowVals == "menu" || lowVals == "food menu" || lowVals == "menues" || lowVals == "menus" || lowVals == "Restaurant" || lowVals == "Resraurants" || lowVals == "restro") {
        const restro = await Restaurant.find();
        res.status(200).json({ status: 'success', restro })
        return;
    }

    if (lowVals == "catalog" || lowVals == "cataloges" || lowVals == "catalouge" || lowVals == "catalogs" || lowVals == "cataloge" || lowVals == "catalouges" || lowVals == "company" || lowVals == "companies") {
        const company = await Company.find();
        res.status(200).json({ status: 'success', company })
        return;
    }

    const portfolio = await Portfolio.find().then(ports => {
        const por = ports.filter(item => {
            let lownam = (item.name).toLowerCase();
            let lowrole = (item.role).toLowerCase();
            if ((lownam.includes(lowVals) && item.searchVisible == true) || (lowrole.includes(lowVals) && item.searchVisible == true)) {
                let searchVal = Portfolio.find({ name: item.name })
                return searchVal
            }
            return false
        });
        return por
    })

    const restro = await Restaurant.find().then(resto => {
        const restr = resto.filter(item => {
            let lownam = (item.name).toLowerCase();
            let lowtype = (item.resType).toLowerCase();
            if ((lownam.includes(lowVals)) || (lowtype.includes(lowVals))) {
                let searchVal = Restaurant.find({ name: item.name })
                return searchVal
            }
            return false
        });
        return restr
    })

    const company = await Company.find().then(comp => {
        const comps = comp.filter(item => {
            let lownam = (item.name).toLowerCase();
            let lowtype = (item.compType).toLowerCase();
            if ((lownam.includes(lowVals)) || (lowtype.includes(lowVals))) {
                let searchVal = Company.find({ name: item.name })
                return searchVal
            }
            return false
        });
        return comps
    })
    res.status(200).json({
        status: 'success',
        portfolio,
        restro,
        company
    });

})

exports.toPage = catchAsync(async (req, res, next) => {
    const user_id = req.params.user_id;
    const types = req.params.types;
    await User.findOne({ _id: user_id }).then((user) => {
        user_name = user.name
        if (types == "portfolio") {
            res.redirect(`/profile/${user_name}`)
        }
        if (types == "restro") {
            res.redirect(`/menu/${user_name}`)
        }
        if (types == "company") {
            res.redirect(`/catalog/${user_name}`)
        }
    });
})

exports.searchPage = catchAsync(async (req, res, next) => {
    res.status(200).render('search', {
        title: 'Discover'
    })
})



