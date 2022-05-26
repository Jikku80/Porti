const express = require('express');

const portController = require('../controllers/portfolioControllers');
const authController = require('./../controllers/authControllers');
const viewsController = require('./../controllers/viewControllers');
const inlayoutController = require('./../controllers/inviLayoutControllers');
const menuController = require('../controllers/menuControllers');


const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/resetpassword', viewsController.restForm);
router.patch('/passwordreset', authController.resetPassword);


router.get('/:user/portfolio/:id/a9993e364706816aba3e25717850c26c9cd0d89d', viewsController.layoutFirst);
router.get('/:user/portfolio/:id/589c22335a381f122d129225f5c0ba3056ed5811', viewsController.layoutSecond);
router.get('/:user/portfolio/:id/481743d632b80d39bc2771d19be3ca3005b3f8af', viewsController.layoutThird);
router.get('/:user/portfolio/:id/d798d4338adeb553a1089a58e61e18c2fcdf77bb', viewsController.layoutFourth);
router.get('/:user/portfolio/:id/da98568d1b2005611973ad49868b38aa8ae68fd7', viewsController.layoutFifth);
router.get('/:user/portfolio/:id/836b9b955a98e0f2e2d678c179696d6ac53356eb', viewsController.layoutSixth);

router.get('/:user/invitation/:id/4dc50fc3bc007be011b5445f3f79298b9eeb51b7', inlayoutController.inviFirst);
router.get('/:user/invitation/:id/c71c0e24cd20e4b25ae8e3d9e35337500a44a8f7', inlayoutController.inviSecond);

router.get('/:user/menu/:id/40bd001563085fc35165329ea1ff5c5ecbdbbeef', menuController.menuFirst);

router.post('/sendmsg', viewsController.newMsg);

router.use(authController.isLoggedIn);
router.get('/', viewsController.homePage);

router.patch('/updateport', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortData);
router.patch('/updateportSec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortDataSec);
router.patch('/updateportSix', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortSix);

router.patch('/updateportImg', authController.protect, authController.restrictTo('admin', 'user'), portController.uploadPortImages, portController.resizeNewPortImages, viewsController.removePortiOldImg, viewsController.updatePortImgData);
router.patch('/updateportImgCollec', authController.protect, authController.restrictTo('admin', 'user'), portController.uploadImages, portController.resizePortImages, viewsController.removePortiOldImgColl, viewsController.updatePortImgCollec);
router.get('/myportfolio/:id', viewsController.myPort);
router.get('/myinvi/:id', viewsController.myInvi);
router.get('/menu/:id/additemstomenu', menuController.newMenu);

router.get('/:id/tweaks', menuController.itemTweaks);


router.get('/login', viewsController.getOverview);
router.get('/porti-highlights', viewsController.portiHighlights);
router.get('/porti', authController.protect, viewsController.gotoPort);
router.get('/invitations/:id', viewsController.gotoInviMid);


router.get('/messages', viewsController.getAllMsg);

router.get('/me', authController.protect, viewsController.getAccount);

router.post('/submit-user-data', authController.protect, viewsController.updateUserData);
router.post('/passwordUpdate', authController.protect, authController.updatePassword);



module.exports = router;