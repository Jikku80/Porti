const fs = require('fs')

const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handleFactory')

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

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();


    pic = req.file;

    pic.originalname = `user-${req.user.name}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/users/${pic.originalname}`);

    next();
});

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
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            photo: req.file.originalname
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
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

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);