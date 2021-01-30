const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');

module.exports = [

    body('firstName', 'Please enter your first name')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('lastName', 'Please enter your last name')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('username', 'Please enter a username')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .custom(async username => {
            try {
                if (username && await User.findOne({ username }))
                    return Promise.reject('Username taken');
            } catch {
                return Promise.reject('There was a network error');
            }
        }),

    body('password', 'Please provide a password that is at least 4 characters long')
        .trim()
        .isLength({ min: 4 })
        .escape(),

    body('confirmPassword')
        .escape()
        .custom((value, { req: { body: { password } } }) => {
            if (password && (value !== password))
                throw new Error('Passwords must match');
            return true;
        }),

    async function (req, res, next) {

        const { firstName, lastName, username, password, confirmPassword } = req.body;
        const user = { firstName, lastName, username, password };

        const errors = validationResult(req).array();
        if (errors.length)
            return res.render('sign-up', { errors, user, confirmPassword });

        user.password = await bcrypt.hash(password, 10).catch(next);
        await new User(user).save().catch(next);
        next();
    },
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
    }),
];