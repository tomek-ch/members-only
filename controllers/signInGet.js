module.exports = function (req, res, next) {
    if (req.user) res.redirect('/');
    else res.render('sign-in');
};