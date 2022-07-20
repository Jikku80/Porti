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
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const atob = require('./../utils/decode');
const PortfolioImage = require('../models/portfolioImageModel');

exports.homePage = catchAsync(async (req, res, next) => {
    res.status(200).render('homepage', {
        title: 'LakheyDeTech'
    })
})

exports.getOverview = catchAsync(async (req, res, next) => {

    res.status(200).render('overview', {
        title: 'Login | SignUp',
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
    res.status(200).render('create', {
        title: 'Unleash The Power',
        portfolio,
        portfolioImage,
        menu,
        catalouge,
        restro,
        company
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
    await Portfolio.findOne({ user: id }).populate('user').then(portfolio => {
        res.status(200).render('layouts/landing', {
            title: 'Portfolio Detail',
            portfolio,
            portImage
        })
    }).catch(err => console.log(err));
})

exports.myInvi = catchAsync(async (req, res) => {
    const id = req.params.id
    await Invite.findOne({ _id: id }).populate('user').then(invite => {
        res.status(200).render('layouts/landingSec', {
            title: 'Invitation Detail',
            invite
        })
    }).catch(err => console.log(err));
})

exports.layoutFirst = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    const user_id = atob(req.params.userid)
    const pg = 1;
    const features = new APIFeatures(PortfolioImage.find({ user: user_id }), { limit: 12, page: pg }).paginate();
    const portImage = await features.query
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/first', {
            title: portfolio.name,
            portfolio,
            portImage
        })
    })
})

exports.layoutSecond = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    const user_id = atob(req.params.userid)
    const pg = 1;
    const features = new APIFeatures(PortfolioImage.find({ user: user_id }), { limit: 12, page: pg }).paginate();
    const portImage = await features.query
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/second', {
            title: portfolio.name,
            portfolio,
            portImage
        })
    })
})

exports.layoutThird = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    const user_id = atob(req.params.userid)
    const pg = 1;
    const features = new APIFeatures(PortfolioImage.find({ user: user_id }), { limit: 12, page: pg }).paginate();
    const portImage = await features.query
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/third', {
            title: portfolio.name,
            portfolio,
            portImage
        })
    })
})

exports.layoutFourth = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    const user_id = atob(req.params.userid)
    const pg = 1;
    const features = new APIFeatures(PortfolioImage.find({ user: user_id }), { limit: 12, page: pg }).paginate();
    const portImage = await features.query
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/fourth', {
            title: portfolio.name,
            portfolio,
            portImage
        })
    })
})

exports.layoutFifth = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/fifth', {
            title: portfolio.name,
            portfolio
        })
    })
})

exports.layoutSixth = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/sixth', {
            title: portfolio.name,
            portfolio
        })
    })
})

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    });
};


exports.updateUserData = catchAsync(async (req, res, next) => {
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
            theme: req.body.theme,
            about: req.body.about,
            what: req.body.what,
            why: req.body.why,
            previous: req.body.previous,
            failure: req.body.failure,
            motivation: req.body.motivation,
            msg: req.body.msg,
            problem: req.body.problem,
            solution: req.body.solution
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
            location: req.body.location,
            phn_no: req.body.phn_no,
            showNo: req.body.showNo,
            theme: req.body.theme
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

exports.urlShortner = catchAsync(async (req, res, next) => {
    const longurl = req.body.longurl;
    if (longurl.length === 0) res.send('Empty Data!');

    // shortUrl.short(longurl, (err, url) => {
    //     if (err) res.send('Error Occured');
    //     res.status(201).json({
    //         status: 'success',
    //         url
    //     })
    // })
})



