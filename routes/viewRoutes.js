const express = require('express');

const portController = require('../controllers/portfolioControllers');
const authController = require('./../controllers/authControllers');
const viewsController = require('./../controllers/viewControllers');
const inlayoutController = require('./../controllers/inviLayoutControllers');
const menuController = require('../controllers/menuControllers');
const messageController = require('../controllers/messageControllers');
const catalougeController = require('../controllers/catalougeController');


const router = express.Router();

router.get('/logout', authController.logout);
router.patch('/passwordreset/:tokenId', authController.resetPassword);
router.get('/invitation/:user/:id', inlayoutController.inviFirst);

router.use(authController.isLoggedIn);
router.get('/catalog/:user', catalougeController.firstCatalouge);
router.get('/profile/:username', viewsController.layoutTally);
router.get('/menu/:user', menuController.menuFirst);

router.post('/sendmsg', viewsController.newMsg);
router.get('/', viewsController.homePage);
router.post('/scan', viewsController.qrCodeGen);

router.post('/login', authController.login);
router.get('/resetpassword?:tokenId', viewsController.restForm);

router.patch('/updateport', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortData);
router.patch('/updateportSec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortDataSec);
// router.patch('/updateportSix', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortSix);

router.post('/updateportImg/:id', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortImgData);
router.post('/updateportImgCollec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortImgCollec);
router.get('/myportfolio/:id', viewsController.myPort);
router.get('/myinvi/:id', viewsController.myInvi);
router.get('/menu/:id/additemstomenu', menuController.newMenu);
router.get('/menu/:restro/restrostat', messageController.getResOrderStat);
router.get('/catalouge/:id/additems', catalougeController.addItemsPage);


router.get('/tweaks/:id', authController.protect, authController.restrictTo('admin', 'user'), menuController.itemTweaks);
router.get('/catalougetweaks/:id', authController.protect, authController.restrictTo('admin', 'user'), catalougeController.itemTweaks);
router.get('/catalog/:company/companystat', messageController.getComOrderStat);


router.get('/login', viewsController.getOverview);
router.get('/porti-highlights', viewsController.portiHighlights);
router.get('/porti', authController.protect, viewsController.gotoPort);
router.get('/invitations/:id', viewsController.gotoInviMid);

router.get('/inspire', viewsController.searchPage);
router.get('/search/:values', viewsController.searchPorti);
router.get('/toprofile/:user_id/:types', viewsController.toPage)


router.get('/messages', viewsController.getAllMsg);

router.get('/me', authController.protect, viewsController.getAccount);

router.post('/submit-user-data', authController.protect, viewsController.updateUserData);
router.post('/passwordUpdate', authController.protect, authController.updatePassword);

router.get('/mymessages/:user', messageController.getUserMessage);

module.exports = router;