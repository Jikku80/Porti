const fs = require('fs');
const formidable = require('formidable');

const Catalouge = require('./../models/catalougeModel');
const Company = require('./../models/companyModel');
const Theme = require('./../models/themeModel');
const User = require('./../models/userModel');
const CatalogBanner = require('./../models/catalogBannerModel');
const ComComment = require('./../models/comComment');

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
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        let catalogdiscount;
        if (fields.catalogdiscount == "on") {
            catalogdiscount = true
        } else {
            catalogdiscount = false
        }
        if (files.catcoverimage.originalFilename == "") {
            await Catalouge.create({
                name: fields.catalogname,
                user: req.user.id,
                serialno: fields.catalogserialno,
                price: fields.catalogprice,
                detail: fields.catalogdetail,
                category: fields.catalogcategory,
                subcategory: fields.catalogsubcategory,
                currency: fields.catalogcurrency,
                applydiscount: catalogdiscount,
                stockQuantity: fields.catalStockQuantity,
                createdAt: Date.now()
            });

            res.redirect(`/catalouge/${req.user.id}/additems`)
            return;
        }
        else {
            const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
            if (!accountName) throw Error('Azure Storage accountName not found');
            const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

            const containerName = 'catalogimages';

            const containerClient = blobServiceClient.getContainerClient(containerName);

            const filePath = files.catcoverimage.filepath;

            const blobName = `${req.user.name}-catalogitemimages-${uuidv1()}.jpeg`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadFile(filePath)

            await Catalouge.create({
                name: fields.catalogname,
                user: req.user.id,
                serialno: fields.catalogserialno,
                currency: fields.catalogcurrency,
                price: fields.catalogprice,
                detail: fields.catalogdetail,
                category: fields.catalogcategory,
                subcategory: fields.catalogsubcategory,
                applydiscount: catalogdiscount,
                stockQuantity: fields.catalStockQuantity,
                coverImage: blockBlobClient.url,
                createdAt: Date.now()
            });

            res.redirect(`/catalouge/${req.user.id}/additems`)
        }
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

    const company = await Company.find({ user: req.user.id })
    await Catalouge.findOne({ _id: id }).populate('user').then(catalouge => {

        res.status(200).render('catalouge/tweaks', {
            title: 'Catalouge Detail',
            catalouge,
            company
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
    const banner = await CatalogBanner.find({ user: user_id })

    res.status(200).render('catalouge/additem', {
        title: 'Add Items To Catalouge',
        company,
        catalouges,
        theme,
        banner
    })
})

exports.firstCatalouge = catchAsync(async (req, res, next) => {
    const user_name = req.params.user
    const usr = await User.find({ name: user_name });
    const features = new APIFeatures(Catalouge.find({ user: usr[0]._id }), { limit: 12, page: req.query.page }).paginate().srt();
    const catalouges = await features.query
    const banner = await CatalogBanner.find({ user: usr[0]._id })
    const hotItems = await Catalouge.find({ user: usr[0]._id }).then(el => {
        const items = el.filter(item => {
            if (item.hotItem === true) {
                return item
            }
        })
        return items
    })

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
            case "e8d4bd5004021ea34a450c4482093ab20853fe68":
                res.status(200).render('catalouge/secondCatalouge', {
                    title: `${company[0].name}`,
                    catalouges,
                    company: company[0],
                    banner,
                    hotItems
                })
                break;
            default:
                res.status(404).render('404.pug')
        }
    })

})

exports.listSimilarItems = catchAsync(async (req, res, next) => {
    const user_id = req.params.id;
    let cate = req.params.category;
    let itemId = req.params.itemId;

    const similarItems = await Catalouge.find({ user: user_id }).then(arr => {

        const items = arr.filter(item => {
            if (item.id !== itemId && item.category == cate) {
                return item
            }
        })
        return items
    })

    limitedItems = similarItems.slice(0, 8)

    res.status(200).json(limitedItems)
})

exports.lookupCatalouge = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const searchLowNam = req.params.search
    await Catalouge.find({ user: user_id }).then((data) => {
        const items = data.filter(el => {
            let name = el.name
            let cat = el.category
            let subcat = el.subcategory
            let seno = el.serialno
            let lowCat = cat.toLowerCase();
            let lowSeno = seno.toLowerCase();
            let lowSubCat = subcat.toLowerCase();
            let lowNam = name.toLowerCase();
            if (lowNam == searchLowNam || lowCat == searchLowNam || lowSubCat == searchLowNam || lowSeno == searchLowNam) {
                return el;
            }
        })
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
    const features = new APIFeatures(Catalouge.find({ user: user_id }), { limit: 12, page: pg }).paginate().srt();
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

exports.newComment = catchAsync(async (req, res, next) => {

    const comments = await ComComment.create({
        name: req.body.name,
        companyUserId: req.body.companyUserId,
        productId: req.body.productId,
        comment: req.body.comment,
        createdAt: Date.now()
    });

    res.status(201).json({
        status: 'success',
        comments
    })
})

exports.getLastComments = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const features = new APIFeatures(ComComment.find({ productId: id }), { limit: 12, page: req.query.page }).paginate().srt();
    const comments = await features.query

    res.status(200).json({
        status: 'success',
        comments
    })
})

exports.deleteComment = catchAsync(async (req, res, next) => {
    const doc = await ComComment.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});


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
});

exports.createCatalogBanner = catchAsync(async (req, res, next) => {

    const banner = await CatalogBanner.create({
        bannerInfo: req.body.bannerInfo,
        discountpercent: req.body.discountpercent,
        user: req.user.id
    });

    res.status(201).json({
        status: 'success',
        banner
    })
});

exports.deleteCatalogBanner = catchAsync(async (req, res, next) => {
    const doc = await CatalogBanner.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});

