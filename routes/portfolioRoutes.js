const express = require('express');

const portController = require('./../controllers/portfolioControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/getone/:id', portController.onePort);

router.patch('/:id/updatePortfolioPg', portController.updatePortPg);

router.get('/:id', portController.getMe);

router.get('/:id/paginate/:page', portController.paginatePortImage)
router.get('/:id/pagination/:page', portController.paginatePortImageTwl)
router.use(authController.protect);

router.route('/').get(authController.restrictTo('admin'), portController.getAllPort).post(authController.restrictTo('user', 'admin'), portController.createMe);
router.post('/portfolioImage', authController.restrictTo('user', 'admin'), portController.updatePrevImgData);

router.post('/createCollec', authController.restrictTo('user', 'admin'), portController.createImgColl);
router.post('/makePorti', authController.restrictTo('user', 'admin'), portController.setUsersId, portController.makePorti);
router.delete('/:id/deletePorti', authController.restrictTo('user', 'admin'), portController.deletePorti)
router.delete('/:id/deletePortiImage', authController.restrictTo('user', 'admin'), portController.deletePortiImage)

router.patch('/:id/updatePortfolioTheme', authController.restrictTo('user', 'admin'), portController.updatePortfolioTheme);


router.route('/:id').patch(authController.restrictTo('user', 'admin'), portController.updateMe).delete(authController.restrictTo('user', 'admin'), portController.deleteMe);

module.exports = router;