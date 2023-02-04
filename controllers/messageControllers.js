const Message = require('./../models/messageModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const User = require('./../models/userModel');
const ResOrder = require('./../models/resOrderModel');
const ComOrder = require('./../models/comOrderModel');
const UserMessage = require('./../models/userMessageModel')
const Restaurant = require('./../models/restaurantDetailModel');
const Company = require('./../models/companyModel');
const e = require('express');

exports.createResOrder = catchAsync(async (req, res, next) => {
    const newresorders = await ResOrder.create(req.body);
    res.status(201).json({
        status: 'success',
        newresorders
    });
});

exports.createComOrder = catchAsync(async (req, res, next) => {
    const newcomorders = await ComOrder.create(req.body);
    res.status(201).json({
        status: 'success',
        newcomorders
    });
});

exports.updateResOrderById = catchAsync(async (req, res, next) => {

    const updatedResOrder = await ResOrder.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!updatedResOrder || updatedResOrder == null) return (res.status(404).json({ status: 'success' }));


    res.status(200).json({
        status: 'success',
        data: {
            restro: updatedResOrder
        }
    })
})

exports.updateComOrderById = catchAsync(async (req, res, next) => {

    const updatedComOrder = await ComOrder.findByIdAndUpdate(req.params.id, req.body,
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

exports.getAllResOrder = catchAsync(async (req, res, next) => {
    const restro = req.params.restro;
    const features = new APIFeatures(ResOrder.find({ restro: restro }), { limit: 50, page: "1" }).paginate().srt();
    const resorders = await features.query
    res.status(200).json({
        status: 'success',
        resorders
    })
});

exports.getFifCatOrders = catchAsync(async (req, res, next) => {
    const cat = req.params.cat;
    const features = new APIFeatures(ComOrder.find({ company: cat }), { limit: 50, page: "1" }).paginate().srt();
    const comorders = await features.query
    res.status(200).json({
        status: 'success',
        comorders
    })
});

exports.getSelectedResOrder = catchAsync(async (req, res, next) => {
    const restro = req.params.restro;
    const usr = req.params.user;

    const features = new APIFeatures(ResOrder.find({ restro: restro }), { limit: 11, page: "1" }).paginate().srt();
    await features.query.then((item) => {
        const usrresorders = item.filter(x => {
            return x.name == usr
        })

        res.status(200).json({
            status: 'success',
            usrresorders
        })
    })

})

exports.getSelectedComOrder = catchAsync(async (req, res, next) => {
    const comp = req.params.cat;
    const usr = req.params.user;

    const features = new APIFeatures(ComOrder.find({ company: comp }), { limit: 11, page: "1" }).paginate().srt();
    await features.query.then((item) => {
        const usrcomorders = item.filter(x => {
            return x.name == usr
        })

        res.status(200).json({
            status: 'success',
            usrcomorders
        })
    })

})

exports.deleteResOrder = catchAsync(async (req, res, next) => {
    const doc = await ResOrder.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});

exports.deleteComOrder = catchAsync(async (req, res, next) => {
    const doc = await ComOrder.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});

exports.getResOrderStat = catchAsync(async (req, res) => {
    const id = req.params.restro
    const restro = await Restaurant.find({ _id: id })

    res.status(200).render('menu/stats', {
        title: 'Restaurant Statistics',
        restro
    })
})

exports.getComOrderStat = catchAsync(async (req, res) => {
    const id = req.params.company
    const company = await Company.find({ _id: id })

    res.status(200).render('catalouge/stats', {
        title: 'Company Statistics',
        company
    })
})

const pagination = function (array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function comp(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

exports.getDayResOrder = catchAsync(async (req, res) => {
    const id = req.params.restro
    let pg;
    if (req.query.food !== undefined) {
        pg = req.query.food
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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
        let foodOrders = pagination(newfoo, 20, pg)

        res.status(200).json({
            status: "success",
            foodOrders
        })
    }
    else {
        pg = 1
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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
        let foodOrders = pagination(newfoo, 20, pg)
        const resOrders = await ResOrder.find({ restro: id }).then((item) => {
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
            if (el.orderInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.orderInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.orderInfo || el.orderInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        const resOrd = resOrders.filter(el => {
            if (el.homedelivery === false) {
                return el
            }
        })

        totalResOrd = resOrd.length;

        const homeOrd = resOrders.filter(el => {
            if ((el.homedelivery === true)) {
                return el
            }
        })

        totalHomeOrd = homeOrd.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo !== "confirmed") {
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
            totalResOrd,
            totalHomeOrd,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            foodOrders
        })
    }
})

exports.getWeekResOrder = catchAsync(async (req, res) => {
    const id = req.params.restro
    let pg;
    if (req.query.food !== undefined) {
        pg = req.query.food
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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
        let foodOrders = pagination(newfoo, 20, pg)

        res.status(200).json({
            status: "success",
            foodOrders
        })
    }
    else {
        pg = 1
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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
        let foodOrders = pagination(newfoo, 20, pg)

        const resOrders = await ResOrder.find({ restro: id }).then((item) => {
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
            if (el.orderInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.orderInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.orderInfo || el.orderInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        const resOrd = resOrders.filter(el => {
            if (el.homedelivery === false) {
                return el
            }
        })

        totalResOrd = resOrd.length;

        const homeOrd = resOrders.filter(el => {
            if ((el.homedelivery === true)) {
                return el
            }
        })

        totalHomeOrd = homeOrd.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo !== "confirmed") {
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
            totalResOrd,
            totalHomeOrd,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            foodOrders
        })
    }
})

exports.getMonthResOrder = catchAsync(async (req, res) => {
    const id = req.params.restro
    let pg;
    if (req.query.food !== undefined) {
        pg = req.query.food
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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
        let foodOrders = pagination(newfoo, 20, pg)

        res.status(200).json({
            status: "success",
            foodOrders
        })
    }
    else {
        pg = 1
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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
        let foodOrders = pagination(newfoo, 20, pg)

        const resOrders = await ResOrder.find({ restro: id }).then((item) => {
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
            if (el.orderInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.orderInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.orderInfo || el.orderInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        const resOrd = resOrders.filter(el => {
            if (el.homedelivery === false) {
                return el
            }
        })

        totalResOrd = resOrd.length;

        const homeOrd = resOrders.filter(el => {
            if ((el.homedelivery === true)) {
                return el
            }
        })

        totalHomeOrd = homeOrd.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo !== "confirmed") {
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
            totalResOrd,
            totalHomeOrd,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            foodOrders
        })
    }
})

exports.byMonthResOrder = catchAsync(async (req, res) => {
    const id = req.params.restro
    const month = req.params.month
    let pg;
    if (req.query.food !== undefined) {
        pg = req.query.food
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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
        pg = 1
        let foo = await ResOrder.find({ restro: id }).then((item) => {
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

        const resOrders = await ResOrder.find({ restro: id }).then((item) => {
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
            if (el.orderInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = resOrders.filter(el => {
            if (el.orderInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = resOrders.filter(el => {
            if (!el.orderInfo || el.orderInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        const resOrd = resOrders.filter(el => {
            if (el.homedelivery === false) {
                return el
            }
        })

        totalResOrd = resOrd.length;

        const homeOrd = resOrders.filter(el => {
            if ((el.homedelivery === true)) {
                return el
            }
        })

        totalHomeOrd = homeOrd.length;

        let confirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        resOrders.filter(el => {
            if (el.orderInfo !== "confirmed") {
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
            totalResOrd,
            totalHomeOrd,
            totalConfirmedAmount,
            totalUnConfirmedAmount,
            foodOrders
        })
    }
})

exports.perDayResOrder = catchAsync(async (req, res) => {
    const id = req.params.restro

    const itemlen = await ResOrder.find({ restro: id }).then((item) => {
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

exports.getResOrderDetails = catchAsync(async (req, res) => {
    const id = req.params.id
    await ResOrder.find({ restro: id }).then((item) => {
        const confirmed = item.filter(el => {
            if (el.orderInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = item.filter(el => {
            if (el.orderInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = item.filter(el => {
            if (!el.orderInfo || el.orderInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        const resOrd = item.filter(el => {
            if (el.homedelivery === false) {
                return el
            }
        })

        totalResOrd = resOrd.length;

        const homeOrd = item.filter(el => {
            if ((el.homedelivery === true)) {
                return el
            }
        })

        totalHomeOrd = homeOrd.length;

        let confirmedAmountList = []
        item.filter(el => {
            if (el.orderInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        item.filter(el => {
            if (el.orderInfo !== "confirmed") {
                let amounts = el.total * 1
                return unconfirmedAmountList.push(amounts);
            }
        })
        const totalUnConfirmedAmount = unconfirmedAmountList.reduce((a, b) => a + b, 0)

        res.status(200).json({
            status: "success",
            totalConfirm,
            totalCanceled,
            totalLeftOut,
            totalResOrd,
            totalHomeOrd,
            totalConfirmedAmount,
            totalUnConfirmedAmount
        })
    })
})

exports.getAllHome = catchAsync(async (req, res) => {
    const id = req.params.restro
    let pg;
    if (req.query.order !== undefined) {
        pg = req.query.order;
        const restoOrders = await ResOrder.find({ restro: id }).then(item => {
            const data = item.filter(el => {
                if (el.homedelivery === true) {
                    return el;
                }
            })
            return data
        })
        let newfoo = restoOrders.sort(comp)
        let restroOrders = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            restroOrders
        })
    }
    else {
        pg = 1;
        const restoOrders = await ResOrder.find({ restro: id }).then(item => {
            const data = item.filter(el => {
                if (el.homedelivery === true) {
                    return el;
                }
            })
            return data
        })
        let newfoo = restoOrders.sort(comp)
        let restroOrders = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            restroOrders
        })
    }
})

exports.getAllResOrd = catchAsync(async (req, res) => {
    const id = req.params.restro
    let pg;
    if (req.query.order !== undefined) {
        pg = req.query.order
        const restoOrders = await ResOrder.find({ restro: id }).then(item => {
            const data = item.filter(el => {
                if (el.homedelivery === false) {
                    return el;
                }
            })
            return data
        })
        let newfoo = restoOrders.sort(comp)
        let restroOrders = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            restroOrders
        })
    }
    else {
        pg = 1;
        const restoOrders = await ResOrder.find({ restro: id }).then(item => {
            const data = item.filter(el => {
                if (el.homedelivery === false) {
                    return el;
                }
            })
            return data
        })
        let newfoo = restoOrders.sort(comp)
        let restroOrders = pagination(newfoo, 20, pg)
        res.status(200).json({
            status: "success",
            restroOrders
        })
    }
})

exports.getDayComOrder = catchAsync(async (req, res) => {
    const id = req.params.company
    const resOrders = await ComOrder.find({ company: id }).then((item) => {
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
        if (el.orderInfo === "confirmed") {
            return el
        };
    })
    totalConfirm = confirmed.length;

    const canceled = resOrders.filter(el => {
        if (el.orderInfo === "canceled") {
            return el
        }
    })
    totalCanceled = canceled.length;

    const leftOut = resOrders.filter(el => {
        if (!el.orderInfo || el.orderInfo == null) {
            return el
        }
    })

    totalLeftOut = leftOut.length;

    let confirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo === "confirmed") {
            let amounts = el.total * 1
            return confirmedAmountList.push(amounts);
        }
    })
    const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

    let unconfirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo !== "confirmed") {
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
        totalUnConfirmedAmount
    })

})

exports.getWeekComOrder = catchAsync(async (req, res) => {
    const id = req.params.company
    const resOrders = await ComOrder.find({ company: id }).then((item) => {
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
        if (el.orderInfo === "confirmed") {
            return el
        };
    })
    totalConfirm = confirmed.length;

    const canceled = resOrders.filter(el => {
        if (el.orderInfo === "canceled") {
            return el
        }
    })
    totalCanceled = canceled.length;

    const leftOut = resOrders.filter(el => {
        if (!el.orderInfo || el.orderInfo == null) {
            return el
        }
    })

    totalLeftOut = leftOut.length;

    let confirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo === "confirmed") {
            let amounts = el.total * 1
            return confirmedAmountList.push(amounts);
        }
    })
    const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

    let unconfirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo !== "confirmed") {
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
        totalUnConfirmedAmount
    })

})

exports.getMonthComOrder = catchAsync(async (req, res) => {
    const id = req.params.company
    const resOrders = await ComOrder.find({ company: id }).then((item) => {
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
        if (el.orderInfo === "confirmed") {
            return el
        };
    })
    totalConfirm = confirmed.length;

    const canceled = resOrders.filter(el => {
        if (el.orderInfo === "canceled") {
            return el
        }
    })
    totalCanceled = canceled.length;

    const leftOut = resOrders.filter(el => {
        if (!el.orderInfo || el.orderInfo == null) {
            return el
        }
    })

    totalLeftOut = leftOut.length;

    let confirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo === "confirmed") {
            let amounts = el.total * 1
            return confirmedAmountList.push(amounts);
        }
    })
    const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

    let unconfirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo !== "confirmed") {
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
        totalUnConfirmedAmount
    })

})

exports.byMonthComOrder = catchAsync(async (req, res) => {
    const id = req.params.company
    const month = req.params.month
    const resOrders = await ComOrder.find({ company: id }).then((item) => {
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
        if (el.orderInfo === "confirmed") {
            return el
        };
    })
    totalConfirm = confirmed.length;

    const canceled = resOrders.filter(el => {
        if (el.orderInfo === "canceled") {
            return el
        }
    })
    totalCanceled = canceled.length;

    const leftOut = resOrders.filter(el => {
        if (!el.orderInfo || el.orderInfo == null) {
            return el
        }
    })

    totalLeftOut = leftOut.length;

    let confirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo === "confirmed") {
            let amounts = el.total * 1
            return confirmedAmountList.push(amounts);
        }
    })
    const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

    let unconfirmedAmountList = []
    resOrders.filter(el => {
        if (el.orderInfo !== "confirmed") {
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
        totalUnConfirmedAmount
    })

})

exports.perDayComOrder = catchAsync(async (req, res) => {
    const id = req.params.company

    const itemlen = await ComOrder.find({ company: id }).then((item) => {
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

exports.getComOrderDetails = catchAsync(async (req, res) => {
    const id = req.params.id

    await ComOrder.find({ company: id }).then((item) => {
        const confirmed = item.filter(el => {
            if (el.orderInfo === "confirmed") {
                return el
            };
        })
        totalConfirm = confirmed.length;

        const canceled = item.filter(el => {
            if (el.orderInfo === "canceled") {
                return el
            }
        })
        totalCanceled = canceled.length;

        const leftOut = item.filter(el => {
            if (!el.orderInfo || el.orderInfo == null) {
                return el
            }
        })

        totalLeftOut = leftOut.length;

        let confirmedAmountList = []
        item.filter(el => {
            if (el.orderInfo === "confirmed") {
                let amounts = el.total * 1
                return confirmedAmountList.push(amounts);
            }
        })
        const totalConfirmedAmount = confirmedAmountList.reduce((a, b) => a + b, 0)

        let unconfirmedAmountList = []
        item.filter(el => {
            if (el.orderInfo !== "confirmed") {
                let amounts = el.total * 1
                return unconfirmedAmountList.push(amounts);
            }
        })
        const totalUnConfirmedAmount = unconfirmedAmountList.reduce((a, b) => a + b, 0)

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

exports.getAllComOrd = catchAsync(async (req, res) => {
    const id = req.params.company
    const restroOrders = await ComOrder.find({ company: id })
    res.status(200).json({
        status: "success",
        restroOrders
    })
})

exports.createMsg = factory.createOne(Message);
exports.getAllMsg = factory.getAll(Message);

exports.getUserMessage = catchAsync(async (req, res) => {
    const id = req.params.user
    const messages = await UserMessage.find({ _id: id })

    res.status(200).render('messages/allmsg', {
        title: 'Messages',
        messages
    })
})

exports.newUserMessage = catchAsync(async (req, res) => {
    const messages = await UserMessage.create(req.body)
    res.status(201).json({
        status: 'success',
        messages
    })
})

exports.getAllMessageFromUser = catchAsync(async (req, res) => {
    let mname = req.params.name

    const firstmessages = await UserMessage.find({ user: req.params.userName }).then(item => {

        const data = item.filter(el => {
            return el.userName === mname
        })
        return data
    })

    const secmessages = await UserMessage.find({ userName: req.params.userName }).then(item => {
        const data = item.filter(el => {

            if (el.user == mname) {
                return el;
            }
        })
        return data
    })

    let messages = firstmessages.concat(secmessages)
    res.status(200).json({
        status: 'success',
        messages
    })
})

exports.getMessagesAllUsers = catchAsync(async (req, res) => {
    let comMsg;
    const firstmessages = await UserMessage.find({ userName: req.params.name }).then(arr => {
        comMsg = [...arr];
        return distinctCat = [...new Set(arr.map(x => x.sentBy))];
    })

    const secmessages = await UserMessage.find().then(arr => {
        let data = arr.filter(el => {
            if (el.user == req.params.name) {
                return el
            }
        })
        return distinctCat = [...new Set(data.map(x => x.name))];
    })

    msg = firstmessages.concat(secmessages)

    let messages = msg.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });

    // let messages = []
    // for (let i = 0; i < messages.length; i++) {
    //     let names = await User.findOne({ name: messages[i] })
    //     if (names === null) {
    //         messages.splice(i, 1)
    //     }
    // }

    res.status(200).json({
        status: 'success',
        messages,
        comMsg
    })
})

exports.getAllMessageByUser = catchAsync(async (req, res) => {
    let mname = req.params.name
    const uid = await User.findOne({ name: req.params.userName }).then(item => {
        if (item === null) {
            return null
        }
        return item._id
    })

    if (uid === null) {
        return (res.status(404).json({ status: 'success' }))
    }

    const firstmessages = await UserMessage.find({ user: uid }).then(item => {

        const data = item.filter(el => {
            return el.userName == mname
        })
        return data
    })

    const secmessages = await UserMessage.find().then(item => {
        const data = item.filter(el => {
            if ((el.userName == uid && el.user == mname)) {
                return el;
            }
        })
        return data
    })

    let messages = firstmessages.concat(secmessages)

    res.status(200).json({
        status: 'success',
        messages,
        secmessages
    })
})

exports.updateUserMessage = catchAsync(async (req, res, next) => {
    let mname = req.params.name
    const uid = await User.findOne({ name: req.params.userName }).then(item => {
        if (item === null) {
            return null
        }
        return item._id
    })

    if (uid === null) {
        return (res.status(404).json({ status: 'success' }))
    }

    const messages = await UserMessage.find({ user: uid }).then(item => {

        const data = item.filter(async (el) => {
            if (el.userName === mname) {
                let id = el._id
                return id;
            }
        })
        return data
    })

    messages.forEach(async (item) => {

        let updated = await UserMessage.findByIdAndUpdate(item, {
            $set: { received: true }
        },
            {
                new: true,
                runValidators: true
            });

        if (!updated || updated == null) return (res.status(404).json({ status: 'success' }));
    })

    res.status(200).json({
        status: 'success',
        messages
    })
});

exports.deleteUserMessage = catchAsync(async (req, res, next) => {
    const doc = await UserMessage.findByIdAndDelete(req.params.id);
    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});