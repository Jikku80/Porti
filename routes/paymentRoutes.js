const express = require('express');
const paymentController = require('./../controllers/paymentControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('admin', 'user'));
router.route('/:id').get(paymentController.paymentTypes)
router.route('/esewa/:id').get(paymentController.paySuccess)
router.route('/failure/esewa').get(paymentController.payFailure)

module.exports = router;