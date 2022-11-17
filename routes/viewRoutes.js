const express = require('express');

const portController = require('../controllers/portfolioControllers');
const authController = require('./../controllers/authControllers');
const viewsController = require('./../controllers/viewControllers');
const inlayoutController = require('./../controllers/inviLayoutControllers');
const menuController = require('../controllers/menuControllers');
const catalougeController = require('../controllers/catalougeController');


const router = express.Router();

router.get('/logout', authController.logout);
router.patch('/passwordreset', authController.resetPassword);

router.get('/:user/portfolio/:userid/ldt/:id', viewsController.layoutTally);

router.get('/:user/invitation/:id', inlayoutController.inviFirst);
// router.get('/:user/invitation/:id/4dc50fc3bc007be011b5445f3f79298b9eeb51b7', inlayoutController.inviFirst);
// router.get('/:user/invitation/:id/c71c0e24cd20e4b25ae8e3d9e35337500a44a8f7', inlayoutController.inviSecond);

router.get('/:user/menu/:id', menuController.menuFirst);
router.get('/:user/catalouge/:id', catalougeController.firstCatalouge);


router.post('/sendmsg', viewsController.newMsg);

router.use(authController.isLoggedIn);
router.get('/', viewsController.homePage);
router.post('/scan', viewsController.qrCodeGen);
router.post('/urlShortner', viewsController.urlShortner);

router.post('/login', authController.login);
router.get('/resetpassword', viewsController.restForm);

router.patch('/updateport', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortData);
router.patch('/updateportSec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortDataSec);
// router.patch('/updateportSix', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortSix);

router.patch('/updateportImg', authController.protect, authController.restrictTo('admin', 'user'), portController.uploadPortfolioCoverImage, portController.resizeNewPortImages, viewsController.removePortiOldImg, viewsController.updatePortImgData);
router.patch('/updateportImgCollec', authController.protect, authController.restrictTo('admin', 'user'), portController.uploadImages, portController.resizePortImages, viewsController.removePortiOldImgColl, viewsController.updatePortImgCollec);
router.get('/myportfolio/:id', viewsController.myPort);
router.get('/myinvi/:id', viewsController.myInvi);
router.get('/menu/:id/additemstomenu', menuController.newMenu);
router.get('/catalouge/:id/additems', catalougeController.addItemsPage);


router.get('/:id/tweaks', menuController.itemTweaks);
router.get('/:id/catalougetweaks', catalougeController.itemTweaks);


router.get('/login', viewsController.getOverview);
router.get('/porti-highlights', viewsController.portiHighlights);
router.get('/porti', authController.protect, viewsController.gotoPort);
router.get('/invitations/:id', viewsController.gotoInviMid);


router.get('/messages', viewsController.getAllMsg);

router.get('/me', authController.protect, viewsController.getAccount);

router.post('/submit-user-data', authController.protect, viewsController.updateUserData);
router.post('/passwordUpdate', authController.protect, authController.updatePassword);



module.exports = router;