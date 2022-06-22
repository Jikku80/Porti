const fs = require('fs');

const multer = require('multer');
const sharp = require('sharp');
const Portfolio = require('./../models/portfolioModel');
const PortfolioImage = require('./../models/portfolioImageModel')
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

exports.uploadPortImages = upload.single('addImage')

exports.uploadPortfolioCoverImage = upload.single('imageCover');

exports.uploadImages = upload.fields([
    { name: 'images', maxCount: 20 }
]);


exports.resizeNewPortImages = catchAsync(async (req, res, next) => {

    if (!req.file) return next();
    let img = req.file;

    img.originalname = `port-${req.user.name}-${Date.now()}-coverImage.jpeg`;
    await sharp(img.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/imageCover/${img.originalname}`);

    next();
});

exports.resizeNewPortAddImages = catchAsync(async (req, res, next) => {

    if (!req.file) return next();
    let img = req.file;

    img.originalname = `port-${req.user.name}-${Date.now()}-previous-work.jpeg`;
    await sharp(img.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/addedImages/${img.originalname}`);

    next();
});


exports.resizePortImages = catchAsync(async (req, res, next) => {

    if (!req.files.images) return next();
    let img = req.files.images

    req.body.images = []

    await Promise.all(
        img.map(async (file, i) => {
            const filename = `port-${req.user.name}-${Date.now()}-${i + 1}-imageCollec.jpeg`;

            await sharp(file.buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/images/ports/imageColl/${filename}`);

            req.body.images.push(filename);
        })
    );
    next();
});

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createMe = catchAsync(async (req, res, next) => {
    const doc = await PortfolioImage.create({
        name: req.body.name,
        user: req.user.id,
        addImage: req.file.originalname,
    });

    res.status(201).json(doc)
})

exports.createImgColl = catchAsync(async (req, res, next) => {

    const doc = await Portfolio.create({
        name: req.body.name,
        user: req.user.id,
        about: req.body.about,
        what: req.body.what,
        why: req.body.why,
        email: req.body.email,
        fb: req.body.fb,
        location: req.body.location,
        phn_no: req.body.phn_no,
        showNo: req.body.showNo,
        theme: req.body.theme,
        images: req.body.images
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.getAllPort = factory.getAll(Portfolio);
exports.getMe = factory.getOne(Portfolio);
exports.updateMe = factory.updateOne(Portfolio);
exports.deleteMe = factory.deleteOne(Portfolio);
exports.makePorti = factory.createOne(Portfolio);

exports.removePrevOldImg = catchAsync(async (req, res, next) => {
    const item = await PortfolioImage.findByIdAndUpdate(req.params.id)
    if (fs.existsSync(`public/images/ports/addedImages/${item.addImage}`)) {
        if (item.addImage.length !== 0) {
            await fs.promises.unlink(`public/images/ports/addedImages/${item.addImage}`);
        }
    }

    next();
})

exports.updatePrevImgData = catchAsync(async (req, res, next) => {
    const updatedPortfolioImage = await PortfolioImage.findByIdAndUpdate(
        req.params.id,
        {
            addImage: req.file.originalname,
            name: req.body.name
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json({
        status: 'success',
        portImage: updatedPortfolioImage
    })
});

exports.deletePorti = catchAsync(async (req, res, next) => {
    const item = await Portfolio.findByIdAndDelete(req.body.id);
    const addItem = await PortfolioImage.deleteMany({ user: req.params.uid });

    if (fs.existsSync(`public/images/ports/imageCover/${item.imageCover}`)) {
        if (item.imageCover.length !== 0) {
            await fs.promises.unlink(`public/images/ports/imageCover/${item.imageCover}`);
        }
    }
    if (fs.existsSync(`public/images/ports/addedImages/${addItem.addImage}`)) {
        if (addItem.addImage.length !== 0) {
            await fs.promises.unlink(`public/images/ports/addedImages/${addItem.addImage}`);
        }
    }

    let imgs = item.images;
    for (let i = 0; i < imgs.length; i++) {
        if (fs.existsSync(`public/images/ports/imageColl/${item.images[i]}`)) {
            if (item.images[i].length !== 0) {
                await fs.promises.unlink(`public/images/ports/imageColl/${item.images[i]}`);
            }
        }
    }

    if (!item) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
})

exports.deletePortiImage = catchAsync(async (req, res, next) => {
    const item = await PortfolioImage.findByIdAndDelete(req.params.id);
    if (fs.existsSync(`public/images/ports/addedImages/${item.addImage}`)) {
        if (item.addImage.length !== 0) {
            await fs.promises.unlink(`public/images/ports/addedImages/${item.addImage}`);
        }
    }

    if (!item) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
})

exports.paginatePortImage = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const pg = req.params.page
    const features = new APIFeatures(PortfolioImage.find({ user: user_id }), { limit: 4, page: pg }).paginate();
    await features.query.then((items) => {
        res.status(200).json(items)
    })
})

exports.paginatePortImageTwl = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const pg = req.params.page
    const features = new APIFeatures(PortfolioImage.find({ user: user_id }), { limit: 12, page: pg }).paginate();
    await features.query.then((items) => {
        res.status(200).json(items)
    })
})

