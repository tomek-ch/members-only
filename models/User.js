const { Schema, model } = require('mongoose');

const User = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    status: String,
    password: String,
});

module.exports = model('User', User);