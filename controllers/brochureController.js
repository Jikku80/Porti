const fs = require('fs');
const formidable = require('formidable');

const Theme = require('./../models/themeModel');
const User = require('./../models/userModel');
const Brochure = require('./../models/brochureModel');
const Organization = require('./../models/organizationModel');
const BrochureBanner = require('./../models/brochureBannerModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handleFactory')
const APIFeatures = require('./../utils/apiFeatures');

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require("@azure/identity");

exports.createOrganization = catchAsync(async (req, res, next) => {

    const doc = await Organization.create({
        name: req.body.name,
        user: req.user.id,
        email: req.body.email,
        social: req.body.social,
        locationLink: req.body.locationLink,
        country: req.body.country,
        slogan: req.body.slogan,
        contact: req.body.contact,
        Address: req.body.Address,
        theme: req.body.theme,
        createdAt: Date.now()
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createBrochure = catchAsync(async (req, res, next) => {
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        let catalogdiscount;
        if (fields.catalogdiscount == "on") {
            catalogdiscount = true
        } else {
            catalogdiscount = false
        }
        if (files.catcoverimage.originalFilename == "") {
            await Brochure.create({
                name: fields.catalogname,
                user: req.user.id,
                price: fields.catalogprice,
                detail: fields.catalogdetail,
                currency: fields.catalogcurrency,
                applydiscount: catalogdiscount,
                createdAt: Date.now()
            });

            res.redirect(`/brochure/${req.user.id}/additems`)
            return;
        }
        else {
            const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
            if (!accountName) throw Error('Azure Storage accountName not found');
            const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

            const containerName = 'brochureimages';

            const containerClient = blobServiceClient.getContainerClient(containerName);

            const filePath = files.catcoverimage.filepath;

            const blobName = `${req.user.name}-brochureitemimages-${uuidv1()}.jpeg`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadFile(filePath)

            await Brochure.create({
                name: fields.catalogname,
                user: req.user.id,
                currency: fields.catalogcurrency,
                price: fields.catalogprice,
                detail: fields.catalogdetail,
                applydiscount: catalogdiscount,
                coverImage: blockBlobClient.url,
                createdAt: Date.now()
            });

            res.redirect(`/brochure/${req.user.id}/additems`)
        }
    })
})

exports.updateBrochure = factory.updateOne(Brochure);
exports.getBrochure = factory.getOne(Brochure);
exports.deleteBrochure = factory.deleteOne(Brochure);

exports.addItemsToPage = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const brochures = await Brochure.find({ user: user_id })
    const organization = await Organization.findOne({ user: user_id })
    const theme = await Theme.find({ themeCategory: "Brochure" })
    const banner = await BrochureBanner.find({ user: user_id })

    res.status(200).render('brochure/additems', {
        title: 'Brochure Tweaks',
        organization,
        brochures,
        theme,
        banner
    })
})

exports.sectionTweaks = catchAsync(async (req, res) => {
    const id = req.params.id

    const organization = await Organization.findOne({ user: req.user.id })
    await Brochure.findOne({ _id: id }).populate('user').then(brochure => {

        res.status(200).render('brochure/tweaks', {
            title: 'Brochure Section Tweak',
            brochure,
            organization
        })
    })
})

exports.updateOrganizaiton = catchAsync(async (req, res, next) => {

    const updatedOrganization = await Organization.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!updatedOrganization) return next(new AppError('No document found with the given ID', 404));


    res.status(200).json({
        status: 'success',
        data: {
            company: updatedOrganization
        }
    })
});

exports.updateBrochureItemImg = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'brochureimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.upcatalogimage.filepath;

        const blobName = `${req.user.name}-updatedbrochureitemimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Brochure.findByIdAndUpdate(
            req.params.id,
            {
                coverImage: blockBlobClient.url
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.redirect(`/brochure/${req.user.id}/additems`)
    })

})

exports.updateOrganizationImg = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'brochureimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.upcatalogcoverimage.filepath;

        const blobName = `${req.user.name}-updatedorganizationimage-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Organization.findByIdAndUpdate(
            req.params.id,
            {
                coverImage: blockBlobClient.url
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.redirect(`/brochure/${req.user.id}/additems`)
    })

});

exports.createBrochureBanner = catchAsync(async (req, res, next) => {

    const banner = await BrochureBanner.create({
        bannerInfo: req.body.bannerInfo,
        discountpercent: req.body.discountpercent,
        user: req.user.id
    });

    res.status(201).json({
        status: 'success',
        banner
    })
});

exports.deleteBrochureBanner = catchAsync(async (req, res, next) => {
    const doc = await BrochureBanner.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});

exports.deleteUserOrganization = catchAsync(async (req, res, next) => {
    const doc = await Organization.findByIdAndDelete(req.params.id);

    let data = []
    await Brochure.find({ user: req.params.user }).then(item => {
        item.filter(el => {
            data.push(el.id)
        })
    });

    data.forEach(async (item) => {
        await Brochure.findByIdAndDelete(item)
    })

    await BrochureBanner.findOneAndDelete({ user: req.params.user })

    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});