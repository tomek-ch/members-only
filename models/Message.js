const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const Message = new Schema({
    title: { type: String, required: true },
    timestamp: { type: Number, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

Message
  .virtual('time')
  .get(function () {
    return DateTime.fromMillis(this.timestamp).toLocaleString(DateTime.DATE_MED);
  });

module.exports = model('Message', Message);