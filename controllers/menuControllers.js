const fs = require('fs');

const multer = require('multer');
const sharp = require('sharp');
const Menu = require('./../models/menuModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handleFactory')
const APIFeatures = require('./../utils/apiFeatures');

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

exports.uploadMenuPhoto = upload.single('coverImage');

exports.resizeMenuPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    pic = req.file;

    pic.originalname = `user-${req.user.name}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/menu-pic/${pic.originalname}`);

    next();
});

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}


exports.createMenu = catchAsync(async (req, res, next) => {
    const doc = await Menu.create({
        name: req.body.name,
        user: req.user.id,
        price: req.body.price,
        detail: req.body.detail,
        category: req.body.category,
        theme: req.body.theme,
        coverImage: req.file.originalname
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.removeOldImg = catchAsync(async (req, res, next) => {
    const item = await Menu.findByIdAndUpdate(req.params.id)
    if (fs.existsSync(`public/images/menu-pic/${item.coverImage}`)) {
        await fs.promises.unlink(`public/images/menu-pic/${item.coverImage}`);
    }
    next();
})

exports.updateItemImg = catchAsync(async (req, res, next) => {

    const updatedItem = await Menu.findByIdAndUpdate(
        req.params.id,
        {
            coverImage: req.file.originalname
        },
        {
            new: true,
            runValidators: true
        }
    )
    res.status(200).json({
        status: 'success',
        menu: updatedItem
    });
})

exports.getAllMenu = factory.getAll(Menu);
exports.getMenu = factory.getOne(Menu);
exports.updateMenu = factory.updateOne(Menu);
exports.makeMenu = factory.createOne(Menu);

exports.delMenu = catchAsync(async (req, res, next) => {
    const doc = await Menu.findByIdAndDelete(req.params.id);
    if (fs.existsSync(`public/images/menu-pic/${doc.coverImage}`)) {
        await fs.promises.unlink(`public/images/menu-pic/${doc.coverImage}`);
    }
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
    }).catch(err => console.log(err));
})

exports.menuFirst = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const features = new APIFeatures(Menu.find({ user: user_id }), { limit: 12, page: req.query.page }).paginate().srt()
    await features.query.populate('user').then(menus => {
        res.status(200).render('menu/firstMenu', {
            title: "menu",
            menus
        })
    })
})

exports.newMenu = catchAsync(async (req, res, next) => {

    const user_id = req.params.id
    const features = new APIFeatures(Menu.find({ user: user_id }), { limit: 12, page: req.query.page }).paginate().srt()
    await features.query.populate('user').then(menus => {
        res.status(200).render('menu/overall', {
            title: "Add Items",
            menus
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
    const features = new APIFeatures(Menu.find({ user: user_id }), { limit: 12, page: pg }).paginate().srt();
    await features.query.then((items) => {
        res.status(200).json(items)
    })
})