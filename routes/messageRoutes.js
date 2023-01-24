const express = require('express');

const msgController = require('./../controllers/messageControllers');
const authController = require('./../controllers/authControllers');

const router = express.Router();


router.use(authController.isLoggedIn);
router.use(authController.protect);

router.route('/').get(msgController.getAllMsg).post(msgController.createMsg);

router.get('/:restro', msgController.getAllResOrder)
router.post('/orderfood', msgController.createResOrder);
router.get('/:restro/usrorders/:user', msgController.getSelectedResOrder);
router.delete('/deleteResOrder/:id', msgController.deleteResOrder);
router.patch('/orderById/:id', msgController.updateResOrderById);

router.get('/catOrders/:cat', msgController.getFifCatOrders);
router.post('/orderItem', msgController.createComOrder);
router.get('/:cat/selectedUserOrders/:user', msgController.getSelectedComOrder);
router.delete('/deleteComOrder/:id', msgController.deleteComOrder);
router.patch('/itemOrderById/:id', msgController.updateComOrderById);
// router.get('/:cat/catOrders/:user', msgController.get);

router.post('/usermessage', msgController.newUserMessage);
router.get('/user/:userName/message/:name', msgController.getAllMessageFromUser);
router.get('/messagesAll/:name', msgController.getMessagesAllUsers);
router.get('/messageby/:name/user/:userName', msgController.getAllMessageByUser);
router.patch('/update/:name/msg/:userName', msgController.updateUserMessage);
router.delete('/deleteusermessage', msgController.deleteUserMessage);

module.exports = router;