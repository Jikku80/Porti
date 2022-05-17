const express = require('express');

const menuController = require('./../controllers/menuControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/findbycate/:cate', menuController.findbyCat);
router.get('/allCategories/:id', menuController.listCategories);
router.get('/:id/searchItems', menuController.lookup);
// router.get('/paginate', menuController.menuFirst);
router.use(authController.protect);
router.use(authController.isLoggedIn);

router.post('/', authController.restrictTo('user', 'admin'), menuController.setUsersId, menuController.uploadMenuPhoto, menuController.resizeMenuPhoto, menuController.createMenu);
router.get('/additemstomenu', menuController.newMenu);

module.exports = router;