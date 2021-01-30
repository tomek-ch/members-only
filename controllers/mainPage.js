const Message = require('../models/Message');

module.exports = async function (req, res, next) {
    const messages = await Message
        .find()
        .populate('author')
        .sort([['timestamp', -1]])
        .catch(next);
    res.render('index', { user: req.user, messages });
};