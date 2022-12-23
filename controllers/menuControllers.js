const fs = require('fs');
const formidable = require('formidable');

const Menu = require('./../models/menuModel');
const User = require('./../models/userModel')
const Restaurant = require('./../models/restaurantDetailModel');
const Theme = require('./../models/themeModel');

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


exports.createMenu = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'menuimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.menuimage.filepath;

        const blobName = `${req.user.name}-menuitemimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Menu.create({
            name: fields.menuname,
            user: req.user.id,
            price: fields.menuprice,
            detail: fields.menudetail,
            category: fields.menucategory,
            theme: fields.menutheme,
            coverImage: blockBlobClient.url
        });

        res.redirect(`/menu/${req.user.id}/additemstomenu`)
    })

})

exports.updateItemImg = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'menuimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.upmenuimage.filepath;

        const blobName = `${req.user.name}-updatedmenuitemimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Menu.findByIdAndUpdate(
            fields.upmenuid,
            {
                coverImage: blockBlobClient.url
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.redirect(`/menu/${req.user.id}/additemstomenu`)
    })

})

exports.getAllMenu = factory.getAll(Menu);
exports.getMenu = factory.getOne(Menu);
exports.updateMenu = factory.updateOne(Menu);
exports.makeMenu = factory.createOne(Menu);

exports.createRestaurant = catchAsync(async (req, res, next) => {

    const doc = await Restaurant.create({
        name: req.body.name,
        user: req.user.id,
        slogan: req.body.slogan,
        Address: req.body.address,
        theme: req.body.theme,
        phn_no: req.body.phn_no
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.updateRestaurant = catchAsync(async (req, res, next) => {

    const updatedRestro = await Restaurant.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!updatedRestro) return next(new AppError('No document found with the given ID', 404));


    res.status(200).json({
        status: 'success',
        data: {
            restro: updatedRestro
        }
    })
})

exports.delMenu = catchAsync(async (req, res, next) => {
    const doc = await Menu.findByIdAndDelete(req.params.id);
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
    await Menu.findOne({ _id: id }).populate('user').then(menu => {

        res.status(200).render('menu/tweaks', {
            title: 'Porti Detail',
            menu
        })
    })
})

exports.menuFirst = catchAsync(async (req, res, next) => {
    const username = req.params.user
    const usr = await User.find({ name: username });
    const features = new APIFeatures(Menu.find({ user: usr[0]._id }), { limit: 12, page: req.query.page }).paginate();
    const menus = await features.query
    await Restaurant.find({ user: usr[0]._id }).populate('user').then(restro => {
        let theme = restro[0].theme
        switch (theme) {
            case "40bd001563085fc35165329ea1ff5c5ecbdbbeef":
                res.status(200).render('menu/firstMenu', {
                    title: `${restro[0].name}`,
                    restro,
                    menus
                })
                break;
            default:
                res.status(404).render('404.pug')
        }
    })

})

exports.newMenu = catchAsync(async (req, res, next) => {

    const user_id = req.params.id
    const features = new APIFeatures(Menu.find({ user: user_id }), { limit: 12, page: req.query.page }).paginate();
    const restro = await Restaurant.find({ user: user_id })
    const theme = await Theme.find({ themeCategory: "Menu" })
    await features.query.populate('user').then(menus => {
        res.status(200).render('menu/overall', {
            title: "Add Items",
            menus,
            restro,
            theme
        })
    })
})

exports.listCategories = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    let menuCategories = await Menu.find({ user: user_id }).then(arr => {
        return distinctCat = [...new Set(arr.map(x => x.category))];
    })
    res.status(200).json(menuCategories)
})

exports.findbyCat = catchAsync(async (req, res, next) => {
    let id = req.params.id
    let cate = req.params.cate
    let cat = cate.toUpperCase();
    await Menu.find({ category: cat }).populate('user').then(items => {
        items = items.filter(item => {
            if (item.user.id == id) {
                return item
            }
        })
        res.status(200).json({
            status: 'success',
            data: items
        })
    })
})

exports.lookup = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    await Menu.find({ user: user_id }).then((items) => {
        res.status(200).json(items)
    })
})

exports.paginate = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const pg = req.params.count
    const features = new APIFeatures(Menu.find({ user: user_id }), { limit: 12, page: pg }).paginate();
    await features.query.then((items) => {
        res.status(200).json(items)
    })
})