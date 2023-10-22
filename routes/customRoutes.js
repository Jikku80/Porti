const express = require('express');
const customThemeController = require('./../controllers/customController');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.use(authController.protect);

router.route('/').post(authController.restrictTo('user', 'admin'), customThemeController.createCustomTheme);

router.route('/updateCustomTheme/:id').patch(authController.restrictTo('admin', 'user'), customThemeController.updateCustomTheme);

module.exports = router;