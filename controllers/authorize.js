const User = require('../models/User');

module.exports = async function (req, res, next) {

    const { user } = req;
    const { passcode } = req.body;

    try {
        if (!user.isMember && passcode === 'passcode') {
            await User.findByIdAndUpdate(user._id, { isMember: true });
        } else if (!user.isAdmin && passcode === 'admin') {
            await User.findByIdAndUpdate(user._id, { isMember: true, isAdmin: true });
        }
    } catch (e) {
        next(e);
    }

    res.redirect('/');
};