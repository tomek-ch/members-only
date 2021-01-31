const { Schema, model } = require('mongoose');

const User = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    isMember: Boolean,
    isAdmin: false,
    password: String,
});

module.exports = model('User', User);