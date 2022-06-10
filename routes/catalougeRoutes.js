const express = require('express');

const catalougeController = require('../controllers/catalougeController');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

// router.get('/:id/findbycate/:cate', menuController.findbyCat);
// router.get('/allCategories/:id', menuController.listCategories);
// router.get('/:id/searchItems', menuController.lookup);
router.get('/:id/paginate/:count', catalougeController.paginateCatalouge);
router.use(authController.protect);
router.use(authController.isLoggedIn);
router.post('/', authController.restrictTo('user', 'admin'), catalougeController.setUsersId, catalougeController.uploadCatalougePhoto, catalougeController.resizeCatalougePhoto, catalougeController.createCatalouge);
router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), catalougeController.updateCatalouge);
router.get('/:id/getItem', authController.restrictTo('user', 'admin'), catalougeController.getCatalouge);
router.patch('/:id/updateItemImage', authController.restrictTo('user', 'admin'), catalougeController.setUsersId, catalougeController.uploadCatalougePhoto, catalougeController.resizeCatalougePhoto, catalougeController.removeCatalougeOldImg, catalougeController.updateCatalougeItemImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), catalougeController.delCatalouge);

router.post('/createCompany', authController.restrictTo('user', 'admin'), catalougeController.createCompany);
router.patch('/:id/updateCompany', authController.restrictTo('user', 'admin'), catalougeController.updateCompany);
router.patch('/:id/updateCompanyImage', authController.restrictTo('user', 'admin'), catalougeController.setUsersId, catalougeController.uploadCompanyPhoto, catalougeController.resizeCompanyPhoto, catalougeController.removeCompanyOldImg, catalougeController.updateCompanyImg);


module.exports = router;