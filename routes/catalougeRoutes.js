const express = require('express');

const catalougeController = require('../controllers/catalougeController');
const messageController = require('./../controllers/messageControllers');

const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/:id/finditems/:subcate/:cate', catalougeController.listBySubCategories);
router.get('/:id/findsubcate/:cate', catalougeController.listCatalougeSubCategories);
router.get('/allCatalougeCategories/:id', catalougeController.listCatalougeCategories);
router.get('/:id/searchCatalouge/:search', catalougeController.lookupCatalouge);
router.get('/:id/paginate/:count', catalougeController.paginateCatalouge);
router.get('/:id/similar/:category/item/:itemId', catalougeController.listSimilarItems);
router.get('/:id/getItem', catalougeController.getCatalouge);
router.get('/comments/:id', catalougeController.getLastComments);

router.use(authController.protect);
router.use(authController.isLoggedIn);
router.post('/', authController.restrictTo('user', 'admin'), catalougeController.createCatalouge);
router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), catalougeController.updateCatalouge);
router.post('/:id/updateItemImage', authController.restrictTo('user', 'admin'), catalougeController.updateCatalougeItemImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), catalougeController.delCatalouge);

router.post('/createCompany', authController.restrictTo('user', 'admin'), catalougeController.createCompany);
router.patch('/:id/updateCompany', authController.restrictTo('user', 'admin'), catalougeController.updateCompany);
router.post('/:id/updateCompanyImage', authController.restrictTo('user', 'admin'), catalougeController.updateCompanyImg);

router.post('/catalogbanner', authController.restrictTo('user', 'admin'), catalougeController.createCatalogBanner);
router.delete('/catalogbanner/:id', authController.restrictTo('user', 'admin'), catalougeController.deleteCatalogBanner);

router.get('/getToday/:company', authController.restrictTo('user', 'admin'), messageController.getDayComOrder);
router.get('/getWeek/:company', authController.restrictTo('user', 'admin'), messageController.getWeekComOrder);
router.get('/getMonth/:company', authController.restrictTo('user', 'admin'), messageController.getMonthComOrder);
router.get('/byMonth/:company/find/:month', authController.restrictTo('user', 'admin'), messageController.byMonthComOrder);

router.get('/perday/:company', authController.restrictTo('user', 'admin'), messageController.perDayComOrder);
router.get('/orderDetails/:id', authController.restrictTo('user', 'admin'), messageController.getComOrderDetails);

router.get('/getRes/:company', authController.restrictTo('user', 'admin'), messageController.getAllComOrd);

router.post('/newcomment', authController.restrictTo('user', 'admin'), catalougeController.newComment);
router.delete('/delcomments/:id', authController.restrictTo('user', 'admin'), catalougeController.deleteComment);

module.exports = router;