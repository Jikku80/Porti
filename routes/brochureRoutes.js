const express = require('express');

const brochureController = require('../controllers/brochureController');
const messageController = require('./../controllers/messageControllers');

const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.patch('/:id/updateOrg', brochureController.updateOrgi)

router.use(authController.protect);
router.use(authController.isLoggedIn);

router.post('/', authController.restrictTo('user', 'admin'), brochureController.createBrochure);
router.get('/:id/getItem', brochureController.getBrochure);
router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), brochureController.updateBrochure);
router.post('/:id/updateItemImage', authController.restrictTo('user', 'admin'), brochureController.updateBrochureItemImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), brochureController.deleteBrochure);

router.post('/book', authController.restrictTo('user', 'admin'), brochureController.book);
router.get('/:id/userbooking/:org', authController.restrictTo('user', 'admin'), brochureController.getAllUserBooking);
router.delete('/deletebook/:id', authController.restrictTo('user', 'admin'), brochureController.deleteUserBooking);
router.get('/broBooking/:id', authController.restrictTo('user', 'admin'), brochureController.getFifBooking);
router.patch('/itemBookingById/:id', authController.restrictTo('user', 'admin'), brochureController.updateBookingById);

router.post('/createOrganization', authController.restrictTo('user', 'admin'), brochureController.createOrganization);
router.patch('/:id/updateOrganization', authController.restrictTo('user', 'admin'), brochureController.updateOrganizaiton)
router.post('/:id/updateOrganizationImage', authController.restrictTo('user', 'admin'), brochureController.updateOrganizationImg);
router.delete('/:id/deleteOrganization/:user', authController.restrictTo('user', 'admin'), brochureController.deleteUserOrganization);

router.post('/brochurebanner', authController.restrictTo('user', 'admin'), brochureController.createBrochureBanner);
router.delete('/brochurebanner/:id', authController.restrictTo('user', 'admin'), brochureController.deleteBrochureBanner);

router.get('/brochurestat/:id', authController.restrictTo('user', 'admin'), brochureController.redirectoTobookingStats);

router.get('/:org/getToday?:page', authController.restrictTo('user', 'admin'), brochureController.getDayBooking);
router.get('/:org/getWeek?:page', authController.restrictTo('user', 'admin'), brochureController.getWeekBooking);
router.get('/:org/getMonth?:page', authController.restrictTo('user', 'admin'), brochureController.getMonthBooking);
router.get('/by/:org/find/:month/Month?:page', authController.restrictTo('user', 'admin'), brochureController.byMonthBooking);

router.get('/perday/:org', authController.restrictTo('user', 'admin'), brochureController.perDayBooking);
router.get('/orderDetails/:id', authController.restrictTo('user', 'admin'), brochureController.getBookingDetails);

router.get('/:org/getRes?:page', authController.restrictTo('user', 'admin'), brochureController.getAllBooking);

router.patch('/applydiscount/:id', authController.restrictTo('user', 'admin'), brochureController.discountall);
router.patch('/removediscount/:id', authController.restrictTo('user', 'admin'), brochureController.removediscountall);

router.get('/getnewbookingnoti/:id', authController.restrictTo('user', 'admin'), brochureController.bookingnoti);

module.exports = router;