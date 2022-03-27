const express = require('express');

const msgController = require('./../controllers/messageControllers');

const router = express.Router();

router.route('/').get(msgController.getAllMsg).post(msgController.createMsg);

module.exports = router;