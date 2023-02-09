const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const APIFeatures = require('./../utils/apiFeatures');

const Search = require('./../models/searchModel');


exports.createSearch = catchAsync(async (req, res, next) => {
    await Search.create(req.body);

    res.status(201).json({
        'status': 'success'
    })
});

exports.getAllSearch = catchAsync(async (req, res, next) => {
    const user_id = req.params.id
    let features = new APIFeatures(Search.find({ user: user_id }), { limit: 20, page: 1 }).srt().paginate();
    const searches = await features.query
    res.status(200).json({
        'status': 'success',
        searches
    })
})

exports.deleteSearch = catchAsync(async (req, res, next) => {
    const doc = await Search.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});

exports.deleteAllSearch = catchAsync(async (req, res, next) => {
    let searchList = [];
    let doc = await Search.find({ user: req.params.id }).then(item => {
        item.forEach(el => {
            searchList.push(el._id);
        })
    })

    searchList.forEach(async (item) => {
        await Search.findByIdAndDelete(item);
    })

    if (searchList.length == 0) return next(new AppError('No document found with the given ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            data: null
        }
    })
});