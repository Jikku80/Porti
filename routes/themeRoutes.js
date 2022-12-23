const express = require('express');
const themeController = require('./../controllers/themeControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(authController.restrictTo('admin', 'user'), themeController.getAllTheme).post(authController.restrictTo('user', 'admin'), themeController.createTheme);

router.route('/tweakTheme').get(authController.restrictTo('admin', 'user'), themeController.themeForm);

router.route('/updateTheme/:id').patch(authController.restrictTo('admin', 'user'), themeController.updateTheme);

module.exports = router;