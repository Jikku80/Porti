const multer = require('multer');
const sharp = require('sharp');
const Invite = require('./../models/inviteModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');

const multerStorageSec = multer.memoryStorage();

const multerFilterSec = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const uploadInvi = multer({
    storage: multerStorageSec,
    fileFilter: multerFilterSec
});

exports.uploadInviteImg = uploadInvi.fields([
    { name: 'imgCover', maxCount: 1 },
    { name: 'imgSecond', maxCount: 1 },
    { name: 'imgThird', maxCount: 1 },
    { name: 'imgFourth', maxCount: 1 },
    { name: 'imgFifth', maxCount: 1 }
]);

exports.uploadInviteImages = uploadInvi.fields([
    { name: 'imgs', maxCount: 20 }
]);

exports.resizeNewInviteImg = catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    let img = req.files.imgCover[0];

    img.originalname = `invite-${img.fieldname}-${Date.now()}-ini.jpeg`;
    await sharp(img.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/invites/imageCover/${img.originalname}`);

    let img2 = req.files.imgSecond[0];

    img2.originalname = `invite-${img2.fieldname}-${Date.now()}-ini.jpeg`;
    await sharp(img2.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/invites/imageSecond/${img2.originalname}`);

    let img3 = req.files.imgThird[0];

    img3.originalname = `invite-${img3.fieldname}-${Date.now()}-ini.jpeg`;
    await sharp(img3.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/invites/imageThird/${img3.originalname}`);

    let img4 = req.files.imgFourth[0];

    img4.originalname = `invite-${img4.fieldname}-${Date.now()}-ini.jpeg`;
    await sharp(img4.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/invites/imageFourth/${img4.originalname}`);

    let img5 = req.files.imgFifth[0];

    img5.originalname = `invite-${img5.fieldname}-${Date.now()}-ini.jpeg`;
    await sharp(img5.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/invites/imageFifth/${img5.originalname}`);
    next();
});


exports.resizeInviteImages = catchAsync(async (req, res, next) => {

    if (!req.files.imgs) return next();
    let img = req.files.imgs

    req.body.imgs = []

    await Promise.all(
        img.map(async (file, i) => {
            const filename = `invite-${req.body.name}-${Date.now()}-${i + 1}-imageCollec.jpeg`;

            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/images/invites/imageColl/${filename}`);

            req.body.imgs.push(filename);
        })
    );
    next();
});

exports.setUserId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}


exports.createInvi = catchAsync(async (req, res, next) => {
    const doc = await Invite.create({
        fname: req.body.fname,
        sname: req.body.sname,
        user: req.user.id,
        about: req.body.about,
        address: req.body.address,
        pdate: req.body.pdate,
        ptime: req.body.ptime,
        phn_no: req.body.phn_no,
        theme: req.body.theme,
        imgCover: req.files.imgCover[0].originalname,
        imgSecond: req.files.imgSecond[0].originalname,
        imgThird: req.files.imgThird[0].originalname,
        imgFourth: req.files.imgFourth[0].originalname,
        imgFifth: req.files.imgFifth[0].originalname
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.createInviImgColl = catchAsync(async (req, res, next) => {

    const doc = await Invite.create({
        fname: req.body.fname,
        sname: req.body.sname,
        user: req.user.id,
        about: req.body.about,
        address: req.body.address,
        pdate: req.body.pdate,
        ptime: req.body.ptime,
        phn_no: req.body.phn_no,
        theme: req.body.theme,
        featuring: req.body.previous,
        imgs: req.body.imgs
    });

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.getAllInvi = factory.getAll(Invite);
exports.getInvi = factory.getOne(Invite);
exports.updateInvi = factory.updateOne(Invite);
exports.del = factory.deleteOne(Invite);
exports.makeInvi = factory.createOne(Invite);

exports.deleteInvi = catchAsync(async (req, res, next) => {
    await Invite.findByIdAndDelete(req.body.id);

    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
})

exports.updateInviData = catchAsync(async (req, res, next) => {

    const updatedInvite = await Invite.findByIdAndUpdate(
        req.body.id,
        {
            fname: req.body.fname,
            sname: req.body.sname,
            theme: req.body.theme,
            about: req.body.about,
            address: req.body.address,
            ptime: req.body.ptime,
            phn_no: req.body.phn_no,
            pdate: req.body.pdate
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).render('layouts/landingSec', {
        title: updatedInvite.name,
        invite: updatedInvite
    });
});

exports.updateInviImgData = catchAsync(async (req, res, next) => {

    const updatedInvite = await Invite.findByIdAndUpdate(
        req.body.id,
        {
            imgCover: req.files.imgCover[0].originalname,
            imgSecond: req.files.imgSecond[0].originalname,
            imgThird: req.files.imgThird[0].originalname,
            imgFourth: req.files.imgFourth[0].originalname,
            imgFifth: req.files.imgFifth[0].originalname
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).render('layouts/landingSec', {
        title: updatedInvite.name,
        invite: updatedInvite
    });
});

exports.updateInviImgCollec = catchAsync(async (req, res, next) => {

    const updatedInvite = await Invite.findByIdAndUpdate(
        req.body.id,
        {
            imgs: req.body.imgs
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).render('layouts/landingSec', {
        title: updatedInvite.name,
        invite: updatedInvite
    });
});



