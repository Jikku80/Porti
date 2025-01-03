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
router.get('/account/signup', viewsController.getSignup);
router.get('/account/forgot-password', viewsController.getForgot);
router.get('/vporti/sitemap.xml', viewsController.sitemap);
router.get('/vporti/robots.txt', viewsController.robotxt);

router.use(authController.isLoggedIn);
router.get('/:username', viewsController.layoutTally);

router.get('/invitation/:user/:id', inlayoutController.inviFirst);

router.post('/send/msg', viewsController.newMsg);
router.get('/', viewsController.homePage);
router.get('/vporti/aboutus', viewsController.getAboutPage);
router.get('/vporti/guidelines', viewsController.getGuidePage);
router.get('/vporti/courses/getting-started', viewsController.getCoursePage);
router.get('/vporti/courses/custom-theme', viewsController.getCustomThemePage);
router.get('/vporti/courses/portfolio', viewsController.getCoursePortfolioPage);
router.get('/vporti/courses/invitation', viewsController.getCourseInvitationPage);
router.get('/vporti/courses/food-menu', viewsController.getCourseFoodMenuPage);
router.get('/vporti/courses/catalog', viewsController.getCourseCatalogPage);
router.get('/vporti/courses/brochure', viewsController.getCourseBrochurePage);
router.get('/vporti/courses/account-setting', viewsController.getCourseAccountPage);
router.get('/vporti/courses/update-webpage-detail', viewsController.getCourseUpdatePage);

router.get('/vporti/getintouch', viewsController.getContactPage);

router.post('/scan/qr', viewsController.qrCodeGen);

router.post('/account/login', authController.login);
router.get('/reset/password?:tokenId', viewsController.restForm);

router.patch('/update/port', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortData);
router.patch('/update/portSec', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortDataSec);

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

router.get('/brochure/:id/additems?:bro', brochureController.addItemsToPage)
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
router.get('/layouts/custom', authController.protect, viewsController.custom);
router.get('/layouts/custominvi', authController.protect, viewsController.customInvi);

router.post('/submit/user-data', authController.protect, viewsController.updateUserData);
router.post('/password/Update', authController.protect, authController.updatePassword);

router.get('/mymessages/:user', messageController.getUserMessage);

module.exports = router;