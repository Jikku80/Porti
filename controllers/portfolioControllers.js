const fs = require('fs');
const formidable = require('formidable');

const Portfolio = require('./../models/portfolioModel');
const PortfolioImage = require('./../models/portfolioImageModel')
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

exports.createMe = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'portfolioimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.portImage.filepath;
        const blobName = `${req.user.name}-portfolioimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await PortfolioImage.create({
            name: fields.portImageName,
            user: req.user.id,
            addImage: blockBlobClient.url,
        });

        res.redirect(`/myportfolio/${req.user.id}`)
    })
})

exports.createImgColl = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'portfolioimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async function (err, fields, files) {

        const imgs = [];
        let cont;
        if (fields.shownumber == "on") {
            cont = true;
        }
        else {
            cont = false;
        }
        let imagefiles = files.uploadimages;
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
            await Portfolio.create({
                name: fields.portname,
                about: fields.aboutyou,
                what: fields.whatyoudo,
                why: fields.whyyoudo,
                user: req.user.id,
                email: fields.emailaddress,
                fb: fields.social,
                location: fields.address,
                phn_no: fields.phonenumber,
                showNo: cont,
                theme: fields.theme,
                images: imgs
            });
            res.redirect(`/myportfolio/${req.user.id}`)
        }
        else {
            const filePath = files.uploadimages.filepath;
            const blobName = `${req.user.name}-imagecollection-${uuidv1()}.jpeg`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadFile(filePath)
            await Portfolio.create({
                name: fields.portname,
                about: fields.aboutyou,
                what: fields.whatyoudo,
                why: fields.whyyoudo,
                user: req.user.id,
                email: fields.emailaddress,
                fb: fields.social,
                location: fields.address,
                phn_no: fields.phonenumber,
                showNo: cont,
                theme: fields.theme,
                images: blockBlobClient.url
            });
            res.redirect(`/myportfolio/${req.user.id}`)
        }
    })

})

exports.getAllPort = factory.getAll(Portfolio);
exports.getMe = factory.getOne(Portfolio);
exports.updateMe = factory.updateOne(Portfolio);
exports.deleteMe = factory.deleteOne(Portfolio);
exports.makePorti = factory.createOne(Portfolio);

exports.updatePortfolioTheme = catchAsync(async (req, res, next) => {
    const updatedPortfolioTheme = await Portfolio.findByIdAndUpdate(
        req.params.id,
        {
            fontColor: req.body.fontColor,
            headColor: req.body.headColor,
            secHeadColor: req.body.secHeadColor,
            backColor: req.body.backColor,
            focusColor: req.body.focusColor,
            fontFam: req.body.fontFam
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json({
        status: 'success',
        updatedPortfolioTheme
    })
});

exports.updatePrevImgData = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'portfolioimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.upportImage.filepath;
        const blobName = `${req.user.name}-portfolioimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await PortfolioImage.findByIdAndUpdate(
            fields.upId,
            {
                addImage: blockBlobClient.url,
                name: fields.upportImageName
            },
            {
                new: true,
                runValidators: true
            }
        );


        res.redirect(`/myportfolio/${req.user.id}`)
    })
});

exports.deletePorti = catchAsync(async (req, res, next) => {
    const item = await Portfolio.findByIdAndDelete(req.body.id);

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

