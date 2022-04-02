const express = require('express');

const portController = require('./../controllers/portfolioControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/:id', portController.getMe);

router.use(authController.protect);

router.route('/').get(authController.restrictTo('admin'), portController.getAllPort).post(authController.restrictTo('user', 'admin'), portController.setUsersId, portController.uploadPortImages, portController.resizeNewPortImages, portController.createMe);
router.post('/createCollec', authController.restrictTo('user', 'admin'), portController.setUsersId, portController.uploadImages, portController.resizePortImages, portController.createImgColl);
router.post('/makePorti', authController.restrictTo('user', 'admin'), portController.setUsersId, portController.makePorti);
router.delete('/deletePorti', authController.restrictTo('user', 'admin'), portController.deletePorti)
router.route('/:id').patch(authController.restrictTo('user', 'admin'), portController.updateMe).delete(authController.restrictTo('user', 'admin'), portController.deleteMe);

module.exports = router;