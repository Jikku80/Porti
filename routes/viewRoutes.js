const express = require('express');

const portController = require('../controllers/portfolioControllers');
const authController = require('./../controllers/authControllers');
const viewsController = require('./../controllers/viewControllers');


const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/resetpassword', viewsController.restForm);
router.patch('/passwordreset', authController.resetPassword);

router.get('/:user/portfolio/:id/a9993e364706816aba3e25717850c26c9cd0d89d', viewsController.layoutFirst);
router.get('/:user/portfolio/:id/589c22335a381f122d129225f5c0ba3056ed5811', viewsController.layoutSecond);
router.get('/:user/portfolio/:id/481743d632b80d39bc2771d19be3ca3005b3f8af', viewsController.layoutThird);
router.post('/sendmsg', viewsController.newMsg);

router.use(authController.isLoggedIn);
router.patch('/updateport', authController.protect, authController.restrictTo('admin', 'user'), viewsController.updatePortData);
router.patch('/updateportImg', authController.protect, authController.restrictTo('admin', 'user'), portController.uploadPortImages, portController.resizeNewPortImages, viewsController.updatePortImgData);
router.get('/myportfolio/:num', viewsController.myPort);

router.get('/login', viewsController.getOverview);

router.get('/porti', viewsController.gotoPort);
router.get('/confirm/:num', viewsController.gotoPortMid);

router.get('/messages', viewsController.getAllMsg);

router.get('/me', authController.protect, viewsController.getAccount);

router.post('/submit-user-data', authController.protect, viewsController.updateUserData);
router.post('/passwordUpdate', authController.protect, authController.updatePassword);



module.exports = router;