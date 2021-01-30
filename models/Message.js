const { Schema, model } = require('mongoose');

const Message = new Schema({
    title: { type: String, required: true },
    timestamp: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId(), ref: 'User' },
});

module.exports = model('Message', Message);