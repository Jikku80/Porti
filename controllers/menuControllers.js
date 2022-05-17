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

exports.getAllMenu = factory.getAll(Menu);
exports.getMenu = factory.getOne(Menu);
exports.updateMenu = factory.updateOne(Menu);
exports.delMenu = factory.deleteOne(Menu);
exports.makeMenu = factory.createOne(Menu);


exports.menuFirst = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    console.log(req.query);
    const features = new APIFeatures(Menu.find({ user: user_id }), { limit: 2, page: 1 }).paginate()
    await features.query.populate('user').then(menus => {
        res.status(200).render('menu/firstMenu', {
            title: "menu",
            menus
        })
    })
})

exports.newMenu = catchAsync(async (req, res, next) => {
    res.status(200).render('menu/overall', {
        title: "Add Items"
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
    let cate = req.params.cate
    let cat = cate.toUpperCase();
    await Menu.find({ category: cat }).populate('user').then(items => {
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