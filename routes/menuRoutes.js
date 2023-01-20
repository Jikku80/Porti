const express = require('express');

const menuController = require('./../controllers/menuControllers');
const messageController = require('./../controllers/messageControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/:id/findbycate/:cate', menuController.findbyCat);
router.get('/:id/findbynam/:nam', menuController.findbyNam);
router.get('/allCategories/:id', menuController.listCategories);
router.get('/:id/searchItems', menuController.lookup);
router.get('/:id/paginate/:count', menuController.paginate);
router.use(authController.protect);
router.use(authController.isLoggedIn);

router.post('/', authController.restrictTo('user', 'admin'), menuController.createMenu);
router.post('/createRestaurant', authController.restrictTo('user', 'admin'), menuController.createRestaurant);
router.patch('/:id/updateRestaurant', authController.restrictTo('user', 'admin'), menuController.updateRestaurant);

router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), menuController.updateMenu);
router.get('/:id/getItem', authController.restrictTo('user', 'admin'), menuController.getMenu);
router.post('/updateItemImage', authController.restrictTo('user', 'admin'), menuController.updateItemImg);
router.post('/:id/updateResImage', authController.restrictTo('user', 'admin'), menuController.updateResImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), menuController.delMenu);

router.post('/banner', authController.restrictTo('user', 'admin'), menuController.createBanner);
router.delete('/banner/:id', authController.restrictTo('user', 'admin'), menuController.deleteBanner);

router.get('/getToday/:restro', authController.restrictTo('user', 'admin'), messageController.getDayResOrder);
router.get('/getWeek/:restro', authController.restrictTo('user', 'admin'), messageController.getWeekResOrder);
router.get('/getMonth/:restro', authController.restrictTo('user', 'admin'), messageController.getMonthResOrder);
router.get('/byMonth/:restro/find/:month', authController.restrictTo('user', 'admin'), messageController.byMonthResOrder);

router.get('/perday/:restro', authController.restrictTo('user', 'admin'), messageController.perDayResOrder);
router.get('/orderDetails/:id', authController.restrictTo('user', 'admin'), messageController.getResOrderDetails);

router.get('/getHome/:restro', authController.restrictTo('user', 'admin'), messageController.getAllHome);
router.get('/getRes/:restro', authController.restrictTo('user', 'admin'), messageController.getAllResOrd);

router.get('/mostLiked/:user', authController.restrictTo('user', 'admin'), menuController.getMostLiked);

router.patch('/updateLikes/:id', authController.restrictTo('user', 'admin'), menuController.updateLikes);
router.patch('/updateunLikes/:id', authController.restrictTo('user', 'admin'), menuController.unLike);
router.patch('/updatedisLikes/:id', authController.restrictTo('user', 'admin'), menuController.updatedisLikes);
router.patch('/updateunDisLikes/:id', authController.restrictTo('user', 'admin'), menuController.unDisLike);

module.exports = router;