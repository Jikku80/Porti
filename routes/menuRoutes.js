const express = require('express');

const menuController = require('./../controllers/menuControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

// router.use(authController.protect);
router.use(authController.isLoggedIn);

router.route('/').get(authController.restrictTo('user', 'admin'), menuController.getAllMenu).post(authController.restrictTo('user', 'admin'), menuController.setUsersId, menuController.uploadMenuPhoto, menuController.resizeMenuPhoto, menuController.createMenu);
router.get('/additemstomenu', menuController.newMenu)

module.exports = router;