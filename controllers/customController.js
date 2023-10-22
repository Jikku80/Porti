const CustomTheme = require('./../models/customModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

exports.setUsersId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.createCustomTheme = catchAsync(async (req, res, next) => {
    await CustomTheme.create({
        user: req.user.id
    });
    res.status(201).json({
        status: 'success'
    })
});

exports.updateCustomTheme = catchAsync(async (req, res, next) => {

    const updatedTheme = await CustomTheme.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedTheme) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        customtheme: updatedTheme
    })
});