const multer = require('multer');
const sharp = require('sharp');
const Menu = require('./../models/menuModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handleFactory')

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

exports.uploadMenuPhoto = upload.single('photo');

exports.resizeMenuPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();


    pic = req.file;

    pic.originalname = `user-${req.user.name}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/menu-pic/${pic.originalname}`);

    next();
});

exports.createMenu = catchAsync(async (req, res, next) => {
    const doc = await Menu.create({
        name: req.body.name,
        user: req.user.id,
        price: req.body.price,
        detail: req.body.detail,
        category: req.body.category,
        theme: req.body.theme,
        coverImage: req.files.coverImage[0].originalname
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

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.menuFirst = catchAsync(async (req, res, next) => {
    const menu_id = req.params.id
    await Menu.findById(menu_id).populate('user').then(menu => {

        res.status(200).render('menu/firstMenu', {
            title: `menu`,
            menu
        })
    })
})

exports.newMenu = catchAsync(async (req, res, next) => {
    res.status(200).render('menu/overall', {
        title: "Add Items"
    })
})