const fs = require('fs');
const formidable = require('formidable');

const Theme = require('./../models/themeModel');
const User = require('./../models/userModel');
const Brochure = require('./../models/brochureModel');
const Organization = require('./../models/organizationModel');
const BrochureBanner = require('./../models/brochureBannerModel');
const OrgBook = require('./../models/bookModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../controllers/handleFactory')
const APIFeatures = require('./../utils/apiFeatures');

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require("@azure/identity");
// const { findByIdAndUpdate } = require('../models/messageModel');

exports.createOrganization = catchAsync(async (req, res, next) => {

    const doc = await Organization.create({
        name: req.body.name,
        user: req.user.id,
        email: req.body.email,
        social: req.body.social,
        locationLink: req.body.locationLink,
        slogan: req.body.slogan,
        contact: req.body.contact,
        Address: req.body.Address,
        theme: req.body.theme,
        orgType: req.body.orgType,
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
    const user_id = req.params.id;
    let pg;
    if (req.query.bro) {
        pg = req.query.bro
        let features = new APIFeatures(Brochure.find({ user: user_id }), { limit: 12, page: pg }).srt().paginate();
        const brochures = await features.query

        res.status(200).json({
            'status': 'success',
            brochures
        })
    }
    else {
        pg = 1;
        let features = new APIFeatures(Brochure.find({ user: user_id }), { limit: 12, page: pg }).srt().paginate();
        const brochures = await features.query
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
    }
});

exports.bropaginate = catchAsync(async (req, res, next) => {
    const user_id = req.params.id;
    let pg;
    if (req.query.bro) {
        pg = req.query.bro
        let features = new APIFeatures(Brochure.find({ user: user_id }), { limit: 20, page: pg }).srt().paginate();
        const brochures = await features.query

        res.status(200).json({
            'status': 'success',
            brochures
        })
    }
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

exports.updateOrgi = catchAsync(async (req, res, next) => {

    const updatedOrganization = await Organization.findByIdAndUpdate(req.params.id, {
        $set: { pageCount: req.body.pageCount }
    },
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

exports.book = catchAsync(async (req, res, next) => {

    const doc = await OrgBook.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.getAllUserBooking = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const org = req.params.org;
    let pg = 1;
    let features = new APIFeatures(OrgBook.find({ organization: org }), { limit: 11, page: pg }).srt().paginate();
    const bookings = await features.query.then(item => {
        const data = item.filter(el => {
            return el.userId === id
        })
        return data
    })
    res.status(200).json({
        status: 'success',
        bookings
    })
});

exports.deleteUserBooking = catchAsync(async (req, res, next) => {
    const doc = await OrgBook.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});

exports.getFifBooking = catchAsync(async (req, res, next) => {
    const org = req.params.id;
    const features = new APIFeatures(OrgBook.find({ organization: org }), { limit: 50, page: "1" }).paginate().srt();
    const comorders = await features.query
    res.status(200).json({
        status: 'success',
        comorders
    })
});

exports.updateBookingById = catchAsync(async (req, res, next) => {

    const updatedComOrder = await OrgBook.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!updatedComOrder || updatedComOrder == null) return (res.status(404).json({ status: 'success' }));

    res.status(200).json({
        status: 'success',
        data: {
            restro: updatedComOrder
        }
    })
})

exports.redirectoTobookingStats = catchAsync(async (req, res, next) => {
    let userId = req.params.id;

    const org = await Organization.findOne({ user: userId })

    if (org !== null) {
        res.redirect(`/brochure/${org.id}/organizationstat`)
    }
    else {
        res.redirect('/layouts/porti')
    }

});

exports.getBookingStat = catchAsync(async (req, res) => {
    const id = req.params.org
    const organization = await Organization.findOne({ _id: id })

    res.status(200).render('brochure/stats', {
        title: 'Brochure Statistics',
        organization
    })
})

const pagination = function (array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function comp(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

exports.getDayBooking = catchAsync(async (req, res) => {
    const id = req.params.org
    let pg;
    if (req.query.book !== undefined) {
        pg = req.query.book;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            const datas = item.filter((data) => {
                let fullDate = data.createdAt.toString();
                itemsDate = fullDate.slice(0, 10);
                let datToday = new Date().toString();
                let today = datToday.slice(0, 10)
                return itemsDate === today
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let bookings = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            bookings
        })
    }
    else {
        pg = 1;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            const datas = item.filter((data) => {
                let fullDate = data.createdAt.toString();
                itemsDate = fullDate.slice(0, 10);
                let datToday = new Date().toString();
                let today = datToday.slice(0, 10)
                return itemsDate === today
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let bookings = pagination(newfoo, 20, pg)

        const resOrders = await OrgBook.find({ organization: id }).then((item) => {
            const datas = item.filter((data) => {
                let fullDate = data.createdAt.toString();
                itemsDate = fullDate.slice(0, 10);
                let datToday = new Date().toString();
                let today = datToday.slice(0, 10)
                return itemsDate === today
            })
            return datas
        })

        const confirmed = resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.bookingInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.bookingInfo || el.bookingInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo !== "confirmed") {
                let amounts = el.total * 1
                return unconfirmedAmountList.push(amounts);
            }
        })
        const totalUnConfirmedAmount = unconfirmedAmountList.reduce((a, b) => a + b, 0)

        res.status(200).json({
            status: "success",
            resOrders,
            totalConfirm,
            totalCanceled,
            totalLeftOut,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            bookings
        })
    }
})

exports.getWeekBooking = catchAsync(async (req, res) => {
    const id = req.params.org
    let pg;
    if (req.query.book !== undefined) {
        pg = req.query.book;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            let datToday = new Date();
            let dates = [];
            let timeofDay = 60 * 60 * 24 * 1000
            for (let i = 0; i < 7; i++) {
                let eachday = new Date(datToday.getTime() - i * timeofDay);
                let day = eachday.toString().slice(0, 10)
                dates.push(day)
            }
            const datas = item.filter((data) => {
                let itemdate = data.createdAt.toString();
                let idate = itemdate.slice(0, 10)
                if (dates.includes(idate)) {
                    return data
                }
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let bookings = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            bookings
        })
    }
    else {
        pg = 1;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            let datToday = new Date();
            let dates = [];
            let timeofDay = 60 * 60 * 24 * 1000
            for (let i = 0; i < 7; i++) {
                let eachday = new Date(datToday.getTime() - i * timeofDay);
                let day = eachday.toString().slice(0, 10)
                dates.push(day)
            }
            const datas = item.filter((data) => {
                let itemdate = data.createdAt.toString();
                let idate = itemdate.slice(0, 10)
                if (dates.includes(idate)) {
                    return data
                }
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let bookings = pagination(newfoo, 20, pg)

        const resOrders = await OrgBook.find({ organization: id }).then((item) => {
            let datToday = new Date();
            let dates = [];
            let timeofDay = 60 * 60 * 24 * 1000
            for (let i = 0; i < 7; i++) {
                let eachday = new Date(datToday.getTime() - i * timeofDay);
                let day = eachday.toString().slice(0, 10)
                dates.push(day)
            }
            const datas = item.filter((data) => {
                let itemdate = data.createdAt.toString();
                let idate = itemdate.slice(0, 10)
                if (dates.includes(idate)) {
                    return data
                }
            })
            return datas
        })

        const confirmed = resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.bookingInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.bookingInfo || el.bookingInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo !== "confirmed") {
                let amounts = el.total * 1
                return unconfirmedAmountList.push(amounts);
            }
        })
        const totalUnConfirmedAmount = unconfirmedAmountList.reduce((a, b) => a + b, 0)

        res.status(200).json({
            status: "success",
            resOrders,
            totalConfirm,
            totalCanceled,
            totalLeftOut,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            bookings
        })
    }
})

exports.getMonthBooking = catchAsync(async (req, res) => {
    const id = req.params.org
    let pg;
    if (req.query.book !== undefined) {
        pg = req.query.book;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            let datToday = new Date();
            let dates = [];
            let timeofDay = 60 * 60 * 24 * 1000
            for (let i = 0; i < 30; i++) {
                let eachday = new Date(datToday.getTime() - i * timeofDay);
                let day = eachday.toString().slice(0, 10)
                dates.push(day)
            }
            const datas = item.filter((data) => {
                let itemdate = data.createdAt.toString();
                let idate = itemdate.slice(0, 10)
                if (dates.includes(idate)) {
                    return data
                }
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let bookings = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            bookings
        })
    }
    else {
        pg = 1;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            let datToday = new Date();
            let dates = [];
            let timeofDay = 60 * 60 * 24 * 1000
            for (let i = 0; i < 30; i++) {
                let eachday = new Date(datToday.getTime() - i * timeofDay);
                let day = eachday.toString().slice(0, 10)
                dates.push(day)
            }
            const datas = item.filter((data) => {
                let itemdate = data.createdAt.toString();
                let idate = itemdate.slice(0, 10)
                if (dates.includes(idate)) {
                    return data
                }
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let bookings = pagination(newfoo, 20, pg);

        const resOrders = await OrgBook.find({ organization: id }).then((item) => {
            let datToday = new Date();
            let dates = [];
            let timeofDay = 60 * 60 * 24 * 1000
            for (let i = 0; i < 30; i++) {
                let eachday = new Date(datToday.getTime() - i * timeofDay);
                let day = eachday.toString().slice(0, 10)
                dates.push(day)
            }
            const datas = item.filter((data) => {
                let itemdate = data.createdAt.toString();
                let idate = itemdate.slice(0, 10)
                if (dates.includes(idate)) {
                    return data
                }
            })
            return datas
        })

        const confirmed = resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.bookingInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.bookingInfo || el.bookingInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo !== "confirmed") {
                let amounts = el.total * 1
                return unconfirmedAmountList.push(amounts);
            }
        })
        const totalUnConfirmedAmount = unconfirmedAmountList.reduce((a, b) => a + b, 0)

        res.status(200).json({
            status: "success",
            resOrders,
            totalConfirm,
            totalCanceled,
            totalLeftOut,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            bookings
        })
    }

})

exports.byMonthBooking = catchAsync(async (req, res) => {
    const id = req.params.org
    const month = req.params.month
    let pg;
    if (req.query.book !== undefined) {
        pg = req.query.book;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            const datas = item.filter((data) => {
                let fullDate = data.createdAt.toString();
                let mon = fullDate.slice(4, 7)
                itemsDate = fullDate.slice(11, 15);
                monthDat = `${mon}-${itemsDate}`
                return monthDat === month
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let foodOrders = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            foodOrders
        })
    }
    else {
        pg = 1;
        const foo = await OrgBook.find({ organization: id }).then((item) => {
            const datas = item.filter((data) => {
                let fullDate = data.createdAt.toString();
                let mon = fullDate.slice(4, 7)
                itemsDate = fullDate.slice(11, 15);
                monthDat = `${mon}-${itemsDate}`
                return monthDat === month
            })
            return datas
        })
        let newfoo = foo.sort(comp)
        let foodOrders = pagination(newfoo, 20, pg)
        const resOrders = await OrgBook.find({ organization: id }).then((item) => {
            const datas = item.filter((data) => {
                let fullDate = data.createdAt.toString();
                let mon = fullDate.slice(4, 7)
                itemsDate = fullDate.slice(11, 15);
                monthDat = `${mon}-${itemsDate}`
                return monthDat === month
            })
            return datas
        })

        const confirmed = resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.bookingInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.bookingInfo || el.bookingInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.bookingInfo !== "confirmed") {
                let amounts = el.total * 1
                return unconfirmedAmountList.push(amounts);
            }
        })
        const totalUnConfirmedAmount = unconfirmedAmountList.reduce((a, b) => a + b, 0)

        res.status(200).json({
            status: "success",
            resOrders,
            totalConfirm,
            totalCanceled,
            totalLeftOut,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            foodOrders
        })
    }

})

exports.perDayBooking = catchAsync(async (req, res) => {
    const id = req.params.org

    const itemlen = await OrgBook.find({ organization: id }).then((item) => {
        let itemdates = [];
        let count = [];

        item.forEach(el => {
            let createDate = el.createdAt.toString();
            createDate = createDate.slice(0, 15);
            itemdates.push(createDate);
        })

        let datToday = new Date();
        let timeofDay = 60 * 60 * 24 * 1000
        for (let i = 0; i < 30; i++) {
            let eachday = new Date(datToday.getTime() - i * timeofDay);
            let day = eachday.toString().slice(0, 15)
            let counter = 0;
            for (idt of itemdates) {
                if (idt == day) {
                    counter++;
                }
            }
            count.push(counter);
        }
        return count;
    })

    res.status(200).json({
        status: "success",
        itemlen
    })

})

exports.getBookingDetails = catchAsync(async (req, res) => {
    const id = req.params.id

    await OrgBook.find({ organization: id }).then((item) => {
        const confirmed = item.filter(el => {
            if (el.bookingInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = item.filter(el => {
            if (el.bookingInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = item.filter(el => {
            if (!el.bookingInfo || el.bookingInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        let confirmedAmountList = []
        item.filter(el => {
            if (el.bookingInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        item.filter(el => {
            if (el.bookingInfo !== "confirmed") {
                let amounts = el.total * 1
                return unconfirmedAmountList.push(amounts);
            }
        })
        const totalUnConfirmedAmount = unconfirmedAmountList.reduce((a, b) => a + b, 0);

        res.status(200).json({
            status: "success",
            totalConfirm,
            totalCanceled,
            totalLeftOut,
            totalConfirmedAmount,
            totalUnConfirmedAmount
        })
    })

})

exports.getAllBooking = catchAsync(async (req, res) => {
    if (req.query.book !== undefined) {
        let pg = req.query.book;
        const id = req.params.org
        const features = new APIFeatures(OrgBook.find({ organization: id }), { limit: 20, page: pg }).srt().paginate()
        const restroOrders = await features.query

        res.status(200).json({
            status: "success",
            restroOrders
        })
    }
    else {
        let pg = 1;
        const id = req.params.org
        const features = new APIFeatures(OrgBook.find({ organization: id }), { limit: 20, page: pg }).srt().paginate()
        const restroOrders = await features.query
        res.status(200).json({
            status: "success",
            restroOrders
        })
    }
});

exports.discountall = catchAsync(async (req, res) => {
    const id = req.params.id;
    let brochuresId = []
    let brochures = await Brochure.find({ user: id }).then(item => {
        item.forEach(el => {
            brochuresId.push(el.id);
        })
        return item;
    });

    brochuresId.forEach(async (item) => {
        await Brochure.findByIdAndUpdate(item, {
            $set: { applydiscount: true }
        },
            {
                new: true,
                runValidators: true
            });

    })

    if (!brochures || brochures == null) return (res.status(404).json({ status: 'success' }));

    res.status(200).json({
        status: "success"
    })
});

exports.removediscountall = catchAsync(async (req, res) => {
    const id = req.params.id;
    let brochuresId = []
    let brochures = await Brochure.find({ user: id }).then(item => {
        item.forEach(el => {
            brochuresId.push(el.id);
        })
        return item;
    });

    brochuresId.forEach(async (item) => {
        await Brochure.findByIdAndUpdate(item, {
            $set: { applydiscount: false }
        },
            {
                new: true,
                runValidators: true
            });

    })

    if (!brochures || brochures == null) return (res.status(404).json({ status: 'success' }));

    res.status(200).json({
        status: "success"
    })
});

exports.bookingnoti = catchAsync(async (req, res) => {
    const id = req.params.id;

    let org = await Organization.findOne({ user: id })
    if (!org) return (res.status(404).json({ status: 'success' }));

    const newbook = await OrgBook.find({ organization: org._id }).then(item => {
        let datas = item.filter(el => {
            if (el.bookingInfo == undefined) {
                return el
            }
        })
        return datas
    })

    res.status(200).json({
        status: "success",
        newbook
    })
});