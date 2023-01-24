const fs = require('fs');
const formidable = require('formidable');

const qr = require('qrcode');

const Message = require('./../models/messageModel');
const User = require('./../models/userModel');

const APIFeatures = require('./../utils/apiFeatures')

const Portfolio = require('./../models/portfolioModel');
const PortfolioImages = require('./../models/portfolioImageModel');
const Banner = require('./../models/bannerModel');
const CatalogBanner = require('./../models/catalogBannerModel');
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

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require("@azure/identity");

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
    const portfolio = await Portfolio.findOne({ user: usr[0]._id }).populate('user')
    if (portfolio !== null) {
        const features = new APIFeatures(PortfolioImage.find({ user: usr[0]._id }), { limit: 12, page: pg }).paginate();
        const portImage = await features.query
        const allPortImg = await PortfolioImage.find({ user: usr[0]._id })
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
            case "f3106672cef9fa2b11e24a80049874404fc7d1c6":
                res.status(200).render('layouts/seventh', {
                    title: portfolio.name,
                    portfolio,
                    portImage
                });
                break;
            case "fc40ac89c9100d87048e2603edcf58adfc94e6c3":
                res.status(200).render('layouts/eighth', {
                    title: portfolio.name,
                    portfolio,
                    allPortImg
                });
                break;
            default:
                res.status(404).render('404.pug')
        }
        return;
    }

    const restro = await Restaurant.find({ user: usr[0]._id }).populate('user')

    if (restro.length !== 0) {
        const feature = new APIFeatures(Menu.find({ user: usr[0]._id }), { limit: 12, page: req.query.page }).paginate().srt();
        const menus = await feature.query
        // const allmenus = await Menu.find({ user: usr[0]._id });
        let allmenus = await Menu.find({ user: usr[0]._id }).then(arr => {
            return distinctCat = [...new Set(arr.map(x => x.category))];
        })

        const banner = await Banner.find({ user: usr[0]._id })
        let theme = restro[0].theme

        switch (theme) {
            case "40bd001563085fc35165329ea1ff5c5ecbdbbeef":
                res.status(200).render('menu/firstMenu', {
                    title: `${restro[0].name}`,
                    restro,
                    menus
                })
                break;
            case "f7154fcf991cb48c394345221cf2f2d631cd4f15":
                res.status(200).render('menu/secondMenu', {
                    title: `${restro[0].name}`,
                    restro,
                    allmenus,
                    banner
                })
                break;
            default:
                res.status(404).render('404.pug')
        }
        return;
    }

    const company = await Company.find({ user: usr[0]._id }).populate('user')

    if (company.length !== 0) {
        const featres = new APIFeatures(Catalouge.find({ user: usr[0]._id }), { limit: 12, page: req.query.page }).paginate().srt();
        const catalouges = await featres.query
        const banner = await CatalogBanner.find({ user: usr[0]._id })
        const hotItems = await Catalouge.find({ user: usr[0]._id }).then(el => {
            const items = el.filter(item => {
                if (item.hotItem === true) {
                    return item
                }
            })
            return items
        })
        let theme = company[0].theme
        switch (theme) {
            case "51eac6b471a284d3341d8c0c63d0f1a286262a18":
                res.status(200).render('catalouge/firstCatalouge', {
                    title: `${company[0].name}`,
                    catalouges,
                    company: company[0]
                })
                break;
            case "e8d4bd5004021ea34a450c4482093ab20853fe68":
                res.status(200).render('catalouge/secondCatalouge', {
                    title: `${company[0].name}`,
                    catalouges,
                    company: company[0],
                    banner,
                    hotItems
                })
                break;
            default:
                res.status(404).render('404.pug')
        }
        return;
    }
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

exports.updatePortImgData = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'portfolioimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.portcoverImage.filepath;
        const blobName = `${req.user.name}-coverimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Portfolio.findByIdAndUpdate(
            req.params.id,
            {
                imageCover: blockBlobClient.url,
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.redirect(`/myportfolio/${req.user.id}`)
    })

});

exports.updatePortImgCollec = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'portfolioimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async function (err, fields, files) {

        const imgs = [];
        let imagefiles = files.upimagescollec;
        if (imagefiles.length >= 2) {
            await Promise.all(
                imagefiles.map(async (file, i) => {
                    const blobName = `${req.user.name}-imagecollection-${uuidv1()}-${i + 1}.jpeg`;
                    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    const filePath = file.filepath;
                    await blockBlobClient.uploadFile(filePath)
                    imgs.push(blockBlobClient.url);
                })
            );


            await Portfolio.findByIdAndUpdate(
                fields.upportid,
                {
                    images: imgs
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            res.redirect(`/myportfolio/${req.user.id}`)
        }
        else {
            const filePath = files.upimagescollec.filepath;
            const blobName = `${req.user.name}-imagecollection-${uuidv1()}.jpeg`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadFile(filePath)
            await Portfolio.findByIdAndUpdate(
                fields.upportid,
                {
                    images: blockBlobClient.url
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            res.redirect(`/myportfolio/${req.user.id}`)
        }
    })

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



