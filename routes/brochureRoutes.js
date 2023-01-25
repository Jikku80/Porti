const express = require('express');

const brochureController = require('../controllers/brochureController');
const messageController = require('./../controllers/messageControllers');

const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/:id/getItem', brochureController.getBrochure);

router.use(authController.protect);
router.use(authController.isLoggedIn);

router.post('/', authController.restrictTo('user', 'admin'), brochureController.createBrochure);
router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), brochureController.updateBrochure);
router.post('/:id/updateItemImage', authController.restrictTo('user', 'admin'), brochureController.updateBrochureItemImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), brochureController.deleteBrochure);


router.post('/createOrganization', authController.restrictTo('user', 'admin'), brochureController.createOrganization);
router.patch('/:id/updateOrganization', authController.restrictTo('user', 'admin'), brochureController.updateOrganizaiton)
router.post('/:id/updateOrganizationImage', authController.restrictTo('user', 'admin'), brochureController.updateOrganizationImg);
router.delete('/:id/deleteOrganization/:user', authController.restrictTo('user', 'admin'), brochureController.deleteUserOrganization);

router.post('/brochurebanner', authController.restrictTo('user', 'admin'), brochureController.createBrochureBanner);
router.delete('/brochurebanner/:id', authController.restrictTo('user', 'admin'), brochureController.deleteBrochureBanner);

module.exports = router;