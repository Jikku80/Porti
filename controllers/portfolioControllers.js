const multer = require('multer');
const sharp = require('sharp');
const Portfolio = require('./../models/portfolioModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');

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

exports.uploadPortImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'imageSecond', maxCount: 1 },
    { name: 'imageThird', maxCount: 1 },
    { name: 'imageFourth', maxCount: 1 },
    { name: 'imageFifth', maxCount: 1 },
    { name: 'imageSixth', maxCount: 1 },
    { name: 'imageSeventh', maxCount: 1 },
    { name: 'imageEigth', maxCount: 1 },
    { name: 'imageNineth', maxCount: 1 },
    { name: 'imageTenth', maxCount: 1 }
]);

// exports.uploadPortImages = upload.single('imageCover');

exports.resizeNewPortImages = catchAsync(async (req, res, next) => {

    if (!req.files) return next();

    let img = req.files.imageCover[0];

    img.originalname = `port-${img.fieldname}-${Date.now()}-previous-work.jpeg`;
    await sharp(img.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/imageCover/${img.originalname}`);

    let img2 = req.files.imageSecond[0];

    img2.originalname = `port-${img2.fieldname}-${Date.now()}-previous-work.jpeg`;
    await sharp(img2.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/imageSecond/${img2.originalname}`);

    let img3 = req.files.imageThird[0];

    img3.originalname = `port-${img3.fieldname}-${Date.now()}-previous-work.jpeg`;
    await sharp(img3.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/imageThird/${img3.originalname}`);

    let img4 = req.files.imageFourth[0];

    img4.originalname = `port-${img4.fieldname}-${Date.now()}-previous-work.jpeg`;
    await sharp(img4.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/imageFourth/${img4.originalname}`);

    let img5 = req.files.imageFifth[0];

    img5.originalname = `port-${img5.fieldname}-${Date.now()}-previous-work.jpeg`;
    await sharp(img5.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/imageFifth/${img5.originalname}`);

    console.log("nexting...")
    next();
});

exports.resizePortImages = catchAsync(async (req, res, next) => {

    if (!req.file.originalname) return next();

    req.file.originalname = `port-${req.body.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/ports/${req.file.originalname}`);
    next();
});

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createMe = catchAsync(async (req, res, next) => {
    const doc = await Portfolio.create({
        name: req.body.name,
        user: req.user.id,
        email: req.body.email,
        fb: req.body.fb,
        phn_no: req.body.phn_no,
        showNo: req.body.showNo,
        about: req.body.about,
        what: req.body.what,
        why: req.body.why,
        previous: req.body.previous,
        theme: req.body.theme,
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
