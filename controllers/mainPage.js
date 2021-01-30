const Message = require('../models/Message');

module.exports = async function (req, res, next) {
    const messages = await Message.find();
    res.render('index', { user: req.user, messages });
};