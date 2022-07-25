const express = require('express');
const themeController = require('./../controllers/themeControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(authController.restrictTo('admin'), themeController.getAllTheme).post(authController.restrictTo('user', 'admin'), themeController.setUsersId, themeController.uploadThemeImage, themeController.resizeThemeImage, themeController.createTheme);

module.exports = router;