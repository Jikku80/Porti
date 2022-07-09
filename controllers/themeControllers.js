const fs = require('fs');
const { STATUS_CODES } = require('http');
const catchAsync = require('./../utils/catchAsync');


exports.createDir = catchAsync(async (req, res, next) => {
    const folder = `views/${req.params.folderName}`
    const fileName = `views/${req.params.folderName}/${req.params.fileName}`
    fs.access(folder, (error) => {
        if (error) {
            fs.mkdir(folder, (error) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("New Directory created");
                    fs.appendFile(fileName, 'user-added', function (err) {
                        if (err) throw err;
                        console.log('File Saved!');
                    })
                    res.status(200).send({
                        success: "successfully created"
                    });
                }
            });
        } else {
            console.log("Given Directory already exists!!");
            res.status(409).send({
                error: "Name conflict"
            });
        }
    })
})
