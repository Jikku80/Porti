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


router.get('/:user/portfolio/:userid/tm/a9993e364706816aba3e25717850c26c9cd0d89d/:id', viewsController.layoutFirst);
router.get('/:user/portfolio/:userid/tm/589c22335a381f122d129225f5c0ba3056ed5811/:id', viewsController.layoutSecond);
router.get('/:user/portfolio/:userid/tm/481743d632b80d39bc2771d19be3ca3005b3f8af/:id', viewsController.layoutThird);
router.get('/:user/portfolio/:userid/tm/d798d4338adeb553a1089a58e61e18c2fcdf77bb/:id', viewsController.layoutFourth);
router.get('/:user/portfolio/:userid/tm/da98568d1b2005611973ad49868b38aa8ae68fd7/:id', viewsController.layoutFifth);
router.get('/:user/portfolio/:userid/tm/836b9b955a98e0f2e2d678c179696d6ac53356eb/:id', viewsController.layoutSixth);

router.get('/:user/invitation/:id/4dc50fc3bc007be011b5445f3f79298b9eeb51b7', inlayoutController.inviFirst);
router.get('/:user/invitation/:id/c71c0e24cd20e4b25ae8e3d9e35337500a44a8f7', inlayoutController.inviSecond);

router.get('/:user/menu/:id/40bd001563085fc35165329ea1ff5c5ecbdbbeef', menuController.menuFirst);
router.get('/:user/catalouge/:id/51eac6b471a284d3341d8c0c63d0f1a286262a18', catalougeController.firstCatalouge);


router.post('/sendmsg', viewsController.newMsg);

router.use(authController.isLoggedIn);
router.get('/', viewsController.homePage);
router.post('/scan', viewsController.qrCodeGen);

router.post('/login', authController.login);
router.get('/resetpassword', viewsController.restForm);

router.patch('/updateport', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortData);
router.patch('/updateportSec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortDataSec);
router.patch('/updateportSix', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortSix);

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