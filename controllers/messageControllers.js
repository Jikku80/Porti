const Message = require('./../models/messageModel');
const factory = require('./handleFactory');

exports.createMsg = factory.createOne(Message);
exports.getAllMsg = factory.getAll(Message);