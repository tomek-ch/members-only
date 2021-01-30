module.exports = function (req, res, next) {
    if (req.user) {
        res.render('index');
    } else {
        res.redirect('/sign-in');
    }
};