const express = require('express');
const userController = require('./../controllers/userControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/passwordreset', authController.resetPassword);
router.get('/validatesignup/:username', userController.validateUsers);
router.get('/validateemail/:useremail', userController.validateEmail);
// router.patch('/resetpassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updatepassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateme', userController.updateMe);
router.patch('/updateUser/:id', userController.updateUser);
router.patch('/updateAccount/:id', userController.updateAccountType);
router.post('/updateDP', userController.updateDP);
router.delete('/deleteme', userController.deleteMe);
router.delete('/closeaccount/:id', userController.closeAccount);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;