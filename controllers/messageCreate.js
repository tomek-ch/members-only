const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

module.exports = [

    body('text', 'Please enter a message')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('title', 'Please enter a title')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async function (req, res, next) {

        const errors = validationResult(req).array();
        if (errors.length) return res.render('index', { errors, user });

        const { user } = req;
        const { title, text } = req.body;

        if (user?.isMember) {

            await new Message({
                title,
                text,
                author: user._id,
                timestamp: Date.now(),
            }).save().catch(next);
        }
        
        res.redirect('/');
    },
]