const express = require('express');

const portController = require('../controllers/portfolioControllers');
const authController = require('./../controllers/authControllers');
const viewsController = require('./../controllers/viewControllers');
const inlayoutController = require('./../controllers/inviLayoutControllers');
const menuController = require('../controllers/menuControllers');
const messageController = require('../controllers/messageControllers');
const catalougeController = require('../controllers/catalougeController');
const brochureController = require('../controllers/brochureController');


const router = express.Router();

router.get('/account/logout', authController.logout);
router.patch('/passwordreset/:tokenId', authController.resetPassword);

router.use(authController.isLoggedIn);
router.get('/:username', viewsController.layoutTally);

// router.get('/catalog/:user', catalougeController.firstCatalouge);
// router.get('/profile/:username', viewsController.layoutTally);
// router.get('/menu/:user', menuController.menuFirst);
router.get('/invitation/:user/:id', inlayoutController.inviFirst);

router.post('/send/msg', viewsController.newMsg);
router.get('/', viewsController.homePage);
router.post('/scan/qr', viewsController.qrCodeGen);

router.post('/account/login', authController.login);
router.get('/reset/password?:tokenId', viewsController.restForm);

router.patch('/update/port', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortData);
router.patch('/update/portSec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortDataSec);
// router.patch('/updateportSix', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortSix);

router.post('/updateportImg/:id', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortImgData);
router.post('/update/portImgCollec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortImgCollec);
router.get('/myportfolio/:id', viewsController.myPort);
router.get('/myinvi/:id', viewsController.myInvi);
router.get('/menu/:id/additemstomenu', menuController.newMenu);
router.get('/menu/:restro/restrostat', messageController.getResOrderStat);
router.get('/catalouge/:id/additems', catalougeController.addItemsPage);


router.get('/tweaks/:id', authController.protect, authController.restrictTo('admin', 'user'), menuController.itemTweaks);
router.get('/catalougetweaks/:id', authController.protect, authController.restrictTo('admin', 'user'), catalougeController.itemTweaks);
router.get('/catalog/:company/companystat', messageController.getComOrderStat);

router.get('/brochure/:id/additems', brochureController.addItemsToPage)
router.get('/brochuretweaks/:id', authController.protect, authController.restrictTo('admin', 'user'), brochureController.sectionTweaks);
router.get('/brochure/:org/organizationstat', brochureController.getBookingStat);


router.get('/account/login', viewsController.getOverview);
router.get('/layouts/highlights', viewsController.portiHighlights);
router.get('/layouts/porti', authController.protect, viewsController.gotoPort);
router.get('/invitations/:id', viewsController.gotoInviMid);

router.get('/search/bar', viewsController.searchPage);
router.get('/search/:values/bar?:page', viewsController.searchPorti);

router.get('/activity/:id/tracker?:page', viewsController.expPage);

router.get('/messages/all', viewsController.getAllMsg);

router.get('/account/me', authController.protect, viewsController.getAccount);

router.post('/submit/user-data', authController.protect, viewsController.updateUserData);
router.post('/password/Update', authController.protect, authController.updatePassword);

router.get('/mymessages/:user', messageController.getUserMessage);

module.exports = router;