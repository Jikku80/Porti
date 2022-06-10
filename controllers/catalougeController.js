const fs = require('fs');

const multer = require('multer');
const sharp = require('sharp');
const Catalouge = require('./../models/catalougeModel');
const Company = require('./../models/companyModel');
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

exports.uploadCatalougePhoto = upload.single('coverImage');
exports.uploadCompanyPhoto = upload.single('coverImage');

exports.resizeCatalougePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    pic = req.file;

    pic.originalname = `user-${req.user.name}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/catalouge/${pic.originalname}`);

    next();
});

exports.resizeCompanyPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    pic = req.file;

    pic.originalname = `user-${req.user.name}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/company/${pic.originalname}`);

    next();
});

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}


exports.createCatalouge = catchAsync(async (req, res, next) => {
    const doc = await Catalouge.create({
        name: req.body.name,
        user: req.user.id,
        serialno: req.body.serialno,
        price: req.body.price,
        detail: req.body.detail,
        category: req.body.category,
        subcategory: req.body.subcategory,
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

exports.updateCatalouge = factory.updateOne(Catalouge);
exports.getCatalouge = factory.getOne(Catalouge);

exports.delCatalouge = catchAsync(async (req, res, next) => {
    const doc = await Catalouge.findByIdAndDelete(req.params.id);
    if (fs.existsSync(`public/images/Catalouge/${doc.coverImage}`)) {
        await fs.promises.unlink(`public/images/Catalouge/${doc.coverImage}`);
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
    await Catalouge.findOne({ _id: id }).populate('user').then(catalouge => {

        res.status(200).render('catalouge/tweaks', {
            title: 'Catalouge Detail',
            catalouge
        })
    })
})

exports.removeCatalougeOldImg = catchAsync(async (req, res, next) => {
    const item = await Catalouge.findByIdAndUpdate(req.params.id)
    if (fs.existsSync(`public/images/catalouge/${item.coverImage}`)) {
        await fs.promises.unlink(`public/images/catalouge/${item.coverImage}`);
    }
    next();
})

exports.updateCatalougeItemImg = catchAsync(async (req, res, next) => {

    const updatedItem = await Catalouge.findByIdAndUpdate(
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
        catalouge: updatedItem
    });
})

exports.removeCompanyOldImg = catchAsync(async (req, res, next) => {
    const item = await Company.findByIdAndUpdate(req.params.id)
    if (fs.existsSync(`public/images/company/${item.coverImage}`)) {
        await fs.promises.unlink(`public/images/company/${item.coverImage}`);
    }
    next();
})

exports.updateCompanyImg = catchAsync(async (req, res, next) => {

    const updatedItem = await Company.findByIdAndUpdate(
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
        catalouge: updatedItem
    });
})

exports.addItemsPage = catchAsync(async (req, res, next) => {
    const user_id = req.params.id

    const company = await Company.find({ user: user_id })
    res.status(200).render('catalouge/additem', {
        title: 'Add Items To Catalouge',
        company
    })
})

exports.firstCatalouge = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    const features = new APIFeatures(Catalouge.find({ user: user_id }), { limit: 12, page: req.query.page }).paginate()
    // const restro = await Restaurant.find({ user: user_id })
    await features.query.populate('user').then(menus => {
        res.status(200).render('catalouge/firstCatalouge', {
            title: "menu",
            menus
            // restro
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
        slogan: req.body.slogan,
        contact: req.body.contact,
        Address: req.body.Address
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