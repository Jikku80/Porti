const fs = require('fs');
const formidable = require('formidable');

const Theme = require('./../models/themeModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require("@azure/identity");

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createTheme = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'layoutimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.picture.filepath;
        const blobName = `${req.user.name}-layoutthemeimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)
        await Theme.create({
            name: fields.themename,
            themeId: fields.themeId,
            themeType: fields.themeType,
            themeCategory: fields.themeCategory,
            price: fields.themeprice,
            paid: fields.paid,
            picture: blockBlobClient.url,
            createdAt: Date.now()
        });
        res.redirect(`/api/themes/tweaktheme`)
    })

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