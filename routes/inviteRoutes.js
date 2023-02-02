const express = require('express');

const inviController = require('./../controllers/inviteControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

// router.get('/:id', portController.getMe);

router.patch('/:id/updateInPg', inviController.updateInPg);


router.use(authController.protect);
router.use(authController.isLoggedIn);

// router.route('/').get(authController.restrictTo('admin'), inviController.getAllInvi).post(authController.restrictTo('user', 'admin'), inviController.setUserId, inviController.uploadInviteImg, inviController.resizeNewInviteImg, inviController.createInvi);
// router.post('/createInviCollec', authController.restrictTo('user', 'admin'), inviController.createInviImgColl);
router.post('/makeInvi', authController.restrictTo('user', 'admin'), inviController.setUserId, inviController.makeInvi);

router.patch('/updateInvi', authController.protect, authController.restrictTo('admin', 'user'), inviController.updateInviData);

router.post('/updateInviImg', authController.protect, authController.restrictTo('admin', 'user'), inviController.updateInviImgData);
router.post('/updateInviImgCollec', authController.protect, authController.restrictTo('admin', 'user'), inviController.updateInviCoverImg);

router.delete('/:id/deleteInvi', authController.restrictTo('user', 'admin'), inviController.deleteInvi);

router.route('/:id').patch(authController.restrictTo('user', 'admin'), inviController.updateInvi).delete(authController.restrictTo('user', 'admin'), inviController.del);

module.exports = router;