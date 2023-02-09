const express = require('express');

const authController = require('./../controllers/authControllers');
const searchController = require('./../controllers/searchController');

const router = express.Router();

router.use(authController.isLoggedIn);
router.use(authController.protect);
router.use(authController.restrictTo('admin', 'user'));

router.get('/getAllSearch/:id', searchController.getAllSearch);
router.post('/', searchController.createSearch);
router.delete('/deleteSearch/:id', searchController.deleteSearch);
router.delete('/deleteAllSearch/:id', searchController.deleteAllSearch);

module.exports = router;