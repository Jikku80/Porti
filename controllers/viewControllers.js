const fs = require('fs');

const qr = require('qrcode');

const Message = require('./../models/messageModel');
const User = require('./../models/userModel');

const Portfolio = require('./../models/portfolioModel');
const Invite = require('./../models/inviteModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const atob = require('./../utils/decode');

exports.homePage = catchAsync(async (req, res, next) => {
    res.status(200).render('homepage', {
        title: 'Home'
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
    })
})

exports.gotoPort = catchAsync(async (req, res, next) => {

    const portfolio = await Portfolio.find({ user: req.user.id })
    res.status(200).render('create', {
        title: 'create',
        portfolio: portfolio[0]
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
    await Portfolio.findOne({ user: id }).populate('user').then(portfolio => {
        res.status(200).render('layouts/landing', {
            title: 'Porti Detail',
            portfolio
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
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/first', {
            title: portfolio.name,
            portfolio
        })
    })
})

exports.layoutSecond = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/second', {
            title: portfolio.name,
            portfolio
        })
    })
})

exports.layoutThird = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/third', {
            title: portfolio.name,
            portfolio
        })
    })
})

exports.layoutFourth = catchAsync(async (req, res, next) => {
    const port_id = atob(req.params.id)
    await Portfolio.findById(port_id).populate('user').then(portfolio => {

        res.status(200).render('layouts/fourth', {
            title: portfolio.name,
            portfolio
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
            previous: req.body.previous
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

exports.updatePortSix = catchAsync(async (req, res, next) => {

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
            firstImgHead: req.body.firstImgHead,
            secondImgHead: req.body.secondImgHead,
            thirdImgHead: req.body.thirdImgHead,
            fourthImgHead: req.body.fourthImgHead,
            fifthImgHead: req.body.fifthImgHead
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
    if (fs.existsSync(`public/images/ports/imageSecond/${item.imageSecond}`)) {
        if (item.imageSecond.length !== 0) {
            await fs.promises.unlink(`public/images/ports/imageSecond/${item.imageSecond}`);
        }
    }
    if (fs.existsSync(`public/images/ports/imageThird/${item.imageThird}`)) {
        if (item.imageThird.length !== 0) {
            await fs.promises.unlink(`public/images/ports/imageThird/${item.imageThird}`);
        }
    }
    if (fs.existsSync(`public/images/ports/imageFourth/${item.imageFourth}`)) {
        if (item.imageFourth.length !== 0) {
            await fs.promises.unlink(`public/images/ports/imageFourth/${item.imageFourth}`);
        }
    }
    if (fs.existsSync(`public/images/ports/imageFifth/${item.imageFifth}`)) {
        if (item.imageFifth.length !== 0) {
            await fs.promises.unlink(`public/images/ports/imageFifth/${item.imageFifth}`);
        }
    }

    next();
})

exports.updatePortImgData = catchAsync(async (req, res, next) => {

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.body.id,
        {
            firstImgHead: req.body.firstImgHead,
            secondImgHead: req.body.secondImgHead,
            thirdImgHead: req.body.thirdImgHead,
            fourthImgHead: req.body.fourthImgHead,
            fifthImgHead: req.body.fifthImgHead,
            imageCover: req.files.imageCover[0].originalname,
            imageSecond: req.files.imageSecond[0].originalname,
            imageThird: req.files.imageThird[0].originalname,
            imageFourth: req.files.imageFourth[0].originalname,
            imageFifth: req.files.imageFifth[0].originalname
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



