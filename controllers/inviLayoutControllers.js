const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const atob = require('./../utils/decode');

const Invite = require('./../models/inviteModel');

exports.inviFirst = catchAsync(async (req, res, next) => {
    const invi_id = atob(req.params.id)
    await Invite.findById(invi_id).populate('user').then(invite => {

        res.status(200).render('invite/firstInvite', {
            title: `${invite.fname} <3 ${invite.sname}`,
            invite
        })
    })
})

exports.inviSecond = catchAsync(async (req, res, next) => {
    const invi_id = atob(req.params.id)
    await Invite.findById(invi_id).populate('user').then(invite => {

        res.status(200).render('invite/secondInvite', {
            title: `${invite.fname}`,
            invite
        })
    })
})