const catchAsync = require('./../utils/catchAsync');
const Theme = require('./../models/themeModel');

exports.paymentTypes = catchAsync(async (req, res, next) => {
    const itemId = req.params.id;

    const theme = await Theme.findOne({ themeId: itemId })
    res.status(200).render('payment/paymentList', {
        title: "Pay With",
        theme
    })
})

exports.paySuccess = catchAsync(async (req, res, next) => {
    const itemId = req.params.id;

    const theme = await Theme.findOne({ themeId: itemId })
    res.status(200).render('payment/success', {
        title: "Payment Successful",
        theme
    })
})

exports.payFailure = catchAsync(async (req, res, next) => {
    res.status(200).render('payment/failure', {
        title: "Payment Failure"
    })
})