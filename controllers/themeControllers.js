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
    if (!req.file.originalname) {
        const doc = await Theme.create(req.body)
        res.status(201).json(doc)

    }
    else {
        const doc = await Theme.create({
            name: req.body.name,
            picutre: req.file.originalname,
            themeType: req.body.themeType,
            price: req.body.price,
        });
        res.status(201).json(doc)
    }

})

exports.getAllTheme = factory.getAll(Theme);