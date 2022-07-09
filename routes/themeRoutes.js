const express = require('express');
const themeController = require('./../controllers/themeControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.use(authController.protect);

router.get('/:fileName/createFolder/:folderName', themeController.createDir);

module.exports = router;