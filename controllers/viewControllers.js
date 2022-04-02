const Message = require('./../models/messageModel');
const User = require('./../models/userModel');

const Portfolio = require('./../models/portfolioModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const atob = require('./../utils/decode');

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

exports.gotoPort = catchAsync(async (req, res, next) => {

    res.status(200).render('create', {
        title: 'Create Portfolio'
    })
})

exports.gotoPortMid = catchAsync(async (req, res) => {
    const num = atob(req.params.num) * 1
    await Portfolio.findOne({ phn_no: num }).populate('user').then(portfolio => {
        res.status(200).render('confirm', {
            title: 'Confirmation',
            portfolio
        })
    }).catch(err => console.log(err));
})

exports.myPort = catchAsync(async (req, res) => {
    const num = atob(req.params.num) * 1
    await Portfolio.findOne({ phn_no: num }).populate('user').then(portfolio => {
        res.status(200).render('layouts/landing', {
            title: 'Porti Detail',
            portfolio
        })
    }).catch(err => console.log(err));
})

exports.myPortTwo = catchAsync(async (req, res) => {
    const num = atob(req.params.num) * 1
    await Portfolio.findOne({ phn_no: num }).populate('user').then(portfolio => {
        res.status(200).render('layouts/landingSec', {
            title: 'Porti Detail',
            portfolio
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
    res.status(200).render('layouts/landing', {
        title: updatedPortfolio.name,
        portfolio: updatedPortfolio
    });
});

exports.updatePortSix = catchAsync(async (req, res, next) => {

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        req.body.id,
        {
            name: req.body.name,
            email: req.body.email,
            fb: req.body.fb,
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
    res.status(200).render('layouts/landing', {
        title: updatedPortfolio.name,
        portfolio: updatedPortfolio
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
            phn_no: req.body.phn_no,
            showNo: req.body.showNo,
            theme: req.body.theme
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



