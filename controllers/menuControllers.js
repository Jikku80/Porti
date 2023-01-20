const fs = require('fs');
const formidable = require('formidable');

const Menu = require('./../models/menuModel');
const User = require('./../models/userModel')
const Restaurant = require('./../models/restaurantDetailModel');
const Theme = require('./../models/themeModel');
const ResOrder = require('./../models/resOrderModel');
const Banner = require('./../models/bannerModel');

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
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.menuimage.filepath;
        let menudiscount;
        if (fields.menudiscount == "on") {
            menudiscount = true
        } else {
            menudiscount = false
        }

        if (files.menuimage.originalFilename == "") {
            await Menu.create({
                name: fields.menuname,
                user: req.user.id,
                currency: fields.menucurrency,
                price: fields.menuprice,
                detail: fields.menudetail,
                category: fields.menucategory,
                applydiscount: menudiscount,
                createdAt: Date.now()
            });

            res.redirect(`/menu/${req.user.id}/additemstomenu`)
            return;
        }
        else {
            const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
            if (!accountName) throw Error('Azure Storage accountName not found');
            const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

            const containerName = 'menuimages';

            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobName = `${req.user.name}-menuitemimages-${uuidv1()}.jpeg`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadFile(filePath)

            await Menu.create({
                name: fields.menuname,
                user: req.user.id,
                currency: fields.menucurrency,
                price: fields.menuprice,
                detail: fields.menudetail,
                category: fields.menucategory,
                theme: fields.menutheme,
                applydiscount: menudiscount,
                createdAt: Date.now(),
                coverImage: blockBlobClient.url
            });

            res.redirect(`/menu/${req.user.id}/additemstomenu`)
        }
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
        phn_no: req.body.phn_no,
        createdAt: Date.now()
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

exports.updateResImg = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'menuimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.upmenuimage.filepath;

        const blobName = `${req.user.name}-restaurantcoverimage-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Restaurant.findByIdAndUpdate(
            req.params.id,
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
    const restro = await Restaurant.find({ user: req.user.id })
    await Menu.findOne({ _id: id }).populate('user').then(menu => {

        res.status(200).render('menu/tweaks', {
            title: 'Porti Detail',
            menu,
            restro
        })
    })
})

exports.menuFirst = catchAsync(async (req, res, next) => {
    const username = req.params.user
    const usr = await User.find({ name: username });
    const features = new APIFeatures(Menu.find({ user: usr[0]._id }), { limit: 12, page: req.query.page }).paginate().srt();
    const menus = await features.query
    // const allmenus = await Menu.find({ user: usr[0]._id });
    let allmenus = await Menu.find({ user: usr[0]._id }).then(arr => {
        return distinctCat = [...new Set(arr.map(x => x.category))];
    })

    const banner = await Banner.find({ user: usr[0]._id })

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
            case "f7154fcf991cb48c394345221cf2f2d631cd4f15":
                res.status(200).render('menu/secondMenu', {
                    title: `${restro[0].name}`,
                    restro,
                    allmenus,
                    banner
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
    const banner = await Banner.find({ user: user_id })
    const theme = await Theme.find({ themeCategory: "Menu" })
    await features.query.populate('user').then(menus => {
        res.status(200).render('menu/overall', {
            title: "Add Items",
            menus,
            restro,
            theme,
            banner
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

exports.findbyNam = catchAsync(async (req, res, next) => {
    let id = req.params.id
    let cate = req.params.nam
    await Menu.find({ name: cate }).populate('user').then(items => {
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
    const features = new APIFeatures(Menu.find({ user: user_id }), { limit: 12, page: pg }).paginate().srt();
    await features.query.then((items) => {
        res.status(200).json(items)
    })
})

exports.createBanner = catchAsync(async (req, res, next) => {

    const banner = await Banner.create({
        bannerInfo: req.body.bannerInfo,
        discountpercent: req.body.discountpercent,
        user: req.user.id,
        createdAt: Date.now()
    });

    res.status(201).json({
        status: 'success',
        banner
    })
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
    const doc = await Banner.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});

exports.updateLikes = catchAsync(async (req, res, next) => {
    const updatedTheme = await Menu.updateOne({ _id: req.params.id }, {
        $push: {
            itemLike: req.user.id
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

exports.unLike = catchAsync(async (req, res, next) => {

    const updatedTheme = await Menu.updateOne({ _id: req.params.id }, {
        $pull: {
            itemLike: req.user.id
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

exports.updatedisLikes = catchAsync(async (req, res, next) => {
    const updatedTheme = await Menu.updateOne({ _id: req.params.id }, {
        $push: {
            itemDisLike: req.user.id
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

exports.unDisLike = catchAsync(async (req, res, next) => {
    const updatedTheme = await Menu.updateOne({ _id: req.params.id }, {
        $pull: {
            itemDisLike: req.user.id
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

exports.getMostLiked = catchAsync(async (req, res) => {
    const id = req.params.user
    const mostLiked = await Menu.find({ user: id }).then(item => {
        let likeList = []
        item.forEach(el => {
            let like = el.itemLike;
            likeList.push(like.length)
        })

        let maxval = likeList[0];
        for (let i = 1; i < likeList.length; ++i) {
            if (likeList[i] > maxval) {
                maxval = likeList[i]
            }
        }

        const data = item.filter(el => {
            let like = el.itemLike
            if (like.length === maxval) {
                return el;
            }
        })
        return data
    })

    const mostDisLiked = await Menu.find({ user: id }).then(item => {
        let likeList = []
        item.forEach(el => {
            let like = el.itemDisLike;
            likeList.push(like.length)
        })

        let maxval = likeList[0];
        for (let i = 1; i < likeList.length; ++i) {
            if (likeList[i] > maxval) {
                maxval = likeList[i]
            }
        }

        const data = item.filter(el => {
            let like = el.itemDisLike
            if (like.length === maxval) {
                return el;
            }
        })
        return data
    })

    res.status(200).json({
        status: "success",
        mostLiked,
        mostDisLiked
    })
})
