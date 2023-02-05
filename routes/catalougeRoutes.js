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

router.patch('/:id/updateCompanyPg', catalougeController.updateCompanyPg);


router.use(authController.protect);
router.use(authController.isLoggedIn);

router.get('/companystat/:id', authController.restrictTo('user', 'admin'), catalougeController.redirectoTocatalogStats);

router.post('/', authController.restrictTo('user', 'admin'), catalougeController.createCatalouge);
router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), catalougeController.updateCatalouge);
router.post('/:id/updateItemImage', authController.restrictTo('user', 'admin'), catalougeController.updateCatalougeItemImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), catalougeController.delCatalouge);

router.post('/createCompany', authController.restrictTo('user', 'admin'), catalougeController.createCompany);
router.patch('/:id/updateCompany', authController.restrictTo('user', 'admin'), catalougeController.updateCompany);
router.post('/:id/updateCompanyImage', authController.restrictTo('user', 'admin'), catalougeController.updateCompanyImg);
router.delete('/:id/deleteCompany/:user', authController.restrictTo('user', 'admin'), catalougeController.deleteUserCompany);

router.post('/catalogbanner', authController.restrictTo('user', 'admin'), catalougeController.createCatalogBanner);
router.delete('/catalogbanner/:id', authController.restrictTo('user', 'admin'), catalougeController.deleteCatalogBanner);

router.get('/:company/getToday?:page', authController.restrictTo('user', 'admin'), messageController.getDayComOrder);
router.get('/:company/getWeek?:page', authController.restrictTo('user', 'admin'), messageController.getWeekComOrder);
router.get('/:company/getMonth?:page', authController.restrictTo('user', 'admin'), messageController.getMonthComOrder);
router.get('/by/:company/find/:month/Month?:page', authController.restrictTo('user', 'admin'), messageController.byMonthComOrder);

router.get('/perday/:company', authController.restrictTo('user', 'admin'), messageController.perDayComOrder);
router.get('/orderDetails/:id', authController.restrictTo('user', 'admin'), messageController.getComOrderDetails);

router.get('/:company/getRes?:page', authController.restrictTo('user', 'admin'), messageController.getAllComOrd);

router.post('/newcomment', authController.restrictTo('user', 'admin'), catalougeController.newComment);
router.delete('/delcomments/:id', authController.restrictTo('user', 'admin'), catalougeController.deleteComment);

router.get('/return/:company', catalougeController.getfiftyCompReturn)
router.post('/return', catalougeController.createCompReturn);
router.get('/get/:company/return/:user', catalougeController.getSelectedCompReturn);
router.delete('/delreturn/:id', catalougeController.deleteCompReturn);
router.patch('/returnById/:id', catalougeController.updateCompReturnById);

router.get('/getreturndetails/:company', catalougeController.getAllReturnsDetails);
router.get('/getReturnToday/:company', authController.restrictTo('user', 'admin'), catalougeController.getDayReturn);
router.get('/getReturnWeek/:company', authController.restrictTo('user', 'admin'), catalougeController.getWeekReturn);
router.get('/getReturnMonth/:company', authController.restrictTo('user', 'admin'), catalougeController.getMonthReturn);
router.get('/byReturnMonth/:company/find/:month', authController.restrictTo('user', 'admin'), catalougeController.byMonthReturn);
router.get('/:company/getAllReturns?:page', authController.restrictTo('user', 'admin'), catalougeController.getAllReturn);

module.exports = router;