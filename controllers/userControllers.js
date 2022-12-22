const formidable = require('formidable');
const fs = require('fs')

const User = require('./../models/userModel');
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

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);