const fs = require('fs');

const multer = require('multer');
const sharp = require('sharp');
const Theme = require('./../models/themeModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadThemeImage = upload.single('picture');

exports.resizeThemeImage = catchAsync(async (req, res, next) => {

    if (!req.file) return next();
    let img = req.file;

    img.originalname = `port-${req.user.name}-${Date.now()}-themeImage.jpeg`;
    await sharp(img.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/themeImage/${img.originalname}`);

    next();
});

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createTheme = catchAsync(async (req, res, next) => {
    if (!req.file) {
        const doc = await Theme.create({
            name: req.body.themename,
            themeId: req.body.themeId,
            themeType: req.body.themeType,
            themeCategory: req.body.themeCategory,
            price: req.body.themeprice,
            paid: req.body.paid,
            validUser: req.body.validUser
        })
        res.status(201).json(doc)

    }
    else {
        const doc = await Theme.create({
            name: req.body.themename,
            themeId: req.body.themeId,
            picture: req.file.originalname,
            themeType: req.body.themeType,
            themeCategory: req.body.themeCategory,
            price: req.body.themeprice,
            paid: req.body.paid,
            validUser: req.body.validUser
        });
        res.status(201).json(doc)
    }

});

exports.updateTheme = catchAsync(async (req, res, next) => {
    const updatedTheme = await Theme.updateOne({ themeId: req.params.id }, {
        $set: { paid: false },
        $push: {
            validUser: req.user.id
        }
    },
        {
            new: true,
            runValidators: true
        })

    res.status(200).json({
        status: 'success',
        updatedTheme
    });
});

// exports.updateTheme = catchAsync(async (req, res, next) => {
//     const updatedTheme = await Theme.findByIdAndUpdate(
//         req.params.id,
//         {
//             paid: req.body.paid,
//             validUser: req.body.validUser
//         },
//         {
//             new: true,
//             runValidators: true
//         }
//     );

//     res.status(200).json({
//         status: 'success',
//         updatedTheme
//     });
// });

exports.themeForm = catchAsync(async (req, res, next) => {
    res.status(200).render('tweakTheme', {
        title: "Tweak Theme"
    })
})

exports.getAllTheme = factory.getAll(Theme);