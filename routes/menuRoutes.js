const express = require('express');

const menuController = require('./../controllers/menuControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/:id/findbycate/:cate', menuController.findbyCat);
router.get('/allCategories/:id', menuController.listCategories);
router.get('/:id/searchItems', menuController.lookup);
router.get('/:id/paginate/:count', menuController.paginate);
router.use(authController.protect);
router.use(authController.isLoggedIn);

router.post('/', authController.restrictTo('user', 'admin'), menuController.setUsersId, menuController.uploadMenuPhoto, menuController.resizeMenuPhoto, menuController.createMenu);
router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), menuController.updateMenu);
router.get('/:id/getItem', authController.restrictTo('user', 'admin'), menuController.getMenu);
router.patch('/:id/updateItemImage', authController.restrictTo('user', 'admin'), menuController.setUsersId, menuController.uploadMenuPhoto, menuController.resizeMenuPhoto, menuController.removeOldImg, menuController.updateItemImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), menuController.delMenu);

module.exports = router;