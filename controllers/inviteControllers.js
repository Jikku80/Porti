const fs = require('fs');
const formidable = require('formidable');

const Invite = require('./../models/inviteModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');

const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const { DefaultAzureCredential } = require("@azure/identity");

exports.setUserId = (req, res, next) => {
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getAllInvi = factory.getAll(Invite);
exports.getInvi = factory.getOne(Invite);
exports.updateInvi = factory.updateOne(Invite);
exports.del = factory.deleteOne(Invite);
exports.makeInvi = factory.createOne(Invite);

exports.deleteInvi = catchAsync(async (req, res, next) => {
    const item = await Invite.findByIdAndDelete(req.params.id);

    if (!item) return next(new AppError('No document found with the given ID', 404));

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
            about: req.body.about,
            address: req.body.address,
            ptime: req.body.ptime,
            phn_no: req.body.phn_no,
            pdate: req.body.pdate,
            theme: req.body.theme
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json({
        status: 'success',
        updatedInvite
    });
});

exports.updateInviImgData = catchAsync(async (req, res, next) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'invitationimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async function (err, fields, files) {

        const imgs = [];
        let imagefiles = files.imgCollec;
        if (imagefiles.length >= 2) {
            await Promise.all(
                imagefiles.map(async (file, i) => {
                    const blobName = `${req.user.name}-inviimagecollection-${uuidv1()}-${i + 1}.jpeg`;
                    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    const filePath = file.filepath;
                    await blockBlobClient.uploadFile(filePath)
                    imgs.push(blockBlobClient.url);
                })
            );
            await Invite.findByIdAndUpdate(
                fields.colelcId,
                {
                    imgs: imgs
                },
                {
                    new: true,
                    runValidators: true
                }
            );
            res.redirect(`/myinvi/${fields.colelcId}`)
        }
        else {
            const filePath = files.imgCollec.filepath;
            const blobName = `${req.user.name}-invicoverimage-${uuidv1()}.jpeg`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadFile(filePath)
            await Invite.findByIdAndUpdate(
                fields.colelcId,
                {
                    imgs: blockBlobClient.url
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            res.redirect(`/myinvi/${fields.colelcId}`)
        }
    })

});

exports.updateInviCoverImg = catchAsync(async (req, res, next) => {

    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');
    const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, new DefaultAzureCredential());

    const containerName = 'invitationimages';

    const containerClient = blobServiceClient.getContainerClient(containerName);
    let form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const filePath = files.coverimg.filepath;
        const blobName = `${req.user.name}-coverinvitationimages-${uuidv1()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadFile(filePath)

        await Invite.findByIdAndUpdate(
            fields.uinviid,
            {
                imgCover: blockBlobClient.url
            },
            {
                new: true,
                runValidators: true
            }
        );
        res.redirect(`/myinvi/${fields.uinviid}`)
    })
});



