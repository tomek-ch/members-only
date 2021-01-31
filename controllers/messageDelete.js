const Message = require('../models/Message');

module.exports = async function(req, res, next) {
    if (req.user.isAdmin) {
        await Message.findByIdAndDelete(req.body.messageId).catch(next);
    }
    res.redirect('/');
};