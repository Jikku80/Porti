const formidable = require('formidable');
const fs = require('fs')

const User = require('./../models/userModel');
const Portfolio = require('./../models/portfolioModel');
const PortfolioImage = require('./../models/portfolioImageModel');
const Invite = require('./../models/inviteModel');
const Restaurant = require('./../models/restaurantDetailModel')
const Menu = require('./../models/menuModel');
const Banner = require('./../models/bannerModel');
const Company = require('./../models/companyModel');
const Catalouge = require('./../models/catalougeModel');
const CatalogBanner = require('./../models/catalogBannerModel');
const ComComment = require('./../models/comComment');
const Brochure = require('./../models/brochureModel');
const BrochureBanner = require('./../models/brochureBannerModel');
const Organization = require('./../models/organizationModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handleFactory')

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require("@azure/identity");

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This Route is not for Password UPDATES. Please use /updatepassword.', 400))
    };

    const filteredBody = filterObj(req.body, 'name', 'email');

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

exports.removeUserOldImg = catchAsync(async (req, res, next) => {
    const item = await User.findByIdAndUpdate(req.user.id)
    if (fs.existsSync(`public/images/users/${item.photo}`)) {
        if (item.photo.length !== 0) {
            await fs.promises.unlink(`public/images/users/${item.photo}`);
        }
    }

    next();
})

exports.updateDP = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'userprofilepic822810c0-8056-11ed-b011-f529f415676d';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        const filePath = files.upPic.filepath;
        const blobName = `${req.user.name}-profilepic-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)
        await User.findByIdAndUpdate(
            req.user.id,
            {
                photo: blockBlobClient.url
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.redirect(`/me`)
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    //doesnt delete data from database
    const item = await User.findByIdAndUpdate(req.user.id, { active: false });
    //deletes data from database
    // await User.findByIdAndDelete(req.user._id);

    if (fs.existsSync(`public/images/users/${item.photo}`)) {
        if (item.photo.length !== 0) {
            await fs.promises.unlink(`public/images/users/${item.photo}`);
        }
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use /signup instead!'
    })
}

exports.updateAccountType = catchAsync(async (req, res, next) => {

    const port = await Portfolio.findOne({ user: req.params.id })

    if (port !== null) {
        await Portfolio.findOneAndDelete({ user: req.params.id });

        let data = []
        await PortfolioImage.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await PortfolioImage.findByIdAndDelete(item)
        })
    }

    const restro = await Restaurant.findOne({ user: req.params.id })

    if (restro !== null) {
        await Restaurant.findOneAndDelete({ user: req.params.id });

        let data = []
        await Menu.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await Menu.findByIdAndDelete(item)
        })

        await Banner.findOneAndDelete({ user: req.params.id })
    }

    const company = await Company.findOne({ user: req.params.id })

    if (company !== null) {
        await Company.findOneAndDelete({ user: req.params.id });

        let data = []
        await Catalouge.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await Catalouge.findByIdAndDelete(item)
        })

        let comdata = []
        await ComComment.find({ companyUserId: req.params.id }).then(item => {
            item.filter(el => {
                comdata.push(el.id)
            })
        });

        comdata.forEach(async (item) => {
            await ComComment.findByIdAndDelete(item)
        })
        await CatalogBanner.findOneAndDelete({ user: req.params.id })
    }

    const organization = await Organization.findOne({ user: req.params.id })

    if (organization !== null) {
        await Organization.findOneAndDelete({ user: req.params.id });

        let data = []
        await Brochure.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await Brochure.findByIdAndDelete(item)
        })

        await BrochureBanner.findOneAndDelete({ user: req.params.id })
    }

    await User.findByIdAndUpdate(
        req.params.id,
        {
            accountType: req.body.accountType
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        status: 'Success'
    });
});

exports.closeAccount = catchAsync(async (req, res, next) => {

    const port = await Portfolio.findOne({ user: req.params.id })

    if (port !== null) {
        await Portfolio.findOneAndDelete({ user: req.params.id });

        let data = []
        await PortfolioImage.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await PortfolioImage.findByIdAndDelete(item)
        })
    }

    const invi = await Invite.find({ user: req.params.id })

    if (invi.length !== 0) {
        let data = []
        await Invite.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await Invite.findByIdAndDelete(item)
        })
    }

    const restro = await Restaurant.findOne({ user: req.params.id })

    if (restro !== null) {
        await Restaurant.findOneAndDelete({ user: req.params.id });

        let data = []
        await Menu.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await Menu.findByIdAndDelete(item)
        })

        await Banner.findOneAndDelete({ user: req.params.id })
    }

    const company = await Company.findOne({ user: req.params.id })

    if (company !== null) {
        await Company.findOneAndDelete({ user: req.params.id });

        let data = []
        await Catalouge.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await Catalouge.findByIdAndDelete(item)
        })

        let comdata = []
        await ComComment.find({ companyUserId: req.params.id }).then(item => {
            item.filter(el => {
                comdata.push(el.id)
            })
        });

        comdata.forEach(async (item) => {
            await ComComment.findByIdAndDelete(item)
        })
        await CatalogBanner.findOneAndDelete({ user: req.params.id })
    }

    const organization = await Organization.findOne({ user: req.params.id })

    if (organization !== null) {
        await Organization.findOneAndDelete({ user: req.params.id });

        let data = []
        await Brochure.find({ user: req.params.id }).then(item => {
            item.filter(el => {
                data.push(el.id)
            })
        });

        data.forEach(async (item) => {
            await Brochure.findByIdAndDelete(item)
        })

        await BrochureBanner.findOneAndDelete({ user: req.params.id })
    }

    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
        status: 'Success'
    });
})

exports.validateUsers = catchAsync(async (req, res, next) => {
    let usrname = req.params.username
    let uname = usrname.toLowerCase();
    await User.findOne({ name: uname }).then(item => {
        if (item) {
            res.status(403).json({
                status: 'Failed'
            })
        }
        else {
            res.status(200).json({
                status: 'Success'
            })
        }
    })
})

exports.validateEmail = catchAsync(async (req, res, next) => {
    let usrname = req.params.useremail
    let uname = usrname.toLowerCase();
    await User.findOne({ email: uname }).then(item => {
        if (item) {
            res.status(403).json({
                status: 'Failed'
            })
        }
        else {
            res.status(200).json({
                status: 'Success'
            })
        }
    })
})

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);