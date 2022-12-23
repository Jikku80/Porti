const fs = require('fs');
const formidable = require('formidable');

const Catalouge = require('./../models/catalougeModel');
const Company = require('./../models/companyModel');
const Theme = require('./../models/themeModel');
const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handleFactory')
const APIFeatures = require('./../utils/apiFeatures');

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require("@azure/identity");

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createCatalouge = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'catalogimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.catcoverimage.filepath;

        const blobName = `${req.user.name}-catalogitemimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Catalouge.create({
            name: fields.catalogname,
            user: req.user.id,
            serialno: fields.catalogserialno,
            price: fields.catalogprice,
            detail: fields.catalogdetail,
            category: fields.catalogcategory,
            subcategory: fields.catalogsubcategory,
            theme: fields.catalogtheme,
            coverImage: blockBlobClient.url
        });

        res.redirect(`/catalouge/${req.user.id}/additems`)
    })

})

exports.updateCatalouge = factory.updateOne(Catalouge);
exports.getCatalouge = factory.getOne(Catalouge);

exports.delCatalouge = catchAsync(async (req, res, next) => {
    const doc = await Catalouge.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
})

exports.itemTweaks = catchAsync(async (req, res) => {
    const id = req.params.id
    await Catalouge.findOne({ _id: id }).populate('user').then(catalouge => {

        res.status(200).render('catalouge/tweaks', {
            title: 'Catalouge Detail',
            catalouge
        })
    })
})

exports.updateCatalougeItemImg = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'catalogimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.upcatalogimage.filepath;

        const blobName = `${req.user.name}-updatedcatalogitemimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Catalouge.findByIdAndUpdate(
            req.params.id,
            {
                coverImage: blockBlobClient.url
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.redirect(`/catalouge/${req.user.id}/additems`)
    })

})

exports.updateCompanyImg = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'catalogimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.upcatalogcoverimage.filepath;

        const blobName = `${req.user.name}-updatedcatalogitemimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Company.findByIdAndUpdate(
            req.params.id,
            {
                coverImage: blockBlobClient.url
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.redirect(`/catalouge/${req.user.id}/additems`)
    })

})

exports.addItemsPage = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const features = new APIFeatures(Catalouge.find({ user: user_id }), { limit: 12, page: req.query.page }).paginate()
    const catalouges = await features.query
    const company = await Company.find({ user: user_id })
    const theme = await Theme.find({ themeCategory: "Cataloge" })
    res.status(200).render('catalouge/additem', {
        title: 'Add Items To Catalouge',
        company,
        catalouges,
        theme
    })
})

exports.firstCatalouge = catchAsync(async (req, res, next) => {
    const user_name = req.params.user
    const usr = await User.find({ name: user_name });
    const features = new APIFeatures(Catalouge.find({ user: usr[0]._id }), { limit: 12, page: req.query.page }).paginate()
    const catalouges = await features.query
    await Company.find({ user: usr[0]._id }).populate('user').then(company => {
        let theme = company[0].theme
        switch (theme) {
            case "51eac6b471a284d3341d8c0c63d0f1a286262a18":
                res.status(200).render('catalouge/firstCatalouge', {
                    title: `${company[0].name}`,
                    catalouges,
                    company: company[0]
                })
                break;
            default:
                res.status(404).render('404.pug')
        }
    })

})

exports.lookupCatalouge = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    await Catalouge.find({ user: user_id }).then((items) => {
        res.status(200).json(items)
    })
})

exports.listCatalougeCategories = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    let catalougeCategories = await Catalouge.find({ user: user_id }).then(arr => {
        return distinctCat = [...new Set(arr.map(x => x.category))];
    })
    res.status(200).json(catalougeCategories)
})

exports.listCatalougeSubCategories = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const category = req.params.cate
    const subitems = await Catalouge.find({ category: category })

    const userCategorize = subitems.filter(item => {
        return item.user.id === user_id
    })
    const subCategories = [...new Set(userCategorize.map(x => x.subcategory))];
    if (subCategories[0] !== "") {
        res.status(200).json(subCategories)
    }
    else {
        res.status(200).json(userCategorize)
    }
})

exports.listBySubCategories = catchAsync(async (req, res, next) => {
    let id = req.params.id
    let cate = req.params.cate
    let subcate = req.params.subcate
    await Catalouge.find({ subcategory: subcate }).populate('user').then(items => {
        items = items.filter(item => {
            if (item.user.id === id) {
                if (item.category === cate) {
                    return item
                }
            }
        })
        res.status(200).json({
            status: 'success',
            items
        })
    })
})

exports.paginateCatalouge = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const pg = req.params.count
    const features = new APIFeatures(Catalouge.find({ user: user_id }), { limit: 12, page: pg }).paginate();
    await features.query.then((items) => {
        res.status(200).json(items)
    })
})

exports.createCompany = catchAsync(async (req, res, next) => {

    const doc = await Company.create({
        name: req.body.name,
        user: req.user.id,
        email: req.body.email,
        social: req.body.social,
        locationLink: req.body.locationLink,
        slogan: req.body.slogan,
        contact: req.body.contact,
        Address: req.body.Address,
        themecolor: req.body.themecolor,
        theme: req.body.theme
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.updateCompany = catchAsync(async (req, res, next) => {

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!updatedCompany) return next(new AppError('No document found with the given ID', 404));


    res.status(200).json({
        status: 'success',
        data: {
            company: updatedCompany
        }
    })
})