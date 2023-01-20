const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const atob = require('./../utils/decode');

const Invite = require('./../models/inviteModel');

exports.inviFirst = catchAsync(async (req, res, next) => {
    const invi_id = atob(req.params.id)

    await Invite.findById(invi_id).populate('user').then(invite => {
        let theme = invite.theme
        switch (theme) {
            case "4dc50fc3bc007be011b5445f3f79298b9eeb51b7":
                res.status(200).render('invite/firstInvite', {
                    title: `${invite.fname} <3 ${invite.sname}`,
                    invite
                })
                break;
            case "c71c0e24cd20e4b25ae8e3d9e35337500a44a8f7":
                res.status(200).render('invite/secondInvite', {
                    title: `${invite.fname}`,
                    invite
                })
                break;
            case "5e334d18837e9d8249e70b891069884828f06b91":
                res.status(200).render('invite/thirdInvite', {
                    title: `${invite.fname}`,
                    invite
                })
                break;
            default:
                res.status(404).render('404.pug')
        }
    })
})