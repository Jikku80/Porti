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

router.patch('/:id/updateResPg', menuController.updateResPg);

router.use(authController.isLoggedIn);
router.get('/:id/getItem', menuController.getMenu);
router.use(authController.protect);

router.patch('/:id/updateFoodLayout', menuController.updateResLayout);

router.get('/restrostat/:id', authController.restrictTo('user', 'admin'), menuController.redirectoTorestroStats);

router.post('/', authController.restrictTo('user', 'admin'), menuController.createMenu);
router.post('/createRestaurant', authController.restrictTo('user', 'admin'), menuController.createRestaurant);
router.patch('/:id/updateRestaurant', authController.restrictTo('user', 'admin'), menuController.updateRestaurant);
router.delete('/:id/deleteRestro/:user', authController.restrictTo('user', 'admin'), menuController.deleteUserRestro);

router.patch('/:id/updateItemDetail', authController.restrictTo('user', 'admin'), menuController.updateMenu);
router.post('/updateItemImage', authController.restrictTo('user', 'admin'), menuController.updateItemImg);
router.post('/:id/updateResImage', authController.restrictTo('user', 'admin'), menuController.updateResImg);
router.delete('/:id/deleteItem', authController.restrictTo('user', 'admin'), menuController.delMenu);

router.post('/banner', authController.restrictTo('user', 'admin'), menuController.createBanner);
router.delete('/banner/:id', authController.restrictTo('user', 'admin'), menuController.deleteBanner);

router.get('/:restro/getToday?:page', authController.restrictTo('user', 'admin'), messageController.getDayResOrder);
router.get('/:restro/getWeek?:page', authController.restrictTo('user', 'admin'), messageController.getWeekResOrder);
router.get('/:restro/getMonth?:page', authController.restrictTo('user', 'admin'), messageController.getMonthResOrder);
router.get('/by/:restro/find/:month/Month?:page', authController.restrictTo('user', 'admin'), messageController.byMonthResOrder);

router.get('/perday/:restro', authController.restrictTo('user', 'admin'), messageController.perDayResOrder);
router.get('/orderDetails/:id', authController.restrictTo('user', 'admin'), messageController.getResOrderDetails);

router.get('/:restro/getHome?:page', authController.restrictTo('user', 'admin'), messageController.getAllHome);
router.get('/:restro/getRes?:page', authController.restrictTo('user', 'admin'), messageController.getAllResOrd);

router.get('/mostLiked/:user', authController.restrictTo('user', 'admin'), menuController.getMostLiked);

router.patch('/updateLikes/:id', authController.restrictTo('user', 'admin'), menuController.updateLikes);
router.patch('/updateunLikes/:id', authController.restrictTo('user', 'admin'), menuController.unLike);
router.patch('/updatedisLikes/:id', authController.restrictTo('user', 'admin'), menuController.updatedisLikes);
router.patch('/updateunDisLikes/:id', authController.restrictTo('user', 'admin'), menuController.unDisLike);

router.get('/reserve/:restro', menuController.getfiftyResReserve)
router.post('/reserve', menuController.createResReserve);
router.get('/get/:restro/reserve/:user', menuController.getSelectedResReserve);
router.delete('/delreserve/:id', menuController.deleteResReserve);
router.patch('/reserveById/:id', menuController.updateResReserveById);

router.get('/getreservedetails/:restro', menuController.getAllResReserveDetails);
router.get('/getResToday/:restro', authController.restrictTo('user', 'admin'), menuController.getDayReserve);
router.get('/getResWeek/:restro', authController.restrictTo('user', 'admin'), menuController.getWeekReserve);
router.get('/getResMonth/:restro', authController.restrictTo('user', 'admin'), menuController.getMonthReserve);
router.get('/byResMonth/:restro/find/:month', authController.restrictTo('user', 'admin'), menuController.byMonthReserve);
router.get('/:restro/getAllReserve?:page', authController.restrictTo('user', 'admin'), menuController.getAllReserve);

router.patch('/applydiscount/:id', authController.restrictTo('user', 'admin'), menuController.discountall);
router.patch('/removediscount/:id', authController.restrictTo('user', 'admin'), menuController.removediscountall);

router.get('/getnewordernoti/:id', authController.restrictTo('user', 'admin'), menuController.restronoti);

module.exports = router;